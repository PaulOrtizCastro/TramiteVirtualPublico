using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Http;
using System.Configuration;
using objEnTramiteVirtual= Mincetur.Administracion.AplTramiteVirtualPublico.EnTramiteVirtualPublico;
using Mincetur.Administracion.TramiteDocumentario.CoTramiteDocumentario;
using Mincetur.Administracion.TramiteDocumentario.EnTramiteDocumentario;
//using Mincetur.Administracion.TramiteDocumentario.NeTramiteDocumentario;
using Mincetur.Administracion.Seguridad.EnSeguridad;
using Mincetur.Administracion.Seguridad.NeSeguridad;

using objNeTramiteVirtual = Mincetur.Administracion.AplTramiteVirtualPublico.NeTramiteVirtualPublico;
using Mincetur.Administracion.AplTramiteVirtualPublico.NeTramiteVirtualPublico;

namespace Mincetur.SG.OI.Publico.ControllersApi
{
    public class ExpeController : ApiController
    {
        //
        // GET: /Expe/

        public enExpe consultar(enExpe objEnExpe)
        {

            //neExpe objNeExpe = new neExpe();
            string url = System.Web.HttpContext.Current.Request.Url.AbsoluteUri;
            string strTipo = System.Web.HttpContext.Current.Request.QueryString[ConfigurationManager.AppSettings["tipoParamtro"]];

            if (objEnExpe.DATO == "CE")
            {
                enAcceso objEnAcceso = new enAcceso();
                objEnAcceso.ID_TIPOACCESO = 3;
                objEnAcceso.ID_SIS = int.Parse(ConfigurationManager.AppSettings["codigoSistema"].ToString());
                objEnAcceso.IP_ACCESO = System.Web.HttpContext.Current.Request.UserHostAddress;
                objEnAcceso.COD_FUENTE = (string.IsNullOrEmpty(strTipo) ? "W" : strTipo);
                objEnAcceso.DES_OBS = "idExp :" + objEnExpe.ID_EXPE + ", Origen: " + url;

                neAcceso objNeAcceso = new neAcceso();
                objNeAcceso.insertarAsp(objEnAcceso, "I");
            }
            List<enExpe> lstExpe = new List<enExpe>();
            enExpe objEnExpePivot = new enExpe();
            using (neExpe objNeExpe = new neExpe()) {
                lstExpe = objNeExpe.traeListaExpe(new enExpe() { ID_EXPE = objEnExpe.ID_EXPE });
            }
            if (lstExpe != null) {
                if (lstExpe.Count > 0) {
                    objEnExpePivot = lstExpe[0];
                }
            }
            return objEnExpePivot;
            //return (coIEntidad)objNeExpe.consultar(objEnExpe.ID_EXPE.ToString());
        }

        public List<enMovi> traeListaUbicacionActual(enMovi objEn)
        {
            List<enMovi> lstMovi = new List<enMovi>();
            objEn.OPR = "1";
            using (objNeTramiteVirtual.neExpe objNe = new objNeTramiteVirtual.neExpe())
            {
                lstMovi = objNe.traeListaUbicacionActual(objEn);
            }
            return lstMovi;
        }

        public List<enAnexos> traeListaAnexos(enAnexos objEnAnexo)
        {
            List<enAnexos> listAnexos = new List<enAnexos>();
            using (objNeTramiteVirtual.neAnexos objNeAnexo = new objNeTramiteVirtual.neAnexos())
            {
                listAnexos = objNeAnexo.traeListaAnexos(objEnAnexo);
            }
            return listAnexos;
        }

        public List<objEnTramiteVirtual.enMovi> traeListaMovi(objEnTramiteVirtual.enMovi objEnMovi)
        {
            List<objEnTramiteVirtual.enMovi> lstMovi = new List<objEnTramiteVirtual.enMovi>();
            using (neMovi objNeMovi = new neMovi())
            {
                lstMovi = objNeMovi.ListarExpeMovi(objEnMovi);
            }
            return lstMovi;
        }

        public List<enExpe> consultarExpTupa(enExpe objEnExpe)
        {
            neExpe objNeExpe = new neExpe();
            List<enExpe> lstEnExpe = new List<enExpe>();
            lstEnExpe = objNeExpe.traeListaExpe(objEnExpe);
            return lstEnExpe;
        }
    }
}