using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Mincetur.Administracion.AplTramiteVirtualPublico.Utilitarios;
using Mincetur.SG.OI.Publico.Areas.Publico.Models;
using Newtonsoft.Json;

namespace Mincetur.SG.OI.Publico.Areas.Publico.Controllers
{
    public class SeguimientoController : Controller
    {
        //
        // GET: /Publico/Seguimiento/

        public ActionResult Expediente()
        {
            ExpeModel objExpeModel = new ExpeModel();
            string strUrlBase = $"{Request.Url.Scheme}://" + ConfigurationManager.AppSettings["strRedirect"];
            string strTicket = Request.QueryString["ticket"];
            string strRedirectUrl = $"{strUrlBase}?ticket={strTicket}";

            string json = Util.desencriptarAES(strTicket);

            objExpeModel = JsonConvert.DeserializeObject<ExpeModel>(json);


            Util.enviarAcceso(new Administracion.AplTramiteVirtualPublico.Utilitarios.soap.ServicioSeguridad.SeguridadSistema.enAcceso()
            {
                ID_PERSONA = objExpeModel.IdPersona,
                ID_SIS = objExpeModel.IdSis,
                ID_TIPOACCESO = 3,
                DES_OBS = "Codigo Qr enviado: " + json
            });

            return Redirect(strRedirectUrl);
        }

    }
}
