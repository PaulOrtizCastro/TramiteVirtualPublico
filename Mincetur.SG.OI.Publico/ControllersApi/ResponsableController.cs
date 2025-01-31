using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Http;
using Mincetur.Administracion.AplTramiteVirtualPublico.EnTramiteVirtualPublico;

using Mincetur.Administracion.AplTramiteVirtualPublico.CoTramiteVirtualPublico;
using Mincetur.Administracion.AplTramiteVirtualPublico.NeTramiteVirtualPublico;

namespace Mincetur.SG.OI.Publico.ControllersApi
{
    public class ResponsableController : ApiController
    {
        //
        // GET: /Responsable/

        public string TraeResponsable(enDocElecExpe objEn)
        {
            string rpt = "";

            using (neResponsable objNe = new neResponsable())
            {
                rpt = objNe.TraeResponsable(objEn);
            }
            return rpt;
        }

    }
}
