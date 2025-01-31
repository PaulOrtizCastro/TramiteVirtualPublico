using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Mincetur.Administracion.AplTramiteVirtualPublico.CoTramiteVirtualPublico;
namespace Mincetur.Administracion.AplTramiteVirtualPublico.DaTramiteVirtualPublico
{
    public abstract class daBase : coHBase
    {
        private string strCadenaConnect = string.Empty;
        protected string CadenaConexion
        {
            get { return strCadenaConnect; }
        }
        public daBase()
        {
            this.strCadenaConnect = daConexion.obtenerCadenaConexion();
        }

        #region Métodos Públicos
        public object validarNulo(object Obj, string objPropiedadHija = "")
        {
            try
            {

                if (!string.IsNullOrEmpty(objPropiedadHija))
                {
                }
                if ((Obj) is string)
                {
                    return (string.IsNullOrEmpty(Obj.ToString()) ? DBNull.Value : Obj);
                }
                else if ((Obj) is System.DateTime)
                {

                    return (DateTime.Equals(Obj, DateTime.MinValue) ? DBNull.Value : Obj);
                }
                else if ((Obj) is int | (Obj) is Int64 | (Obj) is Int16 | (Obj) is uint || (Obj) is long)
                {
                    //if (Obj.Equals(-1) || Obj.Equals(0))
                    if (Obj.ToString() == "-1" || Obj.ToString() == "0")
                    {
                        return DBNull.Value;
                    }
                    else
                    {
                        return Obj;
                    }
                }
                else if ((Obj) is double || (Obj) is decimal)
                {
                    if (Obj.Equals(-1))
                    {
                        return DBNull.Value;
                    }
                    else
                    {
                        return Obj;
                    }
                }
                else
                {
                    if ((Obj == null))
                    {
                        return DBNull.Value;
                    }
                    else
                    {
                        dynamic objPropiedad = Obj.GetType().GetProperty(objPropiedadHija).GetValue(Obj, null);
                        return validarNulo(objPropiedad);
                    }
                }
            }
            catch
            {
                return DBNull.Value;
            }
        }
        #endregion
    }
}
