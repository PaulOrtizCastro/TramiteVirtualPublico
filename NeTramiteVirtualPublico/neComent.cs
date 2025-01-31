using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Mincetur.Administracion.AplTramiteVirtualPublico.CoTramiteVirtualPublico;
using Mincetur.Administracion.AplTramiteVirtualPublico.EnTramiteVirtualPublico;
using Mincetur.Administracion.AplTramiteVirtualPublico.DaTramiteVirtualPublico;

namespace Mincetur.Administracion.AplTramiteVirtualPublico.NeTramiteVirtualPublico
{
    public class neComent : coHBase
    {
        public coResultadoDB mantenimiento(enComent objEn)
        {
            coResultadoDB objCoResultadoDB = new coResultadoDB();
            using (daComent objDa = new daComent())
            {
                objCoResultadoDB = objDa.mantenimiento(objEn);
            }
            return objCoResultadoDB;
        }
    }
}
