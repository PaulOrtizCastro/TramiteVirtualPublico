using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Configuration;
using CaptchaMvc.HtmlHelpers;
using CaptchaMvc.Interface;

using Mincetur.Administracion.Seguridad.EnSeguridad;
using Mincetur.Administracion.Seguridad.NeSeguridad;

using objEnTramite = Mincetur.Administracion.TramiteDocumentario.EnTramiteDocumentario;
//using objNeTramite = Mincetur.Administracion.TramiteDocumentario.NeTramiteDocumentario;
//using objCoTramite = Mincetur.Administracion.TramiteDocumentario.CoTramiteDocumentario;
//using Mincetur.Administracion.TramiteDocumentario.CoTramiteDocumentario.soap.ServicioArchivoLaserfiche;

using objCoGeneralesUtil = Mincetur.Administracion.GeneralesUtil.CoGeneralesUtil;
using objEnGeneralesUtil = Mincetur.Administracion.GeneralesUtil.EnGeneralesUtil;
using objNeGeneralesUtil = Mincetur.Administracion.GeneralesUtil.NeGeneralesUtil;

using Mincetur.Administracion.AplTramiteVirtualPublico.NeTramiteVirtualPublico;
using Mincetur.Administracion.AplTramiteVirtualPublico.EnTramiteVirtualPublico;
using Mincetur.Administracion.AplTramiteVirtualPublico.Utilitarios;

using System.IO;
using Mincetur.SG.OI.Publico.App_Code;
//using Mincetur.SG.OI.LogicaNegocio;
using Mincetur.Administracion.GeneralesUtil.EnGeneralesUtil;
//using Mincetur.SG.OI.Entidades;
using WCFConsDocCms = Mincetur.Administracion.AplTramiteVirtualPublico.Utilitarios.servicioGenerales.DocCmsConsulta;
using Mincetur.Administracion.AplTramiteVirtualPublico.Utilitarios.servicioGenerales.DocCmsConsulta;
using Mincetur.Administracion.AplTramiteVirtualPublico.Utilitarios.soap.ServicioArchivoLaserfiche;
using Mincetur.Administracion.AplTramiteVirtualPublico.CoTramiteVirtualPublico;
using coResultadoTramiteVirtualPublico = Mincetur.Administracion.AplTramiteVirtualPublico.CoTramiteVirtualPublico;
using Mincetur.SG.OI.Publico.Areas.Publico.Models;
using Newtonsoft.Json;

namespace Mincetur.SG.OI.Publico.Areas.Publico.Controllers
{
    public class VentanillaController : Controller
    {
        //
        // GET: /Publico/Ventanilla/
        

        #region Consulta simple ventanilla
        public ActionResult Index()
        {
            string strCod = Request.QueryString[ConfigurationManager.AppSettings["nombreParamtro"]];
            string strCodUsu = Request.QueryString[ConfigurationManager.AppSettings["codParamtro"]];
            string strTipo = Request.QueryString[ConfigurationManager.AppSettings["tipoParamtro"]];
            string url = System.Web.HttpContext.Current.Request.Url.AbsoluteUri;

            if (!string.IsNullOrEmpty(strCod))
            {
                int intIdExp = 0;
                int intIdMovi = 0;
                int intIdUsu = 0;
                string strCodTicketDesencriptado = Util.desencriptarAES(strCod).Trim();
                if (strCodTicketDesencriptado.Contains("|"))
                {
                    string[] pivotStrCodTicketDesencriptado = strCodTicketDesencriptado.Split('|');
                    int.TryParse(pivotStrCodTicketDesencriptado[0], out intIdExp);
                    int.TryParse(pivotStrCodTicketDesencriptado[1], out intIdMovi);
                }
                else
                {
                    int.TryParse(strCodTicketDesencriptado, out intIdExp);
                }
                if (intIdExp != 0)
                {
                    //**seguridad**//
                    enAcceso objEnAcceso = new enAcceso();
                    neAcceso objNeAcceso = new neAcceso();

                    if (!string.IsNullOrEmpty(strCodUsu))
                    {
                        int.TryParse(Util.desencriptarAES(strCodUsu).Trim(), out intIdUsu);
                        objEnAcceso.ID_PERSONA = intIdUsu;
                    }
                    objEnAcceso.ID_TIPOACCESO = 3;
                    objEnAcceso.ID_SIS = int.Parse(ConfigurationManager.AppSettings["codigoSistema"].ToString());
                    objEnAcceso.IP_ACCESO = System.Web.HttpContext.Current.Request.UserHostAddress;
                    objEnAcceso.COD_FUENTE = (string.IsNullOrEmpty(strTipo) ? "W" : strTipo);
                    objEnAcceso.DES_OBS = "idExp :" + intIdExp + ", Origen :" + url + ", intIdMovi :" + intIdMovi;
                    objNeAcceso.insertarAsp(objEnAcceso, "I");

                    List<objEnTramite.enExpe> listObjEnExpe = new List<objEnTramite.enExpe>();
                    objEnTramite.enExpe objEnExpe = new objEnTramite.enExpe();
                    objEnExpe.ID_EXPE = intIdExp;

                    if (intIdUsu > 0)
                    {
                        objEnExpe.ID_PERSONA = intIdUsu;
                        objEnExpe.OPR = "2";
                    }

                    

                    if (!string.IsNullOrEmpty(strTipo) && strTipo == "VV")
                    {
                        objEnExpe.ID_PERSONA = -1;
                    }

                    using (neExpe objNeExpe = new neExpe()) {
                        listObjEnExpe = objNeExpe.traeListaExpe(objEnExpe);
                    }
                    

                    if (listObjEnExpe != null)
                    {
                        if (listObjEnExpe.Count > 0)
                        {
                            if (listObjEnExpe[0].enOrigen != null)
                            {
                                if (listObjEnExpe[0].enOrigen.ID_ORIGEN != 2)
                                {
                                    ViewBag.idExpe = intIdExp;
                                    ViewBag.FecVisto = DateTime.Now;
                                    return View();
                                    //return View("~/Ventanilla/ViewTest");
                                    //return Redirect(Request.ApplicationPath + "/Publico/Ventanilla/Partial1");
                                }
                                else
                                {
                                    objEnAcceso.ID_TIPOACCESO = 3;
                                    objEnAcceso.ID_SIS = int.Parse(ConfigurationManager.AppSettings["codigoSistema"].ToString());
                                    objEnAcceso.IP_ACCESO = System.Web.HttpContext.Current.Request.UserHostAddress;
                                    objEnAcceso.COD_FUENTE = (string.IsNullOrEmpty(strTipo) ? "W" : strTipo);
                                    objEnAcceso.DES_OBS = "idExp :" + intIdExp + ", Origen :" + url + ", intIdMovi :" + intIdMovi + ",***ACCESO DENEGADO***";
                                    objNeAcceso.insertarAsp(objEnAcceso, "I");
                                    return Redirect(Request.ApplicationPath + "/Publico/Ventanilla/_mensaje");
                                }
                            }
                            else
                            {
                                objEnAcceso.ID_TIPOACCESO = 3;
                                objEnAcceso.ID_SIS = int.Parse(ConfigurationManager.AppSettings["codigoSistema"].ToString());
                                objEnAcceso.IP_ACCESO = System.Web.HttpContext.Current.Request.UserHostAddress;
                                objEnAcceso.COD_FUENTE = (string.IsNullOrEmpty(strTipo) ? "W" : strTipo);
                                objEnAcceso.DES_OBS = "idExp :" + intIdExp + ", Origen :" + url + ", intIdMovi :" + intIdMovi + ",***ACCESO DENEGADO***";
                                objNeAcceso.insertarAsp(objEnAcceso, "I");
                                return Redirect(Request.ApplicationPath + "/Publico/Ventanilla/_mensaje");
                            }
                        }
                        else
                        {
                            objEnAcceso.ID_TIPOACCESO = 3;
                            objEnAcceso.ID_SIS = int.Parse(ConfigurationManager.AppSettings["codigoSistema"].ToString());
                            objEnAcceso.IP_ACCESO = System.Web.HttpContext.Current.Request.UserHostAddress;
                            objEnAcceso.COD_FUENTE = (string.IsNullOrEmpty(strTipo) ? "W" : strTipo);
                            objEnAcceso.DES_OBS = "idExp :" + intIdExp + ", Origen :" + url + ", intIdMovi :" + intIdMovi + ",***ACCESO DENEGADO***";
                            objNeAcceso.insertarAsp(objEnAcceso, "I");
                            return Redirect(Request.ApplicationPath + "/Publico/Ventanilla/_mensaje");
                        }
                    }
                    else
                    {
                        objEnAcceso.ID_TIPOACCESO = 3;
                        objEnAcceso.ID_SIS = int.Parse(ConfigurationManager.AppSettings["codigoSistema"].ToString());
                        objEnAcceso.IP_ACCESO = System.Web.HttpContext.Current.Request.UserHostAddress;
                        objEnAcceso.COD_FUENTE = (string.IsNullOrEmpty(strTipo) ? "W" : strTipo);
                        objEnAcceso.DES_OBS = "idExp :" + intIdExp + ", Origen :" + url + ", intIdMovi :" + intIdMovi + ",***ACCESO DENEGADO***";
                        objNeAcceso.insertarAsp(objEnAcceso, "I");
                        return Redirect(Request.ApplicationPath + "/Publico/Ventanilla/_mensaje");
                    }
                }
            }
            else
            {
                return new EmptyResult();
            }
            return new EmptyResult();
        }
        #endregion


