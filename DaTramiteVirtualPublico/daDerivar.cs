using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Mincetur.Administracion.AplTramiteVirtualPublico.CoTramiteVirtualPublico;
using Oracle.DataAccess.Client;
using Mincetur.Administracion.AplTramiteVirtualPublico.EnTramiteVirtualPublico;
using Mincetur.Administracion.AplTramiteVirtualPublico.DaTramiteVirtualPublico.DataBaseHelpers;
using System.Data;
using Mincetur.Administracion.GeneralesUtil.EnGeneralesUtil;

namespace Mincetur.Administracion.AplTramiteVirtualPublico.DaTramiteVirtualPublico
{
    public class daDerivar: daBase
    {
        public coResultadoDB mantenimiento(enDocElec objEn)
        {
            coResultadoDB objCoResultadoDB = null;

            OracleParameter[] arrParameters = new OracleParameter[] {
                new OracleParameter("X_ID_EXPE",validarNulo(objEn.ID_EXPE)),           
                new OracleParameter("X_ID_MOVI",validarNulo(objEn.ID_MOVI)),           
                new OracleParameter("X_ID_ANO_PROC",validarNulo(objEn.ID_ANO_PROC)),           
                new OracleParameter("X_ID_ACCION",validarNulo(objEn.enAccion,"ID_ACCION")),           
                new OracleParameter("X_ID_MOVI_ANT",validarNulo(objEn.ID_MOVI_ANT)),           
                new OracleParameter("X_ID_DOC",validarNulo(objEn.ID_DOC)),           
                new OracleParameter("X_ID_TIP_DOC",validarNulo(objEn.ID_TIP_DOC)),           
                new OracleParameter("X_ID_PERSONA",validarNulo(objEn.ID_PERSONA)),           
                new OracleParameter("X_DES_ASUNTO",validarNulo(objEn.DES_ASUNTO)),           
                new OracleParameter("X_NUM_DOC",validarNulo(objEn.NUM_DOC)),           
                new OracleParameter("X_NUM_FOLIOS",validarNulo(objEn.NUM_FOLIOS)),           
                new OracleParameter("X_ID_SUB",validarNulo(objEn.ID_SUB)),           
                new OracleParameter("X_ID_SUBOFI",validarNulo(objEn.ID_SUBOFI)),           
                new OracleParameter("X_ID_ESTADO",validarNulo(objEn.ID_ESTADO)),           
                new OracleParameter("X_INSERTS",validarNulo(objEn.INSERTS)),           
                new OracleParameter("X_UPDATES",validarNulo(objEn.UPDATES)),           
                new OracleParameter("X_FEC_PLAZO",validarNulo(objEn.FEC_PLAZO)),           
                new OracleParameter("X_ID_USU",validarNulo(objEn.ID_USU)),                                     
                new OracleParameter("X_ID_SIS",validarNulo(objEn.ID_SIS)),           
                new OracleParameter("X_IP",validarNulo(objEn.IP_CREA)),           
                new OracleParameter("X_OPR",validarNulo(objEn.OPR)),           
                new OracleParameter("X_ERROR", OracleDbType.RefCursor, direction: System.Data.ParameterDirection.InputOutput)
            };
            using (daUDml objDaUDml = new daUDml())
            {
                objCoResultadoDB = objDaUDml.ejecutarDml(arrParameters, "INSDBA.PKG_TDGMANT.PRC_TDO2MOVI_BORRADOR");
            }
            return objCoResultadoDB;
        }

        public List<enEstorg> ListarOficinaReglas(enEstorg objEn)
        {
            List<enEstorg> lstEnEstorg = new List<enEstorg>();
            OracleParameter[] parameters = new OracleParameter[]{
                new OracleParameter("X_ID_SUB",validarNulo(objEn.ID_SUB)),
                new OracleParameter("X_ID_SUBOFI",validarNulo(objEn.ID_SUBOFI)),
                new OracleParameter("X_DES_SUBOFI",validarNulo(objEn.DES_SUBOFI)),
                new OracleParameter("X_ID_USU",null),
                new OracleParameter("X_DATO",null),
                new OracleParameter("X_OPR","1"),                                
                new OracleParameter("X_CURSORS",OracleDbType.RefCursor, ParameterDirection.Output)                   
            };

            using (OracleConnection cn = new OracleConnection(this.CadenaConexion))
            {
                try
                {
                    using (OracleDataReader drReader = OracleHelper.ExecuteReader(cn, CommandType.StoredProcedure, "INSDBA.PKG_TDDCONSU.PRC_SEL_OFIFUN", parameters))
                    {

                        object[] arrResult = null;
                        if (drReader.HasRows)
                        {

                            arrResult = new object[drReader.FieldCount];
                            int intColIdSub = drReader.GetOrdinal("ID_SUB");
                            int intColIdSubOfi = drReader.GetOrdinal("ID_SUBOFI");
                            int intColIdDesSubOfi = drReader.GetOrdinal("DES_SUBOFI");
                            int intColIdAbrSubOfi = drReader.GetOrdinal("ABR_SUBOFI");

                            enEstorg objEnEstorg = null;

                            while (drReader.Read())
                            {
                                drReader.GetValues(arrResult);
                                objEnEstorg = new enEstorg();
                                if (!drReader.IsDBNull(intColIdSub)) objEnEstorg.ID_SUB = int.Parse(arrResult[intColIdSub].ToString());
                                if (!drReader.IsDBNull(intColIdSubOfi)) objEnEstorg.ID_SUBOFI = arrResult[intColIdSubOfi].ToString();
                                if (!drReader.IsDBNull(intColIdDesSubOfi)) objEnEstorg.DES_SUBOFI = arrResult[intColIdDesSubOfi].ToString();
                                if (!drReader.IsDBNull(intColIdAbrSubOfi)) objEnEstorg.ABR_SUBOFI = arrResult[intColIdAbrSubOfi].ToString();

                                lstEnEstorg.Add(objEnEstorg);
                            }
                            drReader.Close();
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
            return lstEnEstorg;
        }

    }
}
