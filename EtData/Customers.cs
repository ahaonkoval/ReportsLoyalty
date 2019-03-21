using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static DataModels.CrmWizardDB;
using LinqToDB.Data;

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
        /// <summary>
        /// 
        /// </summary>
        /// <param name="campaignId"></param>
        /// <param name="start_value"></param>
        /// <param name="end_value"></param>
        /// <returns></returns>
        public DataTable GetCustomersBetween(int campaignId, int start_value, int end_value) {

            using (var db = new DataModels.CrmWizardDB())
            {
                SqlCommand cmd = (SqlCommand)db.CreateCommand();
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                cmd.CommandText = "calc.p_get_customers_campaign_list";

                cmd.Parameters.AddWithValue("@campaign_id", campaignId);
                cmd.Parameters.AddWithValue("@start_value", start_value);
                cmd.Parameters.AddWithValue("@end_value", end_value);

                cmd.CommandTimeout = 100000000;

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
        /// <param name="campaignId"></param>
        /// <param name="start_value"></param>
        /// <param name="end_value"></param>
        /// <returns></returns>
        public DataTable GetCustomersBetweenLong(int campaignId, int start_value, int end_value)
        {

            using (var db = new DataModels.CrmWizardDB())
            {
                SqlCommand cmd = (SqlCommand)db.CreateCommand();
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                cmd.CommandText = "calc.p_get_customers_campaign_list_long";

                cmd.Parameters.AddWithValue("@campaign_id", campaignId);
                cmd.Parameters.AddWithValue("@start_value", start_value);
                cmd.Parameters.AddWithValue("@end_value", end_value);

                cmd.CommandTimeout = 100000000;

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
                    ocs.qtyPoints,
                    ocs.cardTypeLst,
                    ocs.obertIntersport,
                    ocs.obertMoncheri
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

                        cmd.Parameters.AddWithValue("@card_status_lst", om.cardTypeLst);
                        cmd.Parameters.AddWithValue("@obert_intersport", om.obertIntersport);
                        cmd.Parameters.AddWithValue("@obert_moncheri", om.obertMoncheri);

                        if (c.State != ConnectionState.Open)
                            c.Open();
                        cmd.ExecuteNonQuery();
                        c.Close();

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

        public void ClearControlGroup(int id)
        {
            using (var db = new DataModels.CrmWizardDB())
            {
                using (SqlConnection connect = new SqlConnection(db.ConnectionString))
                {
                    try
                    {
                        SqlCommand cmd = connect.CreateCommand();
                        cmd.CommandTimeout = 100000000;
                        cmd.CommandType = CommandType.Text;
                        cmd.Connection = connect;

                        cmd.CommandText = @"update cp set cp.control_group = 0 
                                    from calc.campaign_participant cp (nolock) where cp.campaign_id = @campaign_id and cp.control_group = 1";

                        cmd.Parameters.AddWithValue("@campaign_id", id);
                        if (connect.State != ConnectionState.Open)
                            connect.Open();
                        cmd.ExecuteNonQuery();
                        connect.Close();

                    } catch (Exception ex)
                    {

                    }
                    finally
                    {
                        if (connect.State != ConnectionState.Closed)
                            connect.Close();
                    }
                }
            }
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
        public string cardTypeLst { get; set; }
        public string obertIntersport { get; set; }
        public string obertMoncheri { get; set; }
    }
}
