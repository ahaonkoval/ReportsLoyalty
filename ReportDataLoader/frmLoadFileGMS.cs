using ExcelLibrary;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using LoyaltyDB;
using System.IO;

namespace WinTest
{
    public partial class frmLoadFileGMS : Form
    {
        DataSet LoadDataSet;

        private BindingSource bndLoadGrid;

        int CampaignId
        {
            get
            {
                int i = 0;
                try
                {
                    i = Convert.ToInt32(this.txtCampaignId.Text.Trim());
                } catch (Exception ex)
                {
                    i = -1;
                }

                return i; 
            }
        }

        long RecCount
        {
            get {
                int i = 0;
                try
                {
                    i = ((DataTable)this.bndLoadGrid.DataSource).Rows.Count;
                }
                catch
                {
                    i = 0;
                }
                return i;
            }
        }

        Guid partId;

        string _pathCSV;
        string PathCSV
        {
            get
            {
                if (_pathCSV != string.Empty) {
                    return _pathCSV;
                } else
                {
                    return string.Empty;
                }
            }
        }

        public frmLoadFileGMS()
        {
            this.bndLoadGrid = new BindingSource();
            _pathCSV = string.Empty;

            InitializeComponent();
        }

        private void btnLoadExcel_Click(object sender, EventArgs e)
        {
            OpenFileDialog openFileDialog = new OpenFileDialog();
            openFileDialog.InitialDirectory = Environment.GetFolderPath(Environment.SpecialFolder.Personal);
            openFileDialog.Filter = "Excel файлы (*.xlsx)|*.xlsx|Все файлы (*.*)|*.*";
            if (openFileDialog.ShowDialog(this) == DialogResult.OK)
            {
                //string FileName = openFileDialog.FileName;
                this.lblFileName.Text = openFileDialog.FileName;
                LoadExcel(openFileDialog.FileName);
            }
        }

        private bool LoadExcel(string _location_file)
        {
            using (ExcelConverter converter = new ExcelConverter(_location_file))
            {
                if (!converter.IsTrueLoad)
                {
                    return false;
                }                

                try
                {
                    this.LoadDataSet = converter.ExcelDataSet;

                    cmbListNames.Items.Clear();
                    //cmbListNames.Text = string.Empty;

                    if (this.LoadDataSet.Tables.Count > 0)
                    {
                        foreach (DataTable table in this.LoadDataSet.Tables)
                        {
                            cmbListNames.Items.Add(table.TableName);
                        }
                        //cmbListNames.SelectedValue = this.LoadDataSet.Tables[0].TableName;
                        cmbListNames.SelectedIndex = 0;
                    }

                    return true;
                }
                catch (Exception ex)
                {
                    //this.LoadDataSet = new DataSet();
                    return false;
                }
            }
        }

