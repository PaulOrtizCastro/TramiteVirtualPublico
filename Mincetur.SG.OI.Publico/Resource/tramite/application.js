/**
* Verifica si el documento ingresado es multiple, de serlo retorna true.
* @param {integer} intTipDoc Identificador del control a validar.
* @return {Boolean} boolRetorno Retrona true si es multiple. 
*/
function esDocumentoMultiple(intTipDoc) {
    var boolRetorno = ($.inArray(parseInt(intTipDoc), arrTipDocMultipleMaster) >= 0);
    return boolRetorno;
};
/**
* Configura el nivel de jerarquia de las oficinas
* @param {string} strIdSubOfi Codigo (COD_SUBOFI) de oficina.
* @return {string} strRetorno Retrona identacion de oficina. 
*/
function configuraIdentadoOficinas(strIdSubOfi) {
    var strRetorno = new String();
    var strPivot = new String(strIdSubOfi);
    if (strPivot.substr(2, 6) == "000000") {
        strRetorno = "<img src='" + strRutaAplicacionMaster + "resource/img/bullet_go.png' />";
    } else if ((strPivot.substr(4, 4) == "0000") && (strPivot.substr(2, 6) != "000000")) {
        strRetorno = "&nbsp;&nbsp;&nbsp;&nbsp;<img src='" + strRutaAplicacionMaster + "resource/img/bullet_go.png' />";
    } else if ((strPivot.substr(6, 2) == "00") && (strPivot.substr(2, 6) != "000000") && (strPivot.substr(4, 4) != "0000")) {
        strRetorno = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src='" + strRutaAplicacionMaster + "resource/img/bullet_go.png' />";
    } else {
        strRetorno = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src='" + strRutaAplicacionMaster + "resource/img/bullet_go.png' />";
    };
    return strRetorno;
};

function cargarRadioButtonList(strIdDiv, objEntidad, strNombreEntidad, strUrl) {
    var strHtml = new String();
    var lstdata = cargarDatosListaSimpleCache(objEntidad, strUrl, strNombreEntidad, "", false, "");
    for (var i = 0; i < lstdata.length; i++) {
        strHtml += "<td><input type='radio' name='rblEstadoDocSalida' " + ((i == 0) ? "checked='checked'" : "") + "value='16'/> Por Enviar</td>"
    };
};

function habilitarFilaDerivacion(control, padre, nombre) {
    if (control.is(":checked")) {
        control.closest("tr").find(":input").removeAttr('disabled');
    } else {
        $("#" + padre + " :input").not("[name=" + nombre + "]").attr('disabled', 'disabled');
    };
};

