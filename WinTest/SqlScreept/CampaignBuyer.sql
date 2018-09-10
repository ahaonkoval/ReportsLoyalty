--declare
--	@market_id		bigint = 24,
--	@campaign_id	bigint = 497,
--	@border_amount	decimal(28,2) = 1000,
--	@date_start		date	= '2018-07-20',
--	@date_end		date	= '2018-07-31'

set @date_start = cast(@date_start as date)
set @date_end = cast(@date_end as date)

if object_id('[tempdb]..#tmp_docs') != 0
	drop table #tmp_docs
select 
	uc.* 
into #tmp_docs
from calc.v_cardusing uc 
	inner join (select * from calc.campaign_participant cp (nolock) 
		where cp.campaign_id = @campaign_id and control_group = 0 and cp.delivery_status = 1) c
	on uc.crm_customer_id = c.crm_customer_id
where uc.short_created between @date_start and @date_end
	and uc.ballance_amount_nds >= iif(@border_amount=0, uc.ballance_amount_nds, @border_amount)
	and (uc.used_market_id = iif(@market_id=0, uc.used_market_id, @market_id))

if object_id('[tempdb]..#tmp_sell') != 0
	drop table #tmp_sell
select 
	dc.crm_customer_id, 
	sm.*, 
	dc.short_created
into #tmp_sell
from dbo.sell_movement sm (nolock)
	inner join #tmp_docs dc on sm.doc_id = dc.doc_id

if object_id('[tempdb]..#tmp_sell_dict') != 0
	drop table #tmp_sell_dict
select 
	a.*, 
	dt.articul, 
	dt.lf0_id,
	dt.lf1_id,
	dt.lf2_id,
	dt.lf3_id,
	dt.lf4_id,
	YEAR(a.short_created)	[YEAR],
	MONTH(a.short_created)	[MONTH],
	DAY(a.short_created)	[DAY]
into #tmp_sell_dict
from #tmp_sell a 
	inner join calc.dict_goods dt on a.good_id = dt.good_id
where
	a.doc_type_id in (8001, 8101)

--SELECT * FROM #tmp_sell_dict

create index idx_1 on #tmp_sell_dict([YEAR])
create index idx_2 on #tmp_sell_dict([MONTH])
create index idx_3 on #tmp_sell_dict([DAY])
create index idx_4 on #tmp_sell_dict(lf0_id)

if object_id('[tempdb]..#tmp_doc_sum') != 0
	drop table #tmp_doc_sum
select 
	a.market_id,
	a.[YEAR],
	a.[MONTH],
	a.[DAY],
	a.doc_id,
	sum(a.price * a.qty) doc_sm
into #tmp_doc_sum
from #tmp_sell_dict a
group by
	a.market_id,
	a.[YEAR],
	a.[MONTH],
	a.[DAY],
	a.doc_id

if object_id('[tempdb]..#tmp_rt_1') != 0
	drop table #tmp_rt_1
