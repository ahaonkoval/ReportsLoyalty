﻿using EtData.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EtData
{
    public class Dict
    {
        EtData.LoyaltyEntities Le;

        public Dict(EtData.LoyaltyEntities le)
        {
            Le = le;
        }

        public IEnumerable<dict_markets> GetDictMarkets()
        {
            return Le.dict_markets.ToList();
        }

        public Decimal GetFractionParticipantSaleByCampaignId(int id)
        {
            return 0;
        }

        public IEnumerable<v_fgroups> GetGroups(int level_id)
        {
            return Le.v_fgroups.Where(w => w.level_id == level_id).OrderBy(o => o.fgroup_id);
        }

        public IEnumerable<v_fgroups> GetGroupsByParentId(int parent_id)
        {
            return Le.v_fgroups.Where(w => w.parent_id == parent_id).OrderBy(o => o.fgroup_id);
        }

        public List<UPLControl> GetUploadingControlData()
        {
            List<UPLControl> l_ctrl = new List<UPLControl>();

            //var uc = Le.p_get_daily_upload_control(DateTime.Now.AddDays(-1), 0);
            //foreach (UPLOAD_CONTROL c in uc)
            //{
            //    if (c.customers_qty != null)
            //    {
            //        l_ctrl.Add(
            //            new Models.UPLControl
            //            {
            //                card_issued_qty = c.card_issued_qty.Value,
            //                City = c.city,
            //                Customers_qty = c.customers_qty.Value,
            //                diff_card_issued_qty = c.diff_card_issued_qty.Value,
            //                Diff_customers_qty = c.diff_customers_qty.Value,
            //                diff_knk_qty = c.diff_knk_qty.Value,
            //                diff_qty_doc = c.diff_qty_doc.Value,
            //                diff_qty_sell_record_qty = c.diff_qty_sell_record_qty.Value,
            //                diff_rrz_qty = c.diff_rrz_qty.Value,
            //                is_alert_card_issued_qty = Convert.ToBoolean(c.is_alert_card_issued_qty),
            //                is_alert_customers_qty = Convert.ToBoolean(c.is_alert_customers_qty),
            //                is_alert_knk_qty = Convert.ToBoolean(c.is_alert_knk_qty),
            //                is_alert_qty_doc = Convert.ToBoolean(c.is_alert_qty_doc),
            //                is_alert_qty_sell_record_qty = Convert.ToBoolean(c.is_alert_qty_sell_record_qty),
            //                is_alert_rrz_qty = Convert.ToBoolean(c.is_alert_rrz_qty),
            //                knk_qty = c.knk_qty.Value,
            //                qty_doc = c.qty_doc.Value,
            //                qty_sell_record_qty = c.qty_sell_record_qty.Value,
            //                rrz_qty = c.rrz_qty.Value
            //            });
            //    }
            //}
            return l_ctrl;
        }
    }
}
