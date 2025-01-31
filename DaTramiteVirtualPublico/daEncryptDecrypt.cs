using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Oracle.DataAccess.Client;
using System.Data;

namespace Mincetur.Administracion.AplTramiteVirtualPublico.DaTramiteVirtualPublico
{
    public class daEncryptDecrypt : daBase
    {
        public string decrypt(string cod)
        {

            String valor = null;
            OracleCommand cmd = new OracleCommand("SELECT TAGDBA.FNC_DECRYPT ( :X_RAW ) FROM DUAL");
            cmd.CommandType = CommandType.Text;
            cmd.Parameters.Add(new OracleParameter("X_RAW", validarNulo(cod)));
            
            using (OracleConnection cn = new OracleConnection(this.CadenaConexion))
            {
                try
                {
                    cn.Open();
                    cmd.Connection = cn;
                    object Pivot = cmd.ExecuteScalar();
                    if (Pivot != null) valor = Pivot.ToString();
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
            return valor;
        }
    }
}
