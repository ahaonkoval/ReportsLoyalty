using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using LoyaltyDB;
using LoyaltyDB.Models;
using ReportsLoyalty.Models;
using System.Web.Script.Serialization;
using System.Text;
using Newtonsoft.Json;
using DataModels;

namespace ReportsLoyalty.Controllers
{
    public class DictController : ApiController
    {        
        // GET: api/Dict
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/Dict/5
        public object Get(int id)
        {
            switch (id)
            {
                case 1: // Стан завантаження остновних показників
                    break;
            }

            return new object();
        }

        // DELETE: api/Dict/5
        public void Delete(int id)
        {
        }

        [HttpGet]
        public object GetDownloadStatus()
        {
            var queryparams = Request.GetQueryNameValuePairs();
            var page = Convert.ToInt32(queryparams.Where(w => w.Key == "page").FirstOrDefault().Value);
            var start = Convert.ToInt32(queryparams.Where(w => w.Key == "start").FirstOrDefault().Value);
            var limit = Convert.ToInt32(queryparams.Where(w => w.Key == "limit").FirstOrDefault().Value);

            return new object();
        }

        [HttpGet]
        public object GetStopList()
        {
            var queryparams = Request.GetQueryNameValuePairs();
            var page = Convert.ToInt32(queryparams.Where(w => w.Key == "page").FirstOrDefault().Value);
            var start = Convert.ToInt32(queryparams.Where(w => w.Key == "start").FirstOrDefault().Value);
            var limit = Convert.ToInt32(queryparams.Where(w => w.Key == "limit").FirstOrDefault().Value);

            using (GetData gt = new GetData())
            {
                /* !!!!!!!!!!! */
                long tt = gt.Dict.GetStopListCount();
                var dta = gt.Dict.GetStopList(page, start, limit).ToList();
                /* !!!!!!!!!!! */
                object o_data = new
                {
                    total = tt,
                    data = dta
                };

                return o_data;
            }
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public IEnumerable<CampaignsMk> GetCampaignsRunsListByTypeId(int id)
        {
            using (GetData gt = new GetData())
            {
                return gt.Campaigns.GetCampaignsRuns().Where(w => w.TypeId == id).ToList().OrderByDescending(o => o.Id);
            }
            //return gt.Campaigns.GetCampaignsRuns().Where(w => w.type_id == id).ToList();//.Select(m => new v_campaigns_mk_run {                });
        }
        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public IEnumerable<DictMarkets> GetDictMarkets()
        {
            GetData gt = new GetData();

            List<DictMarkets> markets = gt.Dict.GetDictMarkets().Where(w => w.IsStart == true).ToList();
            markets.Add(
                    new DictMarkets
                    {
                        Id = 0,
                        ShortName = "all",
                        MarketName = "ВСІ"                        
                    }
                );

            return markets.OrderBy(o => o.Id);
        }

        public IEnumerable<string> GetDisabledDates(int id)
        {
            using (GetData gt = new GetData()) {
                List<string> lst = new List<string>();
                DateTime? StartDate = gt.Campaigns.GetStartDateById(id);
                DateTime? EndDate = gt.Campaigns.GetEndDateById(id);

                if (StartDate == null) { StartDate = DateTime.Now; }
                if (EndDate == null) { EndDate = DateTime.Now; }

                for (int i = 1; i <= 360; i++)
                {
                    lst.Add(StartDate.Value.AddDays(i * -1).ToString("dd.MM.yyyy"));
                    lst.Add(EndDate.Value.AddDays(i * 1).ToString("dd.MM.yyyy"));
                }
                return lst;
            }
        }

        public object GetCampaignDates(int id)
        {
            using (GetData gt = new GetData())
            {
                List<Dates> lst = new List<Dates>();
                DateTime? StartDate = gt.Campaigns.GetStartDateById(id);
                DateTime? EndDate = gt.Campaigns.GetEndDateById(id);

                while (StartDate <= EndDate)
                {

                    lst.Add(new Models.Dates {
                        Name = StartDate.Value.ToString("dd.MM.yyyy"),
                        IsCalculated = gt.Campaigns.GetIsCalculated(id, StartDate.Value),
                        Value = StartDate.Value
                    });
                    StartDate = StartDate.Value.AddDays(1);                    
                }

                object o_data = new
                {
                    total = lst.Count,
                    data = lst.ToList().OrderByDescending(o => o.Value)
                };

                return o_data;
            }
        }


