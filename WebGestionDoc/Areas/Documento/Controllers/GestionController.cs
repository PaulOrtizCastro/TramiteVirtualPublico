using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

using enMoviPublico = Mincetur.Administracion.AplTramiteVirtualPublico.EnTramiteVirtualPublico;
using neMoviPublico = Mincetur.Administracion.AplTramiteVirtualPublico.NeTramiteVirtualPublico;

using Mincetur.Administracion.AplGestionDoc.WebGestionDoc.Areas.Documento.Models;
using Mincetur.Administracion.AplTramiteVirtualPublico.EnTramiteVirtualPublico;
using Mincetur.Administracion.AplTramiteVirtualPublico.NeTramiteVirtualPublico;
using enGeneralesUtil = Mincetur.Administracion.GeneralesUtil.EnGeneralesUtil;
using System.Configuration;
using Mincetur.Administracion.AplTramiteVirtualPublico.Utilitarios;
using Mincetur.Administracion.Seguridad.CoSeguridad;
using Mincetur.Administracion.Seguridad.EnSeguridad;
using Mincetur.Administracion.Seguridad.NeSeguridad;
using coResultadoTramiteVirtualPublico = Mincetur.Administracion.AplTramiteVirtualPublico.CoTramiteVirtualPublico;
using Mincetur.Administracion.AplGestionDoc.WebGestionDoc.Models;
using Newtonsoft.Json;
using Mincetur.Administracion.AplTramiteVirtualPublico.Utilitarios.soap.ServicioUsuSisRolEntEstorg;



namespace Mincetur.Administracion.AplGestionDoc.WebGestionDoc.Areas.Documento.Controllers
{
    public class GestionController : Controller
    {
        //
        // GET: /Documento/Gestion/

