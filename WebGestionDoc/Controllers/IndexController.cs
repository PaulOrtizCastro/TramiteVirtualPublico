using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Mincetur.Administracion.AplGestionDoc.WebGestionDoc.Controllers
{
    public class IndexController : Controller
    {
        //
        // GET: /Index/

        [HttpGet, OutputCache(NoStore = true, Duration = 0, VaryByParam = "None")]
        public ActionResult Main()
        {
            int FlgEmbed = 0;
            string test = Request.QueryString["strFlgEmbed"];

            if (Request.QueryString["strFlgEmbed"] != null)
            {
                if (!string.IsNullOrEmpty(Request.QueryString["strFlgEmbed"].ToString()))
                {
                    FlgEmbed = int.Parse(Request.QueryString["strFlgEmbed"]);
                }
            }

            return RedirectToAction("Index", "Seguridad", new { idParametro = Request.QueryString["idParametro"], CodBandeja = Request.QueryString["CodBandeja"], FlgEmbed = FlgEmbed });
        }

    }
}
