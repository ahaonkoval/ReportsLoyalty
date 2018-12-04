using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using LoyaltyDB;
using System.Web.Script.Serialization;
using System.Text;
using Newtonsoft.Json;
using System.Net.Http.Headers;
using System.IO;
using System.Data;
using ReportsLoyalty.Helpers;
//using Microsoft.Office.Interop.Excel;
//using System.Runtime.InteropServices;

namespace ReportsLoyalty.Controllers
{
    public class CustomerController : ApiController
    {
        public object Get() //HttpResponseMessage
        {
            var queryparams = Request.GetQueryNameValuePairs();
            var page = Convert.ToInt32(queryparams.Where(w => w.Key == "page").FirstOrDefault().Value);
            var start = Convert.ToInt32(queryparams.Where(w => w.Key == "start").FirstOrDefault().Value);
            var limit = Convert.ToInt32(queryparams.Where(w => w.Key == "limit").FirstOrDefault().Value);

            var campaign_id = queryparams.Where(w => w.Key == "campaign_id").FirstOrDefault();
            var response = new HttpResponseMessage();
            if (campaign_id.Value != null)
            {
                using (GetData data = new GetData())
                {
                    var customers = data.Customers.GetCustomersCampaign(Convert.ToInt64(campaign_id.Value), start, limit);//.OrderBy(o => o.number);

                    int cmp = Convert.ToInt32(campaign_id.Value);

                    int count = data.Customers.GetCustomersCountById(cmp);

                    //var str = new JavaScriptSerializer().Serialize(customers.ToList());
                    //str = string.Format("\"total\": \"{0}\", \"data\":{1}", count.ToString(), str);
                    //str = "{" + str + "}";
                    //response.Content = new StringContent(str, Encoding.UTF8, "application/json");

                    //return response;

                    object om = new
                    {
                        total = count,
                        data = customers
                    };

                    return om;
                }
            } else { return response; }

        }
        [HttpGet]
        public HttpResponseMessage GetCustomersFile(int id)
        {
            var result = Request.CreateResponse(HttpStatusCode.OK);
            try
            {
                MemoryStream reportStream = GenerateExcelReport(id);
                result.Content = new StreamContent(reportStream);
            }
            catch (Exception ex)
            {              
                result.Content = new StringContent(ex.Message, Encoding.Default); //, Encoding.UTF8, "application/json"
            }

            

            result.Content.Headers.ContentType = new MediaTypeHeaderValue("application/octet-stream");
            //result.Content.Headers.
            using (GetData gd = new GetData())
            {
                result.Content.Headers.ContentDisposition = new ContentDispositionHeaderValue("attachment")
                {
                    FileName = string.Format(
                    "({0}){1}.csv", id.ToString(), string.Empty//gd.Campaigns.GetCampaignNameById(id)
                    )
                };

                return result;
            }
        }

