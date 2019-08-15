using System;
using System.Web.UI.WebControls;

namespace ReportsLoyalty.pages.upl_visits
{
    public partial class upl_visits : System.Web.UI.Page
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
            this.sds_upl_visits.SelectCommand =
                @"SELECT * FROM rep.t_get_participant_separation_by_visits(@date_start, @date_end, @market_id) a
                    ORDER BY a.p";
            this.sds_upl_visits.SelectCommandType = SqlDataSourceCommandType.Text;
            this.sds_upl_visits.SelectParameters.Clear();
            this.sds_upl_visits.SelectParameters.Add("market_id", market_id);
            this.sds_upl_visits.SelectParameters.Add("date_start", dt_start.ToString("yyyy-MM-dd"));
            this.sds_upl_visits.SelectParameters.Add("date_end", dt_end.ToString("yyyy-MM-dd"));
        }
    }
}