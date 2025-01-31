using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Mincetur.Administracion.AplTramiteVirtualPublico.EnTramiteVirtualPublico;
using Mincetur.Administracion.AplTramiteVirtualPublico.NeTramiteVirtualPublico;

namespace Mincetur.Administracion.AplGestionDoc.WebGestionDoc.App_Code
{
    public class Validaciones
    {
        public bool verificaEstadoExpe(int idExpe, int idMovi, int idAccion)
        {
            bool indicador = false;
            enMovi objEnMoviPivot = new enMovi();
            int idEstado = 0;

            using (neMovi objNe = new neMovi())
            {
                objEnMoviPivot = objNe.consultarExpediente(new enMovi()
                {
                    ID_EXPE = idExpe,
                    ID_MOVI = idMovi
                });

                if (objEnMoviPivot.enEstado == null)
                {
                    objEnMoviPivot.enEstado = new enEstado() { ID_ESTADO = 9, DES_ESTADO = "Anulado" };
                }

                idEstado = objEnMoviPivot.enEstado.ID_ESTADO;
            }
            if (idEstado != 1 && idEstado != 3 && idEstado != 9)
            {
                indicador = true;
            }
            return indicador;
        }
    }
}