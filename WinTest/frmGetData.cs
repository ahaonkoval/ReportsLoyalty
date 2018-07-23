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

namespace WinTest
{
    public partial class frmGetData : Form
    {
        string ConnectionString { get; set; }

        SqlConnection Connection { get; set; }

        GetData  Gdata { get; set; }
        public frmGetData()
        {
            InitializeComponent();
        }

        public frmGetData(string connectionString)
        {
            InitializeComponent();
            this.ConnectionString = connectionString;
            Connection = new SqlConnection(this.ConnectionString);

            Gdata = new GetData();
        }

        private void txtCampaignId_Enter(object sender, EventArgs e)
        {
            TextBox txtCampaignId = (TextBox)sender;
            if (txtCampaignId.Text.Trim() != string.Empty)
            {
                ..DataModels.CampaignsMk cp = Gdata.Campaigns.GetCampaignById(Convert.ToInt32(txtCampaignId.Text.Trim()));
            }
        }
    }
}
