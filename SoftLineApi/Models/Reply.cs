using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SoftLineApi.Models
{
    public class Replay
    {
        public int notification_id { get; set; }
        public List<Contact> contacts { get; set; }
    }
}
