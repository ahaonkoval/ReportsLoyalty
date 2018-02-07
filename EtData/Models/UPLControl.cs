using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LoyaltyDB.Models
{
    public class UPLControl
    {
        /// <summary>
        /// місто
        /// </summary>
        public string City { get; set; }
        /// <summary>
        /// кількість учасників
        /// </summary>
        public decimal Customers_qty { get; set; }
        /// <summary>
        /// різниця в кількості учасників з поппереднім днем
        /// </summary>
        public decimal Diff_customers_qty { get; set; }
        /// <summary>
        /// зверниути увагу
        /// </summary>
        public bool is_alert_customers_qty { get; set; }
        /// <summary>
        /// кількість виданих карт 
        /// </summary>
        public decimal card_issued_qty { get; set; }
        /// <summary>
        /// різниця з попереднім днем в кількості виданих карт
        /// </summary>
        public decimal diff_card_issued_qty { get; set; }
        /// <summary>
        /// звернути увагу
        /// </summary>
        public bool is_alert_card_issued_qty { get; set; }
        /// <summary>
        /// кількість записів по документам КНК
        /// </summary>
        public decimal knk_qty { get; set; }
        /// <summary>
        /// різниця з попереднім днем
        /// </summary>
        public decimal diff_knk_qty { get; set; }
        /// <summary>
        /// звернути увагу
        /// </summary>
        public bool is_alert_knk_qty { get; set; }
        /// <summary>
        /// кількість документів в sellmovement
        /// </summary>
        public decimal qty_doc { get; set; }
        /// <summary>
        /// різниця з попереднім днем
        /// </summary>
        public decimal diff_qty_doc { get; set; }
        /// <summary>
        /// звернути увагу
        /// </summary>
        public bool is_alert_qty_doc { get; set; }
        /// <summary>
        /// кількість документів РРЗ
        /// </summary>
        public decimal rrz_qty { get; set; }
        /// <summary>
        /// різниця з попереднім днем
        /// </summary>
        public decimal diff_rrz_qty { get; set; }
        /// <summary>
        /// звернути увагу
        /// </summary>
        public bool is_alert_rrz_qty { get; set; }
        /// <summary>
        /// кількість записів в sellmovement
        /// </summary>
        public decimal qty_sell_record_qty { get; set; }
        /// <summary>
        /// різниця з попереднім днем
        /// </summary>
        public decimal diff_qty_sell_record_qty { get; set; }
        /// <summary>
        /// звернути увагу
        /// </summary>
        public bool is_alert_qty_sell_record_qty { get; set; }

        public UPLControl()
        {

        }
    }
}
