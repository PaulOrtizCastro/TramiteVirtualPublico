using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Mincetur.Administracion.AplTramiteVirtualPublico.EnTramiteVirtualPublico
{
    public class enBorrador : enBase
    {
        public int ID_BORRADOR { get; set; }
        public int ID_VERSION { get; set; }
        public int ID_EXPE { get; set; }
        public int ID_MOVI { get; set; }
        public int ID_DOC { get; set; }
        public int ID_TIP_DOC { get; set; }
        public string DES_DOC { get; set; }
        public int ID_ANO_PROC { get; set; }
        public int ID_SUB { get; set; }
        public string ID_SUBOFI { get; set; }
        public int ID_ESTADO { get; set; }
        public int FLG_OFIFUN { get; set; }
        public string DATO { get; set; }
        public int ID_DOC_BORRADOR { get; set; }

    }
}
