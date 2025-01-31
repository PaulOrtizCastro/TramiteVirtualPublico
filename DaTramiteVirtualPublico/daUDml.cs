using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Mincetur.Administracion.AplTramiteVirtualPublico.CoTramiteVirtualPublico;
using Oracle.DataAccess.Client;
using Mincetur.Administracion.AplTramiteVirtualPublico.DaTramiteVirtualPublico.DataBaseHelpers;
using System.Data;

namespace Mincetur.Administracion.AplTramiteVirtualPublico.DaTramiteVirtualPublico
{
    public class daUDml : daBase
    {
        public coResultadoDB ejecutarDml(OracleParameter[] cmdParameters, string strCommandText)
        {
            coResultadoDB objCoResultadoDB = new coResultadoDB();
            using (OracleConnection cnn = new OracleConnection(this.CadenaConexion))
            {
                try
                {
                    cnn.Open();
                    using (OracleTransaction trx = cnn.BeginTransaction())
                    {
                        using (OracleDataReader drReader = OracleHelper.ExecuteReader(trx, CommandType.StoredProcedure, strCommandText, cmdParameters))
                        {
                            if (drReader.Read())
                            {
                                if (!drReader.IsDBNull(drReader.GetOrdinal("ID_TIPO"))) objCoResultadoDB.ID_TIPO = int.Parse(drReader["ID_TIPO"].ToString());
                                if (!drReader.IsDBNull(drReader.GetOrdinal("ID_ERROR"))) objCoResultadoDB.ID_ERROR = drReader["ID_ERROR"].ToString();
                                if (!drReader.IsDBNull(drReader.GetOrdinal("DES_ERROR"))) objCoResultadoDB.DES_ERROR = drReader["DES_ERROR"].ToString();
                                for (int i = 0; i < drReader.FieldCount; i++)
                                {
                                    if (drReader.GetName(i).Equals("VALOR", StringComparison.InvariantCultureIgnoreCase))
                                    {
                                        if (!drReader.IsDBNull(drReader.GetOrdinal("VALOR"))) objCoResultadoDB.VALOR = drReader["VALOR"].ToString();
                                    }
                                    else if (drReader.GetName(i).Equals("VALOR1", StringComparison.InvariantCultureIgnoreCase))
                                    {
                                        if (!drReader.IsDBNull(drReader.GetOrdinal("VALOR1"))) objCoResultadoDB.VALOR1 = drReader["VALOR1"].ToString();
                                    }
                                    else if (drReader.GetName(i).Equals("VALOR2", StringComparison.InvariantCultureIgnoreCase))
                                    {
                                        if (!drReader.IsDBNull(drReader.GetOrdinal("VALOR2"))) objCoResultadoDB.VALOR2 = drReader["VALOR2"].ToString();
                                    }
                                }
                            }
                        }
                        if (objCoResultadoDB.ID_TIPO == 0)
                        {
                            trx.Commit();
                        }
                        else
                        {
                            trx.Rollback();
                        }
                    }
                }
                catch (Exception ex)
                {
                    objCoResultadoDB.ID_TIPO = 1;
                    objCoResultadoDB.ID_ERROR = "";
                    objCoResultadoDB.DES_ERROR = ex.Message;
                    throw new coAppException("DataAccess :: Error metodo ", ex);
                }
                finally
                {
                    if (cnn.State != ConnectionState.Closed)
                    {
                        cnn.Close();
                    }
                    if (cnn.State == ConnectionState.Closed)
                    {
                        cnn.Dispose();
                    }

                }
            }
            return objCoResultadoDB;

        }
    }
}
