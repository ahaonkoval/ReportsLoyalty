using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ReportsLoyalty.Models
{
    public class FGroup
    {
        public long fgroup_id { get; set; }
        public string name { get; set; }
    }

    public class CampaignType
    {
        public long id { get; set; }
        public string name { get; set; }
    }
}