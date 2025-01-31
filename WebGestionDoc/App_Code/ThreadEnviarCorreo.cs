using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Mincetur.Administracion.GeneralesUtil.CoGeneralesUtil;
using Mincetur.Administracion.GeneralesUtil.EnGeneralesUtil;
using Mincetur.Administracion.AplTramiteVirtualPublico.EnTramiteVirtualPublico;

namespace Mincetur.Administracion.AplGestionDoc.WebGestionDoc.App_Code
{
    public class ThreadEnviarCorreo
    {
        List<enEstorg> objLstEstrog = new List<enEstorg>();
        List<enPersona> objLstPersona = new List<enPersona>();
        enDocElec objEn = new enDocElec();
        int idPersona = 0;
        int idDoc = 0;


        public ThreadEnviarCorreo(List<enEstorg> objLstEstrog, List<enPersona> objLstPersona, enDocElec objEn, int idDoc)
        {
            this.objLstEstrog = objLstEstrog;
            this.objLstPersona = objLstPersona;
            this.objEn = objEn;
            this.idDoc = idDoc;            
        }

        public void enviarCorreoGestionDocumento()
        {
            EnviarCorreoRepositorio.enviarCorreoGestionDocumento(objLstEstrog, objLstPersona, objEn, idDoc);
        }
    }
}