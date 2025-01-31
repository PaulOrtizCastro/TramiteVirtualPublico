using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Mincetur.Administracion.AplTramiteVirtualPublico.EnTramiteVirtualPublico
{
    public class enAdjuntarArchivo : enBase
    {
        public long ID_ARCH_ADJ { get; set; }
        public long ID_DOC_ELEC { set; get; }
        public long ID_DOC_CMS { set; get; }
        public int ID_VERSION { set; get; }
        public int ID_DOC { set; get; }
        public long SIZE_ARCHIVO { set; get; }
        public string NOMBRE_ARCHIVO { set; get; }
        public string NOMBRE_ARCHIVO_OCULTO { set; get; }
        public string RUTA_ARCHIVO { set; get; }
        public string UBICACION_ARCHIVO { set; get; }
        public string OBSERVACION { set; get; }
        public int FLG_GRABADO { set; get; }
        public string ID_PROV_DIG { set; get; }
    }
}
