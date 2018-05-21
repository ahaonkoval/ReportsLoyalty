using LoyaltyDB;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace ReportsLoyalty.Controllers
{
    public class ReportController : ApiController
    {
        // GET: api/Report
        public object Get()
        {
            //return new string[] { "value1", "value2" };
            int returned = 1;
            try
            {
                using (GetData gt = new GetData())
                {
                    var queryparams = Request.GetQueryNameValuePairs();
                    var page = Convert.ToInt32(queryparams.Where(w => w.Key == "page").FirstOrDefault().Value);
                    var start = Convert.ToInt32(queryparams.Where(w => w.Key == "start").FirstOrDefault().Value);
                    var limit = Convert.ToInt32(queryparams.Where(w => w.Key == "limit").FirstOrDefault().Value);

                    var CampaignId = queryparams.Where(w => w.Key == "CampaignId").FirstOrDefault();
                    var RDate = queryparams.Where(w => w.Key == "RDate").FirstOrDefault();
                    var MarketLst = queryparams.Where(w => w.Key == "MarketLst").FirstOrDefault();
                    var ControlGrp = queryparams.Where(w => w.Key == "ControlGrp").FirstOrDefault();


                    var ReportCmp = gt.PC.GetCampaignResultByMarkets(
                        Convert.ToInt32(CampaignId.Value),
                        Convert.ToBoolean(ControlGrp.Value),
                        Convert.ToDateTime(RDate.Value),
                        MarketLst.Value);

                    object om = new
                    {
                        total = ReportCmp.Count(),
                        data = ReportCmp
                    };

                    return om;                    
                }
            }
            catch
            {
                returned = 0;
            }
            return returned;

        }

        // GET: api/Report/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Report
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/Report/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Report/5
        public void Delete(int id)
        {
        }
    }
}
