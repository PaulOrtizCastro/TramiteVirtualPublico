using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Oracle.DataAccess.Client;
using Mincetur.Administracion.AplTramiteVirtualPublico.DaTramiteVirtualPublico.DataBaseHelpers;
using System.Data;
using Mincetur.Administracion.AplTramiteVirtualPublico.EnTramiteVirtualPublico;
using Mincetur.Administracion.GeneralesUtil.EnGeneralesUtil;

namespace Mincetur.Administracion.AplTramiteVirtualPublico.DaTramiteVirtualPublico
{
    public class daTupaConcep : daBase
    {
        public List<enTupaConcepto> ListarRequi(enTupaConcepto objEnTupa)
        {

            List<enTupaConcepto> listRequi = new List<enTupaConcepto>();

            OracleParameter[] OracleParam = new OracleParameter[4];
            OracleParam[0] = new OracleParameter("X_ID_TUPA", validarNulo(objEnTupa.ID_TUPA));
            OracleParam[1] = new OracleParameter("X_ID_TUPA_CONCEPTO", validarNulo(objEnTupa.ID_TUPA_CONCEPTO));
            OracleParam[2] = new OracleParameter("X_OPR", validarNulo(objEnTupa.OPR));
            OracleParam[3] = new OracleParameter("X_CURSOR", OracleDbType.RefCursor, direction: System.Data.ParameterDirection.Output);

            using (OracleConnection cn = new OracleConnection(this.CadenaConexion))
            {
                try
                {
                    OracleDataReader OracleDR = OracleHelper.ExecuteReader(cn, CommandType.StoredProcedure, "INSDBA.PKG_TDVCONSU.PRC_CONS_TDO2TUPA_REQUI", OracleParam);
                    if (OracleDR != null)
                    {
                        if (OracleDR.HasRows)
                        {
                            object[] arrResult = new object[OracleDR.FieldCount];
                            int intColIdTupa = OracleDR.GetOrdinal("ID_TUPA");
                            int intColIdRequi = OracleDR.GetOrdinal("ID_REQUI");
                            int intColIdTupaRequi = OracleDR.GetOrdinal("ID_TUPA_REQUI");
                            int intColIdFlgEst = OracleDR.GetOrdinal("FLG_EST");
                            int intColIdTupaConcepto = OracleDR.GetOrdinal("ID_TUPA_CONCEPTO");
                            int intColIdNumCant = OracleDR.GetOrdinal("NUM_CANT");
                            int intColIdDesRequi = OracleDR.GetOrdinal("DES_REQUI");
                            int intColFlgOblig = OracleDR.GetOrdinal("FLG_OBLIG");

                            enTupaConcepto objTupaConcep = null;
                            while (OracleDR.Read())
                            {
                                OracleDR.GetValues(arrResult);
                                objTupaConcep = new enTupaConcepto();
                                enRequi objEnRequi = new enRequi();
                                if (!OracleDR.IsDBNull(intColIdTupa)) objTupaConcep.ID_TUPA = int.Parse(arrResult[intColIdTupa].ToString());
                                if (!OracleDR.IsDBNull(intColIdRequi)) objEnRequi.ID_REQUI = int.Parse(arrResult[intColIdRequi].ToString());
                                if (!OracleDR.IsDBNull(intColIdTupaRequi)) objEnRequi.ID_TUPA_REQUI = int.Parse(arrResult[intColIdTupaRequi].ToString());
                                if (!OracleDR.IsDBNull(intColIdTupaConcepto)) objTupaConcep.ID_TUPA_CONCEPTO = int.Parse(arrResult[intColIdTupaConcepto].ToString());
                                if (!OracleDR.IsDBNull(intColIdNumCant)) objEnRequi.NUM_CANT = int.Parse(arrResult[intColIdNumCant].ToString());
                                if (!OracleDR.IsDBNull(intColIdDesRequi)) objEnRequi.DES_REQUI = arrResult[intColIdDesRequi].ToString();
                                if (!OracleDR.IsDBNull(intColFlgOblig)) objTupaConcep.FLG_OBLIG = int.Parse(arrResult[intColFlgOblig].ToString());
                                objTupaConcep.enRequi = objEnRequi;
                                listRequi.Add(objTupaConcep);
                            }
                        }
                        OracleDR.Close();
                    }
                }
                finally
                {
                    if (cn.State != ConnectionState.Closed) cn.Close();
                }
            }
            return listRequi;
        }