function recibirCargoCorrespondencia(intIdExpe, intIdMovi) {
    var objEnDocSalida = new Object();
    objEnDocSalida.ID_EXPE = intIdExpe;
    objEnDocSalida.ID_MOVI = intIdMovi;
    objEnDocSalida.OPR = 'C';
    actualizarDatos({
        parametros: objEnDocSalida,
        nombreObjeto: "objEnDocSalida",
        url: "wsDocSalida.asmx/actualizar",
        divMensaje: "divRegistroConsultaDocumentos",
        callBack: function (objError) {
            //cargaPopUpAlert(objError.DES_ERROR);
        }
    });
};
/**
* Arma las lista de acciones mostradas en la grilla de consulta de documentos.
* @param {integer} intIdTbl Identificador del control a validar (table).
* @param {integer} intExpePivot Identificador del control a validar (IdExpe).
* @param {integer} intIdMovi Identificador del control a validar (IdMovi).
* @param {integer} intIdEstado Identificador del control a validar (IdEstado).
* @param {integer} intIdSub Identificador del control a validar (Id Cod. Oficina).
* @param {string} strIdSubOfi Identificador del control a validar (Id Cod. SubOfi).
* @param {integer} intIdTipDoc Identificador del control a validar (Id Tipo documento).
* @param {integer} intNumDoc Identificador del control a validar (Id Num documento).
* @param {integer} intIdEstadoAnt Identificador del control a validar (Id Estado anterior).
* @param {integer} strDesTrata Identificador del control a validar (Tratamiento).
* @param {integer} strDesEstado Identificador del control a validar (Desc. Estado).
* @param {integer} intIdAnoProc Identificador del control a validar (AÒo de proceso).
* @param {integer} intIdDoc Identificador del control a validar (Id Tipo de documento).
* @return {string} strHtmlAcciones lista de acciones habilitadas. 
*/
function armarAccionesConsultadoc(intIdTbl, intExpePivot, intIdMovi, intIdEstado, intIdSub, strIdSubOfi, intIdSubAnt, strIdSubOfiAnt, intIdMoviAnt, intIdTipDoc, intNumDoc, intIdEstadoAnt, strDesTrata, strDesEstado, intIdAnoProc, intIdDoc) {
    var strHtmlAcciones = "";
    var len = lstAccionesConsultaDoc.length;
    for (var i = 0; i < len; i++) {
        var iconAccion = "";
        switch (lstAccionesConsultaDoc[i].ID_ACCION) {
            case 1:
                iconAccion = "<img src='" + strRutaAplicacionMaster + "resource/img/enviar.gif' />";
                break;
            case 2:
                iconAccion = "<img src='" + strRutaAplicacionMaster + "resource/img/hand.png' />";
                break;
            case 3:
                iconAccion = "<img src='" + strRutaAplicacionMaster + "resource/img/folder_add.png' />";
                break;
            case 4:
                iconAccion = "<img src='" + strRutaAplicacionMaster + "resource/img/group.gif' />";
                break;
            case 5:
                iconAccion = "<img src='" + strRutaAplicacionMaster + "resource/img/document-delete.png' />";
                break;
            case 6:
                iconAccion = "<img src='" + strRutaAplicacionMaster + "resource/img/undo.png' />";
                break;
            case 7:
                iconAccion = "<img src='" + strRutaAplicacionMaster + "resource/img/nuevo.png' />";
                break;
            case 8:
                iconAccion = "<img src='" + strRutaAplicacionMaster + "resource/img/enviar.gif' />";
                break;
            case 9:
                iconAccion = "<img src='" + strRutaAplicacionMaster + "resource/img/receive.png' />";
                break;
            default:
                iconAccion = "";
                break;
        };
        strHtmlAcciones += "<tr class='inActivo' data-id='" + lstAccionesConsultaDoc[i].ID_ACCION + "'><td>" +
            iconAccion + " " + lstAccionesConsultaDoc[i].DES_ACCION + (((lstAccionesConsultaDoc[i].ID_ACCION == 6) && ((intIdEstado == 6) || (intIdEstado == 1))) ? " " + strDesEstado : "") + "</td></tr>";
    };
    $("#" + intIdTbl).html(strHtmlAcciones);
    $("#" + intIdTbl + " tr").each(function () {
        var objPivot = $(this);
        var intIdAccionPivot = parseInt($(this).attr("data-id"));
        switch (intIdAccionPivot) {
            case 1:
                if (configurarAcciones(intIdAccionPivot, intIdEstado, intIdSub, strIdSubOfi, intIdSubAnt, strIdSubOfiAnt)) {
                    objPivot.removeClass("inActivo");
                    objPivot.addClass("activo");
                    objPivot.mouseover(function () {
                        $(this).effect('highlight', {
                            color: '#AACCFF'
                        }, 1000);
                    });
                    objPivot.click(function () {
                        $('#tblAccionesConsultaDoc').closest('div').dialog('close');
                        var lstDerivarPivotMaster = [];
                        var arrDerivarPivotMaster = [];
                        var numberOfChecked = $("div#divDatosConsultaDoc table:first input:checkbox:checked").length;
                        if (numberOfChecked > 1) {
                            $("div#divDatosConsultaDoc table:first tr td").find("[name=ckCargosConsultaDoc]").each(function (j, elemento) {
                                if (j != 0) {
                                    var objTrTodos = $(this).closest("tr");
                                    var intDataIdTodos = objTrTodos.attr("data-id");
                                    if ($(elemento).is(':checked')) {
                                        if (lstDataConsultaDoc[intDataIdTodos].enEstado.ID_ESTADO == 20) {
                                            arrDerivarPivotMaster.push(lstDataConsultaDoc[intDataIdTodos].ID_EXPE);
                                        };
                                        //arrDerivarPivotMaster.push(lstDataConsultaDoc[intDataIdTodos].ID_EXPE);
                                        lstDerivarPivotMaster.push(lstDataConsultaDoc[intDataIdTodos].ID_EXPE + "|" +
                                                            lstDataConsultaDoc[intDataIdTodos].ID_MOVI + "|" +
                                                            lstDataConsultaDoc[intDataIdTodos].enEstorg.ID_SUB + "|" +
                                                            lstDataConsultaDoc[intDataIdTodos].enEstorg.ID_SUBOFI + "|" +
                                                            lstDataConsultaDoc[intDataIdTodos].enEstado.ID_ESTADO + "|" +
                                                            lstDataConsultaDoc[intDataIdTodos].ID_MOVI_ANT + "|" +
                                                            lstDataConsultaDoc[intDataIdTodos].enTipDoc.ID_TIP_DOC + "|" +
                                                            lstDataConsultaDoc[intDataIdTodos].enTipDoc.NUM_DOC + "|" +
                                                            lstDataConsultaDoc[intDataIdTodos].enTipDoc.ID_DOC + "|" +
                                                            lstDataConsultaDoc[intDataIdTodos].enTipDoc.DES_DOC + "|" +
                                                            lstDataConsultaDoc[intDataIdTodos].ANIO + "|" +
                                                            lstDataConsultaDoc[intDataIdTodos].DES_ASUNTO + "|" +
                                                            lstDataConsultaDoc[intDataIdTodos].enEstorgRemite.ID_SUB + "|" +
                                                            lstDataConsultaDoc[intDataIdTodos].enEstorgRemite.ID_SUBOFI + "|" +
                                                            lstDataConsultaDoc[intDataIdTodos].enTipDoc.NUM_FOLIOS);
                                        //console.log(lstDataConsultaDoc[intDataIdTodos]);
                                    };
                                }
                            });
                            if (arrDerivarPivotMaster.length > 0) {
                                $("#divPopUpConfirmDoc").cargaPopUpConfirm({ mensaje: "El expediente " + arrDerivarPivotMaster.join(",&nbsp;") + " contiene asignaciones en <b>espera</b>. &#191;Desea continuar?",
                                    callBack: function (response) {
                                        if (response) {
                                            var queryString = $.param({ a: lstDerivarPivotMaster });
                                            objQueryStringDerivar = $.parseParams(queryString)
                                            $("#divRegistroConsultaDocumentos").cargarPopUpModal({
                                                width: 900,
                                                titulo: "Derivar",
                                                limpiarAlCerrar: true,
                                                eliminarArchivo: true,
                                                url: strRutaAplicacionMaster + "sistema/registro/regDerivar.aspx"
                                            });
                                        };
                                    }
                                });
                            } else {
                                var queryString = $.param({ a: lstDerivarPivotMaster });
                                objQueryStringDerivar = $.parseParams(queryString)
                                $("#divRegistroConsultaDocumentos").cargarPopUpModal({
                                    width: 900,
                                    titulo: "Derivar",
                                    limpiarAlCerrar: true,
                                    eliminarArchivo: true,
                                    url: strRutaAplicacionMaster + "sistema/registro/regDerivar.aspx"
                                });
                            }
                            //console.log(arrDerivarPivotMaster);
                            //fnVerificarSiEstaAsignado({
                            //    arrDerivar: arrDerivarPivotMaster.join(","),
                            //    callBack: function (data) {
                            //        if (data) {
                            //            $("#divPopUpConfirmDoc").cargaPopUpConfirm({ mensaje: "El expediente contiene asignaciones en <b>espera</b>. &#191;Desea continuar?",
                            //                callBack: function (response) {
                            //                    if (response) {
                            //                        var queryString = $.param({ a: lstDerivarPivotMaster });
                            //                        objQueryStringDerivar = $.parseParams(queryString)
                            //                        $("#divRegistroConsultaDocumentos").cargarPopUpModal({
                            //                            width: 900,
                            //                            titulo: "Derivar",
                            //                            limpiarAlCerrar: true,
                            //                            eliminarArchivo: true,
                            //                            url: strRutaAplicacionMaster + "sistema/registro/regDerivar.aspx"
                            //                        });
                            //                    };
                            //                }
                            //            });
                            //        } else {
                            //            var queryString = $.param({ a: lstDerivarPivotMaster });
                            //            objQueryStringDerivar = $.parseParams(queryString)
                            //            $("#divRegistroConsultaDocumentos").cargarPopUpModal({
                            //                width: 900,
                            //                titulo: "Derivar",
                            //                limpiarAlCerrar: true,
                            //                eliminarArchivo: true,
                            //                url: strRutaAplicacionMaster + "sistema/registro/regDerivar.aspx"
                            //            });
                            //        }
                            //    }
                            //});
                        } else {
                            $('#tblAccionesConsultaDoc').closest('div').dialog('close');
                            //var arrDerivarPivotMaster = [];
                            //arrDerivarPivotMaster.push(intExpePivot);
                            fnVerificarSiEstaAsignado({
                                ID_EXPE: intExpePivot,
                                ID_MOVI: intIdMovi,
                                //arrDerivar: arrDerivarPivotMaster.join(","),
                                callBack: function (data) {
                                    if (data) {
                                        //$("#divPopUpConfirmDoc").cargaPopUpAlert({ mensaje: "Los expedientes no deben estar asignados para realizar la multiple derivaci&#243;n" });
                                        $("#divPopUpConfirmDoc").cargaPopUpConfirm({ mensaje: "El expediente " + intExpePivot + " contiene " + data + " asignaciones en <b>espera</b>. &#191;Desea continuar?",
                                            callBack: function (response) {
                                                if (response) {
                                                    objQueryStringDerivar = "";
                                                    $("#divRegistroConsultaDocumentos").cargarPopUpModal({
                                                        width: 900,
                                                        titulo: "Derivar",
                                                        limpiarAlCerrar: true,
                                                        url: strRutaAplicacionMaster + "sistema/registro/regDerivar.aspx?desTrata=" + encodeURIComponent(strDesTrata) + "&intIdSubAnt=" + intIdSubAnt + "&strIdSubOfiAnt=" + strIdSubOfiAnt + "&intIdSub=" + intIdSub + "&strIdSubOfi=" +
                                                    strIdSubOfi + "&intIdMoviAnt=" + intIdMoviAnt + "&intIdEstado=" + intIdEstado + "&idTab=0&intIdExpe=" + intExpePivot + "&intIdMovi=" + intIdMovi +
                                                    "&intIdTipDoc=" + intIdTipDoc + "&intNumDoc=" + encodeURIComponent(intNumDoc) + "&intIdAnoProc=" +
                                                    intIdAnoProc + "&intIdDoc=" + intIdDoc + "&strIdDiv=divRegistroConsultaDocumentos&strCallBack=cargarConParametrosConsultaDoc&idAccion=1"
                                                    });
                                                    //console.log(intIdEstado);
                                                }
                                            }
                                        });
                                    } else {
                                        objQueryStringDerivar = "";
                                        //console.log("idEstadoAnt = " + intIdEstadoAnt);
                                        //console.log("idEstado = " + intIdEstado);
                                        $("#divRegistroConsultaDocumentos").cargarPopUpModal({
                                            width: 900,
                                            titulo: "Derivar",
                                            limpiarAlCerrar: true,
                                            url: strRutaAplicacionMaster + "sistema/registro/regDerivar.aspx?desTrata=" + encodeURIComponent(strDesTrata) + "&intIdSubAnt=" + intIdSubAnt + "&strIdSubOfiAnt=" + strIdSubOfiAnt + "&intIdSub=" + intIdSub + "&strIdSubOfi=" +
                                                    strIdSubOfi + "&intIdMoviAnt=" + intIdMoviAnt + "&intIdEstado=" + intIdEstado + "&idTab=0&intIdExpe=" + intExpePivot + "&intIdMovi=" + intIdMovi +
                                                    "&intIdTipDoc=" + intIdTipDoc + "&intNumDoc=" + encodeURIComponent(intNumDoc) + "&intIdAnoProc=" +
                                                    intIdAnoProc + "&intIdDoc=" + intIdDoc + "&strIdDiv=divRegistroConsultaDocumentos&strCallBack=cargarConParametrosConsultaDoc&idAccion=1"
                                        });
                                    }
                                }
                            });
                        }
                        return false;
                    });
                };
                break;
            case 2:
                //Responder
                var lstTempPivotMaster = [];
                if (configurarAcciones(intIdAccionPivot, intIdEstado, intIdSub, strIdSubOfi, intIdSubAnt, strIdSubOfiAnt)) {
                    objPivot.removeClass("inActivo");
                    objPivot.addClass("activo");
                    objPivot.mouseover(function () {
                        $(this).effect('highlight', {
                            color: '#AACCFF'
                        }, 1000);
                    });
                    objPivot.click(function () {
                        $('#tblAccionesConsultaDoc').closest('div').dialog('close');
                        //alert("Recibir");
                        var numberOfChecked = $("div#divDatosConsultaDoc table:first input:checkbox:checked").length;
                        if (numberOfChecked > 1) {
                            $("#divPopUpConfirmDoc").cargaPopUpConfirm({
                                mensaje: "&#191;Est&#225; seguro(a) que desea recibir los " + numberOfChecked + " expedientes seleccionados?",
                                callBack: function (response) {
                                    if (response) {
                                        $("div#divDatosConsultaDoc table:first tr td").find("[name=ckCargosConsultaDoc]").each(function (j, elemento) {
                                            if (j != 0) {
                                                var objTrTodos = $(this).closest("tr");
                                                var intDataIdTodos = objTrTodos.attr("data-id");
                                                if ($(elemento).is(':checked')) lstTempPivotMaster.push(lstDataConsultaDoc[intDataIdTodos]);
                                            }
                                        });
                                        $.each(lstTempPivotMaster, function (index, value) {
                                            grabarMovimientoConsultaDoc(value.ID_EXPE, value.ID_MOVI, value.enEstorg.ID_SUB, value.enEstorg.ID_SUBOFI, value.enTipDocDerivado.ID_TIP_DOC, value.enTipDocDerivado.NUM_DOC, intIdAccionPivot, "U", numberOfChecked);
                                        });
                                    };
                                }
                            });

                            /*if (cargaPopUpConfirm("øDesea recibir los " + numberOfChecked + " expedientes seleccionados?")) {
                            $("div#divDatosConsultaDoc table:first tr td").find("[name=ckCargosConsultaDoc]").each(function (j, elemento) {
                            if (j != 0) {
                            var objTrTodos = $(this).closest("tr");
                            var intDataIdTodos = objTrTodos.attr("data-id");
                            if ($(elemento).is(':checked')) lstTempPivotMaster.push(lstDataConsultaDoc[intDataIdTodos]);
                            }
                            });
                            $.each(lstTempPivotMaster, function (index, value) {
                            grabarMovimientoConsultaDoc(value.ID_EXPE, value.ID_MOVI, value.enEstorg.ID_SUB, value.enEstorg.ID_SUBOFI, value.enTipDocDerivado.ID_TIP_DOC, value.enTipDocDerivado.NUM_DOC, intIdAccionPivot, "U", numberOfChecked);
                            });
                            }*/


                        } else {
                            grabarMovimientoConsultaDoc(intExpePivot, intIdMovi, intIdSub, strIdSubOfi, intIdTipDoc, intNumDoc, intIdAccionPivot, "U", "");
                        };
                        return false;
                    });
                };
                break;
            case 3:
                if (configurarAcciones(intIdAccionPivot, intIdEstado, intIdSub, strIdSubOfi, intIdSubAnt, strIdSubOfiAnt)) {
                    objPivot.removeClass("inActivo");
                    objPivot.addClass("activo");
                    objPivot.mouseover(function () {
                        $(this).effect('highlight', {
                            color: '#AACCFF'
                        }, 1000);
                    });
                    objPivot.click(function () {
                        if (intIdEstado == 20) {
                            $('#tblAccionesConsultaDoc').closest('div').dialog('close');
                            $("#divPopUpConfirmDoc").cargaPopUpConfirm({
                                mensaje: "El expediente contiene asignaciones en <b>espera</b>, si se archiva las asignaciones <b>no atendidas</b><br> estas pasar·n a ser atendidas autom&#225;ticamente. &#191;Desea continuar?",
                                callBack: function (response) {
                                    if (response) {
                                        //$('#tblAccionesConsultaDoc').closest('div').dialog('close');
                                        var lstArchivarPivotMaster = [];
                                        var numberOfChecked = $("div#divDatosConsultaDoc table:first input:checkbox:checked").length;
                                        if (numberOfChecked > 1) {
                                            $("div#divDatosConsultaDoc table:first tr td").find("[name=ckCargosConsultaDoc]").each(function (j, elemento) {
                                                if (j != 0) {
                                                    var objTrTodos = $(this).closest("tr");
                                                    var intDataIdTodos = objTrTodos.attr("data-id");
                                                    if ($(elemento).is(':checked')) {
                                                        lstArchivarPivotMaster.push(lstDataConsultaDoc[intDataIdTodos].ID_EXPE + "|" +
                                                            lstDataConsultaDoc[intDataIdTodos].ID_MOVI);
                                                    };
                                                }
                                            });

                                            var queryString = $.param({
                                                a: lstArchivarPivotMaster
                                            });
                                            objQueryStringArchivar = $.parseParams(queryString)
                                            $("#divRegistroConsultaDocumentos").cargarPopUpModal({
                                                width: 500,
                                                titulo: "Archivar",
                                                limpiarAlCerrar: true,
                                                eliminarArchivo: true,
                                                url: strRutaAplicacionMaster + "sistema/registro/regArchivar.aspx"
                                            });

                                        } else {
                                            objQueryStringArchivar = "";
                                            $("#divRegistroConsultaDocumentos").cargarPopUpModal({
                                                width: 500,
                                                titulo: "Archivar",
                                                limpiarAlCerrar: true,
                                                url: strRutaAplicacionMaster + "sistema/registro/regArchivar.aspx?intIdExpe=" + intExpePivot +
                                                    "&intIdMovi=" + intIdMovi + "&intIdEstado=" + intIdEstado + "&strIdDiv=divRegistroConsultaDocumentos&strCallBack=cargarConParametrosConsultaDoc"
                                            });
                                        }
                                    }
                                }
                            });
                        } else {
                            //$('#tblAccionesConsultaDoc').closest('div').dialog('close');
                            var lstArchivarPivotMaster = [];
                            var numberOfChecked = $("div#divDatosConsultaDoc table:first input:checkbox:checked").length;
                            if (numberOfChecked > 1) {
                                $("div#divDatosConsultaDoc table:first tr td").find("[name=ckCargosConsultaDoc]").each(function (j, elemento) {
                                    if (j != 0) {
                                        var objTrTodos = $(this).closest("tr");
                                        var intDataIdTodos = objTrTodos.attr("data-id");
                                        if ($(elemento).is(':checked')) {
                                            lstArchivarPivotMaster.push(lstDataConsultaDoc[intDataIdTodos].ID_EXPE + "|" +
                                                lstDataConsultaDoc[intDataIdTodos].ID_MOVI);
                                        };
                                    }
                                });

                                var queryString = $.param({
                                    a: lstArchivarPivotMaster
                                });
                                objQueryStringArchivar = $.parseParams(queryString)
                                $("#divRegistroConsultaDocumentos").cargarPopUpModal({
                                    width: 500,
                                    titulo: "Archivar",
                                    limpiarAlCerrar: true,
                                    eliminarArchivo: true,
                                    url: strRutaAplicacionMaster + "sistema/registro/regArchivar.aspx"
                                });

                            } else {
                                objQueryStringArchivar = "";
                                $("#divRegistroConsultaDocumentos").cargarPopUpModal({
                                    width: 500,
                                    titulo: "Archivar",
                                    limpiarAlCerrar: true,
                                    url: strRutaAplicacionMaster + "sistema/registro/regArchivar.aspx?intIdExpe=" + intExpePivot + "&intIdMovi=" + intIdMovi + "&strIdDiv=divRegistroConsultaDocumentos&strCallBack=cargarConParametrosConsultaDoc"
                                });
                            }
                        };

                        return false;
                    });
                };
                break;
            case 4:
                var lstAsignarPivotMaster = [];
                if (configurarAcciones(intIdAccionPivot, intIdEstado, intIdSub, strIdSubOfi, intIdSubAnt, strIdSubOfiAnt)) {
                    objPivot.removeClass("inActivo");
                    objPivot.addClass("activo");
                    objPivot.mouseover(function () {
                        $(this).effect('highlight', {
                            color: '#AACCFF'
                        }, 1000);
                    });
                    objPivot.click(function () {
                        $('#tblAccionesConsultaDoc').closest('div').dialog('close');

                        var numberOfChecked = $("div#divDatosConsultaDoc table:first input:checkbox:checked").length;
                        if (numberOfChecked > 1) {
                            $("div#divDatosConsultaDoc table:first tr td").find("[name=ckCargosConsultaDoc]").each(function (j, elemento) {
                                if (j != 0) {
                                    var objTrTodos = $(this).closest("tr");
                                    var intDataIdTodos = objTrTodos.attr("data-id");

                                    if ($(elemento).is(':checked')) lstAsignarPivotMaster.push(lstDataConsultaDoc[intDataIdTodos].ID_EXPE + "|" +
                                        lstDataConsultaDoc[intDataIdTodos].DES_PERSONA + "|" + lstDataConsultaDoc[intDataIdTodos].enTipDoc.DES_TIP_DOC + "|" +
                                        lstDataConsultaDoc[intDataIdTodos].ID_MOVI + "|" + lstDataConsultaDoc[intDataIdTodos].enAccion.ID_ACCION + "|" +
                                        lstDataConsultaDoc[intDataIdTodos].enTipDoc.ID_TIP_DOC + "|" + lstDataConsultaDoc[intDataIdTodos].enTipDoc.NUM_DOC + "|" +
                                        lstDataConsultaDoc[intDataIdTodos].enTipDoc.ID_DOC);
                                }
                            });
                            var queryString = $.param({
                                a: lstAsignarPivotMaster,
                                b: "strIdDiv= divRegistroConsultaDocumentos",
                                c: "strCallBack=cargarConParametrosConsultaDoc",
                                d: "idAccion=4"
                            });
                            objQueryString = $.parseParams(queryString)

                            $("#divRegistroConsultaDocumentos").cargarPopUpModal({
                                width: 900,
                                titulo: "Asignaciones",
                                limpiarAlCerrar: true,
                                eliminarArchivo: true,
                                url: strRutaAplicacionMaster + "sistema/registro/regAsignar.aspx"
                            });
                        } else {
                            objQueryString = "";
                            $("#divRegistroConsultaDocumentos").cargarPopUpModal({
                                width: 900,
                                titulo: "Asignaciones",
                                limpiarAlCerrar: true,
                                eliminarArchivo: true,
                                url: strRutaAplicacionMaster +
                                    "sistema/registro/regAsignar.aspx?intIdExpe=" +
                                    intExpePivot + "&intIdMovi=" + intIdMovi + "&intIdAnoProc=" + intIdAnoProc + "&intIdDoc=" + intIdDoc + "&strIdDiv=divRegistroConsultaDocumentos&strCallBack=cargarConParametrosConsultaDoc&idAccion=4"
                            });
                        }
                        return false;
                    });
                };
                break;
            case 5:
                if (configurarAcciones(intIdAccionPivot, intIdEstado, intIdSub, strIdSubOfi, intIdSubAnt, strIdSubOfiAnt)) {
                    objPivot.removeClass("inActivo");
                    objPivot.addClass("activo");
                    objPivot.mouseover(function () {
                        $(this).effect('highlight', {
                            color: '#AACCFF'
                        }, 1000);
                    });
                    objPivot.click(function () {
                        $('#tblAccionesConsultaDoc').closest('div').dialog('close');
                        grabarMovimientoConsultaDoc(intExpePivot, intIdMovi, intIdSub, strIdSubOfi, intIdTipDoc, intNumDoc, intIdAccionPivot, "A", "");
                        return false;
                    });
                };
                break;
            case 6:
                if (configurarAcciones(intIdAccionPivot, intIdEstado, intIdSub, strIdSubOfi, intIdSubAnt, strIdSubOfiAnt)) {
                    if (noEsVacio(intIdEstadoAnt)) {
                        objPivot.removeClass("inActivo");
                        objPivot.addClass("activo");
                        objPivot.mouseover(function () {
                            $(this).effect('highlight', {
                                color: '#AACCFF'
                            }, 1000);
                        });
                        objPivot.click(function () {
                            $('#tblAccionesConsultaDoc').closest('div').dialog('close');
                            desHacerMovimientoConsultaDoc(intExpePivot, intIdMovi, intIdSub, strIdSubOfi, intIdTipDoc, intNumDoc, intIdAccionPivot, intIdEstado);
                            return false;
                        });
                    };
                };
                break;
            case 8:
                if (configurarAcciones(intIdAccionPivot, intIdEstado, intIdSub, strIdSubOfi, intIdSubAnt, strIdSubOfiAnt)) {
                    objPivot.removeClass("inActivo");
                    objPivot.addClass("activo");
                    objPivot.mouseover(function () {
                        $(this).effect('highlight', {
                            color: '#AACCFF'
                        }, 1000);
                    });
                    objPivot.click(function () {
                        $('#tblAccionesConsultaDoc').closest('div').dialog('close');
                        $("#divRegistroConsultaDocumentos").cargarPopUpModal({
                            width: 800,
                            titulo: "Registro de correspondencia",
                            limpiarAlCerrar: true,
                            eliminarArchivo: true,
                            url: strRutaAplicacionMaster + "sistema/registro/regDocumentoSalida.aspx?intIdExpe=" + intExpePivot + "&intIdMovi=" + intIdMovi + "&intIdMoviAnt=" + intIdMoviAnt + "&intIdDoc=" + intIdDoc + "&intIdAnoProc=" + intIdAnoProc + "&strIdDiv=divRegistroConsultaDocumentos&intIdAccion=8&strCallBack=cargarConParametrosConsultaDoc"
                        });
                        return false;
                    });
                };
                break;
            case 9:
                if (configurarAcciones(intIdAccionPivot, intIdEstado, intIdSub, strIdSubOfi, intIdSubAnt, strIdSubOfiAnt)) {
                    objPivot.removeClass("inActivo");
                    objPivot.addClass("activo");
                    objPivot.mouseover(function () {
                        $(this).effect('highlight', {
                            color: '#AACCFF'
                        }, 1000);
                    });
                    objPivot.click(function () {
                        $('#tblAccionesConsultaDoc').closest('div').dialog('close');
                        grabarMovimientoConsultaDoc(intExpePivot, intIdMovi, intIdSub, strIdSubOfi, intIdTipDoc, intNumDoc, intIdAccionPivot, "U", "");
                        recibirCargoCorrespondencia(intExpePivot, intIdMoviAnt);
                        return false;
                    });
                };
                break;
            default:
                scriptAccion = "";
                iconAccion = "";
                break;
        };
    });
};
/**
* Configura lista de acciones mostradas en la grilla de consulta de documentos.
* @param {integer} intIdAccion Identificador del control a validar (idAccion).
* @param {integer} intIdEstado Identificador del control a validar (idEstado).
* @param {integer} intIdMovi Identificador del control a validar (IdMovi).
* @param {integer} intIdSub Identificador del control a validar (Cod. Oficina).
* @param {string} strIdSubOfi Identificador del control a validar (Cod. SubOfi).
* @param {integer} intIdEstadoAnt Identificador del control a validar (Id Estado anterior).
* @param {integer} strIdSubOfiAnt Identificador del control a validar (Cod. subOficiAnterior).
* @return {Boolean} 
*/
function configurarAcciones(intIdAccion, intIdEstado, intIdSub, strIdSubOfi, intIdSubAnt, strIdSubOfiAnt) {
    if ((intIdSub == strIdSubMaster) && (strIdSubOfi == strIdSubOfiMaster)) {
        if (configuraSegunEstado(intIdEstado, intIdAccion)) {
            return true;
        } else {
            return false;
        };
    } else if ((intIdSubAnt == strIdSubMaster) && (strIdSubOfiAnt == strIdSubOfiMaster)) {
        if ((intIdEstado == 16) || (intIdEstado == 17) || (intIdEstado == 18)) {
            if (configuraSegunEstado(intIdEstado, intIdAccion)) {
                return true;
            } else {
                return false;
            };
        } /*else if ((intIdAccion == 1)) {
            return true;
        }*/ else {
            return false;
        };
    } else {
        return false;
    };
};
/**
* Confgura estado de acciones.
* @param {integer} intIdEstado Identificador del control (idEstado).
* @param {integer} intIdAccion Identificador del control a validar (idAccion).
* @return {Boolean}
*/
function configuraSegunEstado(intIdEstado, intIdAccion) {
    var len = lstAccionesEstadoConsultaDoc.length;
    for (var i = 0; i < len; i++) {
        if ((lstAccionesEstadoConsultaDoc[i].ID_ACCION == intIdAccion) && (lstAccionesEstadoConsultaDoc[i].ID_ESTADO == intIdEstado)) {
            return true;
        };
    };
    return false;
};
/**
* Verifica si el control ingresado es un numero positivo, de serlo retorna el numero.
* @param {integer} intNumero Identificador del control a validar (int Numero).
* @return {integer} intNumero Retrona 0 si es -1. 
*/
function mostrarNumeros(intNumero) {
    if (intNumero == -1) return 0;
    else return intNumero;
};
/**
* Verifica si el control ingresado no es nulo, de serlo retorna -1.
* @param {Object} intExpe Identificador del control a validar.
* @param {Object} intTupa Identificador del control a validar.
* @param {Object} intIdTable Identificador del control a validar.
* @return {string} strRequisitos Retrona -1 si es null. 
*/
function cargarDatosRequisitosRegExpe(intExpe, intTupa, intIdTable) {
    var objEnExpe = new Object();
    var objEnTupa = new Object();
    objEnExpe.ID_EXPE = validaNulosNumeros(intExpe);
    objEnTupa.ID_TUPA = validaNulosNumeros(intTupa);
    objEnExpe.enTupa = objEnTupa;
    var data = cargarDatosListaSimpleCache(objEnExpe, "wsRequisitos.asmx/traeListaExpeRequi", "objEnExpe", "", false);
    var strRequisitos = new String;
    for (var i = 0; i < data.length; i++) {
        strRequisitos = strRequisitos + '<tr><td><input name="cbRequisitosRegExpe" ' + ((data[i].FLG_VALOR == "1") ? "checked=checked" : "") + ' type="checkbox" value="' + data[i].ID_REQUI + '"/></td><td>(' + data[i].NUM_CANT + ') ' + data[i].DES_REQUI + '</td></tr>';
    };
    strRequisitos = "<table>" + strRequisitos + "</table>";
    $("#" + intIdTable).html(strRequisitos);
};
/**
* Funcion para la impresion de etiquetas.
* @param {integer} intIdExpe Identificador del control a validar (idExpediente).
* @param {string} strIdDiv Identificador del control a validar (Div).
* @param {string} strFechaHoy Identificador del control a validar (Fecha).
* @param {string} strHoraHoy Identificador del control a validar (Hora).
*/
function imprimirEtiquetas(intIdExpe, strIdDiv, strFechaHoy, strHoraHoy) {
    $.ajax({
        url: 'http://127.0.0.1:4444/api/generar/etiqueta',
        type: 'GET',
        async: true,
        data: {
            intIdExpe: intIdExpe,
            strLogin: srtLogin
        },
        success: function (respuesta) {

        },
        error: function (result) {
            mensajeSistema("divMensajeRegExpe", "1", result.statusText);
        }
    });
};

