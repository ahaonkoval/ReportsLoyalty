using LoyaltyDB;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Script.Serialization;
using static DataModels.CrmWizardDB;
using Newtonsoft;

namespace ReportsLoyalty.Controllers
{
    public class ArticulsController : ApiController
    {
        // GET: api/CampaignArticul
        public object Get()
        {
            var queryparams = Request.GetQueryNameValuePairs();

            var page = Convert.ToInt32(queryparams.Where(w => w.Key == "page").FirstOrDefault().Value);
            var start = Convert.ToInt32(queryparams.Where(w => w.Key == "start").FirstOrDefault().Value);
            var limit = Convert.ToInt32(queryparams.Where(w => w.Key == "limit").FirstOrDefault().Value);
            var campaign_id = Convert.ToInt32(queryparams.Where(w => w.Key == "cmp_id").FirstOrDefault().Value);

            using (GetData db = new GetData()) {

                var articuls = db.Art.GetCampaignsArticuls(campaign_id, start, limit);
                var count = db.Art.GetCountByCampaignId(campaign_id);

                object o = new
                {
                    total = count,
                    data = articuls
                };

                return o;
            }
        }

        // GET: api/CampaignArticul/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/CampaignArticul
        public string Post([FromBody]dynamic Conteiner)
        {
            int status = 0;
            string articul = Convert.ToString(Conteiner.Articul.Value);
            int campaignId = Convert.ToInt32(Conteiner.CampaignId.Value);

            using (GetData db = new GetData())
            {
                status = db.Art.SetArticul(campaignId, articul);
            }

            //Newtonsoft.Json.JsonConvert.SerializeObject()

            //var os = new JavaScriptSerializer().Serialize(new RArt { Articul = articul, Status = status });

            string os = Newtonsoft.Json.JsonConvert.SerializeObject(new RArt { Articul = articul, Status = status });

            return os;

        }

        // PUT: api/CampaignArticul/5
        public void Put(int id, [FromBody]string value)
        {

        }

        // DELETE: api/CampaignArticul/5
        public void Delete(int id)
        {
        }
    }

    public class RArt
    {
        public int Status { get; set; }

        public string Articul { get; set; }
    }
}
