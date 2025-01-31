var strCallBackTramiteGestionDocumento = $("#derivarExpe_callback").val();
$(document).ready(function () {

    derivarExpe_cargarAutoComplete();
    derivarExpe_cargarTratamiento();
    derivarExpe_cargarPrioridad();
    derivarExpe_grillaDerivacion();
    $("#derivarExpe_btnCancelar").click(function () {
        var objResultCallBack = new Object();
        objResultCallBack.IdTipo = 2;
        objResultCallBack.Valor1 = 1;
        //        if (typeof strFlgEmbed != 'undefined' && strFlgEmbed == "1") {
        //            
        //            //            parent.postMessage(objResultCallBack, "*");
        //            window[strCallBackTramiteGestionDocumento](objResultCallBack);
        //        }
        window[strCallBackTramiteGestionDocumento](objResultCallBack);
        $("#frmDerivarExpediente").closest("div[role='dialog']").modal("hide");
        return false;
    })
    $("#derivarExpe_ddlPrioridad").change(function () {
        if (noEsVacio($(this).val())) {
            $("#derivarExpe_tbPlazo").val($("#derivarExpe_ddlPrioridad option:selected").attr("data-field"));
        }
    })
    $("#derivarExpe_Insertar").click(function () {
        var objParm = { ID_SUB: $("#derivarExpe_destinoIdSub").val(),
            ID_SUBOFI: $("#derivarExpe_destinoIdSubOfi").val(),
            DES_SUBOFI: $("#derivarExpe_destinoDesSubOfi").val()
        }
        derivarExpe_agregarDestinatario(objParm);
        return false;
    })
    $("#derivarExpe_btnGuardar").cargaPopOverConfirm({
        mensaje: "¿Desea derivar la información ingresada?",
        strIdDiv: "body",
        posicion: "top"
    });

})
function derivarExpe_cargarAutoComplete() {
    $("#derivarExpe_tbDesOficina").attr("placeholder", "Escriba aqui el nombre de la Oficina...").typeahead("destroy").typeahead({
        source: function (query, process) {
            if (noEsVacio(query)) {
                $("#derivarExpe_tbDesOficina").css('border', '');
                var objEnEstorg = new Object();
                var strRequest = $.trim(query).replace(/\ /g, "%");
                //objEnEstorg.OPR = "5";
                objEnEstorg.ID_SUB = $("#derivarExpe_idSub").val();
                //10/02/2020 FORTIZ
                objEnEstorg.ID_SUBOFI = $("#derivarExpe_idSubOfi").val();
                objEnEstorg.DES_SUBOFI = strRequest;
                cargarDatosWebApi({
                    parametros: objEnEstorg,
                    nombreObjeto: "objEnEstorg",
                    callBack: function (data) {
                        if (noEsVacio(data.length)) {
                            process($.map(data.slice(0, 10), function (item) {
                                return {
                                    name: item.ABR_SUBOFI + " - " + item.DES_SUBOFI,
                                    desSubOfi: item.DES_SUBOFI,
                                    idSub: item.ID_SUB,
                                    idSubOfi: item.ID_SUBOFI
                                }
                            }));
                        };
                    },
                    url: "Gestion/ListarOficinaReglas",
                    strRuta: strRutaAplicacionMaster
                });
            };
        },
        autoSelect: true,
        minLength: 2,
        highlight: true,
        items: 5,
        limit: 5,
        templates: {
            empty: '<div class="empty-message">Sin coincidencias</div>'
        },
        classNames: {
            input: 'Typeahead-input',
            hint: 'Typeahead-hint',
            selectable: 'Typeahead-selectable'
        }
    }).change(function () {
        var rowKey = $("#derivarExpe_tbDesOficina").typeahead("getActive");
        if (rowKey) {
            if (rowKey.name == $("#derivarExpe_tbDesOficina").val()) {
                $("#derivarExpe_destinoIdSub").val(rowKey.idSub);
                $("#derivarExpe_destinoIdSubOfi").val(rowKey.idSubOfi);
                $("#derivarExpe_destinoDesSubOfi").val(rowKey.desSubOfi);                
            } else {
                // This means it is only a partial match, you can either add a new item
                // or take the active if you don't want new items
            }
        } else {
            // Nothing is active so it is a new value (or maybe empty value)
        }
    });
}
function derivarExpe_cargarTratamiento() {
    var objEn = new Object();
    cargarDatosWebApi({
        parametros: objEn,
        nombreObjeto: "objEn",
        callBack: function (lstData) {
            $("#derivarExpe_ddlTratamiento").cargarDatosCombo({
                data: lstData,
                valor: "ID_TRATA",
                texto: "DES_TRATA",
                valorInicial: true
            });
        },
        url: "Gestion/traeListaTrata",
        strRuta: strRutaAplicacionMaster
    });
}
function derivarExpe_cargarPrioridad() {
    var objEn = new Object();
    cargarDatosWebApi({
        parametros: objEn,
        nombreObjeto: "objEn",
        callBack: function (lstData) {
            $("#derivarExpe_ddlPrioridad").cargarDatosCombo({
                data: lstData,
                valor: "ID_PRIORI",
                texto: "DES_PRIORI",
                dataField: "PLAZO",
                valorInicial: true
            });            
        },
        url: "Gestion/traeListaPriori",
        strRuta: strRutaAplicacionMaster
    });
}
function derivarExpe_agregarDestinatario(objData) {
    if (derivarExpe_buscarOficina(objData.ID_SUB)) {
        notificacionSistema({
            intOpcion: 1,
            strMensaje: "<i class='fa fa-warning'></i>&nbsp;La oficina ya está ingresada"
        });
        return false;        
    } else if (!noEsVacio(objData.ID_SUB) || !noEsVacio(objData.ID_SUBOFI) || !noEsVacio(objData.DES_SUBOFI)) {
        notificacionSistema({
            intOpcion: 1,
            strMensaje: "<i class='fa fa-warning'></i>&nbsp;Ingrese oficina"
        })
        return false;      
    } else {
        var rowid = $("#derivarExpe_tablaDerivar").jqGrid('getGridParam', 'records');
        var newRowData = {
            CODIGO: rowid + 1,
            ID_SUB: objData.ID_SUB,
            ID_SUBOFI: objData.ID_SUBOFI,
            ID_PRIORIDAD: $("#derivarExpe_ddlPrioridad").val(),
            ID_TRATA: $("#derivarExpe_ddlTratamiento").val(),
            DES_SUBOFI: objData.DES_SUBOFI,
            DES_TRATA: $("#derivarExpe_ddlTratamiento option:selected").text(),
            DES_PRIORIDAD: $("#derivarExpe_ddlPrioridad option:selected").text(),
            DES_OBS: $("#derivarExpe_taComentarios").val(),
            //PLAZO: $("#derivarExpe_ddlPrioridad option:selected").attr("data-field")
            PLAZO: $("#derivarExpe_tbPlazo").val(),
            FLG_TIPO_DIA: $("#derivarExpe_ddlTipoDia").val()
        }
        $("#derivarExpe_tablaDerivar").jqGrid('addRowData', rowid + 1, newRowData);
    }
    $("#derivarExpe_tbDesOficina").val("");
    $("#derivarExpe_destinoIdSub").val("");
    $("#derivarExpe_destinoIdSubOfi").val("");
    $("#derivarExpe_destinoDesSubOfi").val("");
    //$("#derivarExpe_taComentarios").val("");
}
function derivarExpe_buscarOficina(idSub) {
    var vBuscado = false;
    var ids = $("#derivarExpe_tablaDerivar").getDataIDs();
    for (var i = 0; i < ids.length; i++) {
        var rowId = ids[i];
        var rowData = $("#derivarExpe_tablaDerivar").jqGrid('getRowData', rowId);
        if (rowData.ID_SUB == idSub) return true;
    }
    return vBuscado;
}
function derivarExpe_grillaDerivacion() {
    $("#derivarExpe_tablaDerivar").jqGrid({
        datatype: "local",
        styleUI: "Bootstrap",
        height: "100%",
        colModel: [
            { name: 'ID_SUB', index: 'ID_SUB', align: 'center', hidden: true },
            { name: 'ID_SUBOFI', index: 'ID_SUBOFI', align: 'center', hidden: true },
            { name: 'ID_PRIORIDAD', index: 'ID_PRIORIDAD', align: 'center', hidden: true },
            { name: 'ID_TRATA', index: 'ID_TRATA', align: 'center', hidden: true },
            { label: 'Oficina', name: "DES_SUBOFI", index: "DES_SUBOFI", align: 'center', hidden: false },
            { label: 'Tratamiento', name: 'DES_TRATA', index: 'DES_TRATA', align: 'center', hidden: false },
            { label: 'Prioridad', name: 'DES_PRIORIDAD', index: 'DES_PRIORIDAD', align: 'center', hidden: false },
            { label: 'Plazo (En dias)', name: 'PLAZO', index: 'PLAZO', align: 'center', hidden: false },
            { label: 'Tipo dia', name: 'FLG_TIPO_DIA', index: 'FLG_TIPO_DIA', align: 'center', hidden: false, formatter: function (cellvalue, options, rowObject) {
                var strHml = "";
                if (rowObject.FLG_TIPO_DIA == "U") {
                    strHml = "Laborable";
                } else {
                    strHml = "Calendario";
                }
                return strHml;
            }
            },
            { label: 'Observaciones', name: 'DES_OBS', index: 'DES_OBS', align: 'center', hidden: false },
            { label: "", name: "", align: 'center', width: 40, formatter: actionButtonDerivarExpe_Eliminar }
        ],
        caption: "Listado de oficinas",
        rownumbers: true,
        viewrecords: true,
        gridview: true
    });
    jqGridResponsive($("#derivarExpe_tablaDerivar").closest("div.grid"));
}
function actionButtonDerivarExpe_Eliminar(cellvalue, options, rowObject) {
    var derivarExpe_htmlInputEliminar;
    derivarExpe_htmlInputEliminar = "<i class='fa fa-minus' style='cursor:pointer'  onclick=\"derivarExpe_eliminarOficina(" + options.rowId + ")\" />";
    return derivarExpe_htmlInputEliminar;
}
function derivarExpe_eliminarOficina(rowId) {
    $("#derivarExpe_tablaDerivar").jqGrid("delRowData", rowId);
    $("#derivarExpe_tablaDerivar").trigger("reloadGrid");
}

