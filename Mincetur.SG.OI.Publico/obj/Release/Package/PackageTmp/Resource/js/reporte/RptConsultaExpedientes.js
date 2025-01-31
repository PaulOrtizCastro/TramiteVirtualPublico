var arrRolesMaster = [];
var arrMovi_consExpediente = [];
var arrRolesMasterWebConfigVentanilla = [];
var lstDataConsExpeVentanilla = new Object();
var lstDataConsAsignaciones_consExpedientes = new Object();
var strOficinaPivot = [];
var tempBool_jefe = new Boolean();
tempBool_jefe = false;

var tempBool_Asignacion = new Boolean();
tempBool_Asignacion = false;
var rowsToColor = [];

$(document).ready(function () {
    //console.log("expe");
    strOficinaPivot = strSubPivot.split("|");
    //cargarAsignaciones_rptConsultaExpedientes();
    //role del usuario de consulta en tramite
    if (noEsVacio(strCodRol)) {
        if (strCodRol.indexOf(",")) {
            arrRolesMaster = strCodRol.split(",");
        } else {
            arrRolesMaster.push(strCodRol);
        }
    }
    cargarDatosMovimientosRegExpeSimple();
});


function cargarDatosMovimientosRegExpeSimple() {
    if (strExpediente.length > 0) {
        var objEnMovi = new Object();
        objEnMovi.ID_EXPE = strExpediente;
        objEnMovi.OPR = '3';

        cargarDatosWebApi({
            parametros: objEnMovi,
            nombreObjeto: "objEnMovi",
            url: "Expe/traeListaMovi",
            callBack: function (lstData) {
                lstDataConsExpeVentanilla = lstData;

                var strOpr = fnValidarControlesRolesRptConsultaExpediente();
                if (strOpr == "3" || strOpr == "4") {
                    cargarAsignaciones_rptConsultaExpedientes({
                        callBack: function (lstDataAsignaciones) {
                            cargarGrillaRegExpe(lstDataConsExpeVentanilla, strOpr);
                        }
                    });
                } else {
                    cargarGrillaRegExpe(lstDataConsExpeVentanilla, strOpr);
                }
            }
        });
    };
};

function cargarAsignaciones_rptConsultaExpedientes(objParametros) {
    var defaults = {
        callBack: function () { }
    };
    defaults = $.extend(defaults, objParametros);
//    var objEn = new Object();
//    var objEnUsuario = new Object();
//    var objEnEstorg = new Object();
//    var objEnMovi = new Object();
//    var objEnEstado = new Object();

//    objEn.ID_EXPE = strExpediente;
//    objEnUsuario.CodUsu = strIdPersona;
//    objEn.enUsu = objEnUsuario;

//    objEnEstorg.ID_SUB = strOficinaPivot[0];
//    objEnEstorg.ID_SUBOFI = strOficinaPivot[1];
//    objEn.enEstorg = objEnEstorg;

    
    var param = {
        enExpe: { ID_EXPE: strExpediente },
        enUsu:  { CodUsu: strIdPersona },
        enEstorg: { ID_SUB: strOficinaPivot[0], ID_SUBOFI: strOficinaPivot[1] }
    };
    //console.log(param);
    cargarDatosWebApi({
        parametros: param,
        nombreObjeto: "objEn",
        callBack: function (lstData) {
            //console.log(lstData);
            lstDataConsAsignaciones_consExpedientes = lstData;
            defaults.callBack();
        },
        url: "Asignacion/traeListaAsigna"
    });
};

