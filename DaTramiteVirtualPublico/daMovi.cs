using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Mincetur.Administracion.AplTramiteVirtualPublico.EnTramiteVirtualPublico;
using Oracle.DataAccess.Client;
using System.Data;
using Mincetur.Administracion.AplTramiteVirtualPublico.DaTramiteVirtualPublico.DataBaseHelpers;
using Mincetur.Administracion.GeneralesUtil.EnGeneralesUtil;
using Mincetur.Administracion.AplTramiteVirtualPublico.CoTramiteVirtualPublico;



namespace Mincetur.Administracion.AplTramiteVirtualPublico.DaTramiteVirtualPublico
{
    public class daMovi : daBase
    {
        public enMovi consultarExpediente(enMovi enObj)
        {
            enMovi objEnMoviPivot = new enMovi();

            OracleParameter[] parameters = new OracleParameter[]{
                new OracleParameter("X_ID_EXPE",validarNulo(enObj.ID_EXPE)),
                new OracleParameter("X_ID_MOVI",validarNulo(enObj.ID_MOVI)),
                new OracleParameter("X_ID_SIS",validarNulo(enObj.ID_SIS)),
                new OracleParameter("XO_CURSORS1",OracleDbType.RefCursor, ParameterDirection.Output),
                new OracleParameter("XO_CURSORS2",OracleDbType.RefCursor, ParameterDirection.Output),
                new OracleParameter("XO_CURSORS3",OracleDbType.RefCursor, ParameterDirection.Output)
            };

            using (OracleConnection cn = new OracleConnection(this.CadenaConexion)) {
                try
                {
                    using (OracleDataReader drReader = OracleHelper.ExecuteReader(cn, CommandType.StoredProcedure, "INSDBA.PKG_TDVCONSU.PRC_CONS_EXPEDIENTE", parameters))
                    {
                        object[] arrResult = null;
                        if (drReader.HasRows)
                        {
                            arrResult = new object[drReader.FieldCount];

                            int intColIdPersona = drReader.GetOrdinal("ID_PERSONA");
                            int intColIdExpe = drReader.GetOrdinal("ID_EXPE");
                            int intColIdOrigen = drReader.GetOrdinal("ID_ORIGEN");
                            int intColIdFecExpe = drReader.GetOrdinal("FEC_EXPE");
                            int intColIdNumDocu = drReader.GetOrdinal("NUM_DOC");
                            int intColIdDesAsunto = drReader.GetOrdinal("DES_ASUNTO");
                            int intColIdTipDoc = drReader.GetOrdinal("ID_TIP_DOC");
                            int intColIdDoc = drReader.GetOrdinal("ID_DOC");
                            int intColIdDesDoc = drReader.GetOrdinal("DES_DOC");


                            int intColIdDesObsDoc = drReader.GetOrdinal("DES_OBS_DOC");
                            int intColIdDesDocCompleto = drReader.GetOrdinal("DES_DOC_COMPLETO");


                            int intColIdSub = drReader.GetOrdinal("ID_SUB");
                            int intColIdSubOfi = drReader.GetOrdinal("ID_SUBOFI");
                            int intColIdAbrSubOfi = drReader.GetOrdinal("ABR_SUBOFI");
                            int intColIdDesSubOfi = drReader.GetOrdinal("DES_SUBOFI");
                            int intColIdTupa = drReader.GetOrdinal("ID_TUPA");
                            int intColIdTupaConcepto = drReader.GetOrdinal("ID_TUPA_CONCEPTO");
                            int intColIdFlgTupa = drReader.GetOrdinal("FLG_TUPA");
                            int intColIdDesTupa = drReader.GetOrdinal("DES_TUPA");
                            int intColIdDesTupaConcepto = drReader.GetOrdinal("DES_TUPA_CONCEPTO");
                            int intColIdCostoTupa = drReader.GetOrdinal("COSTO_TUPA");
                            int intColIdDesObs = drReader.GetOrdinal("DES_OBS");
                            int intColIdDesComent = drReader.GetOrdinal("DES_COMENT");
                            int intColIdTipoPersona = drReader.GetOrdinal("TIPO_PERSONA");
                            int intColIdNomCompleto = drReader.GetOrdinal("NOMBRECOMPLETO");
                            int intColIdRuc = drReader.GetOrdinal("RUC");
                            int intColIdJefe = drReader.GetOrdinal("ID_JEFE");
                            int intColIdNumDocPago = drReader.GetOrdinal("NUM_DOC_PAGO");
                            int intColIdFecPago = drReader.GetOrdinal("FEC_PAGO");
                            int intColIdObs = drReader.GetOrdinal("OBS");
                            int intColIdFormaPago = drReader.GetOrdinal("ID_FORMA_PAGO");
                            int intColIdImpTotal = drReader.GetOrdinal("IMP_TOTAL");
                            int intColIdFecMovi = drReader.GetOrdinal("FEC_MOVI");

                            int intColIdEstado = drReader.GetOrdinal("ID_ESTADO");

                            enMovi tempEnMovi = new enMovi();
                            enOrigen tempEnOrigen = new enOrigen();
                            
                            enDoc tempEnDoc = new enDoc();
                            enEstorg tempEnEstorg = new enEstorg();
                            enTupa tempEnTupa = new enTupa();
                            enTupaConcepto tempEnTupaConcepto = new enTupaConcepto();
                            enPersona tempEnPersona = new enPersona();
                            enEstado tempEnEstado = new enEstado();


                            while (drReader.Read())
                            {
                                drReader.GetValues(arrResult);
                                
                                if (!drReader.IsDBNull(intColIdPersona)) tempEnPersona.ID_PERSONA = int.Parse(arrResult[intColIdPersona].ToString());
                                if (!drReader.IsDBNull(intColIdExpe)) tempEnMovi.ID_EXPE = int.Parse(arrResult[intColIdExpe].ToString());
                                if (!drReader.IsDBNull(intColIdOrigen)) tempEnOrigen.ID_ORIGEN = int.Parse(arrResult[intColIdOrigen].ToString());
                                if (!drReader.IsDBNull(intColIdFecExpe)) tempEnMovi.FEC_EXPE = DateTime.Parse(arrResult[intColIdFecExpe].ToString());
                                
                                if (!drReader.IsDBNull(intColIdDesAsunto)) tempEnMovi.DES_ASUNTO = arrResult[intColIdDesAsunto].ToString();
                                if (!drReader.IsDBNull(intColIdTipDoc)) tempEnMovi.ID_TIP_DOC = int.Parse(arrResult[intColIdTipDoc].ToString());
                                
                                if (!drReader.IsDBNull(intColIdDoc)) tempEnDoc.ID_DOC = int.Parse(arrResult[intColIdDoc].ToString());
                                if (!drReader.IsDBNull(intColIdDesDoc)) tempEnDoc.DES_DOC = arrResult[intColIdDesDoc].ToString();
                                if (!drReader.IsDBNull(intColIdNumDocu)) tempEnDoc.NUM_DOC = arrResult[intColIdNumDocu].ToString();

                                if (!drReader.IsDBNull(intColIdDesObsDoc)) tempEnDoc.DES_OBS = arrResult[intColIdDesObsDoc].ToString();
                                if (!drReader.IsDBNull(intColIdDesDocCompleto)) tempEnDoc.DES_DOC_COMPLETO = arrResult[intColIdDesDocCompleto].ToString();

                                if (!drReader.IsDBNull(intColIdSub)) tempEnEstorg.ID_SUB = int.Parse(arrResult[intColIdSub].ToString());
                                if (!drReader.IsDBNull(intColIdSubOfi)) tempEnEstorg.ID_SUBOFI = arrResult[intColIdSubOfi].ToString();
                                if (!drReader.IsDBNull(intColIdAbrSubOfi)) tempEnEstorg.ABR_SUBOFI = arrResult[intColIdAbrSubOfi].ToString();
                                if (!drReader.IsDBNull(intColIdDesSubOfi)) tempEnEstorg.DES_SUBOFI = arrResult[intColIdDesSubOfi].ToString();


                                if (!drReader.IsDBNull(intColIdTupa)) tempEnTupa.ID_TUPA = int.Parse(arrResult[intColIdTupa].ToString());
                                if (!drReader.IsDBNull(intColIdDesTupa)) tempEnTupa.DES_TUPA = arrResult[intColIdDesTupa].ToString();
                                if (!drReader.IsDBNull(intColIdFlgTupa)) tempEnTupa.FLG_TUPA = int.Parse(arrResult[intColIdFlgTupa].ToString());

                                if (!drReader.IsDBNull(intColIdTupaConcepto)) tempEnTupaConcepto.ID_TUPA_CONCEPTO = int.Parse(arrResult[intColIdTupaConcepto].ToString());
                                if (!drReader.IsDBNull(intColIdDesTupaConcepto)) tempEnTupaConcepto.DES_TUPA_CONCEP = arrResult[intColIdDesTupaConcepto].ToString();
                                //modificado el 31/01/2020 - fortiz
                                if (!drReader.IsDBNull(intColIdCostoTupa)) tempEnTupaConcepto.COSTO_TUPA = decimal.Parse(arrResult[intColIdCostoTupa].ToString());
                                if (!drReader.IsDBNull(intColIdDesObs)) tempEnTupaConcepto.DES_OBS = arrResult[intColIdDesObs].ToString();
                                
                                if (!drReader.IsDBNull(intColIdDesComent)) tempEnMovi.DES_COMENT = arrResult[intColIdDesComent].ToString();
                                if (!drReader.IsDBNull(intColIdTipoPersona)) tempEnPersona.TIPO_PERSONA = arrResult[intColIdTipoPersona].ToString();

                                if (!drReader.IsDBNull(intColIdNomCompleto)) tempEnPersona.NOMBRECOMPLETO = arrResult[intColIdNomCompleto].ToString();
                                if (!drReader.IsDBNull(intColIdRuc)) tempEnPersona.RUC = arrResult[intColIdRuc].ToString();
                                if (!drReader.IsDBNull(intColIdJefe)) tempEnPersona.ID_JEFE = int.Parse(arrResult[intColIdJefe].ToString());

                                if (!drReader.IsDBNull(intColIdFormaPago)) tempEnPersona.ID_FORMA_PAGO = int.Parse(arrResult[intColIdFormaPago].ToString());
                                if (!drReader.IsDBNull(intColIdImpTotal)) tempEnPersona.IMP_TOTAL = int.Parse(arrResult[intColIdImpTotal].ToString());
                                if (!drReader.IsDBNull(intColIdFecPago)) tempEnPersona.FEC_PAGO = DateTime.Parse(arrResult[intColIdFecPago].ToString());
                                if (!drReader.IsDBNull(intColIdNumDocPago)) tempEnPersona.NUM_DOC_PAGO = arrResult[intColIdNumDocPago].ToString();
                                
                                if (!drReader.IsDBNull(intColIdObs)) tempEnMovi.DES_OBS = arrResult[intColIdObs].ToString();                                
                                if (!drReader.IsDBNull(intColIdFecMovi)) tempEnMovi.FEC_MOVI = DateTime.Parse(arrResult[intColIdFecMovi].ToString());

                                if (!drReader.IsDBNull(intColIdEstado)) tempEnEstado.ID_ESTADO = int.Parse(arrResult[intColIdEstado].ToString());

                                objEnMoviPivot = tempEnMovi;
                                objEnMoviPivot.enOrigen = tempEnOrigen;
                                objEnMoviPivot.enEstado = tempEnEstado;
                                objEnMoviPivot.enDoc = tempEnDoc;
                                objEnMoviPivot.enEstorgRemite = tempEnEstorg;
                                objEnMoviPivot.enTupa = tempEnTupa;
                                objEnMoviPivot.enTupaConcepto = tempEnTupaConcepto;
                                objEnMoviPivot.enPersona = tempEnPersona;
                               
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

            return objEnMoviPivot;
        }

        public List<enMovi> ListarExpeMovi(enMovi enObj)
        {

            List<enMovi> list = new List<enMovi>();

           OracleParameter[] parameters = new OracleParameter[]{
                    new OracleParameter("X_ID_EXPE", validarNulo(enObj.ID_EXPE)),
                    new OracleParameter("X_ID_ORIGEN", validarNulo(enObj.enOrigen, "ID_ORIGEN")),
                    new OracleParameter("X_ID_MOVI", validarNulo(enObj.ID_MOVI)),
                    new OracleParameter("X_ID_MOVI_ANT", validarNulo(enObj.ID_MOVI_ANT)),
                    new OracleParameter("X_ID_SUB", validarNulo(enObj.enEstorg ,"ID_SUB")),
                    new OracleParameter("X_ID_SUBOFI", validarNulo(enObj.enEstorg, "ID_SUBOFI")),
                    new OracleParameter("X_ID_SUB_REMITE", validarNulo(enObj.enEstorgRemite, "ID_SUB")),
                    new OracleParameter("X_ID_SUBOFI_REMITE", validarNulo(enObj.enEstorgRemite, "ID_SUBOFI")),
                    new OracleParameter("X_NUM_FOLIOS", validarNulo(enObj.NUM_FOLIOS)),
                    new OracleParameter("X_ID_PERSONA", validarNulo(enObj.enPersona, "ID_PERSONA")),
                    new OracleParameter("X_ID_TUPA", validarNulo(enObj.enTupa,"ID_TUPA")),
                    new OracleParameter("X_DES_ASUNTO", validarNulo(enObj.DES_ASUNTO)),
                    new OracleParameter("X_ID_ACCION", validarNulo(enObj.enAccion, "ID_ACCION")),
                    new OracleParameter("X_DES_OBS", validarNulo(enObj.DES_OBS)),
                    new OracleParameter("X_FEC_MOVI", validarNulo(enObj.FEC_MOVI)),
                    new OracleParameter("X_FEC_PLAZO", validarNulo(enObj.FEC_PLAZO)),
                    new OracleParameter("X_FEC_RECEP", validarNulo(enObj.FEC_RECEP)),
                    new OracleParameter("X_ID_TRATA", validarNulo(enObj.enTrata,"ID_TRATA")),
                    new OracleParameter("X_NUM_DOC", validarNulo(enObj.NUM_DOC)),
                    new OracleParameter("X_FLG_ORIGINAL", validarNulo(enObj.FLG_ORIGINAL)),
                    new OracleParameter("X_FLG_ANEXO", validarNulo(enObj.FLG_ANEXO)),
                    new OracleParameter("X_ID_ARCHIVO", validarNulo(enObj.ID_ARCHIVO)),
                    new OracleParameter("X_ID_PRIORI", validarNulo(enObj.enPriori,"ID_PRIORI")),
                    new OracleParameter("X_ID_ESTADO", validarNulo(enObj.ID_ESTADO)),
                    new OracleParameter("X_ID_TIP_DOC", validarNulo(enObj.ID_TIP_DOC)),
                    new OracleParameter("X_ID_CLASIF", validarNulo(enObj.enClasif, "ID_CLASIF")),
                    new OracleParameter("X_FEC_INI", validarNulo(enObj.FEC_INI)),
                    new OracleParameter("X_FEC_FIN", validarNulo(enObj.FEC_FIN)),
                    new OracleParameter("X_FEC_PLAZO_FIN", validarNulo(enObj.FEC_PLAZO_FIN)),
                    new OracleParameter("X_ID_ANO_PROC", validarNulo(enObj.ID_ANO_PROC)),
                    new OracleParameter("X_SEMAFORO", validarNulo(enObj.SEMAFORO)),
                    new OracleParameter("X_ID_USU", validarNulo(enObj.ID_USU)),
                    new OracleParameter("X_ID_SIS", validarNulo(enObj.ID_SIS)),
                    new OracleParameter("X_IP", validarNulo(enObj.IP)),
                    new OracleParameter("X_OPR", enObj.OPR),
                    new OracleParameter("CURSORS", OracleDbType.RefCursor, ParameterDirection.Output)
                };


            
            using (OracleConnection cn = new OracleConnection(this.CadenaConexion))
            {

                try
                {
                    using (OracleDataReader drReader = OracleHelper.ExecuteReader(cn, CommandType.StoredProcedure, "INSDBA.PKG_TDOCONSU.PRC_CONS_TDO2MOVI", parameters))
                    {
                        object[] arrResult = null;
                        if (drReader.HasRows)
                        {
                            arrResult = new object[drReader.FieldCount];

                            int intColIdExpe = drReader.GetOrdinal("ID_EXPE");
                            int intColIdMovi = drReader.GetOrdinal("ID_MOVI");
                            int intColIdSub = drReader.GetOrdinal("ID_SUB");
                            int intColIdSubOfi = drReader.GetOrdinal("ID_SUBOFI");
                            int intColAbrSubOfi = drReader.GetOrdinal("DES_SUB");
                            int intColFecMovi = drReader.GetOrdinal("FEC_MOVI");
                            int intColIdSubRemite = drReader.GetOrdinal("ID_SUB_REMITE");
                            int intColIdSubOfiRemite = drReader.GetOrdinal("ID_SUBOFI_REMITE");
                            int intColAbrSubOfiRemite = drReader.GetOrdinal("DES_SUB_REMITE");
                            int intColDesSubTodo = drReader.GetOrdinal("DES_SUB_TODO");
                            int intColID_ESTADO = drReader.GetOrdinal("ID_ESTADO");
                            int intColID_ESTADO_ANT = drReader.GetOrdinal("ID_ESTADO_ANT");
                            int intColDES_ESTADO = drReader.GetOrdinal("DES_ESTADO");
                            int intColABR_ESTADO = drReader.GetOrdinal("ABR_ESTADO");
                            int intColDesTrata = drReader.GetOrdinal("DES_TRATA");
                            int intColIdTrata = drReader.GetOrdinal("ID_TRATA");
                            int intColDesDoc = drReader.GetOrdinal("DES_DOC");
                            int intColDesDocDer = drReader.GetOrdinal("DES_DOC_DER");
                            int intColIdAnoProc = drReader.GetOrdinal("ID_ANO_PROC");
                            int intColIdDoc = drReader.GetOrdinal("ID_DOC");
                            int intColDesComentIni = drReader.GetOrdinal("DES_COMENT_INI");
                            

                            enMovi tempEnMovi = null;
                            enEstorg tempEnEstorg = null;
                            enEstorg tempEnEstorgRemite = null;
                            enEstado tempEnEstado = null;
                            enEstado tempEnEstadoAnt = null;
                            enTrata tempEnTrata = null;
                            enTipDoc tempEnTipDoc = null;

                            while (drReader.Read())
                            {
                                tempEnMovi = new enMovi();
                                tempEnEstorg = new enEstorg();
                                tempEnEstorgRemite = new enEstorg();
                                tempEnEstado = new enEstado();
                                tempEnEstadoAnt = new enEstado();
                                tempEnTrata = new enTrata();
                                tempEnTipDoc = new enTipDoc();

                                drReader.GetValues(arrResult);

                                if (!drReader.IsDBNull(intColIdExpe)) tempEnMovi.ID_EXPE = int.Parse(arrResult[intColIdExpe].ToString());
                                if (!drReader.IsDBNull(intColIdMovi)) tempEnMovi.ID_MOVI = int.Parse(arrResult[intColIdMovi].ToString());
                                if (!drReader.IsDBNull(intColFecMovi)) tempEnMovi.FEC_MOVI = DateTime.Parse(arrResult[intColFecMovi].ToString());
                                if (!drReader.IsDBNull(intColIdSub)) tempEnEstorg.ID_SUB = int.Parse(arrResult[intColIdSub].ToString());
                                if (!drReader.IsDBNull(intColIdSubOfi)) tempEnEstorg.ID_SUBOFI = arrResult[intColIdSubOfi].ToString();
                                if (!drReader.IsDBNull(intColAbrSubOfi)) tempEnEstorg.ABR_SUBOFI = arrResult[intColAbrSubOfi].ToString();
                                if (!drReader.IsDBNull(intColIdSubRemite)) tempEnEstorgRemite.ID_SUB = int.Parse(arrResult[intColIdSubRemite].ToString());
                                if (!drReader.IsDBNull(intColIdSubOfiRemite)) tempEnEstorgRemite.ID_SUBOFI = arrResult[intColIdSubOfiRemite].ToString();
                                if (!drReader.IsDBNull(intColIdSubOfiRemite)) tempEnEstorgRemite.ABR_SUBOFI = arrResult[intColAbrSubOfiRemite].ToString();
                                if (!drReader.IsDBNull(intColDesSubTodo)) tempEnMovi.DES_SUB_TODO = arrResult[intColDesSubTodo].ToString();
                                if (!drReader.IsDBNull(intColID_ESTADO)) tempEnEstado.ID_ESTADO = int.Parse(arrResult[intColID_ESTADO].ToString());
                                if (!drReader.IsDBNull(intColID_ESTADO_ANT)) tempEnEstadoAnt.ID_ESTADO = int.Parse(arrResult[intColID_ESTADO_ANT].ToString());
                                if (!drReader.IsDBNull(intColDES_ESTADO)) tempEnEstado.DES_ESTADO = arrResult[intColDES_ESTADO].ToString();
                                if (!drReader.IsDBNull(intColABR_ESTADO)) tempEnEstado.ABR_ESTADO = arrResult[intColABR_ESTADO].ToString();
                                if (!drReader.IsDBNull(intColIdTrata)) tempEnTrata.ID_TRATA = int.Parse(arrResult[intColIdTrata].ToString());
                                if (!drReader.IsDBNull(intColDesTrata)) tempEnTrata.DES_TRATA = arrResult[intColDesTrata].ToString();
                                if (!drReader.IsDBNull(intColDesDoc)) tempEnTipDoc.DES_DOC = arrResult[intColDesDoc].ToString();
                                if (!drReader.IsDBNull(intColIdAnoProc)) tempEnMovi.ANIO = int.Parse(arrResult[intColIdAnoProc].ToString());
                                if (!drReader.IsDBNull(intColIdDoc)) tempEnTipDoc.ID_DOC = int.Parse(arrResult[intColIdDoc].ToString());
                                if (!drReader.IsDBNull(intColDesComentIni)) tempEnMovi.DES_COMENT_INI = arrResult[intColDesComentIni].ToString();
                                  
                                tempEnMovi.enEstorg = tempEnEstorg;
                                tempEnMovi.enEstorgRemite = tempEnEstorgRemite;
                                tempEnMovi.enEstado = tempEnEstado;
                                tempEnMovi.enEstadoAnt = tempEnEstadoAnt;
                                tempEnMovi.enTrata = tempEnTrata;
                                tempEnMovi.enTipDoc = tempEnTipDoc;

                                list.Add(tempEnMovi);                               
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

        public coResultadoDB mantenimiento(enMovi objEn)
        {
            coResultadoDB objCoResultadoDB = null;

            OracleParameter[] arrParameters = new OracleParameter[] {
                new OracleParameter("X_ID_EXPE",validarNulo(objEn.ID_EXPE)),           
                new OracleParameter("X_ID_MOVI",validarNulo(objEn.ID_MOVI)),           
                new OracleParameter("X_ID_MOVI_ANT",validarNulo(objEn.ID_MOVI_ANT)),           
                new OracleParameter("X_ID_ANO_PROC",validarNulo(objEn.ID_ANO_PROC)),           
                new OracleParameter("X_ID_SUB",validarNulo(objEn.enEstorg, "ID_SUB")),           
                new OracleParameter("X_ID_SUBOFI",validarNulo(objEn.enEstorg, "ID_SUBOFI")),           
                new OracleParameter("X_ID_SUB_REMITE",validarNulo(objEn.enEstorgRemite, "ID_SUB")),           
                new OracleParameter("X_ID_SUBOFI_REMITE",validarNulo(objEn.enEstorgRemite, "ID_SUBOFI")), 
                new OracleParameter("X_ID_PERSONA",validarNulo(objEn.enPersona, "ID_PERSONA")),           
                new OracleParameter("X_ID_ACCION",validarNulo(objEn.enAccion, "ID_ACCION")),           
                new OracleParameter("X_ID_PRIORI",validarNulo(objEn.enPriori, "ID_PRIORI")),                                     
                new OracleParameter("X_ID_TRATA",validarNulo(objEn.enTrata, "ID_TRATA")),           
                new OracleParameter("X_ID_ARCHIVO",validarNulo(objEn.ID_ARCHIVO)), 
                new OracleParameter("X_ID_DOC",validarNulo(objEn.enTipDoc, "ID_DOC")),           
                new OracleParameter("X_ID_TIP_DOC",validarNulo(objEn.enTipDoc, "ID_TIP_DOC")),
                new OracleParameter("X_ID_TIP_DOC_DER",validarNulo(objEn.enTipDocDerivado, "ID_TIP_DOC")), 
                new OracleParameter("X_NUM_DOC",validarNulo(objEn.enTipDoc, "NUM_DOC")),  
                new OracleParameter("X_NUM_DOC_DER",validarNulo(objEn.enTipDocDerivado, "NUM_DOC")), 
                new OracleParameter("X_NUM_FOLIOS",validarNulo(objEn.enTipDoc, "NUM_FOLIOS")),
                new OracleParameter("X_NUM_PLAZO",validarNulo(objEn.enTipDoc, "NUM_PLAZO")),
                new OracleParameter("X_FLG_ORIGINAL",validarNulo(objEn.FLG_ORIGINAL)),           
                new OracleParameter("X_FLG_CORRESP",validarNulo(objEn.FLG_CORRESP)),  
                new OracleParameter("X_FEC_MOVI",validarNulo(objEn.FEC_MOVI)), 
                new OracleParameter("X_FEC_PLAZO", validarNulo(objEn.FEC_PLAZO)),
                new OracleParameter("X_FEC_RECEP",validarNulo(objEn.FEC_RECEP)), 
                new OracleParameter("X_DES_OBS",validarNulo(objEn.DES_OBS)),           
                new OracleParameter("X_DES_COMENT",validarNulo(objEn.DES_COMENT)),           
                new OracleParameter("X_DES_DOC",validarNulo(objEn.enTipDoc, "DES_DOC")),           
                new OracleParameter("X_DES_DOC_DER",validarNulo(objEn.enTipDoc, "DES_DOC_DER")),           
                new OracleParameter("X_ID_ESTADO",validarNulo(objEn.enEstado, "ID_ESTADO")),           
                new OracleParameter("X_ID_USU",validarNulo(objEn.ID_USU)),
                new OracleParameter("X_ID_SIS",validarNulo(objEn.ID_SIS)),                                     
                new OracleParameter("X_IP",validarNulo(objEn.IP)),           
                new OracleParameter("X_OPR",validarNulo(objEn.OPR)),        
                new OracleParameter("X_ERROR", OracleDbType.RefCursor, direction: System.Data.ParameterDirection.InputOutput)          
            };
            using (daUDml objDaUDml = new daUDml())
            {
                objCoResultadoDB = objDaUDml.ejecutarDml(arrParameters, "INSDBA.PKG_TDOMANT.PRC_TDO2MOVI");
            }
            return objCoResultadoDB;
        }
    }
}
