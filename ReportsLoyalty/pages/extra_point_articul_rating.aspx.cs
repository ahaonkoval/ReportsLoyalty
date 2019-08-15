using System;
using System.Data;
using System.Web.UI.WebControls;

namespace ReportsLoyalty.pages
{
    public partial class extra_point_articul_rating : System.Web.UI.Page
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

                this.sds_report.SelectCommand = "[rep].[p_get_trade_with_extra_points]";
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
            }
            catch
            {

            }
        }
    }
}