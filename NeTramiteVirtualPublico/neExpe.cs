using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Mincetur.Administracion.AplTramiteVirtualPublico.CoTramiteVirtualPublico;
using Mincetur.Administracion.TramiteDocumentario.EnTramiteDocumentario;
using Mincetur.Administracion.AplTramiteVirtualPublico.DaTramiteVirtualPublico;
using enTramiteVirtual = Mincetur.Administracion.AplTramiteVirtualPublico.EnTramiteVirtualPublico;
//using Mincetur.Administracion.AplTramiteVirtualPublico.EnTramiteVirtualPublico;

namespace Mincetur.Administracion.AplTramiteVirtualPublico.NeTramiteVirtualPublico
{
    public class neExpe : coHBase
    {
        public List<enMovi> traeListaUbicacionActual(enMovi objEn)
        {
            List<enMovi> lst = new List<enMovi>();
            using (daExpe objDa = new daExpe())
            {
                lst = objDa.traeListaUbicacionActual(objEn);
            }
            return lst;
        }
        public List<enExpe> traeListaExpe(enExpe objEn)
        {
            List<enExpe> lst = new List<enExpe>();
            using (daExpe objDa = new daExpe())
            {
                lst = objDa.traeListaExpe(objEn);
            }
            return lst;
        }
        public enTramiteVirtual.enExpe traeListaExpedientePublico(enTramiteVirtual.enExpe objEnExpe) {
            using (daExpe objDa = new daExpe())
            {
                return objDa.traeListaExpedientePublico(objEnExpe);
            }
        }
    }
}
