using Newtonsoft.Json;
using SoftLineApi.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Net;
using System.Text;

namespace SoftLineApi
{
    public class SoftLine
    {
        public int PackageSize = 1000;

        Identification ident;

        string Uri { get; set; }

        public SoftLine()
        {
            ident = new Identification();
            this.Uri = ConfigurationManager.AppSettings["Uri"];
        }

        public String Request(string NotificationId, int StartMessageId)
        {
            string source = string.Format(
                "\"login\":\"{0}\"," +
                "\"pwd\":\"{1}\"," +
                "\"notification_id\":{2}," +
                "\"start_message_id\":{3}," +
                "\"report_size\":{4}",
                this.ident.login,
                this.ident.pwd,
                NotificationId,
                StartMessageId.ToString(),
                PackageSize.ToString()
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
    }
}
