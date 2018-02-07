using LoyaltyDB;
using Microsoft.Reporting.WebForms;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace ReportsLoyalty.pages
{
    public partial class extra_point_data : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            //this.ReportViewerExtraPoints.Reset();

            try
            {
                var campaign_id = Request.QueryString["campaign_id"].ToString();
                var date_st = Request.QueryString["date_st"].ToString();
                var market_id = Request.QueryString["market_id"].ToString();

                if (market_id == string.Empty) market_id = "0";
                int n;
                bool is_numeric_market_id = int.TryParse(market_id, out n);

                DateTime dt;
                if (date_st == "null")
                {
                    dt = DateTime.Now.AddDays(-1);
                }
                else
                {
                    dt = Convert.ToDateTime(date_st);
                }

                this.sds_report.SelectCommand = "rep.p_get_sale_with_extra_points";
                this.sds_report.SelectCommandType = SqlDataSourceCommandType.StoredProcedure;
                this.sds_report.SelectParameters.Clear();
                this.sds_report.SelectParameters.Add("campaign_id", campaign_id);
                this.sds_report.SelectParameters.Add("date", DbType.Date, dt.ToString("yyyy-MM-dd"));
                if (is_numeric_market_id)
                {
                    if (n == 0)
                        this.sds_report.SelectParameters.Add("market_id", market_id);
                }
                else
                {
                    this.sds_report.SelectParameters.Add("market_lst", market_id);
                }
                //this.sds_report.SelectParameters.Add("market_id", market_id);

    


                //this.sds_trade_list.SelectCommand = "[rep].[p_get_trade_with_extra_points]";
                //this.sds_trade_list.SelectCommandType = SqlDataSourceCommandType.StoredProcedure;
                //this.sds_trade_list.SelectParameters.Clear();
                //this.sds_trade_list.SelectParameters.Add("campaign_id", campaign_id);
                //this.sds_trade_list.SelectParameters.Add("date", DbType.Date, dt.ToString("yyyy-MM-dd"));// dt.ToString("yyyy-MM-dd"));

                //if (is_numeric_market_id)
                //{
                //    if (n == 0)
                //        this.sds_trade_list.SelectParameters.Add("market_id", market_id);
                //}
                //else
                //{
                //    this.sds_trade_list.SelectParameters.Add("market_lst", market_id);
                //}

                //ReportViewerExtraPoints.LocalReport.SubreportProcessing += LocalReport_SubreportProcessing;

                GetData gdt = new GetData();

                ReportViewerExtraPoints.LocalReport.SubreportProcessing += LocalReport_SubreportProcessing;

                ReportViewerExtraPoints.LocalReport.SetParameters(new ReportParameter("NameCampaign",
                    gdt.Campaigns.GetCampaignNameById(Convert.ToInt32(campaign_id))));

                string st_date = gdt.Campaigns.GetStartDateById(Convert.ToInt32(campaign_id)).Value.ToString("dd.MM.yyyy");
                string ed_date = gdt.Campaigns.GetEndDateById(Convert.ToInt32(campaign_id)).Value.ToString("dd.MM.yyyy");

                ReportViewerExtraPoints.LocalReport.SetParameters(new ReportParameter("RP_StartDate", st_date));
                ReportViewerExtraPoints.LocalReport.SetParameters(new ReportParameter("RP_EndDate", ed_date));

                //this.ReportViewerExtraPoints.ReportRefresh += ReportViewerExtraPoints_ReportRefresh;
                
            }
            catch (Exception error)
            {
                int i = 0;
            }
        }

        private void LocalReport_SubreportProcessing(object sender, Microsoft.Reporting.WebForms.SubreportProcessingEventArgs e)
        {
            /* Загружаемо дані в субрепорти*/
            try
            {                
                //e.DataSources.Add(new Microsoft.Reporting.WebForms.ReportDataSource("ds_diff_day_with_extra_points", this.sds_day_diff));
                //e.DataSources.Add(new Microsoft.Reporting.WebForms.ReportDataSource("ds_diff_distance_with_extra_points", this.sds_distance));
                //e.DataSources.Add(new Microsoft.Reporting.WebForms.ReportDataSource("ds_get_trade_with_extra_points", this.sds_trade_list));

            }
            catch (Exception error)
            {
                int i = 0;
            }
        }
    }
}