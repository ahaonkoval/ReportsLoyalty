--declare
--	@market_id		bigint = 0,
--	@campaign_id	bigint = 522,
--	@border_amount	decimal(28,2) = 1000,
--	@date_start		date	= '2018-08-11',
--	@date_end		date	= '2018-08-12'


set @date_start = cast(@date_start as date)
set @date_end = cast(@date_end as date)

select 
	count(distinct uc.crm_customer_id) customers_qty
from calc.v_cardusing uc 
	inner join (
		select * from calc.campaign_participant cp (nolock) 
			where cp.campaign_id = @campaign_id and cp.delivery_status = 1 and cp.control_group = 0) c
	on uc.crm_customer_id = c.crm_customer_id
where uc.short_created between @date_start and @date_end
	and uc.ballance_amount_nds >= iif(@border_amount=0, uc.ballance_amount_nds, @border_amount)
	and (uc.used_market_id = iif(@market_id=0, uc.used_market_id, @market_id))

--create index idx_CampaignIdDeliveryStatus on calc.campaign_participant([campaign_id], [delivery_status])
--go