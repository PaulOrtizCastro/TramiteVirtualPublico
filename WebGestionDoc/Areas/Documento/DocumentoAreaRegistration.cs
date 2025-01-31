using System.Web.Mvc;

namespace Mincetur.Administracion.AplGestionDoc.WebGestionDoc.Areas.Documento
{
    public class DocumentoAreaRegistration : AreaRegistration
    {
        public override string AreaName
        {
            get
            {
                return "Documento";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context)
        {
            context.MapRoute(
                "Documento_default",
                "Documento/{controller}/{action}/{id}",
                new { action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}
