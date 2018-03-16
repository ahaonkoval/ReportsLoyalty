using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static DataModels.CrmWizardDB;
using DataModels;

namespace LoyaltyDB
{
    public class Campaigns
    {
        LoyaltyDB.LoyaltyEntities Le;

        public Campaigns(LoyaltyDB.LoyaltyEntities le) {
            Le = le;
        }
        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public IEnumerable<v_campaigns_mk_run> GetCampaignsRuns()
        {
            return Le.v_campaigns_mk_run.ToList();
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public string GetCampaignNameById(int id)
        {
            return Le.v_campaigns_mk.Where(m => m.id == id).First().name;
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public DateTime? GetStartDateById(int id)
        {
            return Le.v_campaigns_mk.Where(m => m.id == id).First().date_start;
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public DateTime? GetEndDateById(int id)
        {
            return Le.v_campaigns_mk.Where(m => m.id == id).First().date_end;
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="isRun"></param>
        /// <returns></returns>
        public IEnumerable<TGetCampaignsResult> GetCampaigns(bool isRun, long start, long limit, long type_id)
        {
            //return Le.t_get_campaigns(isRun).OrderByDescending(o => o.id).ToList();
            using (var db = new DataModels.CrmWizardDB())
            {
                return db.TGetCampaigns(isRun, start, limit, type_id).ToList();
            }
        }

        public IEnumerable<v_campaigns_mk> GetCampaignsByType(campaign_types type)
        {
            return Le.v_campaigns_mk.Where(w => w.type_id == type.id);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="isRun"></param>
        /// <returns></returns>
        public int GetCampaignsCount(bool isRun, long type_id)
        {
            return Le.campaigns_mk.Where(w => w.is_run == isRun && w.type_id == (type_id == 0 ? w.type_id : type_id)).Count();

        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public string GetCurrentGroupNameById(int id)
        {
            // TODO: собрать все группы в одну строку
            StringBuilder sb = new StringBuilder();
            string current = string.Empty;
            var campaign_groups = Le.campaign_groups.Where(w => w.campaign_id == id).OrderBy(o => o.id);
            foreach (campaign_groups c in campaign_groups)
            {
                if (sb.Length > 0)
                {
                    current = Le.v_fgroups.Where(w => w.fgroup_id == c.group_id).FirstOrDefault().name;
                    sb.AppendFormat(", {0}", current);
                } else
                {
                    //current = Le.v_fgroups.Where(w => w.fgroup_id == c.group_id).FirstOrDefault().name;
                    sb.AppendFormat("Департамент:{0}", current);
                }
                
            }
            return sb.ToString(); 
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public string GetCurrentDepartamentNameById(int id)
        {

            using (CrmWizardDB db = new DataModels.CrmWizardDB())
            {
                // Зараз тут департаменти
                List<string> lst = new List<string>();

                var dps = db.CampaignGroups.Where(w => w.CampaignId == id).ToList();
                foreach (CampaignGroups cg in dps)
                {
                    var fg = db.Fgroups.Where(wf => wf.FgroupId == cg.GroupId).FirstOrDefault();
                    lst.Add(fg.Name);
                }

                string ls = string.Join(",", lst.ToArray());

                return ls;
            }                       
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="campaign_id"></param>
        /// <param name="level_id"></param>
        /// <returns></returns>
        public decimal GetCampaignMarginByLevelId(long campaign_id, int level_id)
        {
            decimal o = 0;
            var cmp = Le.campaigns_mk.Where(w => w.id == campaign_id).FirstOrDefault();
            switch (level_id)
            {
                case 0: o = cmp.margin_lavel_0.HasValue ? cmp.margin_lavel_0.Value : 0;
                    break;
                case 1:
                    o = cmp.margin_lavel_1.HasValue ? cmp.margin_lavel_1.Value : 0;
                    break;
                case 2:
                    o = cmp.margin_lavel_2.HasValue ? cmp.margin_lavel_2.Value : 0;
                    break;
                case 3:
                    o = cmp.margin_lavel_3.HasValue ? cmp.margin_lavel_3.Value : 0;
                    break;
                case -1:
                    o = cmp.margin_markets.HasValue ? cmp.margin_markets.Value : 0;
                    break;
            }
            return o;
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public string GetGroupsIdsByCampaignId(long id)
        {
            var campaign_groups = Le.campaign_groups.Where(w => w.campaign_id == id).OrderBy(o => o.id);
            StringBuilder sb = new StringBuilder();
            foreach (campaign_groups c in campaign_groups)
            {
                if (sb.Length > 0)
                {
                    sb.AppendFormat(",{0}", c.group_id);
                }
                else
                {
                    sb.AppendFormat("{0}", c.group_id);
                }
            }
            return sb.ToString();
        }
        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public IEnumerable<campaign_types> GetCampaignTypes()
        {
            return Le.campaign_types.ToList();
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="cmp"></param>
        /// <returns></returns>
        public LoyaltyDB.Models.Lcampaign SetCampaign(LoyaltyDB.Models.Lcampaign cmp)
        {
            if (cmp.campaign_id > -1)
            {
                string[] f_groups = cmp.group_id_2.Split(',');
                var cmp_grp = Le.campaign_groups.Where(w => w.campaign_id == cmp.campaign_id);
                Le.campaign_groups.RemoveRange(cmp_grp);
                Le.SaveChanges();
                if (f_groups[0].Length > 0)
                {
                    foreach (string f in f_groups)
                    {
                        Le.campaign_groups.Add(
                            new LoyaltyDB.campaign_groups
                            {
                                campaign_id = cmp.campaign_id,
                                group_id = Convert.ToInt64(f)
                            });
                    }
                }

                var campaign = Le.campaigns_mk.Where(wc => wc.id == cmp.campaign_id).FirstOrDefault();

                campaign.name = cmp.name;
                if (cmp.type_id > 0)
                {
                    campaign.type_id = cmp.type_id;
                }
                //campaign.margin_markets = cmp.margin_markets;
                //campaign.margin_lavel_3 = cmp.margin_lavel_3;
                //campaign.margin_lavel_2 = cmp.margin_lavel_2;
                //campaign.margin_lavel_1 = cmp.margin_lavel_1;
                //campaign.margin_lavel_0 = cmp.margin_lavel_0;
                campaign.is_run = Convert.ToBoolean(cmp.is_run);
                campaign.date_start = cmp.date_start;
                campaign.date_end = cmp.date_end;
                campaign.group_id_0 = Convert.ToInt64(cmp.group_id_0);

                Le.SaveChanges();

            } else if (cmp.campaign_id == -1)   // --<<-- Новая кампания
            {
                campaigns_mk campaign = new campaigns_mk
                {
                    date_end = cmp.date_end,
                    date_start = cmp.date_start,
                    group_id_0 = cmp.group_id_0 == string.Empty ? 0 : Convert.ToInt64(cmp.group_id_0),
                    is_run = Convert.ToBoolean(cmp.is_run),
                    margin_markets = cmp.margin_markets,
                    margin_lavel_0 = cmp.margin_lavel_0,
                    margin_lavel_1 = cmp.margin_lavel_1,
                    margin_lavel_2 = cmp.margin_lavel_2,
                    margin_lavel_3 = cmp.margin_lavel_3,
                    name = cmp.name                    
                };
                if (cmp.type_id > 0) campaign.type_id = cmp.type_id;
                Le.campaigns_mk.Add(campaign);
                Le.SaveChanges();
                Le.Entry(campaign);
                cmp.campaign_id = campaign.id;

                string[] f_groups = cmp.group_id_2.Split(',');
                if (f_groups[0].Length > 0)
                {
                    foreach (string f in f_groups)
                    {
                        Le.campaign_groups.Add(
                            new LoyaltyDB.campaign_groups
                            {
                                campaign_id = cmp.campaign_id,
                                group_id = Convert.ToInt64(f)
                            });
                    }
                }
                Le.SaveChanges();
            }            
            return cmp;
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public IEnumerable<campaigns_terms> GetCampaignsTerms(long id)
        {
            var index = 1;
            List<campaigns_terms> t = Le.campaigns_terms.Where(w => w.campaign_id == id).ToList();
            var lt = t.Select(x => new campaigns_terms
            {
                Rn = index++,                            
                campaigns_terms_id = Convert.ToInt64(x.campaigns_terms_id),
                campaign_id = Convert.ToInt64(x.campaign_id),
                created = x.created,
                description = x.description,
                short_comment = x.short_comment

            }).ToList();
            return lt;
        }

        public void CreateTerm(Models.Lterminate t)
        {
            campaigns_terms term = new campaigns_terms {
                campaign_id = t.campaign_id,
                short_comment = t.campaign_terms_short,
                description = t.campaign_terms_details,
                created = DateTime.Now
            };

            Le.campaigns_terms.Add(term);
            Le.SaveChanges();
        }

    }
}
