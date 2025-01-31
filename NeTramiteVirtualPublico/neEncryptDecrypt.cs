using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Mincetur.Administracion.AplTramiteVirtualPublico.CoTramiteVirtualPublico;
using Mincetur.Administracion.AplTramiteVirtualPublico.DaTramiteVirtualPublico;

namespace Mincetur.Administracion.AplTramiteVirtualPublico.NeTramiteVirtualPublico
{
    public class neEncryptDecrypt : coHBase
    {
        public string decrypt(string cod) {
            string valor = "";
            using (daEncryptDecrypt objDa = new daEncryptDecrypt())
            {
                valor = objDa.decrypt(cod);
            }
            return valor;
        }
    }
}
