using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Mincetur.Administracion.GeneralesUtil.EnGeneralesUtil;

namespace Mincetur.Administracion.AplTramiteVirtualPublico.EnTramiteVirtualPublico
{
    public class enPersona : enBase
    {
        public int ID_PERSONA { get; set; }
        public string DES_NOMBRES { get; set; }
        public string APE_PATER { get; set; }
        public string APE_MATER { get; set; }
        public string NOMFUNC { get; set; }
        public string NOMBRECOMPLETO { get; set; }
        public string RUC { get; set; }
        public int ID_JEFE { get; set; }
        public int ID_SUB { get; set; }
        public int ID_DOC { get; set; }
        public int ID_ROL { get; set; }
        public string COD_PIN { get; set; }
        
        public string ID_SUBOFI { get; set; }
        public string DES_SUBOFI { get; set; }
        public string ABR_SUBOFI { get; set; }
        public string TIPO_PERSONA { get; set; }
        public int ID_CARGOFUN { get; set; }
        public string DES_CARGO { get; set; }
        public int ID_SUBCARGO { get; set; }
        public string DES_SUBCARGO { get; set; }
        public string ANEXO { get; set; }
        public string CORREO { get; set; }
        public string DES_DOC_IDEN { get; set; }
        public int ID_PISO { get; set; }
        public string PISO { get; set; }
        public string DES_CARGOFUN { get; set; }
        public int ESTADO { get; set; }

        public int ID_FORMA_PAGO { get; set; }
        public int IMP_TOTAL { get; set; }
        public string NUM_DOC_PAGO { get; set; }
        public string COD_LOG { get; set; }
        
        public DateTime FEC_PAGO { get; set; }
        public enEstorg enEstorg { get; set; }


    }
}
