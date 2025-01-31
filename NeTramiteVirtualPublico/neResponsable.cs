using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Mincetur.Administracion.AplTramiteVirtualPublico.EnTramiteVirtualPublico;
using Mincetur.Administracion.AplTramiteVirtualPublico.DaTramiteVirtualPublico;
using Mincetur.Administracion.AplTramiteVirtualPublico.CoTramiteVirtualPublico;

using Mincetur.Administracion.GeneralesUtil.EnGeneralesUtil;
namespace Mincetur.Administracion.AplTramiteVirtualPublico.NeTramiteVirtualPublico
{
    public class neResponsable : coHBase
    {

        public string TraeResponsable(enDocElecExpe objEn)
        {
            string rpt = "";

            using (daResponsable objDa = new daResponsable())
            {
                rpt = objDa.TraeResponsable(objEn);
            }
            return rpt;
        }
        public int traeResponsableporOficina(enEstorg objEn)
        {
            int idResponsable = 0;

            using (daResponsable objDa = new daResponsable())
            {
                idResponsable = objDa.traeResponsableporOficina(objEn);
            }
            return idResponsable;
        }
    }
}