        /// <summary>
        /// 
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public IEnumerable<FGroup> GetGroups(int id)
        {
            List<FGroup> g = new List<FGroup>();

            using (GetData gt = new GetData())
            {
                var fgroups = gt.Dict.GetGroups(id).OrderBy(o => o.Name).ToList();
                foreach (VFgroups f in fgroups)
                {
                    g.Add(new FGroup {
                       fgroup_id = f.FgroupId,
                       name = f.Name
                    });
                }
            }

            return g;
        }
        /// <summary>
        /// Отримання переліку груп рівня 2 (name2)
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public IEnumerable<FGroup> GetGroupsByOtdId(long id)
        {
            List<FGroup> g = new List<FGroup>();

            using (GetData gt = new GetData())
            {
                var fgroups = gt.Dict.GetGroupsByOtdId(id);
                foreach (v_fgroups f in fgroups)
                {
                    g.Add(new FGroup
                    {
                        fgroup_id = f.fgroup_id,
                        name = f.name
                    });
                }
            }

            return g;
        }
        /// <summary>
        /// Отримання переліку департаментів в відділі (name 1)
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public IEnumerable<FGroup> GetDepartmentsByOtdId(long id)
        {
            List<FGroup> g = new List<FGroup>();

            using (GetData gt = new GetData())
            {
                var fgroups = gt.Dict.GetDepartmentsByOtdId(id);
                foreach (v_fgroups f in fgroups)
                {
                    g.Add(new FGroup
                    {
                        fgroup_id = f.fgroup_id,
                        name = f.name
                    });
                }
            }

            return g;
        }

        public IEnumerable<FGroup> GetGroupsByParentId(int id)
        {
            List<FGroup> g = new List<FGroup>();

            using (GetData gt = new GetData())
            {
                var fgroups = gt.Dict.GetGroupsByParentId(id);
                foreach (VFgroups f in fgroups)
                {
                    g.Add(new FGroup
                    {
                        fgroup_id = f.FgroupId,
                        name = f.Name
                    });
                }
            }

            return g;
        }

        public string GetGroupsIdsById(int id)
        {
            string s = string.Empty;
            using (GetData gt = new GetData())
            {
                s = gt.Campaigns.GetGroupsIdsByCampaignId(id);
            }

            return s;
        }

        public IEnumerable<CampaignType> GetCampaignTypes(int id)
        {
            List<CampaignType> g = new List<CampaignType>();
            using (GetData gt = new GetData())
            {
                var c = gt.Campaigns.GetCampaignTypes();
                foreach (CampaignTypes ca in c)
                {
                    g.Add(new CampaignType
                    {
                        id = ca.Id,
                        name = ca.Name
                    });
                }
            }
            return g;
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public IEnumerable<CampaignType> GetCampaignTypesFilters(int id)
        {
            List<CampaignType> g = new List<CampaignType>();
            using (GetData gt = new GetData())
            {
                var c = gt.Campaigns.GetCampaignTypes();
                foreach (CampaignTypes ca in c)
                {
                    g.Add(new CampaignType
                    {
                        id = ca.Id,
                        name = ca.Name
                    });
                }
            }
            g.Add(
                new CampaignType
                {
                    id = 0,
                    name = "ВСІ"
                });
            return g;
        }

        public IEnumerable<UPLControl> GetUploadControlData(int id) {
            using (GetData gt = new GetData())
            {
                return gt.Dict.GetUploadingControlData();
            }
        }

        [HttpPost]
        public int SetToStopList([FromBody] dynamic Conteiner)
        {
            try
            {
                using (GetData gt = new GetData())
                {
                    gt.Dict.SetPhoneToStopList(Conteiner.Phone.Value.ToString());
                }
                return 0;
            } catch
            {
                return 1;
            }
        }

        [HttpPut]
        public int PutPhoneById(int id, [FromBody] dynamic Conteiner)
        {
            try
            {
                using (GetData gt = new GetData())
                {
                    gt.Dict.DeletePhoneFromStopList(Convert.ToInt32(Conteiner.StopListId.Value));
                }
                return 0;
            }
            catch
            {
                return 1;
            }
        }
    }

    //public class Rto
    //{
    //    public IEnumerable<campaigns_mk> data { get; set; }

    //    public int total { get; set; }

    //    public Rto()
    //    {

    //    }
    //}
}

