using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Mincetur.Administracion.AplTramiteVirtualPublico.EnTramiteVirtualPublico;
using Mincetur.Administracion.AplTramiteVirtualPublico.CoTramiteVirtualPublico;
using Oracle.DataAccess.Client;
using Mincetur.Administracion.AplTramiteVirtualPublico.DaTramiteVirtualPublico.DataBaseHelpers;
using System.Data;

namespace Mincetur.Administracion.AplTramiteVirtualPublico.DaTramiteVirtualPublico
{
    public class daTrazabilidad : daBase
    {
        public enFormatoCorreo consultarCorreoRemite(enFormatoPlantilla objEnFormatoPlantilla)
        {
            enFormatoCorreo objEnFormatoCorreo = new enFormatoCorreo()
            {
                lstEnFormatoPersona = new List<enFormatoPersona>(),
                //coResultadoDB = new coResultadoDB() { ID_TIPO = 2, DES_ERROR = "No se encontró el formato del borrador" }
            };
            OracleParameter[] parameters = new OracleParameter[]{
                new OracleParameter("X_ID_BORRADOR",validarNulo(objEnFormatoPlantilla.ID_BORRADOR)),
                new OracleParameter("X_ID_VERSION",validarNulo(objEnFormatoPlantilla.ID_VERSION)),
                new OracleParameter("X_LINK_ADJ",validarNulo(objEnFormatoPlantilla.LINK_ADJ)),
                new OracleParameter("X_URL_EDITAR",validarNulo(objEnFormatoPlantilla.URL_EDITAR)),
                new OracleParameter("X_URL_DEVOLVER",validarNulo(objEnFormatoPlantilla.URL_DEVOLVER)),
                new OracleParameter("X_URL_PREAPROBAR",validarNulo(objEnFormatoPlantilla.URL_PREAPROBAR)),
                new OracleParameter("X_URL_APROBAR",validarNulo(objEnFormatoPlantilla.URL_APROBAR)),
                new OracleParameter("X_URL_GESTIONAR",validarNulo(objEnFormatoPlantilla.URL_GESTIONAR)),
                new OracleParameter("X_ID_USU",validarNulo(objEnFormatoPlantilla.ID_USU)),
                new OracleParameter("X_ID_SIS",validarNulo(objEnFormatoPlantilla.ID_SIS)),
                new OracleParameter("X_IP",validarNulo(objEnFormatoPlantilla.IP)),
                new OracleParameter("X_RESULTADO",OracleDbType.RefCursor, ParameterDirection.Output),
                new OracleParameter("X_ERROR",OracleDbType.RefCursor, ParameterDirection.Output)                
            };
            using (OracleConnection cn = new OracleConnection(this.CadenaConexion))
            {
                try
                {
                    using (OracleDataReader drReader = OracleHelper.ExecuteReader(cn, CommandType.StoredProcedure, "INSDBA.PKG_TDDUTIL.PRC_MANT_TDDCORREOS", parameters))
                    {
                        object[] arrResult = null;
                        if (drReader.HasRows)
                        {
                            arrResult = new object[drReader.FieldCount];
                            int intColIdPersona = drReader.GetOrdinal("ID_PERSONA");
                            int intColDesPersona = drReader.GetOrdinal("DES_PERSONA");
                            int intColCorreo = drReader.GetOrdinal("CORREO");
                            int intColAsunto = drReader.GetOrdinal("ASUNTO");
                            int intColContenido = drReader.GetOrdinal("CONTENIDO");
                            enFormatoPersona temp = null;
                            while (drReader.Read())
                            {
                                drReader.GetValues(arrResult);
                                temp = new enFormatoPersona();
                                if (!drReader.IsDBNull(intColIdPersona)) temp.ID_PERSONA = int.Parse(arrResult[intColIdPersona].ToString());
                                if (!drReader.IsDBNull(intColDesPersona)) temp.DES_PERSONA = arrResult[intColDesPersona].ToString();
                                if (!drReader.IsDBNull(intColCorreo)) temp.CORREO = arrResult[intColCorreo].ToString();
                                if (!drReader.IsDBNull(intColAsunto)) temp.ASUNTO = arrResult[intColAsunto].ToString();
                                if (!drReader.IsDBNull(intColContenido)) temp.CONTENIDO = arrResult[intColContenido].ToString();
                                objEnFormatoCorreo.lstEnFormatoPersona.Add(temp);
                            }
                        }
                        //rReader.NextResult();

                        //if (drReader.HasRows)
                        //{
                        //    if (drReader.Read())
                        //    {
                        //        if (!drReader.IsDBNull(drReader.GetOrdinal("ID_TIPO"))) objEnFormatoCorreo.coResultadoDB.ID_TIPO = int.Parse(drReader["ID_TIPO"].ToString());
                        //        if (!drReader.IsDBNull(drReader.GetOrdinal("ID_ERROR"))) objEnFormatoCorreo.coResultadoDB.ID_ERROR = drReader["ID_ERROR"].ToString();
                        //        if (!drReader.IsDBNull(drReader.GetOrdinal("DES_ERROR"))) objEnFormatoCorreo.coResultadoDB.DES_ERROR = drReader["DES_ERROR"].ToString();
                        //        if (!drReader.IsDBNull(drReader.GetOrdinal("VALOR"))) objEnFormatoCorreo.coResultadoDB.VALOR = drReader["VALOR"].ToString();
                        //    }
                        //}
                        //drReader.Close();
                    }

                }
                catch (Exception ex)
                {
                    throw ex;
                }
                finally
                {
                    if (cn.State != ConnectionState.Closed) cn.Close();
                }
            }
            return objEnFormatoCorreo;
        }