        #region Consulta con trazabilidad
        public ActionResult IndexConsultaExpeGrilla()
        {
            enAcceso objEnAcceso = new enAcceso();
            neAcceso objNeAcceso = new neAcceso();
            List<enAsignar> lstAsignaciones = new List<enAsignar>();
            coResultadoTramiteVirtualPublico.coResultadoDB objCoResultado = new coResultadoTramiteVirtualPublico.coResultadoDB() { ID_TIPO = 2, DES_ERROR = "Acceso no autorizado" };

            string strCod = "";
            string strCodUsu = "";
            string strTipo = "";
            int intIdExp = 0;
            int intIdMovi = 0;
            int intIdUsu = 0;
            int intFlgJefe = -1;
            //int intDoc = 0;

            string url = System.Web.HttpContext.Current.Request.Url.AbsoluteUri;

            if (Request.QueryString[ConfigurationManager.AppSettings["nombreParamtro"]] != null)
            {
                 strCod = Request.QueryString[ConfigurationManager.AppSettings["nombreParamtro"]];
            }
            if (Request.QueryString[ConfigurationManager.AppSettings["codParamtro"]] != null)
            {
                strCodUsu = Request.QueryString[ConfigurationManager.AppSettings["codParamtro"]];
            }
            if (Request.QueryString[ConfigurationManager.AppSettings["tipoParamtro"]] != null)
            {
                strTipo = Request.QueryString[ConfigurationManager.AppSettings["tipoParamtro"]];
            }
            
            
            HttpCookie cookPrincipal = Request.Cookies["UsuarioConsultaExpeGrilla"];

            if (!string.IsNullOrEmpty(strCod) || !string.IsNullOrWhiteSpace(strCod))
            {
                string strCodTicketDesencriptado = Util.desencriptarAES(strCod).Trim();

                if (strCodTicketDesencriptado.Contains("|"))
                {
                    string[] pivotStrCodTicketDesencriptado = strCodTicketDesencriptado.Split('|');
                    int.TryParse(pivotStrCodTicketDesencriptado[0], out intIdExp);
                    int.TryParse(pivotStrCodTicketDesencriptado[1], out intIdMovi);
                }
                else
                {
                    int.TryParse(strCodTicketDesencriptado, out intIdExp);
                }

                if (!string.IsNullOrEmpty(strCodUsu))
                {
                    int.TryParse(Util.desencriptarAES(strCodUsu).Trim(), out intIdUsu);
                    objEnAcceso.ID_PERSONA = intIdUsu;

                    using (nePersona objNePersona = new nePersona())
                    {
                        objCoResultado = objNePersona.validarUsuario(new enPersona()
                        {
                            ID_USU = intIdUsu,
                            ID_SIS = int.Parse(ConfigurationManager.AppSettings["codigoSistema"].ToString()),
                            OPR = "1"
                        });
                    }

                    //Si el usuario tiene el estado inicativo
                    if (objCoResultado.ID_TIPO != 0)
                    {
                        ViewBag.DES_MENSAJE = objCoResultado.DES_ERROR;
                        return Redirect(Request.ApplicationPath + "/Publico/Ventanilla/mensaje");
                    }
                    else
                    {
                        intFlgJefe = 1;
                    }
                }

                if (!intIdExp.Equals(0))
                {
                    objEnAcceso.ID_TIPOACCESO = 3;
                    objEnAcceso.ID_SIS = int.Parse(ConfigurationManager.AppSettings["codigoSistema"].ToString());
                    objEnAcceso.IP_ACCESO = System.Web.HttpContext.Current.Request.UserHostAddress;
                    objEnAcceso.COD_FUENTE = (string.IsNullOrEmpty(strTipo) ? "W" : strTipo);
                    objEnAcceso.DES_OBS = "idExp :" + intIdExp.ToString() + ", Origen :" + url + ", idMovi:" + intIdMovi + ", idPersona:" + intIdUsu;
                    objNeAcceso.insertarAsp(objEnAcceso, "I");

                    string strIdRol = neSeguridad.TraeRolesUsuario(Convert.ToInt32(intIdUsu), int.Parse(ConfigurationManager.AppSettings["idCodSisTramite"].ToString()));


                    int idSub = 0;
                    string strIdSubOfi = "";

                    if (intIdMovi == 0)
                    {
                        using (nePersona objNePersona = new nePersona())
                        {
                            List<enPersona> lstPersona = objNePersona.traeListaPersona(new enPersona()
                            {
                                ID_PERSONA = Convert.ToInt32(intIdUsu),
                                OPR = "1"
                            });

                            if (lstPersona.Count > 0)
                            {
                                idSub = lstPersona[0].ID_SUB;
                                strIdSubOfi = lstPersona[0].ID_SUBOFI;
                            }
                        }
                    }
                    else
                    {
                        using (neMovi objNeMovi = new neMovi())
                        {
                            List<enMovi> lstMovi = objNeMovi.ListarExpeMovi(new enMovi()
                            {
                                ID_MOVI = intIdMovi,
                                ID_EXPE = intIdExp,
                                OPR = "1"
                            });
                    
                            if (lstMovi.Count > 0)
                            {
                                idSub = lstMovi[0].enEstorg.ID_SUB;
                                strIdSubOfi = lstMovi[0].enEstorg.ID_SUBOFI;
                            }
                        }
                    }

                    using (neAsignar objNeAsigna = new neAsignar())
                    {
                        lstAsignaciones = objNeAsigna.consultarListaFuncionariosAsignados(new enAsignar()
                        {
                            enExpe = new enExpe() { ID_EXPE = intIdExp },
                            enUsu = new enUsu()
                            {
                                CodUsu = intIdUsu
                            },
                            enEstorg = new enEstorg()
                            {
                                ID_SUB = idSub,
                                ID_SUBOFI = strIdSubOfi
                            }
                        });
                    };


                    if (strTipo == "VV")
                    {
                        if (cookPrincipal == null) cookPrincipal = new HttpCookie("UsuarioConsultaExpeGrilla");
                        Util.responseConsultaExpeGrillaCookie(cookPrincipal, intIdUsu, intIdExp, intIdMovi, strTipo);
                        return RedirectToAction("Index", "ConsultaExpeGrilla", new { Area = "Publico", po = Request.QueryString["po"], doc = Request.QueryString["doc"] });
                    }
                    else if (string.IsNullOrEmpty(strIdRol) && lstAsignaciones.Count == 0)
                    {
                        return Redirect(Request.ApplicationPath + "/Publico/Ventanilla/mensaje");
                    }
                    else if (!string.IsNullOrEmpty(strIdRol))
                    {

                        string[] arrRolesMaster = strIdRol.Split(',');
                        string rolAdministrador = ConfigurationManager.AppSettings["idRolAdministrador"].ToString();
                        string rolDirectorGeneral = ConfigurationManager.AppSettings["idRolDirectorGeneral"].ToString();
                        string rolDirector = ConfigurationManager.AppSettings["idRolDirector"].ToString();

                        string rolAsistente = ConfigurationManager.AppSettings["idRolAsistente"].ToString();
                        string rolEspecialista = ConfigurationManager.AppSettings["idRolAsignacion"].ToString();
                        string rolSeguimiento = ConfigurationManager.AppSettings["idRolSeguimiento"].ToString();


                        string strPo = Request.QueryString["po"];
                        string strDoc = Request.QueryString["doc"];

                        if (objCoResultado.ID_TIPO == 0 && intFlgJefe == 1 && !buscarRol(arrRolesMaster, rolDirector))
                        {
                            Array.Resize(ref arrRolesMaster, arrRolesMaster.Length + 1);
                            arrRolesMaster[arrRolesMaster.Length - 1] = rolDirector;
                        }

                        if (buscarRol(arrRolesMaster, rolAdministrador))
                        {
                            if (cookPrincipal == null) cookPrincipal = new HttpCookie("UsuarioConsultaExpeGrilla");
                            Util.responseConsultaExpeGrillaCookie(cookPrincipal, intIdUsu, intIdExp, intIdMovi, strTipo);
                            return RedirectToAction("Index", "ConsultaExpeGrilla", new { Area = "Publico", po = Request.QueryString["po"], doc = Request.QueryString["doc"] });
                        }
                        else if (buscarRol(arrRolesMaster, rolEspecialista) || buscarRol(arrRolesMaster, rolDirector))
                        {

                            if (lstAsignaciones.Count == 0 && !buscarRol(arrRolesMaster, rolAdministrador) && !buscarRol(arrRolesMaster, rolSeguimiento) && !buscarRol(arrRolesMaster, rolDirectorGeneral) && !buscarRol(arrRolesMaster, rolAsistente) && !buscarRol(arrRolesMaster, rolDirector))
                            {
                                return Redirect(Request.ApplicationPath + "/Publico/Ventanilla/mensaje");
                            }
                            else
                            {
                                if (cookPrincipal == null) cookPrincipal = new HttpCookie("UsuarioConsultaExpeGrilla");
                                Util.responseConsultaExpeGrillaCookie(cookPrincipal, intIdUsu, intIdExp, intIdMovi, strTipo);
                                return RedirectToAction("Index", "ConsultaExpeGrilla", new { Area = "Publico", po = Request.QueryString["po"], doc = Request.QueryString["doc"] });
                            }
                        }
                        else if (buscarRol(arrRolesMaster, rolSeguimiento))
                        {

                            if (buscarUsuarioEnOficina(new enMovi() { ID_EXPE = intIdExp, ID_SUB = idSub, ID_SUBOFI = strIdSubOfi }))
                            {
                                if (cookPrincipal == null) cookPrincipal = new HttpCookie("UsuarioConsultaExpeGrilla");
                                Util.responseConsultaExpeGrillaCookie(cookPrincipal, intIdUsu, intIdExp, intIdMovi, strTipo);
                                return RedirectToAction("Index", "ConsultaExpeGrilla", new { Area = "Publico", po = Request.QueryString["po"], doc = Request.QueryString["doc"] });
                            }
                            else
                            {
                                return Redirect(Request.ApplicationPath + "/Publico/Ventanilla/mensaje");
                            }
                        }
                        else
                        {
                            if (cookPrincipal == null) cookPrincipal = new HttpCookie("UsuarioConsultaExpeGrilla");
                            Util.responseConsultaExpeGrillaCookie(cookPrincipal, intIdUsu, intIdExp, intIdMovi, strTipo);
                            return RedirectToAction("Index", "ConsultaExpeGrilla", new { Area = "Publico", po = Request.QueryString["po"], doc = Request.QueryString["doc"] });
                        }
                    }
                    else
                    {
                        objEnAcceso.ID_TIPOACCESO = 3;
                        objEnAcceso.ID_SIS = int.Parse(ConfigurationManager.AppSettings["codigoSistema"].ToString());
                        objEnAcceso.IP_ACCESO = System.Web.HttpContext.Current.Request.UserHostAddress;
                        objEnAcceso.COD_FUENTE = (string.IsNullOrEmpty(strTipo) ? "W" : strTipo);
                        objEnAcceso.DES_OBS = "idExp: " + intIdExp + ", Origen: " + url + ", intIdMovi: " + intIdMovi + "," + "strIdRol: " + strIdRol + "***ACCESO DENEGADO***";
                        objNeAcceso.insertarAsp(objEnAcceso, "I");
                        //return Redirect(Request.ApplicationPath + "/Publico/Ventanilla/mensaje");
                        if (cookPrincipal == null) cookPrincipal = new HttpCookie("UsuarioConsultaExpeGrilla");
                        Util.responseConsultaExpeGrillaCookie(cookPrincipal, intIdUsu, intIdExp, intIdMovi, strTipo);
                        return RedirectToAction("Index", "ConsultaExpeGrilla", new { Area = "Publico", po = Request.QueryString["po"], doc = Request.QueryString["doc"] });
                    }
                }
                else
                {
                    objEnAcceso.ID_TIPOACCESO = 3;
                    objEnAcceso.ID_SIS = int.Parse(ConfigurationManager.AppSettings["codigoSistema"].ToString());
                    objEnAcceso.IP_ACCESO = System.Web.HttpContext.Current.Request.UserHostAddress;
                    objEnAcceso.COD_FUENTE = (string.IsNullOrEmpty(strTipo) ? "W" : strTipo);
                    objEnAcceso.DES_OBS = "idExp :" + intIdExp + ", Origen :" + url + ", intIdMovi :" + intIdMovi + ",***ACCESO DENEGADO***";
                    objNeAcceso.insertarAsp(objEnAcceso, "I");
                    return Redirect(Request.ApplicationPath + "/Publico/Ventanilla/mensaje");
                }
            }
            else
            {
                objEnAcceso.ID_TIPOACCESO = 3;
                objEnAcceso.ID_SIS = int.Parse(ConfigurationManager.AppSettings["codigoSistema"].ToString());
                objEnAcceso.IP_ACCESO = System.Web.HttpContext.Current.Request.UserHostAddress;
                objEnAcceso.COD_FUENTE = (string.IsNullOrEmpty(strTipo) ? "W" : strTipo);
                objEnAcceso.DES_OBS = "idExp :" + intIdExp + ", Origen :" + url + ", intIdMovi :" + intIdMovi + ",***ACCESO DENEGADO***";
                objNeAcceso.insertarAsp(objEnAcceso, "I");
                return Redirect(Request.ApplicationPath + "/Publico/Ventanilla/mensaje");
            }
        }
        #endregion

