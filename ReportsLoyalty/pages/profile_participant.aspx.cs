using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace ReportsLoyalty.pages.profile_participant
{
    public partial class profile_participant : System.Web.UI.Page
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
            this.sds_gender.SelectCommand =
                @"SELECT * FROM rep.t_get_count_customers_by_gender_is_profile(@date_start, @date_end, @market_id) a
                    ORDER BY a.market_name, a.gender";
            this.sds_gender.SelectCommandType = SqlDataSourceCommandType.Text;
            this.sds_gender.SelectParameters.Clear();
            this.sds_gender.SelectParameters.Add("market_id", market_id);
            this.sds_gender.SelectParameters.Add("date_start", dt_start.ToString("yyyy-MM-dd"));
            this.sds_gender.SelectParameters.Add("date_end", dt_end.ToString("yyyy-MM-dd"));
            /*----------------------------------------------------------------------------------------------------------*/
            this.sds_age_particiapnt.SelectCommand =
                @"SELECT * FROM rep.t_get_allocation_customers_for_age(@date_start, @date_end, @market_id) a
                    ORDER BY a.market_name, a.name";
            this.sds_age_particiapnt.SelectCommandType = SqlDataSourceCommandType.Text;
            this.sds_age_particiapnt.SelectParameters.Clear();
            this.sds_age_particiapnt.SelectParameters.Add("market_id", market_id);
            this.sds_age_particiapnt.SelectParameters.Add("date_start", dt_start.ToString("yyyy-MM-dd"));
            this.sds_age_particiapnt.SelectParameters.Add("date_end", dt_end.ToString("yyyy-MM-dd"));
            /*----------------------------------------------------------------------------------------------------------*/
            this.sds_kids_age.SelectCommand =
                @"SELECT * FROM rep.t_get_allocation_kids_for_age(@date_start, @date_end, @market_id) a
                    ORDER BY a.market_name, a.id";
            this.sds_kids_age.SelectCommandType = SqlDataSourceCommandType.Text;
            this.sds_kids_age.SelectParameters.Clear();
            this.sds_kids_age.SelectParameters.Add("market_id", market_id);
            this.sds_kids_age.SelectParameters.Add("date_start", dt_start.ToString("yyyy-MM-dd"));
            this.sds_kids_age.SelectParameters.Add("date_end", dt_end.ToString("yyyy-MM-dd"));
            /*----------------------------------------------------------------------------------------------------------*/
            this.sds_animals.SelectCommand =
                @"select * from rep.t_get_allacation_customers_by_animals(@date_start, @date_end, @market_id) order by market_name";
            this.sds_animals.SelectCommandType = SqlDataSourceCommandType.Text;
            this.sds_animals.SelectParameters.Clear();
            this.sds_animals.SelectParameters.Add("market_id", market_id);
            this.sds_animals.SelectParameters.Add("date_start", dt_start.ToString("yyyy-MM-dd"));
            this.sds_animals.SelectParameters.Add("date_end", dt_end.ToString("yyyy-MM-dd"));
            /*----------------------------------------------------------------------------------------------------------*/
            this.sds_hobby.SelectCommand =
                @"select * from rep.t_get_allocation_customers_by_hobby(@date_start, @date_end, @market_id) order by market_name";
            this.sds_hobby.SelectCommandType = SqlDataSourceCommandType.Text;
            this.sds_hobby.SelectParameters.Clear();
            this.sds_hobby.SelectParameters.Add("market_id", market_id);
            this.sds_hobby.SelectParameters.Add("date_start", dt_start.ToString("yyyy-MM-dd"));
            this.sds_hobby.SelectParameters.Add("date_end", dt_end.ToString("yyyy-MM-dd"));
            /*----------------------------------------------------------------------------------------------------------*/
            this.sds_car.SelectCommand =
                @"select * from rep.t_get_allocation_customers_by_have_car(@date_start, @date_end, @market_id) order by market_name";
            this.sds_car.SelectCommandType = SqlDataSourceCommandType.Text;
            this.sds_car.SelectParameters.Clear();
            this.sds_car.SelectParameters.Add("market_id", market_id);
            this.sds_car.SelectParameters.Add("date_start", dt_start.ToString("yyyy-MM-dd"));
            this.sds_car.SelectParameters.Add("date_end", dt_end.ToString("yyyy-MM-dd"));
            /*----------------------------------------------------------------------------------------------------------*/
            this.sds_is_not_sms_sent.SelectCommand =
                @"select * from rep.t_get_is_not_sms_sent(@date_start, @date_end, @market_id) order by market_name";
            this.sds_is_not_sms_sent.SelectCommandType = SqlDataSourceCommandType.Text;
            this.sds_is_not_sms_sent.SelectParameters.Clear();
            this.sds_is_not_sms_sent.SelectParameters.Add("market_id", market_id);
            this.sds_is_not_sms_sent.SelectParameters.Add("date_start", dt_start.ToString("yyyy-MM-dd"));
            this.sds_is_not_sms_sent.SelectParameters.Add("date_end", dt_end.ToString("yyyy-MM-dd"));
            /*----------------------------------------------------------------------------------------------------------*/

            ReportViewerExtraPoints.LocalReport.SubreportProcessing += LocalReport_SubreportProcessing;
        }
        private void LocalReport_SubreportProcessing(object sender, Microsoft.Reporting.WebForms.SubreportProcessingEventArgs e)
        {
            /* Загружаемо дані в субрепорти*/
            try
            {
                e.DataSources.Add(new Microsoft.Reporting.WebForms.ReportDataSource("ds_is_not_sms_sent", this.sds_is_not_sms_sent));
            }
            catch (Exception error)
            {
                int i = 0;
            }
        }
    }
}