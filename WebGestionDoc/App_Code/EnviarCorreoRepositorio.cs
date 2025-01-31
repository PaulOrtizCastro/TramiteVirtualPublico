using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Mincetur.Administracion.AplTramiteVirtualPublico.CoTramiteVirtualPublico;
using Mincetur.Administracion.GeneralesUtil.EnGeneralesUtil;
using wcf = Mincetur.Administracion.AplTramiteVirtualPublico.Utilitarios.soap.ServicioGeneralUtil.Correo;
using wcfLog = Mincetur.Administracion.AplTramiteVirtualPublico.Utilitarios.soap.servicioGestorSeguridadLogError;


using System.Configuration;
using System.Threading;
using Mincetur.Administracion.AplTramiteVirtualPublico.NeTramiteVirtualPublico;
using Mincetur.Administracion.AplTramiteVirtualPublico.EnTramiteVirtualPublico;
using Mincetur.Administracion.AplTramiteVirtualPublico.Utilitarios.soap.Servicio.Correo;
using Mincetur.Administracion.AplTramiteVirtualPublico.Utilitarios;




namespace Mincetur.Administracion.AplGestionDoc.WebGestionDoc.App_Code
{
    public class EnviarCorreoRepositorio
    {
        public static coResultadoDB enviarCorreoGestionDocumento(List<enEstorg> objLstEstrog, List<enPersona> objLstPersona, enDocElec objEnDocElec, int idDoc)
        {
            coResultadoDB objResultadoDB = new coResultadoDB();
            //List<enPersona> objListPersonaRemite = new List<enPersona>();
            FormatoMovi WCFFormato = new FormatoMovi();
            Resultado WCFResultado = new Resultado();
            wcfLog.WCFSeguridadLog objSeguridadLog = new wcfLog.WCFSeguridadLog();

            try
            {
                using (WCFBorradorElectIntegracionEnviar WCFCorreo = new WCFBorradorElectIntegracionEnviar())
                {
                    if (!(objLstEstrog == null))
                    {
                        WCFFormato.IdDoc = idDoc;
                        WCFFormato.IdMoviAnt = objEnDocElec.ID_MOVI;
                        WCFFormato.IdMoviAntSpecified = true;
                        WCFFormato.lstMovi = new Movi[objLstEstrog.Count];

                        WCFFormato.EstorgRemite = new Estorg()
                        {
                            IdSub = objEnDocElec.ID_SUB,
                            IdSubSpecified = true,
                            IdSubofi = objEnDocElec.ID_SUBOFI
                        };


                        for (int i = 0; i < objLstEstrog.Count; i++)
                        {
                            WCFFormato.lstMovi[i] = new Movi
                            {
                                IdAccion = 1,
                                IdAccionSpecified = true,
                                Estorg = new Estorg
                                {
                                    IdSub = objLstEstrog[i].ID_SUB,
                                    IdSubSpecified = true,
                                    IdSubofi = objLstEstrog[i].ID_SUBOFI
                                },
                                DesObs = objLstEstrog[i].DES_SUBOFI
                            };
                        }

                        WCFFormato.IdUsu = objEnDocElec.ID_PERSONA;
                        WCFFormato.IdUsuSpecified = true;
                        WCFFormato.IdSis = int.Parse(ConfigurationManager.AppSettings["IdSis"]);
                        WCFFormato.IdSisSpecified = true;
                        WCFFormato.Ip = objEnDocElec.IP_CREA;
                        WCFFormato.Opr = "1";

                        WCFResultado = WCFCorreo.EnviarCorreoDocumento(WCFFormato);

                        objResultadoDB.ID_TIPO = WCFResultado.IdTipo;
                        objResultadoDB.DES_ERROR = WCFResultado.DesError;

                        objSeguridadLog.log(new wcfLog.enLogError()
                        {
                            ID_SIS = int.Parse(ConfigurationManager.AppSettings["IdSis"]),
                            ID_SISSpecified = true,
                            USU_CREA = WCFFormato.IdUsu,
                            USU_CREASpecified = true,
                            DES_PAGINAOBJETO = "enviarCorreoGetionDocumento - Derivación",
                            IP_CREA = WCFFormato.Ip,
                            DES_ERROR = WCFResultado.DesError,
                            COD_FUENTE = "S"
                        });
                    }
                    else if (!(objLstPersona == null))
                    {
                        WCFFormato.IdDoc = idDoc;
                        WCFFormato.EstorgRemite = new Estorg()
                        {
                            IdSub = objEnDocElec.ID_SUB,
                            IdSubSpecified = true,
                            IdSubofi = objEnDocElec.ID_SUBOFI
                        };

                        WCFFormato.lstMovi = new Movi[objLstPersona.Count];

                        for (int i = 0; i < objLstPersona.Count; i++)
                        {
                            WCFFormato.lstMovi[i] = new Movi
                            {
                                IdAccion = 4,
                                IdAccionSpecified = true,
                                IdMovi = objEnDocElec.ID_MOVI,
                                IdMoviSpecified = true,
                                Estorg = new Estorg
                                {
                                    IdSub = objLstPersona[i].ID_SUB,
                                    IdSubSpecified = true,
                                    IdSubofi = objLstPersona[i].ID_SUBOFI
                                },
                                IdUsuFunc = objLstPersona[i].ID_PERSONA,
                                IdUsuFuncSpecified = true,
                                DesObs = objLstPersona[i].DES_COMENT
                            };
                        }
                        WCFFormato.IdUsu = objEnDocElec.ID_USU;
                        WCFFormato.IdUsuSpecified = true;
                        WCFFormato.IdSis = int.Parse(ConfigurationManager.AppSettings["IdSis"]);
                        WCFFormato.IdSisSpecified = true;
                        WCFFormato.Ip = objEnDocElec.IP_CREA;
                        WCFFormato.Opr = "1";

                        WCFResultado = WCFCorreo.EnviarCorreoDocumento(WCFFormato);

                        objResultadoDB.ID_TIPO = WCFResultado.IdTipo;
                        objResultadoDB.DES_ERROR = WCFResultado.DesError;

                        objSeguridadLog.logAsync(new wcfLog.enLogError()
                        {
                            ID_SIS = int.Parse(System.Configuration.ConfigurationManager.AppSettings["IdSis"]),
                            ID_SISSpecified = true,
                            USU_CREA = WCFFormato.IdUsu,
                            USU_CREASpecified = true,
                            DES_PAGINAOBJETO = "enviarCorreoGestionDocumento - Asignación",
                            IP_CREA = WCFFormato.Ip,
                            DES_ERROR = WCFResultado.DesError,
                            COD_FUENTE = "S"
                        });
                    }
                    else
                    {
                        objResultadoDB.ID_TIPO = 1;
                        objResultadoDB.DES_ERROR = "Error al enviar correo";
                    }
                }
            }
            catch (Exception ex) {
                objResultadoDB.ID_TIPO = 1;
                objResultadoDB.DES_ERROR = "Error al enviar correo";
                objSeguridadLog.logAsync(new wcfLog.enLogError()
                {
                    ID_SIS = int.Parse(System.Configuration.ConfigurationManager.AppSettings["IdSis"]),
                    ID_SISSpecified = true,
                    USU_CREA = WCFFormato.IdUsu,
                    USU_CREASpecified = true,
                    DES_PAGINAOBJETO = "enviarCorreoGestionDocumento",
                    IP_CREA = WCFFormato.Ip,
                    DES_ERROR = ex.ToString(),
                    COD_FUENTE = "S"
                });
            }
            
            return objResultadoDB;
        }
        public static coResultadoDB enviarGestionDocumentoThread(List<enEstorg> objLstEstrog, List<enPersona> objLstPersona, enDocElec objEnDocElec, int idDoc)
        {
            try
            {
                ThreadEnviarCorreo objThread = new ThreadEnviarCorreo(objLstEstrog, objLstPersona, objEnDocElec, idDoc);
                Thread asyncWorker = new Thread(new ThreadStart(objThread.enviarCorreoGestionDocumento));
                asyncWorker.Start();
                return new coResultadoDB()
                {
                    ID_TIPO = 0,
                    DES_ERROR = "Se ha envíado correctamente"
                };
            }
            catch (Exception ex)
            {
                return new coResultadoDB()
                {
                    ID_TIPO = 1,
                    DES_ERROR = ex.ToString()
                };
            }
        }
    }
}