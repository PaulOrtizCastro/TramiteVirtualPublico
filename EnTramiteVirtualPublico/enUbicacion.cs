using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Mincetur.Administracion.GeneralesUtil.EnGeneralesUtil;

namespace Mincetur.Administracion.AplTramiteVirtualPublico.EnTramiteVirtualPublico
{
    public class enUbicacion : enBase
    {
        public enMovi enMovi { get; set; }
        public enEstado enEstado { get; set; }
        public enEstorg enEstorg { get; set; }
    }
}
