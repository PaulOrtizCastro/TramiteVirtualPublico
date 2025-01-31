using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Mincetur.Administracion.Seguridad.NeSeguridad;
using System.Configuration;
using Mincetur.Administracion.Seguridad.EnSeguridad;
//using Mincetur.Administracion.AplTramiteVirtualPublico.Utilitarios;
//using Mincetur.Administracion.AplGestionDoc.WebGestionDoc.Areas.Documento.Models;


namespace Mincetur.Administracion.AplGestionDoc.WebGestionDoc.Controllers
{
    public class SeguridadController : Controller
    {
        //
        // GET: /Seguridad/
        [AllowAnonymous]
        public ActionResult Index(string idParametro)
        {
            //string strCod = Newtonsoft.Json.JsonConvert.SerializeObject(new { ID_EXPE = 1000399, ID_MOVI = 11, ID_PERSONA = 3639 });
            //string strCod = Newtonsoft.Json.JsonConvert.SerializeObject(new { ID_EXPE = 1000235, ID_MOVI = 2, ID_PERSONA = 3639 });
            //B6B217EFFDE8EC7B9286AB2F6E1A67D9BF07F5EF085320EFCC3B4F3CBB1C4468CCE36E8E6C6FB6E2875D6B6A4EFFE49C87611FDC6872221B
            //qa
            //string strCod = Newtonsoft.Json.JsonConvert.SerializeObject(new { ID_EXPE = 1023583, ID_MOVI = 2, ID_PERSONA = 3639 });
            //B6B217EFFDE8EC7B82B367ECFB36D7C4484C71D1EC3C0EF933FEA7A370E23E808618376D6EFE59B91B97882C590D921A4FE3269471FFAA90
            //94F097CDBA03DA6C6C9BAF8CF0F1DA36197467873185A6E17761B9061C2F96FD2C6B24A2C21D252B
            //string strCodBandeja = Request.QueryString["CodBandeja"];
            int FlgEmbed = 0;
            if (!string.IsNullOrEmpty(Request.QueryString["FlgEmbed"]))
            {
                FlgEmbed = int.Parse(Request.QueryString["FlgEmbed"].ToString());
            }

            using (neAcceso objNeAcceso = new neAcceso())
            {
                enAcceso objEnAcceso = new enAcceso();
                objEnAcceso.ID_TIPOACCESO = 1;
                objEnAcceso.ID_SIS = int.Parse(ConfigurationManager.AppSettings["IdSis"].ToString());
                objEnAcceso.IP_ACCESO = System.Web.HttpContext.Current.Request.UserHostAddress;
                objEnAcceso.COD_FUENTE = "W";
                objEnAcceso.DES_OBS = "idParametro :" + idParametro;
                objNeAcceso.insertarAsp(objEnAcceso, "I");
            }
            return RedirectToAction("consDoc", "Gestion", new { Area = "Documento", idParametro = idParametro, strBandeja = Request.QueryString["CodBandeja"], strFlgEmbed = FlgEmbed });

            //return RedirectToAction("consDoc", "Gestion", new { Area = "Documento", idParametro = idParametro, strBandeja = Request.QueryString["CodBandeja"] });

            //if (!string.IsNullOrEmpty(Request.QueryString["CodBandeja"]) && Request.QueryString["CodBandeja"] == "I")
            //{
            //    return RedirectToAction("consNuevoDoc", "Gestion", new { Area = "Documento", idParametro = idParametro, strCallback = Request.QueryString["strCallback"] });
            //}
            //else
            //{
            //    return RedirectToAction("consDoc", "Gestion", new { Area = "Documento", idParametro = idParametro });
            //}
            
        }

    }
}
