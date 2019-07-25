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
                    var customers = data.Customers.GetCustomersCampaign(Convert.ToInt64(campaign_id.Value), start, limit);

                    int cmp = Convert.ToInt32(campaign_id.Value);

                    int count = data.Customers.GetCustomersCountById(cmp);

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
        public string ClearControlGrpup(int id)
        {
            try
            {
                using (GetData db = new GetData())
                {
                    db.Customers.ClearControlGroup(id);
                    return string.Empty;
                }
            } catch (Exception ex)
            {
                return ex.Message;
            }
        }
       
        //public string GetCrmCustomerId()
        //{

        //}

        #region Get Files Customers
        //[HttpGet]
        public HttpResponseMessage GetFile(int id) {
            var queryparams = Request.GetQueryNameValuePairs();
            var p_start = Convert.ToInt32(queryparams.Where(w => w.Key == "p_start").FirstOrDefault().Value);
            var p_end = Convert.ToInt32(queryparams.Where(w => w.Key == "p_end").FirstOrDefault().Value);
            var type_id = Convert.ToInt32(queryparams.Where(w => w.Key == "type_id").FirstOrDefault().Value);

            var result = Request.CreateResponse(HttpStatusCode.OK);
            try
            {
                MemoryStream reportStream = GenerateExcelReportBetween(id,
                    Convert.ToInt32(p_start), Convert.ToInt32(p_end), Convert.ToInt32(type_id));
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

        //[HttpGet]
        //public HttpResponseMessage GetCustomersFile(int id)
        //{
        //    var result = Request.CreateResponse(HttpStatusCode.OK);
        //    try
        //    {
        //        MemoryStream reportStream = GenerateExcelReport(id);
        //        result.Content = new StreamContent(reportStream);
        //    }
        //    catch (Exception ex)
        //    {              
        //        result.Content = new StringContent(ex.Message, Encoding.Default); //, Encoding.UTF8, "application/json"
        //    }            

        //    result.Content.Headers.ContentType = new MediaTypeHeaderValue("application/octet-stream");
        //    //result.Content.Headers.
        //    using (GetData gd = new GetData())
        //    {
        //        result.Content.Headers.ContentDisposition = new ContentDispositionHeaderValue("attachment")
        //        {
        //            FileName = string.Format(
        //            "({0}){1}.csv", id.ToString(), string.Empty//gd.Campaigns.GetCampaignNameById(id)
        //            )
        //        };

        //        return result;
        //    }
        //}

        //public HttpResponseMessage GetCustomersFileLong(int id)
        //{
        //    var result = Request.CreateResponse(HttpStatusCode.OK);
        //    try
        //    {
        //        MemoryStream reportStream = GenerateExcelReportLong(id);
        //        result.Content = new StreamContent(reportStream);
        //    }
        //    catch (Exception ex)
        //    {
        //        result.Content = new StringContent(ex.Message, Encoding.Default); //, Encoding.UTF8, "application/json"
        //    }

        //    result.Content.Headers.ContentType = new MediaTypeHeaderValue("application/octet-stream");
        //    //result.Content.Headers.
        //    using (GetData gd = new GetData())
        //    {
        //        result.Content.Headers.ContentDisposition = new ContentDispositionHeaderValue("attachment")
        //        {
        //            FileName = string.Format(
        //            "({0}).csv", id.ToString()//, gd.Campaigns.GetCampaignNameById(id)
        //            )
        //        };

        //        return result;
        //    }
        //}
        #endregion

        #region
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

        #endregion

        #region Generate Excel File
        public MemoryStream GenerateExcelReportBetween(int campaignId, int part_start, int part_end, int type_id)
        {
            using (GetData gd = new GetData())
            {
                string filename = string.Format(
                    "({0}_{1}_{2}).csv", campaignId.ToString(), part_start.ToString(), part_end.ToString());

                var path = string.Empty;
                try
                {
                    path = System.Web.Hosting.HostingEnvironment.MapPath(string.Format("~/CmpFiles/{0}", filename));
                }
                catch
                {

                }
                if (File.Exists(path))
                {
                    File.Delete(path);
                }
                DataTable dt = new DataTable();
                switch (type_id)
                {
                    case 1:
                        dt = gd.Customers.GetCustomersBetweenLong(campaignId, part_start, part_end);
                        break;
                    case 2:
                        dt = gd.Customers.GetCustomersBetween(campaignId, part_start, part_end);
                        break;
                }                    

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

        //private MemoryStream GenerateExcelReport(int campaignId)
        //{
        //    using (GetData gd = new GetData())
        //    {
        //        string filename = string.Format("({0}).csv", campaignId.ToString());//, gd.Campaigns.GetCampaignNameById(campaignId));
        //        var path = string.Empty;
        //        try
        //        {
        //           path = System.Web.Hosting.HostingEnvironment.MapPath(string.Format("~/CmpFiles/{0}", filename));
        //        }
        //        catch
        //        {
        //            filename = string.Format("({0}).csv", campaignId.ToString());
        //            path = System.Web.Hosting.HostingEnvironment.MapPath(string.Format("~/CmpFiles/{0}", filename));
        //        }
        //        if (File.Exists(path))
        //        {
        //            File.Delete(path);
        //        }

        //        System.Data.DataTable dt = gd.Customers.GetCustomers(campaignId);
        //        //System.Data.DataTable dt = gd.Customers.GetCustomersBetween(campaignId, 1, 500000);

        //        if (dt.Rows.Count > 0)
        //        {
        //            StringBuilder sb = new StringBuilder();

        //            string[] columnNames = dt.Columns.Cast<DataColumn>().
        //                                              Select(column => column.ColumnName).
        //                                              ToArray(); 
        //            sb.AppendLine(string.Join(";", columnNames));

        //            foreach (DataRow row in dt.Rows)
        //            {
        //                string[] fields = row.ItemArray.Select(field => field.ToString()).
        //                                                ToArray();
        //                sb.AppendLine(string.Join(";", fields));
        //            }

        //            File.WriteAllText(path, sb.ToString(), Encoding.GetEncoding("utf-8")); //  Encoding.GetEncoding(1250)

        //            var bf = File.ReadAllBytes(path);
        //            var dataStream = new MemoryStream(bf);
        //            return dataStream;
        //        }
        //        else
        //        {
        //            return null;
        //        }
        //    }
        //}

        //private MemoryStream GenerateExcelReportLong(int campaignId)
        //{
        //    using (GetData gd = new GetData())
        //    {
        //        string filename = string.Format("({0}).csv", campaignId.ToString());
        //        var path = string.Empty;
        //        try
        //        {
        //            path = System.Web.Hosting.HostingEnvironment.MapPath(string.Format("~/CmpFiles/{0}", filename));
        //        }
        //        catch
        //        {
        //            filename = string.Format("({0}).csv", campaignId.ToString());
        //            path = System.Web.Hosting.HostingEnvironment.MapPath(string.Format("~/CmpFiles/{0}", filename));
        //        }
        //        if (File.Exists(path))
        //        {
        //            File.Delete(path);
        //        }

        //        System.Data.DataTable dt = gd.Customers.GetCustomersLong(campaignId);

        //        if (dt.Rows.Count > 0)
        //        {
        //            StringBuilder sb = new StringBuilder();

        //            string[] columnNames = dt.Columns.Cast<DataColumn>().
        //                                              Select(column => column.ColumnName).
        //                                              ToArray();
        //            sb.AppendLine(string.Join(";", columnNames));

        //            foreach (DataRow row in dt.Rows)
        //            {
        //                string[] fields = row.ItemArray.Select(field => field.ToString()).
        //                                                ToArray();
        //                sb.AppendLine(string.Join(";", fields));
        //            }

        //            File.WriteAllText(path, sb.ToString(), Encoding.GetEncoding("utf-8")); //  Encoding.GetEncoding(1250)

        //            var bf = File.ReadAllBytes(path);
        //            var dataStream = new MemoryStream(bf);
        //            return dataStream;
        //        }
        //        else
        //        {
        //            return null;
        //        }
        //    }
        //}
        #endregion
    }
}
