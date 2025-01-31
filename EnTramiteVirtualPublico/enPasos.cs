using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Mincetur.Administracion.AplTramiteVirtualPublico.EnTramiteVirtualPublico
{
    public class enPasos: enBase
    {
        public int ID_TUPA { get; set; }
        public int NUM_PASO { get; set; }
        public string DES_PASO { get; set; }
    }
}
