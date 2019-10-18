using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using LoyaltyDB;

namespace ReportsLoyalty.Controllers
{
    public class GoodtStructDictController : ApiController
    {
        // GET: api/GoodtStructDict
        public object Get()
        {
            var queryparams = Request.GetQueryNameValuePairs();

            var page = Convert.ToInt32(queryparams.Where(w => w.Key == "page").FirstOrDefault().Value);
            var start = Convert.ToInt32(queryparams.Where(w => w.Key == "start").FirstOrDefault().Value);
            var limit = Convert.ToInt32(queryparams.Where(w => w.Key == "limit").FirstOrDefault().Value);
            //var campaign_id = Convert.ToInt32(queryparams.Where(w => w.Key == "cmp_id").FirstOrDefault().Value);

            using (GetData db = new GetData())
            {

                var dict = db.gtAccord27ua.GetGoodDictAccord27ua(start, limit);
                var count = dict.Count();

                object o = new
                {
                    total = count,
                    data = dict
                };

                return o;
            }
        }

        // GET: api/GoodtStructDict/5
        public object Get(int id)
        {
            using (GetData db = new GetData())
            {
                return db.gtAccord27ua.GetOneGoodDictAccord27ua(id);
            }
        }

        // POST: api/GoodtStructDict
        // Оновлення пункту в структурі
        public void Post([FromBody]string value)
        {
        }

    }
}
