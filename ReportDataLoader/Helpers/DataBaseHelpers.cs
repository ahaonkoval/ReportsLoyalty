using System;
using System.Data;
using System.Data.SqlClient;
using System.Diagnostics;
using System.IO;

namespace DataLoader.Helpers
{
    public static class DataBaseHelpers
    {
        public static DataTable GetFlowersUsers(SqlConnection Connection)
        {
            DataTable ResultTable = new DataTable();
            bool wasOpen = Connection.State == ConnectionState.Open;
            try
            {
                string commandTxt = File.ReadAllText(Environment.CurrentDirectory + "\\SqlScreept\\GetFlowersUsers.sql");
                using (SqlCommand cmd = new SqlCommand(commandTxt, Connection))
                {
                    cmd.CommandTimeout = 12000000;

                    if (!wasOpen)
                    {
                        Connection.Open();
                    }

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        ResultTable.Load(reader);
                    }
                }
            }
            catch (Exception ex)
            {
                Trace.WriteLine($"Error in GetFlowersUsers: {ex.Message}");
            }
            finally
            {
                if (!wasOpen && Connection.State == ConnectionState.Open)
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
            bool wasOpen = Connection.State == ConnectionState.Open;
            try
            {
                string commandTxt = File.ReadAllText(Environment.CurrentDirectory + "\\SqlScreept\\CampaignBuyer.sql");
                using (SqlCommand cmd = new SqlCommand(commandTxt, Connection))
                {
                    cmd.CommandTimeout = 12000000;

                    cmd.Parameters.AddWithValue("@market_id", MarketId);
                    cmd.Parameters.AddWithValue("@campaign_id", CampaignId);
                    cmd.Parameters.AddWithValue("@border_amount", BorderAmount);
                    cmd.Parameters.AddWithValue("@date_start", DateStart);
                    cmd.Parameters.AddWithValue("@date_end", DateEnd);

                    if (!wasOpen)
                    {
                        Connection.Open();
                    }

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        ResultTable.Load(reader);
                    }
                }
            }
            catch (Exception ex)
            {
                Trace.WriteLine($"Error in GetCampaignBuyers: {ex.Message}");
            }
            finally
            {
                if (!wasOpen && Connection.State == ConnectionState.Open)
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
            bool wasOpen = Connection.State == ConnectionState.Open;
            try
            {
                string commandTxt = File.ReadAllText(Environment.CurrentDirectory + "\\SqlScreept\\CampaignBuyerCount.sql");
                using (SqlCommand cmd = new SqlCommand(commandTxt, Connection))
                {
                    cmd.CommandTimeout = 12000000;

                    cmd.Parameters.AddWithValue("@market_id", MarketId);
                    cmd.Parameters.AddWithValue("@campaign_id", CampaignId);
                    cmd.Parameters.AddWithValue("@border_amount", BorderAmount);
                    cmd.Parameters.AddWithValue("@date_start", DateStart);
                    cmd.Parameters.AddWithValue("@date_end", DateEnd);

                    if (!wasOpen)
                    {
                        Connection.Open();
                    }

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        ResultTable.Load(reader);
                    }
                }
            }
            catch (Exception ex)
            {
                Trace.WriteLine($"Error in GetCampaignBuyersCount: {ex.Message}");
            }
            finally
            {
                if (!wasOpen && Connection.State == ConnectionState.Open)
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
            bool wasOpen = Connection.State == ConnectionState.Open;
            try
            {
                string commandTxt = File.ReadAllText(Environment.CurrentDirectory + "\\SqlScreept\\ChangingStructure.sql");

                commandTxt = commandTxt.Replace("%CMP%", Campaigns);

                using (SqlCommand cmd = new SqlCommand(commandTxt, Connection))
                {
                    cmd.CommandTimeout = 12000000;

                    cmd.Parameters.AddWithValue("@date_start", DateStart);
                    cmd.Parameters.AddWithValue("@date_end", DateEnd);

                    if (!wasOpen)
                    {
                        Connection.Open();
                    }

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        ResultTable.Load(reader);
                    }
                }
            }
            catch (Exception ex)
            {
                Trace.WriteLine($"Error in GetCustomersChangingStructureData: {ex.Message}");
            }
            finally
            {
                if (!wasOpen && Connection.State == ConnectionState.Open)
                {
                    Connection.Close();
                }
            }

            return ResultTable;
        }

        public static long GetCountParticipantDocs(SqlConnection Connection)
        {
            long returned = 0;
            bool wasOpen = Connection.State == ConnectionState.Open;
            try
            {
                string commandTxt = "select count(*) participant_docs_qty from calc.v_cardusing (nolock)";

                using (SqlCommand cmd = new SqlCommand(commandTxt, Connection))
                {
                    cmd.CommandTimeout = 12000000;

                    if (!wasOpen)
                    {
                        Connection.Open();
                    }

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        DataTable t = new DataTable();
                        t.Load(reader);
                        if (t.Rows.Count > 0)
                        {
                            returned = Convert.ToInt64(t.Rows[0]["participant_docs_qty"]);
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                Trace.WriteLine($"Error in GetCountParticipantDocs: {ex.Message}");
            }
            finally
            {
                if (!wasOpen && Connection.State == ConnectionState.Open)
                {
                    Connection.Close();
                }
            }
            return returned;
        }

        public static void FillParticipantDocs(ref DataTable t, SqlConnection Connection)
        {
            bool wasOpen = Connection.State == ConnectionState.Open;
            try
            {
                string commandTxt = "SELECT * FROM calc.v_cardusing (nolock)";

                using (SqlCommand cmd = new SqlCommand(commandTxt, Connection))
                {
                    cmd.CommandTimeout = 12000000;

                    if (!wasOpen)
                    {
                        Connection.Open();
                    }

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        if (reader.FieldCount != t.Columns.Count)
                        {
                            Trace.WriteLine($"FillParticipantDocs: schema mismatch - reader has {reader.FieldCount} fields, table has {t.Columns.Count} columns.");
                        }
                        while (reader.Read())
                        {
                            DataRow row = t.NewRow();
                            for (int i = 0; i < reader.FieldCount && i < t.Columns.Count; i++)
                            {
                                row[i] = reader.IsDBNull(i) ? DBNull.Value : reader.GetValue(i);
                            }
                            t.Rows.Add(row);
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                Trace.WriteLine($"Error in FillParticipantDocs: {ex.Message}");
            }
            finally
            {
                if (!wasOpen && Connection.State == ConnectionState.Open)
                {
                    Connection.Close();
                }
            }
        }
    }
}
