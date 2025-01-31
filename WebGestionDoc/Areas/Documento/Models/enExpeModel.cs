using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;

namespace Mincetur.Administracion.AplGestionDoc.WebGestionDoc.Areas.Documento.Models
{
    public class enExpeModel
    {
        [Display(Name = "Expediente")]
        public int? ID_EXPE { get; set; }
        
        [Display(Name = "Fecha")]
        [DisplayFormat(DataFormatString = "{0:dd/MM/yyyy}", ApplyFormatInEditMode = true)]
        public DateTime FEC_EXPE { get; set; }

        [Display(Name = "Asunto")]
        public string DES_ASUNTO { get; set; }

        [Display(Name = "Seguimiento de expediente")]
        public string DES_URL_EXPE { get; set; }

        [Display(Name = "Gestión de documento digital")]
        public string DES_URL_GESTION { get; set; }
    }
}