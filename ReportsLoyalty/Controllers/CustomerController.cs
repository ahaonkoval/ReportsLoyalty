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
    public class CustomerController : ApiController
    {
        public HttpResponseMessage Get()
        {
            var queryparams = Request.GetQueryNameValuePairs();
            var page = Convert.ToInt32(queryparams.Where(w => w.Key == "page").FirstOrDefault().Value);
            var start = Convert.ToInt32(queryparams.Where(w => w.Key == "start").FirstOrDefault().Value);
            var limit = Convert.ToInt32(queryparams.Where(w => w.Key == "limit").FirstOrDefault().Value);

            var campaign_id = queryparams.Where(w => w.Key == "campaign_id").FirstOrDefault();

            using (GetData data = new GetData())
            {
                var customers = data.Customers.GetCustomersCampaign(Convert.ToInt64(campaign_id)).Where(
                    w => w.number >= start && w.number <= (start + limit)
                ).OrderBy(o => o.number);

                int count = data.Customers.GetCustomersCampaign(Convert.ToInt64(campaign_id)).Count();
                var response = new HttpResponseMessage();
                var str = new JavaScriptSerializer().Serialize(customers.ToList());
                str = string.Format("\"total\": \"{0}\", \"data\":{1}", count.ToString(), str);
                str = "{" + str + "}";
                response.Content = new StringContent(str, Encoding.UTF8, "application/json");

                return response;
            }
        }
    }
}
