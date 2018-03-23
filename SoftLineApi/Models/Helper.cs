using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SoftLineApi.Models
{
    public class Helper
    {
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
