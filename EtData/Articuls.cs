using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataModels;
using LinqToDB;
using static DataModels.CrmWizardDB;

namespace LoyaltyDB
{
    public class Articuls
    {
        public Articuls()
        {
        }

        public IEnumerable<TGetCampaignsArticulsResult> GetCampaignsArticuls(long campaignId, long start, long limit)
        {
            using (CrmWizardDB db = new CrmWizardDB())
            {
                return db.TGetCampaignsArticuls(campaignId, start, limit).ToList();
            }
        }

        public long GetCountByCampaignId(long campaignId)
        {
            using (CrmWizardDB db = new CrmWizardDB())
            {
                return db.CampaignArticul.Where(w => w.CampaignId == campaignId).Count();
            }
        }

        public int SetArticul(int CampaignId, string Articul)
        {
            int status = 0;
            using (CrmWizardDB db = new CrmWizardDB())
            {
                var count = db.CampaignArticul.Where(w => w.CampaignId == CampaignId && w.Articul == Articul).Count();
                if (count == 0)
                {
                    db.CampaignArticul.Insert(() => new DataModels.CampaignArticul {
                        Articul = Articul,
                        CampaignId = CampaignId
                    });                    
                } else
                {
                    status = 1;
                }                
            }
            return status;
        }
    }
}
