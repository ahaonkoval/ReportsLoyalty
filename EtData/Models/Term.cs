﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EtData.Models
{
    public class Term
    {
        public long campaign_id { get; set; }
        public string campaign_terms_short { get; set; }
        public string campaign_terms_details { get; set; }
        public Term()
        {

        }
    }
}