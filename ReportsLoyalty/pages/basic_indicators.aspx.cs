using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace ReportsLoyalty.pages
{
    public partial class basic_indicators : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            var date_start = Request.QueryString["date_start"].ToString();
            var date_end = Request.QueryString["date_end"].ToString();
            var market_id = Request.QueryString["market_id"].ToString();

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

            this.sds_basic_indicators.SelectCommand =
                @"SELECT market_name, program_day, count_doc, sale_tc, count_doc_with_card, 
                    sale_tc_with_card, count_get_card, count_fill_profil, state_bonuses, used_bonuses 
                  FROM rep.t_get_basic_indicators_pt(@market_id, @date_start, @date_end) AS a 
                    ORDER BY market_name, program_day";
            this.sds_basic_indicators.SelectCommandType = SqlDataSourceCommandType.Text;
            this.sds_basic_indicators.SelectParameters.Clear();

            this.sds_basic_indicators.SelectParameters.Add("market_id", market_id);
            this.sds_basic_indicators.SelectParameters.Add("date_start", dt_start.ToString("yyyy-MM-dd"));
            this.sds_basic_indicators.SelectParameters.Add("date_end", dt_end.ToString("yyyy-MM-dd"));

            ReportViewerExtraPoints.LocalReport.SubreportProcessing += LocalReport_SubreportProcessing;
        }

        private void LocalReport_SubreportProcessing(object sender, Microsoft.Reporting.WebForms.SubreportProcessingEventArgs e)
        {
            /* Загружаемо дані в субрепорти*/
            try
            {
                e.DataSources.Add(new Microsoft.Reporting.WebForms.ReportDataSource("ds_basic_indicators_diagrams", this.sds_basic_indicators));
                //e.DataSources.Add(new Microsoft.Reporting.WebForms.ReportDataSource("ds_diff_day_with_extra_points", this.sds_day_diff));
                //e.DataSources.Add(new Microsoft.Reporting.WebForms.ReportDataSource("ds_diff_distance_with_extra_points", this.sds_distance));
            }
            catch (Exception error)
            {
                int i = 0;
            }
        }
    }
}