function imprimirEtiquetasCorrespondencia(intIdNotifica, strLoginParametro, strFechaHoy, strHoraHoy) {
    $.ajax({
        url: 'http://127.0.0.1:4444/api/generar/etiquetaCorrespondencia',
        type: 'GET',
        async: true,
        data: {
            intIdNotifica: intIdNotifica,
            strLogin: strLoginParametro
        },
        success: function (respuesta) {

        },
        error: function () {
            alert("Error");
        }
    });
};

/**
* Carga detalles de asignaciÛn.
* @param {integrer} intIdExpe Identificador del control a validar (idExpe).
* @param {integrer} intIdMovi Identificador del control a validar (idMovi).
* @param {string} strIdDiv Identificador del control a validar (Div).
*/
function cargarDetalleAsignacion(intIdExpe, intIdMovi, intIdAnio, strIdDiv, intIdSub, strIdSubOfi) {
    $("#" + strIdDiv).cargarPopUpModal({
        width: 1024,
        titulo: "Consulta Asignaciones",
        limpiarAlCerrar: true,
        //url: strRutaAplicacionMaster + "sistema/registro/consultaAsignaciones.aspx?intIdExpe=" + intIdExpe + "&intIdMovi=" + intIdMovi + "&strIdDiv=" + strIdDiv + "&idsub=" + intIdSub + "&idsubofi=" + strIdSubOfi
        url: strRutaAplicacionMaster + "sistema/busqueda/consultaAsignaciones.aspx?intIdExpe=" + intIdExpe + "&intIdMovi=" + intIdMovi + "&intIdAnio=" + intIdAnio + "&strIdDiv=" + strIdDiv + "&idsub=" + intIdSub + "&idsubofi=" + strIdSubOfi
    });
};
(function (jQuery) {
    /**
    * jQuery definition to anchor JsDoc comments.
    *  
    * @see http://jquery.com/
    * @name jQuery
    * @class jQuery Library
    */

    /**
    * Carga datos de json en un dropdownlist
    * @function
    * @param {integer} intIdExpe identificador de expediente.
    */
    jQuery.fn.cargarInformacionPublicaRegExpe = function (intIdExpe) {
        cargarDatosWebApi({
            parametros: intIdExpe,
            nombreObjeto: "intIdExpe",
            callBack: function (lstData) {
                if (noEsVacio(lstData.DES_TIP_INFO)) {
                    $("#lblDesObsLecturaRegExpe").append("<br><u>Tipo de informaci&oacute;n solicitada:</u> " + lstData.DES_TIP_INFO);
                };
                if (noEsVacio(objEnInfoPublica.DES_TIP_DENEGA)) {
                    $("#lblDesObsLecturaRegExpe").append("<br><u>Motivos por los cu&aacute;les se deneg&oacute; la informaci&oacute;n: </u> " + lstData.DES_TIP_DENEGA);
                };
            },
            url: "expe/traeListaSimpleInfoPublica"
        });
    };
})(jQuery);
/**
* Elimina movimiento de un Array.
* @param {integer} intExpe Identificador del control a validar.
* @param {integer} intIdMovi Identificador del control a validar.
* @return {Object} lstPivotMaster.
*/
function eliminaMovimientoArray(intIdExpe, intIdMovi) {
    for (var j = lstPivotMaster.length - 1; j >= 0; j--) {
        if ((lstPivotMaster[j].ID_EXPE == intIdExpe) && (lstPivotMaster[j].ID_MOVI == intIdMovi)) {
            lstPivotMaster.splice(j, 1);
        };
    };
};
/**
* Elimina movimiento de un Array Documento Salida.
* @param {integer} intExpe Identificador del control a validar.
* @param {integer} intTupa Identificador del control a validar.
* @return {Object} lstPivotMasterDocSalida. 
*/
function eliminaMovimientoDocSalidaArray(intIdExpe, intIdMovi) {
    for (var j = lstPivotMasterDocSalida.length - 1; j >= 0; j--) {
        if ((lstPivotMasterDocSalida[j].ID_EXPE == intIdExpe) && (lstPivotMasterDocSalida[j].ID_MOVI == intIdMovi)) {
            lstPivotMasterDocSalida.splice(j, 1);
        };
    };
};
/**
* Verifica el tipo de rol del usuario.
* @param {stirng} strRoles Lista de roles del usuario.
* @return {Boolean} boolRespuesta.
*/
function fnValidarRolesUsuario(strRoles) {
    var boolRespuesta = new Boolean();
    switch (strRoles) {
        case '1':
            if (strRolesMaster.search("1") > -1) {
                return boolRespuesta = true;
            };
            break;
        case '2':
            if (strRolesMaster.search("2") > -1) {
                return boolRespuesta = true;
            };
            break;
        case '3':
            if (strRolesMaster.search("3") > -1) {
                return boolRespuesta = true;
            };
            break;
        case '4':
            if (strRolesMaster.search("4") > -1) {
                return boolRespuesta = true;
            };
            break;
        case '5':
            if (strRolesMaster.search("5") > -1) {
                return boolRespuesta = true;
            };
            break;
        case '6':
            if (strRolesMaster.search("6") > -1) {
                return boolRespuesta = true;
            };
            break;
        case '1,2':
            if (strRolesMaster.search("1") > -1 && strRolesMaster.search("2") > -1) {
                return boolRespuesta = true;
            };
            break;
        case '1,4':
            if (strRolesMaster.search("1") > -1 || strRolesMaster.search("4") > -1) {
                return boolRespuesta = true;
            };
            break;
        default:
            boolPivot = false;
    };
};
/**
* Verifica si el expediente se encuentra en la lista.
* @param {integer} intIdExpe control a verificar (idExpe).
* @param {integer} intIdMovi Lista de roles del usuario (idMovi).
* @return {Boolean} lstPivotMaster.
*/
function buscarArray(intIdExpe, intIdMovi) {
    for (var j = 0; j < lstPivotMaster.length; j++) {
        if ((lstPivotMaster[j].ID_EXPE == intIdExpe) && (lstPivotMaster[j].ID_MOVI == intIdMovi)) {
            return true;
        };
    };
    return false;
};
/**
* Verifica si el expediente se encuentra en la lista.
* @param {integer} intIdExpe control a verificar (idExpe).
* @param {integer} intIdMovi Lista de roles del usuario (idMovi).
* @return {Boolean} lstPivotMasterDocSalida.
*/
function buscarArrayDocSalida(intIdExpe, intIdMovi) {
    for (var j = 0; j < lstPivotMasterDocSalida.length; j++) {
        if ((lstPivotMasterDocSalida[j].ID_EXPE == intIdExpe) && (lstPivotMasterDocSalida[j].ID_MOVI == intIdMovi)) {
            return true;
        };
    };
    return false;
};

