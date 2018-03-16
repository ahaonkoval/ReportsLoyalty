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

namespace ReportsLoyalty.pages.personal_offers
{
    public partial class personal_offers : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            var campaign_id = Request.QueryString["campaign_id"].ToString();
            var date_st = Request.QueryString["date_st"].ToString();
            var market_id = Request.QueryString["market_id"].ToString();
            var ctrl = Request.QueryString["ctrl"].ToString();

            DateTime dt;
            if (date_st == "null") {
                dt = DateTime.Now.AddDays(-1);
            }
            else {
                Regex regex = new Regex(@"‎+");
                date_st = regex.Replace(date_st, "");
                dt = Convert.ToDateTime(date_st);
            }

            if (market_id == string.Empty) market_id = "0";
            int n;
            bool is_numeric_market_id = int.TryParse(market_id, out n);

            this.sds_expected_effect.SelectCommand = "rep.p_get_daily_pers_expected_effect";
            this.sds_expected_effect.SelectCommandType = SqlDataSourceCommandType.StoredProcedure;
            this.sds_expected_effect.SelectParameters.Clear();
            this.sds_expected_effect.SelectParameters.Add("campaign_id", campaign_id);
            this.sds_expected_effect.SelectParameters.Add("date", DbType.Date, dt.ToString("yyyy-MM-dd"));
            if (is_numeric_market_id) {
                if (n != 0)
                    this.sds_expected_effect.SelectParameters.Add("market_id", market_id);
            } else {
                this.sds_expected_effect.SelectParameters.Add("market_lst", market_id);
            }
            this.sds_expected_effect.SelectParameters.Add("control_group", ctrl);
            //------------------------------------------------------------------------------------------------//
            //this.sds_days_allocated.SelectCommand = "rep.p_get_daily_pers_map_allocation";
            //this.sds_days_allocated.SelectCommandType = SqlDataSourceCommandType.StoredProcedure;
            //this.sds_days_allocated.SelectParameters.Clear();
            //this.sds_days_allocated.SelectParameters.Add("campaign_id", campaign_id);
            //this.sds_days_allocated.SelectParameters.Add("date", DbType.Date, dt.ToString("yyyy-MM-dd"));
            //if (is_numeric_market_id) {
            //    if (n != 0)
            //        this.sds_days_allocated.SelectParameters.Add("market_id", market_id);
            //} else
            //{
            //    this.sds_days_allocated.SelectParameters.Add("market_lst", market_id);
            //}            
            //this.sds_days_allocated.SelectParameters.Add("control_group", ctrl);
            //this.sds_days_allocated.SelectParameters.Add("allocation_type", "1");
            //------------------------------------------------------------------------------------------------//
            //this.sds_distance_allocated.SelectCommand = "rep.p_get_daily_pers_map_allocation";
            //this.sds_distance_allocated.SelectCommandType = SqlDataSourceCommandType.StoredProcedure;
            //this.sds_distance_allocated.SelectParameters.Clear();
            //this.sds_distance_allocated.SelectParameters.Add("campaign_id", campaign_id);
            //this.sds_distance_allocated.SelectParameters.Add("date", DbType.Date, dt.ToString("yyyy-MM-dd"));
            //if (is_numeric_market_id) {
            //    if (n != 0)
            //        this.sds_distance_allocated.SelectParameters.Add("market_id", market_id);
            //} else {
            //    this.sds_distance_allocated.SelectParameters.Add("market_lst", market_id);
            //}
            //this.sds_distance_allocated.SelectParameters.Add("control_group", ctrl);
            //this.sds_distance_allocated.SelectParameters.Add("allocation_type", "2");
            //------------------------------------------------------------------------------------------------//

            //this.market_rating.SelectCommand = "rep.p_get_daily_pers_trade_rating";
            //this.market_rating.SelectCommandType = SqlDataSourceCommandType.StoredProcedure;
            //this.market_rating.SelectParameters.Clear();
            //this.market_rating.SelectParameters.Add("campaign_id", campaign_id);
            //this.market_rating.SelectParameters.Add("date", DbType.Date, dt.ToString("yyyy-MM-dd"));
            //if (is_numeric_market_id) {
            //    if (n != 0)
            //        this.market_rating.SelectParameters.Add("market_id", market_id);
            //} else {
            //    this.market_rating.SelectParameters.Add("market_lst", market_id);
            //}
            ////this.market_rating.SelectParameters.Add("market_id", market_id);
            //this.market_rating.SelectParameters.Add("control_group", ctrl);
            //this.market_rating.SelectParameters.Add("lavel", "0");
            //------------------------------------------------------------------------------------------------//

