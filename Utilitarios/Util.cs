using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Configuration;
using System.Globalization;
using System.Web;
using WCFLaserFiche = Mincetur.Administracion.AplTramiteVirtualPublico.Utilitarios.soap.ServicioArchivoLaserfiche;
using WCFEstorg = Mincetur.Administracion.AplTramiteVirtualPublico.Utilitarios.soap.ServicioGeneralUtil.Estorg;
using WCFSeguridadSistema = Mincetur.Administracion.AplTramiteVirtualPublico.Utilitarios.soap.ServicioSeguridad.SeguridadSistema;
using enGeneralesUtil = Mincetur.Administracion.GeneralesUtil.EnGeneralesUtil;
using Sunat = Mincetur.Administracion.AplTramiteVirtualPublico.Utilitarios.servicioSunatContribuyente;
using Mincetur.Administracion.Seguridad.EnSeguridad;
using Mincetur.Administracion.Seguridad.NeSeguridad;
using Mincetur.Administracion.AplTramiteVirtualPublico.Utilitarios.servicioGeneralesTipoDocu;
using Mincetur.Administracion.AplTramiteVirtualPublico.Utilitarios.servicioGeneralesVia;
using Mincetur.Administracion.AplTramiteVirtualPublico.Utilitarios.servicioGeneralesZona;
using Mincetur.Administracion.AplTramiteVirtualPublico.Utilitarios.servicioGeneralesUbigeo;
using Mincetur.Administracion.AplTramiteVirtualPublico.Utilitarios.servicioGeneralesTipoTele;
using Mincetur.Administracion.AplTramiteVirtualPublico.Utilitarios.servicioGeneralesDocumento;
using Mincetur.Administracion.AplTramiteVirtualPublico.Utilitarios.soap.ServicioGeneralUtil.Correo;

using System.IO;
using iTextSharp.text;
using iTextSharp.text.pdf;
using iTextSharp.tool.xml;




