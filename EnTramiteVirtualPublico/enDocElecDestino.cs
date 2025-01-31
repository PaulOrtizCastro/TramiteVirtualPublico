using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Mincetur.Administracion.AplTramiteVirtualPublico.EnTramiteVirtualPublico
{
    public class enDocElecDestino
    {
        public long ID_DOCELEC_DESTINO { set; get; }
        public long ID_DOC_ELEC { set; get; }
        public int ID_VERSION { set; get; }
        public int ID_PERSONA { set; get; }
        public long ID_EXPE { set; get; }
        public int ID_MOVI { set; get; }
        public int ID_SUB { set; get; }
        public string ID_SUBOFI { set; get; }
        public int FLG_CC { set; get; }
        public int FLG_PEROFI { set; get; }
        public string DES_SUBOFI { get; set; }
        public string DES_OBS { get; set; }
        public string ID_CARGO { get; set; }
        public string DES_CARGO { get; set; }
        public string ID_TITULO { get; set; }
        public string DES_TITULO { get; set; }
        public string FLG_RECIBIDO { get; set; }
        public string FEC_RECIBIDO { get; set; }
        public string FLG_TIPOENVIOMAIL { get; set; }
        public string FLG_ENVIO { get; set; }
        public string LOG_FUNRES { get; set; }
        public string EMAIL { get; set; }
        public int ID_DESTINATARIO { get; set; }
        public long ID_FUNRES { set; get; }
        public string NOM_FUNRES { set; get; } 
        public int FLG_OFIFUN { set; get; }
        public int ID_TRATA { get; set; }
        public int ID_PRIORIDAD { get; set; }
        public int ID_ESTADO { get; set; }
        public int PLAZO { get; set; }
        public string FLG_TIPO_DIA { get; set; }
    }
}
