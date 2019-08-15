using LoyaltyDB;
using System;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using System.Web.Routing;

namespace ReportsLoyalty
{
    public class Global : HttpApplication
    {
        public static StartProcess SP { get; set; }

        void Application_Start(object sender, EventArgs e)
        {
            SP = new StartProcess();

            // Код, выполняемый при запуске приложения
            GlobalConfiguration.Configure(WebApiConfig.Register);

            //RouteConfig.RegisterRoutes
            RouteConfig.RegisterRoutes(RouteTable.Routes);

        }

        void Session_Start(Object sender, EventArgs e)
        {
            //int i = 0;
        }
    }

    public class StartProcess
    {
        public StartProcess()
        {

        }
        /* -------------------------------------------------------------------------------------------------- */
        /// <summary>
        /// Запуск на перерахунок звіту по акціїї
        /// Запуск в окремому потоці
        /// </summary>
        /// <param name="campaignId"></param>
        /// <param name="dt"></param>
        public void Start(int campaignId, DateTime dt, bool isDelyvery)
        {
            var t = Task.Run(() => StartCampaignCalculation(campaignId, dt, isDelyvery));
            t.Wait();
        }
        /// <summary>
        /// Запуск на перерахунок в...
        /// </summary>
        /// <param name="campaignId"></param>
        /// <param name="dt"></param>
        void StartCampaignCalculation(int campaignId, DateTime dt, bool isDelyvery)
        {
            using (GetData data = new GetData())
            {
                data.Campaigns.SetStartCalculation(campaignId, dt, isDelyvery);
            }
        }
        /* -------------------------------------------------------------------------------------------------- */
        public void StartFillCampaignFromTableList(int campaignId, string table, bool toDelete)
        {
            var t = Task.Run(() => StartFillCampaignFromTableListData(campaignId, table, toDelete));
            t.Wait();
        }

        void StartFillCampaignFromTableListData(int campaignId, string table, bool toDelete)
        {
            using (GetData data = new GetData())
            {
                data.Campaigns.StartFillCustomers(campaignId, table, toDelete);
            }
        }
        /* =================================================================================================== */
        public void StartCreateCampaignFromSelect(CustomerSelect oc)
        {
            var t = Task.Run(() => StartFillFromSelect(oc));
            t.Wait();
        }

        void StartFillFromSelect(CustomerSelect oc)
        {
            using (GetData data = new GetData())
            {
                data.Customers.StartFillFromSelect(oc);
            }
        }
    }
}