function regDerivarDocPublico_grabar() {
    if (regDerivarDocPublico_validarGrabar()) {
        var objEn = new Object();
        var ListaOficinasDerivar = JSLINQ($("#derivarExpe_tablaDerivar").jqGrid('getGridParam', 'data')).Where(function (item) { return item });
        objEn.DESTINATARIOS = ListaOficinasDerivar.items;

        objEn.ID_EXPE = $("#derivarExpe_idExpe").val();
        objEn.ID_MOVI = $("#derivarExpe_idMovi").val();
        objEn.ID_DOC = $("#derivarExpe_idDoc").val();
        objEn.ID_ACCION = $("#derivarExpe_idAccion").val();
        objEn.ID_TIP_DOC = $("#derivarExpe_idTipDoc").val();
        objEn.ID_SUB = $("#derivarExpe_idSub").val();
        objEn.ID_SUBOFI = $("#derivarExpe_idSubOfi").val();
        objEn.ID_PERSONA = $("#derivarExpe_idPersona").val();

        actualizarDatosWebApi({
            parametros: objEn,
            nombreObjeto: "objEn",
            url: "Derivar/actualizar",
            callBack: function (objError) {
                if (objError.ID_TIPO == 0) {
                    
                    bootbox.alert({
                        message: "<i class='fa fa-check-circle'></i>&nbsp;Documento: " + objError.DES_ERROR + ". Con Expediente N°. " + objError.VALOR
                    });

                    if (typeof strFlgEmbed != 'undefined' && strFlgEmbed == "1") {
                        var objResultCallBack = new Object();
                        objResultCallBack.IdTipo = 0;
                        objResultCallBack.DesError = objError.DES_ERROR;
                        objResultCallBack.Valor1 = 0;
                        objResultCallBack.Valor2 = 1;

                        parent.postMessage(objResultCallBack, "*");
                    }

                    $("#frmDerivarExpediente").closest("div[role='dialog']").modal("hide");
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
function regDerivarDocPublico_validarGrabar() {
    var bool = new Boolean();
    bool = true;
    var ListaOficinasDerivar = JSLINQ($("#derivarExpe_tablaDerivar").jqGrid('getGridParam', 'data')).Where(function (item) { return item });
    
    if (ListaOficinasDerivar.items == 0) {
        notificacionSistema({
            intOpcion: 1,
            strMensaje: "<i class='fa fa-warning'></i>&nbsp;Ingresar oficina a derivar"
        });
        bool = false;
    } else if ($("#derivarExpe_ddlTratamiento").val() == "") {
        $("#derivarExpe_ddlTratamiento").css("border", "1px solid red");
        notificacionSistema({
            intOpcion: 1,
            strMensaje: "<i class='fa fa-warning'></i>&nbsp;Ingresar Tratamiento"
        });
        bool = false;
    } else if ($("#derivarExpe_ddlPrioridad").val() == "") {
        $("#derivarExpe_ddlPrioridad").css("border", "1px solid red");
        notificacionSistema({
            intOpcion: 1,
            strMensaje: "<i class='fa fa-warning'></i>&nbsp;Ingresar Prioridad"
        });
        bool = false;
    } else if ($("#derivarExpe_tbPlazo").val() == "") {
        $("#derivarExpe_tbPlazo").css("border", "1px solid red");
        notificacionSistema({
            intOpcion: 1,
            strMensaje: "<i class='fa fa-warning'></i>&nbsp;Ingresar Plazo"
        });
        bool = false;
    } else {
        regDerivarDocPublico_removerClaseValidacion();
        bool = true;
    }
    return bool;
}

function regDerivarDocPublico_removerClaseValidacion() {
    $("#derivarExpe_ddlTratamiento").css('border', '');
    $("#derivarExpe_ddlPrioridad").css('border', '');
    $("#derivarExpe_tbPlazo").css('border', '');
}