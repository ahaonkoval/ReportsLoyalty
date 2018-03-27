using LoyaltyDB;
using SoftLineApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SoftLineApi
{
    public class DataApi
    {
        
        public delegate void EndSaveList(int StatusCount);
        
        public event EndSaveList onEndSaveList;
        /// <summary>
        /// 
        /// </summary>
        /// <param name="CampaignId"></param>
        /// <param name="pl"></param>
        public void SaveStatuses(int CampaignId, Replay pl)
        {
            var phones = pl.contacts.Select(o => o.phone).Distinct();

            using (GetData gt = new GetData())
            {
                List<int> l = StatusApi.GetFalseStatus();

                foreach (string pn in phones)
                {
                    var clst = pl.contacts.Where(w => w.phone == pn).ToList();

                    if (clst.Count > 1) // Кількість записів про доставку більше одієї і тому потрібно визначити останній
                    {
                        if (clst.Where(w1 => w1.status == 1).Count() >= 1)
                        {
                            if (clst.Where(w1 => l.Contains(w1.status)).Count() >= 1)
                            {
                                gt.Campaigns.SetStatusCampaignMailing(
                                    CampaignId,
                                    pn,
                                    1,
                                    "SMS"
                                );
                            }
                            else
                            {
                                gt.Campaigns.SetStatusCampaignMailing(
                                    CampaignId,
                                    pn,
                                    1,
                                    "VIBER"
                                );
                            }
                        }
                        else
                        {
                            gt.Campaigns.SetStatusCampaignMailing(
                                CampaignId,
                                pn,
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
                                gt.Campaigns.SetStatusCampaignMailing(CampaignId, clst.FirstOrDefault().phone, 1, "VIBER");
                                break;
                            case 3: // Прочитан 
                                gt.Campaigns.SetStatusCampaignMailing(CampaignId, clst.FirstOrDefault().phone, 1, "VIBER");
                                break;
                            default:
                                gt.Campaigns.SetStatusCampaignMailing(CampaignId, clst.FirstOrDefault().phone, 2, "VIBER");
                                break;

                        }

                    }
                }

                onEndSaveList(phones.Count());
            }

        }
    }
}
