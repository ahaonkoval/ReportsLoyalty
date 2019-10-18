using DataModels;
using LoyaltyDB;
using System;
using System.Data;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Web.Http;

namespace ReportsLoyalty.Controllers
{
    public class MessageTemplateController : ApiController
    {
        public object Get()
        {
            var queryparams = Request.GetQueryNameValuePairs();

            var page = Convert.ToInt32(queryparams.Where(w => w.Key == "page").FirstOrDefault().Value);
            var start = Convert.ToInt32(queryparams.Where(w => w.Key == "start").FirstOrDefault().Value);
            var limit = Convert.ToInt32(queryparams.Where(w => w.Key == "limit").FirstOrDefault().Value);
            var campaign_id = Convert.ToInt32(queryparams.Where(w => w.Key == "cmp_id").FirstOrDefault().Value);

            using (GetData db = new GetData())
            {

                var templates = db.MessageDb.GetMessageTemplates(page - 1);//.Where(w => w.Id >= start && w.Id <= (start + limit));
                //var templates = db.MessageDb.GetMessageTemplates(page-1);//.Where(w => w.Id >= start && w.Id <= (start + limit));
                var count = db.MessageDb.GetMessageTemplatesCount();



                object o = new
                {
                    total = count,
                    data = templates
                };

                return o;
            }
        }

        public SendMessagesTemplates Get(int id)
        {
            using (GetData db = new GetData())
            {
                return db.MessageDb.GetMessageTemplateById(id);
            }
        }

        /// <summary>
        /// Статистика по відправленим тригерним повідомленням
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public object DataGetSentTriggerMessages(int id)
        {
            using (GetData db = new GetData())
            {
                var dt = db.MessageDb.GetSentTriggerMessages();
                object o = new
                {
                    total = dt.Count(),
                    data = dt
                };

                return o;
            }
        }
        [HttpGet]
        public object GetRecipientsTriggerMessage(int id)
        {
            var queryparams = Request.GetQueryNameValuePairs();

            var page = Convert.ToInt32(queryparams.Where(w => w.Key == "page").FirstOrDefault().Value);
            var start = Convert.ToInt32(queryparams.Where(w => w.Key == "start").FirstOrDefault().Value);
            var limit = Convert.ToInt32(queryparams.Where(w => w.Key == "limit").FirstOrDefault().Value);
            var date = Convert.ToDateTime(queryparams.Where(w => w.Key == "DateSent").FirstOrDefault().Value);

            using (GetData db = new GetData())
            {
                try
                {
                    var recipients = db.MessageDb.GetRecipientsTriggerMessage(id, date, start + 1, start + limit);
                    int count = db.MessageDb.GetRecipientsCountbyTemplateId(id, date);
                    object o = new
                    {
                        total = count,
                        data = recipients
                    };

                    return o;
                }
                catch (Exception ex)
                {
                    return null;
                }
            }
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet]
        public object GetSentTriggerMessageByDate(int id)
        {
            var queryparams = Request.GetQueryNameValuePairs();

            var page = Convert.ToInt32(queryparams.Where(w => w.Key == "page").FirstOrDefault().Value);
            var start = Convert.ToInt32(queryparams.Where(w => w.Key == "start").FirstOrDefault().Value);
            var limit = Convert.ToInt32(queryparams.Where(w => w.Key == "limit").FirstOrDefault().Value);

            using (GetData db = new GetData())
            {
                var data = db.MessageDb.GetSentTriggerMessageByDate(id);
                int count = data.Count();
                object o = new
                {
                    total = count,
                    data = data
                };
                return o;
            }
        }
        [HttpGet]
        public HttpResponseMessage GetCustomersSendTemplatesById(int id)
        {
            var queryparams = Request.GetQueryNameValuePairs();
            //var p_start = Convert.ToInt32(queryparams.Where(w => w.Key == "p_start").FirstOrDefault().Value);
            //var p_end = Convert.ToInt32(queryparams.Where(w => w.Key == "p_end").FirstOrDefault().Value);
            //var type_id = Convert.ToInt32(queryparams.Where(w => w.Key == "type_id").FirstOrDefault().Value);

            var result = Request.CreateResponse(HttpStatusCode.OK);
            try
            {
                MemoryStream reportStream = CreateExcelFile(id);
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
        public MemoryStream CreateExcelFile(int campaignId)
        {
            using (GetData gd = new GetData())
            {
                string filename = string.Format(
                    "({0})TemplateSent.csv", campaignId.ToString());

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
                //DataTable dt = new DataTable();

                DataTable dt = gd.MessageDb.GetAllRecipientsTriggerMessage(campaignId);


                //switch (type_id)
                //{
                //    case 1:
                //        dt = gd.Customers.GetCustomersBetweenLong(campaignId, part_start, part_end);
                //        break;
                //    case 2:
                //        dt = gd.Customers.GetCustomersBetween(campaignId, part_start, part_end);
                //        break;
                //}

                if (dt.Rows.Count > 0)
                {
                    StringBuilder sb = new StringBuilder();

                    string[] columnNames = dt.Columns.Cast<DataColumn>().Select(column => column.ColumnName).ToArray();
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

        public string Post([FromBody]dynamic o) //Conteiner
        {
            string id                   = Convert.ToString(o.Id.Value);
            string m_key                = Convert.ToString(o.MKey.Value);
            string m_name               = Convert.ToString(o.MName.Value);
            string m_sms                = Convert.ToString(o.MSms.Value);
            string m_viber              = Convert.ToString(o.MViber.Value);
            int m_condition_doc_amount  = Convert.ToInt32(o.ConditionDocAmount.Value);
            string m_link_image         = Convert.ToString(o.LinkImage.Value);
            string m_link_button        = Convert.ToString(o.LinkButton.Value);
            DateTime date_start         = Convert.ToDateTime(o.DateStart);
            DateTime date_end           = Convert.ToDateTime(o.DateEnd);

            object n_id = null;
            using (GetData db = new GetData())
            {
                n_id = db.MessageDb.UpdateOrInsert(Convert.ToInt32(id), m_key, m_name, m_viber, m_sms, 
                    m_condition_doc_amount, m_link_image, m_link_button, date_start, date_end);
            }
            return n_id == null ? string.Empty : n_id.ToString();
        }

        public void Put(int id, [FromBody]string value)
        {

        }

        // DELETE: api/CampaignArticul/5
        public void Delete(int id)
        {
            using (GetData db = new GetData())
            {
                db.MessageDb.DeleteMessageTemplate(id);
            }
        }
    }
}
