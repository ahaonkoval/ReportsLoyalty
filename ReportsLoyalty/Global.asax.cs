using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Routing;
using System.Web.Security;
using System.Web.SessionState;
using System.Web.Http;
using System.Web.Mvc;

using System.Threading;
using System.Threading.Tasks;
using LoyaltyDB;

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

        public void Start(int campaignId, DateTime dt)
        {
            var t = Task.Run(() => StartCampaignCalculation(campaignId, dt));
            t.Wait();
        }
        
        void StartCampaignCalculation(int campaignId, DateTime dt)
        {
            using (GetData data = new GetData())
            {
                data.Campaigns.SetStartCalculation(campaignId, dt);
            }
        }
    }
}