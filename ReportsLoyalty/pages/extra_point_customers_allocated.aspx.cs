using System;
using System.Data;
using System.Web.UI.WebControls;

namespace ReportsLoyalty.pages
{
    public partial class extra_point_repcustomers_allocated : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
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

                this.sds_day_diff.SelectCommand = "rep.p_get_diff_day_with_extra_points";
                this.sds_day_diff.SelectCommandType = SqlDataSourceCommandType.StoredProcedure;
                this.sds_day_diff.SelectParameters.Clear();
                this.sds_day_diff.SelectParameters.Add("campaign_id", campaign_id);
                this.sds_day_diff.SelectParameters.Add("date", DbType.Date, dt.ToString("yyyy-MM-dd"));
                if (is_numeric_market_id)
                {
                    if (n == 0)
                        this.sds_day_diff.SelectParameters.Add("market_id", market_id);
                }
                else
                {
                    this.sds_day_diff.SelectParameters.Add("market_lst", market_id);
                }

                this.sds_distance.SelectCommand = "rep.p_get_diff_distance_with_extra_points";
                this.sds_distance.SelectCommandType = SqlDataSourceCommandType.StoredProcedure;
                this.sds_distance.SelectParameters.Clear();
                this.sds_distance.SelectParameters.Add("campaign_id", campaign_id);
                this.sds_distance.SelectParameters.Add("date", DbType.Date, dt.ToString("yyyy-MM-dd"));
                if (is_numeric_market_id)
                {
                    if (n == 0)
                        this.sds_distance.SelectParameters.Add("market_id", market_id);
                }
                else
                {
                    this.sds_distance.SelectParameters.Add("market_lst", market_id);
                }

                ReportViewerExtraPoints.LocalReport.SubreportProcessing += LocalReport_SubreportProcessing;
            }
            catch
            {

            }
        }

        private void LocalReport_SubreportProcessing(object sender, Microsoft.Reporting.WebForms.SubreportProcessingEventArgs e)
        {
            /* Загружаемо дані в субрепорти*/
            try
            {
                e.DataSources.Add(new Microsoft.Reporting.WebForms.ReportDataSource("ds_diff_day_with_extra_points", this.sds_day_diff));
                e.DataSources.Add(new Microsoft.Reporting.WebForms.ReportDataSource("ds_diff_distance_with_extra_points", this.sds_distance));

            }
            catch
            {

            }
        }
    }
}