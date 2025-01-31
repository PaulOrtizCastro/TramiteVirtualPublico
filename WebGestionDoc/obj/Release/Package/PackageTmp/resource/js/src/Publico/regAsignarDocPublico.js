var strCallBackTramiteGestionDocumento = $("#asignarExpe_callback").val();
$(document).ready(function () {
    regAsignar_cargarAutoComplete();
    regAsignar_cargarTratamiento();
    regAsignar_cargarPrioridad();
    regAsignar_grillaAsignar();

    $("#asignarExpe_ddlPrioridad").change(function () {
        if (noEsVacio($(this).val())) {
            $("#asignarExpe_tbPlazo").val($("#asignarExpe_ddlPrioridad option:selected").attr("data-field"));
        }
    })
    $("#asignarExpe_DesOficina_Insertar").click(function () {
        var objParm = {
            ID_SUB: $("#asignarExpe_IdSub").val(),
            ID_SUBOFI: $("#asignarExpe_IdSubOfi").val(),
            ID_PERSONA: $("#asignarExpe_IdPersona").val(),
            DES_PERSONA: $("#asignarExpe_NomFun").val()

        }
        asignarExpe_agregarPersona(objParm);
        return false;
    })

    $("#asignarExpe_btnGuardarAsignacion").cargaPopOverConfirm({
        mensaje: "¿Desea asignar la información ingresada?",
        strIdDiv: "body",
        posicion: "top"
    });

    $("#asignarExpe_btnCancelar").click(function () {
        var objResultCallBack = new Object();
        objResultCallBack.IdTipo = 2;
        objResultCallBack.Valor1 = 1;
        window[strCallBackTramiteGestionDocumento](objResultCallBack);
        $("#frmAsignarExpediente").closest("div[role='dialog']").modal("hide");
        //        if (typeof strFlgEmbed != 'undefined' && strFlgEmbed == "1") {
        //            var objResultCallBack = new Object();
        //            objResultCallBack.IdTipo = 2;
        //            objResultCallBack.Valor1 = 1;
        //            parent.postMessage(objResultCallBack, "*");
        //        } 
        return false;
    })
})

