using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using EtData;
using EtData.Models;
using ReportsLoyalty.Models;
using System.Web.Script.Serialization;
using System.Text;
using Newtonsoft.Json;

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
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Dict
        //public void Post([FromBody]string value)
        //{
        //}

        // PUT: api/Dict/5
        //public void Put(int id, [FromBody]string value)
        //{
        //}

        // DELETE: api/Dict/5
        public void Delete(int id)
        {
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
        public IEnumerable<v_campaigns_mk_run> GetCampaignsRunsListByTypeId(int id)
        {
            GetData gt = new GetData();
            return gt.Campaigns.GetCampaignsRuns().Where(w => w.type_id == id).ToList();
        }
        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public IEnumerable<dict_markets> GetDictMarkets()
        {
            GetData gt = new GetData();

            List<dict_markets> markets = gt.Dict.GetDictMarkets().Where(w => w.is_start == true).ToList();
            markets.Add(
                    new dict_markets
                    {
                        id = 0,
                        short_name = "all",
                        market_name = "ВСІ"                        
                    }
                );

            return markets.OrderBy(o => o.id);
        }

        public IEnumerable<string> GetDisabledDates(int id)
        {
            GetData gt = new GetData();
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
                var fgroups = gt.Dict.GetGroups(id).OrderBy(o => o.name);
                foreach (v_fgroups f in fgroups)
                {
                    g.Add(new FGroup {
                       fgroup_id = f.fgroup_id,
                       name = f.name
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
                foreach (campaign_types ca in c)
                {
                    g.Add(new CampaignType {
                        id = ca.id,
                        name = ca.name
                    });
                }
            }
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

