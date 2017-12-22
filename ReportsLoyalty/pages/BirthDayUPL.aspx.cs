using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;
using Microsoft.Reporting.WebForms;

namespace ReportsLoyalty.pages
{
    public partial class BirthDayUPL : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            var date_start = Request.QueryString["date_start"].ToString();
            var date_end = Request.QueryString["date_end"].ToString();
            var market_id = Request.QueryString["market_id"].ToString();
            var im = Request.QueryString["im"].ToString();

            DateTime dt_start;
            if (date_start == "null")
                dt_start = DateTime.Now;
            else
                dt_start = Convert.ToDateTime(date_start);

            DateTime dt_end;
            if (date_end == "null")
                dt_end = DateTime.Now;
            else
                dt_end = Convert.ToDateTime(date_end);

            if (market_id == string.Empty) market_id = "0";
            int n;
            bool is_numeric_market_id = int.TryParse(market_id, out n);

            this.sds_BirthDayUPL.SelectCommand = "rep.p_get_birth_day_mk_expected_effect";
            this.sds_BirthDayUPL.SelectCommandType = SqlDataSourceCommandType.StoredProcedure;
            this.sds_BirthDayUPL.SelectParameters.Clear();
            this.sds_BirthDayUPL.SelectParameters.Add("date_start", DbType.Date, dt_start.ToString("yyyy-MM-dd"));
            this.sds_BirthDayUPL.SelectParameters.Add("date_end", DbType.Date, dt_end.ToString("yyyy-MM-dd"));
            if (is_numeric_market_id) {
                if (n != 0)
                    this.sds_BirthDayUPL.SelectParameters.Add("market_id", market_id);
            } else {
                this.sds_BirthDayUPL.SelectParameters.Add("market_lst", market_id);
            }
            //this.sds_BirthDayUPL.SelectParameters.Add("market_id", market_id);
            this.sds_BirthDayUPL.SelectParameters.Add("in_market", im);

            //------------------------------------------------------------------------------------------------//
            this.sds_Rating.SelectCommand = "rep.p_get_birth_day_mk_trade_rating";
            this.sds_Rating.SelectCommandType = SqlDataSourceCommandType.StoredProcedure;
            this.sds_Rating.SelectParameters.Clear();
            this.sds_Rating.SelectParameters.Add("date_start", DbType.Date, dt_start.ToString("yyyy-MM-dd"));
            this.sds_Rating.SelectParameters.Add("date_end", DbType.Date, dt_end.ToString("yyyy-MM-dd"));
            if (is_numeric_market_id) {
                if (n != 0)
                    this.sds_Rating.SelectParameters.Add("market_id", market_id);
            } else {
                this.sds_Rating.SelectParameters.Add("market_lst", market_id);
            }
            //this.sds_Rating.SelectParameters.Add("market_id", market_id);
            this.sds_Rating.SelectParameters.Add("in_market", im);
            //------------------------------------------------------------------------------------------------//

            this.sds_discount.SelectCommand = "rep.p_get_birth_day_mk_discount";
            this.sds_discount.SelectCommandType = SqlDataSourceCommandType.StoredProcedure;
            this.sds_discount.SelectParameters.Clear();
            this.sds_discount.SelectParameters.Add("date_start", DbType.Date, dt_start.ToString("yyyy-MM-dd"));
            this.sds_discount.SelectParameters.Add("date_end", DbType.Date, dt_end.ToString("yyyy-MM-dd"));
            if (is_numeric_market_id) {
                if (n != 0)
                    this.sds_discount.SelectParameters.Add("market_id", market_id);
            } else {
                this.sds_discount.SelectParameters.Add("market_lst", market_id);
            }
            //this.sds_discount.SelectParameters.Add("market_id", market_id);
            //this.sds_discount.SelectParameters.Add("campaign_id", "0");

            this.sds_distanse.SelectCommand = "rep.p_get_birth_day_mk_distanse";
            this.sds_distanse.SelectCommandType = SqlDataSourceCommandType.StoredProcedure;
            this.sds_distanse.SelectParameters.Clear();
            this.sds_distanse.SelectParameters.Add("date_start", DbType.Date, dt_start.ToString("yyyy-MM-dd"));
            this.sds_distanse.SelectParameters.Add("date_end", DbType.Date, dt_end.ToString("yyyy-MM-dd"));
            if (is_numeric_market_id) {
                if (n != 0)
                    this.sds_distanse.SelectParameters.Add("market_id", market_id);
            } else {
                this.sds_distanse.SelectParameters.Add("market_lst", market_id);
            }


            //string st_date = gdt.Campaigns.GetStartDateById(Convert.ToInt32(campaign_id)).Value.ToString("dd.MM.yyyy");
            //string ed_date = gdt.Campaigns.GetEndDateById(Convert.ToInt32(campaign_id)).Value.ToString("dd.MM.yyyy");

            ReportViewerBirthDay.LocalReport.SetParameters(new ReportParameter("RP_StartDate", date_start));
            ReportViewerBirthDay.LocalReport.SetParameters(new ReportParameter("RP_EndDate", date_end));

            //this.sds_distanse.SelectParameters.Add("market_id", market_id);
            //this.sds_distanse.SelectParameters.Add("in_market", im);
        }
    }
}