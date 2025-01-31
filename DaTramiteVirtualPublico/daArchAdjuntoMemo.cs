using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Mincetur.Administracion.AplTramiteVirtualPublico.EnTramiteVirtualPublico;
using Oracle.DataAccess.Client;
using System.Data;
using Mincetur.Administracion.AplTramiteVirtualPublico.DaTramiteVirtualPublico.DataBaseHelpers;
namespace Mincetur.Administracion.AplTramiteVirtualPublico.DaTramiteVirtualPublico
{
    public class daArchAdjuntoMemo: daBase
    {
        public string TraeDocElec(enDocElecExpe oDocElecExpeEO)
        {

            String strDocElect = null;
            OracleCommand cmd = new OracleCommand("SELECT INSDBA.FNC_TDE1DOC_ELEC (:X_ID_EXPE,:X_ID_MOVI,:X_ID_DOC,:X_OPR) FROM DUAL");
            cmd.CommandType = CommandType.Text;
            cmd.Parameters.Add(new OracleParameter("X_ID_EXPE", validarNulo(oDocElecExpeEO.ID_EXPE)));
            cmd.Parameters.Add(new OracleParameter("X_ID_MOVI", validarNulo(oDocElecExpeEO.ID_MOVI)));
            cmd.Parameters.Add(new OracleParameter("X_ID_DOC", validarNulo(oDocElecExpeEO.ID_DOC)));
            cmd.Parameters.Add(new OracleParameter("X_OPR", "1"));
            using (OracleConnection cn = new OracleConnection(this.CadenaConexion))
            {
                try
                {
                    cn.Open();
                    cmd.Connection = cn;
                    object Pivot = cmd.ExecuteScalar();
                    if (Pivot != null) strDocElect = Pivot.ToString();
                }
                catch (Exception ex)
                {
                    throw ex;
                }
                finally
                {
                    cn.Close();
                    GC.SuppressFinalize(cn);
                }
            }
            return strDocElect;
        }
        public List<enAdjuntarArchivo> ListarArchivoAdjunto(enAdjuntarArchivo oAdjuntarArchivoEO)
        {
            OracleDataReader OracleDR = null;
            List<enAdjuntarArchivo> listAdjuntarArchivoEO = new List<enAdjuntarArchivo>();
            using (OracleConnection cn = new OracleConnection(this.CadenaConexion))
            {
                OracleParameter[] OracleParam = new OracleParameter[3];
                OracleParam[0] = new OracleParameter("X_ID_DOC_ELEC", oAdjuntarArchivoEO.ID_DOC_ELEC);
                OracleParam[1] = new OracleParameter("X_ID_VERSION", oAdjuntarArchivoEO.ID_VERSION);
                OracleParam[2] = new OracleParameter("XO_CURSORS", OracleDbType.RefCursor, direction: System.Data.ParameterDirection.Output);
                OracleDR = OracleHelper.ExecuteReader(cn, CommandType.StoredProcedure, "INSDBA.PRC_SEL_ARCHADJ_CODELE", OracleParam);

                if (OracleDR != null)
                {
                    if (OracleDR.HasRows)
                    {
                        object[] arrResult = new object[OracleDR.FieldCount];
                        int intColIdArchAdj = OracleDR.GetOrdinal("ID_ARCH_ADJ");
                        int intColIdDocElec = OracleDR.GetOrdinal("ID_DOC_ELEC");
                        int intColIdVersion = OracleDR.GetOrdinal("ID_VERSION");
                        int intColIdProvDig = OracleDR.GetOrdinal("ID_PROV_DIG");
                        int intColIdDocCms = OracleDR.GetOrdinal("ID_DOC_CMS");
                        int intColDesNom = OracleDR.GetOrdinal("DES_NOM");
                        int intColNumSizeArchivo = OracleDR.GetOrdinal("NUM_SIZE_ARCHIVO");
                        int intColDesNomAbr = OracleDR.GetOrdinal("DES_NOM_ABR");
                        int intColDesRuta = OracleDR.GetOrdinal("DES_RUTA");
                        enAdjuntarArchivo objAdjuntarArchivoEO = null;
                        while (OracleDR.Read())
                        {
                            OracleDR.GetValues(arrResult);
                            objAdjuntarArchivoEO = new enAdjuntarArchivo();
                            if (!OracleDR.IsDBNull(intColIdArchAdj)) objAdjuntarArchivoEO.ID_ARCH_ADJ = int.Parse(arrResult[intColIdArchAdj].ToString());
                            if (!OracleDR.IsDBNull(intColIdDocElec)) objAdjuntarArchivoEO.ID_DOC_ELEC = int.Parse(arrResult[intColIdDocElec].ToString());
                            if (!OracleDR.IsDBNull(intColIdVersion)) objAdjuntarArchivoEO.ID_VERSION = int.Parse(arrResult[intColIdVersion].ToString());
                            if (!OracleDR.IsDBNull(intColIdProvDig)) objAdjuntarArchivoEO.ID_PROV_DIG = arrResult[intColIdProvDig].ToString();
                            if (!OracleDR.IsDBNull(intColIdDocCms)) objAdjuntarArchivoEO.ID_DOC_CMS = int.Parse(arrResult[intColIdDocCms].ToString());
                            if (!OracleDR.IsDBNull(intColDesNom)) objAdjuntarArchivoEO.NOMBRE_ARCHIVO_OCULTO = arrResult[intColDesNom].ToString();
                            if (!OracleDR.IsDBNull(intColNumSizeArchivo)) objAdjuntarArchivoEO.SIZE_ARCHIVO = long.Parse(arrResult[intColNumSizeArchivo].ToString());
                            if (!OracleDR.IsDBNull(intColDesNomAbr)) objAdjuntarArchivoEO.NOMBRE_ARCHIVO = arrResult[intColDesNomAbr].ToString();
                            if (!OracleDR.IsDBNull(intColDesRuta)) objAdjuntarArchivoEO.UBICACION_ARCHIVO = arrResult[intColDesRuta].ToString();
                            listAdjuntarArchivoEO.Add(objAdjuntarArchivoEO);
                        }
                    }
                    OracleDR.Close();
                }
                if (cn.State != ConnectionState.Closed) cn.Close();
                return listAdjuntarArchivoEO;
            }
        }
    }
}
