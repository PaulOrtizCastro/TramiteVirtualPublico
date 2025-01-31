var rowsToColor = [];
$(document).ready(function () {
    consBanGesDoc_cargarListAccionRol();
    $("#consBanGesDoc_Derivar").click(function () {
        consBanGesDoc_cargarModalDerivar();
        return false;
    });

    $("#consBanGesDoc_Asignar").click(function () {
        consBanGesDoc_cargarModalAsignar();
        return false;
    });

    $("#consBanGesDoc_Archivar").click(function () {
        consBanGesDoc_cargarModalArchivar();
        return false;
    });

    $("#consBanGesDoc_verDocumento").click(function () {
        consBanGesDoc_verDocumentoVisor();
        return false;
    });

    $("#consBanGesDoc_Gestion").click(function (e) {
        consBanGesDoc_cargarGestion();
        return false;
    });
    consBanGesDoc_Asignaciones();
    cons_BanGesDoc_validarBotonesGestion();
    consBanGesDoc_Adjuntos();
})
function consBanGesDoc_cargarListAccionRol() {
    var idAccion = "";
    var boolrpt = false;
    cargarDatosWebApi({
        parametros: new Object(),
        nombreObjeto: "enObj",
        callBack: function (lstData) {
            //console.log("lstData: ", lstData);
            if (noEsVacio(lstData)) {
                $("#divAcciones a").each(function (i, value) {
                    idAccion = $(this).data("idaccion");
                    $.each(lstData, function (index, objEnAccionRol) {
                        //console.log("idAccion: ", idAccion, "objEnAccionRol.ID_ACCION: ", objEnAccionRol.ID_ACCION);
                        //console.log(idAccion == objEnAccionRol.ID_ACCION );

                        //if (idAccion == objEnAccionRol.ID_ACCION && $.inArray(objEnAccionRol.ID_ROL, arrayRolesMaster) > -1) {
                        if (idAccion == objEnAccionRol.ID_ACCION) {
                            console.log("entro");
                            boolrpt = true;
                            return false;
                        }
                    })
                    console.log(value);
                    console.log(boolrpt);
                })
            }
            //$("#consBanGesDoc_Derivar").data("idderivar")
        },
        url: "Gestion/listAccionRol",
        strRuta: strRutaAplicacionMaster
    });
}

function consBanGesDoc_cargarGestion() {
    var objResultCallBack = new Object();
    objResultCallBack.IdTipo = 1;
    objResultCallBack.Valor1 = 0; //valor 1 cierra modal, 0 nada
    objResultCallBack.strCallback = strCallback; 
    
    objResultCallBack.IdExpe = $("#consBanGesDoc_idExpe").val();
    objResultCallBack.IdMovi = $("#consBanGesDoc_idMovi").val();
    parent.postMessage(objResultCallBack, "*");
}

function consBanGesDoc_Asignaciones() {
    var objEnExpe = new Object();
    var objEnMovi = new Object();
    var enObj = new Object();
    objEnExpe.ID_EXPE = $("#consBanGesDoc_idExpe").val();
    objEnMovi.ID_MOVI = $("#consBanGesDoc_idMovi").val();

    enObj.enExpe = objEnExpe;
    enObj.enMovi = objEnMovi;

    cargarDatosWebApi({
        parametros: enObj,
        nombreObjeto: "enObj",
        callBack: function (lstData) {
            if (lstData.length > 0) {
                $("#consBanGesDoc_divAsignacionesPivot").show();
                consBanGesDoc_cargarGrillaDocAsignado("consBanGesDoc_divAsignaciones", lstData);
            } else {
                $("#consBanGesDoc_divAsignacionesPivot").hide();
            }

        },
        url: "Asignar/consultarListaFuncionariosAsignados",
        strRuta: strRutaAplicacionMaster
    });
    
}
function cons_BanGesDoc_validarBotonesGestion() {
    if (noEsVacio($("#consBanGesDoc_idEstado").val()) && $("#consBanGesDoc_idEstado").val() == "3") {
        $("#consBanGesDoc_Derivar").hide();
        $("#consBanGesDoc_Asignar").hide();
    }    
}
function consBanGesDoc_verDocumentoVisor() {
    var objEn = new Object();
    objEn.IdDocCms = $("#consBanGesDoc_IdDocCms").val();
    objEn.CodCms = $("#consBanGesDoc_CodCms").val();
    objEn.idDoc = $("#consBanGesDoc_idDoc").val();
    //console.log(objEn);
    var dialog = bootbox.dialog({
        title: "<i class='fa fa-file'></i>&nbsp;<b>Documento digital</b>",
        message: function () { },
        size: "large",
        className: "formularioModal"
    });
    dialog.init(function () {
        var strVisorDocumentoDigital = "";
        strVisorDocumentoDigital = "<div class='embed-container'>"
                + "<iframe src='" + $("#consBanGesDoc_visorDigital").val() + "' frameborder='0' style='border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;'></iframe>"
                + "</div>";
        dialog.find(".modal-header").css("background-color", "#bee3d5");
        
        dialog.find(".bootbox-body").html(strVisorDocumentoDigital);
        dialog.find(".modal-dialog").draggable({
            handle: ".modal-header"
        }).css("width", "1200px");
    });
}