            //this.sds_group_rating.SelectCommand = "rep.p_get_daily_pers_trade_rating";
            //this.sds_group_rating.SelectCommandType = SqlDataSourceCommandType.StoredProcedure;
            //this.sds_group_rating.SelectParameters.Clear();
            //this.sds_group_rating.SelectParameters.Add("campaign_id", campaign_id);
            //this.sds_group_rating.SelectParameters.Add("date", DbType.Date, dt.ToString("yyyy-MM-dd"));
            //if (is_numeric_market_id) {
            //    if (n != 0)
            //        this.sds_group_rating.SelectParameters.Add("market_id", market_id);
            //} else {
            //    this.sds_group_rating.SelectParameters.Add("market_lst", market_id);
            //}
            ////this.sds_group_rating.SelectParameters.Add("market_id", market_id);
            //this.sds_group_rating.SelectParameters.Add("control_group", ctrl);
            //this.sds_group_rating.SelectParameters.Add("lavel", "2");

            using (GetData gdt = new GetData())
            {
                ReportViewerPersonalOffers.LocalReport.SetParameters(new ReportParameter("CampaignName",
                    gdt.Campaigns.GetCampaignNameById(Convert.ToInt32(campaign_id))
                ));

                string DepartmentName = gdt.Campaigns.GetCurrentDepartamentNameById(Convert.ToInt32(campaign_id));

                ReportViewerPersonalOffers.LocalReport.SetParameters(new ReportParameter("DepartmentName",
                    string.Format("Департамент: {0}", DepartmentName)
                ));

                //OtdName
            }
            // DepartmentName
            //ReportViewerPersonalOffers.LocalReport.SubreportProcessing += LocalReport_SubreportProcessing;

            //ReportViewerPersonalOffers.LocalReport.SetParameters(new ReportParameter("GroupName", 
            //    gdt.Campaigns.GetCurrentGroupNameById(Convert.ToInt32(campaign_id))
            //    ));


            //ReportViewerPersonalOffers.LocalReport.SetParameters(new ReportParameter("MainRatingGroupName",
            //     gdt.Campaigns.GetCurrentGroupNameById(Convert.ToInt32(campaign_id))
            //    ));

            //ReportViewerPersonalOffers.LocalReport.SetParameters(new ReportParameter("MainRatingDepartName",
            //     gdt.Campaigns.GetCurrentDepartamentNameById(Convert.ToInt32(campaign_id))
            //    ));

            //string md = gdt.Campaigns.GetCampaignMarginByLevelId(Convert.ToInt32(campaign_id), 0).ToString();

            //string mm = gdt.Campaigns.GetCampaignMarginByLevelId(Convert.ToInt32(campaign_id), -1).ToString();

            //ReportViewerPersonalOffers.LocalReport.SetParameters(new ReportParameter("mDepart", md));

            //ReportViewerPersonalOffers.LocalReport.SetParameters(new ReportParameter("mMarket", mm));
            //if (ctrl == "true") {
            //    ReportViewerPersonalOffers.LocalReport.SetParameters(new ReportParameter("ctrl", "К-сть УПЛ"));
            //} else
            //{
            //    //ReportViewerPersonalOffers.LocalReport.SetParameters(new ReportParameter("ctrl", "Канал"));
            //}


        }

        private void LocalReport_SubreportProcessing(object sender, Microsoft.Reporting.WebForms.SubreportProcessingEventArgs e)
        {
            /* Загружаемо дані в субрепорти*/
            //e.DataSources.Add(new Microsoft.Reporting.WebForms.ReportDataSource("ds_daily_pers_days_allocation", this.sds_days_allocated));
            //e.DataSources.Add(new Microsoft.Reporting.WebForms.ReportDataSource("ds_daily_pers_distance_allocation", this.sds_distance_allocated));

            //e.DataSources.Add(new Microsoft.Reporting.WebForms.ReportDataSource("ds_daily_pers_trade_rating_0", this.market_rating));
            //e.DataSources.Add(new Microsoft.Reporting.WebForms.ReportDataSource("ds_daily_pers_trade_rating_2", this.sds_group_rating));
            //e.DataSources.Add(new Microsoft.Reporting.WebForms.ReportDataSource("ds_diff_distance_with_extra_points", this.sds_distance));
            


        }
    }
}