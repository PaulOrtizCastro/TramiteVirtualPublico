using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Mincetur.Administracion.AplTramiteVirtualPublico.CoTramiteVirtualPublico;
using Mincetur.Administracion.TramiteDocumentario.EnTramiteDocumentario;
using Mincetur.Administracion.AplTramiteVirtualPublico.DaTramiteVirtualPublico;

namespace Mincetur.Administracion.AplTramiteVirtualPublico.NeTramiteVirtualPublico
{
    public class neDoc : coHBase
    {
        public List<enDoc> traeListaDoc(enDoc objEnDoc)
        {
            List<enDoc> lst = new List<enDoc>();
            using (DaDoc objDa = new DaDoc())
            {
                lst = objDa.traeListaDoc(objEnDoc);
            }
            return lst;
        }
    }
}
