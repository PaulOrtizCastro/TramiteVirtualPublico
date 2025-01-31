var strNombreArchivo = encodeURIComponent($("#lblCabeceraTipDoc").text());

$(document).ready(function () {
    //console.log("fnCargaRegDoc");
    fnCargaRegDoc();
    $("#spanDesDoc").click(function () {
        //if ($("#hfIdFlgEst").val() == 1 && $("#hfIdTipDoc").val() == 2) {
        //console.log($("#hfIdFlgEst").val());
        $('#ifrVistaPreviaRegDoc').attr('src', '');  // O puedes usar 'about:blank'
        if ($("#hfIdFlgEst").val() == 1) {
            $("#lbReferenciasRegDoc").val("");
            //fnCargarVisorMemo();
            //cons_RegDocReferencias();
            fnCargaRegDoc();
        }
    });
});

function fnCargarSeguimiento() {
    cargarDatosWebApi({
        parametros: {
            ID_DOC: $("#hfIdDoc").val()
        },
        nombreObjeto: "objEnBorrador",
        url: "borrador/traeTrazabilidadBorrador",
        callBack: function (lstData) {
            if (lstData.length > 0) {
                fnCargarListaSeguimiento(lstData)
            }
        }
    });
}
function fnCargarListaSeguimiento(myData) {
    var objDiv = $("#divSeguimientoRegDoc").empty();
    var objTbl = objDiv.find("table");

    if (objTbl.length) {
        objTbl.jqGrid("clearGridData").setGridParam({
            data: myData,
            page: 1
        }).trigger("reloadGrid");
    } else {
        var objTbl = $("<table id='tblGrillaSeguimiento'>").addClass("table table-bordered table-hover table-striped");
        var objDivPager = $("<div id='divPagerSeguimiento'>");
        objTbl.appendTo(objDiv);
        objDivPager.appendTo(objDiv);
        objTbl.jqGrid({
            data: myData,
            styleUI: "Bootstrap",
            datatype: "local",
            colModel: [
                {
                    label: '<center>Oficina.</center>', align: 'center', width: 80, hidden: false, formatter: function (cellvalue, options, rowObject) {
                        var strHml = "";
                        strHml = validaNulosJSON(rowObject, "ABR_SUBOFI");
                        return strHml;
                    }
                },
                {
                    label: '<center>Estado</center>', align: 'center', width: 120, hidden: false, formatter: function (cellvalue, options, rowObject) {
                        var strHml = "";
                        strHml = validaNulosJSON(rowObject, "ABR_ESTADO");
                        return strHml;
                    }
                },
                {
                    label: '<center>Encargado</center>', align: 'left', width: 100, hidden: false, formatter: function (cellvalue, options, rowObject) {
                        var strHtml = "";
                        if (noEsVacio(rowObject.COD_LOG) && rowObject.COD_LOG != "0") {
                            if (rowObject.FLG_USU_ACTIVO == 1) {
                                strHtml = "<i class='glyphicon glyphicon-user' style='display: inline-block'></i><span> " + rowObject.COD_LOG + "</span>";
                            } else {
                                strHtml = "<i class='glyphicon glyphicon-lock' style='display: inline-block;color:darkred'></i><span style='color:darkred'> " + rowObject.COD_LOG + "</span>";
                            }
                        }
                        return strHtml;
                    }
                },
                {
                    label: '<center>Fecha</center>', align: 'center', width: 100, hidden: false, formatter: function (cellvalue, options, rowObject) {
                        var strHml = "";
                        strHml = validaNulosJSON(rowObject, "FEC_INI");
                        return strHml;
                    }
                }
            ],
            rownumbers: true,
            viewrecords: true,
            caption: "Trazabilidad del Borrador",
            height: "100%",
            //rowList: [10, 50, 70, 100],
            //rowNum: 10,
            //pager: "#divPagerSeguimiento",
            loadComplete: function () {
                $("#divSeguimientoRegDoc table.ui-jqgrid-htable").css("width", "100%").closest("div.ui-jqgrid-hbox").css("padding-right", "0px");
                $("#divSeguimientoRegDoc table.ui-jqgrid-btable").css("width", "100%");
            },
            beforeRequest: function () {
                jqGridResponsive($(".jqGridDocs"));
            }
        });
    }
}
function fnCargarVisorMemo() {
    //console.log("fnCargarVisorMemo");
    //console.log($("#hfIdStrTipo_Index").val());
    if (noEsVacio($("#hfIdStrTipo_Index").val())) {
        if ($("#hfIdStrTipo_Index").val() == "ME") {
            //console.log("1");
            //$("#ifrVistaPreviaRegDoc").attr("src", strRutaAplicacionMaster + "Ventanilla/DescargaArchivo?strTipo=memo&CodCms=" + $("#hfIdDoc").val() + "&strNomArch=" + strNombreArchivo + "&strAction=v&strRuta=");
            ///$("#ifrVistaPreviaRegDoc").attr("src", strRutaAplicacionMaster + "Ventanilla/DescargaArchivo?strTipo=memo&CodCms=" + $("#hfIdDoc").val() + "&strNomArch=" + strNombreArchivo + "&strAction=v&strRuta=&IdDocCms=");
            $.get(strRutaAplicacionMaster + "Ventanilla/DescargaArchivo?strTipo=memo&CodCms=" + $("#hfIdDoc").val() + "&strNomArch=" + strNombreArchivo + "&strAction=v&strRuta=&IdDocCms=", function (url) {
                $('#ifrVistaPreviaRegDoc').attr('src', url); // Set the iframe source dynamically
            });
            consultaRegDocumento_CargarAdjuntoMemo();
        } else if ($("#hfIdStrTipo_Index").val() == "VV") {
            //console.log("2");
            consultaRegDocumento_ObtenerCodCmsLaser();
        } else {
            //console.log("3");
            consultarDocumentoIntranet();
        }
    } else {
        consultarDocumentoIntranet();
    }
};
function consRegDoc_ValidarBorrador(objDatos) {
    var defaults = {
        parametros: {},
        nombreObjeto: "",
        cache: false,
        async: true,
        url: "",
        callBack: function () { }
    };
    var defaults = $.extend(defaults, objDatos);
    var strParametros = new String();
    if (noEsVacio(defaults.nombreObjeto)) strParametros = JSON.stringify(defaults.parametros); else strParametros = "";

    $.ajax({
        type: "POST",
        url: ((noEsVacio(defaults.strRuta)) ? defaults.strRuta : strRutaAplicacionMaster) + "api/" + defaults.url,
        data: strParametros,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: defaults.async,
        success: function (msg) {
            lstData = (typeof msg == "string") ? eval(msg) : msg;
            defaults.callBack(lstData);
        },
        error: function (result) {
        }
    });
}
function fnCargaRegDoc() {
    consRegDoc_ValidarBorrador({
        parametros: {
            ID_DOC: $("#hfIdDoc").val()
        },
        nombreObjeto: "objEnBorrador",
        url: "borrador/traeCorrelativoBorrador",
        callBack: function (data) {
            //Es documento digital
            //console.log({ ID_TIPO: data.ID_TIPO });
            if (data.ID_TIPO == 0) {
                //console.log("Documento digital");
                //se modifica el  16/10/2020 -- para cambio en produ
                /*cargarDatosWebApi({
                    parametros: {
                        ID_EXPE: $("#hfIdExpe").val()
                    },
                    nombreObjeto: "oEnArchExpeRequi",
                    url: "archExpeRequi/listar",
                    callBack: function (lstData) {
                        console.log(lstData);
                        if (lstData.length > 0) {
                            cargarGrillaArchExpeRegDoc(lstData);
                        }
                    }
                });*/
                consultarDocumentoIntranet();
                fnCargarSeguimiento();
                //No es documento digital
            } else {
                //console.log("no es documento digital");
                if ($("#hfIdFlgEst").val() == 1) {
                    //console.log($("#hfIdTipDoc").val());

                    switch ($("#hfIdTipDoc").val()) {
                        case "2":
                            if ($("#hfIdStrTipo_Index").val() == "ME") {
                                //console.log("3: ME");
                                ///$("#ifrVistaPreviaRegDoc").attr("src", strRutaAplicacionMaster + "Ventanilla/DescargaArchivo?strTipo=memo&CodCms=" + $("#hfIdDoc").val() + "&strNomArch=" + strNombreArchivo + "&strAction=v&strRuta=&IdDocCms=");
                                $.get(strRutaAplicacionMaster + "Ventanilla/DescargaArchivo?strTipo=memo&CodCms=" + $("#hfIdDoc").val() + "&strNomArch=" + strNombreArchivo + "&strAction=v&strRuta=&IdDocCms=", function (url) {
                                    $('#ifrVistaPreviaRegDoc').attr('src', url); // Set the iframe source dynamically
                                });
                                consultaRegDocumento_CargarAdjuntoMemo();
                            } else if ($("#hfIdStrTipo_Index").val() == "VV") {
                                //console.log("4: LF");
                                consultaRegDocumento_ObtenerCodCmsLaser();
                            } else {
                                consultarDocumentoIntranet();
                            }
                            break;
                        case "7":
                            //carga documento principal y adjuntos
                            cargarDatosWebApi({
                                parametros: {
                                    ID_DOC: $("#hfIdDoc").val(),
                                    OPR: "3"
                                },
                                nombreObjeto: "objEnDocLf",
                                url: "DocLf/listar",
                                callBack: function (lstData) {
                                    //console.log({ lstDatanew: lstData });
                                    if (noEsVacio(lstData.length > 0)) {
                                        var objEnDocLfPrinc = lstData.filter(x => x.FLG_PRINC == 1)[0];
                                        var lstEnDocLf = lstData.filter(x => x.FLG_PRINC == 0);
                                        if (noEsVacio(objEnDocLfPrinc)) {
                                            if (objEnDocLfPrinc.enOrigen.ID_ORIGEN == 3 && objEnDocLfPrinc.ID_SUB == 275 && objEnDocLfPrinc.ID_SUBOFI == '02010502') {
                                                //console.log("pivot", pivot);
                                                //cargarVistaPreviaRegDoc('sistema/publico/visorDigitalizacion.aspx?' + (noEsVacio(objEnDocLfPrinc.COD_CMS) ? "intIdLaserfiche=" + objEnDocLfPrinc.COD_CMS + "&" : "") + "pivot=" + encodeURIComponent(JSON.stringify(pivot)), "DES_DOC");
                                                ///$("#ifrVistaPreviaRegDoc").attr("src", strRutaAplicacionMaster + "Ventanilla/DescargaArchivo?strTipo=lf&CodCms=&strNomArch=&strAction=v&strRuta=&IdDocCms=" + objEnDocLfPrinc.ID_DOC_CMS);
                                                $.get(strRutaAplicacionMaster + "Ventanilla/DescargaArchivo?strTipo=lf&CodCms=&strNomArch=&strAction=v&strRuta=&IdDocCms=" + objEnDocLfPrinc.ID_DOC_CMS, function (url) {
                                                    $('#ifrVistaPreviaRegDoc').attr('src', url); // Set the iframe source dynamically
                                                });
                                                //cargarGrillaBorradorOficio(lstEnDocLf.filter(x => x.FLG_PRINC == 0));
                                            }
                                            //cargar adjuntos
                                            if (lstEnDocLf.length > 0) {
                                                fnCargarListDocAdjuntoLf(lstEnDocLf); 
                                            }
                                        }
                                    }
                                }
                            });
                            //requisitos del tupa
                            cargarDatosWebApi({
                                parametros: {
                                    ID_EXPE: $("#hfIdExpe").val(),
                                    FLG_EST: 1
                                },
                                nombreObjeto: "oEnArchExpeRequi",
                                url: "archExpeRequi/listar",
                                callBack: function (lstData) {
                                    if (lstData.length > 0) {
                                        let arrayRequisitos = $.map(lstData, function (item, index) {
                                            return {
                                                orden: index + 1,
                                                ID_ARCHIREQUIEXPE: item.ID_ARCHIREQUIEXPE,
                                                enTupa: { ID_TUPA: item.enTupa.ID_TUPA },
                                                enRequi: { ID_REQUI: item.enRequi.ID_REQUI, DES_REQUI: item.enRequi.DES_REQUI, ABR_REQUI: item.enRequi.ABR_REQUI, ID_TUPA_REQUI: item.enRequi.ID_TUPA_REQUI },
                                                ID_DOC_LF: item.ID_DOC_LF,
                                                ID_DOC_CMS: item.ID_DOC_CMS,
                                                DES_NOM: item.DES_NOM,
                                                DES_NOM_ABR: item.DES_NOM_ABR,
                                                NUM_SIZE_ARCHIVO: item.NUM_SIZE_ARCHIVO,
                                                ID_EXPE: item.ID_EXPE,
                                                DES_OBS: item.DES_OBS,
                                                ID_TIPO: item.ID_TIPO,
                                                FEC_REG: item.FEC_REG,
                                            }
                                        });
                                        cargarRequisitosArchExpRegDoc(arrayRequisitos, "divRequisitosArchExpRegDoc");
                                    }
                                }
                            });
                            //carga de referencias
                            cons_RegDocReferencias();
                            //consultarDocumentoIntranet();
                            //CARGA DE ADJUNTOS DE PAGO
                            cargarDatosWebApi({
                                parametros: {
                                    ID_EXPE: $("#hfIdExpe").val(),
                                },
                                nombreObjeto: "oEnArchExpeRequi",
                                url: "archExpeRequi/listarArchivosPagoTupa",
                                callBack: function (lstData) {
                                    if (lstData.length > 0) {
                                        //console.log({ Pagalo: lstData });
                                        let arrayAdjuntosPagalo = $.map(lstData, function (item, index) {
                                            return {
                                                orden: index + 1,
                                                ID_ARCHIREQUIEXPE: item.ID_ARCHIREQUIEXPE,
                                                enTupa: { ID_TUPA: item.enTupa.ID_TUPA },
                                                enRequi: { ID_REQUI: item.enRequi.ID_REQUI, DES_REQUI: item.enRequi.DES_REQUI, ABR_REQUI: item.enRequi.ABR_REQUI, ID_TUPA_REQUI: item.enRequi.ID_TUPA_REQUI },
                                                ID_DOC_LF: item.ID_DOC_LF,
                                                ID_DOC_CMS: item.ID_DOC_CMS,
                                                DES_NOM: item.DES_NOM,
                                                DES_NOM_ABR: item.DES_NOM_ABR,
                                                NUM_SIZE_ARCHIVO: item.NUM_SIZE_ARCHIVO,
                                                ID_EXPE: item.ID_EXPE,
                                                DES_OBS: item.DES_OBS,
                                                ID_TIPO: item.ID_TIPO,
                                                FEC_REG: item.FEC_REG,
                                            }
                                        });
                                        fnCargarListDocAdjuntoLf(arrayAdjuntosPagalo, "divRequisitosArchExpRegDoc");
                                    }
                                }
                            });
                            break;
                        case "86":
                            cargarDatosWebApi({
                                parametros: {
                                    ID_EXPE: $("#hfIdExpe").val()
                                },
                                nombreObjeto: "oEnArchExpeRequi",
                                url: "archExpeRequi/listar",
                                callBack: function (lstData) {
                                    //console.log("lstData2:", { lstData: lstData });
                                    if (lstData.length > 0) {
                                        //console.log("no es digital");
                                        //$("#ifrVistaPreviaRegDoc").attr("src", strRutaAplicacionMaster + "Ventanilla/DescargaArchivo?strTipo=lf&CodCms=" + lstData[0].COD_CMS + "&strNomArch=" + lstData[0].DES_NOM_ABR + "&strAction=v&strRuta=&IdDocCms=" + lstData[0].ID_DOC_CMS);
                                        cargarGrillaArchExpeRegDoc(lstData,"divAdjuntosArchivosRegDoc");
                                    }
                                }
                            });
                            break;
                        default:
                            //console.log("default");
                            //ventanilla
                            cargarDatosWebApi({
                                parametros: {
                                    ID_EXPE: $("#hfIdExpe").val()
                                },
                                nombreObjeto: "oEnArchExpeRequi",
                                url: "archExpeRequi/listar",
                                callBack: function (lstData) {
                                    //console.log("laser: ", lstData);
                                    if (lstData.length > 0) {
                                        //console.log("no es digital");
                                        ///$("#ifrVistaPreviaRegDoc").attr("src", strRutaAplicacionMaster + "Ventanilla/DescargaArchivo?strTipo=lf&CodCms=" + lstData[0].COD_CMS + "&strNomArch=" + lstData[0].DES_NOM_ABR + "&strAction=v&strRuta=&IdDocCms=" + lstData[0].ID_DOC_CMS);
                                        $.get(strRutaAplicacionMaster + "Ventanilla/DescargaArchivo?strTipo=lf&CodCms=" + lstData[0].COD_CMS + "&strNomArch=" + lstData[0].DES_NOM_ABR + "&strAction=v&strRuta=&IdDocCms=" + lstData[0].ID_DOC_CMS, function (url) {
                                            $('#ifrVistaPreviaRegDoc').attr('src', url); // Set the iframe source dynamically
                                        });
                                        cargarGrillaArchExpeRegDoc(lstData, "divAdjuntosArchivosRegDoc");
                                    } else {
                                        consultarDocumentoIntranet($("#hfIdDoc").val());
                                    }
                                }
                            });



                            ////visor laser
                            //cargarDatosWebApi({
                            //    parametros: {
                            //        ID_DOC: $("#hfIdDoc").val()
                            //    },
                            //    nombreObjeto: "objEnDocLf",
                            //    url: "DocLf/listar",
                            //    callBack: function (lstData) {
                            //        if (noEsVacio(lstData.length)) {
                            //            var data = lstData[0];
                            //            console.log({
                            //                laser: lstData,
                            //                data: data,
                            //                ID_DOC_CMS: data.ID_DOC_CMS
                            //            });
                            //            if (noEsVacio(data)) {
                            //                if (noEsVacio(data.ID_DOC_CMS) && data.FLG_PRINC == 1) {
                            //                    if (!noEsVacio($("#ifrVistaPreviaRegDoc").attr("src"))) {
                            //                        //console.log({ desc: data.DESCRIPCION });
                            //                        //var url = "http://consultasenlinea.mincetur.gob.pe/visorLF/LSWEB/Index?ID_DOC=" + data.COD_CMS;
                            //                        $("#ifrVistaPreviaRegDoc").attr("src", data.DESCRIPCION);
                            //                        //consultarDocumentoIntranet($("#hfIdDoc").val());
                            //                    }
                            //                    else {
                            //                        //CARGAR ADJUNTOS
                            //                        consultarDocumentoIntranet($("#hfIdDoc").val());
                            //                    }
                            //                } else {
                            //                    consultarDocumentoIntranet($("#hfIdDoc").val());
                            //                };
                            //            }
                            //        } else {
                            //            //ventanilla
                            //            cargarDatosWebApi({
                            //                parametros: {
                            //                    ID_EXPE: $("#hfIdExpe").val()
                            //                },
                            //                nombreObjeto: "oEnArchExpeRequi",
                            //                url: "archExpeRequi/listar",
                            //                callBack: function (lstData) {
                            //                    if (lstData.length > 0) {
                            //                        //console.log("no es digital");
                            //                        ///$("#ifrVistaPreviaRegDoc").attr("src", strRutaAplicacionMaster + "Ventanilla/DescargaArchivo?strTipo=lf&CodCms=" + lstData[0].COD_CMS + "&strNomArch=" + lstData[0].DES_NOM_ABR + "&strAction=v&strRuta=&IdDocCms=" + lstData[0].ID_DOC_CMS);
                            //                        $.get(strRutaAplicacionMaster + "Ventanilla/DescargaArchivo?strTipo=lf&CodCms=" + lstData[0].COD_CMS + "&strNomArch=" + lstData[0].DES_NOM_ABR + "&strAction=v&strRuta=&IdDocCms=" + lstData[0].ID_DOC_CMS, function (url) {
                            //                            $('#ifrVistaPreviaRegDoc').attr('src', url); // Set the iframe source dynamically
                            //                        });
                            //                        cargarGrillaArchExpeRegDoc(lstData, "divAdjuntosArchivosRegDoc");
                            //                    }
                            //                }
                            //            });
                            //        }
                            //    }
                            //});


                            break;
                    }

                    //if ($("#hfIdTipDoc").val() == 2) {
                    //    if ($("#hfIdStrTipo_Index").val() == "ME") {
                    //        //console.log("3: ME");
                    //        $("#ifrVistaPreviaRegDoc").attr("src", strRutaAplicacionMaster + "Ventanilla/DescargaArchivo?strTipo=memo&CodCms=" + $("#hfIdDoc").val() + "&strNomArch=" + strNombreArchivo + "&strAction=v&strRuta=&IdDocCms=");
                    //        consultaRegDocumento_CargarAdjuntoMemo();
                    //    } else if ($("#hfIdStrTipo_Index").val() == "VV") {
                    //        //console.log("4: LF");
                    //        consultaRegDocumento_ObtenerCodCmsLaser();
                    //    } else {
                    //        consultarDocumentoIntranet();
                    //    }
                    //} else {
                    //    //visor laser
                    //    cargarDatosWebApi({
                    //        parametros: {
                    //            ID_DOC: $("#hfIdDoc").val()
                    //        },
                    //        nombreObjeto: "objEnDocLf",
                    //        url: "DocLf/listar",
                    //        callBack: function (lstData) {
                    //            if (noEsVacio(lstData.length)) {
                    //                var data = lstData[0];
                    //                if (noEsVacio(data)) {
                    //                    if (noEsVacio(data.ID_DOC_CMS)) {
                    //                        if (!noEsVacio($("#ifrVistaPreviaRegDoc").attr("src"))) {
                    //                            //console.log(data.DESCRIPCION);
                    //                            //var url = "http://consultasenlinea.mincetur.gob.pe/visorLF/LSWEB/Index?ID_DOC=" + data.COD_CMS;
                    //                            $("#ifrVistaPreviaRegDoc").attr("src", data.DESCRIPCION);
                    //                        }
                    //                    };
                    //                }
                    //            };
                    //        }
                    //    });
                    //    //ventanilla
                    //    cargarDatosWebApi({
                    //        parametros: {
                    //            ID_EXPE: $("#hfIdExpe").val()
                    //        },
                    //        nombreObjeto: "oEnArchExpeRequi",
                    //        url: "archExpeRequi/listar",
                    //        callBack: function (lstData) {
                    //            if (lstData.length > 0) {
                    //                //console.log("no es digital");
                    //                $("#ifrVistaPreviaRegDoc").attr("src", strRutaAplicacionMaster + "Ventanilla/DescargaArchivo?strTipo=lf&CodCms=" + lstData[0].COD_CMS + "&strNomArch=" + lstData[0].DES_NOM_ABR + "&strAction=v&strRuta=&IdDocCms=" + lstData[0].ID_DOC_CMS);
                    //                cargarGrillaArchExpeRegDoc(lstData);
                    //            }
                    //        }
                    //    });
                    //}
                }
            }
        }
    });
    cons_RegDocReferencias();
};
function cons_RegDocReferencias(IdDoc) {
    //console.log({ IdDocReferencia: IdDoc, IdDocReferencia2: $("#hfIdDoc").val(),  });
    cargarDatosWebApi({
        parametros: {
            ID_DOC: (noEsVacio(IdDoc) ? IdDoc : $("#hfIdDoc").val()),
            FLG_EST: 1,
            ID_USU: -1,
            FLG_PRINC: "1",
            OPR: "2"
        },
        nombreObjeto: "objEnBorrador",
        url: "DocLf/listar",
        callBack: function (lstData) {
            //console.log({ ref: lstData });
            if (noEsVacio(lstData)) {
                if (lstData.length > 0) {
                    fnCargarListReferencias(lstData,"divReferenciasRegDoc");
                }
            }
        }
    });
}
function consultarDocumentoIntranet(IdDoc) {
    //console.log("consultarDocumentoIntranet: ", { IdDoc: IdDoc });
    cargarDatosWebApi({
        parametros: {
            ID_DOC: (noEsVacio(IdDoc) ? IdDoc : $("#hfIdDoc").val())
        },
        nombreObjeto: "objEnDocLf",
        url: "DocLf/listar",
        callBack: function (lstData) {
            //console.log({ DocLf: lstData });
            //$("#ifrVistaPreviaRegDoc").attr("src", "about:blank");
            if (noEsVacio(lstData)) {
                var data = lstData[0];
                var objEnDocLfPrinc = lstData.filter(x => x.FLG_PRINC == 1)[0];
                var objLstAdjuntos = lstData.filter(x => x.FLG_PRINC != 1);

                if (noEsVacio(data)) {
                    if (noEsVacio(data.ID_DOC_CMS)) {
                        //var lstEnDocLf = [];
                        if (noEsVacio(objEnDocLfPrinc)) {
                            //$("#ifrVistaPreviaRegDoc").attr("src", strRutaAplicacionMaster + "Ventanilla/DescargaArchivo?strTipo=lf&CodCms=" + (noEsVacio(objEnDocLfPrinc.COD_CMS) ? objEnDocLfPrinc.COD_CMS : objEnDocLfPrinc.ID_DOC) + "&strNomArch=&strAction=v&strRuta=&IdDocCms=" + objEnDocLfPrinc.ID_DOC_CMS);                           
                            $.get(strRutaAplicacionMaster + "Ventanilla/DescargaArchivo?strTipo=lf&CodCms=" + (noEsVacio(objEnDocLfPrinc.COD_CMS) ? objEnDocLfPrinc.COD_CMS : "") + "&strNomArch=&strAction=v&strRuta=&IdDocCms=" + objEnDocLfPrinc.ID_DOC_CMS, function (url) {
                                $('#ifrVistaPreviaRegDoc').attr('src', url); // Set the iframe source dynamically
                            });


                            //$("#ifrVistaPreviaRegDoc").attr("src", strRutaAplicacionMaster + "Ventanilla/DescargaArchivo?" + $.param({ pivot: pivot }));
                        }
                        //for (var i = 0; i < lstData.length; i++) {
                        //    lstEnDocLf.push(lstData[i]);
                        //}
                        if (objLstAdjuntos.length > 0) {
                            //$("#pAdjuntosRegDoc").show();
                            //console.log({ adjunto: lstEnDocLf });
                            fnCargarListDocAdjuntoLf(objLstAdjuntos); // << agregado el 22/08/2019
                        } else {
                            //$("#pAdjuntosRegDoc").hide();
                            $("#divAdjuntosArchivosRegDoc").empty();
                        }

                        //for (var i = 0; i < lstData.length; i++) {
                        //    if (lstData[i].FLG_PRINC == 1) {
                        //        $("#ifrVistaPreviaRegDoc").attr("src", strRutaAplicacionMaster + "Ventanilla/DescargaArchivo?strTipo=lf&CodCms=" + data.COD_CMS + "&strNomArch=&strAction=v&strRuta=&IdDocCms=" + data.ID_DOC_CMS);
                        //    } else {
                        //        lstEnDocLf.push(lstData[i]);
                        //    }
                        //}
                        //if (lstEnDocLf.length > 0) {
                        //    //$("#pAdjuntosRegDoc").show();
                        //    //console.log({ adjunto: lstEnDocLf });
                        //    fnCargarListDocAdjuntoLf(lstEnDocLf); // << agregado el 22/08/2019
                        //} else {
                        //    //$("#pAdjuntosRegDoc").hide();
                        //    $("#divAdjuntosArchivosRegDoc").empty();
                        //}
                    }
                }
            } else {
                //console.log("entra");
                consultaRegDocumento_CargarAdjuntoMemo();
                ///$("#ifrVistaPreviaRegDoc").attr("src", strRutaAplicacionMaster + "Ventanilla/DescargaArchivo?strTipo=memo&CodCms=" + $("#hfIdDoc").val() + "&strNomArch=" + strNombreArchivo + "&strAction=v&strRuta=");

                $.get(strRutaAplicacionMaster + "Ventanilla/DescargaArchivo?strTipo=memo&CodCms=" + $("#hfIdDoc").val() + "&strNomArch=" + strNombreArchivo + "&strAction=v&strRuta=", function (url) {
                    $('#ifrVistaPreviaRegDoc').attr('src', url); // Set the iframe source dynamically
                });
            }
        }
    });
}
function consultaRegDocumento_CargarAdjuntoMemo() {
    cargarDatosWebApi({
        parametros: {
            ID_DOC: $("#hfIdDoc").val()
        },
        nombreObjeto: "oDocElecExpeEO",
        url: "DocElecExpe/TraeDocElec",
        callBack: function (data) {
            if (noEsVacio(data)) {
                if (noEsVacio(data.VALOR)) {
                    var oAdjuntarArchivoEO = new Object();
                    oAdjuntarArchivoEO.ID_DOC_ELEC = data.VALOR1;
                    oAdjuntarArchivoEO.ID_VERSION = data.VALOR2;
                    oAdjuntarArchivoEO.ID_DOC = $("#hfIdDoc").val();
                    cargarDatosWebApi({
                        parametros: oAdjuntarArchivoEO,
                        nombreObjeto: "oAdjuntarArchivoEO",
                        url: "DocElecExpe/ListarArchivoAdjunto",
                        callBack: function (lstData) {
                            if (lstData.length > 0) {
                                fnCargarListDocAdjuntoMemo(lstData);
                            }
                        }
                    });
                }
            };
        }
    });
}
function consultaRegDocumento_ObtenerCodCmsLaser() {
    cargarDatosWebApi({
        parametros: {
            ID_DOC: $("#hfIdDoc").val()
        },
        nombreObjeto: "objEnDocLf",
        url: "DocLf/listar",
        callBack: function (lstData) {
            if (noEsVacio(lstData.length)) {
                var data = lstData[0];
                var objEnDocLfPrinc = lstData.filter(x => x.FLG_PRINC == 1)[0];
                var objLstAdjuntos = lstData.filter(x => x.FLG_PRINC != 1);

                if (noEsVacio(data)) {
                    if (noEsVacio(data.ID_DOC_CMS)) {
                        if (noEsVacio(objEnDocLfPrinc)) {
                            ///$("#ifrVistaPreviaRegDoc").attr("src", strRutaAplicacionMaster + "Ventanilla/DescargaArchivo?strTipo=lf&CodCms=" + objEnDocLfPrinc.COD_CMS + "&strNomArch=&strAction=v&strRuta=&IdDocCms=" + objEnDocLfPrinc.ID_DOC_CMS);

                            $.get(strRutaAplicacionMaster + "Ventanilla/DescargaArchivo?strTipo=lf&CodCms=" + objEnDocLfPrinc.COD_CMS + "&strNomArch=&strAction=v&strRuta=&IdDocCms=" + objEnDocLfPrinc.ID_DOC_CMS, function (url) {
                                $('#ifrVistaPreviaRegDoc').attr('src', url); // Set the iframe source dynamically
                            });
                        }
                        if (objLstAdjuntos.length > 0) {
                            fnCargarListDocAdjuntoLf(objLstAdjuntos); // << agregado el 22/08/2019
                        } else {
                            $("#divAdjuntosArchivosRegDoc").empty();
                        }

                        //var lstEnDocLf = [];
                        //for (var i = 0; i < lstData.length; i++) {
                        //    if (lstData[i].FLG_PRINC == 1) {
                        //        $("#ifrVistaPreviaRegDoc").attr("src", strRutaAplicacionMaster + "Ventanilla/DescargaArchivo?strTipo=lf&CodCms=" + data.COD_CMS + "&strNomArch=&strAction=v&strRuta=&IdDocCms=" + data.ID_DOC_CMS);
                        //    } else {
                        //        lstEnDocLf.push(lstData[i]);
                        //    }
                        //}
                        ////console.log(lstEnDocLf)
                        //fnCargarListDocAdjuntoLf(lstEnDocLf);
                    }
                }
            }
        }
    });
}
function fnCargarListReferencias(myData, strDiv) {
    //console.log({ fnCargarListReferencias: myData });
    var objDiv = $("#" + strDiv).empty();
    var objTbl = objDiv.find("table");

    if (objTbl.length) {
        objTbl.jqGrid("clearGridData").setGridParam({
            data: myData,
            page: 1
        }).trigger("reloadGrid");
    } else {
        var objTbl = $("<table id='tblGrillaReferencias'>").addClass("table table-bordered table-hover table-striped");
        var objDivPager = $("<div id='divPagerReferencias'>");
        objTbl.appendTo(objDiv);
        objDivPager.appendTo(objDiv);
        objTbl.jqGrid({
            data: myData,
            styleUI: "Bootstrap",
            datatype: "local",
            colModel: [{
                name: "DES_DOC",
                label: 'Referencia',
                align: "center",
                //width: 300,
                sortable: false,
                formatter: formatterDesNomReferencias
            },
            {
                name: "NUM_SIZE_ARCHIVO",
                label: 'Tamaño',
                align: "center",
                width: 80,
                sortable: false,
                formatter: formatterTamanioReferencias
            },
            {
                name: '',
                align: "center",
                width: 40,
                sortable: false,
                formatter: formatterDescargaArchivoReferencias
            }],
            rownumbers: true,
            viewrecords: true,
            caption: noEsVacio($("#lbReferenciasRegDoc").val()) ? "Antecedentes / Referencias de " + $("#lbReferenciasRegDoc").val() : "Antecedentes / Referencias",
            height: "100%",
            rowList: [10, 50, 70, 100],
            rowNum: 10,
            pager: "#divPagerReferencias",
            autowidth: true,
            footerrow: false,
            loadComplete: function () {
                $("#" + strDiv + " table.ui-jqgrid-htable").css("width", "100%").closest("div.ui-jqgrid-hbox").css("padding-right", "0px");
                $("#" + strDiv + " table.ui-jqgrid-btable").css("width", "100%");

                $("#divReferenciasRegDoc.ui-jqgrid-pager").css("width", "100%");
                $("#divReferenciasRegDoc table").css("font-size", "10px");
            },
            beforeRequest: function () {
                jqGridResponsive($(".jqGridDocs"));
            }
        });
    }
}
function formatterTamanioReferencias(cellvalue, options, rowObject) {
    var strHtmlNumSize = new String();
    var intNumSizeArchivo = parseInt(rowObject.NUM_SIZE_ARCHIVO);
    var newNumSize = bytesToSize(intNumSizeArchivo);
    //strHtmlNumSize = "<div style='cursor:pointer' onclick='fnCargarVisor(" + JSON.stringify(rowObject) + ", \"lf\")'>" + newNumSize + "</div>";
    strHtmlNumSize = "<div style='cursor:pointer'>" + newNumSize + "</div>";
    return (intNumSizeArchivo > 0 ? strHtmlNumSize : "--");
}
function formatterDescargaArchivoReferencias(cellvalue, options, rowObject) {
    var strHtmlDescarga = ""

    if (rowObject.ID_DOC_CMS > 0) {
        strHtmlDescarga = "<img src='../Resource/img/Download.png' title='Descargar archivo' style='cursor:pointer' onclick='fnDescargaArchivoLf(" + JSON.stringify(rowObject) + ")'/>";
        //strHtmlDescarga = "<img src='../Resource/img/Download.png' title='Descargar archivo' style='cursor:pointer' />";
    }
    return strHtmlDescarga;
};
function cargarRequisitosArchExpRegDoc(myData, strDiv) {
    //console.log({ myData: myData });
    var objDiv = $("#" + strDiv).empty();
    var objTbl = objDiv.find("table");

    if (objTbl.length) {
        objTbl.jqGrid("clearGridData").setGridParam({
            data: myData,
            page: 1
        }).trigger("reloadGrid");
    } else {
        var objTbl = $("<table id='tbGrilla_RequisitosArchExpRegDoc'>").addClass("table table-bordered table-hover table-striped");
        var objDivPager = $("<div id='divPagerRequisitosArchExpRegDoc'>");
        objTbl.appendTo(objDiv);
        objDivPager.appendTo(objDiv);
        objTbl.jqGrid({
            data: myData,
            styleUI: "Bootstrap",
            datatype: "local",
            colModel: [
                {
                    label: "&nbsp;", name: "id", width: 35, hidden: false, align: "center", key: true, sorttype: "int",
                    formatter: function (cellvalue, options, rowObject) {
                        cellvalue = rowObject.orden;
                        return cellvalue;
                    }
                },
                {
                    name: 'enRequi.DES_REQUI', index: 'enRequi.DES_REQUI', label: 'Requisito', align: 'left', width: 400, hidden: false,
                    formatter: function (cellvalue, options, rowObject) {
                        let strHtmlDesNomLF = new String();
                        strHtmlDesNomLF = "<div style=display:none>" + validaNulosJSON(rowObject.enRequi, "DES_REQUI") + "</div>" + "<a style='cursor:pointer' title='" + validaNulosJSON(rowObject, "DES_OBS") + "' onclick='fnCargarVisor(" + JSON.stringify(rowObject) + ", \"lf\")'>" + validaNulosJSON(rowObject, "DES_NOM_ABR") + "</a>";
                        return strHtmlDesNomLF;
                    }
                },
                {
                    label: '<center>Tamaño</center>', align: 'center', width: 90, hidden: false, formatter: function (cellvalue, options, rowObject) {
                        let intNumSizeArchivo = bytesToSize(parseInt(rowObject.NUM_SIZE_ARCHIVO));
                        return intNumSizeArchivo;
                    }
                },
                {
                    label: '<center></center>', align: 'center', width: 40, hidden: false, formatter: formatterDescargaArchivoLf
                }
            ],
            //rownumbers: true,
            viewrecords: true,
            caption: "Requisitos del Expediente",
            height: "100%",
            rowList: [10, 50, 70, 100],
            rowNum: 10,
            pager: "#divPagerRequisitosArchExpRegDoc",
            autowidth: true,
            footerrow: false,
            loadComplete: function () {
                $("#" + strDiv + " table.ui-jqgrid-htable").css("width", "100%").closest("div.ui-jqgrid-hbox").css("padding-right", "0px");
                $("#" + strDiv + " table.ui-jqgrid-btable").css("width", "100%");

                $("#divPagerRequisitosArchExpRegDoc.ui-jqgrid-pager").css("width", "100%");
                $("#divPagerRequisitosArchExpRegDoc table").css("font-size", "10px");
            },
            beforeRequest: function () {
                jqGridResponsive($(".jqGridDocs"));
            },
            grouping: true,
            groupingView: {
                groupField: ['enRequi.DES_REQUI'],
                groupText: ['<b>{0} - {1} Item(s)</b>']
                //groupColumnShow: [false]
            },
            gridview: true
        });
        $("#pg_divPagerRequisitosArchExpRegDoc table tr td").first().remove();
        $("#pg_divPagerRequisitosArchExpRegDoc table tr td").last().css("padding", "0px 7px 0px");
    }
}
function fnCargarListDocAdjuntoLf(myData) {
    var objDiv = $("#divAdjuntosArchivosRegDoc").empty();
    var objTbl = objDiv.find("table");

    if (objTbl.length) {
        objTbl.jqGrid("clearGridData").setGridParam({
            data: myData,
            page: 1
        }).trigger("reloadGrid");
    } else {
        var objTbl = $("<table id='tbGrilla_ArchivosRegDoc'>").addClass("table table-bordered table-hover table-striped");
        var objDivPager = $("<div id='divPagerAdjuntosArchivosRegDoc'>");
        objTbl.appendTo(objDiv);
        objDivPager.appendTo(objDiv);
        objTbl.jqGrid({
            data: myData,
            styleUI: "Bootstrap",
            datatype: "local",
            colModel: [
                {
                    label: 'Documento', align: 'center', width: 210, hidden: false, formatter: formatterDesNomLF
                },
                {
                    label: 'Tamaño', align: 'center', width: 90, hidden: false, formatter: formatterTamanioLF
                },
                {
                    label: '<center></center>', align: 'center', width: 40, hidden: false, formatter: formatterDescargaArchivoLf
                }
            ],
            rownumbers: true,
            viewrecords: true,
            //caption: "Archivos Adjuntos",
            caption: noEsVacio($("#lbReferenciasRegDoc").val()) ? "Archivos adjuntos de " + $("#lbReferenciasRegDoc").val() : "Archivos adjuntos",
            height: "100%",
            rowList: [10, 50, 70, 100],
            rowNum: 10,
            pager: "#divPagerAdjuntosArchivosRegDoc",
            autowidth: true,
            footerrow: false,
            loadComplete: function () {
                $("#divAdjuntosArchivosRegDoc table.ui-jqgrid-htable").css("width", "100%").closest("div.ui-jqgrid-hbox").css("padding-right", "0px");
                $("#divAdjuntosArchivosRegDoc table.ui-jqgrid-btable").css("width", "100%");

                $("#divPagerAdjuntosArchivosRegDoc.ui-jqgrid-pager").css("width", "100%");
                $("#divPagerAdjuntosArchivosRegDoc table").css("font-size", "10px");
            },
            beforeRequest: function () {
                jqGridResponsive($(".jqGridDocs"));
            }
        });
        $("#pg_divPagerAdjuntosArchivosRegDoc table tr td").first().remove();
        $("#pg_divPagerAdjuntosArchivosRegDoc table tr td").last().css("padding", "0px 7px 0px");
        
    }
}
function formatterDesNomReferencias(cellvalue, options, rowObject) {
    var strHtml = new String();
    strHtml = "<a style='cursor:pointer;word-wrap:break-word;white-space:normal;' onclick='fnCargarVisorAntecedentesReferecia(" + JSON.stringify(rowObject) + ", \"lf\")'>" + rowObject.DES_DOC + "</a>";
    return strHtml;
}
function formatterDesNomLF(cellvalue, options, rowObject) {
    var strHtmlDesNomLF = new String();
    let data = rowObject.DES_NOM_ABR;
    //strHtmlDesNomLF = "<div style='cursor:pointer' onclick='fnCargarVisor(" + JSON.stringify(rowObject) + ", \"lf\")'>" + rowObject.DES_NOM_ABR + "</div>";
    //strHtmlDesNomLF = "<a style='cursor:pointer' onclick='fnCargarVisor(" + JSON.stringify(rowObject) + ", \"lf\")'>" + rowObject.DES_NOM_ABR + "</a>";

    //strHtmlDesNomLF = "<a style='cursor:pointer;word-wrap:break-word;white-space:normal;' onclick='fnCargarVisor(" + JSON.stringify(rowObject) + ", \"lf\")'>" + (data.indexOf(".") > 15 ? data.split(".")[0].substr(0, 15) + "..." + data.split(".")[data.split(".").length - 1] : data) + "</a>";

    //strHtmlDesNomLF = "<a style='cursor:pointer' onclick='fnCargarVisor(" + JSON.stringify(rowObject) + ", \"lf\")'>" + (data.indexOf(".") > 15 ? data.split(".")[0].substr(0, 15) + "..." + data.split(".")[data.split(".").length - 1] : data) + "</a>";
    strHtmlDesNomLF = "<a style='cursor:pointer;word-wrap:break-word;white-space:normal;' onclick='fnCargarVisor(" + JSON.stringify(rowObject) + ", \"lf\")'>" + rowObject.DES_NOM_ABR + "</a>";
    return strHtmlDesNomLF;
}
function formatterTamanioLF(cellvalue, options, rowObject) {
    var strHtmlNumSize = new String();
    var intNumSizeArchivo = parseInt(rowObject.NUM_SIZE_ARCHIVO);
    //console.log(intNumSizeArchivo);
    var newNumSize = bytesToSize(intNumSizeArchivo);
    //console.log(newNumSize);
    strHtmlNumSize = "<div style='cursor:pointer' onclick='fnCargarVisor(" + JSON.stringify(rowObject) + ", \"lf\")'>" + newNumSize + "</div>";
    return (intNumSizeArchivo > 0 ? strHtmlNumSize : "--");
}
function fnCargarListDocAdjuntoMemo(myData) {
    //console.log("2");
    $("#tbGrilla_ArchivosRegDoc").jqGrid({
        data: myData,
        styleUI: 'Bootstrap',
        datatype: "local",
        colModel: [{
            name: "NOMBRE_ARCHIVO",
            align: "center",
            width: 200,
            sortable: false,
            formatter: formatterDesNomMemo
        },
        {
            name: "SIZE_ARCHIVO",
            align: "center",
            width: 90,
            sortable: false,
            formatter: formatterTamanioMemo
        },
        {
            name: '',
            align: "center",
            width: 40,
            sortable: false,
            formatter: formatterDescargaArchivoMemo
        }],
        rownumbers: true,
        viewrecords: true,
        shrinkToFit: false,
        autowidth: false,
        caption: "",
        rowNum: 10,
        autowidth: true
    });
    jqGridResponsive($("#tbGrilla_ArchivosRegDoc").closest("div"));
    $("#tbGrilla_ArchivosRegDoc").jqGrid('setLabel', 'NOMBRE_ARCHIVO', 'Nombre de Documento', {
        'text-align': 'center'
    }, {
        'title': 'Nombre de Documento'
    });
    $("#tbGrilla_ArchivosRegDoc").jqGrid('setLabel', 'SIZE_ARCHIVO', 'Tamaño', {
        'text-align': 'center'
    }, {
        'title': 'Tamaño'
    });
};
function cargarGrillaArchExpeRegDoc(myData, strDiv) {
    var objDiv = $("#" + strDiv).empty();
    var objTbl = objDiv.find("table");

    if (objTbl.length) {
        objTbl.jqGrid("clearGridData").setGridParam({
            data: myData,
            page: 1
        }).trigger("reloadGrid");
    } else {
        var objTbl = $("<table id='tbGrilla_ArchivosRegDoc'>").addClass("table table-bordered table-hover table-striped");
        var objDivPager = $("<div id='divPagerArchivosRegDoc'>");
        objTbl.appendTo(objDiv);
        objDivPager.appendTo(objDiv);
        objTbl.jqGrid({
            data: myData,
            styleUI: "Bootstrap",
            datatype: "local",
            colModel: [{
                name: "DES_NOM_ABR",
                width: 200,
                label: 'Documento',
                align: "center",
                sortable: false,
                formatter: formatterDesNom
            },
            {
                name: "NUM_SIZE_ARCHIVO",
                label: 'Tamaño',
                align: "center",
                width: 80,
                sortable: false,
                formatter: formatterTamanio
            },
            {
                name: '',
                align: "center",
                width: 40,
                sortable: false,
                formatter: formatterDescargaArchivoLf
            }],
            rownumbers: true,
            viewrecords: true,
            caption: "Requisitos del Expediente",
            height: "100%",
            rowList: [10, 50, 70, 100],
            rowNum: 10,
            pager: "#divPagerArchivosRegDoc",
            autowidth: true,
            footerrow: false,
            loadComplete: function () {
                $("#" + strDiv + " table.ui-jqgrid-htable").css("width", "100%").closest("div.ui-jqgrid-hbox").css("padding-right", "0px");
                $("#" + strDiv + " table.ui-jqgrid-btable").css("width", "100%");

                $("#divAdjuntosArchivosRegDoc.ui-jqgrid-pager").css("width", "100%");
                $("#divAdjuntosArchivosRegDoc table").css("font-size", "10px");
            },
            beforeRequest: function () {
                jqGridResponsive($(".jqGridDocs"));
            }
        });
    }
};
function cargarGrillaArchExpeRegDoc2(myData) {
    //console.log("3");
    $("#tbGrilla_ArchivosRegDoc").jqGrid({
        data: myData,
        styleUI: 'Bootstrap',
        datatype: "local",
        colModel: [

            {
                name: 'DES_NOM_ABR',
                align: "center",
                width: 200,
                sortable: false,
                formatter: formatterDesNom
            },
            {
                name: 'NUM_SIZE_ARCHIVO',
                align: "center",
                width: 90,
                sortable: false,
                formatter: formatterTamanio
            },
            {
                name: '',
                align: "center",
                width: 40,
                sortable: false,
                formatter: formatterDescargaArchivoLf
            }
        ],
        rownumbers: true,
        viewrecords: true,
        shrinkToFit: false,
        autowidth: false,
        caption: "",
        rowNum: 10,
        autowidth: true
    });
    jqGridResponsive($("#tbGrilla_ArchivosRegDoc").closest("div"));
    $("#tbGrilla_ArchivosRegDoc").jqGrid('setLabel', 'DES_NOM_ABR', 'Documento', {
        'text-align': 'center'
    }, {
        'title': 'Documento'
    });
    $("#tbGrilla_ArchivosRegDoc").jqGrid('setLabel', 'NUM_SIZE_ARCHIVO', 'Tamaño', {
        'text-align': 'Tamaño'
    }, {
        'title': 'Tamaño'
    });
};
function formatterDesNomMemo(cellvalue, options, rowObject) {
    var strHtmlDesNom = new String();
    strHtmlDesNom = "<div style='cursor:pointer;word-wrap:break-word;white-space:normal;'>" + rowObject.NOMBRE_ARCHIVO + "</div>";
    return strHtmlDesNom;
};
function formatterTamanioMemo(cellvalue, options, rowObject) {
    var strHtmlTamanio = new Object();
    strHtmlTamanio = "<div style='cursor:pointer'>" + rowObject.SIZE_ARCHIVO + " KB" + "</div>";
    return strHtmlTamanio;
};
function formatterDescargaArchivoMemo(cellvalue, options, rowObject) {
    var strHtmlDescarga = new String();
    strHtmlDescarga = "<img src='../Resource/img/Download.png' title='Descargar archivo' style='cursor:pointer' onclick='fnDescargaArchivoMemo(" + JSON.stringify(rowObject) + ")'/>";
    return strHtmlDescarga;
};
function fnDescargaArchivoMemo(rowObject) {
    var url = new String();
    //url = strRutaAdjuntosMemo + rowObject.UBICACION_ARCHIVO; este es el que esta en produccion
    var url = strRutaAplicacionMaster + strRutaAdjuntoServicio + $.param({ idDocCms: rowObject.ID_DOC_CMS, strRuta: rowObject.UBICACION_ARCHIVO, strNomArchivo: rowObject.NOMBRE_ARCHIVO });
    window.open(url, "_blank");
};
function formatterDesNom(cellvalue, options, rowObject) {
    var strHtmlDesNom = new String();
    strHtmlDesNom = "<div style='cursor:pointer;word-wrap:break-word;white-space:normal;' onclick='fnCargarVisor(" + JSON.stringify(rowObject) + ", \"lf\")'>" + rowObject.DES_NOM_ABR + "</div>";
    return strHtmlDesNom;
};
function fnCargarVisorAntecedentesReferecia(rowObject, strTipo) {
    if (strTipo == "memo") {
        var strUrlDescarga = strRutaAplicacionMaster + 'Ventanilla/DescargaArchivo?strTipo=memo&CodCms=' + $("#hfIdDoc").val() + '&strNomArch=&strAction=v&strRuta=' + encodeURIComponent(rowObject.UBICACION_ARCHIVO) + "&IdDocCms=";
        ///$("#ifrVistaPreviaRegDoc").attr("src", url);
        $.get(strUrlDescarga, function (url) {
            $('#ifrVistaPreviaRegDoc').attr('src', url); // Set the iframe source dynamically
        });
    } else if (strTipo == "lf") {
        ///$("#ifrVistaPreviaRegDoc").attr("src", strRutaAplicacionMaster + "Ventanilla/DescargaArchivo?strTipo=lf&CodCms=" + rowObject.COD_CMS + "&strNomArch=" + rowObject.DES_NOM_ABR + "&strAction=v&strRuta=&IdDocCms=" + rowObject.ID_DOC_CMS);
        $.get(strRutaAplicacionMaster + "Ventanilla/DescargaArchivo?strTipo=lf&CodCms=" + rowObject.COD_CMS + "&strNomArch=" + rowObject.DES_NOM_ABR + "&strAction=v&strRuta=&IdDocCms=" + rowObject.ID_DOC_CMS, function (url) {
            $('#ifrVistaPreviaRegDoc').attr('src', url); // Set the iframe source dynamically
        });
    }
    //console.log({ rowObject: rowObject });
    //cargar adjuntos y cargar referencias nuevas
    //console.log({ ref: rowObject });
    $("#lbReferenciasRegDoc").val(rowObject.DES_DOC);
    consultarDocumentoIntranet(rowObject.ID_DOC);
    cons_RegDocReferencias(rowObject.ID_DOC)
    //referenciaas
};
function fnCargarVisor(rowObject, strTipo) {
    if (strTipo == "memo") {
        var strUrlDescarga = strRutaAplicacionMaster + 'Ventanilla/DescargaArchivo?strTipo=memo&CodCms=' + $("#hfIdDoc").val() + '&strNomArch=&strAction=v&strRuta=' + encodeURIComponent(rowObject.UBICACION_ARCHIVO) + "&IdDocCms=";
        ///$("#ifrVistaPreviaRegDoc").attr("src", url);
        $.get(strRutaAplicacionMaster + "Ventanilla/DescargaArchivo?strTipo=lf&CodCms=" + rowObject.COD_CMS + "&strNomArch=" + rowObject.DES_NOM_ABR + "&strAction=v&strRuta=&IdDocCms=" + rowObject.ID_DOC_CMS, function (url) {
            $('#ifrVistaPreviaRegDoc').attr('src', url); // Set the iframe source dynamically
        });
    } else if (strTipo == "lf") {
        ///$("#ifrVistaPreviaRegDoc").attr("src", strRutaAplicacionMaster + "Ventanilla/DescargaArchivo?strTipo=lf&CodCms=" + rowObject.COD_CMS + "&strNomArch=" + rowObject.DES_NOM_ABR + "&strAction=v&strRuta=&IdDocCms=" + rowObject.ID_DOC_CMS);
        $.get(strRutaAplicacionMaster + "Ventanilla/DescargaArchivo?strTipo=lf&CodCms=" + rowObject.COD_CMS + "&strNomArch=" + rowObject.DES_NOM_ABR + "&strAction=v&strRuta=&IdDocCms=" + rowObject.ID_DOC_CMS, function (url) {
            $('#ifrVistaPreviaRegDoc').attr('src', url); // Set the iframe source dynamically
        });
    }
};
function formatterDescargaArchivoLf(cellvalue, options, rowObject) {
    var strHtmlDescarga = ""
    
    if (rowObject.ID_DOC_CMS > 0) {
        strHtmlDescarga = "<img src='../Resource/img/Download.png' title='Descargar archivo' style='cursor:pointer' onclick='fnDescargaArchivoLf(" + JSON.stringify(rowObject) + ")'/>";
        //strHtmlDescarga = "<img src='../Resource/img/Download.png' title='Descargar archivo' style='cursor:pointer' />";
    }
    return strHtmlDescarga;
};
function fnDescargaArchivoLf(rowObject) {
    var url = url = strRutaAplicacionMaster + 'Ventanilla/DescargaArchivo?strTipo=lf&CodCms=' + rowObject.COD_CMS + '&strNomArch=' + rowObject.DES_NOM_ABR + '&strAction=d&strRuta=&IdDocCms=' + rowObject.ID_DOC_CMS;
    window.open(url, "_blank");
};
function formatterTamanio(cellvalue, options, rowObject) {
    var strHtmlTamanio = new Object();
    strHtmlTamanio = rowObject.NUM_SIZE_ARCHIVO + " KB"
    return strHtmlTamanio;
};
function bytesToSize(bytes, decimals) {
    if (bytes == 0) return '0 Bytes';
    var k = 1024,
        dm = decimals <= 0 ? 0 : decimals || 2,
        sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
        i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};