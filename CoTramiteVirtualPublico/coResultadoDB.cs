using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Mincetur.Administracion.AplTramiteVirtualPublico.CoTramiteVirtualPublico
{
    public class coResultadoDB : coHBase
    {
        public int ID_TIPO { get; set; }
        public string ID_ERROR { get; set; }
        public string DES_ERROR { get; set; }
        public string VALOR { get; set; }
        public string VALOR1 { get; set; }
        public string VALOR2 { get; set; }
    }
}