select 
	a.market_id,
	count(distinct a.crm_customer_id)	customers_qty,
	count(distinct a.doc_id)			docs_qty,	
	((sum(a.price * a.qty) - sum(a.buy_price * a.qty))/sum(a.price * a.qty)) * 100	as margin,
	(sum(a.price * a.qty) - sum(a.buy_price * a.qty))								as margin_grn,
	sum(a.price * a.qty)															as obert,
	a.[YEAR],
	a.[MONTH],
	a.[DAY],

	ISNULL(SUM(case when a.lf0_id = 65000001001
		then cast((a.qty * a.price) as decimal(18,2)) end) ,0)	[sum_10],
	ISNULL(SUM(case when a.lf0_id = 65000001002
		then cast((a.qty * a.price) as decimal(18,2)) end) ,0)	[sum_20],
	ISNULL(SUM(case when a.lf0_id = 90000001163
		then cast((a.qty * a.price) as decimal(18,2)) end) ,0)	[sum_210],
	ISNULL(SUM(case when a.lf0_id = 65000001003
		then cast((a.qty * a.price) as decimal(18,2)) end) ,0)	[sum_30],
	ISNULL(SUM(case when a.lf0_id = 61000060107
		then cast((a.qty * a.price) as decimal(18,2)) end) ,0)	[sum_310],

	ISNULL(SUM(case when a.lf0_id = 65000001004
		then cast((a.qty * a.price) as decimal(18,2)) end) ,0)	[sum_40],
	ISNULL(SUM(case when a.lf0_id = 65000001005
		then cast((a.qty * a.price) as decimal(18,2)) end) ,0)	[sum_50],
	ISNULL(SUM(case when a.lf0_id = 65000001006
		then cast((a.qty * a.price) as decimal(18,2)) end) ,0)	[sum_60],
	ISNULL(SUM(case when a.lf0_id = 65000001007
		then cast((a.qty * a.price) as decimal(18,2)) end) ,0)	[sum_70],
	ISNULL(SUM(case when a.lf0_id = 65000001008
		then cast((a.qty * a.price) as decimal(18,2)) end) ,0)	[sum_80],
	ISNULL(SUM(case when a.lf0_id = 65000001009
		then cast((a.qty * a.price) as decimal(18,2)) end) ,0)	[sum_90],
	ISNULL(SUM(case when a.lf0_id = 65000001010
		then cast((a.qty * a.price) as decimal(18,2)) end) ,0)	[sum_100],
	ISNULL(SUM(case when a.lf0_id = 90000001105
		then cast((a.qty * a.price) as decimal(18,2)) end) ,0)	[sum_interport],
	ISNULL(SUM(case when a.lf0_id = null or a.lf0_id in (0, 24, 90000000002, 90000000003)
		then cast((a.qty * a.price) as decimal(18,2)) end) ,0)	[sum_other]
into #tmp_rt_1
from #tmp_sell_dict a 
where
	a.doc_type_id in (8001, 8101)
group by
	a.market_id,
	a.[YEAR],
	a.[MONTH],
	a.[DAY]
order by
	a.market_id,
	a.[YEAR],
	a.[MONTH],
	a.[DAY]

