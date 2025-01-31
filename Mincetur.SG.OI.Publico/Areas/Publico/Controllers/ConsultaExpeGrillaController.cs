using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Mincetur.Administracion.AplTramiteVirtualPublico.Utilitarios;

namespace Mincetur.SG.OI.Publico.Areas.Publico.Controllers
{
    public class ConsultaExpeGrillaController : Controller
    {
        //
        // GET: /Publico/ConsultaExpeGrilla/

        public ActionResult Index()
        {
            string idExpe = "";
            string IdUsu = "";
            string IdMovi = "";
            string strTipo = "";
            //string strPo = Request.QueryString["po"];

            if (Request.Cookies["UsuarioConsultaExpeGrilla"] != null) {
                 idExpe = Request.Cookies["UsuarioConsultaExpeGrilla"].Values["IdExpe"].ToString();
                 IdUsu = Request.Cookies["UsuarioConsultaExpeGrilla"].Values["IdUsu"].ToString();
                 IdMovi = Request.Cookies["UsuarioConsultaExpeGrilla"].Values["IdMovi"].ToString();
                 strTipo = Request.Cookies["UsuarioConsultaExpeGrilla"].Values["strTipo"].ToString();
            }
            
            ViewBag.idExpe = idExpe;
            ViewBag.idPersona = IdUsu;            
            ViewBag.idMovi = IdMovi;
            ViewBag.strTipo = strTipo;

            ViewBag.intIdDoc = (!string.IsNullOrEmpty(Request.QueryString["doc"]) ? Util.desencriptarAES(Request.QueryString["doc"]) : "");
            
            return View(ViewBag);
        }

    }
}
