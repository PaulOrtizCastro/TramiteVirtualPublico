using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Mincetur.Administracion.AplTramiteVirtualPublico.EnTramiteVirtualPublico
{
    public class enRecurso : enBase
    {
        public int ID_RESOLUCION { set; get; }
        public int ID_TUPA { set; get; }
        public string COD_TUPA { set; get; }
        public string DES_RESOLUCION { set; get; }
        public int FLG_EST { set; get; }
        public DateTime FEC_INI { set; get; }
        public DateTime FEC_FIN { set; get; }
        public int PLAZO_RECURSO { set; get; }
        public int PLAZO_RESOLVER { set; get; }
        public int ID_SUB { set; get; }
        public string ID_SUBOFI { set; get; }
        public int ID_TUPA_CONCEPTO { set; get; }        
    }
}
