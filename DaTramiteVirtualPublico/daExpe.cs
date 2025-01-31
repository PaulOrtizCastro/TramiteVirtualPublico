using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Oracle.DataAccess.Client;
using System.Data;
//using Mincetur.Administracion.AplTramiteVirtualPublico.EnTramiteVirtualPublico;
using Mincetur.Administracion.AplTramiteVirtualPublico.DaTramiteVirtualPublico.DataBaseHelpers;
using Mincetur.Administracion.GeneralesUtil.EnGeneralesUtil;
using Mincetur.Administracion.TramiteDocumentario.EnTramiteDocumentario;
using Mincetur.Administracion.AplTramiteVirtualPublico.CoTramiteVirtualPublico;
using enTramiteVirtual = Mincetur.Administracion.AplTramiteVirtualPublico.EnTramiteVirtualPublico;


namespace Mincetur.Administracion.AplTramiteVirtualPublico.DaTramiteVirtualPublico
{
    public class daExpe : daBase
    {
        public List<enMovi> traeListaUbicacionActual(enMovi objEnMovi)
        {
            List<enMovi> lstTable = new List<enMovi>();
            OracleParameter[] OracleParam = new OracleParameter[3];
            OracleParam[0] = new OracleParameter("X_ID_EXPE", validarNulo(objEnMovi.ID_EXPE));
            OracleParam[1] = new OracleParameter("X_OPR", 1);
            OracleParam[2] = new OracleParameter("X_CURSOR", OracleDbType.RefCursor, direction: System.Data.ParameterDirection.Output);

            using (OracleConnection cn = new OracleConnection(this.CadenaConexion))
            {
                try
                {
                    OracleDataReader OracleDR = OracleHelper.ExecuteReader(cn, CommandType.StoredProcedure, "INSDBA.PKG_TDVCONSU.PRC_CONS_UBI_ACTUAL", OracleParam);
                    if (OracleDR != null)
                    {
                        if (OracleDR.HasRows)
                        {
                            object[] arrResult = new object[OracleDR.FieldCount];
                            int intColIdSud = OracleDR.GetOrdinal("ID_SUB");
                            int intColIdSubOfi = OracleDR.GetOrdinal("ID_SUBOFI");
                            int intColIdDesSubofi = OracleDR.GetOrdinal("DES_SUBOFI");

                            enMovi objEnMoviPivot = null;
                            enEstorg objEnEstorg = null;

                            while (OracleDR.Read())
                            {
                                OracleDR.GetValues(arrResult);
                                objEnMoviPivot = new enMovi();
                                objEnEstorg = new enEstorg();


                                if (!OracleDR.IsDBNull(intColIdSud)) objEnEstorg.ID_SUB = int.Parse(arrResult[intColIdSud].ToString());
                                if (!OracleDR.IsDBNull(intColIdSubOfi)) objEnEstorg.ID_SUBOFI = arrResult[intColIdSubOfi].ToString();
                                if (!OracleDR.IsDBNull(intColIdDesSubofi)) objEnEstorg.DES_SUBOFI = arrResult[intColIdDesSubofi].ToString();
                                objEnMoviPivot.enEstorg = objEnEstorg;
                                lstTable.Add(objEnMoviPivot);
                            }
                        }
                    }
                }
                finally
                {
                    if (cn.State != ConnectionState.Closed) cn.Close();
                }
            }
            return lstTable;
        }
        public List<enExpe> traeListaExpe(enExpe objEnExpe)
        {
            List<enExpe> lstTable = new List<enExpe>();
            

            OracleParameter[] arrParameters = new OracleParameter[]{
                new OracleParameter("X_ID_EXPE", validarNulo(objEnExpe.ID_EXPE)),
                new OracleParameter("X_FEC_EXPE", validarNulo(objEnExpe.FEC_EXPE)),
                new OracleParameter("X_DES_OBS", validarNulo(objEnExpe.DES_OBS)),
                new OracleParameter("X_ID_ESTADO", validarNulo(objEnExpe.enEstado, "ID_ESTADO")),
                new OracleParameter("X_DES_ASUNTO", validarNulo(objEnExpe.DES_ASUNTO)),
                new OracleParameter("X_ID_TUPA", validarNulo(objEnExpe.enTupa, "ID_TUPA")),
                new OracleParameter("X_FEC_VIGE", validarNulo(objEnExpe.FEC_VIGE)),
                new OracleParameter("X_NUM_FOLIOS", validarNulo(objEnExpe.enTipDoc, "NUM_FOLIOS")),
                new OracleParameter("X_FEC_MODI", validarNulo(objEnExpe.FEC_MODI)),
                new OracleParameter("X_ID_ORIGEN", validarNulo(objEnExpe.enOrigen, "ID_ORIGEN")),
                new OracleParameter("X_ID_CLASIF", validarNulo(objEnExpe.ID_CLASIF)),
                new OracleParameter("X_ID_TIP_DOC", validarNulo(objEnExpe.enTipDoc, "ID_TIP_DOC")),
                new OracleParameter("X_NUM_DOC", validarNulo(objEnExpe.enTipDoc, "NUM_DOC")),
                new OracleParameter("X_ID_PERSONA", validarNulo(objEnExpe.ID_PERSONA)),
                new OracleParameter("X_ID_SUB", validarNulo(objEnExpe.enEstorg, "ID_SUB")),
                new OracleParameter("X_ID_USU", null),
                new OracleParameter("X_ID_SUBOFI", validarNulo(objEnExpe.enEstorg, "ID_SUBOFI")),
                new OracleParameter("X_ID_TRATA", validarNulo(objEnExpe.enTrata, "ID_TRATA")),
                new OracleParameter("X_ID_PRIORI", validarNulo(objEnExpe.enPriori, "ID_PRIORI")),
                new OracleParameter("X_OPR", objEnExpe.OPR),
                new OracleParameter("X_CURSOR",OracleDbType.RefCursor, ParameterDirection.Output)
            };


            using (OracleConnection cn = new OracleConnection(this.CadenaConexion))
            {
                try
                {
                    using (OracleDataReader drReader = OracleHelper.ExecuteReader(cn, CommandType.StoredProcedure, "INSDBA.PKG_TDOCONSU.PRC_CONS_TDO3EXPE", arrParameters))
                    {
                        object[] arrResult = null;
                        if (drReader.HasRows) {
                            arrResult = new object[drReader.FieldCount];

                            int intColID_EXPE = drReader.GetOrdinal("ID_EXPE");
                            int intColFEC_EXPE = drReader.GetOrdinal("FEC_EXPE");
                            int intColID_PERSONA = drReader.GetOrdinal("ID_PERSONA");
                            int intColDES_PERSONA = drReader.GetOrdinal("DES_PERSONA");
                            int intColDES_OBS = drReader.GetOrdinal("DES_OBS");
                            int intColID_SUB = drReader.GetOrdinal("ID_SUB");
                            int intColID_ESTADO = drReader.GetOrdinal("ID_ESTADO");
                            int intColDES_ESTADO  = drReader.GetOrdinal("DES_ESTADO");
                            int intColID_SUBOFI = drReader.GetOrdinal("ID_SUBOFI");
                            int intColDES_SUBOFI = drReader.GetOrdinal("DES_SUBOFI");
                            int intColDES_ASUNTO = drReader.GetOrdinal("DES_ASUNTO");
                            int intColFEC_VIGE = drReader.GetOrdinal("FEC_VIGE");
                            int intColFEC_PLAZO = drReader.GetOrdinal("FEC_PLAZO");
                            int intColSEMAFORO = drReader.GetOrdinal("SEMAFORO");
                            int intColUSU_CREA = drReader.GetOrdinal("USU_CREA");
                            int intColUSU_MODI = drReader.GetOrdinal("USU_MODI");
                            int intColCOD_LOG = drReader.GetOrdinal("COD_LOG");
                            int intColNUM_FOLIOS = drReader.GetOrdinal("NUM_FOLIOS");
                            int intColFEC_MODI = drReader.GetOrdinal("FEC_MODI");

                            int intColFEC_INI = drReader.GetOrdinal("FEC_INI");
                            int intColID_ORIGEN = drReader.GetOrdinal("ID_ORIGEN");
                            int intColID_CLASIF = drReader.GetOrdinal("ID_CLASIF");
                            int intColID_TIP_DOC = drReader.GetOrdinal("ID_TIP_DOC");
                            int intColDES_TIP_DOC = drReader.GetOrdinal("DES_TIP_DOC");
                            int intColNUM_DOC = drReader.GetOrdinal("NUM_DOC");
                            int intColID_TRATA = drReader.GetOrdinal("ID_TRATA");
                            int intColID_PRIORI = drReader.GetOrdinal("ID_PRIORI");
                            int intColABR_SUB_UBI = drReader.GetOrdinal("ABR_SUB_UBI");
                            
                            int intColTICKET = drReader.GetOrdinal("TICKET");
                            int intColDES_CLASIF = drReader.GetOrdinal("DES_CLASIF");
                            int intColDES_COMISION = drReader.GetOrdinal("DES_COMISION");
                            int intColID_COMISION = drReader.GetOrdinal("ID_COMISION");
                            int intColID_TUPA = drReader.GetOrdinal("ID_TUPA");

                            enExpe objEnExpePivot = null;
                            enTipDoc objEnTipDoc = null;
                            enEstado objEnEstado = null;
                            enTrata objEnTrata = null;
                            enPriori objEnPriori = null;
                            enOrigen objEnOrigen = null;
                            enEstorg objEnEstorg = null;
                            enEstorg objEnEstorgUbi = null;
                            enCongreso objEnCongreso = null;
                            enTupa objEnTupa = null;

                            while (drReader.Read()) {
                                drReader.GetValues(arrResult);

                                objEnExpePivot = new enExpe();
                                objEnTipDoc = new enTipDoc();
                                objEnEstado = new enEstado();
                                objEnTrata = new enTrata();
                                objEnPriori = new enPriori();
                                objEnOrigen = new enOrigen();
                                objEnEstorg = new enEstorg();
                                objEnEstorgUbi = new enEstorg();
                                objEnCongreso = new enCongreso();
                                objEnTupa = new enTupa();

                                if (!drReader.IsDBNull(intColID_EXPE)) objEnExpePivot.ID_EXPE = int.Parse(arrResult[intColID_EXPE].ToString());
                                if (!drReader.IsDBNull(intColFEC_EXPE)) objEnExpePivot.FEC_EXPE = DateTime.Parse(arrResult[intColFEC_EXPE].ToString());
                                if (!drReader.IsDBNull(intColID_PERSONA)) objEnExpePivot.ID_PERSONA = int.Parse(arrResult[intColID_PERSONA].ToString());

                                if (!drReader.IsDBNull(intColDES_PERSONA)) objEnExpePivot.DES_PERSONA = arrResult[intColDES_PERSONA].ToString();
                                if (!drReader.IsDBNull(intColDES_OBS)) objEnExpePivot.DES_OBS = arrResult[intColDES_OBS].ToString();
                                if (!drReader.IsDBNull(intColID_SUB)) objEnEstorg.ID_SUB = int.Parse(arrResult[intColID_SUB].ToString());

                                if (!drReader.IsDBNull(intColID_ESTADO)) objEnEstado.ID_ESTADO = int.Parse(arrResult[intColID_ESTADO].ToString());
                                if (!drReader.IsDBNull(intColDES_ESTADO)) objEnEstado.DES_ESTADO = arrResult[intColDES_ESTADO].ToString();
                                if (!drReader.IsDBNull(intColID_SUBOFI)) objEnEstorg.ID_SUBOFI = arrResult[intColID_SUBOFI].ToString();

                                if (!drReader.IsDBNull(intColDES_SUBOFI)) objEnEstorg.DES_SUBOFI = arrResult[intColDES_SUBOFI].ToString();
                                if (!drReader.IsDBNull(intColDES_ASUNTO)) objEnExpePivot.DES_ASUNTO = arrResult[intColDES_ASUNTO].ToString();
                                if (!drReader.IsDBNull(intColFEC_VIGE)) objEnExpePivot.FEC_VIGE = DateTime.Parse(arrResult[intColFEC_VIGE].ToString());

                                if (!drReader.IsDBNull(intColFEC_PLAZO)) objEnExpePivot.FEC_PLAZO = DateTime.Parse(arrResult[intColFEC_PLAZO].ToString());
                                if (!drReader.IsDBNull(intColSEMAFORO)) objEnExpePivot.SEMAFORO = int.Parse(arrResult[intColSEMAFORO].ToString());
                                if (!drReader.IsDBNull(intColUSU_CREA)) objEnExpePivot.USU_CREA = int.Parse(arrResult[intColUSU_CREA].ToString());
                                if (!drReader.IsDBNull(intColUSU_MODI)) objEnExpePivot.USU_MODI = int.Parse(arrResult[intColUSU_MODI].ToString());

                                if (!drReader.IsDBNull(intColCOD_LOG)) objEnExpePivot.COD_LOG = arrResult[intColCOD_LOG].ToString();
                                if (!drReader.IsDBNull(intColNUM_FOLIOS)) objEnTipDoc.NUM_FOLIOS = int.Parse(arrResult[intColNUM_FOLIOS].ToString());
                                if (!drReader.IsDBNull(intColFEC_MODI)) objEnExpePivot.FEC_MODI = DateTime.Parse(arrResult[intColFEC_MODI].ToString());

                                if (!drReader.IsDBNull(intColFEC_INI)) objEnExpePivot.FEC_INI = DateTime.Parse(arrResult[intColFEC_INI].ToString());
                                if (!drReader.IsDBNull(intColID_ORIGEN)) objEnOrigen.ID_ORIGEN = int.Parse(arrResult[intColID_ORIGEN].ToString());
                                if (!drReader.IsDBNull(intColID_CLASIF)) objEnExpePivot.ID_CLASIF = int.Parse(arrResult[intColID_CLASIF].ToString());

                                if (!drReader.IsDBNull(intColID_TIP_DOC)) objEnTipDoc.ID_TIP_DOC = int.Parse(arrResult[intColID_TIP_DOC].ToString());
                                if (!drReader.IsDBNull(intColDES_TIP_DOC)) objEnTipDoc.DES_TIP_DOC = arrResult[intColDES_TIP_DOC].ToString();
                                if (!drReader.IsDBNull(intColNUM_DOC)) objEnTipDoc.NUM_DOC = arrResult[intColNUM_DOC].ToString();

                                if (!drReader.IsDBNull(intColID_TRATA)) objEnTrata.ID_TRATA = int.Parse(arrResult[intColID_TRATA].ToString());
                                if (!drReader.IsDBNull(intColID_PRIORI)) objEnPriori.ID_PRIORI = int.Parse(arrResult[intColID_PRIORI].ToString());
                                if (!drReader.IsDBNull(intColABR_SUB_UBI)) objEnEstorgUbi.ABR_SUBOFI = arrResult[intColTICKET].ToString();
                                if (!drReader.IsDBNull(intColTICKET)) objEnExpePivot.TICKET = arrResult[intColTICKET].ToString();

                                if (!drReader.IsDBNull(intColDES_CLASIF)) objEnExpePivot.DES_CLASIF = arrResult[intColDES_CLASIF].ToString();
                                if (!drReader.IsDBNull(intColDES_COMISION)) objEnCongreso.DES_COMISION = arrResult[intColDES_COMISION].ToString();
                                if (!drReader.IsDBNull(intColID_COMISION)) objEnCongreso.ID_COMISION = int.Parse(arrResult[intColID_COMISION].ToString());

                                if (!drReader.IsDBNull(intColID_TUPA)) objEnTupa.ID_TUPA = int.Parse(arrResult[intColID_TUPA].ToString());

                                objEnExpePivot.enTipDoc = objEnTipDoc;
                                objEnExpePivot.enEstado = objEnEstado;
                                objEnExpePivot.enTrata = objEnTrata;
                                objEnExpePivot.enPriori = objEnPriori;
                                objEnExpePivot.enOrigen = objEnOrigen;
                                objEnExpePivot.enEstorg = objEnEstorg;
                                objEnExpePivot.enEstorgUbi = objEnEstorgUbi;
                                objEnExpePivot.enCongreso = objEnCongreso;
                                objEnExpePivot.enTupa = objEnTupa;
                                lstTable.Add(objEnExpePivot);
                            }
                        }
                    }
                }
                finally
                {
                    if (cn.State != ConnectionState.Closed) cn.Close();
                }
            }
            return lstTable;
        }
        