        public ActionResult consDoc(string idParametro, string strBandeja)
        {
            int idExpe = 0;
            int idMovi = 0;//en mensaje que diga secuencia
            int idPersona = 0;
            string strResponsable = "";
            //string strCallBackTramiteGestionDocumento = Request.QueryString["strCallBackTramiteGestionDocumento"];
            coResultadoTramiteVirtualPublico.coResultadoDB objCoResultado = new coResultadoTramiteVirtualPublico.coResultadoDB() { ID_TIPO = 2, DES_ERROR = "Acceso no autorizado" };
            


            if (!string.IsNullOrWhiteSpace(idParametro))
            {

                //neEncryptDecrypt objNeDecrypt = new neEncryptDecrypt();
                //valor = objNeDecrypt.decrypt(idParametro);
                //enParametro parametroEO = Newtonsoft.Json.JsonConvert.DeserializeObject<enParametro>(valor);

                //idExpe = parametroEO.ID_EXPE;
                //idMovi = parametroEO.ID_MOVI;
                //idPersona = parametroEO.ID_PERSONA;

                enParametro parametroEO = new enParametro();
                //idParametro = "E200EF392B65C4B93E6D728D7BFD6B875CAB85800A257934F502217E4B1B7179";
                if (obtenerValoresUrlEncriptadaGestionExpediente(idParametro, out parametroEO))
                //if (true)
                {
                    //idExpe = 1024554;
                    //idMovi = 3;
                    //idPersona = 3530;
                    idExpe = parametroEO.ID_EXPE;
                    idMovi = parametroEO.ID_MOVI;
                    idPersona = parametroEO.ID_PERSONA;

                    using (nePersona objNePersona = new nePersona())
                    {
                        objCoResultado = objNePersona.validarUsuario(new enPersona()
                        {
                            ID_USU = idPersona,
                            ID_SIS = int.Parse(ConfigurationManager.AppSettings["IdSis"].ToString()),
                            OPR = "1"
                        });
                    }
                    //Si el usuario tiene el estado inactivo
                    if (objCoResultado.ID_TIPO != 0) {
                        return PartialView("mensaje");
                    }

                    List<enPersona> lstPersona = new List<enPersona>();
                    enMoviPublico.enMovi objEnMoviPivot = new enMoviPublico.enMovi();

                    using (neAcceso objNeAcceso = new neAcceso())
                    {
                        enAcceso objEnAcceso = new enAcceso();
                        objEnAcceso.ID_PERSONA = idPersona;
                        objEnAcceso.ID_TIPOACCESO = 3;
                        objEnAcceso.ID_SIS = int.Parse(ConfigurationManager.AppSettings["IdSis"].ToString());
                        objEnAcceso.IP_ACCESO = System.Web.HttpContext.Current.Request.UserHostAddress;
                        objEnAcceso.COD_FUENTE = "W";
                        objEnAcceso.DES_OBS = "idExp :" + idExpe + ", idMovi :" + idMovi + ", idPersona:" + idPersona;
                        objNeAcceso.insertarAsp(objEnAcceso, "I");
                    }

                    using (neMoviPublico.neMovi objNe = new neMoviPublico.neMovi())
                    {
                        objEnMoviPivot = objNe.consultarExpediente(new enMoviPublico.enMovi()
                        {
                            ID_EXPE = idExpe,
                            ID_MOVI = idMovi
                        });
                    }

                    using (neResponsable objNeResponsable = new neResponsable())
                    {
                        if (objEnMoviPivot.enEstorgRemite != null) {
                            //strResponsable = objNeResponsable.TraeResponsable(new enDocElecExpe() { ID_PERSONA = idPersona, ID_SUB = objEnMoviPivot.enEstorgRemite.ID_SUB, ID_SUBOFI = objEnMoviPivot.enEstorgRemite.ID_SUBOFI });                        
                            strResponsable = "1";
                        }                        
                        
                    }

                    enMoviModel objEnMoviModel = new enMoviModel();
                    enGeneralesUtil.enEstorg objEnEstorg = new enGeneralesUtil.enEstorg();
                    enGeneralesUtil.enEstorg objEnEstorgRemite = new enGeneralesUtil.enEstorg();

                    enTipDocModel objEnTipDoc = new enTipDocModel();
                    enDoc objEnDoc = new enDoc();
                    enEstado objEnEstado = new enEstado();
                    enPersona objEnPersona = new enPersona();

                    if (objEnMoviPivot.enEstorgRemite != null) {
                        objEnEstorgRemite.ID_SUB = objEnMoviPivot.enEstorgRemite.ID_SUB;
                        objEnEstorgRemite.ID_SUBOFI = objEnMoviPivot.enEstorgRemite.ID_SUBOFI;
                        objEnEstorgRemite.ABR_SUBOFI = objEnMoviPivot.enEstorgRemite.ABR_SUBOFI;
                        objEnMoviModel.enEstorgRemite = objEnEstorgRemite;
                    }

                    if (objEnMoviPivot.ID_EXPE > 0)
                    {
                        objEnMoviModel.ID_EXPE = objEnMoviPivot.ID_EXPE;
                        objEnMoviModel.ID_MOVI = idMovi;
                        objEnMoviModel.DES_ASUNTO = objEnMoviPivot.DES_ASUNTO;
                        objEnMoviModel.DES_OBS = objEnMoviPivot.enTupaConcepto.DES_OBS;
                        objEnMoviModel.FEC_EXPE = objEnMoviPivot.FEC_EXPE;

                        objEnTipDoc.ID_TIP_DOC = objEnMoviPivot.ID_TIP_DOC;
                        objEnMoviModel.enTipDoc = objEnTipDoc;

                        objEnPersona.ID_PERSONA = idPersona;
                        objEnMoviModel.enPersona = objEnPersona;

                        objEnDoc.ID_DOC = objEnMoviPivot.enDoc.ID_DOC;
                        objEnDoc.DES_DOC = objEnMoviPivot.enDoc.DES_DOC;
                        objEnDoc.NUM_DOC = objEnMoviPivot.enDoc.NUM_DOC;

                        objEnDoc.DES_OBS = (objEnMoviPivot.enDoc.DES_OBS == null ? "--" : objEnMoviPivot.enDoc.DES_OBS);
                        objEnDoc.DES_DOC_COMPLETO = (objEnMoviPivot.enDoc.DES_DOC_COMPLETO == null ? "--" : objEnMoviPivot.enDoc.DES_DOC_COMPLETO);
                        objEnMoviModel.enDoc = objEnDoc;
                        //objEnMoviModel.DES_COMENT = objEnMoviPivot.DES_COMENT;
                        objEnEstado.ID_ESTADO = objEnMoviPivot.enEstado.ID_ESTADO;
                        objEnMoviModel.enEstado = objEnEstado;
                    }
                    else
                    {
                        objEnMoviModel.ID_EXPE = 0;
                        objEnMoviModel.ID_MOVI = 0;
                        objEnMoviModel.DES_ASUNTO = "";
                        objEnMoviModel.DES_OBS = "";

                        objEnMoviModel.enEstorgRemite = objEnEstorg;

                        objEnTipDoc.ID_TIP_DOC = 0;
                        objEnMoviModel.enTipDoc = objEnTipDoc;

                        objEnPersona.ID_PERSONA = idPersona;
                        objEnMoviModel.enPersona = objEnPersona;

                        objEnDoc.ID_DOC = 0;
                        objEnDoc.DES_DOC = "";
                        objEnDoc.NUM_DOC = "";

                        objEnMoviModel.enDoc = objEnDoc;
                        objEnEstado.ID_ESTADO = 9;
                        objEnMoviModel.enEstado = objEnEstado;
                    }

                    if (objEnMoviModel.ID_EXPE > 0 && objEnMoviModel.enPersona.ID_PERSONA > 0)
                    {
                        objEnMoviModel.DES_URL_EXPE = ConfigurationManager.AppSettings["urlVistaExpediente"].ToString() + Util.encriptarAES(objEnMoviModel.ID_EXPE.ToString()) + "&tipo=I&Cod=" + Util.encriptarAES(objEnMoviModel.enPersona.ID_PERSONA.ToString());
                    }
                    else
                    {
                        objEnMoviModel.DES_URL_EXPE = "";
                    }
                    //objEnMoviModel.DES_URL_GESTION = ConfigurationManager.AppSettings["strDocuDigital"] + "?cod=" + Url.Encode(Util.encriptarAES(idPersona.ToString())) + "&CodOfi=" + objEnMoviModel.enEstorgRemite.ID_SUB + "|" + objEnMoviModel.enEstorgRemite.ID_SUBOFI + "&CodBandeja=N&IdTipDoc=&IdExpe=" + objEnMoviModel.ID_EXPE + "&IdMovi=" + objEnMoviModel.ID_MOVI + "&strCallback=strCallbackDocDigital&strCallbackTramite=strCallbackGestionTramite";
                    //objEnMoviModel.DES_URL_GESTION = strCallBackTramiteGestionDocumento;
                    
                    objEnMoviModel.ID_RESPONSABLE = strResponsable;
                    //objEnMoviModel.ID_RESPONSABLE = "1";
                    objEnMoviModel.OPR_BANDEJA = strBandeja;

                    if (objEnMoviModel.enDoc != null && objEnMoviModel.enDoc.ID_DOC > 0) {
                        string idDocEncrypt =  Util.encriptarAES(objEnMoviModel.enDoc.ID_DOC.ToString());
                        objEnMoviModel.UrlVisor = ConfigurationManager.AppSettings["urlVisorDocumentoDigital"] + idDocEncrypt + "&Cod=" + Util.encriptarAES(idPersona.ToString()) + "&po=" + ConfigurationManager.AppSettings["visorDocumentoDigital"];
                    }

                    ResultadoUsuSisRolEstorg objResultadoUsuSisRolEstorg = new WCFSeguridadUsuSisRolEntEstorg().listarUsuSisRolEntEstorg(new DatosUsuSisRolEstorg()
                    {
                        //IdUsu = 3530,
                        IdUsu = idPersona,
                        //IdUsu = Util.TraeIdUsuAuth(),
                        IdSis = int.Parse(ConfigurationManager.AppSettings["IdSisTramite"]),
                        IdSub = objEnEstorgRemite.ID_SUB,
                        IdSubOfi = objEnEstorgRemite.ID_SUBOFI,
                        IdEnt = -1,
                        FlgEst = 1,
                        Opr = "3"
                    });
                    string strRoles = "";
                    if (objResultadoUsuSisRolEstorg.IdTipo == 0 && objResultadoUsuSisRolEstorg.lstUsuSisRolEntEstorg.Length > 0) {
                        strRoles = string.Join(",", objResultadoUsuSisRolEstorg.lstUsuSisRolEntEstorg.Select(x => x.IdRol));
                        objEnMoviModel.DES_ROLES = strRoles;
                    }

                    //return PartialView("consDoc", objEnMoviModel);
                    return View(objEnMoviModel);
                }
                else
                {
                    return PartialView("mensaje");
                }
            }
            else {
                return PartialView("mensaje");
            }                
        }
        

