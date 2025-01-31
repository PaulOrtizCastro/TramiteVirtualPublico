using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Mincetur.Administracion.AplTramiteVirtualPublico.EnTramiteVirtualPublico;
using Mincetur.Administracion.AplTramiteVirtualPublico.DaTramiteVirtualPublico;
using Mincetur.Administracion.AplTramiteVirtualPublico.CoTramiteVirtualPublico;

namespace Mincetur.Administracion.AplTramiteVirtualPublico.NeTramiteVirtualPublico
{
    public class nePersona : coHBase
    {
        public List<enPersona> traeListaPersona(enPersona objEnPersona)
        {
            List<enPersona> lst = new List<enPersona>();
            using (daPersona objDaPublico = new daPersona())
            {
                lst = objDaPublico.traeListaPersona(objEnPersona);
            }
            return lst;
        }
        public coResultadoDB validarUsuario(enPersona objEnPersona)
        {
            using (daPersona objDaPublico = new daPersona())
            {
                return objDaPublico.validarUsuario(objEnPersona);
            }
        }
    }
}

