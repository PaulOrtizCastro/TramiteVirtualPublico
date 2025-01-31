using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Mincetur.Administracion.AplTramiteVirtualPublico.EnTramiteVirtualPublico
{
    public class enComent: enMovi
    {
        public int ID_COMENT { set; get; }
        public string DES_COMENT { set; get; }
        public DateTime FEC_COMENT { set; get; }
        public DateTime FEC_INI { set; get; }
    }
}
