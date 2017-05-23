using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace ReportsLoyalty.pages.program_indicators
{
    public partial class page_program_indicators : System.Web.UI.Page
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

            this.sds_program_indicators.SelectCommand =
                @"SELECT * FROM rep.t_get_program_indicators(@date_start, @date_end, @market_id) a
                    ORDER BY a.market";
            this.sds_program_indicators.SelectCommandType = SqlDataSourceCommandType.Text;
            this.sds_program_indicators.SelectParameters.Clear();
            this.sds_program_indicators.SelectParameters.Add("market_id", market_id);
            this.sds_program_indicators.SelectParameters.Add("date_start", dt_start.ToString("yyyy-MM-dd"));
            this.sds_program_indicators.SelectParameters.Add("date_end", dt_end.ToString("yyyy-MM-dd"));
            
        }
    }
}