using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Mincetur.Administracion.AplGestionDoc.WebGestionDoc.Areas.Documento.Models
{
    public class enEstorgModel
    {
        public string ABR_SUBOFI { get; set; }
        public string DES_SUBOFI { get; set; }
        public DateTime FEC_CREA { get; set; }
        public DateTime FEC_FIN { get; set; }
        public DateTime FEC_INI { get; set; }
        public DateTime FEC_MODI { get; set; }
        public int? FLG_EST { get; set; }
        public string ID_OFICONC { get; set; }
        public int? ID_SUB { get; set; }
        public string ID_SUBOFI { get; set; }
        public int? NUM_NIVEL { get; set; }
        public int? USU_CREA { get; set; }
        public int? USU_MODI { get; set; }
    }
}