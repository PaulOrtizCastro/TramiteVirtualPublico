using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Mincetur.Administracion.GeneralesUtil.EnGeneralesUtil;
using Mincetur.Administracion.Seguridad.EnSeguridad;

namespace Mincetur.Administracion.AplTramiteVirtualPublico.EnTramiteVirtualPublico
{
    public class enAsignar : enMovi
    {
        public int? ID_ASIGNA { get; set; }
        public int? ID_USU_FUNC { get; set; }
        public DateTime FEC_RESP { get; set; }
        public int? COD_TIP_RESP { get; set; }
        public int? TOTAL { get; set; }
        public int? NUM_ASIGNACION { get; set; }
        public int? TIP_RESP_ASIGNACION { get; set; }
        public string TIP_RESP { get; set; }
        public int? SEMAFORO { get; set; }
        public string DES_CLASIF { get; set; }

        public string FLG_TIPO_DIA { get; set; }
        
        public enExpe enExpe { get; set; }
        public enMovi enMovi { get; set; }
        public enPersona enPersonaRemite { get; set; }
        public enEstorg enEstorg { get; set; }
        public enUsu enUsu { get; set; }

        public string DES_OBS_RESP { get; set; }
        public string DES_OBS_DOC_DERIVADO { get; set; }
        public List<enDocElecDestino> DESTINATARIOS { get; set; }
    }
}
