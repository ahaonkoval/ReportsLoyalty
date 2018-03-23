using System;
using System.Windows.Forms;
using SoftLineApi;
using SoftLineApi.Models;
using LoyaltyDB;
using System.Linq;
using System.Collections.Generic;

namespace WinTest
{
    public partial class TestRequestForm : Form
    {
        public TestRequestForm()
        {
            InitializeComponent();
        }

        private void btnRequest_Click(object sender, EventArgs e)
        {
            Api api = new Api();

            string message = TestData.getData();
            //api.Request("2454812"); //2454812 2360876 2454812
            //string message = api.Request("2454812");

            Replay p = api.StringToObject(message);

            var phones = p.contacts.Select(o => o.phone).Distinct();

            //var statuses = p.contacts.Select(o => o.status).Distinct().ToArray();

            //string ms = string.Join(";", statuses);
            //this.txt.Text = ms;

            using (GetData gt = new GetData())
            {

                List<int> l = Helper.GetFalseStatus();

                foreach (string pn in phones)
                {
                    var clst = p.contacts.Where(w => w.phone == pn).ToList();

                    if (clst.Count > 1) // Кількість записів про доставку більше одієї і тому потрібно визначити останній
                    {
                        if (clst.Where(w1 => w1.status == 1).Count() >= 1)
                        {
                            if (clst.Where(w1 => l.Contains(w1.status)).Count() >= 1)
                            {
                                gt.Campaigns.SetStatusCampaignMailing(
                                    223,
                                    pn,
                                    1,
                                    "SMS"
                                );
                            }
                            else
                            {
                                gt.Campaigns.SetStatusCampaignMailing(
                                    223,
                                    pn,
                                    1,
                                    "VIBER"
                                );
                            }
                        } else
                        {
                            gt.Campaigns.SetStatusCampaignMailing(
                                223,
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
                                gt.Campaigns.SetStatusCampaignMailing(223, clst.FirstOrDefault().phone, 1, "VIBER");
                                break;
                            case 3: // Прочитан 
                                gt.Campaigns.SetStatusCampaignMailing(223, clst.FirstOrDefault().phone, 1, "VIBER");
                                break;
                            default:
                                gt.Campaigns.SetStatusCampaignMailing(223, clst.FirstOrDefault().phone, 2, "VIBER");
                                break;

                        }

                    }
                }
            }
        }
    }
}
