using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
//using neVentanilla = Mincetur.SG.OI.LogicaNegocio;
//using enVentanilla = Mincetur.SG.OI.Entidades;
using Newtonsoft.Json;
using Mincetur.Administracion.AplTramiteVirtualPublico.NeTramiteVirtualPublico;
using Mincetur.Administracion.AplTramiteVirtualPublico.EnTramiteVirtualPublico;


namespace Mincetur.SG.OI.Publico.Areas.Publico.Controllers
{
    public class TupaController : Controller
    {
        //
        // GET: /Publico/Tupa/

        public ActionResult Index()
        {
            return View();
        }

        public ActionResult tupaConsPublico()
        {
            return View();
        }
        //public ActionResult visorRequisitos(string objEnTupaConcep)
        public ActionResult visorRequisitos(string ID_TUPA, string ID_TUPA_CONCEPTO, string COD_TUPA)
        //public ActionResult visorRequisitos(enVentanilla.enTupaConcep objEnTupaConcep)
        {
            enTupaConcepto entidad = new enTupaConcepto();
            //entidad = JsonConvert.DeserializeObject<enVentanilla.enTupaConcep>(objEnTupaConcep);
            entidad.ID_TUPA = int.Parse(ID_TUPA);
            entidad.ID_TUPA_CONCEPTO = int.Parse(ID_TUPA_CONCEPTO);
            entidad.COD_TUPA = COD_TUPA;
            List<enTupaConcepto> lstEnTupaConcep = new List<enTupaConcepto>();

            lstEnTupaConcep = ListarTupaConcep(entidad);

            if (lstEnTupaConcep.Count > 0)
            {
                ViewBag.ID_TUPA = lstEnTupaConcep[0].ID_TUPA;
                ViewBag.ID_TUPA_CONCEPTO = lstEnTupaConcep[0].ID_TUPA_CONCEPTO;
                ViewBag.DES_TUPA_CONCEPTO = lstEnTupaConcep[0].DES_TUPA_CONCEP == null ? "No se encontraron conceptos relacionados" : lstEnTupaConcep[0].DES_TUPA_CONCEP;
                ViewBag.DES_UNI_RESOLVER = lstEnTupaConcep[0].enEstorg.DES_SUBOFI == null ? "--" : lstEnTupaConcep[0].enEstorg.DES_SUBOFI;
                ViewBag.NUM_DIAS = lstEnTupaConcep[0].NUM_DIAS == -1 ? 0 : lstEnTupaConcep[0].NUM_DIAS;
                ViewBag.NUM_UIT = lstEnTupaConcep[0].NUM_UIT == -1 ? 0 : lstEnTupaConcep[0].NUM_UIT;
                ViewBag.DES_SILENCIO = lstEnTupaConcep[0].DES_SILENCIO == null ? "--" : lstEnTupaConcep[0].DES_SILENCIO;
                ViewBag.DES_BASE_LEGAL = lstEnTupaConcep[0].DES_BASE_LEGAL == null ? "--" : lstEnTupaConcep[0].DES_BASE_LEGAL;
                ViewBag.COD_TUPA = lstEnTupaConcep[0].COD_TUPA == null ? "--" : lstEnTupaConcep[0].COD_TUPA;
            }
            return View(ViewBag);
        }

        public List<enTupaConcepto> ListarTupaConcep(enTupaConcepto objEnTupaConcep)
        {
            if (objEnTupaConcep == null) objEnTupaConcep = new enTupaConcepto();
            objEnTupaConcep.OPR = "1";
            objEnTupaConcep.ID_TUPA = objEnTupaConcep.ID_TUPA;
            objEnTupaConcep.ID_TUPA_CONCEPTO = -objEnTupaConcep.ID_TUPA_CONCEPTO;


            List<enTupaConcepto> traeListaTupaConcep = new List<enTupaConcepto>();
            using (neTupaConcepto objNeTupa = new neTupaConcepto())
            {
                traeListaTupaConcep = objNeTupa.ListarTupaConcepto(objEnTupaConcep);
            }
            return traeListaTupaConcep;
        }

    }
}
