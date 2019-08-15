using System.Web.Http;
using System.Web.Mvc;
using System.Web.Routing;

namespace ReportsLoyalty
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
                defaults: new { action = "Index", id = UrlParameter.Optional }
            );

            //RouteTable.Routes
            //routes.MapRoute(
            //    name: "Default_1",
            //    url: "{controller}/{action}",
            //    defaults: new { controller = "Campaign", action = "Index" });

            //GlobalConfiguration.Configure(WebApiConfig.Register);
        }
    }
}

