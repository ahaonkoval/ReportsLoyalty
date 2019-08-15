using DataLoader.Helpers;
using LoyaltyDB;
using System;
using System.Collections;
using System.ComponentModel;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Text;
using System.Windows.Forms;

namespace WinTest
{
    public partial class frmGetData : Form
    {
        string ConnectionString { get; set; }

        SqlConnection Connection { get; set; }

        BindingSource bsMarkets;

        BindingSource bsResult;

        DataTable tResult;

        int CustomersQty { get; set; }

        GetData Gdata { get; set; }

        #region Параметри....

        int CampaignId
        {
            get
            {
                if (txtCampaignId.Text.Trim() != string.Empty)
                {
                    return Convert.ToInt32(txtCampaignId.Text.Trim());
                }
                else
                {
                    return -1;
                }
            }
        }

        decimal BorderAmount
        {
            get
            {
                if (this.txtBorderAmount.Text.Trim() != string.Empty)
                {
                    return Convert.ToDecimal(this.txtBorderAmount.Text.Trim());
                }
                else
                {
                    return 0;
                }
            }
        }

        DateTime DateStart
        {
            get { return this.dtStart.Value; }
        }

        DateTime DateEnd
        {
            get { return this.dtEnd.Value; }
        }

        int MarketId
        {
            get
            {
                if (this.cmbMarketId.SelectedItem != null)
                {
                    return ((DataModels.DictMarkets)this.cmbMarketId.SelectedItem).Id;
                }
                else
                {
                    return 0;
                }
            }
        }
        #endregion

        public frmGetData()
        {
            InitializeComponent();
        }

        public frmGetData(string connectionString)
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

            lMarkets.Add(new DataModels.DictMarkets { Id = 0, MarketName = "ВСІ" });
            bsMarkets.DataSource = lMarkets.OrderBy(o => o.Id);

            cmbMarketId.DataSource = bsMarkets;
            cmbMarketId.DisplayMember = "MarketName";
            cmbMarketId.ValueMember = "Id";

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

            this.tResult.Clear();
            this.tResult = DataBaseHelpers.GetCampaignBuyers(
                    this.Connection,
                    Convert.ToInt32(parameters["MarketId"]),
                    Convert.ToInt32(parameters["CampaignId"]),
                    Convert.ToInt32(parameters["BorderAmount"]),
                    Convert.ToDateTime(parameters["DateStart"]),
                    Convert.ToDateTime(parameters["DateEnd"])
                );

            this.CustomersQty = DataBaseHelpers.GetCampaignBuyersCount(
                    this.Connection,
                    Convert.ToInt32(parameters["MarketId"]),
                    Convert.ToInt32(parameters["CampaignId"]),
                    Convert.ToInt32(parameters["BorderAmount"]),
                    Convert.ToDateTime(parameters["DateStart"]),
                    Convert.ToDateTime(parameters["DateEnd"])
                );
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
                dtStart.Value = cp.DateStart.Value;
                dtEnd.Value = cp.DateEnd.Value;

            }
        }

        private void btnLoad_Click(object sender, EventArgs e)
        {
            this.bsResult.DataSource = null;

            Hashtable parameters = new Hashtable();

            parameters.Add("MarketId", this.MarketId);
            parameters.Add("CampaignId", this.CampaignId);
            parameters.Add("BorderAmount", this.BorderAmount);

            parameters.Add("DateStart", this.DateStart);
            parameters.Add("DateEnd", this.DateEnd);

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

                File.WriteAllText(this.FolderCSVDialog.SelectedPath + string.Format("\\{0}_{1}.csv", Guid.NewGuid().ToString(), DateTime.Now.ToShortDateString()), sb.ToString());
            }
        }
    }
}
