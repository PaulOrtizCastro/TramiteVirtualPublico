using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Mincetur.Administracion.AplTramiteVirtualPublico.CoTramiteVirtualPublico;
using Mincetur.Administracion.AplTramiteVirtualPublico.EnTramiteVirtualPublico;
using Mincetur.Administracion.AplTramiteVirtualPublico.DaTramiteVirtualPublico;
using Mincetur.Administracion.GeneralesUtil.EnGeneralesUtil;

namespace Mincetur.Administracion.AplTramiteVirtualPublico.NeTramiteVirtualPublico
{
    public class neDerivar : coHBase
    {
        public coResultadoDB mantenimiento(enDocElec objEn)
        {
            coResultadoDB objCoResultadoDB = new coResultadoDB();
            using (daDerivar objDa = new daDerivar())
            {
                objCoResultadoDB = objDa.mantenimiento(objEn);
            }
            return objCoResultadoDB;
        }

        public List<enEstorg> ListarOficinaReglas(enEstorg objEn)
        {
            List<enEstorg> list = new List<enEstorg>();
            using (daDerivar objDa = new daDerivar())
            {
                list = objDa.ListarOficinaReglas(objEn);
            }
            return list;
        }
    }
}