        public ActionResult derivarExpediente(int idExpe, int idMovi, int idDoc, int idTipDoc, int idSub, string idSubOfi, int idPersona, int idAccion)
        {
            ViewBag.ID_EXPE = idExpe;
            ViewBag.ID_MOVI = idMovi;
            ViewBag.ID_ACCION = idAccion;
            ViewBag.ID_DOC = idDoc;
            ViewBag.ID_TIP_DOC = idTipDoc;
            ViewBag.ID_SUB = idSub;
            ViewBag.ID_SUBOFI = idSubOfi;
            ViewBag.ID_PERSONA = idPersona;
            ViewBag.strCallBack = Request.QueryString["strCallBack"];
            

            return PartialView("derivarExpediente", ViewBag);
        }

        public ActionResult asignarExpediente(int idExpe, int idMovi, int idDoc, int idTipDoc, int idSub, string idSubOfi, int idPersona, int idAccion)
        {
            ViewBag.ID_EXPE = idExpe;
            ViewBag.ID_MOVI = idMovi;
            ViewBag.ID_ACCION = idAccion;
            ViewBag.ID_DOC = idDoc;
            ViewBag.ID_TIP_DOC = idTipDoc;
            ViewBag.ID_SUB = idSub;
            ViewBag.ID_SUBOFI = idSubOfi;
            ViewBag.ID_PERSONA = idPersona;
            ViewBag.strCallBack = Request.QueryString["strCallBack"];

            return PartialView("asignarExpediente", ViewBag);
        }

