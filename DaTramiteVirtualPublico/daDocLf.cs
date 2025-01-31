using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Mincetur.Administracion.TramiteDocumentario.EnTramiteDocumentario;
using Oracle.DataAccess.Client;
using System.Data;
using Mincetur.Administracion.AplTramiteVirtualPublico.DaTramiteVirtualPublico.DataBaseHelpers;
using Mincetur.Administracion.Seguridad.NeSeguridad;
using Mincetur.Administracion.Seguridad.EnSeguridad;

namespace Mincetur.Administracion.AplTramiteVirtualPublico.DaTramiteVirtualPublico
{
    public class daDocLf : daBase
    {
        public List<enDocLf> listar(enDocLf objEnDocLf)
        {
            List<enDocLf> lstTable = new List<enDocLf>();


            OracleParameter[] arrParameters = new OracleParameter[]{
                new OracleParameter("X_ID_DOC", validarNulo(objEnDocLf.ID_DOC)),
                new OracleParameter("X_ID_DOC_LF", validarNulo(objEnDocLf.ID_DOC_LF)),
                new OracleParameter("X_ID_ANO_PROC", validarNulo(objEnDocLf.ID_ANO_PROC)),
                new OracleParameter("X_ID_TIP_DOC", validarNulo(objEnDocLf.ID_TIP_DOC)),
                new OracleParameter("X_ID_SUB", validarNulo(objEnDocLf.ID_SUB)),
                new OracleParameter("X_ID_SUBOFI", validarNulo(objEnDocLf.ID_SUBOFI)),
                new OracleParameter("X_FLG_PRINC", validarNulo(objEnDocLf.FLG_PRINC)),
                new OracleParameter("X_ID_ORIGEN", validarNulo(objEnDocLf.enOrigen,"ID_ORIGEN")),
                new OracleParameter("X_ID_EXPE", validarNulo(objEnDocLf.ID_EXPE)),
                new OracleParameter("X_ID_MOVI", validarNulo(objEnDocLf.ID_MOVI)),
                new OracleParameter("X_ID_ESTADO", validarNulo(objEnDocLf.ID_ESTADO)),
                new OracleParameter("X_COD_CMS", validarNulo(objEnDocLf.COD_CMS)),
                new OracleParameter("X_FEC_INI", validarNulo(objEnDocLf.FEC_INI)),
                new OracleParameter("X_FEC_FIN", validarNulo(objEnDocLf.FEC_VIGE)),
                new OracleParameter("X_FLG_EST", validarNulo(objEnDocLf.FLG_EST)),
                new OracleParameter("X_ID_USU", validarNulo(objEnDocLf.ID_USU)),
                new OracleParameter("X_OPR", objEnDocLf.OPR),
                new OracleParameter("X_CURSOR",OracleDbType.RefCursor, ParameterDirection.Output)
            };


            using (OracleConnection cn = new OracleConnection(this.CadenaConexion))
            {
                try
                {
                    using (OracleDataReader drReader = OracleHelper.ExecuteReader(cn, CommandType.StoredProcedure, "INSDBA.PKG_TDVCONSU.PRC_CONS_TDO3DOC_LF", arrParameters))
                    {
                        object[] arrResult = null;
                        if (drReader.HasRows)
                        {
                            arrResult = new object[drReader.FieldCount];

                            int intColIdExpe = drReader.GetOrdinal("ID_EXPE");
                            int intColIdMovi = drReader.GetOrdinal("ID_MOVI");
                            int intColIdOrigen = drReader.GetOrdinal("ID_ORIGEN");
                            int intColIdAnoProc = drReader.GetOrdinal("ID_ANO_PROC");
                            int intColIdTipDoc = drReader.GetOrdinal("ID_TIP_DOC");
                            int intColIdDoc = drReader.GetOrdinal("ID_DOC");
                            int intColIdDocLf = drReader.GetOrdinal("ID_DOC_LF");
                            int intColIdSub = drReader.GetOrdinal("ID_SUB");
                            int intColIdSubOfi = drReader.GetOrdinal("ID_SUBOFI");
                            int intColIdDocCms = drReader.GetOrdinal("ID_DOC_CMS");
                            int intColIdDesDoc = drReader.GetOrdinal("DES_DOC");
                            int intColCodCms = drReader.GetOrdinal("COD_CMS");
                            int intColDesNom = drReader.GetOrdinal("DES_NOM");
                            int intColDesNomAbr = drReader.GetOrdinal("DES_NOM_ABR");
                            int intColDesRuta = drReader.GetOrdinal("DES_RUTA");
                            int intColNumSize = drReader.GetOrdinal("NUM_SIZE_ARCHIVO");
                            int intColIdFlgPrinc = drReader.GetOrdinal("FLG_PRINC");
                            int intColIdEstado = drReader.GetOrdinal("ID_ESTADO");
                            int intColIdFlgTupa = drReader.GetOrdinal("FLG_TUPA");
                            int intColIdFlgVV = drReader.GetOrdinal("FLG_VV");
                            int intColIdFlgEst = drReader.GetOrdinal("FLG_EST");



                            enDocLf objEnPivot = null;
                            enTupa objEnTupa = null;
                            enOrigen objEnOrigen = null;
                            enExpe objEnExpe = null;


                            while (drReader.Read())
                            {
                                drReader.GetValues(arrResult);

                                objEnPivot = new enDocLf();
                                objEnTupa = new enTupa();
                                objEnOrigen = new enOrigen();
                                objEnExpe = new enExpe();

                                decimal numSizeArchivo = decimal.MinValue;

                                if (!drReader.IsDBNull(intColIdExpe)) objEnPivot.ID_EXPE = int.Parse(arrResult[intColIdExpe].ToString());
                                if (!drReader.IsDBNull(intColIdMovi)) objEnPivot.ID_MOVI = int.Parse(arrResult[intColIdMovi].ToString());
                                if (!drReader.IsDBNull(intColIdOrigen)) objEnOrigen.ID_ORIGEN = int.Parse(arrResult[intColIdOrigen].ToString());
                                if (!drReader.IsDBNull(intColIdAnoProc)) objEnPivot.ID_ANO_PROC = int.Parse(arrResult[intColIdAnoProc].ToString());
                                if (!drReader.IsDBNull(intColIdTipDoc)) objEnPivot.ID_TIP_DOC = int.Parse(arrResult[intColIdTipDoc].ToString());
                                if (!drReader.IsDBNull(intColIdDoc)) objEnPivot.ID_DOC = int.Parse(arrResult[intColIdDoc].ToString());
                                if (!drReader.IsDBNull(intColIdDocLf)) objEnPivot.ID_DOC_LF = int.Parse(arrResult[intColIdDocLf].ToString());
                                if (!drReader.IsDBNull(intColIdSub)) objEnPivot.ID_SUB = int.Parse(arrResult[intColIdSub].ToString());
                                if (!drReader.IsDBNull(intColIdSubOfi)) objEnPivot.ID_SUBOFI = arrResult[intColIdSubOfi].ToString();
                                if (!drReader.IsDBNull(intColIdDocCms)) objEnPivot.ID_DOC_CMS = int.Parse(arrResult[intColIdDocCms].ToString());
                                if (!drReader.IsDBNull(intColIdDesDoc)) objEnPivot.DES_DOC = arrResult[intColIdDesDoc].ToString();
                                if (!drReader.IsDBNull(intColCodCms)) objEnPivot.COD_CMS = arrResult[intColCodCms].ToString();
                                if (!drReader.IsDBNull(intColDesNom)) objEnPivot.DES_NOM = arrResult[intColDesNom].ToString();
                                if (!drReader.IsDBNull(intColDesNomAbr)) objEnPivot.DES_NOM_ABR = arrResult[intColDesNomAbr].ToString();
                                if (!drReader.IsDBNull(intColDesRuta)) objEnPivot.DES_RUTA = arrResult[intColDesRuta].ToString();
                                //if (!drReader.IsDBNull(intColNumSize)) objEnPivot.NUM_SIZE_ARCHIVO = decimal.TryParse(arrResult[intColNumSize].ToString());
                                if (!drReader.IsDBNull(intColNumSize))
                                {
                                    //objEnPivot.NUM_SIZE_ARCHIVO = decimal.TryParse(arrResult[intColNumSize].ToString()); 
                                    if (decimal.TryParse(arrResult[intColNumSize].ToString(), out numSizeArchivo)) objEnPivot.NUM_SIZE_ARCHIVO = numSizeArchivo;
                                }
                                if (!drReader.IsDBNull(intColIdFlgPrinc)) objEnPivot.FLG_PRINC = int.Parse(arrResult[intColIdFlgPrinc].ToString());
                                if (!drReader.IsDBNull(intColIdEstado)) objEnPivot.ID_ESTADO = int.Parse(arrResult[intColIdEstado].ToString());
                                if (!drReader.IsDBNull(intColIdFlgTupa)) objEnTupa.ID_TUPA = int.Parse(arrResult[intColIdFlgTupa].ToString());
                                if (!drReader.IsDBNull(intColIdFlgVV)) objEnExpe.FLG_VV = int.Parse(arrResult[intColIdFlgVV].ToString());
                                if (!drReader.IsDBNull(intColIdFlgEst)) objEnPivot.FLG_STR_EST = arrResult[intColIdFlgEst].ToString();


                                objEnPivot.enTupa = objEnTupa;
                                objEnPivot.enOrigen = objEnOrigen;
                                objEnPivot.enExpe = objEnExpe;
                                lstTable.Add(objEnPivot);
                            }
                        }
                    }
                }
                catch (Exception ex) {
                    using (neAcceso objNeAcceso = new neAcceso())
                    {
                        enAcceso objEnAcceso = new enAcceso();
                        objEnAcceso.ID_TIPOACCESO = 1;
                        objEnAcceso.ID_SIS = objEnDocLf.ID_SIS;
                        objEnAcceso.IP_ACCESO = objEnDocLf.IP;
                        objEnAcceso.COD_FUENTE = "W";
                        objEnAcceso.DES_OBS = "idDoc: " + objEnDocLf.ID_DOC + " idDocLf: " + objEnDocLf.ID_DOC_LF + " idExpe: " + objEnDocLf.ID_EXPE + " idMovi: " + objEnDocLf.ID_MOVI + " desError: " + ex.ToString();
                        objNeAcceso.insertarAsp(objEnAcceso, "I");
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
