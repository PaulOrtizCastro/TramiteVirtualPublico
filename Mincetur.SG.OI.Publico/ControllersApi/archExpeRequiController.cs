using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Http;
using Mincetur.Administracion.TramiteDocumentario.EnTramiteDocumentario;
using Mincetur.Administracion.AplTramiteVirtualPublico.NeTramiteVirtualPublico;
//using Mincetur.Administracion.TramiteDocumentario.NeTramiteDocumentario;

namespace Mincetur.SG.OI.Publico.ControllersApi
{
    public class archExpeRequiController : ApiController
    {
        //
        // GET: /archExpeRequi/

        public List<enArchExpeRequi> listar(enArchExpeRequi oEnArchExpeRequi)
        {
            List<enArchExpeRequi> lstEnArchExpeRequi = new List<enArchExpeRequi>();
            using (neArchExpeRequi objNeArchExpeRequi = new neArchExpeRequi()) {
                lstEnArchExpeRequi = objNeArchExpeRequi.listar(oEnArchExpeRequi).Select(x => new enArchExpeRequi()
                {
                    ID_ARCHIREQUIEXPE = x.ID_ARCHIREQUIEXPE,
                    enTupa = new enTupa() { ID_TUPA = x.enTupa.ID_TUPA },
                    enRequi = new enRequi() { ID_REQUI = x.enRequi.ID_REQUI, DES_REQUI = "(" + x.enRequi.ID_TUPA_REQUI + ") " + x.enRequi.DES_REQUI, ABR_REQUI = x.enRequi.ABR_REQUI, ID_TUPA_REQUI = x.enRequi.ID_TUPA_REQUI },
                    ID_DOC_LF = x.ID_DOC_LF,
                    ID_DOC_CMS = x.ID_DOC_CMS,
                    DES_NOM = x.DES_NOM,
                    DES_NOM_ABR = x.DES_NOM_ABR,
                    NUM_SIZE_ARCHIVO = x.NUM_SIZE_ARCHIVO,
                    ID_EXPE = x.ID_EXPE,
                    DES_OBS = x.DES_OBS,
                    ID_TIPO = x.ID_TIPO,
                    FEC_REG = x.FEC_REG
                }).ToList();
            }
            return lstEnArchExpeRequi;
        }
        public List<enArchExpeRequi> listarArchivosPagoTupa(enArchExpeRequi oEnArchExpeRequi)
        {
            List<enArchExpeRequi> lstEnArchExpeRequi = new List<enArchExpeRequi>();

            if (oEnArchExpeRequi == null) oEnArchExpeRequi = new enArchExpeRequi();
            
            oEnArchExpeRequi.FLG_PAGO = 1;

            using (neArchExpeRequi objNeArchExpeRequi = new neArchExpeRequi()) {
                lstEnArchExpeRequi = objNeArchExpeRequi.listarArchivosPagoTupa(oEnArchExpeRequi).Select(x => new enArchExpeRequi()
                {
                    ID_ARCHIREQUIEXPE = x.ID_ARCHIREQUIEXPE,
                    enTupa = new enTupa() { ID_TUPA = x.enTupa.ID_TUPA },
                    enRequi = new enRequi() { ID_REQUI = x.enRequi.ID_REQUI, DES_REQUI = "(" + x.enRequi.ID_TUPA_REQUI + ") " + x.enRequi.DES_REQUI, ABR_REQUI = x.enRequi.ABR_REQUI, ID_TUPA_REQUI = x.enRequi.ID_TUPA_REQUI },
                    ID_DOC_LF = x.ID_DOC_LF,
                    ID_DOC_CMS = x.ID_DOC_CMS,
                    DES_NOM = x.DES_NOM,
                    DES_NOM_ABR = x.DES_NOM_ABR,
                    NUM_SIZE_ARCHIVO = x.NUM_SIZE_ARCHIVO,
                    ID_EXPE = x.ID_EXPE,
                    DES_OBS = x.DES_OBS,
                    ID_TIPO = x.ID_TIPO,
                    FEC_REG = x.FEC_REG
                }).ToList();
            }
            return lstEnArchExpeRequi;
        }

    }
}
