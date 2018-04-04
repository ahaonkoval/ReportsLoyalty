using DataModels;
using LoyaltyDB;
using LoyaltyDB.Models.ShortObjects;
using SoftLineApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SoftLineApi
{
    public class DataKeeper
    {

        public delegate void EndSaveList(bool IsEnd);
        public event EndSaveList onEndSaveList;

        GetData gt;

        public DataKeeper(GetData _gt)
        {
            this.gt = _gt;
        }


        public void DeleteStatuses(int campaignId)
        {
            gt.Campaigns.CampaignDeleteStatuses(campaignId);
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="CampaignId"></param>
        /// <param name="pl"></param>
        public void SaveStatuses(int campaignId, Replay pl, int _packageSize)
        {
            foreach (Contact c in pl.contacts)
            {
                gt.Campaigns.SetCampaignSoftlineStatus(campaignId, c.message_id, c.phone, c.status);
            }

            var phones = pl.contacts.Select(o =>
                    new RecipientPhone
                    {
                        MobilePhone = o.phone.IndexOf("+") < 0 ? "+" + o.phone : o.phone
                    }
                ).Distinct().ToList();

            List<int> l = SoftLine.GetFalseStatus();

            gt.Campaigns.CreateCampaignParticipantCache(campaignId);

            foreach (RecipientPhone rp in phones)
            {
                var clst = pl.contacts.Where(w => w.phone == rp.MobilePhone.Replace("+", "")).ToList();

                if (clst.Count > 1) // Кількість записів про доставку більше одієї і тому потрібно визначити останній
                {
                    if (clst.Where(w1 => w1.status == 1).Count() >= 1)
                    {
                        if (clst.Where(w1 => l.Contains(w1.status)).Count() >= 1)
                        {
                            gt.Campaigns.SetStatusCampaignMailing(
                                campaignId,
                                rp,
                                1,
                                "SMS"
                            );
                        }
                        else
                        {
                            gt.Campaigns.SetStatusCampaignMailing(
                                campaignId,
                                rp,
                                1,
                                "VIBER"
                            );
                        }
                    }
                    else
                    {
                        gt.Campaigns.SetStatusCampaignMailing(
                            campaignId,
                            rp,
                            2,
                            "SMS"
                        );
                    }
                }
                else // Кількість записів про доставку 1, і просто записуємо статус
                {
                    switch (clst.FirstOrDefault().status)
                    {
                        case 1: // Доставлен
                            gt.Campaigns.SetStatusCampaignMailing(campaignId, rp, 1, "VIBER");
                            break;
                        case 3: // Прочитан 
                            gt.Campaigns.SetStatusCampaignMailing(campaignId, rp, 1, "VIBER");
                            break;
                        default:
                            gt.Campaigns.SetStatusCampaignMailing(campaignId, rp, 2, "VIBER");
                            break;
                    }
                }
            }

            if (pl.contacts.Count() < _packageSize)
            {
                gt.Campaigns.FixCampaignStatus(campaignId);
                onEndSaveList(true);
            }
            else
            {
                onEndSaveList(false);
            }
        }
    }
}
