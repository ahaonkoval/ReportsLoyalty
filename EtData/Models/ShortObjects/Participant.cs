namespace LoyaltyDB.Models.ShortObjects
{
    public class Participant
    {
        public long PartId { get; set; }
        public long? CrmCustomerId { get; set; }
        public string MobilePhone { get; set; }
        public long? CampaignId { get; set; }
    }
}
