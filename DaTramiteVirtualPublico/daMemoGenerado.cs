using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Mincetur.Administracion.AplTramiteVirtualPublico.EnTramiteVirtualPublico;
//using Mincetur.Administracion.TramiteDocumentario.CoTramiteDocumentario;
using Oracle.DataAccess.Client;
using Mincetur.Administracion.AplTramiteVirtualPublico.DaTramiteVirtualPublico.DataBaseHelpers;
using System.Data;
using Mincetur.Administracion.AplTramiteVirtualPublico.CoTramiteVirtualPublico;

namespace Mincetur.Administracion.AplTramiteVirtualPublico.DaTramiteVirtualPublico
{
    public class daMemoGenerado : daBase
    {

        public coResultadoDB consultar(enDocElecExpe entidad)
        {
            coResultadoDB objCoResultado = null;
            using (OracleConnection cnn = new OracleConnection(this.CadenaConexion))
            {
                OracleParameter[] OracleParam = new OracleParameter[14];
                OracleParam[0] = new OracleParameter("X_ID_EXPE", validarNulo(entidad.ID_EXPE));
                OracleParam[1] = new OracleParameter("X_ID_MOVI", validarNulo(entidad.ID_MOVI));
                OracleParam[2] = new OracleParameter("X_ID_DOC", validarNulo(entidad.ID_DOC));
                OracleParam[3] = new OracleParameter("X_ID_ANO_PROC", validarNulo(entidad.ID_ANO_PROC));
                OracleParam[4] = new OracleParameter("X_ID_TIP_DOC", validarNulo(entidad.ID_TIP_DOC));
                OracleParam[5] = new OracleParameter("X_ID_SUB", validarNulo(entidad.ID_SUB));
                OracleParam[6] = new OracleParameter("X_ID_SUBOFI", validarNulo(entidad.ID_SUBOFI));
                OracleParam[7] = new OracleParameter("X_ID_ESTADO", validarNulo(entidad.ID_ESTADO));
                OracleParam[8] = new OracleParameter("X_ID_PERSONA", validarNulo(entidad.ID_PERSONA));
                OracleParam[9] = new OracleParameter("X_ID_USU", validarNulo(entidad.ID_USU));
                OracleParam[10] = new OracleParameter("X_NUM_DOC", validarNulo(entidad.NUM_DOC));
                OracleParam[11] = new OracleParameter("X_FLG_EST", validarNulo(entidad.FLG_EST));
                OracleParam[12] = new OracleParameter("X_OPR", validarNulo(entidad.OPR));
                OracleParam[13] = new OracleParameter("X_CURSORS", OracleDbType.RefCursor, direction: ParameterDirection.Output);
                
                using (OracleDataReader dr = OracleHelper.ExecuteReader(cnn, CommandType.StoredProcedure, "INSDBA.PRC_CONS_TDE3DOC_PLANTILLA", OracleParam))
                {
                    if (dr != null)
                    {
                        if (dr.HasRows)
                        {
                            object[] arrResult = new object[dr.FieldCount];
                            int intColIdTipo = dr.GetOrdinal("ID_TIPO");
                            int intColIdError = dr.GetOrdinal("ID_ERROR");
                            int intColDesError = dr.GetOrdinal("DES_ERROR");
                            int intColValor = dr.GetOrdinal("VALOR");
                            if (dr.Read())
                            {
                                dr.GetValues(arrResult);
                                objCoResultado = new coResultadoDB();
                                if (!dr.IsDBNull(intColIdTipo)) objCoResultado.ID_TIPO = int.Parse(arrResult[intColIdTipo].ToString());
                                if (!dr.IsDBNull(intColIdError)) objCoResultado.ID_ERROR = arrResult[intColIdError].ToString();
                                if (!dr.IsDBNull(intColDesError)) objCoResultado.DES_ERROR = arrResult[intColDesError].ToString();
                                if (!dr.IsDBNull(intColValor)) objCoResultado.VALOR = arrResult[intColValor].ToString();
                            }
                        }

                        dr.Close();
                    }
                }
                if (cnn.State != ConnectionState.Closed) cnn.Close();
            }
            return objCoResultado;
        }

