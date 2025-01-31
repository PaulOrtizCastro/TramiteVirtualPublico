using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Mincetur.Administracion.AplTramiteVirtualPublico.EnTramiteVirtualPublico
{
    public class enDocElec : enBase
    {

        public int ID_DOC_ELEC { set; get; }
        public int ID_DOC { set; get; }
        public int ID_DOC_DER { set; get; }
        public int ID_VERSION { set; get; }
        public int FLG_EXPE { set; get; }
        //public int ID_SUB { set; get; }
        //public string ID_SUBOFI { set; get; }
        public int ID_PERSONA { set; get; }
        //public int ID_TIP_DOC { set; get; }
        public string DES_DOC { set; get; }
        public string DES_ASUNTO { set; get; }
        public string DES_REFE { set; get; }
        public DateTime FEC_DOC { set; get; }
        public DateTime FEC_PLAZO { set; get; }
        public string DES_CUERPO { set; get; }
        //public string DES_OBS { set; get; }
        public int FLG_GRABADO { set; get; }
        public DateTime FEC_GRABADO { set; get; }
        public int FLG_APROBADO { set; get; }
        public DateTime FEC_APROBADO { set; get; }
        public int FLG_ENVIADO { set; get; }
        public DateTime FEC_ENVIADO { set; get; }
        public int FLG_DERIVADO { set; get; }
        public DateTime FEC_DERIVADO { set; get; }
        public int FLG_RECEPCIONADO { set; get; }
        public DateTime FEC_RECEPCIONADO { set; get; }
        //public int FLG_EST { set; get; }
        public int ID_EXPE { get; set; }
        public int ID_MOVI { get; set; }
        public int ID_MOVI_ANT { get; set; }
        public string REMITE_ABR { set; get; }
        public string DES_DESTINA { set; get; }
        public string DES_VERSION { set; get; }
        public int ID_DOCELEC_NIV { set; get; }
        public string FLG_ENVIA { set; get; } 
        public int FLG_CC { set; get; }
        public string TIP_BORRADOR { set; get; } 
        public int ID_SUB_RE { set; get; }
        public string ID_SUBOFI_RE { set; get; }
        public int ID_PERSONA_RE { set; get; }
        public int ID_SUB_DE { set; get; }
        public string ID_SUBOFI_DE { set; get; }
        public int ID_PERSONA_DE { set; get; }
        public int ID_TRATA { set; get; }
        public string INSERT_MOVI { set; get; }
        public string ID_ANIO_PROC { set; get; }
        public string NUM_DOC_NEW { set; get; }
        public string INSERT_ASIG { get; set; }
        public string NOMBRE_REMITENTE { set; get; }
        public string CORREO_REMITENTE { set; get; }
        public string CORREO_DESTINO { set; get; }
        public string NOMBRE_DESTINO { set; get; }
        public int FLG_DEVOLVER_BORRADOR { set; get; }
        public string DES_OBS_DEVOLVER { set; get; }
        public string ULT_EST_BORRADOR { set; get; }
        public string ABR_ESTADO { set; get; }
        public string COD_LOG { set; get; }
        public string DES_ESTADO { set; get; }
        public string DES_PERSONA { set; get; }
        public string ABR_SUBOFI { set; get; }
        public DateTime FEC_PROCESO { set; get; }
        public int ID_SUB_QLT { set; get; } 
        public int ULT_ID_ESTADO { set; get; }
        public int ULT_ID_PERSONA { set; get; }
        public int ULT_ID_SUB { set; get; }
        public int FLG_GRABAR_ENVIAR { set; get; }
        public int FLG_OMITIR_ESTDOC { set; get; }
        public int FLG_OFIFUN { set; get; }
        public DateTime FEC_PRE_APROBADO { set; get; }
        public int FLG_INSERT_NIV { set; get; }
        public int FLG_ACT_APROBAR { set; get; }
        public int FLG_GENERA { set; get; }
        public string ID_PARAMETRO { set; get; }
        public string DES_BUSQUEDA { set; get; }
        public string DES_FLG_EST { set; get; }
        public int FLG_PE { set; get; }
        public int FLG_AN { set; get; }
        public int FLG_AP { set; get; }
        public string FLG_PRE_APRUEBA { set; get; }
        public int FLG_PRE_APROBADO { set; get; }
        public int ID_SUB_CO { set; get; } 
        public string ID_SUBOFI_CO { set; get; }
        public int ID_PERSONA_CO { set; get; }
        public int X_FLG_EDITAPRUEBA { set; get; }
        
        public string INSERTS { set; get; }
        public string UPDATES { get; set; }

        public int? NUM_FOLIOS { get; set; }

        public enAccion enAccion { get; set; }

        public int ID_SUB { get; set; }
        public string ID_SUBOFI { get; set; }
        public string FLG_TIPO_DIA { get; set; }
        //public int? ID_ANO_PROC { set; get; }
        //public int? ID_ESTADO { set; get; }
        public int ID_ACCION { set; get; }
        public List<enDocElecDestino> DESTINATARIOS { get; set; }
    }
}