        public List<enTupaLeyenda> listTupaLeyendaPublico(enTupaLeyenda objEnTupaLeyenda)
        {

            List<enTupaLeyenda> listTupaRequiPublico = new List<enTupaLeyenda>();

            OracleParameter[] OracleParam = new OracleParameter[9];
            OracleParam[0] = new OracleParameter("X_ID_TUPA_LEYENDA", validarNulo(objEnTupaLeyenda.ID_TUPA_LEYENDA));
            OracleParam[1] = new OracleParameter("X_DES_LEYENDA", validarNulo(objEnTupaLeyenda.DES_LEYENDA));
            OracleParam[2] = new OracleParameter("X_DES_NIVEL", validarNulo(objEnTupaLeyenda.DES_NIVEL));
            OracleParam[3] = new OracleParameter("X_FEC_INI", validarNulo(objEnTupaLeyenda.FEC_INI));
            OracleParam[4] = new OracleParameter("X_FEC_FIN", validarNulo(objEnTupaLeyenda.FEC_FIN));
            OracleParam[5] = new OracleParameter("X_FLG_EST", validarNulo(objEnTupaLeyenda.FLG_EST));
            OracleParam[6] = new OracleParameter("X_NUM_VERSION", validarNulo(objEnTupaLeyenda.NUM_VERSION));
            OracleParam[7] = new OracleParameter("X_OPR", validarNulo(objEnTupaLeyenda.OPR));
            OracleParam[8] = new OracleParameter("X_CURSORS", OracleDbType.RefCursor, direction: System.Data.ParameterDirection.Output);


            using (OracleConnection cn = new OracleConnection(this.CadenaConexion))
            {

                try
                {
                    OracleDataReader OracleDR = OracleHelper.ExecuteReader(cn, CommandType.StoredProcedure, "INSDBA.PRC_CONS_TDO1TUPA_LEYENDA", OracleParam);
                    if (OracleDR != null)
                    {
                        if (OracleDR.HasRows)
                        {
                            object[] arrResult = new object[OracleDR.FieldCount];
                            int intColIdTupaLeyenda = OracleDR.GetOrdinal("ID_TUPA_LEYENDA");
                            int intColIdDesLeyenda = OracleDR.GetOrdinal("DES_LEYENDA");
                            int intColIdDesNivel = OracleDR.GetOrdinal("DES_NIVEL");
                            int intColIdFecIni = OracleDR.GetOrdinal("FEC_INI");
                            int intColIdFecFin = OracleDR.GetOrdinal("FEC_FIN");
                            int intColIdUsuCrea = OracleDR.GetOrdinal("USU_CREA");
                            int intColIdUsuModi = OracleDR.GetOrdinal("USU_MODI");
                            int intColIdFlgEst = OracleDR.GetOrdinal("FLG_EST");
                            int intColIdNumVersion = OracleDR.GetOrdinal("NUM_VERSION");

                            enTupaLeyenda objTupaLeyenda = null;
                            while (OracleDR.Read())
                            {
                                OracleDR.GetValues(arrResult);
                                objTupaLeyenda = new enTupaLeyenda();
                                if (!OracleDR.IsDBNull(intColIdTupaLeyenda)) objTupaLeyenda.ID_TUPA_LEYENDA = int.Parse(arrResult[intColIdTupaLeyenda].ToString());
                                if (!OracleDR.IsDBNull(intColIdDesLeyenda)) objTupaLeyenda.DES_LEYENDA = arrResult[intColIdDesLeyenda].ToString();
                                if (!OracleDR.IsDBNull(intColIdDesNivel)) objTupaLeyenda.DES_NIVEL = arrResult[intColIdDesNivel].ToString();
                                if (!OracleDR.IsDBNull(intColIdFecIni)) objTupaLeyenda.FEC_INI = DateTime.Parse(arrResult[intColIdFecIni].ToString());
                                if (!OracleDR.IsDBNull(intColIdFecFin)) objTupaLeyenda.FEC_FIN = DateTime.Parse(arrResult[intColIdFecFin].ToString());
                                if (!OracleDR.IsDBNull(intColIdUsuCrea)) objTupaLeyenda.USU_CREA = int.Parse(arrResult[intColIdUsuCrea].ToString());
                                if (!OracleDR.IsDBNull(intColIdUsuModi)) objTupaLeyenda.USU_MODI = int.Parse(arrResult[intColIdUsuModi].ToString());
                                if (!OracleDR.IsDBNull(intColIdFlgEst)) objTupaLeyenda.FLG_EST = int.Parse(arrResult[intColIdFlgEst].ToString());
                                if (!OracleDR.IsDBNull(intColIdNumVersion)) objTupaLeyenda.NUM_VERSION = int.Parse(arrResult[intColIdNumVersion].ToString());
                                listTupaRequiPublico.Add(objTupaLeyenda);
                            }
                        }
                        OracleDR.Close();
                    }
                }
                finally
                {
                    if (cn.State != ConnectionState.Closed) cn.Close();
                }
                return listTupaRequiPublico;
            }
        }

