using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using EtData;
using System.Web.Script.Serialization;
using System.Text;
using Newtonsoft.Json;

namespace ReportsLoyalty.Controllers
{
    public class CampaignController : ApiController
    {
        // GET: api/Campaign
        //public IEnumerable<campaigns_mk> Get()
        public object Get()
        {
            var queryparams = Request.GetQueryNameValuePairs();

            var page = Convert.ToInt32(queryparams.Where(w => w.Key == "page").FirstOrDefault().Value);
            var start = Convert.ToInt32(queryparams.Where(w => w.Key == "start").FirstOrDefault().Value);
            var limit = Convert.ToInt32(queryparams.Where(w => w.Key == "limit").FirstOrDefault().Value);

            var isRun = queryparams.Where(w => w.Key == "isRun").FirstOrDefault();
            //var SpecProduct = (SpecProductObj.Value == null ? string.Empty : SpecProductObj.Value.ToString());            

            using (GetData data = new GetData())
            {
                var campaigns = data.Campaigns.GetCampaigns(Convert.ToBoolean(isRun.Value))
                    .Where(w => w.number >= start && w.number <= (start + limit));//.OrderByDescending(o => o.id);
                int campaigns_count = data.Campaigns.GetCampaignsCount(Convert.ToBoolean(isRun.Value));

                object om = new
                {
                    total = campaigns_count,
                    data = campaigns
                };

                return om;
            }

            //var cmps = data.Campaigns.GetCampaigns().Where(c => c.            

            //var response = new HttpResponseMessage();

            //var str = new JavaScriptSerializer().Serialize(campaigns.ToList());
            //str = string.Format("\"data\":{0}", str); campaigns.Count().ToString()
            //str = string.Format("\"total\": \"{0}\", \"data\":{1}", campaigns_count.ToString(), str);
            //str = "{" + str + "}";
            //response.Content = new StringContent(str, Encoding.UTF8, "application/json");

            //return response;
        }

        //public HttpResponseMessage Get()
        //{
        //    var queryparams = Request.GetQueryNameValuePairs();

        //    var page = Convert.ToInt32(queryparams.Where(w => w.Key == "page").FirstOrDefault().Value);
        //    var start = Convert.ToInt32(queryparams.Where(w => w.Key == "start").FirstOrDefault().Value);
        //    var limit = Convert.ToInt32(queryparams.Where(w => w.Key == "limit").FirstOrDefault().Value);

        //    var isRun = queryparams.Where(w => w.Key == "isRun").FirstOrDefault();
        //    //var SpecProduct = (SpecProductObj.Value == null ? string.Empty : SpecProductObj.Value.ToString());            

        //    GetData data = new GetData();

        //    //var cmps = data.Campaigns.GetCampaigns().Where(c => c.

        //    var campaigns = data.Campaigns.GetCampaigns(Convert.ToBoolean(isRun.Value)).Where(
        //            w => w.number >= start && w.number <= (start + limit)
        //        ).OrderBy(o => o.id);

        //    int campaigns_count = data.Campaigns.GetCampaignsCount(Convert.ToBoolean(isRun.Value));

        //    var response = new HttpResponseMessage();

        //    var str = new JavaScriptSerializer().Serialize(campaigns.ToList());
        //    //str = string.Format("\"data\":{0}", str); campaigns.Count().ToString()
        //    str = string.Format("\"total\": \"{0}\", \"data\":{1}", campaigns_count.ToString(), str);
        //    str = "{" + str + "}";
        //    response.Content = new StringContent(str, Encoding.UTF8, "application/json");

        //    return response;
        //}

        [HttpGet]
        public HttpResponseMessage GetCampaignsTerms(long id)
        {
            using (GetData data = new GetData())
            {
                var queryparams = Request.GetQueryNameValuePairs();
                var page = Convert.ToInt32(queryparams.Where(w => w.Key == "page").FirstOrDefault().Value);
                var start = Convert.ToInt32(queryparams.Where(w => w.Key == "start").FirstOrDefault().Value);
                var limit = Convert.ToInt32(queryparams.Where(w => w.Key == "limit").FirstOrDefault().Value);

                //var campaign_id = queryparams.Where(w => w.Key == "campaign_id").FirstOrDefault();

                var campaign_terms = data.Campaigns.GetCampaignsTerms(id).Where(
                        w => w.Rn >= start && w.Rn <= (start + limit)
                    ).OrderBy(o => o.Rn);

                int campaigns_count = data.Campaigns.GetCampaignsTerms(id).Count();

                var response = new HttpResponseMessage();
                var str = new JavaScriptSerializer().Serialize(campaign_terms);
                //str = string.Format("\"data\":{0}", str); campaigns.Count().ToString()
                str = string.Format("\"total\": \"{0}\", \"data\":{1}", campaigns_count.ToString(), str);
                str = "{" + str + "}";
                response.Content = new StringContent(str, Encoding.UTF8, "application/json");
                return response;
            }
        }

        // GET: api/Campaign/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Campaign
        [HttpPost]
        public void Post(string value) //[FromBody]
        {
            int i = 0;
        }

        // PUT: api/Campaign/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Campaign/5
        public void Delete(int id)
        {
        }

        [HttpPost]
        public long SetCampaignData([FromBody] dynamic value)
        {
            var queryparams = Request.GetQueryNameValuePairs();
            string json = value.ToString();
            EtData.Models.Cmp cmp = JsonConvert.DeserializeObject<EtData.Models.Cmp>(json);

            using (GetData gt = new GetData())
            {
                cmp = gt.Campaigns.SetCampaign(cmp);
            }

            return cmp.campaign_id;
        }

    }
}
