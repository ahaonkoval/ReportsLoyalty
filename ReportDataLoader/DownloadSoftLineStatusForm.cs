using System;
using System.Windows.Forms;
using SoftLineApi;
using SoftLineApi.Models;
using LoyaltyDB;
using System.Linq;
using System.Collections.Generic;

namespace WinTest
{
    public partial class DownloadSoftLineStatusForm : Form
    {
        public delegate void InvokeSetStatusToList(int count, DateTime date);

        Handler h;
        public DownloadSoftLineStatusForm()
        {
            InitializeComponent();
        }

        void SetStatusToList(int count, DateTime date)
        {
            this.lstStatus.Items.Add(
                string.Format("Завантажено {0}, станом на: {1}", count.ToString(), date.ToLongTimeString())
                );
        }

        private void H_onPartDownloadStatus(int count, DateTime date)
        {
            object[] prms = new object[2];

            prms[0] = count;
            prms[1] = date;

            this.lstStatus.BeginInvoke(new InvokeSetStatusToList(SetStatusToList), prms);
        }

        private void btnRequestNew_Click(object sender, EventArgs e)
        {
            backgroundWorker1.RunWorkerAsync();
        }

        private void H_onEndDownloadStatus()
        {
            //throw new NotImplementedException();
            MessageBox.Show("Закінчено...");
        }

        private void backgroundWorker1_DoWork(object sender, System.ComponentModel.DoWorkEventArgs e)
        {
            h = new Handler(
                Convert.ToInt32(this.txtCampaignId.Text)
                );

            h.onEndDownloadStatus += H_onEndDownloadStatus;
            h.onPartDownloadStatus += H_onPartDownloadStatus;

            h.GetReplayByMailingId();
        }
    }
}
