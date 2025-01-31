using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Mincetur.Administracion.AplTramiteVirtualPublico.EnTramiteVirtualPublico;
using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;

namespace Mincetur.Administracion.AplGestionDoc.WebGestionDoc.Models
{
    public class AccionRolModel : enBase
    {
        public int ID_ROL { get; set; }
        public int ID_ACCION { get; set; }
        public string COD_TIPO { get; set; }
    }
}