function cargarPDF(strRuta, strIdDiv) {
    var byteArray = [];
    var xhr = new XMLHttpRequest();
    xhr.open("GET", strRuta, false);
    xhr.overrideMimeType('text\/plain; charset=x-user-defined');
    xhr.onload = function (oEvent) {
        for (var i = 0; i < xhr.response.length; ++i) {
            byteArray.push(xhr.response.charCodeAt(i) & 0xff)
        };
    };
    xhr.send();
    PDFJS.getDocument(new Uint8Array(byteArray)).then(function (pdf) {
        pdf.getPage(1).then(function (page) {
            var scale = 0.75;
            var viewport = page.getViewport(scale);
            var canvas = document.createElement('canvas');
            var objDiv = document.getElementById(strIdDiv);
            objDiv.appendChild(canvas)
            var context = canvas.getContext('2d');
            canvas.height = viewport.height;
            canvas.width = viewport.width;
            var renderContext = {
                canvasContext: context,
                viewport: viewport
            };
            page.render(renderContext);
        });
    });
};

function cargarSubidaArchivos(strIdDiv) {
    //$("#" + strIdDiv).load(strRutaAplicacionMaster + "resource/archivos/upload.html");
    $("#" + strIdDiv).append("<form id='frmUploadContent' method='post' enctype='multipart/form-data' action=''></form>");
    $("#frmUploadContent").append("<input type='file' id='fuUploadContent' name='fuUploadContent' title='Seleccione el archivo' />");
};

