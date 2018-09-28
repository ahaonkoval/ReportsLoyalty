using LoyaltyDB.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using LinqToDB;
using DataModels;
using static DataModels.CrmWizardDBStoredProcedures;

namespace LoyaltyDB
{
    public class Dict
    {
        LoyaltyDB.LoyaltyEntities Le;

        public Dict(LoyaltyDB.LoyaltyEntities le)
        {
            Le = le;
        }

        public Dict()
        {
        }
        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public IEnumerable<DictMarkets> GetDictMarkets()
        {
            using (var db = new DataModels.CrmWizardDB())
            {
                return db.DictMarkets.ToList();
            }
            //return Le.dict_markets.ToList();
        }

        //public Decimal GetFractionParticipantSaleByCampaignId(int id)
        //{
        //    return 0;
        //}

        /// <summary>
        /// 
        /// </summary>
        /// <param name="level_id"></param>
        /// <returns></returns>
        public IEnumerable<VFgroups> GetGroups(int level_id)
        {
            using (var db = new DataModels.CrmWizardDB())
            {
                return db.VFgroups.Where(w => w.LevelId == level_id).OrderBy(o => o.FgroupId).ToList();
            }

            //return Le.v_fgroups.Where(w => w.level_id == level_id).OrderBy(o => o.fgroup_id);
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="parent_id"></param>
        /// <returns></returns>
        public IEnumerable<VFgroups> GetGroupsByParentId(int parent_id)
        {
            using (var db = new DataModels.CrmWizardDB())
            {
                return db.VFgroups.Where(w => w.ParentId == parent_id).OrderBy(o => o.FgroupId);
            }
            //return Le.v_fgroups.Where(w => w.parent_id == parent_id).OrderBy(o => o.fgroup_id);
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public IEnumerable<v_fgroups> GetGroupsByOtdId(long id)
        {
            List<v_fgroups> fg = new List<v_fgroups>();
            var groups = Le.t_get_groups_by_otdid(id);
            foreach (t_get_groups_by_otdid_Result o in groups)
            {
                fg.Add(new v_fgroups {
                    fgroup_id = o.fgroup_id.Value,
                     name = o.name
                });
            }
            return fg;
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public IEnumerable<v_fgroups> GetDepartmentsByOtdId(long id)
        {
            List<v_fgroups> fg = new List<v_fgroups>();
            var groups = Le.t_get_departs_by_otdid(id);
            foreach (t_get_departs_by_otdid_Result o in groups)
            {
                fg.Add(new v_fgroups
                {
                    fgroup_id = o.fgroup_id.Value,
                    name = o.name
                });
            }
            return fg;
        }
        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public List<UPLControl> GetUploadingControlData()
        {
            List<UPLControl> l_ctrl = new List<UPLControl>();

            return l_ctrl;
        }

        public IEnumerable<DataModels.StopList> GetStopList(int page, int start, int limit)
        {
            using (var db = new DataModels.CrmWizardDB())
            {
                long index = 1;
                var lst = db.StopList.OrderBy(o => o.Created).ToList();
                var lt = lst.Select(x => new DataModels.StopList
                {
                    StopListId = index++,
                    Created = x.Created,
                    MobilePhone = x.MobilePhone,
                    MPhone = x.MPhone
                }).ToList();

                return lt.Where(w => w.StopListId >= start+1 && w.StopListId <= (start + limit)).OrderBy(om => om.StopListId);
            }
        }

        public long GetStopListCount()
        {
            using (var db = new DataModels.CrmWizardDB())
            {
                return db.StopList.Count();
            }
        }

        public void SetPhoneToStopList(string Phone)
        {
            using (var db = new DataModels.CrmWizardDB())
            {
                db.StopList.Insert(() => new DataModels.StopList {
                    Created = DateTime.Now,
                    MobilePhone = Phone
                });
            }
        }

        public void DeletePhoneFromStopList(int id)
        {
            using (var db = new DataModels.CrmWizardDB())
            {
                db.StopList.Delete(w => w.StopListId == id);
            }
        }
        /// <summary>
        /// перелік об'єктів БД де можуть бути УПЛ
        /// </summary>
        public IEnumerable<PGetTmpTableListResult> GetTmpSchemaTableList()
        {
            using (var db = new DataModels.CrmWizardDB())
            {
                return db.PGetTmpTableList().ToList();
            }
        }

        public int GetFillingCampaignId()
        {
            using (var db = new DataModels.CrmWizardDB())
            {
                var data = db.PGetFillingCampaignId().ToList().FirstOrDefault();
                return data.campaign_id;
            }
        }
    }
}
