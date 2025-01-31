using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Http;
using Mincetur.Administracion.TramiteDocumentario.CoTramiteDocumentario;
using Mincetur.Administracion.TramiteDocumentario.EnTramiteDocumentario;
using Mincetur.Administracion.TramiteDocumentario.NeTramiteDocumentario;
using Mincetur.Administracion.AplTramiteVirtualPublico.Utilitarios;
using Mincetur.Administracion.AplGestionDoc.WebGestionDoc.Models;

using enMoviPublico = Mincetur.Administracion.AplTramiteVirtualPublico.EnTramiteVirtualPublico;
using neMoviPublico = Mincetur.Administracion.AplTramiteVirtualPublico.NeTramiteVirtualPublico;
using Mincetur.Administracion.GeneralesUtil.EnGeneralesUtil;
using Mincetur.Administracion.AplTramiteVirtualPublico.NeTramiteVirtualPublico;
using enTramiteVirtual = Mincetur.Administracion.AplTramiteVirtualPublico.EnTramiteVirtualPublico;
using Mincetur.Administracion.AplGestionDoc.WebGestionDoc.App_Code;
using System.Configuration;
using Newtonsoft.Json;
//using Mincetur.Administracion.AplTramiteVirtualPublico.Utilitarios.soap.ServicioGeneralUtil.Estorg;




namespace Mincetur.Administracion.AplGestionDoc.WebGestionDoc.ControllersApi
{
    public class GestionController : ApiController
    {
        //
        // GET: /Gestion/
        #region Consultas
        public List<enPriori> traeListaPriori(enPriori objEn)
        {

            List<enPriori> lst = new List<enPriori>();

            using (nePriori objNe = new nePriori())
            {

                lst = objNe.traeListaPriori(objEn);
            }

            return lst;
        }

        public List<enTrata> traeListaTrata(enTrata objEn)
        {

            List<enTrata> lst = new List<enTrata>();

            using (neTrata objNe = new neTrata())
            {

                lst = objNe.traeListaTrata(objEn);
            }

            return lst;
        }

        public List<enEstorgModel> listOficinas(enEstorgModel objEnEstorg)
        {
            if (objEnEstorg == null) objEnEstorg = new enEstorgModel();
            if (string.IsNullOrEmpty(objEnEstorg.OPR)) objEnEstorg.OPR = "5";
            List<enEstorgModel> lst = new List<enEstorgModel>();
            lst = Util.listOficinas(new Mincetur.Administracion.AplTramiteVirtualPublico.Utilitarios.soap.ServicioGeneralUtil.Estorg.enEstorg()
            {
                DES_SUBOFI = objEnEstorg.DES_SUBOFI,
                OPR = objEnEstorg.OPR
            }).Select(x => new enEstorgModel()
            {
                ABR_SUBOFI = x.ABR_SUBOFI,
                DES_SUBOFI = x.DES_SUBOFI,
                ID_SUB = x.ID_SUB,
                ID_SUBOFI = x.ID_SUBOFI
            }).ToList();
            return lst;
        }

        public List<enEstorg> ListarOficinaReglas(enEstorg objEn)
        {
            
            using (neDerivar objNe = new neDerivar())
            {
                return objNe.ListarOficinaReglas(objEn);
            }
        }
               

        public enMoviPublico.enMovi consultarExpediente(enMoviPublico.enMovi enObj)
        {
            enMoviPublico.enMovi objEnMoviPivot = new enMoviPublico.enMovi();

            using (neMoviPublico.neMovi objNe = new neMoviPublico.neMovi())
            {
                objEnMoviPivot = objNe.consultarExpediente(enObj);
            }
            return objEnMoviPivot;
        }

        public List<AccionRolModel> listAccionRol(AccionRolModel enObj)
        {
            string strRutaArchivo = string.Empty;
            string strSerializado = string.Empty;
            List<AccionRolModel> lstModel = new List<AccionRolModel>();
            string strUrl = ConfigurationManager.AppSettings["rutaArchivoAccionRol"];
            strRutaArchivo = System.IO.Path.Combine(HttpRuntime.AppDomainAppPath, strUrl.Replace("/", @"\\"));

            if (!string.IsNullOrEmpty(strUrl))
            {
                if (System.IO.File.Exists(strRutaArchivo))
                {
                    try
                    {
                        strSerializado = HttpUtility.UrlDecode(System.IO.File.ReadAllText(strRutaArchivo));
                        lstModel = JsonConvert.DeserializeObject<List<AccionRolModel>>(strSerializado);
                    }
                    catch (Exception ex)
                    {
                        lstModel.Add(new AccionRolModel() { DES_ERROR = ex.ToString() });
                    }
                }
                else
                {
                    lstModel.Add(new AccionRolModel() { DES_ERROR = "Verificar archico Accion rol cargado" });
                }
            }
            return lstModel;
        }

        public List<enDocLf> listarDocumento(enDocLf objEn)
        {

            List<enDocLf> lst = new List<enDocLf>();

            using (neMoviPublico.neDocLf objNe = new neMoviPublico.neDocLf())
            {

                lst = objNe.listar(objEn);
            }

            return lst;
        }
        public coResultadoDB verificarEstadoExpe(enTramiteVirtual.enDocElec objEnDocElec)
        {
            //VERIFICA EL ESTADO DEL EXPEDIENTE
            coResultadoDB objCoResultadoDB = new coResultadoDB() { ID_TIPO = 0, DES_ERROR = "" };
            bool indicador = new Validaciones().verificaEstadoExpe(objEnDocElec.ID_EXPE, objEnDocElec.ID_MOVI, (objEnDocElec.enAccion == null ? 4 : (int)objEnDocElec.enAccion.ID_ACCION));
            if (indicador)
            {
                objCoResultadoDB.ID_TIPO = 0;
                objCoResultadoDB.DES_ERROR = "";
            }
            else
            {
                objCoResultadoDB.ID_TIPO = 1;
                objCoResultadoDB.DES_ERROR = "El estado del expediente ha cambiado.";
            }
            return objCoResultadoDB;
        }
        #endregion
        
    }
}
