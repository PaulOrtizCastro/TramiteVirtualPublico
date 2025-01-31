using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Mincetur.Administracion.AplTramiteVirtualPublico.EnTramiteVirtualPublico
{
    public class enTrazabilidad : enBase
    {
        public int ID_BORRADOR { get; set; }
        public int ID_VERSION { get; set; }
        public int ID_TRAZABILIDAD { get; set; }
        public string ABR_ESTADO { get; set; }
        public string DES_ESTADO { get; set; }
        public int ID_ESTADO { get; set; }
        public int ID_SUB { get; set; }
        public string ID_SUBOFI { get; set; }
        public string DES_SUBOFI { get; set; }
        public string ABR_SUBOFI { get; set; }
        public int ID_ESTADO_ANT { get; set; }
        public int ID_PERSONA { get; set; }
        public string DES_OBS { get; set; }
        public int FLG_TRAZABILIDAD { get; set; }
        public int NUM_ORDEN { get; set; }
        public string DATO { get; set; }
        public int FLG_APRUEBA { get; set; }
        public int FLG_USU_ACTIVO { get; set; }
        
        
        public DateTime FEC_RESP { get; set; }
    }
}

