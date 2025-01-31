using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Oracle.DataAccess.Client;
using System.Data;
using Mincetur.Administracion.AplTramiteVirtualPublico.EnTramiteVirtualPublico;
using Mincetur.Administracion.AplTramiteVirtualPublico.DaTramiteVirtualPublico.DataBaseHelpers;

using Mincetur.Administracion.GeneralesUtil.EnGeneralesUtil;

namespace Mincetur.Administracion.AplTramiteVirtualPublico.DaTramiteVirtualPublico
{
    public class daResponsable : daBase
    {
        public string TraeResponsable(enDocElecExpe oDocElecExpeEO)
        {

            String strDocElect = null;
            OracleCommand cmd = new OracleCommand("SELECT INSDBA.PKG_DPCONSU.FNC_TRAE_OFICINA_RESPONSABLE ( :X_ID_PERSONA, :X_ID_SUB, :X_ID_SUBOFI, :X_FEC_INI, :X_FEC_FIN, :X_FEC, :X_OPR ) FROM DUAL");
            cmd.CommandType = CommandType.Text;
            cmd.Parameters.Add(new OracleParameter("X_ID_PERSONA", validarNulo(oDocElecExpeEO.ID_PERSONA)));
            cmd.Parameters.Add(new OracleParameter("X_ID_SUB", validarNulo(oDocElecExpeEO.ID_SUB)));
            cmd.Parameters.Add(new OracleParameter("X_ID_SUBOFI", validarNulo(oDocElecExpeEO.ID_SUBOFI)));
            cmd.Parameters.Add(new OracleParameter("X_FEC_INI", null));
            cmd.Parameters.Add(new OracleParameter("X_FEC_FIN", null));
            cmd.Parameters.Add(new OracleParameter("X_FEC", null));
            cmd.Parameters.Add(new OracleParameter("X_OPR", "4"));
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

        public int traeResponsableporOficina(enEstorg objEn)
        {

            int idResponsable = 0;
            OracleCommand cmd = new OracleCommand("SELECT INSDBA.PKG_DPCONSU.FNC_TRAE_RESPONSABLE (  :X_ID_PERSONA, :X_ID_SUB, :X_ID_SUBOFI, :X_FEC_INI, :X_FEC_FIN, :X_FEC, :X_OPR ) FROM DUAL");
            cmd.CommandType = CommandType.Text;
            cmd.Parameters.Add(new OracleParameter("X_ID_PERSONA", null));
            cmd.Parameters.Add(new OracleParameter("X_ID_SUB", validarNulo(objEn.ID_SUB)));
            cmd.Parameters.Add(new OracleParameter("X_ID_SUBOFI", validarNulo(objEn.ID_SUBOFI)));
            cmd.Parameters.Add(new OracleParameter("X_FEC_INI", null));
            cmd.Parameters.Add(new OracleParameter("X_FEC_FIN", null));
            cmd.Parameters.Add(new OracleParameter("X_FEC", null));
            cmd.Parameters.Add(new OracleParameter("X_OPR", "2"));
            using (OracleConnection cn = new OracleConnection(this.CadenaConexion))
            {
                try
                {
                    cn.Open();
                    cmd.Connection = cn;
                    object Pivot = cmd.ExecuteScalar();
                    if (Pivot != null) idResponsable = int.Parse(Pivot.ToString());
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
            return idResponsable;
        }
    }
}
