using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LoyaltyDB.Models
{
    public class TDoc
    {
        public long DocId { get; set; }

        public string Name { get; set; }

        public DateTime Transformered { get; set; }
    }
}
