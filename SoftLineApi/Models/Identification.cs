using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Configuration;

namespace SoftLineApi.Models
{
    public class Identification
    {
        public string login { get; set; }
        public string pwd { get; set; }

        public Identification()
        {
            this.login = ConfigurationManager.AppSettings["Login"];
            this.pwd = ConfigurationManager.AppSettings["Password"];
        }
        //public int notification_id { get; set; }
    }
}
