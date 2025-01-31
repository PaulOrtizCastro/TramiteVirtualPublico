using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Mincetur.Administracion.AplTramiteVirtualPublico.CoTramiteVirtualPublico;
using System.Configuration;

namespace Mincetur.Administracion.AplTramiteVirtualPublico.DaTramiteVirtualPublico
{
    public class daConexion : coHBase
    {
        public static string obtenerCadenaConexion()
        {
            string strServidor = ConfigurationManager.AppSettings["ServerCnx"];
            string UserCnx = ConfigurationManager.AppSettings["UserCnx"];
            string PassCnx = string.Empty;
            if (string.IsNullOrEmpty(UserCnx)) UserCnx = "GENUSER";
            else if (UserCnx.IndexOf('/') != -1)
            {
                PassCnx = UserCnx.Split('/')[1];
                UserCnx = UserCnx.Split('/')[0];
            }
            if (string.IsNullOrEmpty(PassCnx)) PassCnx = UserCnx;
            //return "Data Source=" + strServidor + ";USER ID=" + UserCnx + ";Password=" + PassCnx + ";Pooling=True;Min Pool Size=1; Max Pool Size=25;Connection Lifetime=60";
            return "Data Source=" + strServidor + ";User Id=" + UserCnx + ";Password=" + PassCnx + ";POOLING=False;";
            //Data Source=VDESA03;User Id=INSDBA;Password=INSDBA;POOLING=False;
        }
    }
}
