using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Data.SqlClient;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using DataLoader.Helpers;

namespace WinLoader
{
    public partial class FrmChangingStructure : Form
    {
        string ConnectionString { get; set; }
        SqlConnection Connection { get; set; }

        DataTable tResult;

        string CampaignIds
        {
            get
            {
                if (txtCampaignIds.Text.Trim() != string.Empty)
                {
                    return txtCampaignIds.Text.Trim();
                }
                else
                {
                    return string.Empty;
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


        public FrmChangingStructure()
        {
            InitializeComponent();
        }
        public FrmChangingStructure(string connectionString)
        {
            InitializeComponent();

            this.bgSqlRequest.DoWork += BgSqlRequest_DoWork;
            this.bgSqlRequest.ProgressChanged += BgSqlRequest_ProgressChanged;
            this.bgSqlRequest.RunWorkerCompleted += BgSqlRequest_RunWorkerCompleted;

            this.ConnectionString = connectionString;
            this.Connection = new SqlConnection(this.ConnectionString);
        }

        private void BgSqlRequest_RunWorkerCompleted(object sender, RunWorkerCompletedEventArgs e)
        {
            this.bsResult.DataSource = this.tResult;
            this.bsResult.ResetBindings(true);
            this.dataGridView1.DataSource = this.bsResult.DataSource;
            this.dataGridView1.Refresh();
            //this.txtParticipantCount.Text = this.CustomersQty.ToString();
            WinLoader.Helpers.FormsHelper.SetEnabled(this, true);
        }

        private void BgSqlRequest_ProgressChanged(object sender, ProgressChangedEventArgs e)
        {
            //throw new NotImplementedException();
        }

        private void BgSqlRequest_DoWork(object sender, DoWorkEventArgs e)
        {
            Hashtable parameters = (Hashtable)e.Argument;

            this.tResult = DataBaseHelpers.GetCustomersChangingStructureData(
                    this.Connection,
                    Convert.ToDateTime(parameters["DateStart"]),
                    Convert.ToDateTime(parameters["DateEnd"]),
                    Convert.ToString(parameters["Campaigns"])
                );
        }

        private void btnLoad_Click(object sender, EventArgs e)
        {
            this.bsResult.DataSource = null;

            Hashtable parameters = new Hashtable();

            parameters.Add("Campaigns", CampaignIds);
            parameters.Add("DateStart", DateStart);
            parameters.Add("DateEnd", DateEnd);

            this.bgSqlRequest.RunWorkerAsync(parameters);

            WinLoader.Helpers.FormsHelper.SetEnabled(this, false);
        }
    }
}
