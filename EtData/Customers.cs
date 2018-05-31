using LinqToDB.Data;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
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

        public IEnumerable<TGetCampaignCustomersResult> GetCustomersCampaign(long campaign_id, int start, int limit)
        {
            using (var db = new DataModels.CrmWizardDB())
            {
                return db.TGetCampaignCustomers(campaign_id, start, limit).ToList();
            }
        }

        public int GetCustomersCountById(int campaign_id)
        {
            using (var db = new DataModels.CrmWizardDB())
            {
                return db.CampaignParticipant.Where(w => w.CampaignId == campaign_id && w.ControlGroup == false).Count();
            }
        }

        public DataTable GetCustomers(int campaignId)
        {
            using (var db = new DataModels.CrmWizardDB())
            {
                string cmdText = @"
	                SELECT
		                --crd.barcode,
		                c.mobile_phone,
		                iif(isnull(vb.is_viber, 0)=1,'VIBER', a.delivery_channel) delivery_channel,
		                dm.[market_name],
		                a.crm_customer_id
	                FROM 
		                calc.campaign_participant a with (nolock)
			                inner join 
				                dbo.crm_customers c (nolock) on a.crm_customer_id = c.crm_customer_id

			                left join calc.crm_isviber vb with (nolock) on a.crm_customer_id = vb.crm_customer_id
			                inner join dbo.cards crd (nolock) on c.crm_customer_id = crd.crm_customer_id and crd.deleted = 0
			                inner join [dbo].[dict_markets] dm with (nolock) on crd.issued_market_id = dm.id
	                WHERE
		                a.campaign_id = {0} and a.control_group = 0
                ";

                cmdText = string.Format(cmdText, campaignId.ToString());
                var cmd = db.CreateCommand();
                cmd.CommandType = System.Data.CommandType.Text;
                cmd.CommandText = cmdText;

                if (cmd.Connection.State == ConnectionState.Closed)
                    cmd.Connection.Open();

                SqlDataReader reader = (SqlDataReader)cmd.ExecuteReader();
                DataTable tb = new DataTable();
                tb.Load(reader);
                cmd.Connection.Close();
                return tb;
            }
        }

        public DataTable GetCustomersLong(int campaignId)
        {
            using (var db = new DataModels.CrmWizardDB())
            {
                string cmdText = @"
	                SELECT
		                c.name1,
		                c.name2,
		                c.name3,
		                case 
			                when c.gender = 1 then 'Ч'
			                when c.gender = 2 then 'Ж'
			                else 'н/в' end as gender,
		                c.mobile_phone,
		                iif(isnull(vb.is_viber, 0)=1,'VIBER', a.delivery_channel) delivery_channel,
		                dm.[market_name],
                        a.crm_customer_id,
		                isnull(a.free,'') free
	                FROM 
		                calc.campaign_participant a with (nolock)
			                inner join 
				                dbo.crm_customers c (nolock) on a.crm_customer_id = c.crm_customer_id

			                left join calc.crm_isviber vb with (nolock) on a.crm_customer_id = vb.crm_customer_id
			                inner join dbo.cards crd (nolock) on c.crm_customer_id = crd.crm_customer_id and crd.deleted = 0
			                inner join [dbo].[dict_markets] dm with (nolock) on crd.issued_market_id = dm.id
	                WHERE
		                a.campaign_id = {0} and a.control_group = 0
                ";

                cmdText = string.Format(cmdText, campaignId.ToString());
                var cmd = db.CreateCommand();
                cmd.CommandType = System.Data.CommandType.Text;
                cmd.CommandText = cmdText;

                if (cmd.Connection.State == ConnectionState.Closed)
                    cmd.Connection.Open();

                SqlDataReader reader = (SqlDataReader)cmd.ExecuteReader();
                DataTable tb = new DataTable();
                tb.Load(reader);
                cmd.Connection.Close();
                return tb;
            }
        }

    }
}
