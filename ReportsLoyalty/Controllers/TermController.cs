using LoyaltyDB;
using LoyaltyDB.Models;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Web.Http;

namespace ReportsLoyalty.Controllers
{
    public class TermController : ApiController
    {
        // GET: api/Term
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/Term/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Term
        public void Post([FromBody]dynamic value) //
        {
            //var queryparams = Request.GetQueryNameValuePairs();
            string json = value.ToString();
            Lterminate term = JsonConvert.DeserializeObject<Lterminate>(json);
            using (GetData data = new GetData())
            {
                data.Campaigns.CreateTerm(term);
            }
            //return 123;            
        }

        // PUT: api/Term/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Term/5
        public void Delete(int id)
        {
        }

        //[HttpPost]
        //public long AddCampaignTerms([FromBody] dynamic value)
        //{
        //    var queryparams = Request.GetQueryNameValuePairs();
        //    string json = value.ToString();
        //    var term = JsonConvert.DeserializeObject<Object>(json);
        //    return 123;
        //}
    }
}
