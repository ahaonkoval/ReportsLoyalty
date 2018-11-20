
USE crm_wizard
GO

SET NOCOUNT ON;
DECLARE 
    @date_start     date = '2018-06-28',
    @date_end       date = '2018-06-30'

/* ті кому було відправлено повідомлення з вказаних активностей */
if object_id('[tempdb]..#tmp_campaign_customers') != 0
	drop table #tmp_campaign_customers
SELECT cp.campaign_id, crm_customer_id, delivery_status
INTO #tmp_campaign_customers
	FROM calc.campaign_participant cp with (nolock)
		where cp.campaign_id in (615, 613)
CREATE INDEX idx_crm_customer_id ON #tmp_campaign_customers(crm_customer_id, delivery_status)

/* всі хто купував буль що за вказаний період */
if object_id('[tempdb]..#tmp_customers') != 0
	drop table #tmp_customers
SELECT 
	b.crm_customer_id, 0 as delivery_status, SPACE(255) campaigns
INTO #tmp_customers
FROM calc.v_cardusing b with (nolock)
    INNER JOIN dbo.short_docs1 sd with (nolock) on b.doc_id = sd.doc_id
WHERE b.short_created between @date_start and @date_end
    and sd.doc_type_id in (8001, 8101)
GROUP BY   
    b.crm_customer_id

CREATE INDEX idx_doc_id on #tmp_customers(crm_customer_id);
---------------------------------------------------------------------------------------------------
DECLARE @t_current table (
	id				int primary key identity(1,1),
	campaigns		varchar(255)
);
DECLARE @crm_customer_id	bigint;
DECLARE @tm					nvarchar(255);
DECLARE @t					dbo.Ids;

DECLARE CustomersCursor CURSOR FOR   
SELECT crm_customer_id FROM #tmp_customers 

OPEN CustomersCursor;

FETCH NEXT FROM CustomersCursor INTO @crm_customer_id
WHILE @@FETCH_STATUS = 0  
BEGIN  
	DELETE FROM @t;
	INSERT INTO @t (id)
	SELECT 
		distinct a.campaign_id
	FROM #tmp_campaign_customers a 
	WHERE 
		a.crm_customer_id = @crm_customer_id and a.delivery_status = 1;

	SET @tm = calc.f_get_string(@t);
	
	UPDATE a
		SET a.campaigns = @tm
	FROM #tmp_customers a
	WHERE
		a.crm_customer_id = @crm_customer_id

	FETCH NEXT FROM CustomersCursor 
	INTO @crm_customer_id
END;

CLOSE CustomersCursor;  
DEALLOCATE CustomersCursor;  

UPDATE a set a.delivery_status = iif(a.campaigns != '', 1, 0) FROM #tmp_customers a

--SELECT * FROM #tmp_customers a
-- ===================================================================================================
if object_id('[tempdb]..#tmp_customers_before') != 0
	drop table #tmp_customers_before
select 
    a.crm_customer_id,
    count(distinct b.short_created)         before_atd,
    sum(b.ballance_amount_nds)              before_obert,
    count(distinct b.doc_id)                before_doc_qty
into #tmp_customers_before
from #tmp_customers a 
    inner join calc.v_cardusing b with (nolock) on a.crm_customer_id = b.crm_customer_id
WHERE   
    b.short_created < @date_start
GROUP BY
    a.crm_customer_id
-- ===================================================================================================
if object_id('[tempdb]..#tmp_customers_after') != 0
	drop table #tmp_customers_after
select 
    a.crm_customer_id,
    count(distinct b.short_created)         after_atd,
    sum(b.ballance_amount_nds)              after_obert,
    count(distinct b.doc_id)                after_doc_qty
into #tmp_customers_after
from #tmp_customers a 
    inner join calc.v_cardusing b with (nolock) on a.crm_customer_id = b.crm_customer_id
WHERE   
    b.short_created <= @date_end
GROUP BY
    a.crm_customer_id
-- ===================================================================================================
DECLARE
    @t_dict_atd table (
        id         int IDENTITY(1,1) PRIMARY KEY,
        [START]    int,
        [END]      INT,
        [Name]     NVARCHAR(20)
    );

INSERT into @t_dict_atd([START], [END], Name)
VALUES 
    (0, 1,			'один візит'),
    (2, 2,			'два візити'),
    (3, 5,			'3-5'),
    (6, 10,			'6-10'),
    (11, 10000,		'11+')
-- ===================================================================================================

SELECT 
    a.crm_customer_id,
    a.delivery_status,
	a.campaigns,
    isnull(befo.before_atd, 0)                  before_atd,
    cast(isnull(befo.before_obert, 0) as real)  before_obert,

    isnull(befo_sm_dict.name, '')               before_obert_part,
    isnull(bf_atd.Name, '')                     before_atd_part,

    afte.after_atd,
    cast(afte.after_obert as real)              after_obert,

    after_sm_dict.name                          after_obert_part,
    af_atd.Name                                 before_atd_part,

    befo.before_doc_qty,
    afte.after_doc_qty

FROM #tmp_customers a
    LEFT JOIN #tmp_customers_before befo on a.crm_customer_id = befo.crm_customer_id
    LEFT JOIN #tmp_customers_after afte on a.crm_customer_id = afte.crm_customer_id

    LEFT JOIN [calc].[map_diff_sm_long] befo_sm_dict 
			on befo.before_obert between befo_sm_dict.[start] and befo_sm_dict.[end]

    LEFT JOIN @t_dict_atd bf_atd 
        on befo.before_atd between bf_atd.[START] and bf_atd.[END]

    inner join [calc].[map_diff_sm_long] after_sm_dict 
         on afte.after_obert between after_sm_dict.[start] and after_sm_dict.[end]

    inner join @t_dict_atd af_atd 
        on afte.after_atd between af_atd.[START] and af_atd.[END]         
-- where
--     afte.after_atd = 1
ORDER BY
    a.crm_customer_id
