using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

//using Mincetur.Administracion.TramiteDocumentario.CoTramiteDocumentario;
//using Mincetur.Administracion.TramiteDocumentario.EnTramiteDocumentario;
//using Mincetur.Administracion.TramiteDocumentario.NeTramiteDocumentario;
using System.Web.Http;
using Mincetur.Administracion.AplTramiteVirtualPublico.NeTramiteVirtualPublico;
using Mincetur.Administracion.AplTramiteVirtualPublico.EnTramiteVirtualPublico;

namespace Mincetur.SG.OI.Publico.ControllersApi
{
    public class AsignacionController : ApiController
    {
        //
        // GET: /Asignacion/

        public List<enAsignar> traeListaAsigna(enAsignar objEn)
        {
            List<enAsignar> lst = new List<enAsignar>();
            objEn.OPR = "1";
            using (neAsignar objNe = new neAsignar())
            {
                lst = objNe.consultarListaFuncionariosAsignados(objEn);
            }
            return lst;
        }

    }
}
