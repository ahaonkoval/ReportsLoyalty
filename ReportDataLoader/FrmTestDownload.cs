using LoyaltyDB;
using System;
using System.Data;
using System.Data.SqlClient;
using System.Windows.Forms;

namespace WinLoader
{
    public partial class FrmTestDownload : Form
    {
        DataTable tb = new DataTable();
        string ConnectionString { get; set; }
        SqlConnection Connection { get; set; }

        public FrmTestDownload()
        {
            InitializeComponent();
        }

        public FrmTestDownload(string connectionString)
        {
            InitializeComponent();

            tb.Columns.Add(new DataColumn
            {
                ColumnName = "crm_customer_id",
                Caption = "crm_customer_id",
                DataType = typeof(Int64)
            });

            tb.Columns.Add(new DataColumn
            {
                ColumnName = "card_id",
                Caption = "card_id",
                DataType = typeof(Int64)
            });

            tb.Columns.Add(new DataColumn
            {
                ColumnName = "doc_id",
                Caption = "doc_id",
                DataType = typeof(Int64)
            });

            tb.Columns.Add(new DataColumn
            {
                ColumnName = "short_created",
                Caption = "short_created",
                DataType = typeof(DateTime)
            });

            tb.Columns.Add(new DataColumn
            {
                ColumnName = "ballance_amount_nds",
                Caption = "ballance_amount_nds",
                DataType = typeof(Double)
            });

            tb.Columns.Add(new DataColumn
            {
                ColumnName = "card_type_id",
                Caption = "card_type_id",
                DataType = typeof(Int64)
            });

            tb.Columns.Add(new DataColumn
            {
                ColumnName = "doc_type_id",
                Caption = "doc_type_id",
                DataType = typeof(Int64)
            });
            tb.Columns.Add(new DataColumn
            {
                ColumnName = "used_market_id",
                Caption = "used_market_id",
                DataType = typeof(Int64)
            });

            this.ConnectionString = connectionString;
            this.Connection = new SqlConnection(this.ConnectionString);

            this.dataGridView1.DataSource = tb;
        }

        private void btnStart_Click(object sender, EventArgs e)
        {
            //DataBaseHelpers.FillParticipantDocs(ref tb, Connection);
            using (GetData gt = new GetData())
            {
                gt.Campaigns.GetCountsCustomersForGroups(891, DateTime.Parse("2019-05-31"), false);
            }
        }
    }
}
