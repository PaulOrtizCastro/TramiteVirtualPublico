using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Mincetur.Administracion.AplTramiteVirtualPublico.CoTramiteVirtualPublico;
using Mincetur.Administracion.TramiteDocumentario.EnTramiteDocumentario;
using Mincetur.Administracion.AplTramiteVirtualPublico.DaTramiteVirtualPublico;

namespace Mincetur.Administracion.AplTramiteVirtualPublico.NeTramiteVirtualPublico
{
    public class neArchExpeRequi : coHBase
    {
        public List<enArchExpeRequi> listar(enArchExpeRequi enObj)
        {
            List<enArchExpeRequi> list = new List<enArchExpeRequi>();
            using (daArchExpeRequi objDa = new daArchExpeRequi())
            {
                list = objDa.listar(enObj);
            }
            return list;
        }
        
        public List<enArchExpeRequi> listarArchivosPagoTupa(enArchExpeRequi enObj)
        {
            List<enArchExpeRequi> list = new List<enArchExpeRequi>();
            using (daArchExpeRequi objDa = new daArchExpeRequi())
            {
                list = objDa.listarArchivosPagoTupa(enObj);
            }
            return list;
        }
    }
}