        public enTramiteVirtual.enExpe traeListaExpedientePublico(enTramiteVirtual.enExpe objEnExpe)
        {
            enTramiteVirtual.enExpe objEnExpedientePublico = new enTramiteVirtual.enExpe();


            OracleParameter[] arrParameters = new OracleParameter[]{
                new OracleParameter("X_ID_EXPE", validarNulo(objEnExpe.ID_EXPE)),
                new OracleParameter("X_ID_PERSONA", validarNulo(objEnExpe.enPersona,"ID_PERSONA")),
                new OracleParameter("X_ID_TIP_DOC", validarNulo(objEnExpe.enTipDoc, "ID_TIP_DOC")),
                new OracleParameter("X_NUM_DOC", validarNulo(objEnExpe.enTipDoc, "NUM_DOC")),
                new OracleParameter("X_DES_DOC", validarNulo(objEnExpe.enTipDoc,"DES_DOC")),
                new OracleParameter("X_ID_ANO_PROC", validarNulo(objEnExpe.ID_ANO_PROC)),
                new OracleParameter("X_ID_SUB", validarNulo(objEnExpe.enEstorg,"ID_SUB")),
                new OracleParameter("X_ID_SUBOFI", validarNulo(objEnExpe.enEstorg,"ID_SUBOFI")),
                new OracleParameter("X_DATO", validarNulo(objEnExpe.DATO)),
                new OracleParameter("X_FLG_EST", validarNulo(objEnExpe.FLG_EST)),
                new OracleParameter("X_ID_USU", validarNulo(objEnExpe.ID_USU)),
                new OracleParameter("X_ID_SIS", validarNulo(objEnExpe.ID_SIS)),
                new OracleParameter("X_IP_ACCESO", validarNulo(objEnExpe.IP)),
                new OracleParameter("X_OPR", objEnExpe.OPR),
                new OracleParameter("X_ERROR",OracleDbType.RefCursor, ParameterDirection.Output),
                new OracleParameter("X_CURSOR",OracleDbType.RefCursor, ParameterDirection.Output),
                new OracleParameter("X_CURSOR_UBI",OracleDbType.RefCursor, ParameterDirection.Output)
            };


            using (OracleConnection cn = new OracleConnection(this.CadenaConexion))
            {
                try
                {
                    using (OracleDataReader drReader = OracleHelper.ExecuteReader(cn, CommandType.StoredProcedure, "INSDBA.PKG_TDVCONSU.PRC_CONS_EXPEDIENTEPUBLICO", arrParameters))
                    {
                        object[] arrResult = null;
                        //enTramiteVirtual.enExpe objEnExpePivot = new enTramiteVirtual.enExpe();
                        //objEnExpePivot.coResultadoDB = new coResultadoDB();
                        //objEnExpePivot.enMovi = new enTramiteVirtual.enMovi();
                        //objEnExpePivot.enClasif = new enTramiteVirtual.enClasif();
                        //objEnExpePivot.enTupaConcepto = new enTramiteVirtual.enTupaConcepto();
                        //objEnExpePivot.enEstado = new enTramiteVirtual.enEstado();
                        ////objEnExpePivot.enDescripcionExpe = new enTramiteVirtual.enDescripcionExpe();

                        objEnExpedientePublico.lstEnDescripcionExpe = new List<enTramiteVirtual.enDescripcionExpe>();
                        objEnExpedientePublico.lstEnUbicacion = new List<enTramiteVirtual.enUbicacion>();

                        
                        if (drReader.HasRows)
                        {
                            arrResult = new object[drReader.FieldCount];
                            
                            int intColID_TIPO = drReader.GetOrdinal("ID_TIPO");
                            int intColID_ERROR = drReader.GetOrdinal("ID_ERROR");
                            int intColDES_ERROR = drReader.GetOrdinal("DES_ERROR");
                            int intColVALOR = drReader.GetOrdinal("VALOR");
                            int intColVALOR1 = drReader.GetOrdinal("VALOR1");
                            coResultadoDB objCoResultadoDB = new coResultadoDB();

                            //X_ERROR
                            while (drReader.Read())
                            {
                                drReader.GetValues(arrResult);

                                if (!drReader.IsDBNull(intColID_TIPO)) objCoResultadoDB.ID_TIPO = int.Parse(arrResult[intColID_TIPO].ToString());
                                if (!drReader.IsDBNull(intColID_ERROR)) objCoResultadoDB.ID_ERROR = arrResult[intColID_ERROR].ToString();
                                if (!drReader.IsDBNull(intColDES_ERROR)) objCoResultadoDB.DES_ERROR = arrResult[intColDES_ERROR].ToString();
                                if (!drReader.IsDBNull(intColVALOR)) objCoResultadoDB.VALOR = arrResult[intColVALOR].ToString();
                                if (!drReader.IsDBNull(intColVALOR1)) objCoResultadoDB.VALOR1 = arrResult[intColVALOR1].ToString();

                                objEnExpedientePublico.coResultadoDB = objCoResultadoDB;
                            }
                            //X_CURSOR
                            if (drReader.NextResult()) {
                                arrResult = new object[drReader.FieldCount];

                                int intColID_EXPE = drReader.GetOrdinal("ID_EXPE");
                                int intColID_CLASIF = drReader.GetOrdinal("ID_CLASIF");
                                int intColID_TUPA = drReader.GetOrdinal("ID_TUPA");
                                int intColID_TUPA_CONCEPTO = drReader.GetOrdinal("ID_TUPA_CONCEPTO");
                                int intColCOD_TUPA = drReader.GetOrdinal("COD_TUPA");
                                int intColDES_ASUNTO = drReader.GetOrdinal("DES_ASUNTO");
                                int intColABR_ESTADO = drReader.GetOrdinal("ABR_ESTADO");
                                int intColFEC_EXPE = drReader.GetOrdinal("FEC_EXPE");

                                enTramiteVirtual.enDescripcionExpe objEnDescripcionExpePivot = null;
                                enTramiteVirtual.enClasif objEnClasifPivot = null;
                                enTramiteVirtual.enTupaConcepto objEnTupaConceptoPivot = null;
                                enTramiteVirtual.enEstado objEnEstadoPivot = null;
                                

                                while (drReader.Read())
                                {
                                    drReader.GetValues(arrResult);

                                    
                                    objEnClasifPivot = new enTramiteVirtual.enClasif();
                                    objEnTupaConceptoPivot = new enTramiteVirtual.enTupaConcepto();
                                    objEnEstadoPivot = new enTramiteVirtual.enEstado();
                                    objEnDescripcionExpePivot = new enTramiteVirtual.enDescripcionExpe();

                                    if (!drReader.IsDBNull(intColID_EXPE)) objEnDescripcionExpePivot.ID_EXPE = int.Parse(arrResult[intColID_EXPE].ToString());
                                    if (!drReader.IsDBNull(intColID_CLASIF)) objEnClasifPivot.ID_CLASIF = int.Parse(arrResult[intColID_CLASIF].ToString());
                                    if (!drReader.IsDBNull(intColID_TUPA)) objEnTupaConceptoPivot.ID_TUPA = int.Parse(arrResult[intColID_TUPA].ToString());
                                    if (!drReader.IsDBNull(intColID_TUPA_CONCEPTO)) objEnTupaConceptoPivot.ID_TUPA_CONCEPTO = int.Parse(arrResult[intColID_TUPA_CONCEPTO].ToString());
                                    if (!drReader.IsDBNull(intColCOD_TUPA)) objEnTupaConceptoPivot.COD_TUPA = arrResult[intColCOD_TUPA].ToString();
                                    if (!drReader.IsDBNull(intColDES_ASUNTO)) objEnDescripcionExpePivot.DES_ASUNTO = arrResult[intColDES_ASUNTO].ToString();
                                    if (!drReader.IsDBNull(intColABR_ESTADO)) objEnEstadoPivot.ABR_ESTADO = arrResult[intColABR_ESTADO].ToString();
                                    if (!drReader.IsDBNull(intColFEC_EXPE)) objEnDescripcionExpePivot.FEC_EXPE = DateTime.Parse(arrResult[intColFEC_EXPE].ToString());

                                    
                                    objEnDescripcionExpePivot.enClasif = objEnClasifPivot;
                                    objEnDescripcionExpePivot.enTupaConcepto = objEnTupaConceptoPivot;
                                    objEnDescripcionExpePivot.enEstado = objEnEstadoPivot;
                                    objEnExpedientePublico.lstEnDescripcionExpe.Add(objEnDescripcionExpePivot);

                                }
                            }
                            //X_CURSOR_UBI
                            if (drReader.NextResult()) {
                                arrResult = new object[drReader.FieldCount];

                                int intColID_EXPE = drReader.GetOrdinal("ID_EXPE");
                                int intColID_MOVI = drReader.GetOrdinal("ID_MOVI");
                                int intColID_ESTADO = drReader.GetOrdinal("ID_ESTADO");
                                int intColABR_ESTADO = drReader.GetOrdinal("ABR_ESTADO");
                                int intColDES_ESTADO = drReader.GetOrdinal("DES_ESTADO");
                                int intColID_SUB = drReader.GetOrdinal("ID_SUB");
                                int intColID_SUBOFI = drReader.GetOrdinal("ID_SUBOFI");
                                int intColABR_SUBOFI = drReader.GetOrdinal("ABR_SUBOFI");
                                int intColDES_SUBOFI = drReader.GetOrdinal("DES_SUBOFI");

                                enTramiteVirtual.enUbicacion objEnUbicacionPivot = null;
                                enTramiteVirtual.enMovi objEnMoviPivot = null;
                                enEstorg objEnEstorgPivot = null;
                                enTramiteVirtual.enEstado objEnEstadoPivot = null;
                                

                                while (drReader.Read())
                                {
                                    drReader.GetValues(arrResult);

                                    //objEnExpePivot = new enTramiteVirtual.enExpe();
                                    objEnUbicacionPivot = new enTramiteVirtual.enUbicacion() { enMovi = new enTramiteVirtual.enMovi() };
                                    objEnMoviPivot = new enTramiteVirtual.enMovi();
                                    objEnEstadoPivot = new enTramiteVirtual.enEstado();
                                    objEnEstorgPivot = new enEstorg();

                                    if (!drReader.IsDBNull(intColID_EXPE)) objEnMoviPivot.ID_EXPE = int.Parse(arrResult[intColID_EXPE].ToString());
                                    if (!drReader.IsDBNull(intColID_MOVI)) objEnMoviPivot.ID_MOVI = int.Parse(arrResult[intColID_MOVI].ToString());
                                    if (!drReader.IsDBNull(intColID_ESTADO)) objEnEstadoPivot.ID_ESTADO = int.Parse(arrResult[intColID_ESTADO].ToString());
                                    if (!drReader.IsDBNull(intColABR_ESTADO)) objEnEstadoPivot.ABR_ESTADO = arrResult[intColABR_ESTADO].ToString();
                                    if (!drReader.IsDBNull(intColDES_ESTADO)) objEnEstadoPivot.DES_ESTADO = arrResult[intColDES_ESTADO].ToString();
                                    if (!drReader.IsDBNull(intColID_SUB)) objEnEstorgPivot.ID_SUB = int.Parse(arrResult[intColID_SUB].ToString());
                                    if (!drReader.IsDBNull(intColID_SUBOFI)) objEnEstorgPivot.ID_SUBOFI = arrResult[intColID_SUBOFI].ToString();
                                    if (!drReader.IsDBNull(intColABR_SUBOFI)) objEnEstorgPivot.ABR_SUBOFI = arrResult[intColABR_SUBOFI].ToString();
                                    if (!drReader.IsDBNull(intColDES_SUBOFI)) objEnEstorgPivot.DES_SUBOFI = arrResult[intColDES_SUBOFI].ToString();

                                    objEnUbicacionPivot.enMovi = objEnMoviPivot;
                                    objEnUbicacionPivot.enEstorg = objEnEstorgPivot;
                                    objEnUbicacionPivot.enEstado = objEnEstadoPivot;

                                    objEnExpedientePublico.lstEnUbicacion.Add(objEnUbicacionPivot);
                                }
                            }
                        }
                    }
                }
                finally
                {
                    if (cn.State != ConnectionState.Closed) cn.Close();
                }
            }
            return objEnExpedientePublico;
        }
    }
}