select 
	dm.short_name,
	a.customers_qty,
	a.docs_qty,
	cast(a.obert as real)		obert,
	cast(a.margin as real)		margin,
	cast(a.margin_grn as real)	margin_grn,
	a.[Year],
	a.[Month],
	a.[Day],
	(select count(distinct m1.doc_id) qty from #tmp_sell_dict m1 where m1.lf0_id = 65000001001 
		and m1.[YEAR] = a.[YEAR] and m1.[MONTH] = a.[MONTH] and m1.[DAY] = a.[DAY] and m1.market_id = a.market_id) doc_qty_10,
	cast(a.sum_10 as real) sum_10,

	(select count(distinct m1.doc_id) qty from #tmp_sell_dict m1 where m1.lf0_id = 65000001002 
		and m1.[YEAR] = a.[YEAR] and m1.[MONTH] = a.[MONTH] and m1.[DAY] = a.[DAY] and m1.market_id = a.market_id) doc_qty_20,
	cast(a.sum_20 as real)	sum_20,

	(select count(distinct m1.doc_id) qty from #tmp_sell_dict m1 where m1.lf0_id = 90000001163 
		and m1.[YEAR] = a.[YEAR] and m1.[MONTH] = a.[MONTH] and m1.[DAY] = a.[DAY] and m1.market_id = a.market_id) doc_qty_210,
	cast(a.sum_210 as real)	sum_210,

	(select count(distinct m1.doc_id) qty from #tmp_sell_dict m1 where m1.lf0_id = 65000001003 
		and m1.[YEAR] = a.[YEAR] and m1.[MONTH] = a.[MONTH] and m1.[DAY] = a.[DAY] and m1.market_id = a.market_id) doc_qty_30,
	cast(a.sum_30 as real)	sum_30,

	(select count(distinct m1.doc_id) qty from #tmp_sell_dict m1 where m1.lf0_id = 61000060107 
		and m1.[YEAR] = a.[YEAR] and m1.[MONTH] = a.[MONTH] and m1.[DAY] = a.[DAY] and m1.market_id = a.market_id) doc_qty_310,
	cast(a.sum_310 as real)	sum_310,

	(select count(distinct m1.doc_id) qty from #tmp_sell_dict m1 where m1.lf0_id = 65000001004 
		and m1.[YEAR] = a.[YEAR] and m1.[MONTH] = a.[MONTH] and m1.[DAY] = a.[DAY] and m1.market_id = a.market_id) doc_qty_40,
	cast(a.sum_40 as real)	sum_40,

	(select count(distinct m1.doc_id) qty from #tmp_sell_dict m1 where m1.lf0_id = 65000001005 
		and m1.[YEAR] = a.[YEAR] and m1.[MONTH] = a.[MONTH] and m1.[DAY] = a.[DAY] and m1.market_id = a.market_id) doc_qty_50,
	cast(a.sum_50 as real)	sum_50,

	(select count(distinct m1.doc_id) qty from #tmp_sell_dict m1 where m1.lf0_id = 65000001006 
		and m1.[YEAR] = a.[YEAR] and m1.[MONTH] = a.[MONTH] and m1.[DAY] = a.[DAY] and m1.market_id = a.market_id) doc_qty_60,
	cast(a.sum_60 as real)	sum_60,

	(select count(distinct m1.doc_id) qty from #tmp_sell_dict m1 where m1.lf0_id = 65000001007 
		and m1.[YEAR] = a.[YEAR] and m1.[MONTH] = a.[MONTH] and m1.[DAY] = a.[DAY] and m1.market_id = a.market_id) doc_qty_70,
	cast(a.sum_70 as real) sum_70,

	(select count(distinct m1.doc_id) qty from #tmp_sell_dict m1 where m1.lf0_id = 65000001008 
		and m1.[YEAR] = a.[YEAR] and m1.[MONTH] = a.[MONTH] and m1.[DAY] = a.[DAY] and m1.market_id = a.market_id) doc_qty_80,
	cast(a.sum_80 as real) sum_80,

	(select count(distinct m1.doc_id) qty from #tmp_sell_dict m1 where m1.lf0_id = 65000001009 
		and m1.[YEAR] = a.[YEAR] and m1.[MONTH] = a.[MONTH] and m1.[DAY] = a.[DAY] and m1.market_id = a.market_id ) doc_qty_90,
	cast(a.sum_90 as real) sum_90,

	(select count(distinct m1.doc_id) qty from #tmp_sell_dict m1 where m1.lf0_id = 65000001010 
		and m1.[YEAR] = a.[YEAR] and m1.[MONTH] = a.[MONTH] and m1.[DAY] = a.[DAY] and m1.market_id = a.market_id) doc_qty_100,
	cast(a.sum_100 as real) sum_100,

	(select count(distinct m1.doc_id) qty from #tmp_sell_dict m1 where m1.lf0_id = 90000001105 
		and m1.[YEAR] = a.[YEAR] and m1.[MONTH] = a.[MONTH] and m1.[DAY] = a.[DAY] and m1.market_id = a.market_id) doc_qty_intersport,
	cast(a.sum_interport as real) sum_interport,

	(select count(distinct m1.doc_id) qty from #tmp_sell_dict m1 where m1.lf0_id = null or m1.lf0_id in (0, 24, 90000000002, 90000000003, 90000000001)
		and m1.[YEAR] = a.[YEAR] and m1.[MONTH] = a.[MONTH] and m1.[DAY] = a.[DAY] and m1.market_id = a.market_id) doc_qty_other,
	cast(a.sum_other as real) sum_other,
	cast(la.asm as real) doc_avg
from #tmp_rt_1 a 
	inner join dbo.dict_markets dm on a.market_id = dm.id
	cross apply (
		select avg(m.doc_sm) asm from #tmp_doc_sum m 
			WHERE 
				m.market_id = a.market_id 
				and a.[YEAR] = m.[YEAR] 
				and a.[MONTH] = m.[MONTH] 
				and a.[DAY] = m.[DAY]
	) la