        public ActionResult archivarExpediente(int idExpe, int idMovi, int idDoc, int idTipDoc, int idSub, string idSubOfi, int idPersona, int idAccion)
        {
            ViewBag.ID_EXPE = idExpe;
            ViewBag.ID_MOVI = idMovi;
            ViewBag.ID_ACCION = idAccion;
            ViewBag.ID_DOC = idDoc;
            ViewBag.ID_TIP_DOC = idTipDoc;
            ViewBag.ID_SUB = idSub;
            ViewBag.ID_SUBOFI = idSubOfi;
            ViewBag.ID_PERSONA = idPersona;
            ViewBag.strCallBack = Request.QueryString["strCallBack"];

            return PartialView("archivarExpediente", ViewBag);
        }

        //public ActionResult consNuevoDoc(string idParametro, string strBandeja)
        //{
        //    return View();
        //}

        public bool obtenerValoresUrlEncriptadaGestionExpediente(string strUrlEncriptada, out enParametro objEnParametro)
        {
            objEnParametro = new enParametro();

            //if (string.IsNullOrEmpty(strUrlEncriptada))
            //{
            //    strUrlEncriptada = Util.encriptarAES(Newtonsoft.Json.JsonConvert.SerializeObject(new ParamGestionModel { ID_EXPE = 1233663, ID_MOVI = 2, ID_PERSONA = 197268 }));
            //}

            if (!string.IsNullOrEmpty(strUrlEncriptada))
            {
                string strUrlDesencriptada = "";

                if (ConfigurationManager.AppSettings["strFlagEncripta"] == "0" && !string.IsNullOrEmpty(ConfigurationManager.AppSettings["strFlagEncripta"].ToString()))
                {
                    int intIdExpe = 0;
                    int intIdMovi = 0;
                    int intIdPersona = 0;
                    using (neEncryptDecrypt objNe = new neEncryptDecrypt())
                    {
                        strUrlDesencriptada = objNe.decrypt(strUrlEncriptada);
                    }
                    if (!string.IsNullOrEmpty(strUrlDesencriptada))
                    {
                        string[] arrayValoresURL = strUrlDesencriptada.Split('&');
                        for (int i = 0; i < arrayValoresURL.Count(); i++)
                        {
                            string[] arrAttrValues = arrayValoresURL[i].Split('=');

                            switch (arrAttrValues[0])
                            {
                                case "IdExpe":
                                    int.TryParse(arrAttrValues[1], out intIdExpe);
                                    break;
                                case "IdMovi":
                                    int.TryParse(arrAttrValues[1], out intIdMovi);
                                    break;
                                case "IdPersona":
                                    int.TryParse(arrAttrValues[1], out intIdPersona);
                                    break;
                                default:
                                    break;
                            }

                        }
                        if (!string.IsNullOrEmpty(strUrlDesencriptada))
                        {
                            objEnParametro.ID_EXPE = intIdExpe;
                            objEnParametro.ID_MOVI = intIdMovi;
                            objEnParametro.ID_PERSONA = intIdPersona;
                        }
                    }
                }
                else {
                    strUrlDesencriptada = Util.desencriptarAES(strUrlEncriptada);
                    if (!string.IsNullOrEmpty(strUrlDesencriptada))
                    {
                        ParamGestionModel objEnParametroGestion = Newtonsoft.Json.JsonConvert.DeserializeObject<ParamGestionModel>(strUrlDesencriptada);
                        if (objEnParametroGestion != null) {

                            objEnParametro.ID_EXPE = objEnParametroGestion.ID_EXPE;
                            objEnParametro.ID_MOVI = objEnParametroGestion.ID_MOVI;
                            objEnParametro.ID_PERSONA = objEnParametroGestion.ID_PERSONA;
                        }
                    }
                }

                if (!string.IsNullOrEmpty(strUrlDesencriptada))
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            else
            {
                return false;
            }
        }
    }
}
