using System.Collections.Generic;

namespace SoftLineApi.Models
{
    public class Replay
    {
        public int notification_id { get; set; }
        public List<Contact> contacts { get; set; }
    }
}
