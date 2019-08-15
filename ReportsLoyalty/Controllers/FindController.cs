using LoyaltyDB;
using System.Linq;
using System.Net.Http;
using System.Web.Http;

namespace ReportsLoyalty.Controllers
{
    public class FindController : ApiController
    {
        // GET: api/Find
        public object Get()
        {
            var queryparams = Request.GetQueryNameValuePairs();
            string Customer = queryparams.Where(w => w.Key == "Customer").FirstOrDefault().Value.ToString();
            string CustomerFeature = queryparams.Where(w => w.Key == "CustomerFeature").FirstOrDefault().Value.ToString();

            string crm_customer_id = string.Empty;

            using (GetData t = new GetData())
            {
                switch (CustomerFeature)
                {
                    case "cbcard":
                        crm_customer_id = t.Customers.GetCrmCustomerIdByBarcode(Customer);
                        break;
                    case "cbphone":
                        crm_customer_id = t.Customers.GetCrmCustomerIdByMobilePhone(Customer);
                        break;
                }
            }

            return crm_customer_id;
        }

        // GET: api/Find/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Find
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/Find/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Find/5
        public void Delete(int id)
        {
        }
    }
}
