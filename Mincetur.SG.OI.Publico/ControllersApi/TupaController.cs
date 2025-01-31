using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Http;
using System.Configuration;


using Mincetur.Administracion.TramiteDocumentario.CoTramiteDocumentario;
using enTupaTramite = Mincetur.Administracion.TramiteDocumentario.EnTramiteDocumentario;
//using neTupaTramite = Mincetur.Administracion.TramiteDocumentario.NeTramiteDocumentario;

using Mincetur.Administracion.Seguridad.EnSeguridad;
using Mincetur.Administracion.Seguridad.NeSeguridad;


using Mincetur.Administracion.GeneralesUtil.EnGeneralesUtil;

using Mincetur.Administracion.AplTramiteVirtualPublico.NeTramiteVirtualPublico;
using Mincetur.Administracion.AplTramiteVirtualPublico.EnTramiteVirtualPublico;

using Mincetur.Administracion.AplTramiteVirtualPublico.Utilitarios;
using wsEstorg = Mincetur.Administracion.AplTramiteVirtualPublico.Utilitarios.soap.ServicioGeneralUtil.Estorg;

namespace Mincetur.SG.OI.Publico.ControllersApi
{
    public class TupaController : ApiController
    {
        //
        // GET: /Tupa/

        public List<enTupaTramite.enTupa> traeListaTupa(enTupaTramite.enTupa objEnTupa)
        {
            
            //List<enTupaTramite.enTupa> lstTupa = new List<enTupaTramite.enTupa>();
            //neTupaTramite.NeTupa objNeTupa = new neTupaTramite.NeTupa();
            //lstTupa = objNeTupa.traeListaTupa(objEnTupa);
            using (neTupa objNeTupa = new neTupa())
            {
                return objNeTupa.traeListaTupa(objEnTupa);
            }
            //return lstTupa;
        }
        public List<enTupaConcepto> ListarTupaConcep(enTupaConcepto objEnTupaConcep)
        {
            List<enTupaConcepto> list = new List<enTupaConcepto>();
            if (objEnTupaConcep == null) objEnTupaConcep = new enTupaConcepto();
            objEnTupaConcep.OPR = "1";
            objEnTupaConcep.ID_TUPA = -1;
            objEnTupaConcep.ID_TUPA_CONCEPTO = -1;

            using (neTupaConcepto objNeTupa = new neTupaConcepto())
            {
                list = objNeTupa.ListarTupaConcepto(objEnTupaConcep);
            }
            return list;
        }
        public List<enTupaConcepto> ListarRequi(enTupaConcepto objEnTupa)
        {
            List<enTupaConcepto> traeListaRequi = new List<enTupaConcepto>();
            objEnTupa.OPR = "1";
            using (neTupaConcepto objNeTupa = new neTupaConcepto())
            {
                traeListaRequi = objNeTupa.ListarRequi(objEnTupa);
            }
            return traeListaRequi;

        }
        public List<enTupaLeyenda> listTupaLeyendaPublico(enTupaLeyenda objEn)
        {
            List<enTupaLeyenda> list = new List<enTupaLeyenda>();
            using (neTupaConcepto objNeTupa = new neTupaConcepto())
            {
                objEn.OPR = "1";
                list = objNeTupa.listTupaLeyendaPublico(objEn);
            }
            return list;
        }
        public List<enRecurso> listResolucionRecurso(enRecurso objEn)
        {
            List<enRecurso> list = new List<enRecurso>();
            using (neTupaConcepto objNeTupa = new neTupaConcepto())
            {
                objEn.OPR = "1";
                list = objNeTupa.listResolucionRecurso(objEn);
            }
            
            return list;
        }

        #region Carga autocomplete
        public wsEstorg.enEstorg[] listarOficinas(wsEstorg.enEstorg objEnEstorg)
        {
            //if (objEnEstorg == null) objEnEstorg = new enEstorg();

            //objEnEstorg.ID_SUB = -1;
            //objEnEstorg.NUM_NIVEL = -1;
            //objEnEstorg.FLG_EST = -1;

            //List<enEstorg> lstEstorg = new List<enEstorg>();
            //using (Mincetur.Administracion.TramiteDocumentario.NeTramiteDocumentario.neDesplazamiento objNeDesplazamiento = new Mincetur.Administracion.TramiteDocumentario.NeTramiteDocumentario.neDesplazamiento())
            //{
            //    lstEstorg = objNeDesplazamiento.listarOficinas(objEnEstorg);
            //}

            //return lstEstorg;
            wsEstorg.enEstorg[] objList = null;
            objList = Util.listOficinas(new wsEstorg.enEstorg()
            {
                OPR = "5"
            });
            return objList;
        }
        #endregion

    }
}
