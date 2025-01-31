using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Mincetur.Administracion.AplTramiteVirtualPublico.EnTramiteVirtualPublico;
using Mincetur.Administracion.AplTramiteVirtualPublico.DaTramiteVirtualPublico;
using Mincetur.Administracion.AplTramiteVirtualPublico.CoTramiteVirtualPublico;
using Mincetur.Administracion.TramiteDocumentario.EnTramiteDocumentario;

namespace Mincetur.Administracion.AplTramiteVirtualPublico.NeTramiteVirtualPublico
{
    public class neArchAdjuntoMemo : coHBase
    {
        public List<enAdjuntarArchivo> ListarArchivoAdjunto(enAdjuntarArchivo oAdjuntarArchivoEO)
        {
            List<enAdjuntarArchivo> listAdjuntarArchivoEO = new List<enAdjuntarArchivo>();
            daArchAdjuntoMemo objArchAdjuntoMemoDA = new daArchAdjuntoMemo();
            listAdjuntarArchivoEO = objArchAdjuntoMemoDA.ListarArchivoAdjunto(oAdjuntarArchivoEO);
            return listAdjuntarArchivoEO;
        }

        public string TraeDocElec(enDocElecExpe oDocElecExpeEO)
        {
            String strDocElect = null;
            daArchAdjuntoMemo objArchAdjuntoMemoDA = new daArchAdjuntoMemo();
            strDocElect = objArchAdjuntoMemoDA.TraeDocElec(oDocElecExpeEO);
            return strDocElect;
        }
    }
}
