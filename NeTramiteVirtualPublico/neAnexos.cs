using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Mincetur.Administracion.AplTramiteVirtualPublico.EnTramiteVirtualPublico;
using Mincetur.Administracion.AplTramiteVirtualPublico.DaTramiteVirtualPublico;
using Mincetur.Administracion.AplTramiteVirtualPublico.CoTramiteVirtualPublico;
using Mincetur.Administracion.TramiteDocumentario.EnTramiteDocumentario;

namespace Mincetur.Administracion.AplTramiteVirtualPublico.NeTramiteVirtualPublico
{
    public class neAnexos : coHBase
    {
        public List<enAnexos> traeListaAnexos(enAnexos objEn)
        {
            List<enAnexos> lst = new List<enAnexos>();
            using (daAnexos objDa = new daAnexos())
            {
                lst = objDa.traeListaAnexos(objEn);
            }
            return lst;
        }
    }
}
