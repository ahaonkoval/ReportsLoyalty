using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LoyaltyDB
{
    public class Customers
    {
        LoyaltyDB.LoyaltyEntities Le;
        public Customers(LoyaltyDB.LoyaltyEntities le)
        {
            Le = le;
        }

        public IEnumerable<tf_campaign_customers> GetCustomersCampaign(long campaign_id)
        {
            return Le.t_get_campaign_customers(campaign_id);
        }
    }
}