function consBanGesDoc_cargarModalDerivar() {
    var objParams = {
        idExpe: $("#consBanGesDoc_idExpe").val(),
        idMovi: $("#consBanGesDoc_idMovi").val(),
        idDoc: $("#consBanGesDoc_idDoc").val(),
        idTipDoc: $("#consBanGesDoc_idTipDoc").val(),
        idSub: $("#consBanGesDoc_idSubRemite").val(),
        idSubOfi: $("#consBanGesDoc_idSubOfiRemite").val(),
        //idPersona: $("#consBanGesDoc_idPersona").val()
        idPersona: parseInt($("#consBanGesDoc_lblidPersona").text()),
        idAccion: 1, //DERIVAR
        strCallBack : "fnCallbackConsDocPublicoDerivar"
    }
    consBanGesDoc_validaEstadoExpediente(objParams);
}
function fnCallbackConsDocPublicoDerivar(objResultCallBack) {
    //console.log("objResultCallBack: ", objResultCallBack);
    if (objResultCallBack.IdTipo == 0) {
        if (noEsVacio(strFlgEmbed) && strFlgEmbed == "1") {
            parent.postMessage(objResultCallBack, "*");
        } 
    }
}
function consBanGesDoc_cargarModalAsignar() {
    var objParams = {
        idExpe: $("#consBanGesDoc_idExpe").val(),
        idMovi: $("#consBanGesDoc_idMovi").val(),
        idDoc: $("#consBanGesDoc_idDoc").val(),
        idTipDoc: $("#consBanGesDoc_idTipDoc").val(),
        idSub: $("#consBanGesDoc_idSubRemite").val(),
        idSubOfi: $("#consBanGesDoc_idSubOfiRemite").val(),
        //idPersona: $("#consBanGesDoc_idPersona").val()
        idPersona: parseInt($("#consBanGesDoc_lblidPersona").text()),
        idAccion: 4, //ASIGNAR
        strCallBack: "fnCallbackConsDocPublicoDerivar"
    }
    //    var dialog = bootbox.dialog({
    //        title: "<i class='fa fa-edit'></i>&nbsp;<b>Asignar Expediente </b>",
    //        message: function () { },
    //        size: "large",
    //        className: "formularioModal"
    //    });
    //    dialog.init(function () {
    //        dialog.find(".bootbox-body").load(strRutaAplicacionMaster + "Documento/Gestion/asignarExpediente?" + $.param(objParams))
    //    });
    consBanGesDoc_validaEstadoExpediente(objParams);
}
function consBanGesDoc_validaEstadoExpediente(objData) {
    cargarDatosWebApi({
        parametros: {
            ID_EXPE: objData.idExpe,
            ID_MOVI: objData.idMovi
        },
        callBack: function (data) {
            if (data.ID_TIPO == "1") {
                bootbox.alert({
                    message: data.DES_ERROR,
                    callback: function () {
                        location.reload();
                    }
                })
            } else {
                switch (objData.idAccion) {
                    case 1:
                        var dialog = bootbox.dialog({
                            title: "<i class='fa fa-list'></i>&nbsp;<b>Derivar Expediente </b>",
                            message: function () { },
                            size: "large",
                            className: "formularioModal"
                        });
                        dialog.init(function () {
                            dialog.find(".bootbox-body").load(strRutaAplicacionMaster + "Documento/Gestion/derivarExpediente?" + $.param(objData))
                        });
                        break;
                    case 3:
                        var dialog = bootbox.dialog({
                            title: "<i class='fa fa-briefcase'></i>&nbsp;<b>Archivar Expediente </b>",
                            message: function () { },
                            size: "large",
                            className: "formularioModal"
                        });
                        dialog.init(function () {
                            dialog.find(".bootbox-body").load(strRutaAplicacionMaster + "Documento/Gestion/archivarExpediente?" + $.param(objData))
                        });
                        break;
                    case 4:
                        var dialog = bootbox.dialog({
                            title: "<i class='fa fa-users'></i>&nbsp;<b>Asignar Expediente </b>",
                            message: function () { },
                            size: "large",
                            className: "formularioModal"
                        });
                        dialog.init(function () {
                            dialog.find(".bootbox-body").load(strRutaAplicacionMaster + "Documento/Gestion/asignarExpediente?" + $.param(objData))
                        });
                        break;
                    default:
                        break;

                }
            }
        },
        nombreObjeto: "objEn",
        url: "Gestion/verificarEstadoExpe",
        strRuta: strRutaAplicacionMaster
    });
    return false;
}

