using System;

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

    public class CampaignInfo
    {
        public string CampaignId { get; set; }
        public string CampaignName { get; set; }
        public string Created { get; set; }
        public string Status { get; set; }
    }

    public class Dates
    {
        public string Name { get; set; }

        public DateTime Value { get; set; }

        public bool IsCalculated { get; set; }
    }
}