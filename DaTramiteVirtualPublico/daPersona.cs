using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Oracle.DataAccess.Client;
using System.Data;
using Mincetur.Administracion.AplTramiteVirtualPublico.EnTramiteVirtualPublico;
using Mincetur.Administracion.AplTramiteVirtualPublico.DaTramiteVirtualPublico.DataBaseHelpers;
using Mincetur.Administracion.AplTramiteVirtualPublico.CoTramiteVirtualPublico;

namespace Mincetur.Administracion.AplTramiteVirtualPublico.DaTramiteVirtualPublico
{
    public class daPersona : daBase
    {
        public List<enPersona> traeListaPersona(enPersona objEnPersona)
        {
            List<enPersona> lstTable = new List<enPersona>();
            OracleParameter[] OracleParam = new OracleParameter[14];
            OracleParam[0] = new OracleParameter("X_ID_PERSONA", validarNulo(objEnPersona.ID_PERSONA));
            OracleParam[1] = new OracleParameter("X_NOMBRES", validarNulo(objEnPersona.DES_NOMBRES));
            OracleParam[2] = new OracleParameter("X_APE_PATER", validarNulo(objEnPersona.APE_PATER));
            OracleParam[3] = new OracleParameter("X_APE_MATER", validarNulo(objEnPersona.APE_MATER));
            OracleParam[4] = new OracleParameter("X_ID_SUB", validarNulo(objEnPersona.ID_SUB));
            OracleParam[5] = new OracleParameter("X_ID_SUBOFI", validarNulo(objEnPersona.ID_SUBOFI));
            OracleParam[6] = new OracleParameter("X_ID_CARGOFUN", validarNulo(objEnPersona.ID_CARGOFUN));
            OracleParam[7] = new OracleParameter("X_ID_SUBCARGO", validarNulo(objEnPersona.ID_SUBCARGO));
            OracleParam[8] = new OracleParameter("X_ANEXO", validarNulo(objEnPersona.ANEXO));
            OracleParam[9] = new OracleParameter("X_CORREO", validarNulo(objEnPersona.CORREO));
            OracleParam[10] = new OracleParameter("X_ID_PISO", validarNulo(objEnPersona.ID_PISO));
            OracleParam[11] = new OracleParameter("X_DATO", validarNulo(objEnPersona.DATO));
            OracleParam[12] = new OracleParameter("X_OPR", objEnPersona.OPR);
            OracleParam[13] = new OracleParameter("X_CURSORS", OracleDbType.RefCursor, direction: System.Data.ParameterDirection.Output);

            using (OracleConnection cn = new OracleConnection(this.CadenaConexion))
            {
                try
                {
                    OracleDataReader OracleDR = OracleHelper.ExecuteReader(cn, CommandType.StoredProcedure, "INSDBA.PKG_DPCONSU.PRC_DPFUNCIONARIO", OracleParam);
                    if (OracleDR != null)
                    {
                        if (OracleDR.HasRows)
                        {
                            object[] arrResult = new object[OracleDR.FieldCount];

                            int intColIdPersona = OracleDR.GetOrdinal("ID_PERSONA");
                            int intColIdNombres = OracleDR.GetOrdinal("NOMBRES");
                            int intColIdApPater = OracleDR.GetOrdinal("APE_PATER");
                            int intColIdApMater = OracleDR.GetOrdinal("APE_MATER");
                            int intColIdNomFunc = OracleDR.GetOrdinal("NOMFUNC");
                            int intColIdSub = OracleDR.GetOrdinal("ID_SUB");
                            int intColIdSubOfi = OracleDR.GetOrdinal("ID_SUBOFI");
                            int intColIdDesSubOfi = OracleDR.GetOrdinal("DES_SUBOFI");
                            int intColIdAbrSubOfi = OracleDR.GetOrdinal("ABR_SUBOFI");
                            int intColIdCargo = OracleDR.GetOrdinal("ID_CARGOFUN");
                            int intColIdDesCargo = OracleDR.GetOrdinal("DES_CARGOFUN");
                            int intColIdSubCargo = OracleDR.GetOrdinal("ID_SUBCARGO");
                            int intColIdDesSubCargo = OracleDR.GetOrdinal("DES_SUBCARGO");
                            int intColIdAnexo = OracleDR.GetOrdinal("ANEXO");
                            int intColIdCorreo = OracleDR.GetOrdinal("CORREO");
                            int intColIdDesDocIden = OracleDR.GetOrdinal("DES_DOC_IDEN");
                            int intColIdPiso = OracleDR.GetOrdinal("ID_PISO");
                            int intColIdDesPiso = OracleDR.GetOrdinal("PISO");
                            int intColIdEstado = OracleDR.GetOrdinal("ESTADO");

                            enPersona objEnPersonaPivot = null;
                            
                            while (OracleDR.Read())
                            {
                                OracleDR.GetValues(arrResult);
                                objEnPersonaPivot = new enPersona();
                                if (!OracleDR.IsDBNull(intColIdPersona)) objEnPersonaPivot.ID_PERSONA = int.Parse(arrResult[intColIdPersona].ToString());
                                if (!OracleDR.IsDBNull(intColIdNombres)) objEnPersonaPivot.DES_NOMBRES = arrResult[intColIdNombres].ToString();
                                if (!OracleDR.IsDBNull(intColIdApPater)) objEnPersonaPivot.APE_PATER = arrResult[intColIdApPater].ToString();
                                if (!OracleDR.IsDBNull(intColIdApMater)) objEnPersonaPivot.APE_MATER = arrResult[intColIdApMater].ToString();
                                if (!OracleDR.IsDBNull(intColIdNomFunc)) objEnPersonaPivot.NOMFUNC = arrResult[intColIdNomFunc].ToString();
                                if (!OracleDR.IsDBNull(intColIdSub)) objEnPersonaPivot.ID_SUB = int.Parse(arrResult[intColIdSub].ToString());
                                if (!OracleDR.IsDBNull(intColIdSubOfi)) objEnPersonaPivot.ID_SUBOFI = arrResult[intColIdSubOfi].ToString();
                                if (!OracleDR.IsDBNull(intColIdDesSubOfi)) objEnPersonaPivot.DES_SUBOFI = arrResult[intColIdDesSubOfi].ToString();
                                if (!OracleDR.IsDBNull(intColIdAbrSubOfi)) objEnPersonaPivot.ABR_SUBOFI = arrResult[intColIdAbrSubOfi].ToString();
                                if (!OracleDR.IsDBNull(intColIdCargo)) objEnPersonaPivot.ID_CARGOFUN = int.Parse(arrResult[intColIdCargo].ToString());
                                if (!OracleDR.IsDBNull(intColIdDesCargo)) objEnPersonaPivot.DES_CARGOFUN = arrResult[intColIdDesCargo].ToString();
                                if (!OracleDR.IsDBNull(intColIdSubCargo)) objEnPersonaPivot.ID_SUBCARGO = int.Parse(arrResult[intColIdSubCargo].ToString());
                                if (!OracleDR.IsDBNull(intColIdDesSubCargo)) objEnPersonaPivot.DES_SUBCARGO = arrResult[intColIdDesSubCargo].ToString();
                                if (!OracleDR.IsDBNull(intColIdAnexo)) objEnPersonaPivot.ANEXO = arrResult[intColIdAnexo].ToString();
                                if (!OracleDR.IsDBNull(intColIdCorreo)) objEnPersonaPivot.CORREO = arrResult[intColIdCorreo].ToString();
                                if (!OracleDR.IsDBNull(intColIdDesDocIden)) objEnPersonaPivot.DES_DOC_IDEN = arrResult[intColIdDesDocIden].ToString();
                                if (!OracleDR.IsDBNull(intColIdPiso)) objEnPersonaPivot.ID_PISO = int.Parse(arrResult[intColIdPiso].ToString());
                                if (!OracleDR.IsDBNull(intColIdDesPiso)) objEnPersonaPivot.PISO = arrResult[intColIdDesPiso].ToString();
                                if (!OracleDR.IsDBNull(intColIdEstado)) objEnPersonaPivot.ESTADO = int.Parse(arrResult[intColIdEstado].ToString());
                                lstTable.Add(objEnPersonaPivot);
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

        public coResultadoDB validarUsuario(enPersona objEnPersona)
        {
            coResultadoDB objCoResultadoDB = null;
            
            OracleParameter[] arrParameters = new OracleParameter[] {
                new OracleParameter("X_ID_USU",validarNulo(objEnPersona.ID_USU)),           
                new OracleParameter("X_ID_DOC",validarNulo(objEnPersona.ID_DOC)),           
                new OracleParameter("X_ID_SUB",validarNulo(objEnPersona.enEstorg, "ID_SUB")),           
                new OracleParameter("X_ID_SUBOFI",validarNulo(objEnPersona.enEstorg,"ID_SUBOFI")),           
                new OracleParameter("X_ID_ROL",validarNulo(objEnPersona.ID_ROL)),           
                new OracleParameter("X_COD_PIN",validarNulo(objEnPersona.COD_PIN)),           
                new OracleParameter("X_DATO",validarNulo(objEnPersona.DATO)),                               
                new OracleParameter("X_ID_SIS",validarNulo(objEnPersona.ID_SIS)),           
                new OracleParameter("X_IP",validarNulo(objEnPersona.IP)),           
                new OracleParameter("X_OPR",validarNulo(objEnPersona.OPR)),           
                new OracleParameter("X_ERROR", OracleDbType.RefCursor, direction: System.Data.ParameterDirection.InputOutput)
            };
            using (daUDml objDaUDml = new daUDml())
            {
                objCoResultadoDB = objDaUDml.ejecutarDml(arrParameters, "INSDBA.PKG_TDDUTIL.PRC_VERIFICAR_USUROL");
            }
            return objCoResultadoDB;
        }
    }
}

