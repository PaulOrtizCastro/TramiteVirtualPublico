using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Oracle.DataAccess.Client;
using System.Data;
using Mincetur.Administracion.AplTramiteVirtualPublico.DaTramiteVirtualPublico.DataBaseHelpers;
using Mincetur.Administracion.AplTramiteVirtualPublico.EnTramiteVirtualPublico;
using Mincetur.Administracion.GeneralesUtil.EnGeneralesUtil;
using Mincetur.Administracion.AplTramiteVirtualPublico.CoTramiteVirtualPublico;
using Mincetur.Administracion.Seguridad.EnSeguridad;

namespace Mincetur.Administracion.AplTramiteVirtualPublico.DaTramiteVirtualPublico
{
    public class daAsignar : daBase
    {
        public List<enPersona> consultarFuncionarios(enPersona enObj)
        {
            List<enPersona> listUsuPivot = new List<enPersona>();

            OracleParameter[] parameters = new OracleParameter[]{
                new OracleParameter("X_ID_PERSONA",validarNulo(enObj.ID_PERSONA)),
                new OracleParameter("X_NOMBRES",validarNulo(enObj.NOMBRECOMPLETO)),
                new OracleParameter("X_APE_PATER",validarNulo(enObj.APE_PATER)),
                new OracleParameter("X_APE_MATER",validarNulo(enObj.APE_MATER)),
                new OracleParameter("X_ID_SUB",validarNulo(enObj.enEstorg, "ID_SUB")),
                new OracleParameter("X_ID_SUBOFI",validarNulo(enObj.enEstorg, "ID_SUBOFI")),
                new OracleParameter("X_ID_CARGOFUN",null),
                new OracleParameter("X_ID_SUBCARGO",null),
                new OracleParameter("X_ANEXO",null),
                new OracleParameter("X_CORREO",null),
                new OracleParameter("X_ID_PISO",null),
                new OracleParameter("X_DATO","1"),
                new OracleParameter("X_OPR",3),
                new OracleParameter("X_CURSORS",OracleDbType.RefCursor, ParameterDirection.Output)
            };

            using (OracleConnection cn = new OracleConnection(this.CadenaConexion))
            {
                try
                {
                    using (OracleDataReader drReader = OracleHelper.ExecuteReader(cn, CommandType.StoredProcedure, "INSDBA.PKG_DPCONSU.PRC_DPFUNCIONARIO", parameters))
                    {
                        object[] arrResult = null;
                        if (drReader.HasRows)
                        {
                            arrResult = new object[drReader.FieldCount];

                            int intColIdPersona = drReader.GetOrdinal("ID_PERSONA");
                            int intColIdNomFunc = drReader.GetOrdinal("NOMFUNC");
                            int intColIdApePater = drReader.GetOrdinal("APE_PATER");
                            int intColIdApeMater = drReader.GetOrdinal("APE_MATER");
                            int intColIdNombres = drReader.GetOrdinal("NOMBRES");
                            int intColIdCodLog = drReader.GetOrdinal("COD_LOG");
                            int intColIdSub = drReader.GetOrdinal("ID_SUB");
                            int intColIdSubOfi = drReader.GetOrdinal("ID_SUBOFI");
                            int intColIdDesSubOfi = drReader.GetOrdinal("DES_SUBOFI");
                            int intColIdAbrSubOfi = drReader.GetOrdinal("ABR_SUBOFI");
                            int intColIdCargoFun = drReader.GetOrdinal("ID_CARGOFUN");
                            int intColIdDesCargoFun = drReader.GetOrdinal("DES_CARGOFUN");

                            enPersona tempEnPersona = new enPersona();
                            enEstorg tempEnEstorg = new enEstorg();

                            while (drReader.Read())
                            {
                                drReader.GetValues(arrResult);
                                tempEnPersona = new enPersona();
                                tempEnEstorg = new enEstorg();

                                if (!drReader.IsDBNull(intColIdPersona)) tempEnPersona.ID_PERSONA = int.Parse(arrResult[intColIdPersona].ToString());
                                if (!drReader.IsDBNull(intColIdNomFunc)) tempEnPersona.NOMFUNC = arrResult[intColIdNomFunc].ToString();
                                if (!drReader.IsDBNull(intColIdApePater)) tempEnPersona.APE_PATER = arrResult[intColIdApePater].ToString();
                                if (!drReader.IsDBNull(intColIdApeMater)) tempEnPersona.APE_MATER = arrResult[intColIdApeMater].ToString();
                                if (!drReader.IsDBNull(intColIdNombres)) tempEnPersona.NOMBRECOMPLETO = arrResult[intColIdNombres].ToString();
                                if (!drReader.IsDBNull(intColIdCodLog)) tempEnPersona.COD_LOG = arrResult[intColIdCodLog].ToString();
                                if (!drReader.IsDBNull(intColIdSub)) tempEnEstorg.ID_SUB = int.Parse(arrResult[intColIdSub].ToString());
                                if (!drReader.IsDBNull(intColIdSubOfi)) tempEnEstorg.ID_SUBOFI = arrResult[intColIdSubOfi].ToString();
                                if (!drReader.IsDBNull(intColIdDesSubOfi)) tempEnEstorg.DES_SUBOFI = arrResult[intColIdDesSubOfi].ToString();
                                if (!drReader.IsDBNull(intColIdAbrSubOfi)) tempEnEstorg.ABR_SUBOFI = arrResult[intColIdAbrSubOfi].ToString();
                                if (!drReader.IsDBNull(intColIdCargoFun)) tempEnPersona.ID_CARGOFUN = int.Parse(arrResult[intColIdCargoFun].ToString());
                                if (!drReader.IsDBNull(intColIdDesCargoFun)) tempEnPersona.DES_CARGOFUN = arrResult[intColIdDesCargoFun].ToString();

                                tempEnPersona.enEstorg = tempEnEstorg;
                                listUsuPivot.Add(tempEnPersona);
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

            return listUsuPivot;
        }
        
        public List<enPersona> consultarFuncionariosPorOficina(enPersona enObj)
        {
            List<enPersona> listUsuPivot = new List<enPersona>();

            OracleParameter[] parameters = new OracleParameter[]{
                new OracleParameter("X_ID_USU",validarNulo(enObj.ID_PERSONA)),
                new OracleParameter("X_NOMFUN",validarNulo(enObj.NOMBRECOMPLETO)),
                new OracleParameter("X_ID_SUB",validarNulo(enObj.enEstorg, "ID_SUB")),
                new OracleParameter("X_ID_SUBOFI",validarNulo(enObj.enEstorg, "ID_SUBOFI")),
                new OracleParameter("X_DATO",null),
                new OracleParameter("X_OPR",1),
                new OracleParameter("X_CURSORS",OracleDbType.RefCursor, ParameterDirection.Output)
            };

            using (OracleConnection cn = new OracleConnection(this.CadenaConexion))
            {
                try
                {
                    using (OracleDataReader drReader = OracleHelper.ExecuteReader(cn, CommandType.StoredProcedure, "INSDBA.PKG_TDDCONSU.PRC_SEL_FUNCIONARIO", parameters))                    
                    {
                        object[] arrResult = null;
                        if (drReader.HasRows)
                        {
                            arrResult = new object[drReader.FieldCount];

                            int intColIdPersona = drReader.GetOrdinal("ID_PERSONA");
                            int intColIdNombres = drReader.GetOrdinal("NOMBRES");
                            int intColIdApePater = drReader.GetOrdinal("APE_PATER");
                            int intColIdApeMater = drReader.GetOrdinal("APE_MATER");
                            int intColIdNomFunc = drReader.GetOrdinal("NOMFUNC");
                            int intColIdCodLog = drReader.GetOrdinal("COD_LOG");
                            int intColIdSub = drReader.GetOrdinal("ID_SUB");
                            int intColIdSubOfi = drReader.GetOrdinal("ID_SUBOFI");
                            int intColIdDesSubOfi = drReader.GetOrdinal("DES_SUBOFI");
                            int intColIdAbrSubOfi = drReader.GetOrdinal("ABR_SUBOFI");
                            int intColIdDesCargoFun = drReader.GetOrdinal("DES_CARGOFUN");
                            int intColIdCorreo = drReader.GetOrdinal("CORREO");

                            enPersona tempEnPersona = new enPersona();
                            enEstorg tempEnEstorg = new enEstorg();

                            while (drReader.Read())
                            {
                                drReader.GetValues(arrResult);
                                tempEnPersona = new enPersona();
                                tempEnEstorg = new enEstorg();

                                if (!drReader.IsDBNull(intColIdPersona)) tempEnPersona.ID_PERSONA = int.Parse(arrResult[intColIdPersona].ToString());
                                if (!drReader.IsDBNull(intColIdNomFunc)) tempEnPersona.NOMFUNC = arrResult[intColIdNomFunc].ToString();
                                if (!drReader.IsDBNull(intColIdApePater)) tempEnPersona.APE_PATER = arrResult[intColIdApePater].ToString();
                                if (!drReader.IsDBNull(intColIdApeMater)) tempEnPersona.APE_MATER = arrResult[intColIdApeMater].ToString();
                                if (!drReader.IsDBNull(intColIdNombres)) tempEnPersona.NOMBRECOMPLETO = arrResult[intColIdNombres].ToString();
                                if (!drReader.IsDBNull(intColIdCodLog)) tempEnPersona.COD_LOG = arrResult[intColIdCodLog].ToString();
                                if (!drReader.IsDBNull(intColIdSub)) tempEnEstorg.ID_SUB = int.Parse(arrResult[intColIdSub].ToString());
                                if (!drReader.IsDBNull(intColIdSubOfi)) tempEnEstorg.ID_SUBOFI = arrResult[intColIdSubOfi].ToString();
                                if (!drReader.IsDBNull(intColIdDesSubOfi)) tempEnEstorg.DES_SUBOFI = arrResult[intColIdDesSubOfi].ToString();
                                if (!drReader.IsDBNull(intColIdAbrSubOfi)) tempEnEstorg.ABR_SUBOFI = arrResult[intColIdAbrSubOfi].ToString();                                
                                if (!drReader.IsDBNull(intColIdDesCargoFun)) tempEnPersona.DES_CARGOFUN = arrResult[intColIdDesCargoFun].ToString();
                                if (!drReader.IsDBNull(intColIdCorreo)) tempEnPersona.CORREO = arrResult[intColIdCorreo].ToString();

                                tempEnPersona.enEstorg = tempEnEstorg;
                                listUsuPivot.Add(tempEnPersona);
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

            return listUsuPivot;
        }

        public List<enAsignar> consultarListaFuncionariosAsignados(enAsignar enObj)
        {
            List<enAsignar> listAsignacionPivot = new List<enAsignar>();

            OracleParameter[] parameters = new OracleParameter[]{
                new OracleParameter("X_ID_EXPE",validarNulo(enObj.enExpe, "ID_EXPE")),
                new OracleParameter("X_ID_MOVI",validarNulo(enObj.enMovi, "ID_MOVI")),
                new OracleParameter("X_ID_ASIGNA",validarNulo(enObj, "ID_ASIGNA")),
                new OracleParameter("X_ID_USU_FUNC",validarNulo(enObj.enUsu, "CodUsu")),
                new OracleParameter("X_FUNCIONARIO",validarNulo(enObj.enUsu, "NOM_USU")),
                new OracleParameter("X_ID_TIP_DOC",null),
                new OracleParameter("X_ID_SUB",validarNulo(enObj.enEstorg, "ID_SUB")),
                new OracleParameter("X_ID_SUBOFI",validarNulo(enObj.enEstorg, "ID_SUBOFI")),
                new OracleParameter("X_NUM_DOC",null),
                new OracleParameter("X_ID_ESTADO",validarNulo(enObj.ID_ESTADO)),
                new OracleParameter("X_FEC_RESP",null),
                new OracleParameter("X_FEC_INI",null),
                new OracleParameter("X_ID_TRATA",null),
                new OracleParameter("X_ID_PRIORI",null),
                new OracleParameter("X_FLG_ORIGINAL",null),
                new OracleParameter("X_FEC_PLAZO",null),
                new OracleParameter("X_DES_OBS",null),
                new OracleParameter("X_DES_OBS_RESP",null),
                new OracleParameter("X_ID_ANO_PROC",null),
                new OracleParameter("X_SEMAFORO",null),
                new OracleParameter("X_ID_USU_AUDIT",null),
                new OracleParameter("X_ID_SIS",null),
                new OracleParameter("X_IP",null),                
                new OracleParameter("X_OPR",1),
                new OracleParameter("CURSORS",OracleDbType.RefCursor, ParameterDirection.Output)
            };

            using (OracleConnection cn = new OracleConnection(this.CadenaConexion))
            {
                try
                {
                    using (OracleDataReader drReader = OracleHelper.ExecuteReader(cn, CommandType.StoredProcedure, "INSDBA.PKG_TDOCONSU.PRC_CONS_TDO2ASIGNA", parameters))
                    {
                        object[] arrResult = null;
                        if (drReader.HasRows)
                        {
                            arrResult = new object[drReader.FieldCount];

                            int intColIdExpe = drReader.GetOrdinal("ID_EXPE");
                            int intColIdIdMovi = drReader.GetOrdinal("ID_MOVI");
                            int intColIdSub = drReader.GetOrdinal("ID_SUB");
                            int intColIdSubOfi = drReader.GetOrdinal("ID_SUBOFI");
                            int intColIdFuncionario = drReader.GetOrdinal("FUNCIONARIO");
                            int intColIdDesTrata = drReader.GetOrdinal("DES_TRATA");
                            int intColIdDesEstado = drReader.GetOrdinal("DES_ESTADO");
                            int intColIdEstado = drReader.GetOrdinal("ID_ESTADO");
                            int intColIdDesObsResp = drReader.GetOrdinal("DES_OBS_RESP");
                            int intColIdDesObsDocDerivado = drReader.GetOrdinal("DES_OBS_DOC_DERIVADO");
                            int intColIdFecIni = drReader.GetOrdinal("FEC_INI");
                            int intColIdFecPlazo = drReader.GetOrdinal("FEC_PLAZO");
                            int intColIdDesPlazo = drReader.GetOrdinal("DES_PLAZO");
                            int intColIdDoc = drReader.GetOrdinal("ID_DOC");
                            int intColIdDocResp = drReader.GetOrdinal("ID_DOC_RESP");
                            int intColIdAsigna = drReader.GetOrdinal("ID_ASIGNA");
                            int intColIdUsuFunc = drReader.GetOrdinal("ID_USU_FUNC");
                            int intColIdOrigen = drReader.GetOrdinal("ID_ORIGEN");
                            int intColIdDesDeriva = drReader.GetOrdinal("DES_DERIVA");
                            int intColIdDesPersona = drReader.GetOrdinal("DES_PERSONA");
                            int intColIdSubRemite = drReader.GetOrdinal("ID_SUB_REMITE");
                            int intColIdSubOfiRemite = drReader.GetOrdinal("ID_SUBOFI_REMITE");
                            int intColIdIPriori = drReader.GetOrdinal("ID_PRIORI");
                            int intColIdDesPriori = drReader.GetOrdinal("DES_PRIORI");
                            int intColIdTrata = drReader.GetOrdinal("ID_TRATA");
                            int intColIdDesAsunto = drReader.GetOrdinal("DES_ASUNTO");
                            int intColIdTipDocDerivado = drReader.GetOrdinal("ID_TIP_DOC_DERIVADO");
                            int intColIdDesTipDocDerivado = drReader.GetOrdinal("DES_TIP_DOC_DERIVADO");
                            int intColIdDesDocDerivado = drReader.GetOrdinal("DES_DOC_DERIVADO");
                            int intColIdFlgOriginal = drReader.GetOrdinal("FLG_ORIGINAL");
                            int intColIdFesResp = drReader.GetOrdinal("FEC_RESP");
                            int intColIdTipDocAsignado = drReader.GetOrdinal("TIP_DOC_ASIGNACION");
                            int intColIdDocAsignacion = drReader.GetOrdinal("DOC_ASIGNACION");
                            int intColIdNumAsignacion = drReader.GetOrdinal("NUM_ASIGNACION");
                            int intColIdTipRespAsignacion = drReader.GetOrdinal("TIP_RESP_ASIGNACION");
                            int intColIdDesClasif = drReader.GetOrdinal("DES_CLASIF");
                            int intColIdSemaforo = drReader.GetOrdinal("SEMAFORO");
                            int intColIdFecModi = drReader.GetOrdinal("FEC_MODI");
                            int intColID_USU_FUNC = drReader.GetOrdinal("ID_USU_FUNC");
                            int intColFUNCIONARIO = drReader.GetOrdinal("FUNCIONARIO");


                            enAsignar tempEnAsignarPivot = new enAsignar();
                            enExpe tempEnExpe = new enExpe();
                            enMovi tempEnMovi = new enMovi();
                            enPersona tempEnPersona = new enPersona();
                            enEstorg tempEnEstorg = new enEstorg();
                            enTrata tempEnTrata = new enTrata();
                            enEstado tempEnEstado = new enEstado();

                            enDoc tempEnDoc = new enDoc();
                            enDoc tempEnDocResp = new enDoc();
                            enOrigen tempEnOrigen = new enOrigen();
                            enPriori tempEnPriori = new enPriori();
                            enTipDoc tempEnTipDocDerivado = new enTipDoc();
                            enTipDoc tempEnTipDocAsignado = new enTipDoc();

                            enUsu tempEnUsu = new enUsu();


                            while (drReader.Read())
                            {
                                drReader.GetValues(arrResult);
                                tempEnAsignarPivot = new enAsignar();
                                tempEnExpe = new enExpe();
                                tempEnMovi = new enMovi();
                                tempEnPersona = new enPersona();
                                tempEnEstorg = new enEstorg();
                                tempEnTrata = new enTrata();
                                tempEnEstado = new enEstado();
                                tempEnDoc = new enDoc();
                                tempEnDocResp = new enDoc();
                                tempEnOrigen = new enOrigen();
                                tempEnPriori = new enPriori();
                                tempEnTipDocDerivado = new enTipDoc();
                                tempEnTipDocAsignado = new enTipDoc();
                                tempEnUsu = new enUsu();


                                if (!drReader.IsDBNull(intColIdExpe)) tempEnExpe.ID_EXPE = int.Parse(arrResult[intColIdExpe].ToString());
                                if (!drReader.IsDBNull(intColIdIdMovi)) tempEnMovi.ID_MOVI = int.Parse(arrResult[intColIdIdMovi].ToString());
                                if (!drReader.IsDBNull(intColIdSub)) tempEnEstorg.ID_SUB = int.Parse(arrResult[intColIdSub].ToString());
                                if (!drReader.IsDBNull(intColIdSubOfi)) tempEnEstorg.ID_SUBOFI = arrResult[intColIdSubOfi].ToString();
                                if (!drReader.IsDBNull(intColIdFuncionario)) tempEnPersona.NOMFUNC = arrResult[intColIdFuncionario].ToString();
                                if (!drReader.IsDBNull(intColIdDesTrata)) tempEnTrata.DES_TRATAMIENTO = arrResult[intColIdDesTrata].ToString();
                                if (!drReader.IsDBNull(intColIdDesEstado)) tempEnEstado.DES_ESTADO = arrResult[intColIdDesEstado].ToString();
                                if (!drReader.IsDBNull(intColIdEstado)) tempEnEstado.ID_ESTADO = int.Parse(arrResult[intColIdEstado].ToString());
                                if (!drReader.IsDBNull(intColIdDesObsResp)) tempEnAsignarPivot.DES_OBS_RESP = arrResult[intColIdDesObsResp].ToString();
                                if (!drReader.IsDBNull(intColIdDesObsDocDerivado)) tempEnAsignarPivot.DES_OBS_DOC_DERIVADO = arrResult[intColIdDesObsDocDerivado].ToString();
                                if (!drReader.IsDBNull(intColIdFecIni)) tempEnAsignarPivot.FEC_CREA = DateTime.Parse(arrResult[intColIdFecIni].ToString());
                                if (!drReader.IsDBNull(intColIdFecPlazo)) tempEnAsignarPivot.FEC_PLAZO = DateTime.Parse(arrResult[intColIdFecPlazo].ToString());
                                if (!drReader.IsDBNull(intColIdDesPlazo)) tempEnAsignarPivot.DES_PLAZO = arrResult[intColIdDesPlazo].ToString();
                                if (!drReader.IsDBNull(intColIdDoc)) tempEnDoc.ID_DOC = int.Parse(arrResult[intColIdDoc].ToString());
                                if (!drReader.IsDBNull(intColIdDocResp)) tempEnDocResp.ID_DOC = int.Parse(arrResult[intColIdDocResp].ToString());
                                if (!drReader.IsDBNull(intColIdAsigna)) tempEnAsignarPivot.ID_ASIGNA = int.Parse(arrResult[intColIdAsigna].ToString());
                                if (!drReader.IsDBNull(intColIdUsuFunc)) tempEnAsignarPivot.ID_USU_FUNC = int.Parse(arrResult[intColIdUsuFunc].ToString());
                                if (!drReader.IsDBNull(intColIdOrigen)) tempEnOrigen.ID_ORIGEN = int.Parse(arrResult[intColIdOrigen].ToString());
                                if (!drReader.IsDBNull(intColIdDesPriori)) tempEnPriori.DES_PRIORI = arrResult[intColIdDesPriori].ToString();
                                if (!drReader.IsDBNull(intColIdIPriori)) tempEnPriori.ID_PRIORI = int.Parse(arrResult[intColIdIPriori].ToString());
                                if (!drReader.IsDBNull(intColIdDesAsunto)) tempEnAsignarPivot.DES_ASUNTO = arrResult[intColIdDesAsunto].ToString();
                                if (!drReader.IsDBNull(intColIdTipDocDerivado)) tempEnTipDocDerivado.ID_TIP_DOC = int.Parse(arrResult[intColIdTipDocDerivado].ToString());
                                if (!drReader.IsDBNull(intColIdDesTipDocDerivado)) tempEnTipDocDerivado.DES_TIP_DOC = arrResult[intColIdDesTipDocDerivado].ToString();
                                if (!drReader.IsDBNull(intColIdDesDocDerivado)) tempEnTipDocDerivado.DES_TIP_DOC = arrResult[intColIdDesDocDerivado].ToString();
                                if (!drReader.IsDBNull(intColIdFlgOriginal)) tempEnAsignarPivot.FLG_ORIGINAL = int.Parse(arrResult[intColIdFlgOriginal].ToString());
                                if (!drReader.IsDBNull(intColIdFesResp)) tempEnAsignarPivot.FEC_RESP = DateTime.Parse(arrResult[intColIdFesResp].ToString());
                                if (!drReader.IsDBNull(intColIdTipDocAsignado)) tempEnTipDocAsignado.ID_TIP_DOC = int.Parse(arrResult[intColIdTipDocAsignado].ToString());
                                if (!drReader.IsDBNull(intColIdDocAsignacion)) tempEnTipDocAsignado.DES_TIP_DOC = arrResult[intColIdDocAsignacion].ToString();
                                if (!drReader.IsDBNull(intColIdNumAsignacion)) tempEnAsignarPivot.NUM_ASIGNACION = int.Parse(arrResult[intColIdNumAsignacion].ToString());
                                if (!drReader.IsDBNull(intColIdTipRespAsignacion)) tempEnAsignarPivot.TIP_RESP_ASIGNACION = int.Parse(arrResult[intColIdTipRespAsignacion].ToString());
                                if (!drReader.IsDBNull(intColIdDesClasif)) tempEnAsignarPivot.DES_CLASIF = arrResult[intColIdDesClasif].ToString();
                                if (!drReader.IsDBNull(intColIdSemaforo)) tempEnAsignarPivot.SEMAFORO = int.Parse(arrResult[intColIdSemaforo].ToString());
                                if (!drReader.IsDBNull(intColIdFecModi)) tempEnAsignarPivot.FEC_MODI = DateTime.Parse(arrResult[intColIdFecModi].ToString());
                                if (!drReader.IsDBNull(intColID_USU_FUNC)) tempEnUsu.CodUsu = int.Parse(arrResult[intColID_USU_FUNC].ToString());
                                if (!drReader.IsDBNull(intColFUNCIONARIO)) tempEnUsu.Nombres = arrResult[intColFUNCIONARIO].ToString();

                                tempEnAsignarPivot.enExpe = tempEnExpe;
                                tempEnAsignarPivot.enMovi = tempEnMovi;
                                tempEnAsignarPivot.enEstorg = tempEnEstorg;
                                tempEnAsignarPivot.enPersona = tempEnPersona;
                                tempEnAsignarPivot.enTrata = tempEnTrata;
                                tempEnAsignarPivot.enEstado = tempEnEstado;
                                tempEnAsignarPivot.enDoc = tempEnDoc;
                                tempEnAsignarPivot.enDocRespuesta = tempEnDocResp;
                                tempEnAsignarPivot.enOrigen = tempEnOrigen;
                                tempEnAsignarPivot.enPriori = tempEnPriori;
                                tempEnAsignarPivot.enTipDoc = tempEnTipDocDerivado;
                                tempEnAsignarPivot.enTipDocAsignado = tempEnTipDocAsignado;
                                tempEnAsignarPivot.enUsu = tempEnUsu;

                                listAsignacionPivot.Add(tempEnAsignarPivot);
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

            return listAsignacionPivot;
        }

        public int consultarTotalAsignaciones(enMovi objEnMovi)
        {
            int total = 0;

            OracleParameter[] arrParameters = new OracleParameter[] {
                new OracleParameter("X_ID_EXPE",validarNulo(objEnMovi.ID_EXPE)),           
                new OracleParameter("X_ID_MOVI",validarNulo(objEnMovi.ID_MOVI)),
                new OracleParameter("X_ID_ESTADO",validarNulo(objEnMovi.enEstado,"ID_ESTADO")),
                new OracleParameter("X_OPR",validarNulo(objEnMovi.OPR)),   
                new OracleParameter("X_CURSORS",OracleDbType.RefCursor, ParameterDirection.Output)
            };

            using (OracleConnection cn = new OracleConnection(this.CadenaConexion))
            {
                try
                {
                    OracleDataReader OracleDR = OracleHelper.ExecuteReader(cn, CommandType.StoredProcedure, "INSDBA.PKG_TDGCONSU.PRC_CONS_TDO2MOVI_PEND_ASIG", arrParameters);
                    if (OracleDR != null)
                    {
                        if (OracleDR.HasRows)
                        {
                            object[] arrResult = new object[OracleDR.FieldCount];
                            int intColIdTotal = OracleDR.GetOrdinal("TOTAL");


                            enAsignar objEnAsignarPivot = null;

                            while (OracleDR.Read())
                            {
                                OracleDR.GetValues(arrResult);
                                objEnAsignarPivot = new enAsignar();

                                if (!OracleDR.IsDBNull(intColIdTotal)) total = int.Parse(arrResult[intColIdTotal].ToString());
                                
                            }
                        }
                    }
                }
                finally
                {
                    if (cn.State != ConnectionState.Closed) cn.Close();
                }
            }
            return total;
        }

        public coResultadoDB mantenimiento(enAsignar objEn)
        {
            coResultadoDB objCoResultadoDB = null;

            OracleParameter[] arrParameters = new OracleParameter[] {
                new OracleParameter("X_ID_EXPE",validarNulo(objEn.enExpe, "ID_EXPE")),           
                new OracleParameter("X_ID_MOVI",validarNulo(objEn.enMovi,"ID_MOVI")),           
                new OracleParameter("X_ID_SUB",validarNulo(objEn.enEstorg, "ID_SUB")),           
                new OracleParameter("X_ID_SUBOFI",validarNulo(objEn.enEstorg,"ID_SUBOFI")),           
                new OracleParameter("X_ID_ACCION",validarNulo(objEn.enAccion, "ID_ACCION")),           
                new OracleParameter("X_ID_ANO_PROC",validarNulo(objEn.ID_ANO_PROC)),           
                new OracleParameter("X_ID_DOC",validarNulo(objEn.enDoc,"ID_DOC")),           
                new OracleParameter("X_ID_TIP_DOC",validarNulo(objEn.enTipDoc, "ID_TIP_DOC")),           
                new OracleParameter("X_NUM_DOC",validarNulo(objEn.enExpe, "DES_ASUNTO")),                  
                new OracleParameter("X_INSERTS",validarNulo(objEn.enMovi, "INSERTS")),           
                new OracleParameter("X_UPDATES",validarNulo(objEn.enMovi, "UPDATES")),           
                new OracleParameter("X_ID_USU",validarNulo(objEn.ID_USU)),                           
                new OracleParameter("X_ID_SIS",validarNulo(objEn.ID_SIS)),           
                new OracleParameter("X_IP",validarNulo(objEn.IP)),           
                new OracleParameter("X_OPR",validarNulo(objEn.OPR)),           
                new OracleParameter("X_ERROR", OracleDbType.RefCursor, direction: System.Data.ParameterDirection.InputOutput)
            };
            using (daUDml objDaUDml = new daUDml())
            {
                objCoResultadoDB = objDaUDml.ejecutarDml(arrParameters, "INSDBA.PKG_TDOMANT.PRC_ASIGNA_MASIVO");
            }
            return objCoResultadoDB;
        }
    }
}
