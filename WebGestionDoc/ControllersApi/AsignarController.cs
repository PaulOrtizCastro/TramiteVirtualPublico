using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Http;
using Mincetur.Administracion.AplTramiteVirtualPublico.CoTramiteVirtualPublico;
using Mincetur.Administracion.AplTramiteVirtualPublico.EnTramiteVirtualPublico;
using System.Configuration;
using Mincetur.Administracion.AplTramiteVirtualPublico.NeTramiteVirtualPublico;
using Mincetur.Administracion.Seguridad.EnSeguridad;
using Mincetur.Administracion.AplGestionDoc.WebGestionDoc.App_Code;
using System.Threading;
using Mincetur.Administracion.AplTramiteVirtualPublico.Utilitarios;

namespace Mincetur.Administracion.AplGestionDoc.WebGestionDoc.ControllersApi
{
    public class AsignarController : ApiController
    {
        //
        // GET: /Asignar/
        #region Consultar
        public List<enPersona> consultarFuncionarios(enPersona enObj)
        {
            List<enPersona> listUsuPivot = new List<enPersona>();
            using (neAsignar objNe = new neAsignar())
            {
                listUsuPivot = objNe.consultarFuncionarios(enObj);
            }
            return listUsuPivot;
        }
         public List<enPersona> consultarFuncionariosPorOficina(enPersona enObj)
        {
            List<enPersona> listUsuPivot = new List<enPersona>();
            using (neAsignar objNe = new neAsignar())
            {
                listUsuPivot = objNe.consultarFuncionariosPorOficina(enObj);
            }
            return listUsuPivot;
         }

        public List<enAsignar> consultarListaFuncionariosAsignados(enAsignar enObj) {
            List<enAsignar> listPivot = new List<enAsignar>();
            enObj.ID_ESTADO = (ConfigurationManager.AppSettings["idEstadoAsignacion"] == "" ? 0 : int.Parse(ConfigurationManager.AppSettings["idEstadoAsignacion"]));
            
            using (neAsignar objNe = new neAsignar())
            {
                listPivot = objNe.consultarListaFuncionariosAsignados(enObj);
            }
            return listPivot;
        }
        #endregion