        public List<enMail> consultarBorradorCorreo(enFormatoPlantilla objEn)
        {
            List<enMail> lst = new List<enMail>();

            OracleParameter[] parameters = new OracleParameter[]{
                new OracleParameter("X_ID_BORRADOR",validarNulo(objEn.ID_BORRADOR)),
                new OracleParameter("X_ID_VERSION",validarNulo(objEn.ID_VERSION)),
                new OracleParameter("X_ID_EXPE",validarNulo(objEn.enExpe, "ID_EXPE")),
                new OracleParameter("X_ID_MOVI",validarNulo(objEn.enMovi, "ID_MOVI")),
                new OracleParameter("X_ID_MOVI_ANT",validarNulo(objEn.enMovi, "ID_MOVI_ANT")),
                new OracleParameter("X_ID_ACCION",validarNulo(objEn.enAccion, "ID_ACCION")),
                new OracleParameter("X_ID_TIP_DOC",validarNulo(objEn.enTipDoc, "ID_TIP_DOC")),
                new OracleParameter("X_ID_DOC",validarNulo(objEn.ID_DOC)),
                new OracleParameter("X_ID_SUB",validarNulo(objEn.enEstorg, "ID_SUB")),
                new OracleParameter("X_ID_SUBOFI",validarNulo(objEn.enEstorg, "ID_SUBOFI")),
                new OracleParameter("X_ID_USU_FUNC",validarNulo(objEn.enPersona, "ID_PERSONA")),
                new OracleParameter("X_ID_SUB_REMITE",validarNulo(objEn.enEstorgRemite, "ID_SUB")),
                new OracleParameter("X_ID_SUBOFI_REMITE",validarNulo(objEn.enEstorgRemite, "ID_SUBOFI")),
                new OracleParameter("X_DES_OBS",validarNulo(objEn.DES_OBS)),
                new OracleParameter("X_LINK_ADJ",validarNulo(objEn.LINK_ADJ)),
                new OracleParameter("X_DES_LINKDOC",validarNulo(objEn.DES_LINKDOC)),
                new OracleParameter("X_URL_EXPE",validarNulo(objEn.URL_EXPE)),
                new OracleParameter("X_URL_EDITAR",validarNulo(objEn.URL_EDITAR)),
                new OracleParameter("X_URL_GESTIONAR",validarNulo(objEn.URL_GESTIONAR)),                
                new OracleParameter("X_ID_USU",validarNulo(objEn.ID_USU)),
                new OracleParameter("X_ID_SIS",validarNulo(objEn.ID_SIS)),
                new OracleParameter("X_IP",validarNulo(objEn.IP)),
                new OracleParameter("X_OPR",validarNulo(objEn.OPR)),
                new OracleParameter("X_CURSORS",OracleDbType.RefCursor, ParameterDirection.Output)                
            };
            using (OracleConnection cn = new OracleConnection(this.CadenaConexion))
            {
                try
                {
                    using (OracleDataReader drReader = OracleHelper.ExecuteReader(cn, CommandType.StoredProcedure, "INSDBA.PKG_TDDUTIL.PRC_TDD1BORRADOR_CORREO", parameters))
                    {
                        object[] arrResult = null;
                        if (drReader.HasRows)
                        {
                            arrResult = new object[drReader.FieldCount];
                            int intColIdNombreEvia = drReader.GetOrdinal("NOMBRE_ENVIA");
                            int intColDesMailEnvia = drReader.GetOrdinal("MAIL_ENVIA");
                            int intColOficinaEnvia = drReader.GetOrdinal("OFICINA_ENVIA");
                            int intColMailDestino = drReader.GetOrdinal("MAIL_DESTINO");
                            int intColAsunto = drReader.GetOrdinal("ASUNTO");
                            int intColMensaje = drReader.GetOrdinal("MENSAJE");
                            int intColIdForm = drReader.GetOrdinal("ID_FORM");
                            int intColIdUsu = drReader.GetOrdinal("ID_USU");
                            enMail temp = null;
                            while (drReader.Read())
                            {
                                drReader.GetValues(arrResult);
                                temp = new enMail();

                                if (!drReader.IsDBNull(intColIdNombreEvia)) temp.NOMBRE_ENVIA = arrResult[intColIdNombreEvia].ToString();
                                if (!drReader.IsDBNull(intColDesMailEnvia)) temp.MAIL_ENVIA = arrResult[intColDesMailEnvia].ToString();
                                if (!drReader.IsDBNull(intColOficinaEnvia)) temp.OFICINA_ENVIA = arrResult[intColOficinaEnvia].ToString();
                                if (!drReader.IsDBNull(intColMailDestino)) temp.MAIL_DESTINO = arrResult[intColMailDestino].ToString();
                                if (!drReader.IsDBNull(intColAsunto)) temp.ASUNTO = arrResult[intColAsunto].ToString();
                                if (!drReader.IsDBNull(intColMensaje)) temp.MENSAJE = arrResult[intColMensaje].ToString();
                                if (!drReader.IsDBNull(intColIdForm)) temp.ID_FORM = int.Parse(arrResult[intColIdForm].ToString());
                                if (!drReader.IsDBNull(intColIdUsu)) temp.ID_USU = int.Parse(arrResult[intColIdUsu].ToString());
                                
                                lst.Add(temp);
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
            return lst;
        }

    }
}
