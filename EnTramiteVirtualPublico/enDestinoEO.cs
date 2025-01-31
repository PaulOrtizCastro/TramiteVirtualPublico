using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Mincetur.Administracion.GeneralesUtil.EnGeneralesUtil;

namespace Mincetur.Administracion.AplTramiteVirtualPublico.EnTramiteVirtualPublico
{
    public class enDestinoEO: enBase
    {
        public string COD_LOG { get; set; }
        public string DES_CARGO { get; set; }
        public string DES_CORREO { get; set; }
        public string DES_DOC { get; set; }
        public string DES_OFICINA { get; set; }
        public string DES_PERSONA { get; set; }
        public enEstorg enEstorg { get; set; }
        public enPersona enPersona { get; set; }
        public int FLG_CC { get; set; }
        public int FLG_OFIFUN { get; set; }
        public long ID_DOC { get; set; }
        public long ID_EXPE { get; set; }
        public int ID_MOVI { get; set; }
        public long ID_PERSONA { get; set; }
    }
}
