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
    public class daTupa : daBase
    {
        public List<enTupa> traeListaTupa(enTupa objEnTupa)
        {
            List<enTupa> lstTable = new List<enTupa>();


            OracleParameter[] arrParameters = new OracleParameter[]{
                new OracleParameter("X_ID_TUPA", validarNulo(objEnTupa.ID_TUPA)),
                new OracleParameter("X_DES_NOM", validarNulo(objEnTupa.DES_NOM)),
                new OracleParameter("X_COD_TUPA", validarNulo(objEnTupa.COD_TUPA)),
                new OracleParameter("X_ID_VERSION", validarNulo(objEnTupa.ID_VERSION)),
                new OracleParameter("X_ID_TIP_DOC", validarNulo(objEnTupa.ID_TIP_DOC)),
                new OracleParameter("X_FLG_EST", validarNulo(objEnTupa.FLG_EST)),
                new OracleParameter("X_OPR", objEnTupa.OPR),
                new OracleParameter("CURSORS",OracleDbType.RefCursor, ParameterDirection.Output)
            };


            using (OracleConnection cn = new OracleConnection(this.CadenaConexion))
            {
                try
                {
                    using (OracleDataReader drReader = OracleHelper.ExecuteReader(cn, CommandType.StoredProcedure, "INSDBA.PKG_TDOCONSU.PRC_CONS_TDO1TUPA", arrParameters))
                    {
                        object[] arrResult = null;
                        if (drReader.HasRows)
                        {
                            arrResult = new object[drReader.FieldCount];

                            int intColID_TUPA = drReader.GetOrdinal("ID_TUPA");
                            int intColDES_NOM = drReader.GetOrdinal("DES_NOM");
                            int intColID_VERSION = drReader.GetOrdinal("ID_VERSION");
                            int intColID_TIP_DOC = drReader.GetOrdinal("ID_TIP_DOC");
                            int intColDES_TIP_DOC = drReader.GetOrdinal("DES_TIP_DOC");
                            int intColCOD_TUPA = drReader.GetOrdinal("COD_TUPA");
                            int intColPUIT = drReader.GetOrdinal("PUIT");
                            int intColDES_BASE_LEGAL = drReader.GetOrdinal("DES_BASE_LEGAL");
                            int intColTOT_COSTO = drReader.GetOrdinal("TOT_COSTO");
                            int intColFEC_INI = drReader.GetOrdinal("FEC_INI");
                            int intColFEC_VIGE = drReader.GetOrdinal("FEC_VIGE");
                            int intColUSU_CREA = drReader.GetOrdinal("USU_CREA");
                            int intColTIEMPO = drReader.GetOrdinal("TIEMPO");
                            int intColUSU_MODI = drReader.GetOrdinal("USU_MODI");
                            int intColPLAZO_INI_RECO = drReader.GetOrdinal("PLAZO_INI_RECO");
                            int intColFLG_EST = drReader.GetOrdinal("FLG_EST");
                            int intColDES_EST = drReader.GetOrdinal("DES_EST");
                            int intColPLAZO_FIN_RECO = drReader.GetOrdinal("PLAZO_FIN_RECO");
                            int intColPLAZO_INI_APELA = drReader.GetOrdinal("PLAZO_INI_APELA");
                            int intColPLAZO_FIN_APELA = drReader.GetOrdinal("PLAZO_FIN_APELA");
                            int intColID_SILENCIO = drReader.GetOrdinal("ID_SILENCIO");
                            int intColDES_SILENCIO = drReader.GetOrdinal("DES_SILENCIO");
                            int intColFEC_PLAZO = drReader.GetOrdinal("FEC_PLAZO");
                            int intColDES_SUBOFI = drReader.GetOrdinal("DES_SUBOFI");

                            enTupa objEnTupaPivot = null;
                            enSilencio objEnSilencio = null;

                            while (drReader.Read())
                            {
                                drReader.GetValues(arrResult);

                                objEnTupaPivot = new enTupa();
                                objEnSilencio = new enSilencio();
                                


                                if (!drReader.IsDBNull(intColID_TUPA)) objEnTupaPivot.ID_TUPA = int.Parse(arrResult[intColID_TUPA].ToString());
                                if (!drReader.IsDBNull(intColDES_NOM)) objEnTupaPivot.DES_NOM = arrResult[intColDES_NOM].ToString();
                                if (!drReader.IsDBNull(intColID_VERSION)) objEnTupaPivot.ID_VERSION = int.Parse(arrResult[intColID_VERSION].ToString());

                                if (!drReader.IsDBNull(intColID_TIP_DOC)) objEnTupaPivot.ID_TIP_DOC = arrResult[intColID_TIP_DOC].ToString();
                                if (!drReader.IsDBNull(intColDES_TIP_DOC)) objEnTupaPivot.DES_TIP_DOC = arrResult[intColDES_TIP_DOC].ToString();
                                if (!drReader.IsDBNull(intColCOD_TUPA)) objEnTupaPivot.COD_TUPA = arrResult[intColCOD_TUPA].ToString();
                                if (!drReader.IsDBNull(intColPUIT)) objEnTupaPivot.PUIT = double.Parse(arrResult[intColPUIT].ToString());
                                if (!drReader.IsDBNull(intColDES_BASE_LEGAL)) objEnTupaPivot.DES_BASE_LEGAL = arrResult[intColDES_BASE_LEGAL].ToString();

                                if (!drReader.IsDBNull(intColTOT_COSTO)) objEnTupaPivot.TOT_COSTO = double.Parse(arrResult[intColTOT_COSTO].ToString());
                                if (!drReader.IsDBNull(intColFEC_INI)) objEnTupaPivot.FEC_INI = DateTime.Parse(arrResult[intColFEC_INI].ToString());
                                if (!drReader.IsDBNull(intColFEC_VIGE)) objEnTupaPivot.FEC_VIGE = DateTime.Parse(arrResult[intColFEC_VIGE].ToString());

                                if (!drReader.IsDBNull(intColUSU_CREA)) objEnTupaPivot.USU_CREA = int.Parse(arrResult[intColUSU_CREA].ToString());
                                if (!drReader.IsDBNull(intColTIEMPO)) objEnTupaPivot.TIEMPO = int.Parse(arrResult[intColTIEMPO].ToString());
                                if (!drReader.IsDBNull(intColUSU_MODI)) objEnTupaPivot.USU_MODI = int.Parse(arrResult[intColUSU_MODI].ToString());
                                if (!drReader.IsDBNull(intColPLAZO_INI_RECO)) objEnTupaPivot.PLAZO_INI_RECO = int.Parse(arrResult[intColPLAZO_INI_RECO].ToString());

                                if (!drReader.IsDBNull(intColFLG_EST)) objEnTupaPivot.FLG_EST = int.Parse(arrResult[intColFLG_EST].ToString());
                                if (!drReader.IsDBNull(intColDES_EST)) objEnTupaPivot.DES_EST = arrResult[intColDES_EST].ToString();
                                if (!drReader.IsDBNull(intColPLAZO_FIN_RECO)) objEnTupaPivot.PLAZO_FIN_RECO = int.Parse(arrResult[intColPLAZO_FIN_RECO].ToString());

                                if (!drReader.IsDBNull(intColPLAZO_INI_APELA)) objEnTupaPivot.PLAZO_INI_APELA = int.Parse(arrResult[intColPLAZO_INI_APELA].ToString());
                                if (!drReader.IsDBNull(intColPLAZO_FIN_APELA)) objEnTupaPivot.PLAZO_FIN_APELA = int.Parse(arrResult[intColPLAZO_FIN_APELA].ToString());
                                if (!drReader.IsDBNull(intColID_SILENCIO)) objEnSilencio.ID_SILENCIO = int.Parse(arrResult[intColID_SILENCIO].ToString());

                                if (!drReader.IsDBNull(intColDES_SILENCIO)) objEnSilencio.DES_SILENCIO = arrResult[intColDES_SILENCIO].ToString();
                                if (!drReader.IsDBNull(intColFEC_PLAZO)) objEnTupaPivot.FEC_PLAZO = DateTime.Parse(arrResult[intColFEC_PLAZO].ToString());
                                if (!drReader.IsDBNull(intColDES_SUBOFI)) objEnTupaPivot.DESC_OFI = arrResult[intColDES_SUBOFI].ToString();
                                

                                objEnTupaPivot.EnSilencio = objEnSilencio;
                                lstTable.Add(objEnTupaPivot);
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
