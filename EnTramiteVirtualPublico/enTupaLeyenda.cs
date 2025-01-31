using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Mincetur.Administracion.AplTramiteVirtualPublico.EnTramiteVirtualPublico
{
    public class enTupaLeyenda : enBase
    {
        public int ID_TUPA_LEYENDA { set; get; }
        public string DES_LEYENDA { set; get; }
        public string DES_NIVEL { set; get; }
        public DateTime FEC_INI { set; get; }
        public DateTime FEC_FIN { set; get; }
        public int FLG_EST { set; get; }
        public int NUM_VERSION { set; get; }
    }
}