using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Mincetur.Administracion.TramiteDocumentario.EnTramiteDocumentario;
using Oracle.DataAccess.Client;
using System.Data;
using Mincetur.Administracion.AplTramiteVirtualPublico.DaTramiteVirtualPublico.DataBaseHelpers;

namespace Mincetur.Administracion.AplTramiteVirtualPublico.DaTramiteVirtualPublico
{
    public class daArchExpeRequi : daBase
    {
        public List<enArchExpeRequi> listar(enArchExpeRequi objEnArchExpeRequi)
        {
            List<enArchExpeRequi> lstTable = new List<enArchExpeRequi>();


            OracleParameter[] arrParameters = new OracleParameter[]{
                new OracleParameter("X_ID_ARCHIREQUIEXPE", validarNulo(objEnArchExpeRequi.ID_ARCHIREQUIEXPE)),
                new OracleParameter("X_ID_EXPE", validarNulo(objEnArchExpeRequi.ID_EXPE)),
                new OracleParameter("X_ID_TUPA", validarNulo(objEnArchExpeRequi.enTupa, "ID_TUPA")),
                new OracleParameter("X_ID_TUPA_REQUI", validarNulo(objEnArchExpeRequi.enRequi,"ID_TUPA_REQUI")),
                new OracleParameter("X_ID_TUPA_CONCEPTO", null),
                new OracleParameter("X_ID_DOC_CMS", validarNulo(objEnArchExpeRequi.ID_DOC_CMS)),
                new OracleParameter("X_FLG_PAGO", validarNulo(objEnArchExpeRequi.FLG_PAGO)),
                new OracleParameter("X_FLG_EST", validarNulo(objEnArchExpeRequi.FLG_EST)),
                new OracleParameter("X_DATO", null),
                new OracleParameter("X_OPR", objEnArchExpeRequi.OPR),
                new OracleParameter("X_CURSOR",OracleDbType.RefCursor, ParameterDirection.Output)
            };


            using (OracleConnection cn = new OracleConnection(this.CadenaConexion))
            {
                try
                {
                    using (OracleDataReader drReader = OracleHelper.ExecuteReader(cn, CommandType.StoredProcedure, "INSDBA.PKG_TDVCONSU.PRC_CONS_TDO3ARCH_EXPEREQUI", arrParameters))
                    {
                        object[] arrResult = null;
                        if (drReader.HasRows)
                        {
                            arrResult = new object[drReader.FieldCount];

                            int intColIdArchRequiExpe = drReader.GetOrdinal("ID_ARCHIREQUIEXPE");
                            int intColIdExpe = drReader.GetOrdinal("ID_EXPE");
                            int intColIdTupa = drReader.GetOrdinal("ID_TUPA");
                            int intColIdTupaRequi = drReader.GetOrdinal("ID_TUPA_REQUI");
                            int intColIdTupaConcepto = drReader.GetOrdinal("ID_TUPA_CONCEPTO");

                            int intColDesTupaRequi = drReader.GetOrdinal("DES_TUPA_REQUI");
                            int intColAbrTupaRequi = drReader.GetOrdinal("ABR_TUPA_REQUI");
                            int intColDesRequi = drReader.GetOrdinal("DES_REQUI");
                            int intColAbrRequi = drReader.GetOrdinal("ABR_REQUI");
                            int intColDesObs = drReader.GetOrdinal("DES_OBS");
                            int intColFlgTupa = drReader.GetOrdinal("FLG_TUPA");

                            int intColIdDocCms = drReader.GetOrdinal("ID_DOC_CMS");
                            int intColDesNom = drReader.GetOrdinal("DES_NOM");
                            int intColDesNomAbr = drReader.GetOrdinal("DES_NOM_ABR");
                            int intColDesRuta = drReader.GetOrdinal("DES_RUTA");
                            int intColIdTipo = drReader.GetOrdinal("ID_TIPO");
                            int intColNumSizeArchivo = drReader.GetOrdinal("NUM_SIZE_ARCHIVO");
                            int intColFlgEst = drReader.GetOrdinal("FLG_EST");
                            int intColIdUsu = drReader.GetOrdinal("ID_USU");
                            int intColFecCrea = drReader.GetOrdinal("FEC_CREA");
                            int intColCodCms = drReader.GetOrdinal("COD_CMS");


                            enArchExpeRequi objEnPivot = null;


                            while (drReader.Read())
                            {
                                drReader.GetValues(arrResult);

                                objEnPivot = new enArchExpeRequi();


                                objEnPivot = new enArchExpeRequi()
                                {
                                    enTupa = new enTupa()
                                    {
                                        EnRequi = new enRequi()
                                    },
                                    enRequi = new enRequi()
                                };

                                if (!drReader.IsDBNull(intColIdArchRequiExpe)) objEnPivot.ID_ARCHIREQUIEXPE = int.Parse(arrResult[intColIdArchRequiExpe].ToString());
                                if (!drReader.IsDBNull(intColIdExpe)) objEnPivot.ID_EXPE = int.Parse(arrResult[intColIdExpe].ToString());
                                if (!drReader.IsDBNull(intColIdTupa)) objEnPivot.enTupa.ID_TUPA = int.Parse(arrResult[intColIdTupa].ToString());
                                if (!drReader.IsDBNull(intColIdTupaRequi)) objEnPivot.enRequi.ID_TUPA_REQUI = int.Parse(arrResult[intColIdTupaRequi].ToString());

                                if (!drReader.IsDBNull(intColAbrTupaRequi)) objEnPivot.enTupa.EnRequi.ABR_REQUI = arrResult[intColAbrTupaRequi].ToString();
                                if (!drReader.IsDBNull(intColDesTupaRequi)) objEnPivot.enTupa.EnRequi.DES_REQUI = arrResult[intColDesTupaRequi].ToString();
                                if (!drReader.IsDBNull(intColAbrRequi)) objEnPivot.enRequi.ABR_REQUI = arrResult[intColAbrRequi].ToString();
                                if (!drReader.IsDBNull(intColDesRequi)) objEnPivot.enRequi.DES_REQUI = arrResult[intColDesRequi].ToString();
                                if (!drReader.IsDBNull(intColDesObs)) objEnPivot.DES_OBS = arrResult[intColDesObs].ToString();

                                if (!drReader.IsDBNull(intColIdDocCms)) objEnPivot.ID_DOC_CMS = int.Parse(arrResult[intColIdDocCms].ToString());
                                if (!drReader.IsDBNull(intColCodCms)) objEnPivot.COD_CMS = arrResult[intColCodCms].ToString();
                                if (!drReader.IsDBNull(intColDesNom)) objEnPivot.DES_NOM = arrResult[intColDesNom].ToString();
                                if (!drReader.IsDBNull(intColDesNomAbr)) objEnPivot.DES_NOM_ABR = arrResult[intColDesNomAbr].ToString();
                                if (!drReader.IsDBNull(intColDesRuta)) objEnPivot.DES_RUTA = arrResult[intColDesRuta].ToString();
                                if (!drReader.IsDBNull(intColIdTipo)) objEnPivot.ID_TIPO = arrResult[intColIdTipo].ToString();
                                if (!drReader.IsDBNull(intColNumSizeArchivo)) objEnPivot.NUM_SIZE_ARCHIVO = int.Parse(arrResult[intColNumSizeArchivo].ToString());
                                if (!drReader.IsDBNull(intColFlgEst)) objEnPivot.FLG_EST = int.Parse(arrResult[intColFlgEst].ToString());
                                if (!drReader.IsDBNull(intColIdUsu)) objEnPivot.ID_USU = int.Parse(arrResult[intColIdUsu].ToString());
                                if (!drReader.IsDBNull(intColFecCrea)) objEnPivot.FEC_REG = DateTime.Parse(arrResult[intColFecCrea].ToString());
                                if (!drReader.IsDBNull(intColCodCms)) objEnPivot.COD_CMS = arrResult[intColCodCms].ToString();

                                lstTable.Add(objEnPivot);
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

        public List<enArchExpeRequi> listarArchivosPagoTupa(enArchExpeRequi objEnArchExpeRequi)
        {
            List<enArchExpeRequi> lstTable = new List<enArchExpeRequi>();


            OracleParameter[] arrParameters = new OracleParameter[]{
                new OracleParameter("X_ID_EXPE", validarNulo(objEnArchExpeRequi.ID_EXPE)),
                new OracleParameter("X_FLG_PAGO", validarNulo(objEnArchExpeRequi.FLG_PAGO)),
                new OracleParameter("X_ID_SIS", validarNulo(objEnArchExpeRequi.ID_SIS)),
                new OracleParameter("X_CURSOR",OracleDbType.RefCursor, ParameterDirection.Output)
            };


            using (OracleConnection cn = new OracleConnection(this.CadenaConexion))
            {
                try
                {
                    using (OracleDataReader drReader = OracleHelper.ExecuteReader(cn, CommandType.StoredProcedure, "INSDBA.PKG_TDVCONSU.PRC_CONS_LISTA_ARCHIVOS_DOC", arrParameters))
                    {
                        object[] arrResult = null;
                        if (drReader.HasRows)
                        {
                            arrResult = new object[drReader.FieldCount];

                            int intColIdArchRequiExpe = drReader.GetOrdinal("ID_ARCHIREQUIEXPE");
                            int intColIdExpe = drReader.GetOrdinal("ID_EXPE");
                            int intColDesObs = drReader.GetOrdinal("DES_OBS");
                            int intColNumSizeArchivo = drReader.GetOrdinal("NUM_SIZE_ARCHIVO");
                            int intColDesNomAbr = drReader.GetOrdinal("DES_NOM_ABR");
                            int intColIdDocCms = drReader.GetOrdinal("ID_DOC_CMS");
                            int intColDesNom = drReader.GetOrdinal("DES_NOM");
                            int intColIdTupa = drReader.GetOrdinal("ID_TUPA");
                            int intColIdTupaConcepto = drReader.GetOrdinal("ID_TUPA_CONCEPTO");
                            int intColIdTupaRequi = drReader.GetOrdinal("ID_TUPA_REQUI");

                            enArchExpeRequi objEnPivot = null;

                            while (drReader.Read())
                            {
                                drReader.GetValues(arrResult);

                                objEnPivot = new enArchExpeRequi();


                                objEnPivot = new enArchExpeRequi()
                                {
                                    enTupa = new enTupa()
                                    {
                                        EnRequi = new enRequi()
                                    },
                                    enRequi = new enRequi()                                    
                                };

                                if (!drReader.IsDBNull(intColIdArchRequiExpe)) objEnPivot.ID_ARCHIREQUIEXPE = int.Parse(arrResult[intColIdArchRequiExpe].ToString());
                                if (!drReader.IsDBNull(intColIdExpe)) objEnPivot.ID_EXPE = int.Parse(arrResult[intColIdExpe].ToString());                                
                                if (!drReader.IsDBNull(intColDesObs)) objEnPivot.DES_OBS = arrResult[intColDesObs].ToString();
                                if (!drReader.IsDBNull(intColNumSizeArchivo)) objEnPivot.NUM_SIZE_ARCHIVO = int.Parse(arrResult[intColNumSizeArchivo].ToString());
                                if (!drReader.IsDBNull(intColDesNomAbr)) objEnPivot.DES_NOM_ABR = arrResult[intColDesNomAbr].ToString();
                                if (!drReader.IsDBNull(intColIdDocCms)) objEnPivot.ID_DOC_CMS = int.Parse(arrResult[intColIdDocCms].ToString());
                                if (!drReader.IsDBNull(intColDesNom)) objEnPivot.DES_NOM = arrResult[intColDesNom].ToString();
                                if (!drReader.IsDBNull(intColIdTupa)) objEnPivot.enTupa.ID_TUPA = int.Parse(arrResult[intColIdTupa].ToString());
                                if (!drReader.IsDBNull(intColIdTupaRequi)) objEnPivot.enRequi.ID_TUPA_REQUI = int.Parse(arrResult[intColIdTupaRequi].ToString());


                                lstTable.Add(objEnPivot);
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
    }
}