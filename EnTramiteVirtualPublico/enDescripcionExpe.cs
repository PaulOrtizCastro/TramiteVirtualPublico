using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Mincetur.Administracion.AplTramiteVirtualPublico.EnTramiteVirtualPublico
{
    public class enDescripcionExpe : enBase
    {
        public enClasif enClasif { get; set; }
        public enTupaConcepto enTupaConcepto { get; set; }
        public enEstado enEstado { get; set; }
        public int ID_EXPE { get; set; }
        public string DES_ASUNTO { get; set; }
        public DateTime FEC_EXPE { get; set; }
    }
}
