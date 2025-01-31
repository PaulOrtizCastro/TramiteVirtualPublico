using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Http;
using Mincetur.Administracion.AplTramiteVirtualPublico.CoTramiteVirtualPublico;
using Mincetur.Administracion.AplTramiteVirtualPublico.EnTramiteVirtualPublico;
using Mincetur.Administracion.AplTramiteVirtualPublico.NeTramiteVirtualPublico;
using System.Configuration;
using Mincetur.Administracion.AplGestionDoc.WebGestionDoc.App_Code;
using Mincetur.Administracion.AplTramiteVirtualPublico.Utilitarios;

namespace Mincetur.Administracion.AplGestionDoc.WebGestionDoc.ControllersApi
{
    public class ArchivarController : ApiController
    {
        //
        // GET: /Archivar/
        #region Mantenimiento
        public coResultadoDB mantenimiento(enMovi objEnMovi)
        {
            coResultadoDB objCoResultadoDB = new coResultadoDB();

            objEnMovi.ID_ARCHIVO = int.Parse(ConfigurationManager.AppSettings["strCodArchivadorCentral"].ToString());
            objEnMovi.ID_SIS = int.Parse(ConfigurationManager.AppSettings["IdSis"].ToString());
            objEnMovi.ID_USU = objEnMovi.ID_USU;
            objEnMovi.IP = Util.obtenerIP();

            if (objEnMovi.OPR == "")
            {
                objEnMovi.OPR = "U";
            }
            enAccion objEnAccion = new enAccion();
            objEnAccion.ID_ACCION = 3;
            objEnMovi.enAccion = objEnAccion;

            bool indicador = new Validaciones().verificaEstadoExpe(objEnMovi.ID_EXPE, objEnMovi.ID_MOVI, (objEnMovi.enAccion == null ? 3 : (int)objEnMovi.enAccion.ID_ACCION));
            if (indicador)
            {
                using (neMovi objNe = new neMovi())
                {
                    objCoResultadoDB = objNe.mantenimiento(objEnMovi);

                    if (objCoResultadoDB.ID_TIPO == 0)
                    {
                        using (neComent objNeComent = new neComent())
                        {
                            enComent objEnComent = new enComent();

                            objEnComent.ID_EXPE = objEnMovi.ID_EXPE;
                            objEnComent.ID_MOVI = objEnMovi.ID_MOVI;
                            objEnComent.ID_SIS = int.Parse(ConfigurationManager.AppSettings["IdSis"].ToString());
                            objEnComent.ID_USU = objEnMovi.ID_USU;
                            objEnComent.DES_COMENT = "Se archivó en Archivo Central";
                            objEnComent.OPR = "I";
                            objCoResultadoDB = objNeComent.mantenimiento(objEnComent);
                        }
                    }
                }
            }
            else
            {
                objCoResultadoDB.ID_TIPO = 1;
                objCoResultadoDB.DES_ERROR = "El estado del expediente ha cambiado. No se pudo archivar.";
            }


            return objCoResultadoDB;
        }
        #endregion
    }
}
