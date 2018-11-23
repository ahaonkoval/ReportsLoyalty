using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using LoyaltyDB;
using System.Web.Script.Serialization;
using System.Text;
using Newtonsoft.Json;

namespace ReportsLoyalty.Controllers
{
    public class CampaignController : ApiController
    {
        // GET: api/Campaign
        //public IEnumerable<campaigns_mk> Get()
        #region Campaign
        public object Get()
        {
            var queryparams = Request.GetQueryNameValuePairs();

            var page = Convert.ToInt32(queryparams.Where(w => w.Key == "page").FirstOrDefault().Value);
            var start = Convert.ToInt32(queryparams.Where(w => w.Key == "start").FirstOrDefault().Value);
            var limit = Convert.ToInt32(queryparams.Where(w => w.Key == "limit").FirstOrDefault().Value);

            var isRun = queryparams.Where(w => w.Key == "isRun").FirstOrDefault();

            var TypeId = queryparams.Where(w => w.Key == "TypeId").FirstOrDefault();

            long type_id = 0;

            if (TypeId.Value == string.Empty)
            {
                type_id = 0;
            } else
            {
                type_id = Convert.ToInt32(TypeId.Value);
            }

            using (GetData data = new GetData())
            {
                var campaigns = data.Campaigns.GetCampaigns(Convert.ToBoolean(isRun.Value), start, limit, type_id);
                    //.Where(w => w.number >= start && w.number <= (start + limit));//.OrderByDescending(o => o.id);
                int campaigns_count = data.Campaigns.GetCampaignsCount(Convert.ToBoolean(isRun.Value), type_id);

                object om = new
                {
                    total = campaigns_count,
                    data = campaigns
                };

                return om;
            }
        }
        #region CampaignsTerms
        [HttpGet]
        public HttpResponseMessage GetCampaignsTerms(long id)
        {
            using (GetData data = new GetData())
            {
                var queryparams = Request.GetQueryNameValuePairs();
                var page = Convert.ToInt32(queryparams.Where(w => w.Key == "page").FirstOrDefault().Value);
                var start = Convert.ToInt32(queryparams.Where(w => w.Key == "start").FirstOrDefault().Value);
                var limit = Convert.ToInt32(queryparams.Where(w => w.Key == "limit").FirstOrDefault().Value);

                //var campaign_id = queryparams.Where(w => w.Key == "campaign_id").FirstOrDefault();

                var campaign_terms = data.Campaigns.GetCampaignsTerms(id).Where(
                        w => w.Rn >= start && w.Rn <= (start + limit)
                    ).OrderBy(o => o.Rn);

                int campaigns_count = data.Campaigns.GetCampaignsTerms(id).Count();

                var response = new HttpResponseMessage();
                var str = new JavaScriptSerializer().Serialize(campaign_terms);
                //str = string.Format("\"data\":{0}", str); campaigns.Count().ToString()
                str = string.Format("\"total\": \"{0}\", \"data\":{1}", campaigns_count.ToString(), str);
                str = "{" + str + "}";
                response.Content = new StringContent(str, Encoding.UTF8, "application/json");
                return response;
            }
        }

        //[HttpGet]
        //public string StartCalculation(int id)
        //{
        //    var queryparams = Request.GetQueryNameValuePairs();
        //    var dt = queryparams.Where(w => w.Key == "cData").FirstOrDefault().Value;
        //    using (GetData data = new GetData())
        //    {
        //        data.Campaigns.SetStartCalculation(id, Convert.ToDateTime(dt));
        //    }

        //    return string.Empty;
        //}
        #endregion
        /// <summary>
        /// Збереження параметрів кампанії
        /// </summary>
        /// <param name="value"></param>
        /// <returns></returns>
        [HttpPost]
        public long SetCampaignData([FromBody] dynamic value)
        {
            long returned = 0;

            var queryparams = Request.GetQueryNameValuePairs();
            string typeRequest = queryparams.Where(w => w.Key == "callType").FirstOrDefault().Value;       
            string json = value.ToString();            

            if (typeRequest == "SetCampaignData")
            {
                LoyaltyDB.Models.CampaignConvert cmp = JsonConvert.DeserializeObject<LoyaltyDB.Models.CampaignConvert>(json);
                using (GetData gt = new GetData())
                {
                    cmp = gt.Campaigns.SetCampaign(cmp);
                    return cmp.campaign_id;
                }
            } else if (typeRequest == "SetHide")
            {
               LoyaltyDB.Models.CampaignConvert cmp = JsonConvert.DeserializeObject<LoyaltyDB.Models.CampaignConvert>(json);
               using (GetData gt = new GetData())
               {
                    gt.Campaigns.SetHideCampaign(cmp.campaign_id);
               }
                return returned;
            } else if (typeRequest == "SetStartRequesStatus")
            {
                using (GetData gt = new GetData())
                {
                    LoyaltyDB.Models.LcShort Campaign = JsonConvert.DeserializeObject<LoyaltyDB.Models.LcShort>(json);
                    if (gt.Campaigns.SetStartGettingSoftlineStatus(Campaign.CampaignId))
                    {

                    }
                }
                return returned;
            }

            return returned; 
        }
        [HttpPost]
        public string SetCampainStructureData(int id, [FromBody] dynamic value)
        {
            var queryparams = Request.GetQueryNameValuePairs();
            string DepartmentIds = queryparams.Where(w => w.Key == "DepartmentIds").FirstOrDefault().Value;
            string GroupLavel3Ids = queryparams.Where(w => w.Key == "GroupLavel3Ids").FirstOrDefault().Value;

            try
            {
                using (GetData gt = new GetData())
                {
                    gt.Campaigns.SetCampainStructureData(id, DepartmentIds, GroupLavel3Ids);
                    return string.Empty;
                }
            } catch (Exception except)
            {
                return except.Message;
            }
                        
        }
        #endregion
    }
}