function cargarRegDocConsultaDoc(intIdExpe, intIdMovi, intIdAnoProc, intIdDoc, strIdDiv, strFunction) {
    //    $("#" + strIdDiv).load(strRutaAplicacionMaster + "sistema/registro/regDocumento.aspx?intIdExpe=" + intIdExpe + "&intIdMovi=" + intIdMovi + "&intIdDoc=" + intIdDoc + "&intIdAnoProc=" + intIdAnoProc + "&strIdDiv=divRegistroConsultaDocumentos", function () {
    //        var win = Ext.create('widget.window', {
    //            title: 'Registro de Documentos',
    //            header: {
    //                titlePosition: 1,
    //                titleAlign: 'center'
    //            },
    //            closable: true,
    //            closeAction: 'hide',
    //            modal: true,
    //            width: 1020,
    //            minWidth: 350,
    //            height: 800,
    //            contentEl: strIdDiv,
    //            layout: {
    //                type: 'border',
    //                padding: 5
    //            }
    //        });
    //        win.show();

    //    });
    $("#" + strIdDiv).cargarPopUpModal({
        width: 1200,
        titulo: "Registro de Proyectos",
        limpiarAlCerrar: true,
        onClose: function () {
            if (noEsVacio(strFunction)) window[strFunction]();
        },
        url: strRutaAplicacionMaster + "sistema/registro/regDocumento.aspx?intIdExpe=" + intIdExpe + "&intIdMovi=" + intIdMovi + "&intIdDoc=" + intIdDoc + "&intIdAnoProc=" + intIdAnoProc + "&strIdDiv=" + strIdDiv
    });
};

