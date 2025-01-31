using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
//using Mincetur.Administracion.TramiteDocumentario.EnTramiteDocumentario;


namespace Mincetur.Administracion.AplTramiteVirtualPublico.EnTramiteVirtualPublico
{
    public class enDocElecExpe : enBase
    {
        public string DES_ASUNTO { set; get; }
        public string DES_ANEXO { set; get; }
        public int ID_DOC_ELEC { set; get; }
        public int ID_VERSION { set; get; }
        public long ID_PERSONA { set; get; }
        public string DES_CONTENT { set; get; }
        public string DES_PERSONA_ENVIA { set; get; }
        public string DES_CORREO_ENVIA { set; get; }
        public string[] lstCorreoCC { set; get; }
        public string[] lstCorreoCCO { set; get; }
        public string[] lstCorreo { set; get; }
        public int ID_ACCION { get; set; }
        public List<enDestinoEO> lstDestino { set; get; }
        public List<enDestinoEO> lstDestinoCC { set; get; }
        public enTipDoc enTipoDoc { set; get; }
        public string ID_ROL { set; get; }
        public int ID_EXPE { get; set; }
        public int ID_MOVI { get; set; }
        public int ID_DOC { get; set; }
    }
}