function cargarGrillaRegExpe(myData, strOpr) {
    //console.log(mydata);
    ////console.log(strOpr);
    //$("#tbGrilla_consExpeVirtual").jqGrid('clearGridData');
    //$("#tbGrilla_consExpeVirtual").jqGrid('setGridParam', { data: mydata });
    ////$("#tbGrilla_consExpeVirtual").trigger('reloadGrid');

    //$("#tbGrilla_consExpeVirtual").jqGrid({
    //    data: mydata,
    //    styleUI: 'Bootstrap',
    //    datatype: "local",
    //    colModel: [
    //        { name: '', align: "center",  sortable: false, formatter: formatterImg },
    //        { name: 'ID_MOVI', align: "center",  sortable: false },
    //        { name: 'enEstorgRemite.ABR_SUBOFI', align: "center", sortable: false },
    //        { name: 'DES_SUB_TODO', align: "center",  sortable: false, formatter: formatterSub },
    //        { name: 'FEC_MOVI', align: "center",  sortable: false },
    //        { name: 'enTrata.DES_TRATA', align: "center",  sortable: false, formatter: formatterDesTrata },
    //        { name: 'enTipDoc.DES_DOC', align: "center",  sortable: false,
    //            formatter: function (cellvalue, options, rowObject) {
    //                return formatterDesDoc(cellvalue, options, rowObject, strOpr);
    //            }
    //        },
    //        { name: 'enEstado.DES_ESTADO', align: "center", sortable: false }
    //        ],
    //    rownumbers: true,
    //    viewrecords: true,
    //    shrinkToFit: true,
    //    autowidth: true,
    //    caption: "",
    //    autowidth: false
    //});

    ////jqGridResponsive($("#divConsuHistoricoVentanilla").closest("div"));
    //jqGridResponsive($("#divGrilla_consExpeVirtual div"));

    //$("#tbGrilla_consExpeVirtual").jqGrid('setLabel', 'ID_MOVI', 'Seq.', { 'text-align': 'center' }, { 'title': 'Seq.' });
    //$("#tbGrilla_consExpeVirtual").jqGrid('setLabel', 'enEstorgRemite.ABR_SUBOFI', 'De', { 'text-align': 'center' }, { 'title': 'De' });
    //$("#tbGrilla_consExpeVirtual").jqGrid('setLabel', 'DES_SUB_TODO', 'Para', { 'text-align': 'center' }, { 'title': 'Para' });
    //$("#tbGrilla_consExpeVirtual").jqGrid('setLabel', 'FEC_MOVI', 'Fecha de Envío', { 'text-align': 'center' }, { 'title': 'Fecha de Envío' });
    //$("#tbGrilla_consExpeVirtual").jqGrid('setLabel', 'enTrata.DES_TRATA', 'Tratamiento', { 'text-align': 'center' }, { 'title': 'Tratamiento' });
    //$("#tbGrilla_consExpeVirtual").jqGrid('setLabel', 'enTipDoc.DES_DOC', 'Documento', { 'text-align': 'center' }, { 'title': 'Documento' });
    //$("#tbGrilla_consExpeVirtual").jqGrid('setLabel', 'enEstado.DES_ESTADO', 'Estado', { 'text-align': 'center' }, { 'title': 'Estado' });

    //$("#tbGrilla_consExpeVirtual").parents('div.ui-jqgrid-bdiv').css("height", "300px");
    var objDiv = $("#divGrilla_consExpeVirtual").empty();
    var objTbl = objDiv.find("table");

    if (objTbl.length) {
        objTbl.jqGrid("clearGridData").setGridParam({
            data: myData,
            page: 1
        }).trigger("reloadGrid");
    } else {
        var objTbl = $("<table id='tbGrilla_consExpeVirtual'>").addClass("table table-bordered table-hover table-striped");
        var objDivPager = $("<div id='divPagerConsExpeVirtual'>");
        objTbl.appendTo(objDiv);
        objDivPager.appendTo(objDiv);
        objTbl.jqGrid({
            data: myData,
            styleUI: "Bootstrap",
            datatype: "local",
            colModel: [
                { name: '', label: '', align: 'center', width: 50, hidden: false, formatter: formatterImg },
                {
                    label: '<center>Seq.</center>', align: 'center', width: 70, hidden: false, formatter: function (cellvalue, options, rowObject) {
                        var strHml = "";
                        strHml = validaNulosJSON(rowObject, "ID_MOVI");
                        return strHml;
                    }
                },
                {
                    label: '<center>De</center>', align: 'center', width: 70, hidden: false, formatter: function (cellvalue, options, rowObject) {
                        var strHml = "";
                        strHml = validaNulosJSON(rowObject.enEstorgRemite, "ABR_SUBOFI");
                        return strHml;
                    }
                },
                {
                    label: '<center>Para</center>', align: 'left', width: 225, hidden: false, formatter: function (cellvalue, options, rowObject) {
                        var strHml = "";
                        strHml = validaNulosJSON(rowObject, "DES_SUB_TODO");
                        return strHml;
                    }
                },
                {
                    label: '<center>Fecha de Envío</center>', align: 'center', hidden: false, formatter: function (cellvalue, options, rowObject) {
                        var strHml = "";
                        strHml = validaNulosJSON(rowObject, "FEC_MOVI");
                        return strHml;
                    }
                },
                {
                    label: '<center>Tratamiento</center>', align: 'center', width: 100, hidden: false, formatter: function (cellvalue, options, rowObject) {
                        var strHml = "";
                        strHml = validaNulosJSON(rowObject.enTrata, "DES_TRATA");
                        return strHml;
                    }
                },
                {
                    label: '<center>Documento</center>', align: 'center', width: 450, hidden: false, formatter: function (cellvalue, options, rowObject) {
                        var strHml = "";
                        //strHml = validaNulosJSON(rowObject.enTipDoc, "DES_DOC");
                        //return strHml;
                        if (rowObject.enEstado.ID_ESTADO != 9) {
                            strHml = formatterDesDoc(cellvalue, options, rowObject, strOpr);
                        } else {
                            strHml = rowObject.enTipDoc.DES_DOC;
                        }
                        return strHml;
                    }
                },
                {
                    label: '<center>Estado</center>', align: 'center', hidden: false, formatter: function (cellvalue, options, rowObject) {
                        var strHml = "";
                        strHml = validaNulosJSON(rowObject.enEstado, "DES_ESTADO");
                        return strHml;
                    }
                },
                {
                    name: 'ID_ESTADO', index: 'ID_ESTADO', width: 90, align: 'center', formatter: function (cellvalue, options, rowObject) {
                        if (rowObject.enEstado.ID_ESTADO == 9)
                            rowsToColor[rowsToColor.length] = options.rowId;
                        return cellvalue;
                    }, hidden: true },
            ],
            rownumbers: true,
            viewrecords: true,
            height: "100%",
            rowList: [10, 50, 70, 100],
            rowNum: 10,
            pager: "#divPagerConsExpeVirtual",
            loadComplete: function () {
                $("#divGrilla_consExpeVirtual table.ui-jqgrid-htable").css("width", "100%").closest("div.ui-jqgrid-hbox").css("padding-right", "0px");
                $("#divGrilla_consExpeVirtual table.ui-jqgrid-btable").css("width", "100%");
            },
            beforeRequest: function () {
                jqGridResponsive($(".jqGridDocs"));
            },
            gridComplete: function () {
                for (var i = 0; i < rowsToColor.length; i++) {
                    $("#" + rowsToColor[i]).find("td").css("background-color", "#ed6b6b").css("color", "white");
                }
            }
        });
    }
};

