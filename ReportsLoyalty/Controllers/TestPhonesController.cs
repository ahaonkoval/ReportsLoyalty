using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using DataModels;
using LoyaltyDB;

namespace ReportsLoyalty.Controllers
{
    public class TestPhonesController : ApiController
    {
        public object Get()
        {
            using (GetData db = new GetData())
            {
                var phones = db.MessageDb.GetTestPhones();
                var count = phones.Count();

                object o = new
                {
                    total = count,
                    data = phones
                };

                return o;
            }
        }

        public string Post([FromBody]dynamic o)
        {
            string TemplateId = Convert.ToString(o.TemplateId.Value);

            if (TemplateId.Trim() != string.Empty)
            {
                using (GetData db = new GetData())
                {
                    db.MessageDb.SendTest(Convert.ToInt32(TemplateId));
                }
            }

            return string.Empty;
        }
    }
}
