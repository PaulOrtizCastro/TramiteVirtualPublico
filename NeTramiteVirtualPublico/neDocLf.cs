using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Mincetur.Administracion.AplTramiteVirtualPublico.CoTramiteVirtualPublico;
using Mincetur.Administracion.TramiteDocumentario.EnTramiteDocumentario;
using Mincetur.Administracion.AplTramiteVirtualPublico.DaTramiteVirtualPublico;

namespace Mincetur.Administracion.AplTramiteVirtualPublico.NeTramiteVirtualPublico
{
    public class neDocLf : coHBase
    {
        public List<enDocLf> listar(enDocLf objEnDocLf)
        {
            List<enDocLf> lst = new List<enDocLf>();
            using (daDocLf objDa = new daDocLf())
            {
                lst = objDa.listar(objEnDocLf);
            }
            return lst;
        }
    }
}