function cargarComboDocumentos(strIdCombo, lstData) {
    var strHTML = new String();
    var len = lstData.length;
    strHTML += "<option value=''>--Seleccione el documento a derivar--</option>";
    strHTML += "<optgroup label='Documentos Anteriores'>";
    for (var i = 0; i < len; i++) {
        if (lstData[i].enTipDoc.FLG_PROYECTO == 0) {
            strHTML = strHTML + "<option data-field=" + lstData[i].enTipDoc.ID_TIP_DOC + " value='" + lstData[i].enTipDoc.ID_DOC + "'>" + lstData[i].enTipDoc.DES_DOC + " (" + new String(validaNulosJSON(lstData[i].enTipDoc, "DESCRIPCION")).substr(0, 100) + "...)</option>";
        };
    };
    strHTML += "<optgroup label='Proyectos'>";
    for (var i = 0; i < len; i++) {
        if (lstData[i].enTipDoc.FLG_PROYECTO == 1) {
            strHTML = strHTML + "<option data-field=" + lstData[i].enTipDoc.ID_TIP_DOC + " value='" + lstData[i].enTipDoc.ID_DOC + "'>" + lstData[i].enTipDoc.DES_DOC + " (" + new String(validaNulosJSON(lstData[i].enTipDoc, "DESCRIPCION")).substr(0, 100) + "...)</option>";
        };
    };
    strHTML += "</optgroup>";
    strHTML += "</optgroup>";
    $("#" + strIdCombo).html(strHTML);
};

function isValidDate(date) {
    var matches = /^(\d{2})[-\/](\d{2})[-\/](\d{4})$/.exec(date);
    if (matches == null) return false;
    var d = matches[1];
    var m = matches[2] - 1;
    var y = matches[3];
    var composedDate = new Date(y, m, d);
    return composedDate.getDate() == d &&
        composedDate.getMonth() == m &&
        composedDate.getFullYear() == y;
};

function traeExtensionesPermitidas() {
    return ["doc", "jpeg", "png", "gif", "docx", "pdf", "xls", "xlsx", "tiff"];
};

function validaExtensionArchivo(strNombreArchivo) {
    var boolValor = false;
    var strExtension = strNombreArchivo.substring(strNombreArchivo.lastIndexOf('.') + 1).toLowerCase();
    var intIndex = $.inArray(strExtension, traeExtensionesPermitidas());
    boolValor = !(intIndex > -1);
    return boolValor;
};

(function (jQuery) {
    /**
    * Levanta una ventana modal optimizada
    * @function
    * @param {Object} objParametros Par·metros.
    * @param {number} objParametros.width Ancho.
    * @param {string} objParametros.titulo TÌtulo de la ventana modal.
    * @param {number} objParametros.url Url que se cargar· en la ventana modal.
    * @param {boolean} objParametros.limpiarAlCerrar Si el valor es true se borra el contenido dentro de la ventana modal.
    * @memberOf jQuery
    */
    jQuery.fn.adjuntosPlugin = function (objParametros) {
        var defaults = {
            idExpe: "",
            idMovi: "",
            idDoc: -1,
            accion: "cargar",
            idDivPopUp: "",
            callBack: "",
            callBackGrabar: "",
            preview: true,
            botonEliminar: true
        };
        defaults = $.extend(defaults, objParametros);
        var objDiv = $(this);
        switch (defaults.accion) {
            case "cargar":
                var strHtml = "<input id='tbAdjuntarArchivos' name='tbAdjuntarArchivos' type='button' value='Adjuntar'/>";
                if (defaults.botonEliminar) strHtml += "<img id='imgEliminarArchivos' alt='Eliminar' src='resource/img/icon_delete_file.gif' style='display:none;' title='Quitar' class='imagenBoton'/>";
                strHtml += "<span id='lblNombreArchivos' style='padding-left: 5px; padding-right: 5px; font-weight: bold;'></span>";
                if (defaults.preview) {
                    strHtml += "<img id='imgDescargarArchivos' alt='Descargar' src='resource/imagenes/ico_download.png' style='display:none;' title='Descargar' class='imagenBoton' />";
                };
                strHtml += "<input type='hidden' id='hfIdContentArchivos' name='hfIdContentArchivos' />";
                objDiv.html(strHtml);
                $("#tbAdjuntarArchivos").click(function () {
                    $("#" + defaults.idDivPopUp).cargarPopUpModal({
                        width: 400,
                        titulo: "Registro de Documentos",
                        limpiarAlCerrar: true,
                        url: strRutaAplicacionMaster + "sistema/publico/subidaArchivos.aspx?idExpe=" + defaults.idExpe + "&idMovi=" + defaults.idMovi +
                            "&idDiv=" + defaults.idDivPopUp + "&callBack=" + defaults.callBack
                    });
                });
                $("#imgEliminarArchivos").click(function () {
                    eliminarArchivoAlfresco();
                });
                $("#imgDescargarArchivos").click(function () {
                    $("#" + defaults.idDivPopUp).cargarPopUpModal({
                        width: 800,
                        titulo: "Consulta de Documentos",
                        limpiarAlCerrar: true,
                        url: strRutaAplicacionMaster + "sistema/registro/regDocumento.aspx?intIdContent=" + $("#hfIdContentArchivos").val() + "&strIdDiv=" + objDiv.attr("id")
                    });
                    cargarVisorDocumento("", $("#hfIdContentArchivos").val(), "attachement");
                });
                break;
            case "grabar":
                if (noEsVacio($("#hfIdContentArchivos").val())) {
                    var objEnDocRev = new Object();
                    objEnDocRev.ID_DOC = defaults.idDoc;
                    objEnDocRev.ID_CONTENT = $("#hfIdContentArchivos").val();
                    objEnDocRev.DES_OBS = $("#lblNombreArchivos").html();
                    objEnDocRev.FLG_EST = 1;
                    objEnDocRev.OPR = "I";
                    actualizarDatosWebApi({
                        parametros: objEnDocRev,
                        nombreObjeto: "objEnDocRev",
                        url: "docRev/actualizar",
                        divMensaje: "",
                        callBack: function (objError) {
                            $("#hfIdContentArchivos").val("");
                            if (noEsVacio(defaults.callBackGrabar)) window[defaults.callBackGrabar]();
                        }
                    });
                };
                break;
            case "eliminar":
                eliminarArchivoAlfresco();
                break;
        };

    };
})(jQuery);

function cargarVisorDocumento(strIdFrame, intIdContent, strIdTipo) {
    var strTicket = new String();
    var url = strServidorAlfresco + "alfresco/service/api/node/content/workspace/SpacesStore/" + intIdContent.replace(':/', '').split(";")[0];
    if ("inline" != strIdTipo) {
        url += "?a=true&alf_ticket=" + $("#hfIdTicketRegDoc").val();
        window.open(url, "Ver Archivo");
    } else {
        url += "?alf_ticket=" + $("#hfIdTicketRegDoc").val();
        if (noEsVacio(strIdFrame)) $("#" + strIdFrame).attr("src", url);
    };
    //    if ("inline" == strIdTipo) {
    //        if (noEsVacio(strIdFrame)) $("#" + strIdFrame).attr("src", url);
    //    } else {
    //        if (noEsVacio(strIdFrame)) $("#" + strIdFrame).attr("src", url); else window.open(url, "Ver Archivo");
    //    };
    return url;
};

function eliminarArchivoAlfresco() {
    if (noEsVacio($("#hfIdContentArchivos").val())) {
        var objEnContent = new Object();
        objEnContent.ID_CONTENT = $("#hfIdContentArchivos").val();
        actualizarDatosWebApi({
            parametros: objEnContent,
            nombreObjeto: "objEnContent",
            url: "content/eliminarArchivoAlfresco",
            divMensaje: "divMensajeMVDoc",
            callBack: function (objError) {
                $("#hfIdContentArchivos").val("");
                $("#lblNombreArchivos").html("");
                $("#imgEliminarArchivos").hide();
                $("#imgDescargarArchivos").hide();
            }
        });
    };
};

/**
* Reemplazar caracteres
* @function
* @param {oldValue} oldValue car·cter que se va reemplazar.
* @param {newValue} newValue car·cter que va reemplazar.
*/
function replaceAll(value, oldValue, newValue) {
    if (!noEsVacio(newValue)) newValue = new String();
    if (noEsVacio(value) && value.indexOf(oldValue) > -1) {
        value = value.split(oldValue).join(newValue);
    };
    return value;
};

/*function fnVerificarSiEstaAsignadoIterativo(lstDerivar) {
    cargarDatosWebApi({
        parametros: lstDerivar,
        nombreObjeto: "lstDerivar",
        url: "asigna/traeEstExpeAsignadoIterativo",
        callBack: function (data) {
            console.log(data);
        }
    });
};*/

