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

namespace SoftLineApi
{
    public class StatusApi
    {
        Identification ident;

        string Uri { get; set; }

        public StatusApi() {
            ident = new Identification();
            this.Uri = ConfigurationManager.AppSettings["Uri"];
        }
        #region PUBLIC

        public void GetReplayByMailingId(int CampaignId)
        {
            DataApi da = new DataApi();
            da.onEndSaveList += Da_onEndSaveList;

            string mailingId = string.Empty;

            using (GetData gd = new GetData())
            {
                mailingId = gd.Campaigns.GetMailingIdByCampaignId(CampaignId);
            }
            if (mailingId == null) mailingId = string.Empty;
            if (mailingId == string.Empty)
            {
                SoftLineApi.StatusApi SoftlineApi = new SoftLineApi.StatusApi();
                string response = SoftlineApi.Request(mailingId);
                if (response != string.Empty)
                {
                    Replay p = SoftlineApi.StringToObject(response);
                    if (p.contacts.Count > 0)
                    {
                        da.SaveStatuses(CampaignId, p);
                    }
                }
            }                   
        }

        private void Da_onEndSaveList(int StatusCount)
        {
            //throw new NotImplementedException();
        }

        public String Request(string NotificationId)
        {
            string source = string.Format(
                "\"login\":\"{0}\"," +
                "\"pwd\":\"{1}\"," +
                "\"notification_id\":{2}",
                this.ident.login,
                this.ident.pwd,
                NotificationId
            );

            source = "{" + source + "}";
            WebRequest request = WebRequest.Create(this.Uri);

            request.ContentType = "text/json";
            request.Method = "POST";

            byte[] byteArray = Encoding.UTF8.GetBytes(source);

            request.ContentLength = 0; // If it helps - we should find why byteArray.Length is null or 0
            request.ContentLength = byteArray.Length;
            Stream dataStream = request.GetRequestStream();
            // Write the data to the request stream.
            dataStream.Write(byteArray, 0, byteArray.Length);
            // Close the Stream object.
            dataStream.Close();

            WebResponse response = request.GetResponse();

            Stream ds = response.GetResponseStream();

            StreamReader reader = new StreamReader(ds);
            // Read the content.
            string responseFromServer = reader.ReadToEnd();

            ds.Close();
            return responseFromServer;
        }

        public Replay StringToObject(string m)
        {
            List<Contact> lc = new List<Models.Contact>();

            Replay rp = JsonConvert.DeserializeObject<Replay>(m);

            return rp;
        }

        public static List<int> GetTrueStatus()
        {
            List<int> l = new List<int>();
            l.Add(1);
            l.Add(3);
            return l;
        }

        public static List<int> GetFalseStatus()
        {
            List<int> l = new List<int>();
            l.Add(0);
            l.Add(2);
            l.Add(4);
            l.Add(5);
            l.Add(6);
            l.Add(7);
            return l;
        }
        #endregion

        #region PRIVATE

        #endregion
    }
}
