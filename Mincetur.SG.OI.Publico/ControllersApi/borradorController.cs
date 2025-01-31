using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Http;
using Mincetur.Administracion.AplTramiteVirtualPublico.EnTramiteVirtualPublico;
using Mincetur.Administracion.AplTramiteVirtualPublico.NeTramiteVirtualPublico;
using Mincetur.Administracion.AplTramiteVirtualPublico.CoTramiteVirtualPublico;

namespace Mincetur.SG.OI.Publico.ControllersApi
{
    public class borradorController : ApiController
    {
        //
        // GET: /borrador/
        public coResultadoDB traeCorrelativoBorrador(enBorrador objEnBorrador)
        {
            if (objEnBorrador.OPR == "" || objEnBorrador.OPR == null)
            {
                objEnBorrador.OPR = "1";
            }
            using (neBorrador objNeBorrador = new neBorrador())
            {
                return objNeBorrador.traeCorrelativoBorrador(objEnBorrador);
            }
        }

        public List<enTrazabilidad> traeTrazabilidadBorrador(enBorrador objEnBorrador) {
            List<enTrazabilidad> lstEnTrazabilidad = new List<enTrazabilidad>();
            if (objEnBorrador.OPR == "" || objEnBorrador.OPR == null)
            {
                objEnBorrador.OPR = "1";
            }
            if (objEnBorrador != null) {
                coResultadoDB objCoResultadDb = new coResultadoDB() { ID_TIPO = 2, DES_ERROR = "No es documento digital" };
                if (objEnBorrador.ID_DOC != 0 & objEnBorrador.ID_DOC != -1)
                {
                    objCoResultadDb = new neBorrador().traeCorrelativoBorrador(new enBorrador() { ID_DOC = objEnBorrador.ID_DOC, OPR = "1" });
                    
                    if (objCoResultadDb.ID_TIPO == 0)
                    {
                        objEnBorrador.ID_BORRADOR = int.Parse(objCoResultadDb.VALOR);
                        objEnBorrador.ID_VERSION = int.Parse(objCoResultadDb.VALOR1);
                    }
                }

                if (objEnBorrador.ID_BORRADOR != 0 & objEnBorrador.ID_BORRADOR != -1)
                    lstEnTrazabilidad = new neTrazabilidad().traeTrazabilidadBorrador(new enTrazabilidad() { ID_BORRADOR = objEnBorrador.ID_BORRADOR, OPR = objEnBorrador.OPR });
            }
            return lstEnTrazabilidad;
        }

    }
}