        public List<enRecurso> listResolucionRecurso(enRecurso objEnResRecurso)
        {
            List<enRecurso> listResRecurso = new List<enRecurso>();
            OracleParameter[] OracleParam = new OracleParameter[8];
            OracleParam[0] = new OracleParameter("X_ID_RESOLUCION", validarNulo(objEnResRecurso.ID_RESOLUCION));
            OracleParam[1] = new OracleParameter("X_ID_TUPA", validarNulo(objEnResRecurso.ID_TUPA));
            OracleParam[2] = new OracleParameter("X_COD_TUPA", validarNulo(objEnResRecurso.COD_TUPA));
            OracleParam[3] = new OracleParameter("X_ID_TUPA_CONCEPTO", validarNulo(objEnResRecurso.ID_TUPA_CONCEPTO));
            OracleParam[4] = new OracleParameter("X_DES_RESOLUCION", validarNulo(objEnResRecurso.DES_RESOLUCION));
            OracleParam[5] = new OracleParameter("X_FLG_EST", validarNulo(objEnResRecurso.FLG_EST));
            OracleParam[6] = new OracleParameter("X_OPR", validarNulo(objEnResRecurso.OPR));
            OracleParam[7] = new OracleParameter("X_CURSORS", OracleDbType.RefCursor, direction: System.Data.ParameterDirection.Output);

            using (OracleConnection cn = new OracleConnection(this.CadenaConexion))
            {
                try
                {
                    OracleDataReader OracleDR = OracleHelper.ExecuteReader(cn, CommandType.StoredProcedure, "INSDBA.PRC_CONS_TDO1RES_RECURSO", OracleParam);

                    if (OracleDR != null)
                    {
                        if (OracleDR.HasRows)
                        {
                            object[] arrResult = new object[OracleDR.FieldCount];

                            int intColIdResolucion = OracleDR.GetOrdinal("ID_RESOLUCION");
                            int intColIdTupa = OracleDR.GetOrdinal("ID_TUPA");
                            int intColIdCodTupa = OracleDR.GetOrdinal("COD_TUPA");
                            int intColIdConcepto = OracleDR.GetOrdinal("ID_TUPA_CONCEPTO");
                            int intColIdDesResolucion = OracleDR.GetOrdinal("DES_RESOLUCION");
                            int intColIdSub = OracleDR.GetOrdinal("ID_SUB");
                            int intColIdSubOfi = OracleDR.GetOrdinal("ID_SUBOFI");
                            int intColIdPlazoRecur = OracleDR.GetOrdinal("PLAZO_RECURSO");
                            int intColIdPlazoresol = OracleDR.GetOrdinal("PLAZO_RESOLVER");
                            int intColIdFecIni = OracleDR.GetOrdinal("FEC_INI");
                            int intColIdFecFin = OracleDR.GetOrdinal("FEC_FIN");
                            int intColIdFlgEst = OracleDR.GetOrdinal("FLG_EST");

                            enRecurso objResRecurso = null;
                            while (OracleDR.Read())
                            {
                                OracleDR.GetValues(arrResult);
                                objResRecurso = new enRecurso();
                                if (!OracleDR.IsDBNull(intColIdResolucion)) objResRecurso.ID_RESOLUCION = int.Parse(arrResult[intColIdResolucion].ToString());
                                if (!OracleDR.IsDBNull(intColIdTupa)) objResRecurso.ID_TUPA = int.Parse(arrResult[intColIdTupa].ToString());
                                if (!OracleDR.IsDBNull(intColIdCodTupa)) objResRecurso.COD_TUPA = arrResult[intColIdCodTupa].ToString();
                                if (!OracleDR.IsDBNull(intColIdConcepto)) objResRecurso.ID_TUPA_CONCEPTO = int.Parse(arrResult[intColIdConcepto].ToString());
                                if (!OracleDR.IsDBNull(intColIdDesResolucion)) objResRecurso.DES_RESOLUCION = arrResult[intColIdDesResolucion].ToString();
                                if (!OracleDR.IsDBNull(intColIdSub)) objResRecurso.ID_SUB = int.Parse(arrResult[intColIdSub].ToString());
                                if (!OracleDR.IsDBNull(intColIdSubOfi)) objResRecurso.ID_SUBOFI = arrResult[intColIdSubOfi].ToString();
                                if (!OracleDR.IsDBNull(intColIdPlazoRecur)) objResRecurso.PLAZO_RECURSO = int.Parse(arrResult[intColIdPlazoRecur].ToString());
                                if (!OracleDR.IsDBNull(intColIdPlazoresol)) objResRecurso.PLAZO_RESOLVER = int.Parse(arrResult[intColIdPlazoresol].ToString());
                                if (!OracleDR.IsDBNull(intColIdFecIni)) objResRecurso.FEC_INI = DateTime.Parse(arrResult[intColIdFecIni].ToString());
                                if (!OracleDR.IsDBNull(intColIdFecFin)) objResRecurso.FEC_FIN = DateTime.Parse(arrResult[intColIdFecFin].ToString());
                                if (!OracleDR.IsDBNull(intColIdFlgEst)) objResRecurso.FLG_EST = int.Parse(arrResult[intColIdFlgEst].ToString());
                                listResRecurso.Add(objResRecurso);
                            }
                        }
                        OracleDR.Close();
                    }
                }
                finally
                {
                    if (cn.State != ConnectionState.Closed) cn.Close();
                }
                return listResRecurso;
            }
        }