        private void cmbListNames_SelectedIndexChanged(object sender, EventArgs e)
        {
            if (this.LoadDataSet.Tables.Count > 0)
            {
                this.bndLoadGrid.DataSource = this.LoadDataSet.Tables[(string)cmbListNames.SelectedItem];
                grdExcelStatus.DataSource = this.bndLoadGrid;

                this.label3.Text = string.Format("Кількість записів: {0}", this.RecCount.ToString());

            }
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        private void bWorker_DoWork(object sender, DoWorkEventArgs e)
        {
            this.partId = Guid.NewGuid();

            BackgroundWorker worker = sender as BackgroundWorker;
            this.SaveContacts((DataTable)this.bndLoadGrid.DataSource, worker);
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="t"></param>
        /// <param name="bw"></param>
        private void SaveContacts(DataTable t, BackgroundWorker bw)
        {
            using (GetData data = new GetData())
            {
                if (this.CampaignId > 0)
                {
                    data.Campaigns.SetDeliveryGMSStatusByCampaignId(this.CampaignId, t, bw, this.partId);
                }
            }
        }

        private void bWorker_ProgressChanged(object sender, ProgressChangedEventArgs e)
        {
            this.tsProgress.Value = e.ProgressPercentage;
            //this.label3.Text = (Convert.ToInt32(this.label3.Text) - (int)e.ProgressPercentage).ToString();

            this.label4.Text = string.Format("Завантажено: {0}", e.ProgressPercentage.ToString());
        }

        private void bWorker_RunWorkerCompleted(object sender, RunWorkerCompletedEventArgs e)
        {
            using (GetData data = new GetData())
            {
                data.Campaigns.SetGmsStatusEnd(this.CampaignId, this.partId);
            }

            WinLoader.Helpers.FormsHelper.SetEnabled(this, true);
            this.Text = "ЗАВАНТАЖЕНО!!!";
        }

        private void btnStart_Click(object sender, EventArgs e)
        {
            if (this.CampaignId > 0)
            {
                tsProgress.Minimum = 0;
                tsProgress.Maximum = ((DataTable)this.bndLoadGrid.DataSource).Rows.Count;

                bWorker.RunWorkerAsync();

                WinLoader.Helpers.FormsHelper.SetEnabled(this, false);

            } else
            {
                MessageBox.Show("Вкажіть ID кампанії!");
            }
        }

        private void btnLoadCsv_Click(object sender, EventArgs e)
        {
            if (this.CampaignId > 0)
            {

                OpenFileDialog openFileDialog = new OpenFileDialog();
                openFileDialog.InitialDirectory = Environment.GetFolderPath(Environment.SpecialFolder.Personal);
                openFileDialog.Filter = "Excel файлы (*.csv)|*.csv|Все файлы (*.*)|*.*";
                if (openFileDialog.ShowDialog(this) == DialogResult.OK)
                {
                    this.lblCSVFile.Text = openFileDialog.FileName;
                    this._pathCSV = openFileDialog.FileName;
                    this.bWorkerCSV.RunWorkerAsync();
                }
            }
            else
            {
                MessageBox.Show("Вкажіть ID кампанії!");
            }
        }

        private void ReadCsv(string pathCsv, BackgroundWorker bw)
        {
            Int32 CurrentPosition = 0;

            if (this.CampaignId > 0)
            {
                using (GetData data = new GetData())
                {
                    using (var reader = new StreamReader(pathCsv, Encoding.Default))
                    {
                        while (!reader.EndOfStream)
                        {
                            var line = reader.ReadLine();
                            var values = line.Split(';');

                            string phone = values[1].Replace("\"", "");
                            string status = values[3];
                            string chanel = values[4];

                            int status_id = 0;
                            switch (status.Trim())
                            {
                                case "Доставлен":
                                    status_id = 1;
                                    break;
                                case "Прочитан":
                                    status_id = 3;
                                    break;
                                default:
                                    status_id = 0;
                                    break;
                            }

                            data.Campaigns.SetCampaignSoftlineStatus(this.CampaignId, 0, phone, status_id);
                            CurrentPosition = CurrentPosition + 1;
                            bw.ReportProgress(CurrentPosition);

                        }
                    }
                }
            }
            
        }

        private void bWorkerCSV_DoWork(object sender, DoWorkEventArgs e)
        {
            BackgroundWorker worker = sender as BackgroundWorker;
            this.ReadCsv(this.PathCSV, worker);
        }

        private void bWorkerCSV_ProgressChanged(object sender, ProgressChangedEventArgs e)
        {
            //if (e.ProgressPercentage.ToString().LastOrDefault().ToString() == "0")
            //tsStatus.Text = e.ProgressPercentage.ToString();
            //this.tsProgress.Value = e.ProgressPercentage;
        }

        private void bWorkerCSV_RunWorkerCompleted(object sender, RunWorkerCompletedEventArgs e)
        {
            using (GetData data = new GetData())
            {
                data.Campaigns.SetSoftLineStatusEnd(this.CampaignId);
            }

            this.Enabled = true;
            MessageBox.Show("Закінчено!");
        }
    }
}