function formatterDesTrata(cellvalue, options, rowObject) {
    var strHtml = new String();
    strHtml = validaNulosJSON(rowObject.enTrata, "DES_TRATA");
    return strHtml;
}

function formatterImg(cellvalue, options, rowObject) {
    var strHtml = new String();
    if (rowObject.FLG_ORIGINAL == 1) {
        strHtml = "<img id='imgCopia' title='Original' alt='Original' style='cursor: pointer;' src='../Resource/img/copyright.png'/>";
    } else {
        strHtml = "<img id='imgCopia' title='Copia' alt='Copia' style='cursor: pointer;' src='../Resource/img/copy.png'/>";
    }
    return strHtml;
};

function formatterDesDoc(cellvalue, options, rowObject, strOpr) {
    //console.log("formatterDesDoc");
    //console.log(arrRolesMaster);
    var strHtmlDesDoc = new String();
    //var strOpr = "";

    //var fnTemp = function () {
    //    if (arrRolesMaster.length == 0) {
    //        strOpr = "3";
    //    } else {
    //        if (validarControlesRoles({ strRoles: $("#hfIdConsDocu").val() })) {
    //            strOpr = "1"; //Administrador o consulta general  
    //        } else if (validarControlesRoles({ strRoles: $("#hfIdRolJefes").val() })) {
    //            strOpr = "2"; //Jefe
    //        } else if (validarControlesRoles({ strRoles: $("#hfIdRolEspecialista").val() })) {
    //            strOpr = "3"; //Asignacion
    //        } else if (validarControlesRoles({ strRoles: $("#hfIdRolSeguimiento").val() })) {
    //            //strOpr = "4"; //Seguimeinto
    //            if (validarControlesRoles({ strRoles: $("#hfIdConsDocu").val() })) {
    //                strOpr = "1";
    //            } else if (validarControlesRoles({ strRoles: $("#hfIdRolJefes").val() })) {
    //                strOpr = "2";
    //            } else if (validarControlesRoles({ strRoles: $("#hfIdRolEspecialista").val() })) {
    //                strOpr = "3";
    //            } else {
    //                strOpr = "4"; //Seguimeinto
    //            };
    //        }
    //    }
    //    return strOpr;
    //}

    //strOpr = fnValidarControlesRolesRptConsultaExpediente();

    //console.log(strOpr);
    switch (strOpr) {
        case '1':
            //console.log("administrador");
            if (rowObject.ID_EXPE == "1243048" && strIdPersona != "2513" && strIdPersona != "197268") {
                strHtmlDesDoc = rowObject.enTipDoc.DES_DOC + "<br>" + validaNulosJSON(rowObject, "DES_COMENT_INI");
            } else {
                strHtmlDesDoc = "<a href='#' onclick='cargarRegDocConsultaDoc(" + rowObject.ID_EXPE + "," + rowObject.ID_MOVI + "," + rowObject.ANIO + "," + rowObject.enTipDoc.ID_DOC + ", \"divRegistroConsultaPublicoDocumentos\", \"\"); return false;'>" + rowObject.enTipDoc.DES_DOC + "</a><br>" + validaNulosJSON(rowObject, "DES_COMENT_INI");
            }
            break;
        case '2':
            //console.log("jefes");
            if (rowObject.ID_EXPE == "1243048" && strIdPersona != "2513" && strIdPersona != "197268") {
                strHtmlDesDoc = rowObject.enTipDoc.DES_DOC + "<br>" + validaNulosJSON(rowObject, "DES_COMENT_INI");
            } else {
                if (validarOfiPrincipal_consultaExpedientes(rowObject, lstDataConsExpeVentanilla)) {
                    strHtmlDesDoc = "<a href='#' onclick='cargarRegDocConsultaDoc(" + rowObject.ID_EXPE + "," + rowObject.ID_MOVI + "," + rowObject.ANIO + "," + rowObject.enTipDoc.ID_DOC + ", \"divRegistroConsultaPublicoDocumentos\", \"\"); return false;'>" + rowObject.enTipDoc.DES_DOC + "</a><br>" + validaNulosJSON(rowObject, "DES_COMENT_INI");
                } else {
                    strHtmlDesDoc = rowObject.enTipDoc.DES_DOC + "<br>" + validaNulosJSON(rowObject, "DES_COMENT_INI");
                }
            }
            break;
        case '3': case '4':
            //console.log("asignacion");
            if (rowObject.ID_EXPE == "1243048" && strIdPersona != "2513" && strIdPersona != "197268") {
                strHtmlDesDoc = rowObject.enTipDoc.DES_DOC + "<br>" + validaNulosJSON(rowObject, "DES_COMENT_INI");
            } else {
                if (verificarAsignacion_consultaExpedientes(rowObject, lstDataConsAsignaciones_consExpedientes)) {
                    strHtmlDesDoc = "<a href='#' onclick='cargarRegDocConsultaDoc(" + rowObject.ID_EXPE + "," + rowObject.ID_MOVI + "," + rowObject.ANIO + "," + rowObject.enTipDoc.ID_DOC + ", \"divRegistroConsultaPublicoDocumentos\", \"\"); return false;'>" + rowObject.enTipDoc.DES_DOC + "</a><br>" + validaNulosJSON(rowObject, "DES_COMENT_INI");
                } else {
                    strHtmlDesDoc = rowObject.enTipDoc.DES_DOC + "<br>" + validaNulosJSON(rowObject, "DES_COMENT_INI");
                }
            }
            break;
//        case '4':
//            //console.log("seguimiento");
//            //strHtmlDesDoc = rowObject.enTipDoc.DES_DOC + "<br>" + validaNulosJSON(rowObject, "DES_COMENT_INI");
//            if (rowObject.ID_EXPE == "1243048" && strIdPersona != "2513" && strIdPersona != "197268") {
//                strHtmlDesDoc = rowObject.enTipDoc.DES_DOC + "<br>" + validaNulosJSON(rowObject, "DES_COMENT_INI");
//            } else {
//                if (verificarAsignacion_consultaExpedientes(rowObject, lstDataConsAsignaciones_consExpedientes)) {
//                    strHtmlDesDoc = "<a href='#' onclick='cargarRegDocConsultaDoc(" + rowObject.ID_EXPE + "," + rowObject.ID_MOVI + "," + rowObject.ANIO + "," + rowObject.enTipDoc.ID_DOC + ", \"divRegistroConsultaPublicoDocumentos\", \"\"); return false;'>" + rowObject.enTipDoc.DES_DOC + "</a><br>" + validaNulosJSON(rowObject, "DES_COMENT_INI");
//                } else {
//                    strHtmlDesDoc = rowObject.enTipDoc.DES_DOC + "<br>" + validaNulosJSON(rowObject, "DES_COMENT_INI");
//                }
//            }
//            break;
        default:
            strHtmlDesDoc = rowObject.enTipDoc.DES_DOC + "<br>" + validaNulosJSON(rowObject, "DES_COMENT_INI");
            break;
    }
    return strHtmlDesDoc;
};

