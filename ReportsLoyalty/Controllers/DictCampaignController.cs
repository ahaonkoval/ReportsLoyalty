using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

using LoyaltyDB;
using LoyaltyDB.Models;
using ReportsLoyalty.Models;

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
                campaign_types t = new campaign_types
                {
                    id = 5,
                    name = "50 балів на рахунку"
                };

                var cmps = data.Campaigns.GetCampaignsByType(t).ToList();
                cmps.Add(new v_campaigns_mk {
                    id = 0,
                    name = "Всі",                    
                });

                object o = new
                {                    
                    total = cmps.Count(),
                    data = cmps.OrderBy(m => m.id)
                };

                //Rto o = new Rto
                //{
                //    data = cmps.ToList(),
                //    total = cmps.Count()
                //};
                return o;// o;
            }
        }
    }
}
