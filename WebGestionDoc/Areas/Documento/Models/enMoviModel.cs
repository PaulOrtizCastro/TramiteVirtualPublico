using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Mincetur.Administracion.AplTramiteVirtualPublico.EnTramiteVirtualPublico;
using Mincetur.Administracion.GeneralesUtil.EnGeneralesUtil;
using System.ComponentModel.DataAnnotations;

namespace Mincetur.Administracion.AplGestionDoc.WebGestionDoc.Areas.Documento.Models
{
    public class enMoviModel : enExpeModel
    {
        public int? ID_MOVI { get; set; }
        public DateTime FEC_MOVI { get; set; }
        public int? FLG_ORIGINAL { get; set; }
        public int? FLG_ANEXO { get; set; }
        public int? FLG_CORRESP { get; set; }
        public int? ID_ARCHIVO { get; set; }
        public string DES_COMENT { get; set; }
        public string DES_COMENT_INI { get; set; }
        public string DES_ASIGNA { get; set; }
        public string Inserts { get; set; }
        public string Updates { get; set; }
        public int? ID_MOVI_ANT { get; set; }
        public string RUC { get; set; }
        public string ID_RESPONSABLE { get; set; }
        public string DES_ARCHIVO { get; set; }
        public string OPR_BANDEJA { get; set; }
        
        
        public enEstorg enEstorg { get; set; }        
        public enEstorg enEstorgRemite { get; set; }
       
        public enEstado enEstado { get; set; }
        public enOrigen enOrigen { get; set; }
        public enTipDocModel enTipDoc { get; set; }
        public enDoc enDoc { get; set; }
        public enTupa enTupa { get; set; }
        public enTupaConcepto enTupaConcepto { get; set; }
        public enPersona enPersona { get; set; }

        public string DES_SUB_TODO { get; set; }
        [Display(Name = "Observaciones")]
        public string DES_OBS { get; set; }
        [Display(Name = "UrlVisor")]
        public string UrlVisor { get; set; }

        [Display(Name = "DesRoles")]
        public string DES_ROLES { get; set; }
        
    }
}