        ////public List<enTupaConcepto> ListarTupaConcep(enTupaConcepto objEnTupaConcep)
        ////{
        ////    List<enTupaConcepto> listTupaConcep = new List<enTupaConcepto>();
        ////    OracleParameter[] OracleParam = new OracleParameter[10];
        ////    OracleParam[0] = new OracleParameter("X_ID_TUPA", validarNulo(objEnTupaConcep.ID_TUPA));
        ////    OracleParam[1] = new OracleParameter("X_COD_TUPA", validarNulo(objEnTupaConcep.COD_TUPA));
        ////    OracleParam[2] = new OracleParameter("X_ID_TUPA_CONCEPTO", validarNulo(objEnTupaConcep.ID_TUPA_CONCEPTO));
        ////    OracleParam[3] = new OracleParameter("X_NUM_DIAS", validarNulo(objEnTupaConcep.NUM_DIAS));
        ////    OracleParam[4] = new OracleParameter("X_DES_NOM", validarNulo(objEnTupaConcep.DES_NOM));
        ////    OracleParam[5] = new OracleParameter("X_DES_TUPA_CONCEP", validarNulo(objEnTupaConcep.DES_TUPA_CONCEP));
        ////    OracleParam[6] = new OracleParameter("X_ID_SUB", validarNulo(objEnTupaConcep.enEstorg, "ID_SUB"));
        ////    OracleParam[7] = new OracleParameter("X_ID_SUBOFI", validarNulo(objEnTupaConcep.enEstorg, "ID_SUBOFI"));
        ////    OracleParam[8] = new OracleParameter("X_OPR", objEnTupaConcep.OPR);
        ////    OracleParam[9] = new OracleParameter("CURSORS", OracleDbType.RefCursor, direction: System.Data.ParameterDirection.Output);