        #region Captcha
        public ActionResult IndexConsultaExpe()//para el captcha
        {
            ViewBag.IdExpe = "-1";
            try
            {
                ExpeModel objExpeModel = new ExpeModel();
                string strTicket = Request.QueryString["ticket"];
                string json = Util.desencriptarAES(strTicket);
                objExpeModel = JsonConvert.DeserializeObject<ExpeModel>(json);
                
                if (objExpeModel != null)
                {
                    ViewBag.IdExpe = objExpeModel.IdExpe;
                }
                return View();
            }
            catch (Exception ex) {
                return View();
            }
        }
        [HttpPost]
        public JsonResult Captcha(string empty)
        {
            String captcha = string.Empty;
            captcha = Request.Form["CaptchaInputText"];

            if (this.IsCaptchaValid(""))
            {
                captcha = string.Empty;
            }
            else
            {
                captcha = "Código de Seguridad Incorrecto!!!";
            }
            var jsonResult = Json(captcha, JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }
        public ActionResult callCaptcha()
        {
            return PartialView("_PartialCaptcha");
        }
        #endregion
        #region Vistas de error
        public ActionResult _mensajeBase()
        {
            return View();
        }
        public ActionResult _mensaje()
        {
            return View();
        }
        public ActionResult mensaje()
        {
            return View();
        }
        public ActionResult _mensajeMemo()
        {
            return View();
        } 
        public ActionResult _VisorMensaje()
        {
            return View();
        }
        public ActionResult mensajeGeneral(string strMensaje)
        {
            //switch (idMensaje) { 
            //    case 1: //Si el origen es interno
            //        ViewBag.DES_MENSAJE = "El expediente de consulta no es de origen externo.";
            //        break;
            //    case 2://La entidad origen es vacia
            //        ViewBag.DES_MENSAJE = "Por favor verificar el origen del expediente.";
            //        break;
            //    default:
            //        ViewBag.DES_MENSAJE = "Usted no tiene permisos para consultar el expediente.";
            //        break;
            //}
            ViewBag.DES_MENSAJE = strMensaje;
            return View(ViewBag);
        }
        #endregion

        #region Consultas
        public ActionResult consultaPublicaVentanilla(objEnTramite.enExpe objEnExpe)
        {
            string strTipo = Request.QueryString[ConfigurationManager.AppSettings["tipoParamtro"]];
            string strTicket = Request.QueryString[ConfigurationManager.AppSettings["nombreParamtro"]];
            string url = System.Web.HttpContext.Current.Request.Url.AbsoluteUri;
            //**seguridad**//
            enAcceso objEnAcceso = new enAcceso();
            neAcceso objNeAcceso = new neAcceso();
            int intIdExp = 0;

            if (objEnExpe == null)
            {
                objEnExpe = new objEnTramite.enExpe();
            }

            if (objEnExpe.DATO == "CE")
            {
                //neExpe objNeExpe = new neExpe();
                objEnTramite.enExpe enObjRespExpe = new objEnTramite.enExpe();
                enExpe objEnExpeVirtual = new enExpe();
                //enObjRespExpe = (objEnTramite.enExpe) objNeExpe.consultar(objEnExpe.TICKET);
                intIdExp = Convert.ToInt32(objEnExpe.TICKET);

                
                using (neExpe objNeExpe = new neExpe()) {
                    //enObjRespExpe = objNeExpe.traeListaExpe(new objEnTramite.enExpe() { ID_EXPE = (objEnExpe.ID_EXPE == -1 ? intIdExp : objEnExpe.ID_EXPE) })[0];
                    objEnExpeVirtual = objNeExpe.traeListaExpedientePublico(new enExpe()
                    {
                        ID_EXPE = (objEnExpe.ID_EXPE == -1 ? intIdExp : objEnExpe.ID_EXPE),
                        OPR = "1"
                    });
                }

                //if (enObjRespExpe.enOrigen != null)
                if (objEnExpeVirtual.coResultadoDB != null && objEnExpeVirtual.coResultadoDB.ID_TIPO  == 0)
                {
                    //Consulta pública de expedientes: Para el modulo que contiene el Captcha
                    //Se consulta expedientes que no sean de origen Interno
                    objEnAcceso.ID_TIPOACCESO = 3;
                    objEnAcceso.ID_SIS = int.Parse(ConfigurationManager.AppSettings["codigoSistema"].ToString());
                    objEnAcceso.IP_ACCESO = System.Web.HttpContext.Current.Request.UserHostAddress;
                    objEnAcceso.COD_FUENTE = (string.IsNullOrEmpty(strTipo) ? "W" : strTipo);
                    objEnAcceso.DES_OBS = "ID_EXPE :" + (objEnExpe.ID_EXPE == -1 ? intIdExp : objEnExpe.ID_EXPE);
                    objNeAcceso.insertarAsp(objEnAcceso, "I");

                    if (objEnExpeVirtual.lstEnDescripcionExpe != null && objEnExpeVirtual.lstEnDescripcionExpe.Count > 0)
                    {
                        ViewBag.FecExpe = objEnExpeVirtual.lstEnDescripcionExpe[0].FEC_EXPE;
                        ViewBag.idExpe = (objEnExpeVirtual.lstEnDescripcionExpe[0].ID_EXPE == 0? intIdExp : objEnExpeVirtual.lstEnDescripcionExpe[0].ID_EXPE);
                        ViewBag.DesAsunto = objEnExpeVirtual.lstEnDescripcionExpe[0].DES_ASUNTO;
                        ViewBag.idClasif = objEnExpeVirtual.lstEnDescripcionExpe[0].enClasif.ID_CLASIF;
                        ViewBag.backgroundColor = (objEnExpeVirtual.lstEnDescripcionExpe[0].enClasif.ID_CLASIF == 1 ? "#dff0d8" : "#FFDBC7");
                        ViewBag.AbrEstado = objEnExpeVirtual.lstEnDescripcionExpe[0].enEstado.ABR_ESTADO;
                    }
                    else {
                        ViewBag.FecExpe = "--";
                        ViewBag.DesAsunto = "--";
                        ViewBag.AbrEstado = "--";
                    }
                    if (objEnExpeVirtual.lstEnUbicacion != null && objEnExpeVirtual.lstEnUbicacion.Count > 0)
                    {
                        //ViewBag.DesUbi = objEnExpeVirtual.lstEnUbicacion[0].enEstorg.DES_SUBOFI;
                        //Se agregó el 10/06/22 -fortiz
                        ViewBag.DesUbi = string.Join(",", objEnExpeVirtual.lstEnUbicacion.Select(x => x.enEstorg.DES_SUBOFI).ToList());
                    }
                    else {
                        ViewBag.DesUbi = "--";
                    }
                    
                    ViewBag.FecVisto = DateTime.Now;
                    ViewBag.codForm = objEnExpe.DATO;
                    ViewBag.ticket = objEnExpe.TICKET;
                    
                    return View(ViewBag);
                    //if (enObjRespExpe.enOrigen.ID_ORIGEN != 2)
                    //{
                    //    ViewBag.FecVisto = DateTime.Now;
                    //    ViewBag.codForm = objEnExpe.DATO;
                    //    ViewBag.ticket = objEnExpe.TICKET;
                    //    return View(ViewBag);
                    //}
                    //else
                    //{
                    //    return RedirectToAction("mensajeGeneral", new { idMensaje = 1 });
                    //}
                }
                else
                {
                    return RedirectToAction("mensajeGeneral", new { strMensaje = objEnExpeVirtual.coResultadoDB.DES_ERROR });
                }
            }
            else
            {
                ViewBag.FecVisto = DateTime.Now;
                return View(ViewBag);
            }
        }
        //public ActionResult consultaPublicPorExpedientes()
        //{
        //    return View();
        //}
        public ActionResult consultaPublicaExpediente()
        {
            string strTicket = Request.QueryString["ticket"];
            ViewBag.IdExpe = strTicket;
            return View();
        }
        public ActionResult ConsultaExpeGrilla(string idPersona, string idMovi, string idExpe)
        {
            int idSub = 0;
            string strIdSubOfi = "";
            string strResponsable = "";
            coResultadoTramiteVirtualPublico.coResultadoDB objCoResultado = new coResultadoTramiteVirtualPublico.coResultadoDB() { ID_TIPO = 2, DES_ERROR = "Acceso no autorizado" };
            ////consDocumento?idDoc=3007066&idMovi=2&Cod=KTF4vWGB8cXZzPAQUdGWLA==

            //idPersona = "3530";
            //idExpe = "1000907";
            //idMovi = "0";

            if (!string.IsNullOrEmpty(idPersona))
            {
                List<enPersona> lst = new List<enPersona>();
                List<enMovi> lstMovi = new List<enMovi>();

                enPersona objEnPersona = new enPersona();
                objEnPersona.ID_PERSONA = Convert.ToInt32(idPersona);
                objEnPersona.OPR = "1";

                string strIdRol = neSeguridad.TraeRolesUsuario(Convert.ToInt32(idPersona), int.Parse(ConfigurationManager.AppSettings["idCodSisTramite"].ToString()));

                ViewBag.codRol = strIdRol;


                using (nePersona objNePersona = new nePersona())
                {
                    objCoResultado = objNePersona.validarUsuario(new enPersona()
                    {
                        ID_USU = !string.IsNullOrEmpty(idPersona) ? int.Parse(idPersona) : -1,
                        ID_SIS = int.Parse(ConfigurationManager.AppSettings["codigoSistema"].ToString()),
                        OPR = "1"
                    });
                }

                //Si el usuario tiene el estado inicativo
                if (objCoResultado.ID_TIPO != 0)
                {
                    ViewBag.DES_MENSAJE = objCoResultado.DES_ERROR;
                    //return PartialView("mensaje");
                    //mensajeGeneral
                    return Redirect(Request.ApplicationPath + "/Publico/Ventanilla/mensaje");
                }

                
                if (idMovi == "0")
                {
                    //Se obtiene la oficina del usuario que consulta el formulario en caso el idMovi = 0
                    using (nePersona objNePersona = new nePersona())
                    {
                        lst = objNePersona.traeListaPersona(objEnPersona);
                        if (lst.Count > 0)
                        {
                            idSub = lst[0].ID_SUB;
                            strIdSubOfi = lst[0].ID_SUBOFI;
                        }
                    }
                }
                else
                {
                    //Se obtiene la oficina segun el movimiento
                    using (neMovi objNeMovi = new neMovi())
                    {
                        lstMovi = objNeMovi.ListarExpeMovi(new enMovi() { ID_MOVI = int.Parse(idMovi), ID_EXPE = int.Parse(idExpe), OPR = "1" });
                        if (lstMovi.Count > 0)
                        {
                            idSub = lstMovi[0].enEstorg.ID_SUB;
                            strIdSubOfi = lstMovi[0].enEstorg.ID_SUBOFI;
                        }
                    }
                }

                ViewBag.idSubPivot = idSub + "|" + strIdSubOfi;

                //Responsable
                using (neResponsable objNe = new neResponsable())
                {
                    enDocElecExpe objEn = new enDocElecExpe();
                    objEn.ID_PERSONA = Convert.ToInt32(idPersona);
                    objEn.ID_SUB = idSub;
                    objEn.ID_SUBOFI = strIdSubOfi;
                    strResponsable = objNe.TraeResponsable(objEn);
                }
                ViewBag.idPersona = idPersona;
                ViewBag.codMovi = idMovi;
                ViewBag.FecVisto = DateTime.Now;
                ViewBag.codForm = "CET";
                ViewBag.strResponsable = strResponsable;
                ViewBag.idExpe = idExpe;

                return View(ViewBag);
            }
            else {
                return Redirect(Request.ApplicationPath + "/Publico/Ventanilla/mensaje");
            }
        }
        public ActionResult consultaExpedientes()
        {

            //Ver documentos-->
            //Rol administrador y seguimiento
            ViewBag.strVerDocumentos = ConfigurationManager.AppSettings["idVerDocumentos"].ToString();
            //Rol de web config 1,16 Administrador y consulta general
            ViewBag.validConsDocu = ConfigurationManager.AppSettings["strCodigoConsDocu"].ToString();
            //Rol jefes
            ViewBag.strCodigoJefes = ConfigurationManager.AppSettings["strCodigoJefes"].ToString();
            //Rol administrador
            ViewBag.strRolAdministrador = ConfigurationManager.AppSettings["idRolAdministrador"].ToString();
            //Rol director
            ViewBag.strRolDirector = ConfigurationManager.AppSettings["idRolDirector"].ToString();
            //Rol director general
            ViewBag.strRolDirectorGeneral = ConfigurationManager.AppSettings["idRolDirectorGeneral"].ToString();
            //Rol secretaria
            ViewBag.strRolSecretaria = ConfigurationManager.AppSettings["idRolSecretaria"].ToString();
            //Rol especialista
            ViewBag.strRolEspecialista = ConfigurationManager.AppSettings["idRolAsignacion"].ToString();
            //Rol asistente
            ViewBag.strRolAsistente = ConfigurationManager.AppSettings["idRolAsistente"].ToString();
            //Rol de web config 16 consulta general
            ViewBag.strRolConsGeneral = ConfigurationManager.AppSettings["idRolConsultaGeneral"].ToString();
            //Rol de web config Seguimeinto
            ViewBag.strRolSeguimiento = ConfigurationManager.AppSettings["idRolSeguimiento"].ToString();
            return View(ViewBag);
        }
        public ActionResult regDocumento(int intIdExpe, int intIdMovi, string intIdDoc, int intIdAnoProc, string strIdDiv, string strCod)
        {

            objEnTramite.enDoc objEnDoc = new objEnTramite.enDoc();

            int idDoc = 0;

            int.TryParse(intIdDoc, out idDoc);

            List<objEnTramite.enDoc> lstDoc = new List<objEnTramite.enDoc>();
            

            if (idDoc != 0)
            {
                objEnDoc.ID_DOC = idDoc;

                using (neDoc objNeDoc = new neDoc())
                {
                    lstDoc = objNeDoc.traeListaDoc(objEnDoc);
                }
                //Mincetur.Administracion.TramiteDocumentario.NeTramiteDocumentario.neDoc objNeDoc = new Mincetur.Administracion.TramiteDocumentario.NeTramiteDocumentario.neDoc();
                //lstDoc = objNeDoc.traeListaDoc(objEnDoc);
                if (lstDoc != null)
                {
                    if (lstDoc.Count > 0)
                    {
                        ViewBag.DES_DOC = lstDoc[0].DES_DOC;
                        ViewBag.DES_OBS = lstDoc[0].DES_OBS;
                        ViewBag.ID_ANO_PROC = lstDoc[0].ID_ANO_PROC;
                        ViewBag.ID_EXPE = lstDoc[0].ID_EXPE;
                        ViewBag.DESC_USU = lstDoc[0].DESC_USU;
                        ViewBag.DESC_OFI_ABR = lstDoc[0].DESC_OFI_ABR;
                        ViewBag.DES_ESTADO = lstDoc[0].DES_ESTADO;
                        ViewBag.FLG_EST = lstDoc[0].FLG_EST;
                        ViewBag.ID_TIP_DOC = lstDoc[0].ID_TIP_DOC;
                        ViewBag.ID_DOC = intIdDoc;
                        ViewBag.strRutaAdjuntosMemo = ConfigurationManager.AppSettings["strRutaAdjuntosMemo"].ToString();
                        ViewBag.strRutaAdjuntoServicio = ConfigurationManager.AppSettings["strRutaAdjuntoServicio"].ToString();
                        return PartialView("regDocumento");
                    }
                    else {
                        return new EmptyResult();
                    }                  
                }
                else {
                    return new EmptyResult();
                }             
            }
            else {
                return new EmptyResult();
            }
        }
        public ActionResult regDocPublico(string IdDoc, string Cod)
        {
            
            if (!string.IsNullOrEmpty(IdDoc)) {
                string strIdDoc = Util.desencriptarAES(IdDoc);
                ViewBag.strIdDoc = strIdDoc;
            }
            if (!string.IsNullOrEmpty(Cod))
            {
                string strCod = Util.desencriptarAES(Cod);
                ViewBag.strCod = strCod;
            }

            return View(ViewBag);
        }
        #endregion
        #region Descargar archivo
        public ActionResult DescargaArchivo(string strTipo, string CodCms, string strNomArch, string strAction, string strRuta, string IdDocCms)
        {
            int intCodCms = 0;
            int intIdDocCms = 0;

            int.TryParse(CodCms, out intCodCms);
            int.TryParse(IdDocCms, out intIdDocCms);

            if (strTipo == "lf")
            {
                if (intCodCms > 0)
                {
                    if (strAction == "d")
                    {
                        ResultExportarArchByte objResultExportarArch = new ResultExportarArchByte();
                        WCFEIArchivoLF objArchivoLF = new WCFEIArchivoLF();
                        DatosExportarArchByte objDatosExportar = new DatosExportarArchByte();
                        objDatosExportar.IdArchivo = intCodCms;
                        objDatosExportar.IdArchivoSpecified = true;
                        objResultExportarArch = objArchivoLF.ExportarArchivoByte(objDatosExportar);

                        if (objResultExportarArch.boolExportar)
                        {
                            return File(objResultExportarArch.archivo, objResultExportarArch.TipoContenidoMIME, strNomArch);
                        }
                    }
                    else if (strAction == "v")
                    {

                        ResultExportarArchByte objResultExportarArch = new ResultExportarArchByte();
                        WCFEIArchivoLF objArchivoLF = new WCFEIArchivoLF();
                        DatosExportarArchByte objDatosExportar = new DatosExportarArchByte();
                        objDatosExportar.IdArchivo = intCodCms;
                        objDatosExportar.IdArchivoSpecified = true;
                        objResultExportarArch = objArchivoLF.ExportarArchivoByte(objDatosExportar);

                        MemoryStream pdfStream = new MemoryStream();
                        pdfStream.Write(objResultExportarArch.archivo, 0, objResultExportarArch.archivo.Length);
                        pdfStream.Position = 0;
                        return new FileStreamResult(pdfStream, objResultExportarArch.TipoContenidoMIME);
                    }
                }
                else if (intIdDocCms > 0)
                {
                    //WCFConsDocCms.ResultadoDocCms objResultadoDocCms = new WCFConsDocCms.WCFGeneralesDocCmsConsulta().descarga(new WCFConsDocCms.DocCmsDescarga()
                    //{
                    //    IdDocCms = intIdDocCms,
                    //    IdSis = int.Parse(System.Configuration.ConfigurationManager.AppSettings["codigoSistema"]),
                    //    IdUsu = Util.TraeIdUsuAuth(),
                    //    IpAcceso = Util.obtenerIP()
                    //});

                    string strUrl = string.Format("{0}{1}{2}", Request.Url.Scheme + "://", ConfigurationManager.AppSettings["paginaVisor"], HttpUtility.UrlEncode(Util.encriptarAES(Newtonsoft.Json.JsonConvert.SerializeObject(new
                    {
                        IdDocCms = IdDocCms,
                        IdUsu = Util.TraeIdUsuAuth(),
                        IdSis = ConfigurationManager.AppSettings["codigoSistema"],
                        IpAcceso = Util.obtenerIP()
                    }))));
                    return Content(strUrl); // Return the URL as plain text




                    //if (objResultadoDocCms.IdTipo == 0)
                    //{
                    //    if (strAction == "d")
                    //    {
                    //        return File(objResultadoDocCms.DocCms.Archivo, objResultadoDocCms.DocCms.DesExtension, objResultadoDocCms.DocCms.DesNomAbr);
                    //    }
                    //    else if (strAction == "v")
                    //    {
                    //        string strUrl = string.Format("{0}{1}{2}", Request.Url.Scheme,ConfigurationManager.AppSettings["paginaVisor"], HttpUtility.UrlEncode(Util.encriptarAES(Newtonsoft.Json.JsonConvert.SerializeObject(new
                    //        {
                    //            IdDocCms = IdDocCms,
                    //            IdUsu = Util.TraeIdUsuAuth(),
                    //            IdSis = ConfigurationManager.AppSettings["codigoSistema"],
                    //            IpAcceso = Util.obtenerIP()
                    //        }))));
                    //        return Content(strUrl); // Return the URL as plain text
                    //        //MemoryStream pdfStream = new MemoryStream();
                    //        //pdfStream.Write(objResultadoDocCms.DocCms.Archivo, 0, objResultadoDocCms.DocCms.Archivo.Length);
                    //        //pdfStream.Position = 0;

                    //        //if (objResultadoDocCms.DocCms.DesExtension == "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
                    //        //{
                    //        //    return new FileStreamResult(pdfStream, objResultadoDocCms.DocCms.DesExtension) { FileDownloadName = strNomArch };
                    //        //}
                    //        //else
                    //        //{
                    //        //    return new FileStreamResult(pdfStream, objResultadoDocCms.DocCms.DesExtension);
                    //        //}
                    //    }
                    //}
                }
            }
            else if (strTipo == "memo")
            {
                if (intCodCms > 0)
                {
                    if (strAction == "v")
                    {
                        int idDoc = intCodCms;
                        string strHtml = "";
                        coResultadoDB objCoResultadoDB = new coResultadoDB();


                        using (neMemoGenerado objMemoGeneradoLN = new neMemoGenerado())
                        {
                            objCoResultadoDB = objMemoGeneradoLN.consultar(new enDocElecExpe
                            {
                                ID_DOC = idDoc,
                                ID_SIS = int.Parse(ConfigurationManager.AppSettings["codigoSistemaMemo"]),
                                OPR = "1"
                            });
                            if (objCoResultadoDB != null)
                            {
                                if (int.Equals(objCoResultadoDB.ID_TIPO, 0))
                                {
                                    strHtml = objCoResultadoDB.DES_ERROR;
                                }
                            }
                        }
                        if (!string.IsNullOrEmpty(strHtml))
                        {
                            //string strCarpeta = "Resource/archivos/";
                            string strCarpeta = "Resource/" + ConfigurationManager.AppSettings["archivoVisor"] + "/";
                            enDocumento objEnDocumento = new enDocumento()
                            {
                                DES_NOM = strNomArch,
                                DES_RUTA = constante.mapPath(strCarpeta, Guid.NewGuid().ToString())
                            };
                            objEnDocumento.ARCHIVO = Util.printPDF(strHtml, objEnDocumento);
                            MemoryStream pdfStream = new MemoryStream();
                            pdfStream.Write(objEnDocumento.ARCHIVO, 0, objEnDocumento.ARCHIVO.Length);
                            pdfStream.Position = 0;
                            return new FileStreamResult(pdfStream, System.Net.Mime.MediaTypeNames.Application.Pdf);
                        }
                        else
                        {
                            return Redirect(Request.ApplicationPath + "/Publico/Ventanilla/_VisorMensaje");
                        }
                    }
                    else if (strAction == "d")
                    {
                        string strNombreArchivo = Path.GetFileName(strRuta);
                        if (strNombreArchivo.Contains("_"))
                        {
                            string[] arrFileName = strNombreArchivo.Split('_');
                            strNombreArchivo = arrFileName[arrFileName.Length - 1];
                        }
                        //string strMapServer = constante.mapPath("Resource/archivos/", strNombreArchivo);
                        string strMapServer = constante.mapPath("Resource/" + ConfigurationManager.AppSettings["archivoVisor"] + "/", strNombreArchivo);


                        byte[] archivo = null;
                        //impersonalize(strRuta, null, ref archivo);
                        return File(archivo, System.Net.Mime.MediaTypeNames.Application.Octet, strNombreArchivo);
                    }
                    else if (strAction == "vm")
                    {
                        string strNombreArchivo = Path.GetFileName(strRuta);
                        if (strNombreArchivo.Contains("_"))
                        {
                            string[] arrFileName = strNombreArchivo.Split('_');
                            strNombreArchivo = arrFileName[arrFileName.Length - 1];
                        }
                        //string strMapServer = constante.mapPath("Resource/archivos/", strNombreArchivo);
                        string strMapServer = constante.mapPath("Resource/" + ConfigurationManager.AppSettings["archivoVisor"] + "/", strNombreArchivo);
                        byte[] archivo = null;
                        //impersonalize(strRuta, null, ref archivo);
                        MemoryStream pdfStream = new MemoryStream();
                        pdfStream.Write(archivo, 0, archivo.Length);
                        pdfStream.Position = 0;
                        return new FileStreamResult(pdfStream, System.Net.Mime.MediaTypeNames.Application.Pdf);
                    }
                    //return Redirect(Request.ApplicationPath + "/Publico/Ventanilla/_VisorMensaje");
                    return Redirect(Request.ApplicationPath + "/Publico/Ventanilla/_VisorMensaje");
                }
                //return Redirect(Request.ApplicationPath + "/Publico/Ventanilla/_VisorMensaje");
                return Redirect(Request.ApplicationPath + "/Publico/Ventanilla/_VisorMensaje");
            }
            //return Redirect(Request.ApplicationPath + "/Publico/Ventanilla/_VisorMensaje");
            return Redirect(Request.ApplicationPath + "/Publico/Ventanilla/_VisorMensaje");
        }
        public FileResult descargarDocumentoServicio(string idDocCms, string strRuta, string strNomArchivo)
        {
            DocCmsDescarga objDocCmsDescarga = new DocCmsDescarga();
            objDocCmsDescarga.IdDocCms = int.Parse(idDocCms);
            objDocCmsDescarga.IdUsu = Util.TraeIdUsuAuth();
            objDocCmsDescarga.IdSis = int.Parse(ConfigurationManager.AppSettings["CodigoSistema"]);
            objDocCmsDescarga.IpAcceso = Util.obtenerIP();


            ResultadoDocCms objResultadoCms = new ResultadoDocCms();
            WCFGeneralesDocCmsConsulta objDocDesCargar = new WCFGeneralesDocCmsConsulta();

            objResultadoCms = objDocDesCargar.descarga(objDocCmsDescarga);

            if (objResultadoCms.DocCms.Archivo != null)
            {
                return File(objResultadoCms.DocCms.Archivo, System.Net.Mime.MediaTypeNames.Application.Octet, objResultadoCms.DocCms.DesNomAbr);
            }
            else
            {
                string strNombreArchivo = string.Empty;
                if (strRuta.IndexOf("\\") != -1)
                {
                    string[] arrRuta = strRuta.Split(new[] { "\\" }, StringSplitOptions.RemoveEmptyEntries);
                    int intIndex = arrRuta[arrRuta.Length - 1].IndexOf("_") + 1;
                    strNombreArchivo = arrRuta[arrRuta.Length - 1].Substring(intIndex);
                    byte[] archivo = null;
                    Util.impersonalize(strRuta, null, ref archivo);
                    return File(archivo, System.Net.Mime.MediaTypeNames.Application.Octet, strNomArchivo);
                }
                else {
                    return null;
                }
                
            }
        }
        #endregion
        public bool buscarRol(string[] objArray, string strRol)
        {
            bool rpt = false;
            foreach (string x in objArray)
            {
                if (strRol.Contains(x))
                {
                    rpt = true;
                    break;
                }
            }
            return rpt;
        
        }
        public bool buscarUsuarioEnOficina(enMovi objEnMovi) {
            bool rpt = new bool();
            using (neMovi objNeMovi = new neMovi())
            {
                List<enMovi> lstMovi = objNeMovi.ListarExpeMovi(new enMovi(){ ID_EXPE = objEnMovi.ID_EXPE, OPR = "1" });
                if (lstMovi != null) {
                    rpt = lstMovi.Exists(x => x.enEstorg.ID_SUB == objEnMovi.ID_SUB || x.enEstorgRemite.ID_SUB == objEnMovi.ID_SUB);
                }
            }
            return rpt;
        }        
    }
} 

