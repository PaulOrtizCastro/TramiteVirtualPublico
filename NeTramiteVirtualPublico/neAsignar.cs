using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Mincetur.Administracion.AplTramiteVirtualPublico.CoTramiteVirtualPublico;
using Mincetur.Administracion.AplTramiteVirtualPublico.EnTramiteVirtualPublico;
using Mincetur.Administracion.AplTramiteVirtualPublico.DaTramiteVirtualPublico;
using Mincetur.Administracion.Seguridad.EnSeguridad;

namespace Mincetur.Administracion.AplTramiteVirtualPublico.NeTramiteVirtualPublico
{
    public class neAsignar : coHBase
    {
        public List<enPersona> consultarFuncionarios(enPersona enObj)
        {
            List<enPersona> listUsuPivot = new List<enPersona>();
            using (daAsignar objDa = new daAsignar()) {
                listUsuPivot = objDa.consultarFuncionarios(enObj);
            }
            return listUsuPivot;
        }

        public List<enPersona> consultarFuncionariosPorOficina(enPersona enObj)
        {
            List<enPersona> listUsuPivot = new List<enPersona>();
            using (daAsignar objDa = new daAsignar())
            {
                listUsuPivot = objDa.consultarFuncionariosPorOficina(enObj);
            }
            return listUsuPivot;
        }

        public int consultarTotalAsignaciones(enMovi objEnMovi) {
            int total = 0;
            using (daAsignar objDa = new daAsignar())
            {
                total = objDa.consultarTotalAsignaciones(objEnMovi);
            }
            return total;
        }

        public List<enAsignar> consultarListaFuncionariosAsignados(enAsignar enObj) {
            List<enAsignar> listPivot = new List<enAsignar>();
            using (daAsignar objDa = new daAsignar())
            {
                listPivot = objDa.consultarListaFuncionariosAsignados(enObj);
            }
            return listPivot;
        }
        public coResultadoDB mantenimiento(enAsignar objEn) {
            coResultadoDB objCoResultadoDB = new coResultadoDB();
            using (daAsignar objDa = new daAsignar())
            {
                objCoResultadoDB = objDa.mantenimiento(objEn);
            }
            return objCoResultadoDB;
        }
    }
}