namespace Mincetur.Administracion.AplTramiteVirtualPublico.Utilitarios
{
    public class Util
    {
        public static System.Web.HttpCookie AuthenticateUrl(int intIdUsu, string strCodPin = "")
        {
            TimeSpan TimeOut = System.Web.Security.FormsAuthentication.Timeout;
            System.Web.Security.FormsAuthenticationTicket Ticket = new System.Web.Security.FormsAuthenticationTicket(1, intIdUsu.ToString(), DateTime.Now, DateTime.Now.Add(TimeOut), true, strCodPin, System.Web.Security.FormsAuthentication.FormsCookiePath);
            string encTicket = System.Web.Security.FormsAuthentication.Encrypt(Ticket);
            System.Web.HttpCookie cookAuth = new System.Web.HttpCookie(System.Web.Security.FormsAuthentication.FormsCookieName, encTicket);
            cookAuth.Expires = DateTime.Now.Add(TimeOut);
            System.Web.HttpContext.Current.Response.Cookies.Add(cookAuth);
            return cookAuth;
        }
        public static void responsePersonaCookie(System.Web.HttpCookie cookPrincipal, int intIdUsu, int intIdEnt = 0, string strSistema = "", string strCodOfi = "")
        {
            string strNomPersona = "";
            int intIdSub = 0;
            string strIdSubOfi = "";
            if (intIdEnt == 0 && intIdEnt != intIdUsu)
            {
                
                enUsu objEnUsu = new enUsu();
                objEnUsu = neUsu.traerdatosUsuario(intIdUsu);
                strNomPersona = objEnUsu.NOM_USU;
                if (!String.IsNullOrEmpty(strCodOfi))
                {
                    var arrOfi = strCodOfi.Split('|');
                    int.TryParse(arrOfi[0], out intIdSub);
                    strIdSubOfi = arrOfi[1];
                }
                else
                {
                    int.TryParse(objEnUsu.CorSub, out intIdSub);
                    strIdSubOfi = objEnUsu.CodSub;
                };
            }
            if (cookPrincipal == null) cookPrincipal = new System.Web.HttpCookie("UsuarioIntranetDirectorioPrestador");
            Util.ponerValoresCookie(cookPrincipal, new Administracion.Seguridad.EnSeguridad.enUsu()
            {
                NOM_USU = strNomPersona,
                CorSub = intIdSub.ToString(),
                CodSub = strIdSubOfi
            }, strSistema);
        }
        public static void responseConsultaExpeGrillaCookie(System.Web.HttpCookie cookPrincipal, int intIdUsu, int intIdExp, int intIdMovi, string strTipo)
        {
            
            if (cookPrincipal == null) cookPrincipal = new System.Web.HttpCookie("UsuarioConsultaExpeGrilla");
            Util.ponerValoresCookieConsultaExpeGrilla(cookPrincipal, new Administracion.TramiteDocumentario.EnTramiteDocumentario.enMovi()
            {
                ID_EXPE = intIdExp,
                ID_MOVI = intIdMovi,
                ID_USU = intIdUsu
            }, strTipo);
        }
        public static void ponerValoresCookieConsultaExpeGrilla(System.Web.HttpCookie cookPrincipal, Administracion.TramiteDocumentario.EnTramiteDocumentario.enMovi objEnMovi, string strTipo)
        {
            cookPrincipal.Values.Clear();
            cookPrincipal.Values.Add("IdUsu", objEnMovi.ID_USU.ToString());
            cookPrincipal.Values.Add("IdExpe", objEnMovi.ID_EXPE.ToString());
            cookPrincipal.Values.Add("IdMovi", objEnMovi.ID_MOVI.ToString());
            cookPrincipal.Values.Add("strTipo", strTipo);
            cookPrincipal.Expires = DateTime.Now.Add(System.Web.Security.FormsAuthentication.Timeout);
            System.Web.HttpContext.Current.Response.Cookies.Add(cookPrincipal);
        }
        public static void ponerValoresCookie(System.Web.HttpCookie cookPrincipal, Administracion.Seguridad.EnSeguridad.enUsu objEnUsu, string strSistema = "", string strLogin = "")
        {
            cookPrincipal.Values.Clear();
            cookPrincipal.Values.Add("IdUsu", objEnUsu.ID_USU.ToString());
            cookPrincipal.Values.Add("IdSubOfi", objEnUsu.CodSub);
            cookPrincipal.Values.Add("IdSub", objEnUsu.CorSub);
            cookPrincipal.Values.Add("DesSubOfi", objEnUsu.DesSub);
            cookPrincipal.Values.Add("AbrSubOfi", objEnUsu.AbrSub);
            cookPrincipal.Values.Add("IdCargoFun", objEnUsu.IdCargoFun);
            cookPrincipal.Values.Add("NomUsu", objEnUsu.NOM_USU);
            cookPrincipal.Expires = DateTime.Now.Add(System.Web.Security.FormsAuthentication.Timeout);
            System.Web.HttpContext.Current.Response.Cookies.Add(cookPrincipal);
        }
        public static WCFLaserFiche.ResultExportarArchByte descargarArchivoLf(int idDoc)//USAR PARA DESCARGAR ARCHIVOS DEL LASER REQUIERE EL COD_CMS
        {
            WCFLaserFiche.ResultExportarArchByte objResultExportarArch = new WCFLaserFiche.ResultExportarArchByte();
            WCFLaserFiche.DatosExportarArchByte objDatosExporArch = new WCFLaserFiche.DatosExportarArchByte();
            objDatosExporArch.IdArchivo = idDoc;
            objDatosExporArch.IdArchivoSpecified = true;
            WCFLaserFiche.WCFEIArchivoLF objWCFEIArchivoLF = new WCFLaserFiche.WCFEIArchivoLF();
            objResultExportarArch = objWCFEIArchivoLF.ExportarArchivoByte(objDatosExporArch);
            return objResultExportarArch;
        }       
        public static soap.ServicioArchivoLaserfiche.ResultImportarArchivo subirArchivo(soap.ServicioArchivoLaserfiche.DatosSubirArchivo objDatosSubirArchivo)
        {
            WCFLaserFiche.ResultImportarArchivo objResultImportarArchivo = new WCFLaserFiche.ResultImportarArchivo();
            try
            {
                WCFLaserFiche.WCFEIArchivoLF wcf = new WCFLaserFiche.WCFEIArchivoLF();
                objResultImportarArchivo = wcf.SubirArchivoMasivo(new soap.ServicioArchivoLaserfiche.DatosSubirArchivo[] {
                        objDatosSubirArchivo})[0];
            }
            catch (Exception ex)
            {
                objResultImportarArchivo.boolImportar = false;
                objResultImportarArchivo.MesageImportar = ex.Message;
            }

            return objResultImportarArchivo;
        }
        public static int TraeIdUsuAuth()
        {
            int intIdPersona = 0;
            string CookNombre = System.Web.Security.FormsAuthentication.FormsCookieName;
            System.Web.HttpCookie CookAuth = System.Web.HttpContext.Current.Request.Cookies[CookNombre];
            if (CookAuth != null)
            {
                System.Web.Security.FormsAuthenticationTicket Ticket = System.Web.Security.FormsAuthentication.Decrypt(CookAuth.Value);
                int.TryParse(Ticket.Name, out intIdPersona);
            }
            return intIdPersona;
        }
        public static void RemoveCookie(string cookNombre)
        {
            //Fetch the Cookie using its Key.
            System.Web.HttpCookie cook = System.Web.HttpContext.Current.Request.Cookies[cookNombre];
            if (cook != null)
            {
                //Set the Expiry date to past date.
                cook.Expires = DateTime.Now.AddYears(-1);

                //Update the Cookie in Browser.
                System.Web.HttpContext.Current.Response.Cookies.Add(cook);
            }
        }       
        public static string desencriptarAES(string strTextoEncriptado)
        {
            string strDesencriptado = string.Empty;
            if (!string.IsNullOrEmpty(strTextoEncriptado))
            {
                try
                {
                    strDesencriptado = new servicioSeguridad.WCFSeguridadEncripDesencrip.WCFSeguridadEncripDesencrip().desencriptarAES(strTextoEncriptado.Replace(" ", "+"), null);
                }
                finally { }
            }
            return strDesencriptado;
        }
        public static soap.ServicioSeguridad.SeguridadSistema.coResultadoDB enviarAcceso(soap.ServicioSeguridad.SeguridadSistema.enAcceso objEnAcceso)
        {
            soap.ServicioSeguridad.SeguridadSistema.WCFSeguridadSistema wcf = new soap.ServicioSeguridad.SeguridadSistema.WCFSeguridadSistema();
            soap.ServicioSeguridad.SeguridadSistema.coResultadoDB objCoResultado = new soap.ServicioSeguridad.SeguridadSistema.coResultadoDB() { ID_TIPO = 2, DES_ERROR = "No se grabó acceso" };
            if (objEnAcceso == null) objEnAcceso = new soap.ServicioSeguridad.SeguridadSistema.enAcceso();
            objEnAcceso.ID_PERSONASpecified = true;
            objEnAcceso.ID_SIS = objEnAcceso.ID_SIS != -1? objEnAcceso.ID_SIS : int.Parse(System.Configuration.ConfigurationManager.AppSettings["IdSis"]);
            objEnAcceso.ID_SISSpecified = true;
            objEnAcceso.ID_TIPOACCESOSpecified = true;
            objEnAcceso.IP_ACCESO = HttpContext.Current.Request.UserHostAddress;
            objEnAcceso.COD_FUENTE = "I";
            objEnAcceso.FEC_ACCESO = DateTime.Now;
            objEnAcceso.FEC_ACCESOSpecified = true;
            
            try
            {
                objCoResultado = wcf.enviarAccesoUlt(objEnAcceso);
            }
            finally { }
            return objCoResultado;
        }
        public static string encriptarAES(string strTextoDesencriptado)
        {
            string strEncriptado = string.Empty;
            if (!string.IsNullOrEmpty(strTextoDesencriptado))
            {
                try
                {
                    strEncriptado = new servicioSeguridad.WCFSeguridadEncripDesencrip.WCFSeguridadEncripDesencrip().encriptarAES(strTextoDesencriptado.Trim(), null);
                }
                finally { }
            }
            return strEncriptado;
        }
        public static byte[] printPDF(string strContent, enGeneralesUtil.enDocumento oEnDocumento)
        {
            using (StringReader sr = new StringReader(@strContent))
            {
                //Lectura del texto html
                //try
                //{
                using (FileStream fs = new FileStream(oEnDocumento.DES_RUTA, FileMode.Create))
                {
                    using (Document document = new Document(PageSize.A4, 50, 50, 30, 50))
                    {
                        PdfWriter writer = PdfWriter.GetInstance(document, fs);
                        document.Open();
                        //Convierte el html a PDF
                        try
                        {
                            XMLWorkerHelper.GetInstance().ParseXHtml(
                                writer, document, sr
                            );
                        }
                        catch (IOException ex)
                        {
                            throw new IOException("ProcessRequest :: Error método " + ex.Message, ex.InnerException);
                        }
                        finally
                        {
                            document.Close();
                        }
                    }
                }

                oEnDocumento.ARCHIVO = File.ReadAllBytes(oEnDocumento.DES_RUTA);
                File.Delete(oEnDocumento.DES_RUTA);
                return oEnDocumento.ARCHIVO;
            }
        }
        public static WCFEstorg.enEstorg[] listOficinas(WCFEstorg.enEstorg objEnEstorg)
        {
            WCFEstorg.enEstorg[] objList = null;
            WCFEstorg.WCFGeneralesEstorg obj = new WCFEstorg.WCFGeneralesEstorg();
            objList = obj.listarEstorg(objEnEstorg);
            return objList;
        }
        public static string obtenerIP()
        {
            return HttpContext.Current.Request.UserHostAddress;
        }
        public static bool impersonalize(string origen, string destino, ref byte[] bOrigenArchivo)
        {
            bool response = true;
            try
            {
                servicioGestorFileServer.setDatosWSGFileServer objSetDatosWS = new servicioGestorFileServer.WCFgestorFileServer().ProcesoGetByte(
                    new servicioGestorFileServer.setDatosWSGFileServer() { sRutaArchivo = @origen }
                    );
                if (objSetDatosWS != null)
                {
                    bOrigenArchivo = objSetDatosWS.bOrigenArchivo;
                    if (bOrigenArchivo != null && !string.IsNullOrEmpty(destino))
                    {
                        try
                        {
                            System.IO.File.WriteAllBytes(destino, bOrigenArchivo);
                        }
                        catch (IOException ex)
                        {
                            response = false;
                            Console.Write(ex.Message);
                        }
                    }
                }
            }
            finally
            {
            }
            return response;
        }
    }
}
