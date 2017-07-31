using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace ReportsLoyalty.pages
{
    public partial class CountersDocsAndSell : System.Web.UI.Page
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

            this.sds_counters_docs_bydate.SelectCommand = "rep.p_get_counters_docs_bydate";
            this.sds_counters_docs_bydate.SelectCommandType = SqlDataSourceCommandType.StoredProcedure;
            this.sds_counters_docs_bydate.SelectParameters.Clear();
            this.sds_counters_docs_bydate.SelectParameters.Add("date_start", DbType.Date, dt_start.ToString("yyyy-MM-dd"));
            this.sds_counters_docs_bydate.SelectParameters.Add("date_end", DbType.Date, dt_end.ToString("yyyy-MM-dd"));
            this.sds_counters_docs_bydate.SelectParameters.Add("market_id", market_id);
        }
    }
}