function fnVerificarSiEstaAsignado(objParametros) {
    var defaults = {
        ID_EXPE: null,
        ID_MOVI: null,
        arrDerivar: "",
        callBack: function () { }
    };
    var defaults = $.extend(defaults, objParametros);
    var objEnAsigna = new Object();
    var objEnEstado = new Object();    
    objEnEstado.ID_ESTADO = 10;
    objEnAsigna.enEstado = objEnEstado;
    if (noEsVacio(defaults.arrDerivar)) {
        //En la concatenaciÛn, deberia haberse considerado el movimiento ID_EXPE + '|' + ID_MOVI, evaluar para actualizar el procedure
        objEnAsigna.DES_OBS = defaults.arrDerivar;
        objEnAsigna.OPR = 2;
    } else {
        if (noEsVacio(defaults.ID_EXPE)) {
            objEnAsigna.ID_EXPE = defaults.ID_EXPE;
        };
        if (noEsVacio(defaults.ID_MOVI)) {
            objEnAsigna.ID_MOVI = defaults.ID_MOVI;
        };
        objEnAsigna.OPR = 1;
    };
    var bool = new Boolean();
    var result = cargarDatosWebApi({
        parametros: objEnAsigna,
        nombreObjeto: "objEnAsigna",
        url: "asigna/traeEstExpeAsignado",
        callBack: function (data) {
            if (data[0].CANTIDAD > 0) {
                bool = true;
            } else {
                bool = false;
            };
            defaults.callBack(bool);
        }
    });

};




(function ($) {
    $.fn.cargaPopUpAlert = function (objParametros) {
        var defaults = {
            width: "auto",
            titulo: "Alerta de notificaci\u00F3n",
            estilo: false,
            fontSize: "11px",
            mensaje: "",
            modal: true,
            resizable: false,
            draggable: true,
            callBack: function () { }
        };
        defaults = $.extend(defaults, objParametros);
        var objDiv = $(this);
        if (noEsVacio(defaults.mensaje.length)) {
            var iconMsg = "<p><span class='ui-icon ui-icon-info' style='float: left; margin-right: .3em'></span>" + defaults.mensaje + "</p>";
            defaults.mensaje = "<div class='ui-corner-all' style='padding: 0 .7em'>" + iconMsg + "</div>";
        };
        objDiv.empty().removeAttr("class").html("<div class='ui-widget'>" + defaults.mensaje + "<div>").addClass("formularioModal");
        objDiv.dialog({
            autoOpen: true,
            modal: defaults.modal,
            height: "auto",
            minHeight: "auto",
            dialogClass: "alert",
            width: defaults.width,
            draggable: defaults.draggable,
            resizable: defaults.resizable,
            closeOnEscape: false,
            title: defaults.titulo,
            autoResize: true,
            open: function (event, ui) {
                var objContent = $(this).closest(".ui-dialog");
                if (defaults.titulo == "") {
                    objContent.find(".ui-dialog-titlebar").hide();
                };
                objContent.find(".ui-dialog-titlebar-close").remove();
                $("button:contains('Aceptar')", objContent).css({
                    fontSize: defaults.fontSize
                });
                if (defaults.estilo) $("button:contains('Aceptar')", objContent).addClass("ui-button ui-corner-all ui-widget").prepend("<span class='ui-button-icon ui-icon ui-icon-check'><span class='ui-button-icon-space'></span>");
            },
            buttons: {
                "Aceptar": function () {
                    $(this).empty().dialog("close");
                }
            },
            close: function (event, ui) {
                defaults.callBack();
                $(this).empty().dialog("destroy");
            }
        });
    };
})(jQuery);


(function ($) {
    $.fn.cargaPopUpConfirm = function (objParametros) {
        var defaults = {
            width: "auto",
            titulo: "Alerta de confirmaci\u00F3n",
            mensaje: "",
            fontSize: "11px",
            //posicion: "center",
            strOpcion: "2",
            modal: true,
            resizable: false,
            draggable: true,
            valorInicial: false,
            callBack: function () { }
        };
        defaults = $.extend(defaults, objParametros);
        var objDiv = $(this);
        if (noEsVacio(defaults.strOpcion)) {
            var iconMsg = new String();
            defaults.mensaje = "<span>" + defaults.mensaje + "</span>";
            if (defaults.strOpcion == "1") {
                iconMsg = "<p><span class='ui-icon ui-icon-alert' style='float: left; margin-right: .3em'></span>" + defaults.mensaje + "</p>";
                defaults.mensaje = "<div class='ui-state-error ui-corner-all' style='padding: 0 .7em'>" + iconMsg + "</div>";
            } else if (defaults.strOpcion == "2") {
                iconMsg = "<p><span class='ui-icon ui-icon-info' style='float: left; margin-right: .3em'></span>" + defaults.mensaje + "</p>";
                defaults.mensaje = "<div class='ui-corner-all' style='padding: 0 .7em'>" + iconMsg + "</div>"; /*ui-state-highlight*/
            };
            defaults.mensaje = "<div class='ui-widget'>" + defaults.mensaje + "<div>";
        };
        objDiv.empty().removeAttr("class").html(defaults.mensaje).addClass("formularioModal");
        objDiv.dialog({
            autoOpen: true,
            modal: defaults.modal,
            height: "auto",
            minHeight: "auto",
            width: defaults.width,
            draggable: defaults.draggable,
            resizable: defaults.resizable,
            closeOnEscape: true,
            title: defaults.titulo,
            autoResize: true,
            open: function (event, ui) {
                var objDivTitle = $(this).closest(".ui-dialog");
                if (!noEsVacio(defaults.titulo)) {
                    objDivTitle.find(".ui-dialog-titlebar").hide();
                };
                objDivTitle.find(".ui-dialog-titlebar-close").remove();
                $("button", objDivTitle).css({
                    fontSize: defaults.fontSize
                });
            },
            buttons: {
                "Aceptar": function () {
                    //defaults.valorInicial = !defaults.valorInicial;
                    defaults.valorInicial = true;
                    $(this).empty().dialog("close");
                },
                "Cancelar": function () {
                    $(this).empty().dialog("close");
                }
            },
            close: function (event, ui) {
                defaults.callBack(defaults.valorInicial);
                $(this).empty().dialog("destroy");
            }
        });
        //objDiv.dialog("open");
    };
})(jQuery);


var normalize = (function () {
    var from = "√¿¡ƒ¬»…À ÃÕœŒ“”÷‘Ÿ⁄‹€„‡·‰‚ËÈÎÍÏÌÔÓÚÛˆÙ˘˙¸˚—Ò«Á",
        to = "AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuuNnCc",
        mapping = {};

    for (var i = 0, j = from.length; i < j; i++)
        mapping[from.charAt(i)] = to.charAt(i);

    return function (str) {
        var ret = [];
        for (var i = 0, j = str.length; i < j; i++) {
            var c = str.charAt(i);
            if (mapping.hasOwnProperty(str.charAt(i)))
                ret.push(mapping[c]);
            else
                ret.push(c);
        }
        //return ret.join( '' ).replace( /[^-A-Za-z0-9]+/g, '-' ).toLowerCase();
        return ret.join('').replace(/[^-A-Za-z0-9]+/g, '%').toUpperCase();
    }

})();

$(document).on({
    ajaxStart: function () {
        $("#divDialogAjaxStart").empty().removeAttr("class").addClass("modalProceso").show();
    },
    ajaxStop: function () {
        $("#divDialogAjaxStart").empty().removeAttr("class").hide();
    }
});

(function (jQuery) {
    jQuery.fn.cargarGrafico = function (objParametros) {
        var defaults = {
            myData: [],
            texto: "",
            valor: "",
            tipo: "bar",
            titulo: "",
            unidad: "",
            prefijo: "",
            intAncho: 210,
            intAlto: null,
            click: function() {},
            dblclick: function() {}
        };
        defaults = $.extend(defaults, objParametros);
        var arrCategorias = [];
        var arrData = [];
        for (var i = 0; i < defaults.myData.length; i++) {
            var data = defaults.myData[i];
            arrCategorias.push(defaults.prefijo + data[defaults.texto]);
            arrData.push(data[defaults.valor]);
        };
        /*console.log(arrCategorias);
        console.log(arrData);*/
        var chart = new Highcharts.Chart({
                chart: {
                    renderTo: $(this).prop("id"),
                    type: defaults.tipo,
                    height: defaults.intAlto, width: defaults.intAncho,
                    backgroundColor: '#F4F2EC'
                },
                title: {
                    text: defaults.titulo,
					style: { fontFamily: 'Verdana', fontSize: '9px', fontWeight: 'bold' }
                },
                subtitle: {
                    text: null
                },
                xAxis: {
                    categories: arrCategorias,                    
                    title: {
                        text: null
                    }, 
                    labels: { 
                        rotation: -35,
                        events: {
                            dblclick: function () {
                                //console.log("dblclick xAxis");
                                defaults.dblclick(this.value);
                            },
                            click: function () {
                                //console.log("click xAxis");
                                defaults.click(this.value);
                            }
                        },
                        style: { fontFamily: 'Verdana', fontSize: '9px', cursor: 'pointer'} 
                    }
                },
                yAxis: {
                    min: 0,
                    stackLabels: {
                        enabled: (noEsVacio(defaults.unidad) ?  true : false),
                        style: {
                            fontWeight: 'bold',
                            color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                        }
                    },
                    //allowDecimals: false,
                    title: {
                        text: null
                    }, style: { fontFamily: 'Verdana' }
                },
                tooltip: {
                    formatter: function () {
                        return '<b>' +
                            this.x + '</b>: ' + this.y + (noEsVacio(defaults.unidad) ?  " " + defaults.unidad : "");
                    }, enabled: (noEsVacio(defaults.unidad) ?  true : false)
                },
                plotOptions: {
                    bar: {
                        dataLabels: {
                            enabled: true,
                            textShadow: false,
                            style: { fontFamily: 'Verdana', fontSize: '8px'} 
                        }
                    },
                    column: {
                        stacking: 'normal',
                        dataLabels: {
                            enabled: false,
                            color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'gray'
                        }
                    },
                    series: {
                        events: {
                            dblclick: function () {
                                //console.log("dblClick series");   
                                //defaults.dblclick(this.points[this.index].category);          
                            },
                            click: function () {
                                //console.log("click series");
                                //defaults.click(this.points[this.index].category);
                            }
                        }                                                
                    }
                },
                legend: {
                    enabled: false
                },
                credits: {
                    enabled: false
                },
                series: [{
                    name: defaults.titulo,
                    data: arrData
                }]
            });
    };
})(jQuery);

