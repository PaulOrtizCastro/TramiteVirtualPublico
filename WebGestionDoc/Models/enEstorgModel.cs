using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Mincetur.Administracion.AplTramiteVirtualPublico.EnTramiteVirtualPublico;

namespace Mincetur.Administracion.AplGestionDoc.WebGestionDoc.Models
{
    public class enEstorgModel : enBase
    {
        public int? ID_SUB { get; set; }
        public string ID_SUBOFI { get; set; }
        public string DES_SUBOFI { get; set; }
        public string ABR_SUBOFI { get; set; }
        public int? NUM_NIVEL { get; set; }
        public int? FLG_ESTORG { get; set; }
        public int? ID_TRATA { get; set; }
        public int? ID_PRIORIDAD { get; set; }
        public string DES_OBS { get; set; }
        public int? FLG_REMITE { get; set; }
        public int? ID_SUB_REM { get; set; }
        public string ID_SUBOFI_REM { get; set; }

    }
}