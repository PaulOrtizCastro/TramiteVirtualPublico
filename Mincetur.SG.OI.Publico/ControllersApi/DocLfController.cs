using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Http;
using Mincetur.Administracion.TramiteDocumentario.EnTramiteDocumentario;
//using Mincetur.Administracion.TramiteDocumentario.NeTramiteDocumentario;
using System.Configuration;
using Mincetur.Administracion.AplTramiteVirtualPublico.Utilitarios;
using Mincetur.Administracion.AplTramiteVirtualPublico.NeTramiteVirtualPublico;

namespace Mincetur.SG.OI.Publico.ControllersApi
{
    public class DocLfController : ApiController
    {
        //
        // GET: /DocLf/

        public List<enDocLf> listar(enDocLf objEnDocLf)
        {
            string strEncript = "";
            string strUrlLaser = ConfigurationManager.AppSettings["paginaLaserfiche"];
            objEnDocLf.ID_SIS = int.Parse(ConfigurationManager.AppSettings["codigoSistema"]);
            if (objEnDocLf == null) objEnDocLf = new enDocLf();
            if (objEnDocLf.OPR == "") objEnDocLf.OPR = "1";

            List<enDocLf> lstDocLf = new List<enDocLf>();

            using (neDocLf objNeDocLf = new neDocLf()) {
                lstDocLf = objNeDocLf.listar(objEnDocLf);
            }

            if (lstDocLf != null && lstDocLf.Count > 0) 
            {
                //strEncript = HttpUtility.UrlEncode(Util.encriptarAES(lstDocLf[0].COD_CMS + "|" + ConfigurationManager.AppSettings["codigoSistema"] + "|" + objEnDocLf.ID_USU + "|" + Util.obtenerIP()));

                //strEncript = HttpUtility.UrlEncode(Util.encriptarAES(lstDocLf[0].ID_DOC_CMS + "|" + ConfigurationManager.AppSettings["codigoSistema"] + "|" + objEnDocLf.ID_USU + "|" + Util.obtenerIP()));
                strEncript = HttpUtility.UrlEncode(Util.encriptarAES(Newtonsoft.Json.JsonConvert.SerializeObject(new { IdDocCms = lstDocLf[0].ID_DOC_CMS, IdUsu = objEnDocLf.ID_USU, IdSis = ConfigurationManager.AppSettings["codigoSistema"] })));
                lstDocLf[0].DESCRIPCION = strUrlLaser + strEncript;            
            }

            return lstDocLf;
        }

    }
}
