using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Mincetur.SG.OI.Publico.Models
{
    public class tramiteModel
    {

        public DateTime FEC_CREA { set; get; }
        public string DES_TUPA { set; get; }
        public DateTime FEC_CONS { set; get; }
        public string DES_ESTADO { set; get; }
        public int ID_ESTADO { set; get; }
        public string DES_UBICACION { set; get; }
    }
}