using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using EtData;

namespace ReportsLoyalty.pages.customers
{
    public partial class participant_list : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            var campaign_id = Request.QueryString["campaign_id"].ToString();

            this.sds_customers_list.SelectCommand = "SELECT * FROM [calc].[t_get_campaign_customers](@campaign_id) a where a.control_group = N'Ні' order by number";
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