function consBanGesDoc_cargarModalArchivar() {
    var objParams = {
        idExpe: $("#consBanGesDoc_idExpe").val(),
        idMovi: $("#consBanGesDoc_idMovi").val(),
        idDoc: $("#consBanGesDoc_idDoc").val(),
        idTipDoc: $("#consBanGesDoc_idTipDoc").val(),
        idSub: $("#consBanGesDoc_idSubRemite").val(),
        idSubOfi: $("#consBanGesDoc_idSubOfiRemite").val(),
        idPersona: $("#consBanGesDoc_idPersona").val(),
        idAccion: 3, //ARCHIVAR
        strCallBack: "fnCallbackConsDocPublicoDerivar"
    }
    consBanGesDoc_validaEstadoExpediente(objParams);
}
function consBanGesDoc_Adjuntos() {
    cargarDatosWebApi({
        parametros: {
            ID_DOC: $("#consBanGesDoc_idDoc").val()
        },
        nombreObjeto: "objEnDocLf",
        callBack: function (lstData) {
            $("#consBanGesDoc_idTipoDoc").text("--");
            $("#consBanGesDoc_lbltituloDocumento").text("--");
            if (lstData.length > 0) {
                $("#consBanGesDoc_divAdjuntosPivot").show();
                consBanGesDoc_cargarGrillaDocAdjunto("consBanGesDoc_divAdjuntos", lstData);
            } /*else {
                $("#consBanGesDoc_divAdjuntosPivot").hide();
            }*/
        },
        url: "Gestion/listarDocumento",
        strRuta: strRutaAplicacionMaster
    });
}
function consBanGesDoc_cargarGrillaDocAsignado(strIdDiv, myData) {
    var objDiv = $("#" + strIdDiv).empty();
    var objTbl = objDiv.find("table");

    if (objTbl.length) {
        objTbl.jqGrid("clearGridData").setGridParam({
            data: myData,
            page: 1
        }).trigger("reloadGrid");
    } else {
        var objTbl = $("<table id='consBanGesDoc_tableAsignados'>").addClass("table table-bordered table-hover table-striped");
        objTbl.appendTo(objDiv);

        objTbl.jqGrid({
            data: myData,
            styleUI: "Bootstrap",
            datatype: "local",
            colModel: [
                { name: 'enPersona.NOMFUNC', label: 'Personal', align: 'center', width: 200, hidden: false },
                { name: 'FEC_CREA', label: 'F. Asignación', align: 'center', width: 120, hidden: false },
                { name: 'FEC_PLAZO', label: 'F. Plazo', align: 'center', width: 100, hidden: false },
                { name: 'DES_PLAZO', label: 'Vencimiento', align: 'center', width: 120, hidden: false },
                { name: 'enTrata.DES_TRATAMIENTO', label: 'Tratamiento', align: 'center', width: 150, hidden: false },
                { name: 'DES_OBS_DOC_DERIVADO', label: 'Observaciones', align: 'center', width: 200, hidden: false, formatter: rowObservaciones },
                { name: 'enTipDocAsignado.DES_TIP_DOC', label: 'Respuesta', align: 'center', width: 200, hidden: false, formatter: docRespuesta },
                { name: 'enEstado.DES_ESTADO', label: 'Estado', align: 'center', width: 90, hidden: false },
                { name: 'ID_ESTADO', index: 'ID_ESTADO', width: 90, align: 'center', formatter: rowcolor, hidden: true },
            ],
            rownumbers: true,
            viewrecords: true,
            height: "100%",
            rowNum: 15,
            pager: "",
            caption: (noEsVacio(strBandeja) ? "Asignaciones" : ""),
            beforeRequest: function () {
                jqGridResponsive($("#consBanGesDoc_divAsignaciones.jqGridDocs"));
            },
            gridComplete: function () {
                for (var i = 0; i < rowsToColor.length; i++) {
                    $("#" + rowsToColor[i]).find("td").css("background-color", "#f8f6af");
                }
            }
        });
    }
};
function docRespuesta(cellValue, options, rowObject) {
    var strHtml = "(Sin documento)";
//    console.log("Doc respuesta");
//    console.log(rowObject.enDocRespuesta.ID_DOC);
//    console.log("Tipo Doc respuesta");
//    console.log(rowObject.enTipDoc.DES_TIP_DOC);

    if (noEsVacio(rowObject.enTipDocAsignado.DES_TIP_DOC)) {
        strHtml = strNomDocumento = "<a href='#' onclick=\"cargarVisorgDocRespuesta(" + rowObject.enExpe.ID_EXPE + "," + rowObject.enMovi.ID_MOVI + ","  + rowObject.enDocRespuesta.ID_DOC + "); return false;\">" + rowObject.enTipDocAsignado.DES_TIP_DOC + "</a>"
    }
    return strHtml;
}
function cargarVisorgDocRespuesta(idExpe,idMovi,idDoc) {
    var parametros = { idDoc: idDoc };
    
    var dialog = bootbox.dialog({
        title: "<i class='fa fa-book'></i>&nbsp;<b>Visor de documento </b>",
        message: function () { },
        size: "large",
        className: "formularioModal"
    });
    dialog.init(function () {
        dialog.find(".bootbox-body").load(strRutaAplicacionMaster + "Documento/Archivos/obtenerIdDocCms?" + $.param(parametros))
    });
}
function rowObservaciones(cellValue, options, rowObject) {
    var strHtml = "(Sin observaciones)";
    if (noEsVacio(rowObject.DES_OBS_DOC_DERIVADO)) {
        strHtml = rowObject.DES_OBS_DOC_DERIVADO;
    }
    return strHtml;
}

