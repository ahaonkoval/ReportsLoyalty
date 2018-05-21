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

namespace LoyaltyDB
{
    public class PersonalCampaign
    {
        public IEnumerable<TGetPersonalMarkmoReportResult> GetCampaignResultByMarkets(int campaignId, bool controlGroup, DateTime currentDate, string marketLst)
        {
            using (var db = new DataModels.CrmWizardDB())
            {
                return db.TGetPersonalMarkmoReport(campaignId, controlGroup, currentDate, null, marketLst).ToList();
            }
        }
    }
}
