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
        /// <summary>
        /// 
        /// </summary>
        /// <param name="campaignId"></param>
        /// <param name="controlGroup"></param>
        /// <param name="currentDate"></param>
        /// <param name="marketLst"></param>
        /// <returns></returns>
        public IEnumerable<TGetPersonalMarkmoReportResult> GetCampaignResultByMarkets(int campaignId, bool controlGroup, DateTime currentDate, string marketLst)
        {
            using (var db = new DataModels.CrmWizardDB())
            {
                return db.TGetPersonalMarkmoReport(campaignId, controlGroup, currentDate, null, marketLst).ToList();
            }
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="campaignId"></param>
        /// <param name="controlGroup"></param>
        /// <param name="currentDate"></param>
        /// <param name="marketId"></param>
        /// <returns></returns>
        public IEnumerable<TGetPersonalMarkmoMarketDetailsResult> GetPersonalMarkmoMarketDetails(
                int campaignId, bool controlGroup, DateTime currentDate, int marketId)
        {
            using (var db = new DataModels.CrmWizardDB())
            {
                try
                {
                    return db.TGetPersonalMarkmoMarketDetails(campaignId, controlGroup, currentDate, marketId).ToList().OrderBy(o => o.lf0_id);
                }
                catch (Exception ex)
                {
                    return null;
                }
            }
        }

        public IEnumerable<TGetPersonalMarkmoMarketDetailsPivotResult> GetPersonalMarkmoMarketDetailsPivot(
            int campaignId, bool controlGroup, DateTime currentDate, int marketId)
        {
            using (var db = new DataModels.CrmWizardDB())
            {
                return db.TGetPersonalMarkmoMarketDetailsPivot(campaignId, controlGroup, currentDate).Where(w => w.market_id == (marketId == 0 ? w.market_id : marketId)).ToList();
            }
        }
    }
}
