using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static DataModels.CrmWizardDB;

namespace LoyaltyDB
{
    public class Customers
    {
        LoyaltyDB.LoyaltyEntities Le;
        public Customers(LoyaltyDB.LoyaltyEntities le)
        {
            Le = le;
        }

        public IEnumerable<TGetCampaignCustomersResult> GetCustomersCampaign(long campaign_id)
        {
            using (var db = new DataModels.CrmWizardDB())
            {
                return db.TGetCampaignCustomers(campaign_id).ToList();
            }
        }
    }
}
