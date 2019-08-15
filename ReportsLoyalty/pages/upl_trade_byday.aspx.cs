using System;
using System.Web.UI.WebControls;

namespace ReportsLoyalty.pages.upl_byday
{
    public partial class upl_trade_byday : System.Web.UI.Page
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

            /*----------------------------------------------------------------------------------------------------------*/

            this.sds_load.SelectCommand =
                @"SELECT * FROM rep.t_get_card_trade_rating(@date_start, @date_end, @market_id) a
                    ORDER BY a.market_name, a.days_of_shopping";
            this.sds_load.SelectCommandType = SqlDataSourceCommandType.Text;
            this.sds_load.SelectParameters.Clear();
            this.sds_load.SelectParameters.Add("market_id", market_id);
            this.sds_load.SelectParameters.Add("date_start", dt_start.ToString("yyyy-MM-dd"));
            this.sds_load.SelectParameters.Add("date_end", dt_end.ToString("yyyy-MM-dd"));
        }

        private void LocalReport_SubreportProcessing(object sender, Microsoft.Reporting.WebForms.SubreportProcessingEventArgs e)
        {
            /* Загружаемо дані в субрепорти*/
            //try
            //{
            //    e.DataSources.Add(new Microsoft.Reporting.WebForms.ReportDataSource("ds_is_not_sms_sent", this.sds_is_not_sms_sent));
            //}
            //catch (Exception error)
            //{
            //    int i = 0;
            //}
        }
    }
}