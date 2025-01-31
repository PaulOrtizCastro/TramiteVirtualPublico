using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Oracle.DataAccess.Client;
using System.Data;

using Mincetur.Administracion.TramiteDocumentario.CoTramiteDocumentario;
using Mincetur.Administracion.TramiteDocumentario.EnTramiteDocumentario;
using Mincetur.Administracion.AplTramiteVirtualPublico.DaTramiteVirtualPublico.DataBaseHelpers;


namespace Mincetur.Administracion.AplTramiteVirtualPublico.DaTramiteVirtualPublico
{
    public class daAnexos : daBase
    {
        public List<enAnexos> traeListaAnexos(enAnexos objEnAnexo)
        {
            List<enAnexos> lstTable = new List<enAnexos>();
            OracleParameter[] OracleParam = new OracleParameter[9];
            OracleParam[0] = new OracleParameter("X_ID_EXPE", validarNulo(objEnAnexo.ID_EXPE));
            OracleParam[1] = new OracleParameter("X_ID_EXPE_HIJO", validarNulo(objEnAnexo.ID_EXPE_HIJO));
            OracleParam[2] = new OracleParameter("X_ID_ANEXO", validarNulo(objEnAnexo.ID_ANEXO));
            OracleParam[3] = new OracleParameter("X_ID_MOVI", validarNulo(objEnAnexo.ID_MOVI));
            OracleParam[4] = new OracleParameter("X_FEC_ANEXO", validarNulo(objEnAnexo.FEC_ANEXO));
            OracleParam[5] = new OracleParameter("X_DES_OBS", validarNulo(objEnAnexo.DES_OBS));
            OracleParam[6] = new OracleParameter("X_FLG_EST", 1);
            OracleParam[7] = new OracleParameter("X_OPR", 1);
            OracleParam[8] = new OracleParameter("CURSORS", OracleDbType.RefCursor, direction: System.Data.ParameterDirection.Output);

            using (OracleConnection cn = new OracleConnection(this.CadenaConexion))
            {
                try
                {
                    OracleDataReader OracleDR = OracleHelper.ExecuteReader(cn, CommandType.StoredProcedure, "INSDBA.PKG_TDVCONSU.PRC_CONS_TDO2ANEXOS", OracleParam);
                    if (OracleDR != null)
                    {
                        if (OracleDR.HasRows)
                        {
                            object[] arrResult = new object[OracleDR.FieldCount];
                            int intColIdExpePapa = OracleDR.GetOrdinal("EXP_PAPA");
                            int intColIdExpeHijo = OracleDR.GetOrdinal("EXP_HIJO");
                            int intColIdAnexo = OracleDR.GetOrdinal("ID_ANEXO");
                            int intColIdDesObs = OracleDR.GetOrdinal("DES_OBS");
                            int intColIdDesDoc = OracleDR.GetOrdinal("DES_DOC");

                            int intColIdInfComple = OracleDR.GetOrdinal("FLG_INF_COMPLE");
                            int intColIdSubSana = OracleDR.GetOrdinal("FLG_SUBSANACION");

                            enAnexos objEnAnexosPivot = null;
                            enTipDoc objEnTipDoc = null;

                            while (OracleDR.Read())
                            {
                                OracleDR.GetValues(arrResult);
                                objEnAnexosPivot = new enAnexos();
                                objEnTipDoc = new enTipDoc();
                                
                                if (!OracleDR.IsDBNull(intColIdExpePapa)) objEnAnexosPivot.ID_EXPE = int.Parse(arrResult[intColIdExpePapa].ToString());
                                if (!OracleDR.IsDBNull(intColIdExpeHijo)) objEnAnexosPivot.ID_EXPE_HIJO = int.Parse(arrResult[intColIdExpeHijo].ToString());
                                if (!OracleDR.IsDBNull(intColIdAnexo)) objEnAnexosPivot.ID_ANEXO = int.Parse(arrResult[intColIdAnexo].ToString());
                                if (!OracleDR.IsDBNull(intColIdDesObs)) objEnAnexosPivot.DES_OBS = arrResult[intColIdDesObs].ToString();
                                if (!OracleDR.IsDBNull(intColIdDesDoc)) objEnTipDoc.DES_DOC = arrResult[intColIdDesDoc].ToString();
                                if (!OracleDR.IsDBNull(intColIdInfComple)) objEnAnexosPivot.ID_MOVI = int.Parse(arrResult[intColIdInfComple].ToString());
                                if (!OracleDR.IsDBNull(intColIdSubSana)) objEnAnexosPivot.ID_MOVI_ANT = int.Parse(arrResult[intColIdSubSana].ToString());
                                objEnAnexosPivot.enTipDoc = objEnTipDoc;
                                lstTable.Add(objEnAnexosPivot);
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