        ////    using (OracleConnection cn = new OracleConnection(this.CadenaConexion))
        ////    {
        ////        try
        ////        {
        ////            OracleDataReader OracleDR = OracleHelper.ExecuteReader(cn, CommandType.StoredProcedure, "INSDBA.PKG_TDVCONSU.PRC_CONS_TDO2TUPA_CONCEP", OracleParam);
        ////            if (OracleDR != null)
        ////            {
        ////                if (OracleDR.HasRows)
        ////                {
        ////                    object[] arrResult = new object[OracleDR.FieldCount];
        ////                    int intColIdTupa = OracleDR.GetOrdinal("ID_TUPA");
        ////                    int intColIdCodTupa = OracleDR.GetOrdinal("COD_TUPA");
        ////                    int intColIdDesNom = OracleDR.GetOrdinal("DES_NOM");
        ////                    int intColIdDesBaseLegal = OracleDR.GetOrdinal("DES_BASE_LEGAL");
        ////                    int intColIdFlgEst = OracleDR.GetOrdinal("FLG_EST");
        ////                    int intColIdTupaConcepto = OracleDR.GetOrdinal("ID_TUPA_CONCEPTO");
        ////                    int intColIdCodConceptoTupa = OracleDR.GetOrdinal("COD_CONCEPTO_TUPA");
        ////                    int intColId_SIGLA_TUPA_CONCEP = OracleDR.GetOrdinal("SIGLA_TUPA_CONCEP");
        ////                    int intColId_FLG_ESTADO = OracleDR.GetOrdinal("FLG_ESTADO");
        ////                    int intColIdDesTupaConcep = OracleDR.GetOrdinal("DES_TUPA_CONCEP");
        ////                    int intColIdSub = OracleDR.GetOrdinal("ID_SUB");
        ////                    int intColIdSubOfi = OracleDR.GetOrdinal("ID_SUBOFI");
        ////                    int intColIdDesOfi = OracleDR.GetOrdinal("DES_OFI");
        ////                    int intColIdNumUit = OracleDR.GetOrdinal("NUM_UIT");
        ////                    int intColIdFlgCalificacion = OracleDR.GetOrdinal("ID_SILENCIO");
        ////                    int intColIdCostoTupa = OracleDR.GetOrdinal("COSTO_TUPA");
        ////                    int intColIdNumDias = OracleDR.GetOrdinal("NUM_DIAS");
        ////                    int intColIdFlgTipoDia = OracleDR.GetOrdinal("FLG_TIPO_DIA");
        ////                    int intColId_FEC_INI_VIG = OracleDR.GetOrdinal("FEC_INI_VIG");
        ////                    int intColId_FEC_FIN_VIG = OracleDR.GetOrdinal("FEC_FIN_VIG");
        ////                    int intColId_FLG_ING_WEB = OracleDR.GetOrdinal("FLG_ING_WEB");
        ////                    int intColId_IDPNGCODIGO = OracleDR.GetOrdinal("IDPNGCODIGO");
        ////                    int intColId_IDCTANUMCTA = OracleDR.GetOrdinal("IDCTANUMCTA");
        ////                    int intColId_IDBANCOCODIGO = OracleDR.GetOrdinal("IDBANCOCODIGO");
        ////                    int intColId_PASO = OracleDR.GetOrdinal("ID_PASO");

        ////                    enTupaConcepto obTupaConcep = null;
        ////                    enEstorg obEnEstorg = null;
        ////                    while (OracleDR.Read())
        ////                    {
        ////                        OracleDR.GetValues(arrResult);
        ////                        obTupaConcep = new enTupaConcepto();
        ////                        obEnEstorg = new enEstorg();

