namespace LoyaltyDB.Models
{
    public class Lterminate
    {
        public long campaign_id { get; set; }
        public string campaign_terms_short { get; set; }
        public string campaign_terms_details { get; set; }
        public string campaign_link { get; set; }
        public Lterminate()
        {

        }
    }
}