function verificarAsignacion_consultaExpedientes(objData, lstAsignacion) {
    //console.log("verificarAsignacion_consultaExpedientes");
    //console.log(objData);
    //var bool = new Boolean();
    var objEnEstado = objData.enEstado;
    var idMoviPivot = objData.ID_MOVI;
    var idExpeRowData = objData.ID_EXPE;
    //console.log("idMoviPivot:" + idMoviPivot);
    //console.log("strIdPersona:" + strIdPersona)
    if (tempBool_Asignacion == false) {
        if (lstAsignacion.length > 0) {
            for (var i = 0; i < lstAsignacion.length; i++) {
                //console.log(lstAsignacion[i]);
                var idExpeAsigna = lstAsignacion[i].enExpe.ID_EXPE;
                var objEnUsuAsigna = lstAsignacion[i].enUsu;
                var idMoviAsigna = lstAsignacion[i].enMovi.ID_MOVI;
                var codUsuAsigna = objEnUsuAsigna.CodUsu;
                
                if (codUsuAsigna == strIdPersona && idMoviAsigna == idMoviPivot) {
                    //bool = true;
                    tempBool_Asignacion = true;
                } else {
                    //bool = false;
                }
            }
        } else {
            //bool = false;
        }
    } else {
        //bool = true;
    }
    return tempBool_Asignacion;
}
function cargarRegDocConsultaDoc(intIdExpe, intIdMovi, intIdAnoProc, intIdDoc, strIdDiv, strFunction) {
    //console.log(strRutaAplicacionMaster + "Publico/Ventanilla/regDocumento?intIdExpe=" + intIdExpe + "&intIdMovi=" + intIdMovi + "&intIdDoc=" + intIdDoc + "&intIdAnoProc=" + intIdAnoProc + "&strIdDiv=" + strIdDiv);
    BootstrapDialog.show({
        title: '',
        //type: BootstrapDialog.TYPE_PRIMARY,
        closable: true,
        draggable: true,
        cssClass: 'login-dialog',
        //size: BootstrapDialog.SIZE_WIDE,
        message: $("<div id='divVisor' style='height: 50%;'></div>").load(strRutaAplicacionMaster + "Publico/Ventanilla/regDocumento?intIdExpe=" + intIdExpe + "&intIdMovi=" + intIdMovi + "&intIdDoc=" + intIdDoc + "&intIdAnoProc=" + intIdAnoProc + "&strIdDiv=" + strIdDiv)
    });
};

