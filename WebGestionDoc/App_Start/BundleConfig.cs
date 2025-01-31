using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Optimization;

namespace Mincetur.Administracion.AplGestionDoc.WebGestionDoc.App_Start
{
    public class BundleConfig
    {
        public static void RegisterBundles(BundleCollection bundles)
        {
            List<string> arrCss = new List<string>();
            //Bootstrap Core CSS
            arrCss.Add("~/resource/css/bootstrap/bootstrap.custom.css");
            //MetisMenu CSS
            arrCss.Add("~/resource/css/metisMenu/metisMenu.css");
            //Custom CSS
            arrCss.Add("~/resource/css/sb-admin-2.min.css");
            //Custom Fonts
            //arrCss.Add("~/resource/css/font-awesome/font-awesome.custom.css");
            arrCss.Add("~/resource/css/font-awesome/all.css");
            arrCss.Add("~/resource/css/jqgrid/ui.jqgrid-bootstrap.css");
            //Custom CSS
            arrCss.Add("~/resource/css/custom.css");
            //Summernote CSS
            arrCss.Add("~/resource/css/pnotify/pnotify.custom.min.css");
            //Select2 CSS
            arrCss.Add("~/resource/css/select2/select2.min.css");
            //DateTimePicker CSS
            arrCss.Add("~/resource/css/datetimepicker/bootstrap-datetimepicker.min.css");
            
            List<string> arrScripts = new List<string>();
            //jQuery
            arrScripts.Add("~/resource/js/jquery/jquery-2.1.0.min.js");
            arrScripts.Add("~/resource/js/jquery/jquery-ui-1.8.24.min.js");
            arrScripts.Add("~/resource/js/jquery/jquery-migrate-1.0.0.js");



            arrScripts.Add("~/resource/js/bootstrap/bootstrap.min.js");
            //Bootstrap Typeahead JavaScript
            //arrScripts.Add("~/resource/js/bootstrap/bootstrap3-typeahead.min.js");
            arrScripts.Add("~/resource/js/bootstrap/bootstrap-typeahead-4.0.2.js");
            //Metis Menu Plugin JavaScript
            arrScripts.Add("~/resource/js/metisMenu/metisMenu.min.js");
            //Custom Theme JavaScript
            arrScripts.Add("~/resource/js/sb-admin-2.js");
            arrScripts.Add("~/resource/js/jqgrid/i18n/grid.locale-es.js");
            arrScripts.Add("~/resource/js/jqgrid/jquery.jqGrid.js");
            arrScripts.Add("~/resource/js/jqgrid/JSLINQ.js");
            //Custom Javascript
            arrScripts.Add("~/resource/js/bootbox/bootbox.min.js");
           
            arrScripts.Add("~/resource/js/lib/validaciones.js");
            arrScripts.Add("~/resource/js/lib/utilitarios.custom.js");
            arrScripts.Add("~/resource/js/lib/application.js");

            //Summernote Javascript
            arrScripts.Add("~/resource/js/summernote/summernote.js");
            //BlockUI Javascript
            arrScripts.Add("~/resource/js/blockui/jquery.blockUI.js");
            //Bootstrap FileStyle Javascript
            arrScripts.Add("~/resource/js/bootstrap/bootstrap-filestyle.min.js");
            //Bootstrap Confirmation Javascript
            arrScripts.Add("~/resource/js/bootstrap/bootstrap-confirmation.min.js");
            arrScripts.Add("~/resource/js/pnotify/pnotify.custom.min.js");
            //Bootstrap Popover
            arrScripts.Add("~/resource/js/popover/popper.js");
            arrScripts.Add("~/resource/js/popover/tooltip.js");
            //Select2
            arrScripts.Add("~/resource/js/select2/select2.min.js");
            //DateTimePicker Javascript
            arrScripts.Add("~/resource/js/datetimepicker/moment-with-locales.js");
            arrScripts.Add("~/resource/js/datetimepicker/bootstrap-datetimepicker.min.js");

            BundleTable.Bundles.Add(new StyleBundle("~/dist/styles.bundle").Include(arrCss.ToArray<string>()));

            ScriptBundle scriptBundleJs = new ScriptBundle("~/dist/scripts.bundle");
            scriptBundleJs.Include(arrScripts.ToArray<string>());
            BundleTable.Bundles.Add(scriptBundleJs);

            //Use para desarrollo del aplicativo
            bundles.Add(new ScriptBundle("~/dist/src/app.main.chunk").Include(
                       "~/resource/js/src/app.main.js"
                     ));

            bundles.Add(new ScriptBundle("~/dist/jquery-ui.chunk").Include(
                       "~/resource/js/jquery/jquery-ui.min.js"
                     ));

            bundles.Add(new ScriptBundle("~/dist/src/jqueryval.chunk").Include(
                       "~/resource/js/jqueryval/jquery.validate.min.js",
                       "~/resource/js/jqueryval/jquery.validate.unobtrusive.min.js"
                     ));

            bundles.Add(new ScriptBundle("~/dist/src/app.Consulta.consDocPublico.chunk").Include(
                       "~/resource/js/src/Publico/consDocPublico.js"
                     ));

            bundles.Add(new ScriptBundle("~/dist/src/app.Registro.regDerivarDocPublico.chunk").Include(
                       "~/resource/js/src/Publico/regDerivarDocPublico.js"
                     ));
            bundles.Add(new ScriptBundle("~/dist/src/app.Registro.regAsignarDocPublico.chunk").Include(
                       "~/resource/js/src/Publico/regAsignarDocPublico.js"
                     ));
            bundles.Add(new ScriptBundle("~/dist/src/app.Registro.regArchivarDocPublico.chunk").Include(
                      "~/resource/js/src/Publico/regArchivarDocPublico.js"
                    ));

            BundleTable.EnableOptimizations = true;
        }
    }
}