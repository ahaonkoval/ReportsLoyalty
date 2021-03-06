﻿using LoyaltyDB;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Web.Http;
using System.Web.Script.Serialization;

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
            }
            else
            {
                type_id = Convert.ToInt32(TypeId.Value);
            }

            using (GetData data = new GetData())
            {
                var campaigns = data.Campaigns.GetCampaigns(Convert.ToBoolean(isRun.Value), start, limit, type_id);
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
        public HttpResponseMessage GetCampaignsTerms(int id)
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
        /// <summary>
        /// 
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet]
        public string GetCampaignSectionName(int id)
        {
            using (GetData data = new GetData())
            {
                return data.Campaigns.GetCampaignSectionName(id);
            }
        }

        [HttpGet]
        public IEnumerable<object> GetCampaignDepartments(int id)
        {
            using (GetData gt = new GetData())
            {
                return gt.Campaigns.GetCampaignDepartments(id);
            }
        }
        [HttpGet]
        public IEnumerable<object> GetCampaignGroupLaval3(int id)
        {
            using (GetData gt = new GetData())
            {
                return gt.Campaigns.GetCampaignGroupLaval3(id);
            }
        }

        [HttpGet]
        public string GetGroupsIdsById(int id)
        {
            string s = string.Empty;
            using (GetData gt = new GetData())
            {
                s = gt.Campaigns.GetGroupsIdsByCampaignId(id);
            }

            return s;
        }
        /// <summary>
        /// створення кампанії
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet]
        public string CreateCampaign(int id)
        {
            var queryparams = Request.GetQueryNameValuePairs();
            string Name = queryparams.Where(w => w.Key == "Name").FirstOrDefault().Value;

            using (GetData data = new GetData())
            {
                return data.Campaigns.CreateCampaign(Name).ToString();
            }
            //return string.Empty;
        }
        #endregion
        /// <summary>
        /// Збереження параметрів кампанії
        /// </summary>
        /// <param name="value"></param>
        /// <returns></returns>
        [HttpPost]
        public long SetCampaignData(int id, [FromBody] dynamic value)
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
            }
            else if (typeRequest == "SetHide")
            {
                //LoyaltyDB.Models.CampaignConvert cmp = JsonConvert.DeserializeObject<LoyaltyDB.Models.CampaignConvert>(json);
                using (GetData gt = new GetData())
                {
                    gt.Campaigns.SetHideCampaign(id);
                }
                return returned;
            }
            else if (typeRequest == "SetStartRequesStatus")
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
            string SectionId = queryparams.Where(w => w.Key == "SectionId").FirstOrDefault().Value;

            //string DepartmentIds = queryparams.Where(w => w.Key == "DepartmentIds").FirstOrDefault().Value;
            //string GroupLavel3Ids = queryparams.Where(w => w.Key == "GroupLavel3Ids").FirstOrDefault().Value;

            string DepartmentIds = value.DepartmentIds.ToString();
            string GroupLavel3Ids = value.GroupLavel3Ids.ToString();

            try
            {
                using (GetData gt = new GetData())
                {
                    gt.Campaigns.SetCampainStructureData(id, DepartmentIds, GroupLavel3Ids, SectionId);
                    return string.Empty;
                }
            }
            catch (Exception except)
            {
                return except.Message;
            }

        }
        #endregion
    }
}
