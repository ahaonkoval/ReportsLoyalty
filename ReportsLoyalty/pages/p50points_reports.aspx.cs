using LoyaltyDB;
using Microsoft.Reporting.WebForms;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace ReportsLoyalty.pages
{
    public partial class p_50points_reports : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            var campaign_id = Request.QueryString["campaign_id"].ToString();           
            //var im = Request.QueryString["im"].ToString();
            var market_id = Request.QueryString["market_id"].ToString();
            var ctrl = Request.QueryString["ctrl"].ToString();

            using (GetData gd = new GetData())
            {

                this.sds50points_reports.SelectCommand = @"rep.p_get_50points_report_data";
                this.sds50points_reports.SelectCommandType = SqlDataSourceCommandType.StoredProcedure;
                this.sds50points_reports.SelectParameters.Clear();

                this.sds50points_reports.SelectParameters.Add("campaign_id", campaign_id);
                this.sds50points_reports.SelectParameters.Add("market_id", market_id);
                this.sds50points_reports.SelectParameters.Add("ctrl_group", "0");

                if (Convert.ToInt32(campaign_id) == 0)
                {
                    ReportViewer.LocalReport.SetParameters(new ReportParameter("Name", "Всі"));
                    ReportViewer.LocalReport.SetParameters(new ReportParameter("DStart",
                        DateTime.Now.ToShortDateString()));

                    ReportViewer.LocalReport.SetParameters(new ReportParameter("DEnd",
                                 DateTime.Now.ToShortDateString()));

                    ReportViewer.LocalReport.SetParameters(new ReportParameter("is_all", "1"));

                } else
                {
                    ReportViewer.LocalReport.SetParameters(new ReportParameter("Name",
                                 gd.Campaigns.GetCampaignNameById(Convert.ToInt32(campaign_id))));

                    ReportViewer.LocalReport.SetParameters(new ReportParameter("DStart",
                        gd.Campaigns.GetStartDateById(Convert.ToInt32(campaign_id)).Value.ToShortDateString()));

                    ReportViewer.LocalReport.SetParameters(new ReportParameter("DEnd",
                                 gd.Campaigns.GetEndDateById(Convert.ToInt32(campaign_id)).Value.ToShortDateString()));

                    ReportViewer.LocalReport.SetParameters(new ReportParameter("is_all", "0"));
                }
                //this.sds50points_reports.SelectCommand = @"SELECT        
                //                market_name, 
                //                qty_proposal, 
                //                qty_participant, 
                //                sm_obert, 
                //                avg_doc_sm, 
                //                bonus_sm_free, 
                //                bonus_used
                //           FROM rep.t_get_50points_report(@campaign_id, @d_start, @d_end, @ctrl_group) AS a";
                //this.sds50points_reports.SelectCommandType = SqlDataSourceCommandType.Text;
                //this.sds50points_reports.SelectParameters.Clear();
                //this.sds50points_reports.SelectParameters.Add("campaign_id", campaign_id);
                //this.sds50points_reports.SelectParameters.Add("d_start", DbType.Date, gd.Campaigns.GetStartDateById(Convert.ToInt32(campaign_id)).Value.ToString("yyyy-MM-dd"));
                //this.sds50points_reports.SelectParameters.Add("d_end", DbType.Date, gd.Campaigns.GetEndDateById(Convert.ToInt32(campaign_id)).Value.ToString("yyyy-MM-dd"));
                //this.sds50points_reports.SelectParameters.Add("ctrl_group", ctrl);
            }
        }
    }
}