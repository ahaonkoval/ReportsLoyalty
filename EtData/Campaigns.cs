using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static DataModels.CrmWizardDB;
using DataModels;
using LinqToDB;
using System.Transactions;
using LoyaltyDB.Models.ShortObjects;
using System.Data;
using System.Data.SqlClient;
using System.Net.Http;

namespace LoyaltyDB
{
    public class Campaigns
    {
        //LoyaltyDB.LoyaltyEntities Le;

        private List<Participant> сampaignParticipantCache;

        public Campaigns(LoyaltyDB.LoyaltyEntities le)
        {
            //Le = le;
        }

        public void CreateCampaignParticipantCache(long _campaignId)
        {
            using (var db = new DataModels.CrmWizardDB())
            {
                using (var t = new TransactionScope(TransactionScopeOption.Required, new TransactionOptions
                {
                    IsolationLevel = System.Transactions.IsolationLevel.ReadUncommitted
                }))
                {
                    var сamp = db.CampaignParticipant.Where(w => w.CampaignId == _campaignId);

                    сampaignParticipantCache = db.CrmCustomers.Join(сamp,
                        a => a.CrmCustomerId,
                        b => b.CrmCustomerId,
                        (a, b) => new Participant
                        {
                            MobilePhone = a.MobilePhone,
                            CrmCustomerId = b.CrmCustomerId,
                            PartId = b.Id,
                            CampaignId = b.CampaignId
                        }).ToList();
                }
            }
        }

        #region Управління перерахунком кампаній
        /* GET  -------------------------------------------------------------------------------------- */
        /// <summary>
        /// Повертає останній статус
        /// </summary>
        /// <returns></returns>
        public CalculationLog GetCalculationLogLast()
        {
            using (var db = new DataModels.CrmWizardDB())
            {
                return db.CalculationLog.Where(w => w.TypeOp == 20).OrderByDescending(o => o.Id).FirstOrDefault();
            }
        }

        public string GetCalculationCampaignName()
        {
            using (var db = new DataModels.CrmWizardDB())
            {
                var lg = db.CalculationLog.Where(w => w.TypeOp == 20).OrderByDescending(o => o.Id).First();
                var cp = db.CampaignsMk.Where(w => w.Id == lg.CampaignId);
                if (cp.Count() > 0)
                {
                    return db.CampaignsMk.Where(w => w.Id == lg.CampaignId).First().Name;
                } else
                {
                    return string.Empty;
                }
            }
        }

        
        /* SET  -------------------------------------------------------------------------------------- */
        public void SetStartCalculation(int campaignId, DateTime currentDate)
        {
            using (var db = new DataModels.CrmWizardDB())
            {
                var ml = db.CalculationLog.Where(w => w.TypeOp == 30);

                CalculationLog l = null;
                if (ml.Count() > 0)
                    { l = ml.OrderByDescending(o => o.Id).First(); }

                var campaign = db.CampaignsMk.Where(w => w.Id == campaignId).First();

                if (l != null)
                {
                    if (l.Status != 1)
                    {
                        StartCalculation(campaignId, currentDate, db.ConnectionString, campaign.TypeId);
                    }
                } else
                {
                    StartCalculation(campaignId, currentDate, db.ConnectionString, campaign.TypeId);
                }
            }
        }

        void StartCalculation(int campaignId, DateTime currentDate, string ConnectionString, long TypeId)
        {
            switch (TypeId)
            {
                case 1:
                    {
                        StartCalculationExtraPoints(campaignId, currentDate, ConnectionString);
                    }
                    break;
                case 2:
                    {
                        StartCalculationPersonalOffer(campaignId, currentDate, ConnectionString);
                    }
                    break;
            }
        }

        public void StartFillCustomers(int campaignId, string table, bool toDelete)
        {
            using (var db = new DataModels.CrmWizardDB())
            {
                //    db.P PFillCustomersToCampaign(campaignId, table);

                //    //db.PGetFillingCustomersCount

                using (SqlConnection c = new SqlConnection(db.ConnectionString))
                {
                    try
                    {
                        SqlCommand cmd = c.CreateCommand();
                        cmd.CommandTimeout = 100000000;
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Connection = c;
                        cmd.CommandText = "calc.p_start_fill_customers_to_campaign";
                        cmd.Parameters.AddWithValue("@campaign_id", campaignId);
                        cmd.Parameters.AddWithValue("@table_name", table);
                        cmd.Parameters.AddWithValue("@to_delete", toDelete);

                        if (c.State != ConnectionState.Open)
                            c.Open();
                        cmd.ExecuteNonQuery();

                    }
                    catch (Exception ex)
                    {
                        int i = 0;
                        // TODO Логировать ошибку
                    }
                }
            }
        }

        void StartCalculationExtraPoints(int campaignId, DateTime currentDate, string connectString) {
            using (SqlConnection c = new SqlConnection(connectString))
            {
                try
                {
                    SqlCommand cmd = c.CreateCommand();
                    cmd.CommandTimeout = 100000000;
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Connection = c;
                    cmd.CommandText = "calc.p_daily_extra_points_fill";
                    cmd.Parameters.AddWithValue("@campaign_id", campaignId);
                    cmd.Parameters.AddWithValue("@calculated_date", currentDate);

                    if (c.State != ConnectionState.Open)
                        c.Open();
                    cmd.ExecuteNonQuery();

                }
                catch (Exception ex)
                {
                    int i = 0;
                    // TODO Логировать ошибку
                }
            }
        }

