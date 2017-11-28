using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SoftLineApi.Models;
using System.Configuration;
using System.Net;
using System.IO;

namespace SoftLineApi
{
    public class Api
    {
        Identification ident;

        string Uri { get; set; }

        public Api() {
            ident = new Identification();
            this.Uri = ConfigurationManager.AppSettings["Uri"];
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
    }
}
