using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using Mincetur.Administracion.AplTramiteVirtualPublico.CoTramiteVirtualPublico;
using Mincetur.Administracion.AplTramiteVirtualPublico.EnTramiteVirtualPublico;
using Mincetur.Administracion.AplTramiteVirtualPublico.DaTramiteVirtualPublico;

namespace Mincetur.Administracion.AplTramiteVirtualPublico.NeTramiteVirtualPublico
{
    public class neTupaConcepto : coHBase
    {
        public List<enTupaConcepto> ListarRequi(enTupaConcepto objEn)
        {
            List<enTupaConcepto> lst = new List<enTupaConcepto>();
            using (daTupaConcep objDa = new daTupaConcep())
            {
                lst = objDa.ListarRequi(objEn);
            }
            return lst;
        }

        public List<enTupaLeyenda> listTupaLeyendaPublico(enTupaLeyenda objEn)
        {
            List<enTupaLeyenda> lst = new List<enTupaLeyenda>();
            using (daTupaConcep objDa = new daTupaConcep())
            {
                lst = objDa.listTupaLeyendaPublico(objEn);
            }
            return lst;
        }

        public List<enRecurso> listResolucionRecurso(enRecurso objEn)
        {
            List<enRecurso> lst = new List<enRecurso>();
            using (daTupaConcep objDa = new daTupaConcep())
            {
                lst = objDa.listResolucionRecurso(objEn);
            }
            return lst;
        }

        public List<enTupaConcepto> ListarTupaConcepto(enTupaConcepto objEn)
        {
            List<enTupaConcepto> lst = new List<enTupaConcepto>();
            using (daTupaConcep objDa = new daTupaConcep())
            {
                lst = objDa.ListarTupaConcepto(objEn);
            }
            return lst;
        }
    }


}
