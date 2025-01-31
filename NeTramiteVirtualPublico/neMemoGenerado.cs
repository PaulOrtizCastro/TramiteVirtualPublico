using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Mincetur.Administracion.AplTramiteVirtualPublico.EnTramiteVirtualPublico;
using Mincetur.Administracion.AplTramiteVirtualPublico.DaTramiteVirtualPublico;
using Mincetur.Administracion.AplTramiteVirtualPublico.CoTramiteVirtualPublico;
//using Mincetur.Administracion.TramiteDocumentario.CoTramiteDocumentario;

namespace Mincetur.Administracion.AplTramiteVirtualPublico.NeTramiteVirtualPublico
{
    public class neMemoGenerado : coHBase
    {
        public coResultadoDB consultar(enDocElecExpe entidad)
        {
            coResultadoDB objCoResultado = null;
            using (daMemoGenerado objMemoGeneradoDA = new daMemoGenerado())
            {
                objCoResultado = objMemoGeneradoDA.consultar(entidad);
            }
            return objCoResultado;
        }
        public List<enMail> consultarBorradorCorreo(enFormatoPlantilla objEn) {
            List<enMail> lst = new List<enMail>();
            using (daMemoGenerado objDa = new daMemoGenerado())
            {
                lst = objDa.consultarBorradorCorreo(objEn);
            }
            return lst;
        }
    }
}
