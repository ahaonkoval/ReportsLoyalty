using DataModels;
using LoyaltyDB;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web.Http;

namespace ReportsLoyalty.Controllers
{
    public class DictCampaignController : ApiController
    {
        // GET: api/DictCampaign
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/DictCampaign/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/DictCampaign
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/DictCampaign/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/DictCampaign/5
        public void Delete(int id)
        {
        }

        public object Get50PointsCampaigns(int id)
        {
            var queryparams = Request.GetQueryNameValuePairs();
            var page = Convert.ToInt32(queryparams.Where(w => w.Key == "page").FirstOrDefault().Value);
            var start = Convert.ToInt32(queryparams.Where(w => w.Key == "start").FirstOrDefault().Value);
            var limit = Convert.ToInt32(queryparams.Where(w => w.Key == "limit").FirstOrDefault().Value);

            using (GetData data = new GetData())
            {
                CampaignTypes t = new CampaignTypes
                {
                    Id = 5,
                    Name = "50 балів на рахунку"
                };

                var cmps = data.Campaigns.GetCampaignsByType(t).ToList();
                cmps.Add(new CampaignsMk
                {
                    Id = 0,
                    Name = "Всі",
                });

                object o = new
                {
                    total = cmps.Count(),
                    data = cmps.OrderBy(m => m.Id)
                };

                return o;// o;
            }
        }
    }
}
