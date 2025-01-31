using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Mincetur.Administracion.AplTramiteVirtualPublico.EnTramiteVirtualPublico;
using Mincetur.Administracion.AplTramiteVirtualPublico.DaTramiteVirtualPublico;
using Mincetur.Administracion.AplTramiteVirtualPublico.CoTramiteVirtualPublico;

namespace Mincetur.Administracion.AplTramiteVirtualPublico.NeTramiteVirtualPublico
{
    public class neTrazabilidad : coHBase
    {
        public enFormatoCorreo consultarCorreoRemite(enFormatoPlantilla objEnFormatoPlantilla)
        {
            if (objEnFormatoPlantilla == null) objEnFormatoPlantilla = new enFormatoPlantilla();
            daTrazabilidad objDa = new daTrazabilidad();
            return objDa.consultarCorreoRemite(objEnFormatoPlantilla);          
        }
        public List<enTrazabilidad> traeTrazabilidadBorrador(enTrazabilidad objEnTrazabilidad) {
            using (daTrazabilidad objDaTrazabilidad = new daTrazabilidad()) 
            {
                return objDaTrazabilidad.traeTrazabilidadBorrador(objEnTrazabilidad);
            }
        }
    }
}