        ////                        if (!OracleDR.IsDBNull(intColIdTupa)) obTupaConcep.ID_TUPA = int.Parse(arrResult[intColIdTupa].ToString());
        ////                        if (!OracleDR.IsDBNull(intColIdCodTupa)) obTupaConcep.COD_TUPA = arrResult[intColIdCodTupa].ToString();
        ////                        if (!OracleDR.IsDBNull(intColIdDesNom)) obTupaConcep.DES_NOM = arrResult[intColIdDesNom].ToString();
        ////                        if (!OracleDR.IsDBNull(intColIdDesBaseLegal)) obTupaConcep.DES_BASE_LEGAL = arrResult[intColIdDesBaseLegal].ToString();
        ////                        if (!OracleDR.IsDBNull(intColIdFlgEst)) obTupaConcep.FLG_EST = int.Parse(arrResult[intColIdFlgEst].ToString());
        ////                        if (!OracleDR.IsDBNull(intColIdTupaConcepto)) obTupaConcep.ID_TUPA_CONCEPTO = int.Parse(arrResult[intColIdTupaConcepto].ToString());
        ////                        if (!OracleDR.IsDBNull(intColIdCodConceptoTupa)) obTupaConcep.COD_CONCEPTO_TUPA = arrResult[intColIdCodConceptoTupa].ToString();
        ////                        if (!OracleDR.IsDBNull(intColId_SIGLA_TUPA_CONCEP)) obTupaConcep.SIGLA_TUPA_CONCEP = arrResult[intColId_SIGLA_TUPA_CONCEP].ToString();
        ////                        if (!OracleDR.IsDBNull(intColId_FLG_ESTADO)) obTupaConcep.FLG_ESTADO_CONCEP = int.Parse(arrResult[intColId_FLG_ESTADO].ToString());
        ////                        if (!OracleDR.IsDBNull(intColIdDesTupaConcep)) obTupaConcep.DES_TUPA_CONCEP = arrResult[intColIdDesTupaConcep].ToString();
        ////                        if (!OracleDR.IsDBNull(intColIdSub)) obEnEstorg.ID_SUB = int.Parse(arrResult[intColIdSub].ToString());
        ////                        if (!OracleDR.IsDBNull(intColIdSubOfi)) obEnEstorg.ID_SUBOFI = arrResult[intColIdSubOfi].ToString();
        ////                        if (!OracleDR.IsDBNull(intColIdDesOfi)) obEnEstorg.DES_SUBOFI = arrResult[intColIdDesOfi].ToString();
        ////                        if (!OracleDR.IsDBNull(intColIdNumUit)) obTupaConcep.NUM_UIT = decimal.Parse(arrResult[intColIdNumUit].ToString());
        ////                        if (!OracleDR.IsDBNull(intColIdFlgCalificacion)) obTupaConcep.ID_SILENCIO = int.Parse(arrResult[intColIdFlgCalificacion].ToString());
        ////                        if (!OracleDR.IsDBNull(intColIdCostoTupa)) obTupaConcep.COSTO_TUPA = decimal.Parse(arrResult[intColIdCostoTupa].ToString());
        ////                        if (!OracleDR.IsDBNull(intColIdNumDias)) obTupaConcep.NUM_DIAS = int.Parse(arrResult[intColIdNumDias].ToString());
        ////                        if (!OracleDR.IsDBNull(intColIdFlgTipoDia)) obTupaConcep.FLG_TIPO_DIA = int.Parse(arrResult[intColIdFlgTipoDia].ToString());
        ////                        if (!OracleDR.IsDBNull(intColId_FEC_INI_VIG)) obTupaConcep.FEC_INI_VIG = DateTime.Parse(arrResult[intColId_FEC_INI_VIG].ToString());
        ////                        if (!OracleDR.IsDBNull(intColId_FEC_FIN_VIG)) obTupaConcep.FEC_FIN_VIG = DateTime.Parse(arrResult[intColId_FEC_FIN_VIG].ToString());
        ////                        if (!OracleDR.IsDBNull(intColId_FLG_ING_WEB)) obTupaConcep.FLG_ING_WEB = int.Parse(arrResult[intColId_FLG_ING_WEB].ToString());
        ////                        if (!OracleDR.IsDBNull(intColId_IDPNGCODIGO)) obTupaConcep.IDPNGCODIGO = arrResult[intColId_IDPNGCODIGO].ToString();
        ////                        if (!OracleDR.IsDBNull(intColId_IDCTANUMCTA)) obTupaConcep.IDCTANUMCTA = arrResult[intColId_IDCTANUMCTA].ToString();
        ////                        if (!OracleDR.IsDBNull(intColId_IDBANCOCODIGO)) obTupaConcep.IDBANCOCODIGO = arrResult[intColId_IDBANCOCODIGO].ToString();

        ////                        if (!OracleDR.IsDBNull(intColId_PASO)) obTupaConcep.ID_PASO = int.Parse(arrResult[intColId_PASO].ToString());
        ////                        obTupaConcep.enEstorg = obEnEstorg;
        ////                        listTupaConcep.Add(obTupaConcep);
        ////                    }
        ////                }
        ////                OracleDR.Close();
        ////            }
        ////        }
        ////        finally {
        ////            if (cn.State != ConnectionState.Closed) cn.Close();
        ////        }
        ////        return listTupaConcep;
        ////    }

