using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Http;
//using Mincetur.Administracion.TramiteDocumentario.CoTramiteDocumentario;
//using Mincetur.Administracion.TramiteDocumentario.EnTramiteDocumentario;
//using Mincetur.Administracion.TramiteDocumentario.NeTramiteDocumentario;
using Mincetur.Administracion.AplTramiteVirtualPublico.EnTramiteVirtualPublico;
using Mincetur.Administracion.AplTramiteVirtualPublico.NeTramiteVirtualPublico;
using Mincetur.Administracion.AplTramiteVirtualPublico.CoTramiteVirtualPublico;

namespace Mincetur.SG.OI.Publico.ControllersApi
{
    public class DocElecExpeController : ApiController
    {
        public coResultadoDB TraeDocElec(enDocElecExpe oDocElecExpeEO)
        {
            if (oDocElecExpeEO == null) oDocElecExpeEO = new enDocElecExpe();
            if (string.IsNullOrEmpty(oDocElecExpeEO.OPR)) oDocElecExpeEO.OPR = "1";
            coResultadoDB objCoResultado = new coResultadoDB() { ID_TIPO = 1 };
            neArchAdjuntoMemo objArchAdjuntoMemoLN = new neArchAdjuntoMemo();
            objCoResultado.VALOR = objArchAdjuntoMemoLN.TraeDocElec(oDocElecExpeEO);
            if (string.IsNullOrEmpty(objCoResultado.VALOR))
            {
                objCoResultado.ID_TIPO = 1;
                objCoResultado.DES_ERROR = "El documento no es formato electrónico";
            }
            else
            {
                objCoResultado.ID_TIPO = 0;
                objCoResultado.DES_ERROR = "El documento es formato electrónico";
                if (objCoResultado.VALOR.IndexOf("|") != -1)
                {
                    objCoResultado.ID_TIPO = 0;
                    objCoResultado.VALOR1 = objCoResultado.VALOR.Split('|')[0];
                    objCoResultado.VALOR2 = objCoResultado.VALOR.Split('|')[1];
                }
            }
            return objCoResultado;
        }

        public List<enAdjuntarArchivo> ListarArchivoAdjunto(enAdjuntarArchivo oAdjuntarArchivoEO)
        {
            List<enAdjuntarArchivo> listAdjuntarArchivoEO = new List<enAdjuntarArchivo>();
            neArchAdjuntoMemo objArchAdjuntoMemoLN = new neArchAdjuntoMemo();
            listAdjuntarArchivoEO = objArchAdjuntoMemoLN.ListarArchivoAdjunto(oAdjuntarArchivoEO);
            return listAdjuntarArchivoEO;
        }


    }
}