function rowcolor(cellValue, options, rowObject) {
    var objEnEstado = rowObject.enEstado;
    if (objEnEstado.ID_ESTADO == 10)
        rowsToColor[rowsToColor.length] = options.rowId;
    return cellValue;
}

function consBanGesDoc_cargarGrillaDocAdjunto(strIdDiv, myData) {
    //console.log(myData);
    var array = [];
    $.each(myData, function (index, item) {
        if (item.FLG_PRINC == "1") {
            //console.log(item.ID_DOC_CMS);
            $("#consBanGesDoc_lbltituloDocumento").text(item.DES_DOC)
            $("#consBanGesDoc_idTipoDoc").text(item.DES_DOC);
            $("#consBanGesDoc_CodCms").val(item.COD_CMS);
            $("#consBanGesDoc_IdDocCms").val(item.ID_DOC_CMS);
        } else {
            array.push(item);
        }
    });
    
    if (array.length == 0) {
        $("#consBanGesDoc_divAdjuntosPivot").hide()
    }

    var objDiv = $("#" + strIdDiv).empty();
    var objTbl = objDiv.find("table");

    if (objTbl.length) {
        objTbl.jqGrid("clearGridData").setGridParam({
            data: myData,
            page: 1
        }).trigger("reloadGrid");
    } else {
        var objTbl = $("<table id='consBanGesDoc_tableAdjuntos'>").addClass("table table-bordered table-hover table-striped");
        objTbl.appendTo(objDiv);

        objTbl.jqGrid({
            data: array,
            styleUI: "Bootstrap",
            datatype: "local",
            colModel: [

                { name: 'DES_NOM_ABR', label: 'Documento', align: 'center', width: 450, hidden: false },
                { name: 'NUM_SIZE_ARCHIVO', label: 'Tamaño', align: 'center', width: 100, hidden: false, formatter: actionFormatterTamanioArchivo },
                { name: '', label: '', align: 'center', width: 55, hidden: false, formatter: actionFormatterDescargar }
                
            ],
            rownumbers: true,
            viewrecords: true,
            height: "100%",
            rowNum: 15,
            pager: "",
            beforeRequest: function () {
                jqGridResponsive($("#consBanGesDoc_divAdjuntos.jqGridDocs"));
            },
            loadComplete: function () {
            }
        });
    }
}
function actionFormatterTamanioArchivo(cellvalue, options, rowObject) {
    var intNumSizeArchivo = parseInt(rowObject.NUM_SIZE_ARCHIVO);
    var strHtmlTamanio = "";
    strHtmlTamanio = "<span>" + (intNumSizeArchivo / 1024).toFixed(2) + " KB</span>";
    return strHtmlTamanio;
};
function actionFormatterDescargar(cellvalue, options, rowObject) {
    var htmlInputDescargar = "";
    htmlInputDescargar = "<a href='#' onclick='consBanGesDoc_DescargarAdjunto(" + JSON.stringify(rowObject) + ")'><i class='fa fa-download'></i></a>";
    return htmlInputDescargar;
};
function consBanGesDoc_DescargarAdjunto(rowObject) {
    /*var objParams = {
        CodCms: rowObject.COD_CMS
    }*/
    var objParams = {
        IdDocCms: rowObject.ID_DOC_CMS
    }
    var url = strRutaAplicacionMaster + 'Archivos/descargarArchivo?' + $.param(objParams);
    window.open(url, "_blank");
};

/*function consBanGesDoc_cargarTituloDocumento(objData) {
    console.log(objData);
    $("#consBanGesDoc_lbltituloDocumento").text("");
    $("#consBanGesDoc_lbltituloDocumento").text(objData[0].DES_DOC);
    $("#consBanGesDoc_CodCms").val("");
    $("#consBanGesDoc_CodCms").val(objData[0].COD_CMS);
}*/