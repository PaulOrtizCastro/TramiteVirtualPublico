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
    public class DaDoc : daBase
    {
        public List<enDoc> traeListaDoc(enDoc objEnDoc)
        {
            List<enDoc> lstTable = new List<enDoc>();


            OracleParameter[] arrParameters = new OracleParameter[]{
                new OracleParameter("X_ID_DOC", validarNulo(objEnDoc.ID_DOC)),
                new OracleParameter("X_ID_ANO_PROC", validarNulo(objEnDoc.ID_ANO_PROC)),
                new OracleParameter("X_ID_TIP_DOC", validarNulo(objEnDoc.ID_TIP_DOC)),
                new OracleParameter("X_ID_SUB", validarNulo(objEnDoc.ID_SUB)),
                new OracleParameter("X_ID_SUBOFI", validarNulo(objEnDoc.ID_SUBOFI)),
                new OracleParameter("X_ID_EXPE", validarNulo(objEnDoc.ID_EXPE)),
                new OracleParameter("X_ID_MOVI", validarNulo(objEnDoc.ID_MOVI)),
                new OracleParameter("X_ID_USU", validarNulo(objEnDoc.ID_USU)),
                new OracleParameter("X_ID_ESTADO", validarNulo(objEnDoc.ID_ESTADO)),
                new OracleParameter("X_DES_DOC", validarNulo(objEnDoc.DES_DOC)),
                new OracleParameter("X_USU_CREA", validarNulo(objEnDoc.USU_CREA)),
                new OracleParameter("X_NUM_DOC", validarNulo(objEnDoc.NUM_DOC)),
                new OracleParameter("X_FEC_INI", validarNulo(objEnDoc.FEC_INI)),
                new OracleParameter("X_FEC_FIN", validarNulo(objEnDoc.FEC_VIGE)),
                new OracleParameter("X_FLG_EST", validarNulo(objEnDoc.FLG_EST)),
                new OracleParameter("X_OPR", objEnDoc.OPR),
                new OracleParameter("X_CURSOR",OracleDbType.RefCursor, ParameterDirection.Output)
            };


            using (OracleConnection cn = new OracleConnection(this.CadenaConexion))
            {
                try
                {
                    using (OracleDataReader drReader = OracleHelper.ExecuteReader(cn, CommandType.StoredProcedure, "INSDBA.PKG_TDOCONSU.PRC_CONS_TDO3DOC", arrParameters))
                    {
                        object[] arrResult = null;
                        if (drReader.HasRows)
                        {
                            arrResult = new object[drReader.FieldCount];

                            int intColID_DOC = drReader.GetOrdinal("ID_DOC");
                            int intColID_ANO_PROC = drReader.GetOrdinal("ID_ANO_PROC");
                            int intColID_SUB = drReader.GetOrdinal("ID_SUB");
                            int intColID_SUBOFI = drReader.GetOrdinal("ID_SUBOFI");
                            int intColID_USU = drReader.GetOrdinal("ID_USU");
                            int intColID_ESTADO = drReader.GetOrdinal("ID_ESTADO");
                            int intColDES_ESTADO = drReader.GetOrdinal("DES_ESTADO");
                            int intColID_EXPE = drReader.GetOrdinal("ID_EXPE");
                            int intColID_MOVI = drReader.GetOrdinal("ID_MOVI");
                            int intColID_TIP_DOC = drReader.GetOrdinal("ID_TIP_DOC");
                            int intColNUM_DOC = drReader.GetOrdinal("NUM_DOC");
                            int intColDES_DOC = drReader.GetOrdinal("DES_DOC");
                            int intColDES_TIP_DOC = drReader.GetOrdinal("DES_TIP_DOC");
                            int intColDES_OBS = drReader.GetOrdinal("DES_OBS");
                            int intColFLG_EST = drReader.GetOrdinal("FLG_EST");
                            int intColDES_EST = drReader.GetOrdinal("DES_EST");
                            int intColFEC_INI = drReader.GetOrdinal("FEC_INI");
                            int intColFEC_VIGE = drReader.GetOrdinal("FEC_VIGE");
                            int intColUSU_CREA = drReader.GetOrdinal("USU_CREA");
                            int intColUSU_MODI = drReader.GetOrdinal("USU_MODI");
                            int intColDESC_USU = drReader.GetOrdinal("DESC_USU");
                            int intColDESC_OFI_ABR = drReader.GetOrdinal("DESC_OFI_ABR");
                            
                            int intColDES_TITULO = 0;
                            int intColDES_REMITE = 0;
                            int intColDES_CARGO_REMITE = 0;
                            int intColDES_DESTINO = 0;
                            int intColDES_CARGO_DESTINO = 0;

                            if (objEnDoc.OPR == "2") {
                                intColDES_TITULO = drReader.GetOrdinal("DES_TITULO");
                                intColDES_REMITE = drReader.GetOrdinal("DES_REMITE");
                                intColDES_CARGO_REMITE = drReader.GetOrdinal("DES_CARGO_REMITE");
                                intColDES_DESTINO = drReader.GetOrdinal("DES_DESTINO");
                                intColDES_CARGO_DESTINO = drReader.GetOrdinal("DES_CARGO_DESTINO");
                            }
                            
                            //int intColDES_HEADER = drReader.GetOrdinal("DES_HEADER");


                            enDoc objEnDocPivot = null;
                            

                            while (drReader.Read())
                            {
                                drReader.GetValues(arrResult);

                                objEnDocPivot = new enDoc();


                                if (!drReader.IsDBNull(intColID_DOC)) objEnDocPivot.ID_DOC = int.Parse(arrResult[intColID_DOC].ToString());
                                if (!drReader.IsDBNull(intColID_ANO_PROC)) objEnDocPivot.ID_ANO_PROC = int.Parse(arrResult[intColID_ANO_PROC].ToString());
                                if (!drReader.IsDBNull(intColID_SUB)) objEnDocPivot.ID_SUB = int.Parse(arrResult[intColID_SUB].ToString());

                                if (!drReader.IsDBNull(intColID_SUBOFI)) objEnDocPivot.ID_SUBOFI = arrResult[intColID_SUBOFI].ToString();
                                if (!drReader.IsDBNull(intColID_USU)) objEnDocPivot.ID_USU = int.Parse(arrResult[intColID_USU].ToString());
                                if (!drReader.IsDBNull(intColID_ESTADO)) objEnDocPivot.ID_ESTADO = int.Parse(arrResult[intColID_ESTADO].ToString());
                                if (!drReader.IsDBNull(intColDES_ESTADO)) objEnDocPivot.DES_ESTADO = arrResult[intColDES_ESTADO].ToString();
                                if (!drReader.IsDBNull(intColID_EXPE)) objEnDocPivot.ID_EXPE = int.Parse(arrResult[intColID_EXPE].ToString());

                                if (!drReader.IsDBNull(intColID_MOVI)) objEnDocPivot.ID_MOVI = int.Parse(arrResult[intColID_MOVI].ToString());
                                if (!drReader.IsDBNull(intColID_TIP_DOC)) objEnDocPivot.ID_TIP_DOC = int.Parse(arrResult[intColID_TIP_DOC].ToString());
                                if (!drReader.IsDBNull(intColNUM_DOC)) objEnDocPivot.NUM_DOC = arrResult[intColNUM_DOC].ToString();

                                if (!drReader.IsDBNull(intColDES_DOC)) objEnDocPivot.DES_DOC = arrResult[intColDES_DOC].ToString();
                                if (!drReader.IsDBNull(intColDES_TIP_DOC)) objEnDocPivot.DES_TITULO_PROYECTO = arrResult[intColDES_TIP_DOC].ToString();
                                if (!drReader.IsDBNull(intColDES_OBS)) objEnDocPivot.DES_OBS = arrResult[intColDES_OBS].ToString();
                                if (!drReader.IsDBNull(intColFLG_EST)) objEnDocPivot.FLG_EST = int.Parse(arrResult[intColFLG_EST].ToString());

                                if (!drReader.IsDBNull(intColDES_EST)) objEnDocPivot.DES_EST = arrResult[intColDES_EST].ToString();
                                if (!drReader.IsDBNull(intColFEC_INI)) objEnDocPivot.FEC_INI = DateTime.Parse(arrResult[intColFEC_INI].ToString());
                                if (!drReader.IsDBNull(intColFEC_VIGE)) objEnDocPivot.FEC_VIGE = DateTime.Parse(arrResult[intColFEC_VIGE].ToString());

                                if (!drReader.IsDBNull(intColUSU_CREA)) objEnDocPivot.USU_CREA = int.Parse(arrResult[intColUSU_CREA].ToString());
                                if (!drReader.IsDBNull(intColUSU_MODI)) objEnDocPivot.USU_MODI = int.Parse(arrResult[intColUSU_MODI].ToString());
                                if (!drReader.IsDBNull(intColDESC_USU)) objEnDocPivot.DESC_USU = arrResult[intColDESC_USU].ToString();

                                if (!drReader.IsDBNull(intColDESC_OFI_ABR)) objEnDocPivot.DESC_OFI_ABR = arrResult[intColDESC_OFI_ABR].ToString();

                                if (objEnDoc.OPR == "2") {
                                    if (!drReader.IsDBNull(intColDES_TITULO)) objEnDocPivot.DES_TITULO = arrResult[intColDES_TITULO].ToString();
                                    if (!drReader.IsDBNull(intColDES_REMITE)) objEnDocPivot.DES_REMITE = arrResult[intColDES_REMITE].ToString();
                                    if (!drReader.IsDBNull(intColDES_CARGO_REMITE)) objEnDocPivot.DES_CARGO_REMITE = arrResult[intColDES_CARGO_REMITE].ToString();
                                    if (!drReader.IsDBNull(intColDES_DESTINO)) objEnDocPivot.DES_DESTINO = arrResult[intColDES_DESTINO].ToString();
                                    if (!drReader.IsDBNull(intColDES_CARGO_DESTINO)) objEnDocPivot.DES_CARGO_DESTINO = arrResult[intColDES_CARGO_DESTINO].ToString();
                                }
                                
                                
                                lstTable.Add(objEnDocPivot);
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
