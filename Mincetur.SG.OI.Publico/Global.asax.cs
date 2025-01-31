using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;
using System.Web.SessionState;
using Newtonsoft.Json;
using Mincetur.SG.OI.Publico.Resource;
using Mincetur.SG.OI.Publico.App_Start;
using Mincetur.SG.OI.Publico.Resource.clases;

namespace Mincetur.SG.OI.Publico
{
    // Note: For instructions on enabling IIS6 or IIS7 classic mode, 
    // visit http://go.microsoft.com/?LinkId=9394801
    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();

            WebApiConfig.Register(GlobalConfiguration.Configuration);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);

            JsonSerializerSettings objSerializador = new JsonSerializerSettings()
            {
                DateFormatString = "dd/MM/yyyy HH:mm:ss",
                DateFormatHandling = DateFormatHandling.MicrosoftDateFormat
            };
            objSerializador.Converters.Add(new customDateConvertor());
            GlobalConfiguration.Configuration.Formatters.JsonFormatter.SerializerSettings = objSerializador;
        }
    }
}