using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using Mincetur.Administracion.TramiteDocumentario.EnTramiteDocumentario;
using Mincetur.Administracion.AplTramiteVirtualPublico.DaTramiteVirtualPublico;
using Mincetur.Administracion.AplTramiteVirtualPublico.CoTramiteVirtualPublico;

namespace Mincetur.Administracion.AplTramiteVirtualPublico.NeTramiteVirtualPublico
{
    public class neTupa : coHBase
    {
         public List<enTupa> traeListaTupa(enTupa objEnTupa)
        {
            List<enTupa> list = new List<enTupa>();
            using (daTupa objDa = new daTupa())
            {
                list = objDa.traeListaTupa(objEnTupa);
            }
            return list;
        }
    }
    
}
