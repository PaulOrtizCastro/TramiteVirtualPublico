using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Mincetur.Administracion.AplTramiteVirtualPublico.CoTramiteVirtualPublico;
using Mincetur.Administracion.GeneralesUtil.EnGeneralesUtil;

namespace Mincetur.Administracion.AplTramiteVirtualPublico.EnTramiteVirtualPublico
{
    public class enExpe : enBase
    {
        public int ID_EXPE { get; set; }
        public int? ID_PERSONA { get; set; }
        public DateTime FEC_EXPE { get; set; }
        public string DES_ASUNTO { get; set; }
        public int? ID_ANO_PROC { get; set; }
        public coResultadoDB coResultadoDB { get; set; }
        public enClasif enClasif { get; set; }
        public enTupaConcepto enTupaConcepto { get; set; }
        public enEstado enEstado { get; set; }
        public enMovi enMovi { get; set; }
        public enEstorg enEstorg { get; set; }
        public enPersona enPersona { get; set; }
        public enTipDoc enTipDoc { get; set; }
        public List<enDescripcionExpe> lstEnDescripcionExpe { get; set; }
        public List<enUbicacion> lstEnUbicacion { get; set; }
        public int FLG_VV { get; set; }
    }
}
