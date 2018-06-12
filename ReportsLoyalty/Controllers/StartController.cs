using LoyaltyDB;
using ReportsLoyalty.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using Newtonsoft;

namespace ReportsLoyalty.Controllers
{
    public class StartController : ApiController
    {
        public string Get(int id)
        {
            string RT = string.Empty;

            var queryparams = Request.GetQueryNameValuePairs();
            var dt = queryparams.Where(w => w.Key == "cData").FirstOrDefault().Value;
            var TypeRequest = queryparams.Where(w => w.Key == "TypeRequest").FirstOrDefault().Value;

            switch (Convert.ToInt32(TypeRequest))
            {
                case 1:                    
                    Global.SP.Start(id, Convert.ToDateTime(dt));
                    
                    break;
                case 10:
                    /* */
                    using (GetData od = new GetData())
                    {
                        var m = od.Campaigns.GetCalculationLogLast();

                        CampaignInfo ci = new Models.CampaignInfo
                        {
                            CampaignId = m.CampaignId.Value.ToString(),
                            CampaignName = od.Campaigns.GetCalculationCampaignName(),
                            Created = m.Created.Value.ToString("dd.MM.yyyy"),
                            Status = m.Status.Value.ToString()
                        };
                        RT = Newtonsoft.Json.JsonConvert.SerializeObject(ci);
                    }
                    break;
            }

            return RT;
        }
    }
}
