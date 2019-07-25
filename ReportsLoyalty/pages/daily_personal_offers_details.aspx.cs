using Microsoft.Reporting.WebForms;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using LoyaltyDB;
using System.Text.RegularExpressions;

namespace ReportsLoyalty.pages.personal_offers_details
{
    public partial class personal_offers_details : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            try
            {
                var campaign_id = Request.QueryString["campaign_id"].ToString();
                var date_st = Request.QueryString["date_st"].ToString();
                var market_id = Request.QueryString["market_id"].ToString();
                var ctrl = Request.QueryString["ctrl"].ToString();

                ReportViewerPersonalOffers.LocalReport.SubreportProcessing += LocalReport_SubreportProcessing;

                DateTime dt;
                if (date_st == "null")
                {
                    dt = DateTime.Now.AddDays(-1);
                }
                else
                {
                    Regex regex = new Regex(@"‎+");
                    date_st = regex.Replace(date_st, "");
                    dt = Convert.ToDateTime(date_st);
                }

                if (market_id == string.Empty) market_id = "0";
                int n;
                bool is_numeric_market_id = int.TryParse(market_id, out n);

                this.sds_expected_effect.SelectCommand = @"
                SELECT * FROM rep.t_get_personal_markmo_report(@campaign_id, @controlGroup, @date, null, @marketLst) Order by market_id";
                this.sds_expected_effect.SelectCommandType = SqlDataSourceCommandType.Text;
                this.sds_expected_effect.SelectParameters.Clear();
                this.sds_expected_effect.SelectParameters.Add("campaign_id", campaign_id);
                this.sds_expected_effect.SelectParameters.Add("date", DbType.Date, dt.ToString("yyyy-MM-dd"));
                //this.sds_expected_effect.SelectParameters.Add("controlGroup", DbType.Boolean, dt.ToString("yyyy-MM-dd"));
                this.sds_expected_effect.SelectParameters.Add("marketLst", market_id);
                this.sds_expected_effect.SelectParameters.Add("controlGroup", ctrl);


                this.sds_market_details.SelectCommand = @"
                    SELECT 
                        market_id, Prms, [10] as a10, [20] as a20, [30] as a30, [40] as a40, [50] as a50, 
                        [60] as a60, [70] as a70, [80] as a80, [90] as a90, [100] as a100, [210] as a210, [310] as a310, [800] as a800, [0] as a0 
                    FROM rep.t_get_personal_markmo_market_details_pivot(@campaign_id, @control_group, @date)";
                this.sds_market_details.SelectCommandType = SqlDataSourceCommandType.Text;
                this.sds_market_details.SelectParameters.Clear();
                this.sds_market_details.SelectParameters.Add("campaign_id", campaign_id);
                this.sds_market_details.SelectParameters.Add("date", DbType.Date, dt.ToString("yyyy-MM-dd"));
                this.sds_market_details.SelectParameters.Add("control_group", ctrl);

                using (GetData gdt = new GetData())
                {
                    List<string> m = gdt.Campaigns.GetCountsCustomersForGroups(
                        Convert.ToInt32(campaign_id),
                        DateTime.Parse(date_st),
                        Convert.ToBoolean(ctrl));

                    ReportViewerPersonalOffers.LocalReport.SetParameters(new ReportParameter("CustomersCountArticul", m[0]));
                    ReportViewerPersonalOffers.LocalReport.SetParameters(new ReportParameter("CustomersCountGroups3lavel", m[1]));
                    ReportViewerPersonalOffers.LocalReport.SetParameters(new ReportParameter("CustomersCountGroups", m[2]));
                    ReportViewerPersonalOffers.LocalReport.SetParameters(new ReportParameter("СustomersCountDepart", m[3]));
                    ReportViewerPersonalOffers.LocalReport.SetParameters(new ReportParameter("CustomersCountMarket", m[4]));

                    ReportViewerPersonalOffers.LocalReport.SetParameters(new ReportParameter("CampaignName",
                        gdt.Campaigns.GetCampaignNameById(Convert.ToInt32(campaign_id))
                    ));

                    string DepartmentName = gdt.Campaigns.GetCurrentDepartamentNameById(Convert.ToInt32(campaign_id));

                    ReportViewerPersonalOffers.LocalReport.SetParameters(new ReportParameter("DepartmentName",
                        string.Format("Департамент: {0}", DepartmentName)
                    ));

                    string OtdName = gdt.Campaigns.GetOtdNameByCampaignId(Convert.ToInt32(campaign_id));

                    ReportViewerPersonalOffers.LocalReport.SetParameters(new ReportParameter("OtdName",
                        string.Format("Відділ: {0}", OtdName)
                    ));
                }

            }
            catch (Exception ex)
            {
                int i = 0;
            }
        }

        private void LocalReport_SubreportProcessing(object sender, Microsoft.Reporting.WebForms.SubreportProcessingEventArgs e)
        {
            /* Загружаемо дані в субрепорти*/
            e.DataSources.Add(new Microsoft.Reporting.WebForms.ReportDataSource("ds_market_details", this.sds_market_details));
            
        }
    }
}