function formatterSub(cellvalue, options, rowObject) {
    cellvalue = rowObject.enEstorg.ABR_SUBOFI + " - " + cellvalue;
    return cellvalue;
};

function poneUbicacionActualRegExpeSimple(lstData) {
    var strHtml = new String();
    for (var i = 0; i < lstData.length; i++) {
        strHtml = strHtml + '<tr><td>' + lstData[i].enEstorg.DES_SUBOFI + '</td></tr>';
    };
    $("#tblUbicacionActualRegExpeSimple").html(strHtml);
};

function cargaAnexosExpedienteSimple() {
    var objEnAnexo = new Object();
    if (noEsVacio(strExpediente)) { objEnAnexo.ID_EXPE = strExpediente; }

    cargarDatosWebApi({
        parametros: objEnAnexo,
        nombreObjeto: "objEnAnexo",
        url: "Expe/traeListaAnexos",
        callBack: function (lstData) {
            cargaHiperVinculoSimple(lstData);
        }
    });
};

function cargaHiperVinculoSimple(lstData) {
    var strImgAttachment = "<img src='" + strRutaAplicacionMaster + "../Resource/img/attachment.png' title='Expediente anexado'/>";
    $("#tdAnexosRegExpeSimple").html("");
    if (lstData.length > 0) {
        var strHtml = new String();
        strHtml = "<table>"
        if (lstData[0].ID_EXPE != strExpediente) {
            strHtml = "<tr><td colspan='3' class='campoDatos'>Expediente Principal: <a href='#' onclick='strExpediente=" + lstData[0].ID_EXPE + "; strOprRegExpe = \"R\";  cargarDatosRegExpe(" + lstData[0].ID_EXPE + "); cargarDatosMovimientosRegExpeSimple(); configurarFormSoloLectura(); return false;'>" + lstData[0].ID_EXPE + "</a></td>";
        };
        for (var i = 0; i < lstData.length; i++) {
            strHtml += "<tr>";
            if (lstData[i].ID_EXPE_HIJO == strExpediente) {
                $("#btnAnexarRegExpe").hide();
                strHtml += "<td>" + strImgAttachment + "</td><td>Expediente N° " + lstData[i].ID_EXPE_HIJO + ", documento " + lstData[i].enTipDoc.DES_DOC + " (" + validaNulosJSON(lstData[i], "DES_OBS") + ")</td><td></td>";
            }
            else {
                strHtml += "<td>" + strImgAttachment + "</td><td>Expediente N° <a href='#' onclick='strExpediente=" + lstData[i].ID_EXPE_HIJO + "; strOprRegExpe = \"R\";  cargarDatosRegExpe(" + lstData[i].ID_EXPE_HIJO + "); cargarDatosMovimientosRegExpeSimple(); configurarFormSoloLectura(); return false;'>" + lstData[i].ID_EXPE_HIJO + "</a>" +
                            ", documento " + lstData[i].enTipDoc.DES_DOC + " (" + validaNulosJSON(lstData[i], "DES_OBS") + ")</td><td></td>";
            };
            strHtml += "</tr>";
        };
        $("#hfTotalAnexosRegExpe").val(lstData.length);
        $("#tdAnexosRegExpeSimple").html(strHtml + "</table>");
    } else {
        $("#tdAnexosRegExpeSimple").html("Sin anexos");
    };
};
function validarOfiPrincipal_consultaExpedientes(objData, lstDataExpe) {
    //console.log("strSubPivot: " + strOficinaPivot[0]);
    //console.log("strSubOfiPivot: " + strOficinaPivot[1]);
    //console.log(validarOfiPrincipal(objData));
    var bool = new Boolean();
    if (lstDataExpe.length > 0) {
        var objEnEstorgRemite = objData.enEstorgRemite;  ///De
        var objEnEstorg = objData.enEstorg; ////Para

        if (tempBool_jefe == false) {
            for (var i = 0; i < lstDataExpe.length; i++) {
                if (objEnEstorgRemite.ID_SUBOFI == strOficinaPivot[1] || objEnEstorg.ID_SUBOFI == strOficinaPivot[1] || validarOfiPrincipal(objData)) {
                    bool = true;
                    tempBool_jefe = true;
                } else {
                    bool = false;
                }
            }
        } else {
            tempBool_jefe = true;
        }
    }
    else {
        bool = false;
    }

    return bool;
};
function validarOfiPrincipal(objData) {
    var bool = new Boolean();
    var objEstorg = objData.enEstorg;
    var objEstorgRemite = objData.enEstorgRemite;
    var idSubOfiDe = objEstorgRemite.ID_SUBOFI;
    var idSubOfiPara = objEstorg.ID_SUBOFI;
    var idSubOfiMaster = strOficinaPivot[1];

    if (idSubOfiMaster.indexOf("000000") != -1) {
        var strCodSub = idSubOfiMaster.substring(0, idSubOfiMaster.indexOf("000000"));
        if (strCodSub == "02") {
            bool = true;
        } else {
            bool = false;
        }
    } else {
        bool = false;
    }
    return bool;
}