        ////}
        public List<enTupaConcepto> ListarTupaConcepto(enTupaConcepto objEnTupaConcep)
        {
            OracleDataReader OracleDR = null;
            List<enTupaConcepto> ListarTupaConcepto = new List<enTupaConcepto>();
            using (OracleConnection cn = new OracleConnection(this.CadenaConexion))
            {

                OracleParameter[] OracleParam = new OracleParameter[10];                
                OracleParam[0] = new OracleParameter("X_ID_TUPA", validarNulo(objEnTupaConcep.ID_TUPA));
                OracleParam[1] = new OracleParameter("X_COD_TUPA", validarNulo(objEnTupaConcep.COD_TUPA));
                OracleParam[2] = new OracleParameter("X_ID_TUPA_CONCEPTO", validarNulo(objEnTupaConcep.ID_TUPA_CONCEPTO));                
                OracleParam[3] = new OracleParameter("X_NUM_DIAS", validarNulo(objEnTupaConcep.NUM_DIAS));
                OracleParam[4] = new OracleParameter("X_DES_NOM", validarNulo(objEnTupaConcep.DES_NOM));
                OracleParam[5] = new OracleParameter("X_DES_TUPA_CONCEP", validarNulo(objEnTupaConcep.DES_TUPA_CONCEP));
                OracleParam[6] = new OracleParameter("X_ID_SUB", validarNulo(objEnTupaConcep.enEstorg, "ID_SUB"));
                OracleParam[7] = new OracleParameter("X_ID_SUBOFI", validarNulo(objEnTupaConcep.enEstorg, "ID_SUBOFI"));
                OracleParam[8] = new OracleParameter("X_OPR", objEnTupaConcep.OPR);
                OracleParam[9] = new OracleParameter("CURSORS", OracleDbType.RefCursor, direction: System.Data.ParameterDirection.Output);
                OracleDR = OracleHelper.ExecuteReader(cn, CommandType.StoredProcedure, "INSDBA.PKG_TDVCONSU.PRC_CONS_TDO2TUPA_CONCEP", OracleParam);

                if (OracleDR != null)
                {
                    if (OracleDR.HasRows)
                    {
                        object[] arrResult = new object[OracleDR.FieldCount];
                        int intColIdTupa = OracleDR.GetOrdinal("ID_TUPA");
                        int intColIdCodTupa = OracleDR.GetOrdinal("COD_TUPA");
                        int intColIdDesNom = OracleDR.GetOrdinal("DES_NOM");
                        int intColIdDesBaseLegal = OracleDR.GetOrdinal("DES_BASE_LEGAL");
                        int intColIdFlgEst = OracleDR.GetOrdinal("FLG_EST");
                        int intColIdTupaConcepto = OracleDR.GetOrdinal("ID_TUPA_CONCEPTO");
                        int intColIdCodConceptoTupa = OracleDR.GetOrdinal("COD_CONCEPTO_TUPA");
                        int intColId_SIGLA_TUPA_CONCEP = OracleDR.GetOrdinal("SIGLA_TUPA_CONCEP");
                        int intColId_FLG_ESTADO = OracleDR.GetOrdinal("FLG_ESTADO");
                        int intColIdDesTupaConcep = OracleDR.GetOrdinal("DES_TUPA_CONCEP");
                        int intColIdSub = OracleDR.GetOrdinal("ID_SUB");
                        int intColIdSubOfi = OracleDR.GetOrdinal("ID_SUBOFI");
                        int intColIdDesOfi = OracleDR.GetOrdinal("DES_OFI");
                        int intColIdNumUit = OracleDR.GetOrdinal("NUM_UIT");
                        int intColIdFlgCalificacion = OracleDR.GetOrdinal("ID_SILENCIO");
                        int intColIdCostoTupa = OracleDR.GetOrdinal("COSTO_TUPA");
                        int intColIdNumDias = OracleDR.GetOrdinal("NUM_DIAS");
                        int intColIdFlgTipoDia = OracleDR.GetOrdinal("FLG_TIPO_DIA");
                        int intColId_FEC_INI_VIG = OracleDR.GetOrdinal("FEC_INI_VIG");
                        int intColId_FEC_FIN_VIG = OracleDR.GetOrdinal("FEC_FIN_VIG");
                        int intColId_FLG_ING_WEB = OracleDR.GetOrdinal("FLG_ING_WEB");
                        int intColId_IDPNGCODIGO = OracleDR.GetOrdinal("IDPNGCODIGO");
                        int intColId_IDCTANUMCTA = OracleDR.GetOrdinal("IDCTANUMCTA");
                        int intColId_IDBANCOCODIGO = OracleDR.GetOrdinal("IDBANCOCODIGO");
                        int intColId_PASO = OracleDR.GetOrdinal("ID_PASO");

                        enTupaConcepto obTupaConcep = null;
                        enEstorg obEnEstorg = null;
                        while (OracleDR.Read())
                        {
                            OracleDR.GetValues(arrResult);
                            obTupaConcep = new enTupaConcepto();
                            obEnEstorg = new enEstorg();

                            if (!OracleDR.IsDBNull(intColIdTupa)) obTupaConcep.ID_TUPA = int.Parse(arrResult[intColIdTupa].ToString());
                            if (!OracleDR.IsDBNull(intColIdCodTupa)) obTupaConcep.COD_TUPA = arrResult[intColIdCodTupa].ToString();
                            if (!OracleDR.IsDBNull(intColIdDesNom)) obTupaConcep.DES_NOM = arrResult[intColIdDesNom].ToString();
                            if (!OracleDR.IsDBNull(intColIdDesBaseLegal)) obTupaConcep.DES_BASE_LEGAL = arrResult[intColIdDesBaseLegal].ToString();
                            if (!OracleDR.IsDBNull(intColIdFlgEst)) obTupaConcep.FLG_EST = int.Parse(arrResult[intColIdFlgEst].ToString());
                            if (!OracleDR.IsDBNull(intColIdTupaConcepto)) obTupaConcep.ID_TUPA_CONCEPTO = int.Parse(arrResult[intColIdTupaConcepto].ToString());
                            if (!OracleDR.IsDBNull(intColIdCodConceptoTupa)) obTupaConcep.COD_CONCEPTO_TUPA = arrResult[intColIdCodConceptoTupa].ToString();
                            if (!OracleDR.IsDBNull(intColId_SIGLA_TUPA_CONCEP)) obTupaConcep.SIGLA_TUPA_CONCEP = arrResult[intColId_SIGLA_TUPA_CONCEP].ToString();
                            if (!OracleDR.IsDBNull(intColId_FLG_ESTADO)) obTupaConcep.FLG_ESTADO_CONCEP = int.Parse(arrResult[intColId_FLG_ESTADO].ToString());
                            if (!OracleDR.IsDBNull(intColIdDesTupaConcep)) obTupaConcep.DES_TUPA_CONCEP = arrResult[intColIdDesTupaConcep].ToString();
                            if (!OracleDR.IsDBNull(intColIdSub)) obEnEstorg.ID_SUB = int.Parse(arrResult[intColIdSub].ToString());
                            if (!OracleDR.IsDBNull(intColIdSubOfi)) obEnEstorg.ID_SUBOFI = arrResult[intColIdSubOfi].ToString();
                            if (!OracleDR.IsDBNull(intColIdDesOfi)) obEnEstorg.DES_SUBOFI = arrResult[intColIdDesOfi].ToString();
                            if (!OracleDR.IsDBNull(intColIdNumUit)) obTupaConcep.NUM_UIT = decimal.Parse(arrResult[intColIdNumUit].ToString());
                            if (!OracleDR.IsDBNull(intColIdFlgCalificacion)) obTupaConcep.ID_SILENCIO = int.Parse(arrResult[intColIdFlgCalificacion].ToString());
                            if (!OracleDR.IsDBNull(intColIdCostoTupa)) obTupaConcep.COSTO_TUPA = decimal.Parse(arrResult[intColIdCostoTupa].ToString());
                            if (!OracleDR.IsDBNull(intColIdNumDias)) obTupaConcep.NUM_DIAS = int.Parse(arrResult[intColIdNumDias].ToString());
                            if (!OracleDR.IsDBNull(intColIdFlgTipoDia)) obTupaConcep.FLG_TIPO_DIA = int.Parse(arrResult[intColIdFlgTipoDia].ToString());
                            if (!OracleDR.IsDBNull(intColId_FEC_INI_VIG)) obTupaConcep.FEC_INI_VIG = DateTime.Parse(arrResult[intColId_FEC_INI_VIG].ToString());
                            if (!OracleDR.IsDBNull(intColId_FEC_FIN_VIG)) obTupaConcep.FEC_FIN_VIG = DateTime.Parse(arrResult[intColId_FEC_FIN_VIG].ToString());
                            if (!OracleDR.IsDBNull(intColId_FLG_ING_WEB)) obTupaConcep.FLG_ING_WEB = int.Parse(arrResult[intColId_FLG_ING_WEB].ToString());
                            if (!OracleDR.IsDBNull(intColId_IDPNGCODIGO)) obTupaConcep.IDPNGCODIGO = arrResult[intColId_IDPNGCODIGO].ToString();
                            if (!OracleDR.IsDBNull(intColId_IDCTANUMCTA)) obTupaConcep.IDCTANUMCTA = arrResult[intColId_IDCTANUMCTA].ToString();
                            if (!OracleDR.IsDBNull(intColId_IDBANCOCODIGO)) obTupaConcep.IDBANCOCODIGO = arrResult[intColId_IDBANCOCODIGO].ToString();

                            if (!OracleDR.IsDBNull(intColId_PASO)) obTupaConcep.ID_PASO = int.Parse(arrResult[intColId_PASO].ToString());
                            obTupaConcep.enEstorg = obEnEstorg;
                            ListarTupaConcepto.Add(obTupaConcep);
                        }
                    }
                    OracleDR.Close();
                }
                if (cn.State != ConnectionState.Closed) cn.Close();
                return ListarTupaConcepto;
            }
        }
        
    }
}