        public List<enTrazabilidad> traeTrazabilidadBorrador(enTrazabilidad objEnTrazabilidad)
        {

            List<enTrazabilidad> list = new List<enTrazabilidad>();

            OracleParameter[] parameters = new OracleParameter[]{
                    new OracleParameter("X_ID_BORRADOR", validarNulo(objEnTrazabilidad.ID_BORRADOR)),
                    new OracleParameter("X_ID_VERSION", validarNulo(objEnTrazabilidad.ID_VERSION)),
                    new OracleParameter("X_ID_TRAZABILIDAD", validarNulo(objEnTrazabilidad.ID_TRAZABILIDAD)),
                    new OracleParameter("X_ID_ESTADO", validarNulo(objEnTrazabilidad.ID_ESTADO)),
                    new OracleParameter("X_ID_SUB", validarNulo(objEnTrazabilidad.ID_SUB)),
                    new OracleParameter("X_ID_SUBOFI", validarNulo(objEnTrazabilidad.ID_SUBOFI)),
                    new OracleParameter("X_ID_PERSONA", validarNulo(objEnTrazabilidad.ID_PERSONA)),
                    new OracleParameter("X_DES_OBS", validarNulo(objEnTrazabilidad.DES_OBS)),
                    new OracleParameter("X_FLG_TRAZABILIDAD", validarNulo(objEnTrazabilidad.FLG_TRAZABILIDAD)),
                    new OracleParameter("X_NUM_ORDEN", validarNulo(objEnTrazabilidad.NUM_ORDEN)),
                    new OracleParameter("X_FEC_INI", validarNulo(objEnTrazabilidad.FEC_INI)),
                    new OracleParameter("X_FEC_FIN", validarNulo(objEnTrazabilidad.FEC_FIN)),
                    new OracleParameter("X_FLG_EST", validarNulo(objEnTrazabilidad.FLG_EST)),
                    new OracleParameter("X_IP", validarNulo(objEnTrazabilidad.IP)),
                    new OracleParameter("X_ID_USU", validarNulo(objEnTrazabilidad.ID_USU)),
                    new OracleParameter("X_DATO", validarNulo(objEnTrazabilidad.DATO)),
                    new OracleParameter("X_OPR", validarNulo(objEnTrazabilidad.OPR)),
                    new OracleParameter("X_CURSORS", OracleDbType.RefCursor, ParameterDirection.Output)
                };

            using (OracleConnection cn = new OracleConnection(this.CadenaConexion))
            {

                try
                {
                    using (OracleDataReader drReader = OracleHelper.ExecuteReader(cn, CommandType.StoredProcedure, "INSDBA.PKG_TDDCONSU.PRC_CONS_TDD2TRAZABILIDAD", parameters))
                    {
                        object[] arrResult = null;
                        if (drReader.HasRows)
                        {
                            enTrazabilidad objEnPivot;
                            arrResult = new object[drReader.FieldCount];

                            int intColIdBorrador = drReader.GetOrdinal("ID_BORRADOR");
                            int intColIdVersion = drReader.GetOrdinal("ID_VERSION");
                            int intColIdTrazabilidad = drReader.GetOrdinal("ID_TRAZABILIDAD");
                            int intColIdEstado = drReader.GetOrdinal("ID_ESTADO");
                            int intColAbrEstado = drReader.GetOrdinal("ABR_ESTADO");
                            int intColIdSub = drReader.GetOrdinal("ID_SUB");
                            int intColIdSubofi = drReader.GetOrdinal("ID_SUBOFI");
                            int intColDesSubofi = drReader.GetOrdinal("DES_SUBOFI");
                            int intColAbrSubofi = drReader.GetOrdinal("ABR_SUBOFI");
                            int intColIdPersona = drReader.GetOrdinal("ID_PERSONA");
                            int intColCodLogPersona = drReader.GetOrdinal("COD_LOG_PERSONA");
                            int intColDesObs = drReader.GetOrdinal("DES_OBS");
                            int intColFecIni = drReader.GetOrdinal("FEC_INI");
                            int intColFecFin = drReader.GetOrdinal("FEC_FIN");
                            int intColFlgEst = drReader.GetOrdinal("FLG_EST");
                            int intColIpCrea = drReader.GetOrdinal("IP_CREA");
                            int intColUsuCrea = drReader.GetOrdinal("USU_CREA");
                            int intColFecCrea = drReader.GetOrdinal("FEC_CREA");
                            int intColIpModi = drReader.GetOrdinal("IP_MODI");
                            int intColUsuModi = drReader.GetOrdinal("USU_MODI");
                            int intColFecModi = drReader.GetOrdinal("FEC_MODI");
                            int intColFlgTrazabilidad = drReader.GetOrdinal("FLG_TRAZABILIDAD");
                            int intColNumOrden = drReader.GetOrdinal("NUM_ORDEN");
                            int intColIdEstadoAnt = drReader.GetOrdinal("ID_ESTADO_ANT");
                            int intColFlgAprueba = drReader.GetOrdinal("FLG_APRUEBA");
                            int intColFlgUsuActivo = drReader.GetOrdinal("FLG_USU_ACTIVO");

                            while (drReader.Read())
                            {
                                drReader.GetValues(arrResult);
                                objEnPivot = new enTrazabilidad();

                                if (!drReader.IsDBNull(intColIdBorrador)) objEnPivot.ID_BORRADOR = int.Parse(arrResult[intColIdBorrador].ToString());
                                if (!drReader.IsDBNull(intColIdVersion)) objEnPivot.ID_VERSION = int.Parse(arrResult[intColIdVersion].ToString());
                                if (!drReader.IsDBNull(intColIdTrazabilidad)) objEnPivot.ID_TRAZABILIDAD = int.Parse(arrResult[intColIdTrazabilidad].ToString());
                                if (!drReader.IsDBNull(intColIdEstado)) objEnPivot.ID_ESTADO = int.Parse(arrResult[intColIdEstado].ToString());
                                if (!drReader.IsDBNull(intColAbrEstado)) objEnPivot.ABR_ESTADO = arrResult[intColAbrEstado].ToString();
                                if (!drReader.IsDBNull(intColIdSub)) objEnPivot.ID_SUB = int.Parse(arrResult[intColIdSub].ToString());
                                if (!drReader.IsDBNull(intColIdSubofi)) objEnPivot.ID_SUBOFI = arrResult[intColIdSubofi].ToString();
                                if (!drReader.IsDBNull(intColDesSubofi)) objEnPivot.DES_SUBOFI = arrResult[intColDesSubofi].ToString();
                                if (!drReader.IsDBNull(intColAbrSubofi)) objEnPivot.ABR_SUBOFI = arrResult[intColAbrSubofi].ToString();
                                if (!drReader.IsDBNull(intColIdPersona)) objEnPivot.ID_PERSONA = int.Parse(arrResult[intColIdPersona].ToString());
                                if (!drReader.IsDBNull(intColCodLogPersona)) objEnPivot.COD_LOG = arrResult[intColCodLogPersona].ToString();
                                if (!drReader.IsDBNull(intColDesObs)) objEnPivot.DES_OBS = arrResult[intColDesObs].ToString();
                                if (!drReader.IsDBNull(intColFecIni)) objEnPivot.FEC_INI = DateTime.Parse(arrResult[intColFecIni].ToString());
                                if (!drReader.IsDBNull(intColFecFin)) objEnPivot.FEC_VIGE = DateTime.Parse(arrResult[intColFecFin].ToString());
                                if (!drReader.IsDBNull(intColFlgEst)) objEnPivot.FLG_EST = int.Parse(arrResult[intColFlgEst].ToString());
                                if (!drReader.IsDBNull(intColIpCrea)) objEnPivot.IP = arrResult[intColIpCrea].ToString();
                                if (!drReader.IsDBNull(intColUsuCrea)) objEnPivot.USU_CREA = int.Parse(arrResult[intColUsuCrea].ToString());
                                if (!drReader.IsDBNull(intColFecCrea)) objEnPivot.FEC_REG = DateTime.Parse(arrResult[intColFecCrea].ToString());
                                if (!drReader.IsDBNull(intColUsuModi)) objEnPivot.USU_MODI = int.Parse(arrResult[intColUsuModi].ToString());
                                if (!drReader.IsDBNull(intColFecModi)) objEnPivot.FEC_MODI = DateTime.Parse(arrResult[intColFecModi].ToString());
                                if (!drReader.IsDBNull(intColFlgTrazabilidad)) objEnPivot.FLG_TRAZABILIDAD = int.Parse(arrResult[intColFlgTrazabilidad].ToString());
                                if (!drReader.IsDBNull(intColNumOrden)) objEnPivot.NUM_ORDEN = int.Parse(arrResult[intColNumOrden].ToString());
                                if (!drReader.IsDBNull(intColIdEstadoAnt)) objEnPivot.ID_ESTADO_ANT = int.Parse(arrResult[intColIdEstadoAnt].ToString());
                                if (!drReader.IsDBNull(intColFlgAprueba)) objEnPivot.FLG_APRUEBA = int.Parse(arrResult[intColFlgAprueba].ToString());
                                if (!drReader.IsDBNull(intColFlgUsuActivo)) objEnPivot.FLG_USU_ACTIVO = int.Parse(arrResult[intColFlgUsuActivo].ToString());
                                list.Add(objEnPivot);
                            }
                        }
                    }
                }
                catch (Exception ex)
                {
                    throw ex;
                }
                finally
                {
                    if (cn.State != ConnectionState.Closed) cn.Close();
                }
            }
            return list;
        }


