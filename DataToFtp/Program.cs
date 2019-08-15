using WinSCP;

namespace DataToFtp
{
    class Program
    {
        static void Main(string[] args)
        {

            SessionOptions sessionOptions = new SessionOptions
            {
                Protocol = Protocol.Ftp,
                HostName = "10.27.1.12",
                UserName = "Epik",
                Password = "Epicentrk2019"
                //SshHostKeyFingerprint = "ssh-rsa 2048 xxxxxxxxxxx...="
            };

            using (Session session = new Session())
            {
                // Connect
                session.Open(sessionOptions);

                // Upload files
                TransferOptions transferOptions = new TransferOptions();
                transferOptions.TransferMode = TransferMode.Binary;

                TransferOperationResult transferResult;
                //transferResult =
                //    session.PutFiles(@"d:\toupload\*", "/home/user/", false, transferOptions);

                RemoteDirectoryInfo rt = session.ListDirectory("/loyalty/");
                // Throw on any error
                //transferResult.Check();

                // Print results
                //foreach (TransferEventArgs transfer in transferResult.Transfers)
                //{
                //    Console.WriteLine("Upload of {0} succeeded", transfer.FileName);
                //    Console.ReadLine();
                //}
            }

            //WinSCP.
            //ClientFtp client = new ClientFtp("ftp://10.27.1.12/", "Epik", "Epicentrk2019");
            //string[] list = client.ListDirectory();
            //StringBuilder result = new StringBuilder();
            //FtpWebRequest requestDir = (FtpWebRequest)WebRequest.Create("ftp://10.27.1.12/loyalty/");
            //requestDir.Method = WebRequestMethods.Ftp.ListDirectory;
            //requestDir.Credentials = new NetworkCredential("Epik", "Epicentrk2019");
            //FtpWebResponse responseDir = (FtpWebResponse)requestDir.GetResponse();
            //StreamReader readerDir = new StreamReader(responseDir.GetResponseStream());

            //string line = readerDir.ReadLine();
            //while (line != null)
            //{
            //    result.Append(line);
            //    result.Append("\n");
            //    line = readerDir.ReadLine();
            //}

            //result.Remove(result.ToString().LastIndexOf('\n'), 1);
            //responseDir.Close();

            //Console.Write(result.ToString().Split('\n'));
            ////return result.ToString().Split('\n');
            ///

            //FtpWebRequest directoryListRequest = (FtpWebRequest)WebRequest.Create("ftp://10.27.1.12/");
            //directoryListRequest.Method = WebRequestMethods.Ftp.ListDirectory;
            //directoryListRequest.Credentials = new NetworkCredential("Epik", "Epicentrk2019");
            //directoryListRequest.Method = WebRequestMethods.Ftp.ListDirectory;

            //using (FtpWebResponse directoryListResponse = (FtpWebResponse)directoryListRequest.GetResponse())
            //{
            //    using (StreamReader directoryListResponseReader = new StreamReader(directoryListResponse.GetResponseStream()))
            //    {
            //        string responseString = directoryListResponseReader.ReadToEnd();
            //        string[] results = responseString.Split(new string[] { "\r\n", "\n" }, StringSplitOptions.RemoveEmptyEntries);
            //        //return results;

            //        Console.Write(results.ToString().Split('\n'));
            //    }
            //}
        }
    }
}