        #region Mantenimiento
        public coResultadoDB actualizar(enAsignar objEnAsignar)
        {
            coResultadoDB objCoResultadoDB = new coResultadoDB() { ID_TIPO = 0, DES_ERROR = "Se asignó correctamente" };
            int idMovi = objEnAsignar.enMovi.ID_MOVI;
            string strInserts = "";
            string strfecCantPlazo = "NULL";
            string strCantPlazo = "-1";

            //VERIFICA EL ESTADO DEL EXPEDIENTE, ACCION 4 ASIGNAR, 1 DERIVAR

            bool indicador = new Validaciones().verificaEstadoExpe(objEnAsignar.enExpe.ID_EXPE, idMovi, (objEnAsignar.enAccion == null ? 4 : (int)objEnAsignar.enAccion.ID_ACCION));

            if (indicador)
            {
                enDocElec objEnDocElec = new enDocElec();
                List<enPersona> lstEnPersona = new List<enPersona>();
                enMovi objEnMovi = new enMovi();
                enAccion objEnAccion = new enAccion();


                if (!(objEnAsignar.DESTINATARIOS == null))
                {
                    foreach (enDocElecDestino item in objEnAsignar.DESTINATARIOS)
                    {
                        if (item.PLAZO > 0)
                        {
                            strCantPlazo = item.PLAZO.ToString();

                            //switch (objEnAsignar.FLG_TIPO_DIA)
                            switch (item.FLG_TIPO_DIA)
                            {
                                case "C": //CALENDARIO
                                    strfecCantPlazo = string.Format("TRUNC(SYSDATE) + {0}", item.PLAZO);
                                    break;
                                case "U": //LABORABLE
                                    strfecCantPlazo = string.Format("TAGDBA.PKG_TAGUTIL.FNC_SUMA_DIA(SYSDATE, {0}, 'U')", item.PLAZO);
                                    strCantPlazo = string.Format("{0} - TRUNC(SYSDATE)", strfecCantPlazo);
                                    break;
                                default:
                                    strfecCantPlazo = "TRUNC(SYSDATE)"; break;
                            }
                        }
                        else
                        {
                            strfecCantPlazo = "NULL";
                            strCantPlazo = "NULL";
                        }

                        enPersona objEnPersona = new enPersona();
                        //strfecCantPlazo = string.Format("TRUNC(SYSDATE) + {0}", item.PLAZO);

                        //ID_USU_FUNC, ID_ESTADO,ID_TRATA, ID_PRIORI, NUM_PLAZO, FEC_PLAZO, DES_OBS
                        strInserts = strInserts + item.ID_PERSONA + ", 10, " + item.ID_TRATA + "," + item.ID_PRIORIDAD + "," + strCantPlazo + "," + strfecCantPlazo + ",'" + item.DES_OBS.Replace("|", "&#124;") + "'|";

                        objEnPersona.ID_PERSONA = item.ID_PERSONA;
                        objEnPersona.DES_COMENT = item.DES_OBS;
                        objEnPersona.ID_SUB = item.ID_SUB;
                        objEnPersona.ID_SUBOFI = item.ID_SUBOFI;

                        lstEnPersona.Add(objEnPersona);
                    }
                }
                objEnMovi.INSERTS = strInserts;
                objEnMovi.ID_MOVI = idMovi;
                objEnAsignar.enMovi = objEnMovi;
                objEnAccion.ID_ACCION = 4;
                objEnAsignar.enAccion = objEnAccion;
                objEnAsignar.ID_ANO_PROC = DateTime.Now.Year;
                objEnAsignar.ID_ESTADO = Convert.ToInt32(ConfigurationManager.AppSettings["idEstado"].ToString()); ;
                objEnAsignar.ID_USU = objEnAsignar.enPersonaRemite.ID_PERSONA;
                
                //objEnDocElec.ID_TIP_DOC = (objEnAsignar.enTipDoc.ID_TIP_DOC == null ? 0 : objEnAsignar.enTipDoc.ID_TIP_DOC);
                objEnDocElec.ID_TIP_DOC = objEnAsignar.enTipDoc.ID_TIP_DOC;
                objEnDocElec.ID_SUB = objEnAsignar.enEstorg.ID_SUB;
                objEnDocElec.ID_SUBOFI = objEnAsignar.enEstorg.ID_SUBOFI;
                objEnDocElec.ID_MOVI = idMovi;

                objEnDocElec.ID_USU = objEnAsignar.ID_USU;
                objEnDocElec.ID_SIS = Convert.ToInt32(ConfigurationManager.AppSettings["IdSis"].ToString());
                objEnDocElec.IP_CREA = Util.obtenerIP();
                //objEnDocElec.IP_MODI = HttpContext.Current.Request.UserHostAddress;

                objEnAsignar.ID_SIS = Convert.ToInt32(ConfigurationManager.AppSettings["IdSis"].ToString());
                objEnAsignar.IP = HttpContext.Current.Request.UserHostAddress;
                objEnAsignar.OPR = "I";

                using (neAsignar objNe = new neAsignar())
                {
                    objCoResultadoDB = objNe.mantenimiento(objEnAsignar);

                    if (objCoResultadoDB.ID_TIPO == 0)
                    {
                        try
                        {
                            ThreadEnviarCorreo objEnviarCorreo = new ThreadEnviarCorreo(null, lstEnPersona, objEnDocElec, objEnAsignar.enDoc.ID_DOC);
                            Thread asyncWorker = new Thread(new ThreadStart(objEnviarCorreo.enviarCorreoGestionDocumento));
                            asyncWorker.Start();
                        }
                        catch (Exception ex)
                        {
                            objCoResultadoDB = new coResultadoDB()
                            {
                                ID_TIPO = 1,
                                DES_ERROR = ex.ToString()
                            };
                        }
                    }
                }

            }
            else
            {
                objCoResultadoDB.ID_TIPO = 1;
                objCoResultadoDB.DES_ERROR = "El estado del expediente ha cambiado. No se pudo asignar.";
            }

            return objCoResultadoDB;
        }
        #endregion
    }
}
