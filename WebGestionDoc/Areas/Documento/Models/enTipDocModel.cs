using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;

namespace Mincetur.Administracion.AplGestionDoc.WebGestionDoc.Areas.Documento.Models
{
    public class enTipDocModel
    {
        public int? ID_TIP_DOC { get; set; }
        [Display(Name = "Documento")]
        public string DES_DOC { get; set; }
        public string NUM_DOC { get; set; }
    }
}