using LoyaltyDB;
using System;
using System.Linq;
using System.Web.Http;

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

        [HttpPost]
        public string Send([FromBody]dynamic o)
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
        /// <summary>
        /// 
        /// </summary>
        /// <param name="o"></param>
        /// <returns></returns>
        [HttpPost]
        public string SetToTest([FromBody]dynamic o)
        {
            int Id = Convert.ToInt32(o.Id.Value);
            bool Checked = Convert.ToBoolean(o.Checked.Value);
            using (GetData db = new GetData())
            {
                db.MessageDb.SetToTest(Id, Checked);
            }
            try
            {
                return "true";
            }
            catch (Exception ex)
            {
                return "false";
            }
        }
    }
}
