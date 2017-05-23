using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Routing;
using System.Web.Security;
using System.Web.SessionState;
using System.Web.Http;
using System.Web.Mvc;

namespace ReportsLoyalty
{
    public class Global : HttpApplication
    {
        void Application_Start(object sender, EventArgs e)
        {
            // Код, выполняемый при запуске приложения
            GlobalConfiguration.Configure(WebApiConfig.Register);

            //RouteConfig.RegisterRoutes
            RouteConfig.RegisterRoutes(RouteTable.Routes);

            //RouteTable.Routes.MapRoute(
            //    name: "Default_campaign",
            //    url: "{controller}/{action}",
            //    defaults: new { controller = "Campaign", action = "Index" });

            //GlobalConfiguration.Configure(WebApiConfig.Register);
        }
    }
}