        void StartCalculationPersonalOffer(int campaignId, DateTime currentDate, string connectString)
        {
            using (SqlConnection c = new SqlConnection(connectString))
            {
                try
                {
                    SqlCommand cmd = c.CreateCommand();
                    cmd.CommandTimeout = 100000000;
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Connection = c;
                    cmd.CommandText = "calc.p_daily_pers_expected_effect_fill";
                    cmd.Parameters.AddWithValue("@campaign_id", campaignId);
                    cmd.Parameters.AddWithValue("@date_fill", currentDate);

                    if (c.State != ConnectionState.Open)
                        c.Open();
                    cmd.ExecuteNonQuery();

                } catch (Exception ex)
                {
                    int i = 0;
                    // TODO Логировать ошибку
                }
            }
        }

        #endregion

        #region GET
        public CampaignsMk GetCampaignById(int campaignId)
        {
            using (var db = new DataModels.CrmWizardDB())
            {
                return db.CampaignsMk.Where(w => w.Id == campaignId).FirstOrDefault();
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
            }
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

        public bool GetIsCalculated(int campaignId, DateTime dt)
        {
            using (var db = new DataModels.CrmWizardDB())
            {
                var dm = db.DailyMap.Where(w => w.CampaignId == campaignId && w.CalculationDate == dt);
                if (dm.Count() == 0)
                {
                    return false;
                }
                else { return true; }
            }
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
                return db.CampaignsMk.Where(
                    w => 
                    w.IsRun == (isRun == true ? isRun : w.IsRun) 
                    && w.TypeId == (type_id == 0 ? w.TypeId : type_id)
                    && w.Hide == false
                    ).Count();
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
        /// <summary>
        /// 
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public string GetOtdNameByCampaignId(int id)
        {
            using (CrmWizardDB db = new DataModels.CrmWizardDB())
            {
                var campaign = db.CampaignsMk.Where(w => w.Id == id).FirstOrDefault();

                var GrpName1 = db.Fgroups.Where(wf => wf.FgroupId == campaign.GroupId0).FirstOrDefault();

                return GrpName1 == null ? string.Empty : GrpName1.Name;
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
                var lt = list.Select(x => new CampaignsTerms
                {
                    Rn = index++,
                    CampaignsTermsId = Convert.ToInt64(x.CampaignsTermsId),
                    CampaignId = Convert.ToInt64(x.CampaignId),
                    Created = x.Created,
                    Description = x.Description,
                    ShortComment = x.ShortComment,
                    Link = (x.Link == null ? "" : x.Link)
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
        public void SetHideCampaign(long CampaignId)
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
                }
                else
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
        public LoyaltyDB.Models.CampaignConvert SetCampaign(LoyaltyDB.Models.CampaignConvert cmp)
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
                        new CampaignsMk
                        {
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
                        }
                    }
                }
                return cmp;
            }
        }

        #endregion
        /// <summary>
        /// умови кампаніїї, *** опис
        /// </summary>
        /// <param name="t"></param>
        public void CreateTerm(Models.Lterminate t)
        {
            using (CrmWizardDB db = new DataModels.CrmWizardDB())
            {
                db.CampaignsTerms.Insert(() => new CampaignsTerms
                {
                    CampaignId = t.campaign_id,
                    Created = DateTime.Now,
                    Description = t.campaign_terms_details,
                    ShortComment = t.campaign_terms_short,
                    Link = t.campaign_link
                });
            }
        }

        #region MAILING
        /// <summary>
        /// Встановлення статусу кампанії на обробку
        /// </summary>
        /// <param name="CampaignId"></param>
        /// <returns></returns>
        public bool SetStartGettingSoftlineStatus(long CampaignId)
        {
            bool returned = true;

            using (var db = new DataModels.CrmWizardDB())
            {
                using (var t = new TransactionScope(TransactionScopeOption.Required, new TransactionOptions { IsolationLevel = System.Transactions.IsolationLevel.Serializable }))
                {
                    var campaigns_start = db.CampaignsMk.Where(w => w.IsStartGetStatus == 1).ToList();
                    if (campaigns_start.Count() == 0)
                    {
                        db.CampaignsMk.Where(w => w.Id == CampaignId)
                            .Set(p => p.IsStartGetStatus, 1)
                            .Update();
                        returned = true;
                    } else
                    {
                        returned = false;
                    }
                }
            }
            return returned;
        }
        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public long GetCampaignsGettingStatusMailing()
        {
            using (var db = new DataModels.CrmWizardDB())
            {
                using (var t = new TransactionScope(TransactionScopeOption.Required, new TransactionOptions
                {
                    IsolationLevel = System.Transactions.IsolationLevel.ReadCommitted
                }))
                {
                    var cmp = db.CampaignsMk.Where(w => w.IsStartGetStatus < 2).ToList();
                    if (cmp.Where(w => w.IsStartGetStatus == 1).Count() == 0)
                    {
                        return cmp.Where(w => w.IsStartGetStatus == 1).FirstOrDefault().Id;
                    }
                    else
                    {
                        return 0;
                    }
                }
            }
        }

        /// <summary>
        /// ИД розсилки для кампанії
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
        /// Заповнення статусами 
        /// </summary>
        /// <param name="campaignId"></param>
        /// <param name="rp"></param>
        /// <param name="status"></param>
        /// <param name="chanel"></param>
        public void SetStatusCampaignMailing(long campaignId, RecipientPhone rp, int status, string chanel)
        {
            using (CrmWizardDB db = new DataModels.CrmWizardDB())
            {
                var participant = сampaignParticipantCache.Where(w => w.MobilePhone == rp.MobilePhone).FirstOrDefault();

                if (participant != null)
                {
                    db.CampaignPhoneStatus.Insert(() => new DataModels.CampaignPhoneStatus
                    {
                        CampaignId = campaignId,
                        CrmCustomerId = participant.CrmCustomerId,
                        MobilePhone = participant.MobilePhone,
                        PartId = participant.PartId,
                        Status = status,
                        Channel = chanel
                    });
                }
            }
        }
        /// <summary>
        /// Заповнення статусами таблицю статусів софтлана
        /// </summary>
        /// <param name="campaignId"></param>
        /// <param name="messageId"></param>
        /// <param name="mobilePhone"></param>
        /// <param name="status"></param>
        public void SetCampaignSoftlineStatus(long campaignId, int messageId, string mobilePhone, int status)
        {
            using (CrmWizardDB db = new DataModels.CrmWizardDB())
            {
                db.CampaignSoftlineStatus.Insert(() => new CampaignSoftlineStatus
                {
                    CampaignId = campaignId,
                    MessageId = messageId,
                    MobilePhone = mobilePhone,
                    Status = status
                });
            }
        }

        public void SetSoftLineStatusEnd(int campaignId)
        {
            using (CrmWizardDB db = new DataModels.CrmWizardDB())
            {
                using (SqlConnection c = new SqlConnection(db.ConnectionString))
                {
                    try
                    {
                        SqlCommand cmd = c.CreateCommand();
                        cmd.CommandTimeout = 100000000;
                        cmd.CommandType = CommandType.Text;
                        cmd.Connection = c;
                        cmd.CommandText = @"
                            UPDATE a 
	                            SET a.delivery_status = iif(m.crm_customer_id is null, 0, 1)
                            FROM [calc].[campaign_participant] a (nolock) 
                            LEFT JOIN 
	                            (
		                            select 
                                        distinct c.crm_customer_id 
                                    from dbo.crm_customers c (nolock) inner join (
			                            select * from [calc].[campaign_softline_status] a (nolock) 
                                            where a.campaign_id = @campaign_id and a.[status] in (1, 3)) m
			                                    on c.mobile_phone = '+'+m.mobile_phone
	                            ) m 
                            on a.crm_customer_id = m.crm_customer_id
                            where
	                            a.campaign_id = @campaign_id
                        ";

                        cmd.Parameters.AddWithValue("@campaign_id", campaignId);

                        if (c.State != ConnectionState.Open)
                            c.Open();
                        cmd.ExecuteNonQuery();

                    }
                    catch (Exception ex)
                    {
                        //int i = 0;
                        // TODO Логировать ошибку
                    }
                }
            }
        }

        public void SetCampaignSoftlineStatus(long campaignId, int messageId, string mobilePhone, int status, string chanel)
        {
            using (CrmWizardDB db = new DataModels.CrmWizardDB())
            {
                db.CampaignSoftlineStatus.Insert(() => new CampaignSoftlineStatus
                {
                    CampaignId = campaignId,
                    MessageId = messageId,
                    MobilePhone = mobilePhone,
                    Status = status,
                    Chanel = chanel
                });
            }
        }

        public void FixCampaignStatus(long campaignId)
        {
            using (CrmWizardDB db = new DataModels.CrmWizardDB())
            {
                string cmdText = @"
                    update cp set cp.delivery_status = ps.[status] 
                    from calc.campaign_participant cp (nolock)
	                    inner join [calc].[campaign_phone_status] ps (nolock) 
		                    on cp.crm_customer_id = ps.crm_customer_id and ps.campaign_id = cp.campaign_id
                    where
	                    cp.campaign_id = {0}
                ";

                cmdText = string.Format(cmdText, campaignId.ToString());
                var cmd = db.CreateCommand();
                cmd.CommandType = System.Data.CommandType.Text;
                cmd.CommandText = cmdText;

                if (cmd.Connection.State == ConnectionState.Closed)
                    cmd.Connection.Open();
            }
           
        }

        public void CampaignDeleteStatuses(int campaignId)
        {
            using (var db = new DataModels.CrmWizardDB())
            {
                db.CampaignPhoneStatus.Delete(o => o.CampaignId == campaignId);

                db.CampaignSoftlineStatus.Delete(o => o.CampaignId == campaignId);
            }
        }
        #endregion
    }
}