        [HttpGet]
        public string GetSelectedCustomesCount(int id) {

            var queryparams = Request.GetQueryNameValuePairs();
            var page = Convert.ToInt32(queryparams.Where(w => w.Key == "page").FirstOrDefault().Value);
            var start = Convert.ToInt32(queryparams.Where(w => w.Key == "start").FirstOrDefault().Value);
            var limit = Convert.ToInt32(queryparams.Where(w => w.Key == "limit").FirstOrDefault().Value);

            string tradeCentreLst = string.Empty;
            KeyValuePair<string, string>[] mlst = queryparams.Where(w => w.Key == "marketLst").ToArray();
            tradeCentreLst = ConverterHelper.GetStrigFormated(mlst);

            string cardTypeLst = string.Empty;
            KeyValuePair<string, string>[] ctl = queryparams.Where(w => w.Key == "cardTypeLst").ToArray();
            cardTypeLst = ConverterHelper.GetStrigFormated(ctl);

            CustomerSelect cs = new LoyaltyDB.CustomerSelect
            {
                campaignId = id,
                marketLst = tradeCentreLst,
                avgBetweenAtd = queryparams.Where(w => w.Key == "avgBetweenAtd").FirstOrDefault().Value,
                avgDoc = queryparams.Where(w => w.Key == "avgDoc").FirstOrDefault().Value,
                lastDate = queryparams.Where(w => w.Key == "lastDate").FirstOrDefault().Value,
                maxDoc = queryparams.Where(w => w.Key == "maxDoc").FirstOrDefault().Value,
                obert = queryparams.Where(w => w.Key == "obert").FirstOrDefault().Value,
                qtyAtd = queryparams.Where(w => w.Key == "qtyAtd").FirstOrDefault().Value,
                qtyDocs = queryparams.Where(w => w.Key == "qtyDocs").FirstOrDefault().Value,
                qtyPoints = queryparams.Where(w => w.Key == "qtyPoints").FirstOrDefault().Value,
                startDate = queryparams.Where(w => w.Key == "startDate").FirstOrDefault().Value,

                cardTypeLst = cardTypeLst,
                obertIntersport = queryparams.Where(w => w.Key == "obertIntersport").FirstOrDefault().Value,
                obertMoncheri = queryparams.Where(w => w.Key == "obertMoncheri").FirstOrDefault().Value
            };

            string returned = string.Empty;
            using (GetData dt = new GetData())
            {
                returned = dt.Customers.GetSelectedCustomersCount(cs);
            }

            return returned;
        }

        [HttpGet]
        public string StartFillCampaignFromSelectedCustomes(int id)
        {
            var queryparams = Request.GetQueryNameValuePairs();
            var page = Convert.ToInt32(queryparams.Where(w => w.Key == "page").FirstOrDefault().Value);
            var start = Convert.ToInt32(queryparams.Where(w => w.Key == "start").FirstOrDefault().Value);
            var limit = Convert.ToInt32(queryparams.Where(w => w.Key == "limit").FirstOrDefault().Value);

            string tradeCentreLst = string.Empty;
            KeyValuePair<string, string>[] mlst = queryparams.Where(w => w.Key == "marketLst").ToArray();
            tradeCentreLst = ConverterHelper.GetStrigFormated(mlst);

            string cardTypeLst = string.Empty;
            KeyValuePair<string, string>[] ctl = queryparams.Where(w => w.Key == "cardTypeLst").ToArray();
            cardTypeLst = ConverterHelper.GetStrigFormated(ctl);

            CustomerSelect cs = new LoyaltyDB.CustomerSelect
            {
                campaignId = id,
                marketLst = tradeCentreLst,
                avgBetweenAtd = queryparams.Where(w => w.Key == "avgBetweenAtd").FirstOrDefault().Value,
                avgDoc = queryparams.Where(w => w.Key == "avgDoc").FirstOrDefault().Value,
                lastDate = queryparams.Where(w => w.Key == "lastDate").FirstOrDefault().Value,
                maxDoc = queryparams.Where(w => w.Key == "maxDoc").FirstOrDefault().Value,
                obert = queryparams.Where(w => w.Key == "obert").FirstOrDefault().Value,
                qtyAtd = queryparams.Where(w => w.Key == "qtyAtd").FirstOrDefault().Value,
                qtyDocs = queryparams.Where(w => w.Key == "qtyDocs").FirstOrDefault().Value,
                qtyPoints = queryparams.Where(w => w.Key == "qtyPoints").FirstOrDefault().Value,
                startDate = queryparams.Where(w => w.Key == "startDate").FirstOrDefault().Value,

                cardTypeLst = cardTypeLst,
                obertIntersport = queryparams.Where(w => w.Key == "obertIntersport").FirstOrDefault().Value,
                obertMoncheri = queryparams.Where(w => w.Key == "obertMoncheri").FirstOrDefault().Value
            };

            Global.SP.StartCreateCampaignFromSelect(cs);

            return string.Empty;
        }        

