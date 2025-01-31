using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Mincetur.Administracion.AplGestionDoc.WebGestionDoc.Areas.Documento.Models;
using Mincetur.Administracion.AplTramiteVirtualPublico.Utilitarios.soap.ServicioArchivoLaserfiche;
using Mincetur.Administracion.AplTramiteVirtualPublico.Utilitarios;
using System.IO;
using System.Configuration;
using WCFConsDocCms = Mincetur.Administracion.AplTramiteVirtualPublico.Utilitarios.servicioGenerales.DocCmsConsulta;
using enTramite = Mincetur.Administracion.TramiteDocumentario.EnTramiteDocumentario;
using Mincetur.Administracion.AplTramiteVirtualPublico.NeTramiteVirtualPublico;

namespace Mincetur.Administracion.AplGestionDoc.WebGestionDoc.Areas.Documento.Controllers
{
    public class ArchivosController : Controller
    {
        //
        // GET: /Documento/Archivos/

        public ActionResult descargarArchivo()
        {

            int intIdDocCms = 0;
            int.TryParse(Request.QueryString["IdDocCms"], out intIdDocCms);

            if (intIdDocCms != 0)
            {
                WCFConsDocCms.ResultadoDocCms objResultadoDocCms = new WCFConsDocCms.WCFGeneralesDocCmsConsulta().descarga(new WCFConsDocCms.DocCmsDescarga()
                {
                    IdDocCms = intIdDocCms,
                    IdSis = int.Parse(System.Configuration.ConfigurationManager.AppSettings["IdSis"]),
                    IdUsu = Util.TraeIdUsuAuth(),
                    IpAcceso = Util.obtenerIP()
                });

                if (objResultadoDocCms.IdTipo == 0)
                {
                    MemoryStream pdfStream = new MemoryStream();
                    pdfStream.Write(objResultadoDocCms.DocCms.Archivo, 0, objResultadoDocCms.DocCms.Archivo.Length);
                    pdfStream.Position = 0;
                    return new FileStreamResult(pdfStream, objResultadoDocCms.DocCms.DesExtension);
                }
                else
                {
                    Response.Write(objResultadoDocCms.DesError);
                    Response.End();
                }
            }
            else
            {
                Response.Write("No se encontró el identificador del archivo.");
                Response.End();
            }

            return View();
            //int codCms = 0;
            //string tip = Request.QueryString["tip"];

            //if (!string.IsNullOrEmpty(Request.QueryString["CodCms"]))
            //{

            //    if (tip == "V")
            //    {
            //        ResultExportarArchByte objResultExportarArch = new ResultExportarArchByte();
            //        codCms = int.Parse(Request.QueryString["CodCms"].ToString());
            //        objResultExportarArch = Util.descargarArchivoLf(codCms);
            //        if (objResultExportarArch.archivo != null)
            //        {
            //            MemoryStream pdfStream = new MemoryStream();
            //            pdfStream.Write(objResultExportarArch.archivo, 0, objResultExportarArch.archivo.Length);
            //            pdfStream.Position = 0;
            //            return new FileStreamResult(pdfStream, objResultExportarArch.TipoContenidoMIME);
            //        }
            //        else {
            //            return View();
            //        }
            //    }
            //    else
            //    {
            //        ResultExportarArchByte objResultExportarArch = new ResultExportarArchByte();
            //        codCms = int.Parse(Request.QueryString["CodCms"].ToString());
            //        objResultExportarArch = Util.descargarArchivoLf(codCms);
            //        if (objResultExportarArch.archivo != null)
            //        {
            //            return File(objResultExportarArch.archivo, objResultExportarArch.ExtensionArchivo, objResultExportarArch.NombreArchivo);
            //        }
            //        else {
            //            return View();
            //        }

            //    }
            //}
            //else {
            //    return View();
            //}
        }
        
        public ActionResult verDocumentoElectronico()
        {

            string strIdDoc = "";
            var strUrlDocDig = "";
            
            if (!string.IsNullOrEmpty(Request.QueryString["idDoc"])) {
                strIdDoc = Util.encriptarAES(Request.QueryString["idDoc"]);
            }

            strUrlDocDig = ConfigurationManager.AppSettings["urlTramitePublico"] + strIdDoc;
            
            //if (!string.IsNullOrEmpty(Request.QueryString["CodCms"]))
            //{
            //    ViewBag.CodCms = Request.QueryString["CodCms"];
            //    ViewBag.UrlDocDig = strUrlDocDig;
            //    return PartialView("verDocumentoElectronico");
            //}
            if (!string.IsNullOrEmpty(Request.QueryString["IdDocCms"]))
            {
                ViewBag.IdDocCms = Request.QueryString["IdDocCms"];
                ViewBag.CodCms = Request.QueryString["CodCms"];
                ViewBag.UrlDocDig = strUrlDocDig;
                return PartialView("verDocumentoElectronico");
            }     
            else {
                return PartialView("mensajeDocumento");
            }            
        }
        //[HttpPost]
        public ActionResult obtenerIdDocCms() {
            List<enTramite.enDocLf> lst = new List<enTramite.enDocLf>();
            int idDocCms = 0;
            using (neDocLf objNeDocLf = new neDocLf()) {
               lst= objNeDocLf.listar(new enTramite.enDocLf() {
                    ID_DOC = int.Parse(Request.QueryString["idDoc"]),
                    OPR = "1"
                });           
            }
            if (lst.Count > 0) {
                idDocCms = lst[0].ID_DOC_CMS;
            }

            return RedirectToAction("VisorgDocRespuesta", new
            {
                IdDocCms = idDocCms
            });
        }
        public ActionResult VisorgDocRespuesta(int IdDocCms)
        {
            ViewBag.IdDocCms = IdDocCms;
            return View("~/Areas/Documento/Views/Archivos/VisorDocRespuesta.cshtml");
        }
    }
}
