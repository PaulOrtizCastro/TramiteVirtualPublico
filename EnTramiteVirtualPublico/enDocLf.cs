using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Mincetur.Administracion.AplTramiteVirtualPublico.EnTramiteVirtualPublico
{
    public class enDocLf : enBase
    {
        public string COD_CMS { get; set; }
        public string DES_EXTENSION { get; set; }
        public string DES_NOM { get; set; }
        public string DES_NOM_ABR { get; set; }
        public string DES_RUTA { get; set; }
        public enExpe enExpe { get; set; }
        public enOrigen enOrigen { get; set; }
        public enTupa enTupa { get; set; }
        public int FLG_PRINC { get; set; }
        public int ID_DOC_CMS { get; set; }
        public int ID_DOC_LF { get; set; }
        public double NUM_SIZE_ARCHIVO { get; set; }
        public int ID_EXPE { get; set; }
        public int ID_MOVI { get; set; }
        public int ID_DOC { get; set; }
        public string DES_DOC { get; set; }
        public string FLG_STR_EST { get; set; }
    }
}