        [HttpGet]
        public HttpResponseMessage GetCustomersFileLong(int id)
        {
            var result = Request.CreateResponse(HttpStatusCode.OK);
            try
            {
                MemoryStream reportStream = GenerateExcelReportLong(id);
                result.Content = new StreamContent(reportStream);
            }
            catch (Exception ex)
            {
                result.Content = new StringContent(ex.Message, Encoding.Default); //, Encoding.UTF8, "application/json"
            }

            result.Content.Headers.ContentType = new MediaTypeHeaderValue("application/octet-stream");
            //result.Content.Headers.
            using (GetData gd = new GetData())
            {
                result.Content.Headers.ContentDisposition = new ContentDispositionHeaderValue("attachment")
                {
                    FileName = string.Format(
                    "({0}).csv", id.ToString()//, gd.Campaigns.GetCampaignNameById(id)
                    )
                };

                return result;
            }
        }

        private MemoryStream GenerateExcelReport(int campaignId)
        {
            using (GetData gd = new GetData())
            {
                string filename = string.Format("({0}).csv", campaignId.ToString());//, gd.Campaigns.GetCampaignNameById(campaignId));
                var path = string.Empty;
                try
                {
                   path = System.Web.Hosting.HostingEnvironment.MapPath(string.Format("~/CmpFiles/{0}", filename));
                }
                catch
                {
                    filename = string.Format("({0}).csv", campaignId.ToString());
                    path = System.Web.Hosting.HostingEnvironment.MapPath(string.Format("~/CmpFiles/{0}", filename));
                }
                if (File.Exists(path))
                {
                    File.Delete(path);
                }

                System.Data.DataTable dt = gd.Customers.GetCustomers(campaignId);

                if (dt.Rows.Count > 0)
                {
                    StringBuilder sb = new StringBuilder();

                    string[] columnNames = dt.Columns.Cast<DataColumn>().
                                                      Select(column => column.ColumnName).
                                                      ToArray(); 
                    sb.AppendLine(string.Join(";", columnNames));

                    foreach (DataRow row in dt.Rows)
                    {
                        string[] fields = row.ItemArray.Select(field => field.ToString()).
                                                        ToArray();
                        sb.AppendLine(string.Join(";", fields));
                    }

                    File.WriteAllText(path, sb.ToString(), Encoding.GetEncoding("utf-8")); //  Encoding.GetEncoding(1250)

                    var bf = File.ReadAllBytes(path);
                    var dataStream = new MemoryStream(bf);
                    return dataStream;
                }
                else
                {
                    return null;
                }
            }
        }

        private MemoryStream GenerateExcelReportLong(int campaignId)
        {
            using (GetData gd = new GetData())
            {
                string filename = string.Format("({0}).csv", campaignId.ToString());
                var path = string.Empty;
                try
                {
                    path = System.Web.Hosting.HostingEnvironment.MapPath(string.Format("~/CmpFiles/{0}", filename));
                }
                catch
                {
                    filename = string.Format("({0}).csv", campaignId.ToString());
                    path = System.Web.Hosting.HostingEnvironment.MapPath(string.Format("~/CmpFiles/{0}", filename));
                }
                if (File.Exists(path))
                {
                    File.Delete(path);
                }

                System.Data.DataTable dt = gd.Customers.GetCustomersLong(campaignId);

                if (dt.Rows.Count > 0)
                {
                    StringBuilder sb = new StringBuilder();

                    string[] columnNames = dt.Columns.Cast<DataColumn>().
                                                      Select(column => column.ColumnName).
                                                      ToArray();
                    sb.AppendLine(string.Join(";", columnNames));

                    foreach (DataRow row in dt.Rows)
                    {
                        string[] fields = row.ItemArray.Select(field => field.ToString()).
                                                        ToArray();
                        sb.AppendLine(string.Join(";", fields));
                    }

                    File.WriteAllText(path, sb.ToString(), Encoding.GetEncoding("utf-8")); //  Encoding.GetEncoding(1250)

                    var bf = File.ReadAllBytes(path);
                    var dataStream = new MemoryStream(bf);
                    return dataStream;
                }
                else
                {
                    return null;
                }
            }
        }
    }
}
