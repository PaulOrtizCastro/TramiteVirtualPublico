using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Configuration;
using Mincetur.Administracion.AplTramiteVirtualPublico.Utilitarios;
using objEnTramite = Mincetur.Administracion.TramiteDocumentario.EnTramiteDocumentario;
using Mincetur.Administracion.AplTramiteVirtualPublico.NeTramiteVirtualPublico;

namespace Mincetur.SG.OI.Publico.Areas.Publico.Controllers
{
    public class VisorController : Controller
    {
        //
        // GET: /Publico/Visor/

        #region "Visor"
        public ActionResult visorExpe()
        {
            string strCodUsu = "";
            string strDoc = "";
            string strDocDesencriptado = "";
            int idDoc = 0;
            int idExpe = 0;
            int idMovi = 0;
            int idAnio = 0;

            if (Request.QueryString[ConfigurationManager.AppSettings["codParamtro"]] != null)
            {
                strCodUsu = Request.QueryString[ConfigurationManager.AppSettings["codParamtro"]];
            }
            if (Request.QueryString[ConfigurationManager.AppSettings["docParametro"]] != null)
            {
                strDoc = Request.QueryString[ConfigurationManager.AppSettings["docParametro"]];
            }

            if (!string.IsNullOrEmpty(strDoc))
            {

                strDocDesencriptado = Util.desencriptarAES(strDoc).Trim();
            }

            if (int.TryParse(strDocDesencriptado, out idDoc)) {
                objEnTramite.enDoc objEnDoc = new objEnTramite.enDoc();
                List<objEnTramite.enDoc> lstDoc = new List<objEnTramite.enDoc>();


                if (idDoc != 0)
                {
                    objEnDoc.ID_DOC = idDoc;

                    using (neDoc objNeDoc = new neDoc())
                    {
                        lstDoc = objNeDoc.traeListaDoc(objEnDoc);
                    }
                    
                    if (lstDoc != null)
                    {
                        if (lstDoc.Count > 0)
                        {
                            idExpe = lstDoc[0].ID_EXPE;
                            idMovi = lstDoc[0].ID_MOVI;
                            idAnio = lstDoc[0].ID_ANO_PROC;
                        }
                    }
                }
            
            }
            return RedirectToAction("IndexConsultaExpeGrilla", "Ventanilla", new { ticket = Util.encriptarAES(idExpe + "|" + idMovi), Cod = strCodUsu, tipo = "I", po = Request.QueryString["po"], doc = strDoc });
        }

        public ActionResult regDocumentoVisor(string intIdDoc, string strCod)
        {
            ViewBag.test = Request.QueryString;
            //public ActionResult regDocumento(int intIdExpe, int intIdMovi, string intIdDoc, int intIdAnoProc, string strIdDiv, string strCod)
            return RedirectToAction("regDocumento", "Ventanilla", new { intIdExpe = 0, intIdMovi = 0, intIdDoc = intIdDoc, intIdAnoProc = 0, strIdDiv = "", strCod = strCod });
        }
        #endregion

    }
}
