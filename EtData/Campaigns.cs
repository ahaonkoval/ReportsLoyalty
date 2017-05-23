using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EtData
{
    public class Campaigns
    {
        EtData.LoyaltyEntities Le;

        public Campaigns(EtData.LoyaltyEntities le) {
            Le = le;
        }

        public IEnumerable<v_campaigns_mk_run> GetCampaignsRuns()
        {
            return Le.v_campaigns_mk_run.ToList();
        }

        public string GetCampaignNameById(int id)
        {
            return Le.v_campaigns_mk_run.Where(m => m.id == id).First().name;
        }

        public DateTime? GetStartDateById(int id)
        {
            return Le.v_campaigns_mk_run.Where(m => m.id == id).First().date_start;
        }

        public DateTime? GetEndDateById(int id)
        {
            return Le.v_campaigns_mk_run.Where(m => m.id == id).First().date_end;
        }

        public IEnumerable<tf_campaigns> GetCampaigns(bool isRun)
        {
            return Le.t_get_campaigns(isRun);
            //if (isRun)
            //{
            //    return Le.t_get_campaigns(isRun);
                
            //} else
            //{
            //    return Le.v_campaigns_mk;
            //}
        }

        public int GetCampaignsCount(bool isRun)
        {
            return Le.t_get_campaigns(isRun).Count();
            //if (isRun)
            //{
            //    return Le.v_campaigns_mk.Where(w => w.is_run == isRun).Count();
            //} else
            //{
            //    return Le.v_campaigns_mk.Count();
            //}

        }

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
                    current = Le.v_fgroups.Where(w => w.fgroup_id == c.group_id).FirstOrDefault().name;
                    sb.AppendFormat("Групи:{0}", current);
                }
                
            }
            return sb.ToString(); 
        }

        public string GetCurrentDepartamentNameById(int id)
        {
            var cmp = Le.campaigns_mk.Where(w => w.id == id).FirstOrDefault();
            return Le.v_fgroups.Where(o => o.fgroup_id == cmp.group_id_0).FirstOrDefault().name;            
        }

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

        public IEnumerable<campaign_types> GetCampaignTypes()
        {
            return Le.campaign_types.ToList();
        }

        public EtData.Models.Cmp SetCampaign(EtData.Models.Cmp cmp)
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
                            new EtData.campaign_groups
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
                campaign.margin_markets = cmp.margin_markets;
                campaign.margin_lavel_3 = cmp.margin_lavel_3;
                campaign.margin_lavel_2 = cmp.margin_lavel_2;
                campaign.margin_lavel_1 = cmp.margin_lavel_1;
                campaign.margin_lavel_0 = cmp.margin_lavel_0;
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
                            new EtData.campaign_groups
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

    }
}
