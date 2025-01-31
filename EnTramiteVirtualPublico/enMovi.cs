using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Mincetur.Administracion.GeneralesUtil.EnGeneralesUtil;

namespace Mincetur.Administracion.AplTramiteVirtualPublico.EnTramiteVirtualPublico
{
    public class enMovi :enExpe
    {

        public int ID_MOVI { get; set; }
        public DateTime FEC_MOVI { get; set; }
        public int? FLG_ORIGINAL { get; set; }
        public int? FLG_ANEXO { get; set; }
        public int? FLG_CORRESP { get; set; }
        public int? ID_ARCHIVO { get; set; }
        public string DES_COMENT { get; set; }
        public string DES_COMENT_INI { get; set; }
        public string DES_ASIGNA { get; set; }
        public string INSERTS { get; set; }
        public string UPDATES { get; set; }
        public int? ID_MOVI_ANT { get; set; }
        public string RUC { get; set; }
        public string DES_ARCHIVO { get; set; }
        public enEstorg enEstorg { get; set; }
        public enEstorg enEstorgRemite { get; set; }
        public enOrigen enOrigen { get; set; }
        public enTipDoc enTipDoc { get; set; }
        public enTipDoc enTipDocAsignado { get; set; }
        public enDoc enDoc { get; set; }
        public enDoc enDocRespuesta { get; set; }
        public enTupa enTupa { get; set; }
        public enTupaConcepto enTupaConcepto { get; set; }
        public enPersona enPersona { get; set; }
        public enAccion enAccion { get; set; }
        //public enTipDoc enTipDocDerivado;
        //public enAccion enAccion;
        public enEstado enEstadoAnt { get; set; }
        public string DES_PLAZO { get; set; }
        public string DES_SUB_TODO { get; set; }
        public DateTime FEC_PLAZO { get; set; }
        public DateTime FEC_RECEP { get; set; }
        public enTrata enTrata { get; set; }
        public enDoc enTipDocDerivado { get; set; }
        public enPriori enPriori { get; set; }
        public enEstado enEstado { get; set; }
        public enClasif enClasif { get; set; }
        
        public int? SEMAFORO { get; set; }
        public int? NUM_FOLIOS { get; set; }
        
        public DateTime FEC_INI { get; set; }
        public DateTime FEC_FIN { get; set; }
        public DateTime FEC_PLAZO_FIN { get; set; }

        public int ANIO { get; set; }
        
    }
}
