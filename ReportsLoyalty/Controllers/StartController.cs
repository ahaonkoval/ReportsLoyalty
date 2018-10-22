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
            var TypeRequest = queryparams.Where(w => w.Key == "TypeRequest").FirstOrDefault().Value;

            switch (Convert.ToInt32(TypeRequest))
            {
                case 1:
                    /* Запуск на перерахунок */
                    var dt = queryparams.Where(w => w.Key == "cData").FirstOrDefault().Value;
                    Global.SP.Start(id, Convert.ToDateTime(dt));
                    break;
                case 10:
                    /* */
                    using (GetData od = new GetData())
                    {
                        /* ToDo Вигружать последние операции... */
                        var m = od.Campaigns.GetCalculationLogLast();

                        if (m != null)
                        {
                            CampaignInfo ci = new Models.CampaignInfo
                            {
                                CampaignId = m.CampaignId.Value.ToString(),
                                CampaignName = od.Campaigns.GetCalculationCampaignName(),
                                Created = m.Created.Value.ToString("dd.MM.yyyy"),
                                Status = m.Status.Value.ToString()
                            };
                            RT = Newtonsoft.Json.JsonConvert.SerializeObject(ci);

                        } else
                        {
                            CampaignInfo ci = new Models.CampaignInfo
                            {
                                CampaignId = "0",
                                CampaignName = string.Empty,
                                Created = DateTime.Now.ToString("dd.MM.yyyy"),
                                Status = "0"
                            };
                            RT = Newtonsoft.Json.JsonConvert.SerializeObject(ci);
                        }
                       
                    }
                    break;
                case 20:
                    var campaignId = queryparams.Where(w => w.Key == "CampaignId").FirstOrDefault().Value;
                    var TableName = queryparams.Where(w => w.Key == "TableName").FirstOrDefault().Value;
                    var toDelete = queryparams.Where(w => w.Key == "toDelete").FirstOrDefault().Value;

                    Global.SP.StartFillCampaignFromTableList(Convert.ToInt32(campaignId), TableName, Convert.ToBoolean(toDelete));
                    break;
            }

            return RT;
        }

        [HttpGet]
        public string GetFilledCampaignId()
        {
            string returned = string.Empty;
            using (GetData data = new GetData())
            {
                returned = data.Dict.GetFillingCampaignId().ToString();
            }
            return returned;
        }
    }
}
