using System.IO;

namespace SoftLineApi
{
    public class TestData
    {
        public static string getData()
        {
            string path = "D:\\develops\\GitHub\\ReportLoyalty\\SoftLineApi\\Data.txt";

            string readText = string.Empty;

            if (File.Exists(path))
            {
                readText = File.ReadAllText(path);
            }

            return readText;
        }
    }
}
