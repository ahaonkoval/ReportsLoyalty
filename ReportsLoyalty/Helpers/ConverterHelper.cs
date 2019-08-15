using System.Collections.Generic;

namespace ReportsLoyalty.Helpers
{
    public class ConverterHelper
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="ms"></param>
        /// <returns></returns>
        public static string GetStrigFormated(KeyValuePair<string, string>[] ms)
        {
            string current = string.Empty;
            foreach (var a in ms)
            {
                if (current == string.Empty)
                {
                    current = a.Value;
                }
                else
                {
                    current = current + string.Format("|{0}", a.Value);
                }
            }
            return current;
        }
    }
}