function fnValidarControlesRolesRptConsultaExpediente(objParametros) {
    var defaults = {
        strIdControl: "",
        callBack: function () { }
    };
    defaults = $.extend(defaults, objParametros);


    //if (noEsVacio(defaults.strIdControl)) {
    //    if (noEsVacio($("#" + defaults.strIdControl).val())) {
    //        return strOpr;
    //    }
    //};

    var strOpr = "";

    if (arrRolesMaster.length == 0) {
        strOpr = "3";
    } else {
        if (validarControlesRoles({ strRoles: $("#hfIdConsDocu").val() })) {
            strOpr = "1"; //Administrador o consulta general  
        } else if (validarControlesRoles({ strRoles: $("#hfIdRolJefes").val() })) {
            strOpr = "2"; //Jefe
        } else if (validarControlesRoles({ strRoles: $("#hfIdRolEspecialista").val() })) {
            strOpr = "3"; //Asignacion
        } else if (validarControlesRoles({ strRoles: $("#hfIdRolSeguimiento").val() })) {
            //strOpr = "4"; //Seguimiento
            if (validarControlesRoles({ strRoles: $("#hfIdConsDocu").val() })) {
                strOpr = "1";
            } else if (validarControlesRoles({ strRoles: $("#hfIdRolJefes").val() })) {
                strOpr = "2";
            } else if (validarControlesRoles({ strRoles: $("#hfIdRolEspecialista").val() })) {
                strOpr = "3";
            } else {
                strOpr = "4"; //Seguimiento
            };
        } else {
            strOpr = "3"; //Asignacion
        }
    }
    //if (noEsVacio(defaults.strIdControl)) {
    //    $("#" + defaults.strIdControl).val(strOpr);
    //};
    defaults.callBack(strOpr);
    return strOpr;
}