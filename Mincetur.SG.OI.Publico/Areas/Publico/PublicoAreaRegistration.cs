using System.Web.Mvc;

namespace Mincetur.SG.OI.Publico.Areas.Publico
{
    public class PublicoAreaRegistration : AreaRegistration
    {
        public override string AreaName
        {
            get
            {
                return "Publico";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context)
        {
            context.MapRoute(
                "Publico_default",
                "Publico/{controller}/{action}/{id}",
                new { action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}
