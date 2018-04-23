﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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