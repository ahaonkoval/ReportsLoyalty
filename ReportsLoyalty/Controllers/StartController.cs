using LoyaltyDB;
using ReportsLoyalty.Models;
using System;
using System.Linq;
using System.Net.Http;
using System.Web.Http;

namespace ReportsLoyalty.Controllers
{
    public class StartController : ApiController
    {
        [HttpGet]
        public string GetStart(int id)
        {
            string RT = string.Empty;

            var queryparams = Request.GetQueryNameValuePairs();
            var TypeRequest = queryparams.Where(w => w.Key == "TypeRequest").FirstOrDefault().Value;
            var isDelivery = queryparams.Where(w => w.Key == "isDelyvery").FirstOrDefault().Value;

            switch (Convert.ToInt32(TypeRequest))
            {
                case 1:
                    /* Запуск на перерахунок, тип кампанії визначається вже всередені */
                    var dt = queryparams.Where(w => w.Key == "cData").FirstOrDefault().Value;
                    Global.SP.Start(id, Convert.ToDateTime(dt), Convert.ToBoolean(isDelivery));
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
                                CampaignName = od.Campaigns.GetCalculationCampaignName(Convert.ToInt32(m.CampaignId.Value)),
                                Created = m.Created.Value.ToString("dd.MM.yyyy"),
                                Status = m.Status.Value.ToString()
                            };

                            RT = Newtonsoft.Json.JsonConvert.SerializeObject(ci);

                        }
                        else
                        {
                            //RT = string.Format("Невідомо...");
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
        /// <summary>
        /// Інформація по останній перерахованій кампанії
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet]
        public string GetProcessingLastCampaign(int id)
        {
            string returned = string.Empty;

            var queryparams = Request.GetQueryNameValuePairs();
            var TypeRequest = queryparams.Where(w => w.Key == "TypeRequest").FirstOrDefault().Value;
            var isDelivery = queryparams.Where(w => w.Key == "isDelyvery").FirstOrDefault().Value;

            using (GetData od = new GetData())
            {
                var m = od.Campaigns.GetCalculationLogLast();
                CampaignInfo ci = new Models.CampaignInfo
                {
                    CampaignId = m.CampaignId.Value.ToString(),
                    CampaignName = od.Campaigns.GetCalculationCampaignName(Convert.ToInt32(m.CampaignId.Value)),
                    Created = m.Created.Value.ToString("dd.MM.yyyy"),
                    Status = m.Status.Value.ToString()
                };
                switch (m.Status)
                {
                    case 1:
                        returned = returned + "Процес перерахунку: ";
                        break;
                    case 2:
                        returned = returned + "Перераховано: ";
                        break;
                }
                returned = string.Format("{0}({1}) {2}", returned, ci.CampaignId, ci.CampaignName);
            }

            return returned;
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
        [HttpGet]
        public string CleanControlGroup(int id)
        {
            return string.Empty;
        }
    }
}