function regAsignar_cargarAutoComplete() {
    $("#asignarExpe_tbDesFuncionario").attr("placeholder", "Escribir el nombre de funcionario a asignar...").typeahead("destroy").typeahead({
        source: function (query, process) {
            if (noEsVacio(query)) {
                $("#asignarExpe_tbDesFuncionario").css('border', '');
                var objEnPersona = new Object();
                var objEnEstorg = new Object();

                objEnEstorg.ID_SUB = $("#asignarExpe_grabaridSub").val();
                objEnEstorg.ID_SUBOFI = $("#asignarExpe_grabaridSubOfi").val();
                objEnPersona.enEstorg = objEnEstorg;

                var strRequest = $.trim(query);
                objEnPersona.NOMBRECOMPLETO = normalize(strRequest.replace(/\ /g, "%").toUpperCase());
                objEnPersona.OPR = 1;
                
                cargarDatosWebApi({
                    parametros: objEnPersona,
                    nombreObjeto: "objEnPersona",
                    callBack: function (data) {
                        if (noEsVacio(data.length)) {
                            process($.map(data.slice(0, 10), function (item) {
                                return {
                                    name: (noEsVacio(item.COD_LOG) ? item.COD_LOG + " - " : "") + item.NOMFUNC,                                    
                                    value: item.NOMFUNC,
                                    idPersona: item.ID_PERSONA,
                                    idSub: item.enEstorg.ID_SUB,
                                    idSubOfi: item.enEstorg.ID_SUBOFI,
                                    desSubOfi: item.enEstorg.DES_SUBOFI
                                }
                            }));
                        };
                    },
                    url: "Asignar/consultarFuncionariosPorOficina",
                    strRuta: strRutaAplicacionMaster
                });
            };
        },
        autoSelect: true,
        minLength: 3,
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
        var rowKey = $("#asignarExpe_tbDesFuncionario").typeahead("getActive");
        if (rowKey) {
            if (rowKey.name == $("#asignarExpe_tbDesFuncionario").val()) {
                $("#asignarExpe_IdPersona").val(rowKey.idPersona);
                $("#asignarExpe_NomFun").val(rowKey.value);
                $("#asignarExpe_IdSub").val(rowKey.idSub);
                $("#asignarExpe_IdSubOfi").val(rowKey.idSubOfi);
            } else {
                // This means it is only a partial match, you can either add a new item
                // or take the active if you don't want new items
            }
        } else {
            // Nothing is active so it is a new value (or maybe empty value)
        }
    });
}
function regAsignar_cargarTratamiento() {
    var objEn = new Object();
    cargarDatosWebApi({
        parametros: objEn,
        nombreObjeto: "objEn",
        callBack: function (lstData) {
            $("#asignarExpe_ddlTratamiento").cargarDatosCombo({
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
function regAsignar_cargarPrioridad() {
    var objEn = new Object();
    cargarDatosWebApi({
        parametros: objEn,
        nombreObjeto: "objEn",
        callBack: function (lstData) {
            $("#asignarExpe_ddlPrioridad").cargarDatosCombo({
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

function asignarExpe_agregarPersona(objData) {
    if (!noEsVacio($("#asignarExpe_IdPersona").val())) {
        notificacionSistema({
            intOpcion: 1,
            strMensaje: "<i class='fa fa-warning'></i>&nbsp;Ingresar Funcionario(a)"
        });  
        return false; 
    } else if (asignarExpe_buscarPersona(objData.ID_PERSONA)) {
        notificacionSistema({
            intOpcion: 1,
            strMensaje: "<i class='fa fa-warning'></i>&nbsp;Funcionario(a) ya ingresado(a)"
        });
        return false; 
    } else {
        var rowid = $("#asignarExpe_tablaAsignar").jqGrid('getGridParam', 'records');        
        var newRowData = {
            CODIGO: rowid + 1,
            ID_PERSONA: objData.ID_PERSONA,
            ID_SUB: objData.ID_SUB,
            ID_SUBOFI: objData.ID_SUBOFI,
            ID_PRIORIDAD: $("#asignarExpe_ddlPrioridad").val(),
            ID_TRATA: $("#asignarExpe_ddlTratamiento").val(),
            DES_PERSONA: objData.DES_PERSONA,
            DES_TRATA: $("#asignarExpe_ddlTratamiento option:selected").text(),
            DES_PRIORIDAD: $("#asignarExpe_ddlPrioridad option:selected").text(),
            DES_OBS: $("#asignarExpe_taComentarios").val(),
            //PLAZO: $("#asignarExpe_ddlPrioridad option:selected").attr("data-field")
            PLAZO: $("#asignarExpe_tbPlazo").val(),
            FLG_TIPO_DIA: $("#asignarExpe_ddlTipoDia").val()
        }
        $("#asignarExpe_tablaAsignar").jqGrid('addRowData', rowid + 1, newRowData);
    }
    $("#asignarExpe_tbDesFuncionario").val("");
    $("#asignarExpe_hdIdSub").val("");
    $("#asignarExpe_hdIdSubOfi").val("");
    $("#asignarExpe_hdDesSubOfi").val("");
    //$("#asignarExpe_taComentarios").val("");
    
}
function asignarExpe_buscarPersona(idPersona) {
    var vBuscado = false;
    var ids = $("#asignarExpe_tablaAsignar").getDataIDs();
    for (var i = 0; i < ids.length; i++) {
        var rowId = ids[i];
        var rowData = $("#asignarExpe_tablaAsignar").jqGrid('getRowData', rowId);
        if (rowData.ID_PERSONA == idPersona) return true;
    }
    return vBuscado;
}
function regAsignar_grillaAsignar() {
    $("#asignarExpe_tablaAsignar").jqGrid({
        datatype: "local",
        styleUI: "Bootstrap",
        height: "100%",
        colModel: [
            { name: 'ID_PERSONA', index: 'ID_PERSONA', align: 'center', hidden: true },
            { name: 'ID_SUB', index: 'ID_SUB', align: 'center', hidden: true },
            { name: 'ID_SUBOFI', index: 'ID_SUBOFI', align: 'center', hidden: true },
            { name: 'ID_PRIORIDAD', index: 'ID_PRIORIDAD', align: 'center', hidden: true },
            { name: 'ID_TRATA', index: 'ID_TRATA', align: 'center', hidden: true },
            { label: 'Funcionario', name: "DES_PERSONA", index: "DES_PERSONA", align: 'center', hidden: false },
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
            { label: "", name: "", align: 'center', width: 40, formatter: actionButtonAsignarExpe_Eliminar }
        ],
        caption: "Listado de asignaciones",
        rownumbers: true,
        viewrecords: true,
        gridview: true
    });
    jqGridResponsive($("#asignarExpe_tablaAsignar").closest("div.grid"));    
}

function actionButtonAsignarExpe_Eliminar(cellvalue, options, rowObject) {
    var asignarExpe_htmlInputEliminar;
    asignarExpe_htmlInputEliminar = "<i class='fa fa-trash' style='cursor:pointer'  onclick=\"asignarExpe_eliminarOficina(" + options.rowId + ")\" />";
    return asignarExpe_htmlInputEliminar;
}
function asignarExpe_eliminarOficina(rowId) {
    $("#asignarExpe_tablaAsignar").jqGrid("delRowData", rowId);
    $("#asignarExpe_tablaAsignar").trigger("reloadGrid");
}


function asignarExpe_grabar() {
    if (asignarExpe_validarRegAsignar()) {
        var objEn = new Object();
        var objEnExpe = new Object();
        var objEnMovi = new Object();
        var objEnTipDoc = new Object();
        var objEnDoc = new Object();
        var objEnEstorg = new Object();
        var objEnPersona = new Object();
        var objEnAccion = new Object();

        var ListaOficinasAsignar = JSLINQ($("#asignarExpe_tablaAsignar").jqGrid('getGridParam', 'data')).Where(function (item) { return item });
        objEn.DESTINATARIOS = ListaOficinasAsignar.items;

        objEnExpe.ID_EXPE = $("#asignarExpe_grabaridExpe").val();
        objEnMovi.ID_MOVI = $("#asignarExpe_grabaridMovi").val();
        objEnEstorg.ID_SUB = $("#asignarExpe_grabaridSub").val();
        objEnEstorg.ID_SUBOFI = $("#asignarExpe_grabaridSubOfi").val();
        objEnDoc.ID_DOC = $("#asignarExpe_grabaridDoc").val();
        objEnTipDoc.ID_TIP_DOC = $("#asignarExpe_grabaridTipDoc").val();
        objEnPersona.ID_PERSONA = $("#asignarExpe_grabaridPersona").val();
        objEnAccion.ID_ACCION = $("#asignarExpe_grabaridAccion").val();


        objEn.enExpe = objEnExpe;
        objEn.enMovi = objEnMovi;
        objEn.enDoc = objEnDoc;
        objEn.enTipDoc = objEnTipDoc;
        objEn.enEstorg = objEnEstorg;
        objEn.enPersonaRemite = objEnPersona;
        objEn.FLG_TIPO_DIA = $("#asignarExpe_ddlTipoDia").val();
        //console.log(objEn);
        actualizarDatosWebApi({
            parametros: objEn,
            nombreObjeto: "objEn",
            url: "Asignar/actualizar",
            callBack: function (objError) {
                if (objError.ID_TIPO == 0) {

                    bootbox.alert({
                        message: "<i class='fa fa-check-circle'></i>&nbsp;" + objError.DES_ERROR
                    });

                    if (typeof strFlgEmbed != 'undefined' && strFlgEmbed == "1") {
                        var objResultCallBack = new Object();
                        objResultCallBack.IdTipo = 0;
                        objResultCallBack.DesError = objError.DES_ERROR;
                        objResultCallBack.Valor1 = 0;
                        objResultCallBack.Valor2 = 1;
                        
                        parent.postMessage(objResultCallBack, "*");
                    }
                    $("#frmAsignarExpediente").closest("div[role='dialog']").modal("hide");
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

function asignarExpe_validarRegAsignar() {
    var bool = new Boolean();
    bool = true;
    var ListaOficinasAsignar = JSLINQ($("#asignarExpe_tablaAsignar").jqGrid('getGridParam', 'data')).Where(function (item) { return item });

    if (ListaOficinasAsignar.items == 0) {
        notificacionSistema({
            intOpcion: 1,
            strMensaje: "<i class='fa fa-warning'></i>&nbsp;Ingresar Funcionario(a)"
        });
        bool = false;
    } else if ($("#asignarExpe_ddlTratamiento").val() == "") {
        $("#asignarExpe_ddlTratamiento").css("border", "1px solid red");
        notificacionSistema({
            intOpcion: 1,
            strMensaje: "<i class='fa fa-warning'></i>&nbsp;Ingresar Tratamiento"
        });
        bool = false;
    } else if ($("#asignarExpe_ddlPrioridad").val() == "") {
        $("#asignarExpe_ddlPrioridad").css("border", "1px solid red");
        notificacionSistema({
            intOpcion: 1,
            strMensaje: "<i class='fa fa-warning'></i>&nbsp;Ingresar Prioridad"
        });
        bool = false;
    } else if ($("#asignarExpe_tbPlazo").val() == "") {
        $("#asignarExpe_tbPlazo").css("border", "1px solid red");
        notificacionSistema({
            intOpcion: 1,
            strMensaje: "<i class='fa fa-warning'></i>&nbsp;Ingresar Plazo"
        });
        bool = false;
    } else {
        asignarExpe_removerClaseValidacion();
        bool = true;
    }
    return bool;
}
function asignarExpe_removerClaseValidacion() {
    $("#asignarExpe_ddlTratamiento").css('border', '');
    $("#asignarExpe_ddlPrioridad").css('border', '');
    $("#asignarExpe_tbPlazo").css('border', '');
}