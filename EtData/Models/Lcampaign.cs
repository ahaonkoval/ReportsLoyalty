﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace LoyaltyDB.Models
{
    public class Lcampaign
    {
        public long campaign_id { get; set; }
        public string name { get; set; }
        public DateTime date_start { get; set; }
        public DateTime date_end { get; set; }
        public int is_run { get; set; }
        public string group_id_0 { get; set; }
        public string group_id_2 { get; set; }
        public int type_id { get; set; }

        public string mailing_id { get; set; }

        public DateTime? date_send { get; set; }

        public Lcampaign()
        {

        }
    }
}