function fnCargarAsignaResumen(roles, strIdSub, strIdSubOfi, strAnio) {
    $("#divResumenAsignaciones").hide();
    if (roles.search("1") > -1 || roles.search("2") > -1 || roles.search("4") > -1 || roles.search("6") > -1) {
        $("#divResumenAsignaciones").show();
        var findUsuByLog = function (data, value) {
            var intIdUsu = new Number();
            for (var i = 0; i < data.length; i++) {
                if (data[i].COD_LOG == value) {
                    intIdUsu = data[i].ID_USU_FUNC;
                    break;
                }
            }
            return intIdUsu;
        };
        var objEnAsigna = new Object();
		objEnAsigna.enUsu = new Object();
		objEnAsigna.enEstorg = new Object();
		//objEnAsigna.enMovi = new Object();
        objEnAsigna.enEstorg.ID_SUB = strIdSub;
        objEnAsigna.enEstorg.ID_SUBOFI = strIdSubOfi;
		objEnAsigna.enEstorg.DES_SUBOFI = encodeURIComponent($("#ddlDesplazamientoMaster option:selected").attr("title"));
		if (noEsVacio(strAnio)) objEnAsigna.ANIO = strAnio;
        objEnAsigna.OPR = 1;
		
        if (noEsVacio(objEnAsigna.enEstorg.DES_SUBOFI)) {
			$("#divResumenAsignaciones div:first").html("Resumen de Pendientes " + $("#ddlDesplazamientoMaster option:selected").text());			
		};
        
        cargarDatosWebApi({
            parametros: objEnAsigna,
            nombreObjeto: "objEnAsigna",
            callBack: function (lstData) {
                if(lstData.length > 0 ){
                	    $("#divResumenAsignaciones").show();
                        $("#divResumenMaster").cargarGrafico({
                            titulo: "Expedientes Asignados En Espera",
                            texto: "COD_LOG",
                            valor: "CANTIDAD",
                            myData: lstData,
                            dblclick: function (val) {							                							
                                objEnAsigna.enUsu.CodLog = encodeURIComponent(val);							
                                var intIdUsu = findUsuByLog(lstData, objEnAsigna.enUsu.CodLog);
                                if (noEsVacio(intIdUsu)) {
                                    var strUrl = "sistema/busqueda/consultaAsignaciones.aspx?intIdUsu=" + intIdUsu + "&idsub=" + strIdSub + "&idsubofi=" + strIdSubOfi + "&dessubofi=" + objEnAsigna.enEstorg.DES_SUBOFI + "&codlog=" + objEnAsigna.enUsu.CodLog + "&intIdEstado=10" + "&strAnio=" + strAnio;
                                    cargarContenidoEnDiv("divContenidoMaster", strRutaAplicacionMaster + strUrl, "Consulta de Documentos");
                                }
                            }
                        });
                } else {
                	    $("#divResumenMaster").removeAttr("data-highcharts-chart").empty();
                	    $("#divResumenAsignaciones").hide();
                }
            },
            url: "asigna/traeEstExpeAsignadoResumen"
        });
    };
}

function cargarDatosRest(objCargaDatos) {
    var defaults = {
        parametros: {},
        nombreObjeto: "",
        cache: false,
        async: true,
        callBack: function () { },
        url: "",
        divPadre: "",
        divMensaje: "",
        strRuta: ""
    };
    var defaults = $.extend(defaults, objCargaDatos);
    var strParametros = new String();
    if (noEsVacio(defaults.nombreObjeto)) strParametros = JSON.stringify(defaults.parametros); else strParametros = "";
    if (noEsVacio(defaults.divPadre)) abrirDivEspera(defaults.divPadre);
    var result = $.ajax({
        type: "POST",
        url: ((noEsVacio(defaults.strRuta)) ? defaults.strRuta : strRutaAplicacionMaster) + defaults.url,
        data: strParametros,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: defaults.async,
        success: function (msg) {
            lstData = (typeof msg == "string") ? eval(msg) : msg;
            if (noEsVacio(defaults.divPadre)) {
                var objPadre = $("#" + defaults.divPadre);
                if (lstData.length > 0) {
                    $("#" + defaults.divMensaje).html("");
                    $("#" + defaults.divMensaje).removeClass();
                }
                else {
                    mensajeSistema(defaults.divMensaje, "2", "No se encontraron datos para el criterio de b&uacute;squeda seleccionado", "", "");
                };
                cerrarDivEspera(defaults.divPadre);
            };
            defaults.callBack(lstData);
        },
        error: function (result) {
            mensajeSistema(defaults.divMensaje, "1", result.statusText, "");
        }
    });
};
function llenarAnioCombo(idCombo, minAnio, maxAnio, primerElemento, intOpr) {

    var strHtml = "";
    var current = (noEsVacio(maxAnio) ? maxAnio : (new Date()).getFullYear());
    var i = 1;
    if (primerElemento || typeof primerElemento === "undefined") {
        if (noEsVacio(primerElemento)) {
            strHtml += "<option value='' title='Seleccione aÒo' style='cursor: pointer'>" + primerElemento + "</option>";
        } else {
            strHtml += "<option value='' title='Seleccione aÒo' style='cursor: pointer'>- Todos -</option>";
        }
    } else {
        strHtml += "<option value='' title='Seleccione aÒo' style='cursor: pointer'>- Seleccione -</option>";
    };
    if (!noEsVacio(intOpr) || intOpr == 1) {
        for (i = current; i >= minAnio; i--) {
            strHtml += "<option value='" + i + "' title='" + i + "' style='cursor: pointer'>" + i + "</option>";
        };
    } else {
        for (i = minAnio; i <= current; i++) {
            strHtml += "<option value='" + i + "' title='" + i + "' style='cursor: pointer'>" + i + "</option>";
        };
    }
    $("#" + idCombo).html(strHtml);
    if (primerElemento || typeof primerElemento === "undefined") {
        if (noEsVacio(primerElemento)) {
            $("#" + idCombo).val(current)
        };
    } else {
        $("#" + idCombo).val("")
    };
};

(function ($) {
    /**
    * Serializa los controles html a un objeto json seg˙n el atributo data-model
    * @memberof application
    */
    $.fn.toSerialize = function () {
        var obj = new Object();
        var traeValorInput = function (sender) {
            var pivot;
            var value = $.trim($(sender).val());
            var formatter = $(sender).data("formatter");
            if (noEsVacio(formatter)) {
                formatter = formatter.toLowerCase();
            }
            switch (formatter) {
                case "date":
                    if (value.indexOf("/") != -1 && traeFechaString(value, false)) {
                        pivot = traeFechaString(value, false);                        
                    }
                    break;
                case "int":
                    if ($.isNumeric(value)) {
                        pivot = parseInt(value);                        
                    }
                    break;
                case "decimal":
                    if ($.isNumeric(value)) {
                        pivot = parseFloat(value);
                    };
                    break;
                default:
                    pivot = value;
            }
            return pivot;
        }
        $(this).find(':input').each(function () {
            var type = this.type.toLowerCase();
            var rel = $(this).data("model");
            if (noEsVacio(rel)) {
                switch (type) {
                    case "radio":
                        if ($(this).is(':checked')) {
                            obj[rel] = traeValorInput(this);
                        }
                        break;
                    default:
                        if (noEsVacio($(this).val())) {
                            obj[rel] = traeValorInput(this);
                        };
                }
            };
        });
        return obj;
    };
})($);

(function ($) {
    $.fn.findByValue = function (val) {
        return $("option[value='" + val + "']", this).length !== 0;
    };
})($);

function validarControlesRoles(objParametros) {
    var defaults = {
        strRoles: "",
        callBack: function () { }
    }
    defaults = $.extend(defaults, objParametros);
    var bool = new Boolean();
    bool = false;
    
    var arrCodigoDocu = new Array();
    if (noEsVacio(defaults.strRoles)) {
        if (defaults.strRoles.indexOf(",") > -1) {
            arrCodigoDocu = defaults.strRoles.split(",");
        } else {
            arrCodigoDocu.push(defaults.strRoles);
        }
        if (arrRolesMaster.length > 0) {
            for (var i = 0; i < arrCodigoDocu.length; i++) {
                var idrol = arrCodigoDocu[i].trim();
                if ($.inArray(idrol, arrRolesMaster) > -1) {
                    bool = true;
                    defaults.callBack(idrol);
                    break;
                }
            }
        }
    }
    return bool;
};
