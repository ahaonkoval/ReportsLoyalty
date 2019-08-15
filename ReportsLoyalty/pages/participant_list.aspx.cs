using LoyaltyDB;
using System;
using System.Web.UI.WebControls;

namespace ReportsLoyalty.pages.customers
{
    public partial class participant_list : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            var campaign_id = Request.QueryString["campaign_id"].ToString();

            this.sds_customers_list.SelectCommand = @"
                SELECT 
	                row_number() over(order by a.crm_customer_id) as number,
	                a.name1,
	                a.name2,
	                a.name3,
	                a.gender,
	                a.barcode,
	                cast(replace(a.mobile_phone, '+','') as bigint) mobile_phone,
	                a.control_group,
	                a.delivery_channel,
	                a.market_name,
	                a.free,
	                a.crm_customer_id
                FROM [calc].[t_get_campaign_customers](@campaign_id) a where a.is_not_send = 0 order by number";
            this.sds_customers_list.SelectCommandType = SqlDataSourceCommandType.Text;
            this.sds_customers_list.SelectParameters.Clear();
            this.sds_customers_list.SelectParameters.Add("campaign_id", campaign_id);

            using (GetData gt = new GetData())
            {
                ReportViewerExtraPoints.LocalReport.DisplayName = gt.Campaigns.GetCampaignNameById(
                    Convert.ToInt32(campaign_id));
            }
        }
    }
}