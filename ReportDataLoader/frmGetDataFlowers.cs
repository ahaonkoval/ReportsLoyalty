using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using System.Data.SqlClient;
using LoyaltyDB;
using System.IO;
using System.Collections;
using DataLoader.Helpers;

namespace WinTest
{
    public partial class frmGetDataFlowers : Form
    {
        string ConnectionString { get; set; }

        SqlConnection Connection { get; set; }

        BindingSource bsMarkets;

        BindingSource bsResult;

        DataTable tResult;

        int CustomersQty { get; set; }

        GetData  Gdata { get; set; }

        public frmGetDataFlowers()
        {
            InitializeComponent();
        }

        public frmGetDataFlowers(string connectionString)
        {
            InitializeComponent();

            #region Додаткова ініціалізація
            bgSqlRequest.DoWork += BgSqlRequest_DoWork;
            bgSqlRequest.RunWorkerCompleted += BgSqlRequest_RunWorkerCompleted;

            tResult = new DataTable();
            #endregion

            this.ConnectionString = connectionString;
            Connection = new SqlConnection(this.ConnectionString);

            Gdata = new GetData();

            bsMarkets = new BindingSource();

            var lMarkets = Gdata.Dict.GetDictMarkets().ToList();

            lMarkets.Add(new DataModels.DictMarkets { Id = 0, MarketName = "ВСІ"});
            bsMarkets.DataSource = lMarkets.OrderBy(o => o.Id);

            this.bsResult = new BindingSource();
            this.gridResult.DataSource = this.bsResult;
        }

        private void BgSqlRequest_RunWorkerCompleted(object sender, RunWorkerCompletedEventArgs e)
        {
            this.bsResult.DataSource = this.tResult;
            this.txtParticipantCount.Text = this.CustomersQty.ToString();
            WinLoader.Helpers.FormsHelper.SetEnabled(this, true);
        }

        private void BgSqlRequest_DoWork(object sender, DoWorkEventArgs e)
        {
            Hashtable parameters = (Hashtable)e.Argument;

            //this.tResult.Clear();
            this.tResult = DataBaseHelpers.GetFlowersUsers(this.Connection);
        }

        private void txtCampaignId_Enter(object sender, EventArgs e)
        {

        }

        private void txtCampaignId_Leave(object sender, EventArgs e)
        {
            TextBox txtCampaignId = (TextBox)sender;
            if (txtCampaignId.Text.Trim() != string.Empty)
            {
                    DataModels.CampaignsMk cp = Gdata.Campaigns.GetCampaignById(Convert.ToInt32(txtCampaignId.Text.Trim()));
            }
        }

        private void btnLoad_Click(object sender, EventArgs e)
        {
            //this.bsResult.DataSource = null;

            Hashtable parameters = new Hashtable();

            this.bgSqlRequest.RunWorkerAsync(parameters);

            //this.Enabled = false;
            WinLoader.Helpers.FormsHelper.SetEnabled(this, false);
        }

        private void btnToCSV_Click(object sender, EventArgs e)
        {
            if (this.FolderCSVDialog.ShowDialog() == DialogResult.OK)
            {
                StringBuilder sb = new StringBuilder();

                string[] columnNames = this.tResult.Columns.Cast<DataColumn>().
                                                  Select(column => column.ColumnName).
                                                  ToArray();
                sb.AppendLine(string.Join(";", columnNames));

                foreach (DataRow row in this.tResult.Rows)
                {
                    string[] fields = row.ItemArray.Select(field => field.ToString()).
                                                    ToArray();
                    sb.AppendLine(string.Join(";", fields));
                }

                File.WriteAllText(
                    this.FolderCSVDialog.SelectedPath + string.Format("\\{0}_{1}.csv", Guid.NewGuid().ToString(), 
                    DateTime.Now.ToShortDateString()), 
                    sb.ToString(),
                    Encoding.UTF8
               );
            }
        }
    }
}
