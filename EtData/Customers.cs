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
        //LoyaltyDB.LoyaltyEntities Le;
        public Customers() //LoyaltyDB.LoyaltyEntities le
        {
            //Le = le;
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
                        distinct
		                --crd.barcode,
		                c.mobile_phone,
		                iif(isnull(vb.is_viber, 0)=1,'VIBER', a.delivery_channel) delivery_channel,
		                dm.[market_name],
		                a.crm_customer_id
	                FROM 
		                calc.campaign_participant a with (nolock)
			                inner join dbo.crm_customers c (nolock) on a.crm_customer_id = c.crm_customer_id

			                left join calc.crm_isviber vb with (nolock) on a.crm_customer_id = vb.crm_customer_id
			                inner join dbo.cards crd (nolock) on c.crm_customer_id = crd.crm_customer_id and crd.deleted = 0
			                inner join [dbo].[dict_markets] dm with (nolock) on crd.issued_market_id = dm.id
	                WHERE
		                a.campaign_id = {0} and a.control_group = 0
                        and c.is_sms_sent = 1
                        
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
                        distinct
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
                        and c.is_sms_sent = 1
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
        /// <summary>
        /// 
        /// </summary>
        /// <param name="ocs"></param>
        /// <returns></returns>
        public string GetSelectedCustomersCount(CustomerSelect ocs)
        {
            using (var db = new DataModels.CrmWizardDB())
            {
                DataConnection connect = new DataConnection(db.ConfigurationString);

                var CustomersCount = DataModels.CrmWizardDBStoredProcedures.PGetCountCustomers4campaign(
                    connect,
                    ocs.campaignId,
                    ocs.marketLst,
                    ocs.startDate,
                    ocs.lastDate,
                    ocs.qtyAtd,
                    ocs.qtyDocs,
                    ocs.obert,
                    ocs.avgDoc,
                    ocs.maxDoc,
                    ocs.avgBetweenAtd,
                    ocs.qtyPoints
                    );
                return CustomersCount.ToList().FirstOrDefault().CustomersCount.ToString();
            }
        }

        public string StartFillFromSelect(CustomerSelect om)
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
                        cmd.CommandText = "calc.p_start_fill_customers4campaign_from_select";
                        cmd.Parameters.AddWithValue("@campaign_id", om.campaignId);
                        cmd.Parameters.AddWithValue("@market_lst", om.marketLst);

                        cmd.Parameters.AddWithValue("@start_part", om.startDate);
                        cmd.Parameters.AddWithValue("@last_part", om.lastDate);
                        cmd.Parameters.AddWithValue("@qty_visits", om.qtyAtd);
                        cmd.Parameters.AddWithValue("@qty_docs", om.qtyDocs);
                        cmd.Parameters.AddWithValue("@obert", om.obert);
                        cmd.Parameters.AddWithValue("@doc_avg", om.avgDoc);
                        cmd.Parameters.AddWithValue("@doc_max", om.maxDoc);
                        cmd.Parameters.AddWithValue("@len_between_visits", om.avgBetweenAtd);
                        cmd.Parameters.AddWithValue("@sum_points", om.qtyPoints);

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

            return string.Empty;
        }

        public void StartFillCampaignFromSelectedCustomes(CustomerSelect oc)
        {

        }
    }

    public class CustomerSelect
    {
        public long campaignId { get; set; }
        public string marketLst { get; set; }
        public string startDate { get; set; }
        public string lastDate { get; set; }
        public string qtyAtd { get; set; }
        public string qtyDocs { get; set; }
        public string obert { get; set; }
        public string avgDoc { get; set; }
        public string maxDoc { get; set; }
        public string avgBetweenAtd { get; set; }
        public string qtyPoints { get; set; }
    }
}
