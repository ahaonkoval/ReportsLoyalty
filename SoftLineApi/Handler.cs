using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SoftLineApi.Models;
using System.Configuration;
using System.Net;
using System.IO;
using Newtonsoft.Json;
using LoyaltyDB;
using Microsoft.Win32.SafeHandles;
using System.Runtime.InteropServices;

namespace SoftLineApi
{
    public class Handler : IDisposable
    {
        bool disposed = false;
        SafeHandle handle = new SafeFileHandle(IntPtr.Zero, true);

        public delegate void EndDownloadStatus();
        public event EndDownloadStatus onEndDownloadStatus;

        public delegate void PartDownloadStatus(int count, DateTime date);
        public event PartDownloadStatus onPartDownloadStatus;

        int campaignId { get; set; }

        string mailingId { get; set; }

        DataKeeper dk { get; set; }

        int LastId { get; set; }

        GetData ldb { get; set; }

        public Handler(int _campaignId) {           
            this.ldb = new GetData();
            this.dk = new DataKeeper(this.ldb);

            dk.onEndSaveList += Da_onEndSaveList;

            this.campaignId = _campaignId;

            mailingId = ldb.Campaigns.GetMailingIdByCampaignId(campaignId);

            ldb.Campaigns.CreateCampaignParticipantCache(campaignId);

            this.LastId = 0;
        }
        #region PUBLIC

        public void GetReplayByMailingId()
        {
            // 
            if (this.LastId == 0)
            {
                dk.DeleteStatuses(this.campaignId);
            }

            if (mailingId == null) mailingId = string.Empty;
            if (mailingId != string.Empty)
            {
                SoftLine api = new SoftLine();
                string response = api.Request(mailingId, LastId);

                if (response != string.Empty)
                {
                    Replay p = api.StringToObject(response);
                    if (p.contacts.Count > 0)
                    {

                        onPartDownloadStatus(p.contacts.Count(), DateTime.Now);

                        //this.LastId = p.contacts.LastOrDefault().message_id;
                        this.LastId = p.contacts.Max(m => m.message_id);

                        dk.SaveStatuses(campaignId, p, api.PackageSize);
                    }
                    else
                    {
                        // Кінець
                        onEndDownloadStatus();
                    }
                }
            }                   
        }

        #endregion

        #region PRIVATE
        private void Da_onEndSaveList(bool isEnd)
        {
            if (isEnd)
            {
                onEndDownloadStatus();
                this.LastId = 0;
                // Кінець
            } else
            {
                this.GetReplayByMailingId();
            }
        }
        #endregion

        #region Dispose
        public void Dispose()
        {
            this.ldb.Dispose();
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        // Protected implementation of Dispose pattern.
        protected virtual void Dispose(bool disposing)
        {
            if (disposed)
                return;

            if (disposing)
            {
                handle.Dispose();
                // Free any other managed objects here.
                //
            }

            // Free any unmanaged objects here.
            //
            disposed = true;
        }
        #endregion
    }
}
