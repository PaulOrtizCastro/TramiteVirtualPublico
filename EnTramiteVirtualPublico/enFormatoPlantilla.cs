using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Mincetur.Administracion.GeneralesUtil.CoGeneralesUtil;
using Mincetur.Administracion.GeneralesUtil.EnGeneralesUtil;

namespace Mincetur.Administracion.AplTramiteVirtualPublico.EnTramiteVirtualPublico
{
    public class enFormatoPlantilla : enBase
    {
        public int ID_BORRADOR { get; set; }
        public int ID_VERSION { get; set; }
        public int ID_DOC { get; set; }
        public enEstorg enEstorg { get; set; }
        public enEstorg enEstorgRemite { get; set; }
        public enPersona enPersona { get; set; }
        public enExpe enExpe { get; set; }
        public enMovi enMovi { get; set; }
        public string DES_OBS { get; set; }        
        public string LINK_ADJ { get; set; }
        public int ID_PERSONA_REM { get; set; }
        public string DES_PERSONA_REM { get; set; }
        public string CORREO_REM { get; set; }
        public string URL_EDITAR { get; set; }
        public string URL_DEVOLVER { get; set; }
        public string DES_LINKDOC { get; set; }
        public string URL_EXPE { get; set; }
        public string URL_PREAPROBAR { get; set; }
        public string URL_APROBAR { get; set; }
        public string URL_GESTIONAR { get; set; }
        public enAccion enAccion { get; set; }
        public enTipDoc enTipDoc { get; set; }

    }
}
