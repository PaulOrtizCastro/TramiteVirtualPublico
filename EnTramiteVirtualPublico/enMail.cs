using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Mincetur.Administracion.AplTramiteVirtualPublico.EnTramiteVirtualPublico
{
    public class enMail : enBase
    {
        public int ID_FORM { get; set; }
        public string NOMBRE_ENVIA { get; set; }
        public string MAIL_ENVIA { get; set; }
        public string OFICINA_ENVIA { get; set; }
        public string MAIL_DESTINO { get; set; }
        public string ASUNTO { get; set; }
        public string MENSAJE { get; set; }
        

    }
}
