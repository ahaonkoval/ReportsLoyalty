using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static DataModels.CrmWizardDB;
using DataModels;
using LinqToDB;

namespace LoyaltyDB
{
    public class Campaigns
    {
        LoyaltyDB.LoyaltyEntities Le;

        public Campaigns(LoyaltyDB.LoyaltyEntities le) {
            Le = le;
        }

        #region GET

        public IEnumerable<CampaignsMk> GetCampaignsGetStatusMailing()
        {
            using (var db = new DataModels.CrmWizardDB())
            {
                return db.CampaignsMk.Where(w => w.IsStartGetStatus < 2).ToList();
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="CampaignId"></param>
        /// <returns></returns>
        public string GetMailingIdByCampaignId(int CampaignId)
        {
            using (var db = new DataModels.CrmWizardDB())
            {
                return db.CampaignsMk.Where(w => w.Id == CampaignId).FirstOrDefault().MailingId;
            }
        }
        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public IEnumerable<CampaignsMk> GetCampaignsRuns()
        {
            using (var db = new DataModels.CrmWizardDB())
            {
                //return db.VCampaignsMkRun.ToList();

                return db.CampaignsMk.Where(w => w.IsRun == true).Select(m => new CampaignsMk
                {
                        Created = m.Created,
                        DateEnd = m.DateEnd,
                        DateStart = m.DateStart,
                        GroupId0 = m.GroupId0,
                        GroupId1 = m.GroupId1,
                        Id = m.Id,
                        IsRun = m.IsRun,
                        MarkmoId = m.MarkmoId,
                        TypeId = m.TypeId,
                        Name = string.Format("({0}), {1}", m.Id.ToString(), m.Name)
                }).ToList();

                //return db.VCampaignsMkRun.ToList().Select(a => new VCampaignsMkRun
                //{
                //    Created = a.Created,
                //    DateEnd = a.DateEnd,
                //    DateStart = a.DateStart,
                //    GroupId0 = a.GroupId0,
                //    GroupId1 = a.GroupId1,
                //    Id = a.Id,
                //    IsRun = a.IsRun,
                //    MarkmoId = a.MarkmoId,
                //    TypeId = a.TypeId,
                //    Name = string.Format("({0}), {1}", a.Id.ToString(), a.Name)
                //});
            }        
            //return Le.v_campaigns_mk_run.ToList();
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public string GetCampaignNameById(int id)
        {
            using (var db = new DataModels.CrmWizardDB())
            {
                return db.CampaignsMk.Where(w => w.Id == id).FirstOrDefault().Name;
            }
            //return Le.v_campaigns_mk.Where(m => m.id == id).First().name;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public DateTime? GetStartDateById(int id)
        {
            using (var db = new DataModels.CrmWizardDB())
            {
                return db.CampaignsMk.Where(w => w.Id == id).FirstOrDefault().DateStart;
            }
            //return Le.v_campaigns_mk.Where(m => m.id == id).First().date_start;
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public DateTime? GetEndDateById(int id)
        {
            using (var db = new DataModels.CrmWizardDB())
            {
                return db.CampaignsMk.Where(w => w.Id == id).FirstOrDefault().DateEnd;
            }
            //return Le.v_campaigns_mk.Where(m => m.id == id).First().date_end;
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
        /// <summary>
        /// 
        /// </summary>
        /// <param name="type"></param>
        /// <returns></returns>
        public IEnumerable<CampaignsMk> GetCampaignsByType(CampaignTypes type)
        {
            using (var db = new DataModels.CrmWizardDB())
            {
                return db.CampaignsMk.Where(w => w.TypeId == type.Id).ToList();
                //return db.TGetCampaigns(isRun, start, limit, type_id).ToList();
            }
            //return Le.v_campaigns_mk.Where(w => w.type_id == type.id);
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="isRun"></param>
        /// <returns></returns>
        public int GetCampaignsCount(bool isRun, long type_id)
        {
            //return Le.campaigns_mk.Where(w => w.is_run == isRun && w.type_id == (type_id == 0 ? w.type_id : type_id)).Count();
            using (var db = new DataModels.CrmWizardDB())
            {
                return db.CampaignsMk.Where(w => w.IsRun == (isRun == true ? isRun : w.IsRun) && w.TypeId == (type_id == 0 ? w.TypeId : type_id)).Count();
            }
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

            using (var db = new DataModels.CrmWizardDB())
            {
                var cmpGroups = db.CampaignGroups.Where(w => w.CampaignId == id).OrderBy(o => o.Id);
                foreach (CampaignGroups c in cmpGroups)
                {
                    if (sb.Length > 0)
                    {
                        current = db.Fgroups.Where(w => w.FgroupId == id).FirstOrDefault().Name;
                        sb.AppendFormat(", {0}", current);
                    }
                    else
                    {
                        sb.AppendFormat("Департамент:{0}", current);
                    }
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

        public string GetOtdNameByCampaignId(int id)
        {
            using (CrmWizardDB db = new DataModels.CrmWizardDB())
            {
                var campaign = db.CampaignsMk.Where(w => w.Id == id).FirstOrDefault();

                var GrpName1 = db.Fgroups.Where(wf => wf.FgroupId == campaign.GroupId0).FirstOrDefault();

                return GrpName1.Name;
            }                
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public string GetGroupsIdsByCampaignId(long id)
        {
            using (CrmWizardDB db = new DataModels.CrmWizardDB())
            {
                var cg = db.CampaignGroups.Where(w => w.CampaignId == id).OrderBy(o => o.Id);
                StringBuilder sb = new StringBuilder();
                foreach (CampaignGroups c in cg)
                {
                    if (sb.Length > 0)
                    {
                        sb.AppendFormat(",{0}", c.GroupId);
                    }
                    else
                    {
                        sb.AppendFormat("{0}", c.GroupId);
                    }
                }
                return sb.ToString();
            }
        }
        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public IEnumerable<CampaignTypes> GetCampaignTypes()
        {
            using (CrmWizardDB db = new CrmWizardDB())
            {
                return db.CampaignTypes.ToList();
            }                
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public IEnumerable<CampaignsTerms> GetCampaignsTerms(long id)
        {
            var index = 1;
            using (CrmWizardDB db = new CrmWizardDB())
            {
                var list = db.CampaignsTerms.Where(w => w.CampaignId == id).ToList();
                var lt = list.Select(x => new CampaignsTerms {
                    Rn = index++,
                    CampaignsTermsId = Convert.ToInt64(x.CampaignsTermsId),
                    CampaignId = Convert.ToInt64(x.CampaignId),
                    Created = x.Created,
                    Description = x.Description,
                    ShortComment = x.ShortComment
                }).ToList();
                return lt;
            }

            //List<campaigns_terms> t = Le.campaigns_terms.Where(w => w.campaign_id == id).ToList();
            //var lt = t.Select(x => new campaigns_terms
            //{
            //    Rn = index++,                            
            //    campaigns_terms_id = Convert.ToInt64(x.campaigns_terms_id),
            //    campaign_id = Convert.ToInt64(x.campaign_id),
            //    created = x.created,
            //    description = x.description,
            //    short_comment = x.short_comment

            //}).ToList();
            //return lt;
        }

        #endregion

        #region SET
        /// <summary>
        /// Ховає кампанію зі списку
        /// </summary>
        /// <param name="CampaignId"></param>
        public void SetHideCampaign(int CampaignId)
        {
            using (CrmWizardDB db = new DataModels.CrmWizardDB())
            {
                db.CampaignsMk.Where(w => w.Id == CampaignId)
                    .Set(p => p.Hide, true)
                    .Update();
            }
        }

        public int SetStartGetStatusMailing(int CampaignId)
        {
            int returned = 0;

            using (CrmWizardDB db = new DataModels.CrmWizardDB())
            {
                db.BeginTransaction(System.Data.IsolationLevel.RepeatableRead);

                if (db.CampaignsMk.Where(w => w.IsStartGetStatus == 1).Count() > 0)
                {
                    returned = 0;
                } else
                {
                    db.CampaignsMk.Where(w => w.Id == CampaignId)
                        .Set(p => p.IsStartGetStatus, 1)
                        .Update();

                    returned = 1;
                }

                db.CommitTransaction();
            }

            return returned;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="cmp"></param>
        /// <returns></returns>
        public LoyaltyDB.Models.Lcampaign SetCampaign(LoyaltyDB.Models.Lcampaign cmp)
        {
            using (CrmWizardDB db = new DataModels.CrmWizardDB())
            {
                if (cmp.campaign_id > -1)
                {
                    string[] f_groups = cmp.group_id_2.Split(',');
                    var cmp_grp = db.CampaignGroups.Where(w => w.CampaignId == cmp.campaign_id);

                    db.CampaignGroups.Delete(wd => wd.CampaignId == cmp.campaign_id);

                    if (f_groups[0].Length > 0)
                    {
                        foreach (string f in f_groups)
                        {
                            db.CampaignGroups.Insert(() => new DataModels.CampaignGroups
                            {
                                CampaignId = cmp.campaign_id,
                                GroupId = Convert.ToInt64(f)
                            });
                        }
                    }

                    db.CampaignsMk.Where(wc => wc.Id == cmp.campaign_id)
                        .Set(p => p.Name, cmp.name)
                        .Set(p => p.TypeId, cmp.type_id > 0 ? cmp.type_id : 6)
                        .Set(p => p.IsRun, Convert.ToBoolean(cmp.is_run))
                        .Set(p => p.DateStart, cmp.date_start)
                        .Set(p => p.DateEnd, cmp.date_end)
                        .Set(p => p.GroupId0, Convert.ToInt64(cmp.group_id_0))
                        .Set(p => p.MailingId, cmp.mailing_id)
                        .Set(p => p.DateSend, cmp.date_send)
                        .Update();

                }
                else if (cmp.campaign_id == -1)   // --<<-- Новая кампания
                {
                    var id = db.CampaignsMk.InsertWithIdentity(() =>
                        new CampaignsMk {
                            DateEnd = cmp.date_end,
                            DateSend = cmp.date_send,
                            DateStart = cmp.date_start,
                            GroupId0 = cmp.group_id_0 == string.Empty ? 0 : Convert.ToInt64(cmp.group_id_0),
                            IsRun = Convert.ToBoolean(cmp.is_run),
                            TypeId = cmp.type_id > 0 ? cmp.type_id : 6,
                            Name = cmp.name
                        });

                    cmp.campaign_id = Convert.ToInt32(id);
                    string[] f_groups = cmp.group_id_2.Split(',');
                    if (f_groups[0].Length > 0)
                    {
                        foreach (string f in f_groups)
                        {
                            db.CampaignGroups.Insert(() => new DataModels.CampaignGroups
                            {
                                CampaignId = cmp.campaign_id,
                                GroupId = Convert.ToInt64(f)
                            });

                            //Le.campaign_groups.Add(
                            //    new LoyaltyDB.campaign_groups
                            //    {
                            //        campaign_id = cmp.campaign_id,
                            //        group_id = Convert.ToInt64(f)
                            //    });
                        }
                    }

                    //campaigns_mk campaign = new campaigns_mk
                    //{
                    //    date_end = cmp.date_end,
                    //    date_start = cmp.date_start,
                    //    group_id_0 = cmp.group_id_0 == string.Empty ? 0 : Convert.ToInt64(cmp.group_id_0),
                    //    is_run = Convert.ToBoolean(cmp.is_run),
                    //    type_id = 6,
                    //    name = cmp.name                        
                    //};

                    //if (cmp.type_id > 0) campaign.type_id = cmp.type_id;

                    //Le.campaigns_mk.Add(campaign);
                    //Le.SaveChanges();
                    //Le.Entry(campaign);

                    //cmp.campaign_id = campaign.id;

                    //string[] f_groups = cmp.group_id_2.Split(',');
                    //if (f_groups[0].Length > 0)
                    //{
                    //    foreach (string f in f_groups)
                    //    {
                    //        Le.campaign_groups.Add(
                    //            new LoyaltyDB.campaign_groups
                    //            {
                    //                campaign_id = cmp.campaign_id,
                    //                group_id = Convert.ToInt64(f)
                    //            });
                    //    }
                    //}
                    //Le.SaveChanges();
                }
                return cmp;
            }
        }

        #endregion
        public void CreateTerm(Models.Lterminate t)
        {
            using (CrmWizardDB db = new DataModels.CrmWizardDB())
            {
                db.CampaignsTerms.Insert(() => new CampaignsTerms {
                    CampaignId = t.campaign_id,
                    Created = DateTime.Now,
                    Description = t.campaign_terms_details,
                    ShortComment = t.campaign_terms_short
                });

                //CampaignsTerms tm = new DataModels.CampaignsTerms
                //{
                //    CampaignId = t.campaign_id,
                //    Created = DateTime.Now,
                //    Description = t.campaign_terms_details,
                //    ShortComment = t.campaign_terms_short
                //};
            }

            //campaigns_terms term = new campaigns_terms {
            //    campaign_id = t.campaign_id,
            //    short_comment = t.campaign_terms_short,
            //    description = t.campaign_terms_details,
            //    created = DateTime.Now
            //};

            //Le.campaigns_terms.Add(term);
            //Le.SaveChanges();
        }

        #region MAILING
        public void SetStatusCampaignMailing(long campaignId, string phone, int status, string chanel)
        {
            using (CrmWizardDB db = new DataModels.CrmWizardDB())
            {
                db.BeginTransaction(System.Data.IsolationLevel.ReadUncommitted);

                if (phone.IndexOf("+") < 0)
                    phone = string.Format("+{0}", phone);

                var customers = db.CrmCustomers.Where(w => w.MobilePhone == phone);

                var customersParticipant = db.CampaignParticipant.Join(customers,
                    c => c.CrmCustomerId,
                    p => p.CrmCustomerId,
                    (c, p) => new { c.CrmCustomerId, p.MobilePhone, c.CampaignId, c.Id }
                ).Where(w=> w.CampaignId == campaignId).ToList();

                foreach (var cp in customersParticipant)
                {
                    db.CampaignParticipant.Where(w => w.Id == cp.Id)
                        .Set(p => p.DeliveryStatus, status)
                        .Set(p => p.DeliveryChannel, chanel)
                        .Update();
                }

                db.CommitTransaction();
            }
        }

        //public string GetMailingIdByCampaignId(int campaignId)
        //{
        //    using (CrmWizardDB db = new DataModels.CrmWizardDB())
        //    {
        //        return db.CampaignsMk.Where(w => w.Id == campaignId).FirstOrDefault().MailingId;
        //    }
        //}

        public void SetPhonesFindMarkets(string phone, string status, string channel)
        {
            using (CrmWizardDB db = new DataModels.CrmWizardDB())
            {

                db.PhonesFindMarkets.Insert(() => new PhonesFindMarkets {
                    Chanell = channel,
                    Status = status,
                    Phone = phone
                });
            }
        }
        #endregion
    }
}
