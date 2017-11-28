using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SoftLineApi.Models
{
    public class Contact
    {
        public int message_id { get; set; }
        public string phone { get; set; }
        public int status { get; set; }
    }
}
