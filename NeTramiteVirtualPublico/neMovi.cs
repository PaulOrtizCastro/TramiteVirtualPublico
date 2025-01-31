using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Mincetur.Administracion.AplTramiteVirtualPublico.EnTramiteVirtualPublico;
using Mincetur.Administracion.AplTramiteVirtualPublico.DaTramiteVirtualPublico;
using Mincetur.Administracion.AplTramiteVirtualPublico.CoTramiteVirtualPublico;

namespace Mincetur.Administracion.AplTramiteVirtualPublico.NeTramiteVirtualPublico
{
    public class neMovi : coHBase
    {
        public enMovi consultarExpediente(enMovi enObj) {
            enMovi objEnMoviPivot = new enMovi();
            using (daMovi objDa = new daMovi())
            {
                objEnMoviPivot = objDa.consultarExpediente(enObj);
            }

            return objEnMoviPivot;

        }

        public List<enMovi> ListarExpeMovi(enMovi enObj)
        {
            List<enMovi> list = new List<enMovi>();
            using (daMovi objDa = new daMovi())
            {
                list = objDa.ListarExpeMovi(enObj);
            }

            return list;
        }
        public coResultadoDB mantenimiento(enMovi objEn) {
            coResultadoDB objCoResultadoDB = new coResultadoDB();
            using (daMovi objDa = new daMovi())
            {
                objCoResultadoDB = objDa.mantenimiento(objEn);
            }
            return objCoResultadoDB;
        }

        //public enDocElec consultarBorradorElectronico(enDocElec enObj)
        //{
        //    enDocElec objEnPivot = new enDocElec();
        //    using (daMovi objDa = new daMovi())
        //    {
        //        objEnPivot = objDa.consultarBorradorElectronico(enObj);
        //    }

        //    return objEnPivot;
        //}

    }
}
