using System.Web;
using System.Web.Optimization;

namespace Mincetur.SG.OI.Publico.App_Start
{
    public class BundleConfig
    {
        // Para obtener más información acerca de Bundling, consulte http://go.microsoft.com/fwlink/?LinkId=254725
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new StyleBundle("~/assets/themes").Include(
                         "~/Resource/css/aplicacion.css",
                         "~/Resource/css/Site.css"
                         ));
            bundles.Add(new StyleBundle("~/assets/themesBootStrap").Include(
                          "~/Resource/css/main/main.css",
                          "~/Resource/css/bootstrap/bootstrap-dialog-1.34.5.min.css",
                          "~/Resource/css/general.css",
                          "~/Resource/css/custom.css",
                          "~/Resource/css/main/main-responsive.css",
                          "~/Resource/css/bootstrap/bootstrap-3.3.4.custom.min.css",
                          "~/Resource/css/jqGrid-5.2.1/ui.jqgrid-bootstrap.css",
                          "~/Resource/css/bootstrap/ui.jqgrid-bootstrap.css",
                          "~/Resource/css/bootstrap/Typeahead/typeahead.css"
                         ));
            bundles.Add(new StyleBundle("~/assets/themesJquery").Include(
                          "~/Resource/css/jquery-ui-1.12.1.custom/jquery-ui.css",
                         "~/Resource/css/jquery-ui-1.12.1.custom/jquery-ui.min.css",
                          "~/Resource/css/jquery-ui-1.12.1.custom/jquery-ui.theme.css",
                          "~/Resource/css/jquery-ui-1.12.1.custom/jquery-ui.theme.min.css"
                        ));
            bundles.Add(new ScriptBundle("~/bundles/JqGrid").Include(
               "~/Resource/jqGrid/js/i18n/grid.locale-es.js",
               "~/resource/jqGrid/js/jquery.jqGrid.js"
               ));
            bundles.Add(new ScriptBundle("~/bundles/DefaultJquery").Include(
               "~/Resource/jquery/jquery-1.11.3.min.js",
               "~/Resource/jquery/jquery-ui-1.8.24.min.js",
               "~/Resource/jquery/jquery-migrate-1.0.0.js",
                "~/Resource/jquery/ui.datepicker-es.js",
                "~/Resource/jquery/jquery.form.js",
                "~/Resource/jquery/JSLINQ.js",
                "~/Resource/tramite/utilitarios.js",
                "~/Resource/tramite/json2.js",
                "~/Resource/tramite/validaciones.js",
               "~/Resource/tramite/application.js",
               "~/Resource/tramite/grid.js",
               "~/Resource/js/basicos.js"
               ));
            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                          "~/Resource/js/lib/popper-1.12.5.min.js",
                          "~/Resource/js/lib/bootstrap-3.3.5.min.js",
                          "~/Resource/js/lib/bootstrap-dialog-1.34.5.min.js",
                          "~/Resource/js/lib/bootstrap-typeahead-4.0.2.js"
                         ));
            bundles.Add(new ScriptBundle("~/bundles/Reporte/VentanillaPublica").Include(
                       "~/Resource/js/reporte/RptVentanillaPublica.js"));

            bundles.Add(new ScriptBundle("~/bundles/Reporte/consExpeGrilla").Include(
                      "~/Resource/js/reporte/consExpeGrilla.js"));

            bundles.Add(new ScriptBundle("~/bundles/Reporte/ConsultaExpedientes").Include(
                      "~/Resource/js/reporte/RptConsultaExpedientes.js"));

            bundles.Add(new ScriptBundle("~/bundles/Reporte/ConsultaPorExpedientes").Include(
                      "~/Resource/js/reporte/RptConsultaPorExpedientes.js"));

            bundles.Add(new ScriptBundle("~/bundles/Reporte/ConsultaRegDocumento").Include(
                      "~/Resource/js/reporte/ConsultaRegDocumento.js"));

            bundles.Add(new ScriptBundle("~/bundles/Reporte/ConsultaTupa").Include(
                     "~/Resource/js/reporte/ConsultaTupa.js"));

            bundles.Add(new ScriptBundle("~/bundles/Reporte/ConsultaTupaRequi").Include(
                    "~/Resource/js/reporte/ConsultaTupaRequi.js"));


            //Para el captcha
            bundles.Add(new StyleBundle("~/assets/themes").Include(
                        "~/Resource/css/aplicacion.css"
                         ));
            bundles.Add(new StyleBundle("~/assets/BootStrap").Include(
                         "~/Resource/css/bootstrap/bootstrap-dialog-1.34.5.min.css",
                         "~/Resource/css/general.css",
                         "~/Resource/css/custom.css",
                         "~/Resource/css/bootstrap/bootstrap-3.3.4.custom.min.css"
                        ));
            bundles.Add(new ScriptBundle("~/bundles/Jquery").Include(
               "~/Resource/jquery/jquery-1.11.3.min.js",
               "~/Resource/jquery/jquery-ui-1.8.24.min.js",
               "~/Resource/tramite/utilitarios.js",
               "~/Resource/tramite/validaciones.js",
               "~/Resource/js/lib/bootstrap-3.3.5.min.js",
               "~/Resource/js/lib/bootstrap-dialog-1.34.5.min.js"
              ));

            bundles.Add(new ScriptBundle("~/bundles/Reporte/system.conf").Include(
                      "~/Resource/js/system.conf.js"));


            BundleTable.EnableOptimizations = true;
        }
    }
}