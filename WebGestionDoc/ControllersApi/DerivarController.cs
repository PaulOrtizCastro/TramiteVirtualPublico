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
using Mincetur.Administracion.AplTramiteVirtualPublico.Utilitarios;
using Mincetur.Administracion.AplGestionDoc.WebGestionDoc.App_Code;
using Mincetur.Administracion.GeneralesUtil.EnGeneralesUtil;
using System.Threading;

namespace Mincetur.Administracion.AplGestionDoc.WebGestionDoc.ControllersApi
{
    public class DerivarController : ApiController
    {
        //
        // GET: /Derivar/

        #region Consultas
        public int consultarTotalAsignaciones(enMovi objEn)
        {
            int total = 0;
            if (objEn.OPR == null)
            {
                objEn.OPR = "1";
            }

            using (neAsignar objNe = new neAsignar())
            {
                total = objNe.consultarTotalAsignaciones(objEn);
            }

            return total;
        }
        public int consultarExpeAnulado(enMovi objEn)
        {
            int total = 0;
            objEn.OPR = "3";

            using (neAsignar objNe = new neAsignar())
            {
                total = objNe.consultarTotalAsignaciones(objEn);
            }

            return total;
        }
        public int consultarExpeDerivado(enMovi objEn)
        {
            int total = 0;
            if (objEn.OPR == null)
            {
                objEn.OPR = "4";
            }

            using (neAsignar objNe = new neAsignar())
            {
                total = objNe.consultarTotalAsignaciones(objEn);
            }

            return total;
        }
        #endregion

        #region Mantenimiento
        public coResultadoDB actualizar(enDocElec objEnDocElec)
        {
            coResultadoDB objCoResultadoDB = new coResultadoDB() { ID_TIPO = 0, DES_ERROR = "Se derivó correctamente" };

            //VERIFICA EL ESTADO DEL EXPEDIENTE, ACCION 4 ASIGNAR, 1 DERIVAR
            bool indicador = new Validaciones().verificaEstadoExpe(objEnDocElec.ID_EXPE, objEnDocElec.ID_MOVI, objEnDocElec.ID_ACCION);

            if (indicador)
            {
                using (neDerivar objNe = new neDerivar())
                {
                    enAccion objEnAccion = new enAccion();
                    List<enEstorg> lstEnEstorg = new List<enEstorg>();
                    string strCantPlazo = "-1";
                    string strInserts = "";
                    string strfecCantPlazo = "NULL";
                    if (!(objEnDocElec.DESTINATARIOS == null))
                    {

                        foreach (enDocElecDestino item in objEnDocElec.DESTINATARIOS)
                        {
                            if (item.PLAZO > 0)
                            {
                                strCantPlazo = item.PLAZO.ToString();

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

                            enEstorg objEnEstorg = new enEstorg();
                            objEnEstorg.ID_SUB = item.ID_SUB;
                            objEnEstorg.ID_SUBOFI = item.ID_SUBOFI;
                            objEnEstorg.DES_SUBOFI = item.DES_OBS;
                            //ID_SUB, ID_SUBOFI,ID_PERSONA, DES_OBS, DES_COMENT, NUM_PLAZO, FEC_PLAZO, ID_TRATA, FLG_ORIGINAL, ID_ARCHIVO,  ID_PRIORI
                            strInserts = strInserts + string.Format("{0},'{1}',{2},'{3}','{4}',{5},{6},{7},{8},{9},{10}|",
                                item.ID_SUB,
                                item.ID_SUBOFI,
                                "NULL",
                                string.Empty,
                                item.DES_OBS.Replace("|", "&#124;"),
                                //item.PLAZO,
                                //(item.PLAZO == 0 || item.PLAZO == -1 ? "NULL" : "TRUNC(SYSDATE) + " + item.PLAZO),
                                strCantPlazo,
                                strfecCantPlazo,
                                item.ID_TRATA,
                                ConfigurationManager.AppSettings["flgOriginal"],
                                "NULL",
                                item.ID_PRIORIDAD
                                );
                            //strInserts = strInserts + item.ID_SUB + ",'" + item.ID_SUBOFI + "',NULL,'','" + item.DES_OBS.Replace("|", "&#124;") + "',0,NULL," + item.ID_PRIORIDAD + "," + item.ID_TRATA + ",NULL," + 1 + "|";
                            lstEnEstorg.Add(objEnEstorg);
                        }
                    }

                    //objEnAccion.ID_ACCION = 1;
                    objEnAccion.ID_ACCION = int.Parse(ConfigurationManager.AppSettings["idAccion"]);
                    objEnDocElec.INSERTS = strInserts;
                    objEnDocElec.ID_ANO_PROC = DateTime.Now.Year;
                    //objEnDocElec.ID_ESTADO = Convert.ToInt32(ConfigurationManager.AppSettings["idEstado"].ToString()); 
                    objEnDocElec.ID_ESTADO = Convert.ToInt32(ConfigurationManager.AppSettings["idEstadoDerivacion"]);


                    objEnDocElec.ID_USU = objEnDocElec.ID_PERSONA;
                    objEnDocElec.ID_SIS = Convert.ToInt32(ConfigurationManager.AppSettings["IdSis"].ToString());
                    objEnDocElec.IP_CREA = Util.obtenerIP();
                    objEnDocElec.enAccion = objEnAccion;
                    objEnDocElec.OPR = "I";
                    objCoResultadoDB = objNe.mantenimiento(objEnDocElec);
                    if (objCoResultadoDB.ID_TIPO == 0)
                    {
                        try
                        {
                            ThreadEnviarCorreo objEnviarCorreo = new ThreadEnviarCorreo(lstEnEstorg, null, objEnDocElec, objEnDocElec.ID_DOC);
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
                objCoResultadoDB.DES_ERROR = "El estado del expediente ha cambiado. No se pudo derivar.";
            }
            return objCoResultadoDB;
        }
        #endregion
    }
}
