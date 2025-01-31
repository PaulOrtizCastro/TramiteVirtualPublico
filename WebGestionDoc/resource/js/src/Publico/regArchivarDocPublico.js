var strCallBackTramiteGestionDocumento = $("#archivarExpe_callback").val();
$(document).ready(function () {
    $("#archivarExpe_btnCancelar").click(function () {
        var objResultCallBack = new Object();
        objResultCallBack.IdTipo = 2;
        objResultCallBack.Valor1 = 1;
        window[strCallBackTramiteGestionDocumento](objResultCallBack);
        $("#frmArchivarExpediente").closest("div[role='dialog']").modal("hide");
//        if (typeof strFlgEmbed != 'undefined' && strFlgEmbed == "1") {
//            var objResultCallBack = new Object();
//            objResultCallBack.IdTipo = 2;
//            objResultCallBack.Valor1 = 1;
//            parent.postMessage(objResultCallBack, "*");
//        }
    });

    $("#archivarExpe_btnGuardar").cargaPopOverConfirm({
        mensaje: "¿Desea Archivar el expediente?",
        strIdDiv: "body",
        posicion: "top"
    });

})

function archivarExpe_grabar() {
    var objEnMovi = new Object();
    var objEnAccion = new Object();
    var objEnComent = new Object();

    objEnMovi.ID_EXPE = $("#archivarExpe_grabaridExpe").val();
    objEnMovi.ID_MOVI = $("#archivarExpe_grabaridMovi").val();
    objEnAccion.ID_ACCION = $("#archivarExpe_grabaridAccion").val();
    objEnMovi.DES_COMENT = $("#archivarExpe_taComentarios").val();
    objEnMovi.enAccion = objEnAccion;
    objEnMovi.ID_USU = $("#archivarExpe_grabaridPersona").val();
    objEnMovi.OPR = "U";

    if (objEnMovi.DES_COMENT == "" || objEnMovi.DES_COMENT == "undefined" || !noEsVacio(objEnMovi.DES_COMENT)) {
        bootbox.alert({
            message: "Debe de ingresar una observación"
        });
    } else {
        actualizarDatosWebApi({
            parametros: objEnMovi,
            nombreObjeto: "objEnMovi",
            url: "Archivar/mantenimiento",
            callBack: function (objError) {
                if (objError.ID_TIPO == 0) {

                    bootbox.alert({
                        message: "<i class='fa fa-check-circle'></i>&nbsp; Expediente <b>archivado</b>"
                    });

                    if (typeof strFlgEmbed != 'undefined' && strFlgEmbed == "1") {
                        var objResultCallBack = new Object();
                        objResultCallBack.IdTipo = 0;
                        objResultCallBack.DesError = objError.DES_ERROR;
                        objResultCallBack.Valor1 = 0;
                        objResultCallBack.Valor2 = 1;

                        parent.postMessage(objResultCallBack, "*");
                    } else {
                        $("#frmArchivarExpediente").closest("div[role='dialog']").modal("hide");
                    }
                    location.reload();
                } else {
                    bootbox.alert({
                        message: "<i class='fa fa-warning'></i>&nbsp;" + objError.DES_ERROR
                    });
                }
            }
        });
    }
}