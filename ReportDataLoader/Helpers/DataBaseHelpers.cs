using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataLoader.Helpers
{
    public static class DataBaseHelpers
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="Connection"></param>
        /// <param name="MarketId"></param>
        /// <param name="CampaignId"></param>
        /// <param name="BorderAmount"></param>
        /// <param name="DateStart"></param>
        /// <param name="DateEnd"></param>
        /// <returns></returns>
        public static DataTable GetCampaignBuyers(
                SqlConnection Connection,
                int MarketId,
                int CampaignId,
                int BorderAmount,
                DateTime DateStart,
                DateTime DateEnd
            )
        {
            DataTable ResultTable = new DataTable();
            try
            {
                string commandTxt = File.ReadAllText(Environment.CurrentDirectory + "\\SqlScreept\\CampaignBuyer.sql");
                SqlCommand cmd = new SqlCommand(commandTxt, Connection);
                cmd.CommandTimeout = 12000000;

                cmd.Parameters.AddWithValue("@market_id", MarketId);
                cmd.Parameters.AddWithValue("@campaign_id", CampaignId);
                cmd.Parameters.AddWithValue("@border_amount", BorderAmount);
                cmd.Parameters.AddWithValue("@date_start", DateStart);
                cmd.Parameters.AddWithValue("@date_end", DateEnd);

                if (Connection.State != ConnectionState.Open)
                {
                    Connection.Open();
                    SqlDataReader reader = cmd.ExecuteReader();
                    ResultTable.Load(reader);
                    Connection.Close();
                }
            }
            catch (Exception ex)
            {
                // TODO: Логировать....
            }
            finally
            {
                if (Connection.State == ConnectionState.Open)
                {
                    Connection.Close();
                }
            }

            return ResultTable;
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="Connection"></param>
        /// <param name="MarketId"></param>
        /// <param name="CampaignId"></param>
        /// <param name="BorderAmount"></param>
        /// <param name="DateStart"></param>
        /// <param name="DateEnd"></param>
        /// <returns></returns>
        public static int GetCampaignBuyersCount(
                SqlConnection Connection,
                int MarketId,
                int CampaignId,
                int BorderAmount,
                DateTime DateStart,
                DateTime DateEnd
            )
        {

            DataTable ResultTable = new DataTable();
            try
            {
                string commandTxt = File.ReadAllText(Environment.CurrentDirectory + "\\SqlScreept\\CampaignBuyerCount.sql");
                SqlCommand cmd = new SqlCommand(commandTxt, Connection);
                cmd.CommandTimeout = 12000000;

                cmd.Parameters.AddWithValue("@market_id", MarketId);
                cmd.Parameters.AddWithValue("@campaign_id", CampaignId);
                cmd.Parameters.AddWithValue("@border_amount", BorderAmount);
                cmd.Parameters.AddWithValue("@date_start", DateStart);
                cmd.Parameters.AddWithValue("@date_end", DateEnd);

                if (Connection.State != ConnectionState.Open)
                {
                    Connection.Open();
                    SqlDataReader reader = cmd.ExecuteReader();
                    ResultTable.Load(reader);
                    Connection.Close();
                }
            }
            catch (Exception ex)
            {
                // TODO: Логировать....
            }
            finally
            {
                if (Connection.State == ConnectionState.Open)
                {
                    Connection.Close();
                }
            }

            if (ResultTable.Rows.Count > 0)
            {
                return Convert.ToInt32(ResultTable.Rows[0][0]);
            }
            else
            {
                return 0;
            }            
        }

        public static DataTable GetCustomersChangingStructureData(SqlConnection Connection,
                DateTime DateStart,
                DateTime DateEnd,
                string Campaigns)
        {
            DataTable ResultTable = new DataTable();
            try
            {
                string commandTxt = File.ReadAllText(Environment.CurrentDirectory + "\\SqlScreept\\ChangingStructure.sql");

                commandTxt = commandTxt.Replace("%CMP%", Campaigns);

                SqlCommand cmd = new SqlCommand(commandTxt, Connection);
                cmd.CommandTimeout = 12000000;

                cmd.Parameters.AddWithValue("@date_start", DateStart);
                cmd.Parameters.AddWithValue("@date_end", DateEnd);

                if (Connection.State != ConnectionState.Open)
                {
                    Connection.Open();
                    SqlDataReader reader = cmd.ExecuteReader();
                    ResultTable.Load(reader);
                    Connection.Close();
                }
            }
            catch (Exception ex)
            {
                // TODO: Логировать....
            }
            finally
            {
                if (Connection.State == ConnectionState.Open)
                {
                    Connection.Close();
                }
            }

            return ResultTable;
        }

        public static long GetCountParticipantDocs(SqlConnection Connection)
        {
            long returned = 0;
            try
            {
                string commandTxt = "select count(*) participant_docs_qty from calc.v_cardusing (nolock)";

                SqlCommand cmd = new SqlCommand(commandTxt, Connection);
                cmd.CommandTimeout = 12000000;


                if (Connection.State != ConnectionState.Open)
                {
                    Connection.Open();
                    SqlDataReader reader = cmd.ExecuteReader();
                    DataTable t = new DataTable();
                    t.Load(reader);
                    returned = Convert.ToInt64(t.Rows[0]["participant_docs_qty"]);
                    Connection.Close();
                }
            }
            catch
            {

            }
            finally
            {
                if (Connection.State == ConnectionState.Open)
                {
                    Connection.Close();
                }
            }
            return returned;
        }
        
        public static void FillParticipantDocs(ref DataTable t, SqlConnection Connection)
        {
            try
            {
                string commandTxt = "SELECT * FROM calc.v_cardusing (nolock)";

                SqlCommand cmd = new SqlCommand(commandTxt, Connection);
                cmd.CommandTimeout = 12000000;

                if (Connection.State != ConnectionState.Open)
                {
                    Connection.Open();

                    SqlDataReader reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        DataRow row = t.NewRow();
                        row["crm_customer_id"] = reader.GetInt64(0);
                        
                        //ReadSingleRow((IDataRecord)reader);
                    }

                    Connection.Close();
                }
            }
            catch (Exception ex)
            {

            }
            finally
            {
                if (Connection.State == ConnectionState.Open)
                {
                    Connection.Close();
                }
            }
        }
    }
}
