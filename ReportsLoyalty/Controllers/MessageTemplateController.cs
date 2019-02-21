using DataModels;
using LoyaltyDB;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
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
                var templates = db.MessageDb.GetMessageTemplates();
                var count = templates.Count();

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

        public string Post([FromBody]dynamic o) //Conteiner
        {
            string id = Convert.ToString(o.Id.Value);
            string m_key = Convert.ToString(o.MKey.Value);
            string m_name = Convert.ToString(o.MName.Value);
            string m_sms = Convert.ToString(o.MSms.Value);
            string m_viber = Convert.ToString(o.MViber.Value);
            int m_condition_doc_amount = Convert.ToInt32(o.ConditionDocAmount.Value);
            string m_link_image = Convert.ToString(o.LinkImage.Value);
            string m_link_button = Convert.ToString(o.LinkButton.Value);


            object n_id = null;
            using (GetData db = new GetData())
            {
                n_id = db.MessageDb.UpdateOrInsert(Convert.ToInt32(id), m_key, m_name, m_viber, m_sms, m_condition_doc_amount, m_link_image, m_link_button);
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
