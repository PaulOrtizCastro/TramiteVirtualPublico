using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
//using Mincetur.Administracion.TramiteDocumentario.EnTramiteDocumentario;
using Mincetur.Administracion.GeneralesUtil.EnGeneralesUtil;

namespace Mincetur.Administracion.AplTramiteVirtualPublico.EnTramiteVirtualPublico
{
    public class enTupaConcepto : enBase
    {
        public long ID_EXPE { set; get; }
        public long ID_TUPA { set; get; }
        public long ID_TUPA_CONCEPTO { set; get; }
        public int ID_TUPA_REQUI { set; get; }
        public int ID_PASO { set; get; }
        public int NUM_DIAS { set; get; }
        public int ID_VERSION { set; get; }
        public string DES_NOM { set; get; }
        public string DES_TUPA_CONCEP { set; get; }
        public string COD_TUPA { set; get; }
        public decimal COSTO_TUPA { set; get; }
        public string DES_BASE_LEGAL { set; get; }
        public string COD_CONCEPTO_TUPA { set; get; }
        public decimal NUM_UIT { set; get; }
        public int ID_SILENCIO { set; get; }
        public string DES_SILENCIO { set; get; }
        public int FLG_TIPO_DIA { set; get; }
        public DateTime FEC_INI_VIG { set; get; }
        public DateTime FEC_FIN_VIG { set; get; }
        public string IDPNGCODIGO { set; get; }
        public string IDBANCOCODIGO { set; get; }
        public string IDCTANUMCTA { set; get; }
        public string SIGLA_TUPA_CONCEP { set; get; }
        public int FLG_ING_WEB { set; get; }
        public int FLG_EST_CONCEP { set; get; }
        public int FLG_ESTADO_CONCEP { set; get; }
        public string SCRIPT { set; get; }
        public enRequi enRequi { set; get; }
        public object[] arrRequi { set; get; }
        public enEstorg enEstorg { set; get; }
        public enPasos enPasos { set; get; }
        public enExpe enExpe { set; get; }
        public enAccion enAccion { set; get; }
        public enTipDoc enTipDoc { set; get; }
        public int FLG_OBLIG { set; get; }
        public string DES_MSGSIS_TUPA { set; get; }
        public string URL_SIS { set; get; }
       
    }
}