        public string traeCorrelativoBorrador(enBorrador objEnBorrador)
        {

            string strRpt = "";
            OracleCommand cmd = new OracleCommand("SELECT INSDBA.PKG_TDDCONSU.FNC_OBTIENE_BORRADOR(:X_ID_DOC, :X_ID_EXPE, :X_ID_MOVI, :X_DATO, :X_OPR) FROM DUAL");

            cmd.CommandType = CommandType.Text;
            cmd.Parameters.Add(new OracleParameter("X_ID_DOC", validarNulo(objEnBorrador.ID_DOC)));
            cmd.Parameters.Add(new OracleParameter("X_ID_EXPE", validarNulo(objEnBorrador.ID_EXPE)));
            cmd.Parameters.Add(new OracleParameter("X_ID_MOVI", validarNulo(objEnBorrador.ID_MOVI)));
            cmd.Parameters.Add(new OracleParameter("X_DATO", validarNulo(objEnBorrador.DATO)));
            cmd.Parameters.Add(new OracleParameter("X_OPR", validarNulo(objEnBorrador.OPR)));

            using (OracleConnection cn = new OracleConnection(this.CadenaConexion))
            {
                try
                {
                    try
                    {
                        cn.Open();
                        cmd.Connection = cn;
                        object Pivot = cmd.ExecuteScalar();
                        if (Pivot != null) strRpt = Pivot.ToString();
                    }
                    catch (Exception ex)
                    {
                        throw ex;
                    }
                    finally
                    {
                        cn.Close();
                        GC.SuppressFinalize(cn);
                    }

                }
                catch (Exception ex)
                {
                    throw ex;
                }
                finally
                {
                    if (cn.State != ConnectionState.Closed) cn.Close();
                }
            }
            return strRpt;
        }
    }
}
