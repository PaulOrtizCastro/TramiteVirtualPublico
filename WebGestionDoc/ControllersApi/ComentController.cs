using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Http;
using Mincetur.Administracion.AplTramiteVirtualPublico.CoTramiteVirtualPublico;
using Mincetur.Administracion.AplTramiteVirtualPublico.EnTramiteVirtualPublico;
using Mincetur.Administracion.AplTramiteVirtualPublico.NeTramiteVirtualPublico;

namespace Mincetur.Administracion.AplGestionDoc.WebGestionDoc.ControllersApi
{
    public class ComentController : Controller
    {
        //
        // GET: /Coment/
        #region Mantenimiento
        public coResultadoDB mantenimiento(enComent objEn)
        {
            coResultadoDB objCoResultadoDB = new coResultadoDB();
            using (neComent objDa = new neComent())
            {
                objCoResultadoDB = objDa.mantenimiento(objEn);
            }
            return objCoResultadoDB;
        }
        #endregion
    }
}
