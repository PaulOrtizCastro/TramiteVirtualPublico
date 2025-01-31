var strCodFuente = "C";
var intTipDocTupaMaster;
var strOprRegExpe = new String();
var tipoDeDocumento = "";

$(document).ready(function () {
    var idExpe = $("#hfIdExpe_consultaExpeGrilla").val();
    configuracionInicialRegExpe(idExpe);
});
function fnRegresar()
{
    var strPaginaDefaultMasterPublicoPorExpe = "Publico/Ventanilla/consultaPublicaExpediente";
    cargarContenidoEnDiv("divContenidoMaster", strRutaAplicacionMaster + strPaginaDefaultMasterPublicoPorExpe);
};
function configuracionInicialRegExpe(strIdRegExpe)
{
    strOprRegExpe = "R";    
    $("#lblCabeceraFeChaVisto").text($("#hfidFecVisto").val())
    cargarDatosRegExpe(strIdRegExpe);
    configurarFormSoloLectura();
};
function cargarDatosRegExpe(intIdExpe)
{
    var objEnExpe = new Object();
    if (noEsVacio(intIdExpe) == false) return;
    objEnExpe.ID_EXPE = intIdExpe;
    objEnExpe.DATO = $("#idHfConsCodForm").val();

    cargarDatosWebApi({
        parametros: objEnExpe,
        nombreObjeto: "objEnExpe",
        url: "Expe/consultar",
        callBack: function (lstData) {
            //console.log(lstData);
            if (lstData.ID_EXPE > 0) {
                if (noEsVacio(lstData.enTipDoc)) {
                    tipoDeDocumento = lstData.enTipDoc.ID_TIP_DOC;
                    if (lstData.enTipDoc.ID_TIP_DOC == 7) {
                        $("#divTupaVentanilla").show();
                        $(".modal-header").css('background-color', '#dff0d8');
                    } else {
                        $("#divTupaVentanilla").hide();
                        $(".modal-header").css('background-color', '#FFDBC7');
                    }
                }
                if (lstData.ID_EXPE > 0) {
                    if ($("#hfCodForm").val() == "CE") {
                        if ($("#hfCodForm").val() == "CE") {
                            if (lstData.enOrigen.ID_ORIGEN == 1 || lstData.enOrigen.ID_ORIGEN == 3) {
                                $("#divVentanillaDatos").show();
                                $("#divVentanillaSituacionActual").show();
                                $("#divMensajeVentanillaGrilla").hide();

                                var objEnExpeConsultaPublica = new Object();

                                if (validaNulosNumeros(lstData.ID_EXPE) > 0) {
                                    objEnExpeConsultaPublica = lstData;
                                    //console.log("1");
                                    ponerDatosLabelsCabeceraExpe(objEnExpeConsultaPublica);
                                } else {
                                    BootstrapDialog.alert({
                                        title: 'Alerta de sistema',
                                        message: 'No se encontraron datos para su consulta',
                                        type: BootstrapDialog.TYPE_PRIMARY,
                                        closable: true,
                                        draggable: true,
                                        buttonLabel: 'Aceptar'
                                    });
                                }
                            }
                        }
                    } else {
                        if (validaNulosNumeros(lstData.ID_EXPE) > 0) {
                            var objEnExpeConsultaPublica = new Object();
                            objEnExpeConsultaPublica = lstData;
                            //console.log("2");
                            ponerDatosLabelsCabeceraExpe(objEnExpeConsultaPublica);
                            if ($("#hfCodForm").val() == "CET") {
                                var objParams = new Object();
                                objParams.strDesOrigen = validaNulosJSON(objEnExpeConsultaPublica.enOrigen, "DES_ORIGEN");
                                objParams.strExpediente = objEnExpeConsultaPublica.ID_EXPE;
                                objParams.strTipoDocumento = objEnExpeConsultaPublica.enTipDoc.DES_TIP_DOC;
                                objParams.strfec = objEnExpeConsultaPublica.FEC_EXPE;
                                objParams.strPriori = objEnExpeConsultaPublica.enPriori.DES_PRIORI;
                                objParams.strNumDoc = objEnExpeConsultaPublica.enTipDoc.NUM_DOC;
                                objParams.strFecPlazo = objEnExpeConsultaPublica.FEC_PLAZO_FIN;
                                objParams.strNumFolios = objEnExpeConsultaPublica.enTipDoc.NUM_FOLIOS;
                                objParams.strDesEstado = objEnExpeConsultaPublica.enEstado.DES_ESTADO;
                                objParams.strCodLog = ((objEnExpeConsultaPublica.COD_LOG == null) ? "--" : objEnExpeConsultaPublica.COD_LOG);

                                objParams.idPersona = $("#hfIdPersona_consultaExpeGrilla").val();
                                objParams.idResponsable = $("#hfIdResponsable_consultaExpeGrilla").val();
                                objParams.codRol = $("#hfCodRol").val();
                                objParams.codMovi = $("#hfCodMovi").val();
                                objParams.SubPivot = $("#hfIdSubPivot").val();

                                objParams.cf = strCodFuente;
                                //console.log(objParams);
                                cargarContenidoEnDiv('divConsuHistoricoVentanilla', strRutaAplicacionMaster + 'Publico/Ventanilla/consultaExpedientes?' + $.param(objParams));
                            }
                        } else {
                            BootstrapDialog.alert({
                                title: 'Alerta de sistema',
                                message: 'No se encontraron datos para su consulta',
                                type: BootstrapDialog.TYPE_PRIMARY,
                                closable: true,
                                draggable: true,
                                buttonLabel: 'Aceptar'
                            });
                        }
                    }
                } else {
                    $("#divMensajeVentanillaGrilla").show();
                }
            } else {
                var urlVisorExpe = strRutaAplicacionMaster + 'Publico/Ventanilla/_mensajeMemo';
                location.assign(urlVisorExpe);
            }
        }
    });
};

function ponerDatosLabelsCabeceraExpe(objExpe)
{
    //console.log("ponerDatosLabelsCabeceraExpe");
    //$("#lblCabeceraExpe").html((objExpe.ID_EXPE == "" ? "--" : objExpe.ID_EXPE));
    //$("#lblCabeceraFec").html(objExpe.FEC_EXPE);
    //$("#lblCabeceraOrigen").html(objExpe.enOrigen.DES_ORIGEN);
    //$("#lblCabeceraTipDoc").html(objExpe.enTipDoc.DES_TIP_DOC + "   " + (objExpe.enTupa.ID_TUPA == -1 ? " " : objExpe.enTupa.ID_TUPA)); 
    //$("#lblCabeceraNumDoc").html((noEsVacio(objExpe.enTipDoc.NUM_DOC)? objExpe.enTipDoc.NUM_DOC : " S/N "));
    $("#lblCabeceraNumDoc").html(validaNulosJSON(objExpe.enTipDoc, "NUM_DOC"));
    //$("#lblCabeceraTipDoc").html(validaNulosJSON(objExpe.enTipDoc, "DES_TIP_DOC") + "   " + validaNulosJSON(objExpe.enTupa, "ID_TUPA"));
    $("#lblCabeceraExpe").html(validaNulosJSON(objExpe, "ID_EXPE"));
    $("#lblCabeceraFec").html(validaNulosJSON(objExpe, "FEC_EXPE"));
    $("#lblCabeceraOrigen").html(validaNulosJSON(objExpe.enOrigen, "DES_ORIGEN"));
    $("#lblCabeceraTipDoc").html(validaNulosJSON(objExpe.enTipDoc, "DES_TIP_DOC") + "   " + (objExpe.enTupa ==  undefined ? " " : objExpe.enTupa.ID_TUPA));
    $("#taCabeceraAsunto").text(objExpe.DES_ASUNTO);
    $("#lblCabeceraRegistrado").html(objExpe.COD_LOG);
    $("#lblCabeceraPersonaNaturalJuridica").html(objExpe.DES_PERSONA);
    $("#lblCabeceraClasificacion").html(objExpe.DES_CLASIF);

    var objEnMovi = new Object();
    objEnMovi.ID_EXPE = objExpe.ID_EXPE;
    objEnMovi.OPR = '3';

    cargarDatosWebApi({
        parametros: objEnMovi,
        nombreObjeto: "objEnMovi",
        url: "Expe/traeListaMovi",
        callBack: function (lstData) {
            var arrayTempAnulado = [];
            var arrayTempPendiente = [];
            var strMensajeEstado = new String();
            strMensajeEstado = "";

            if (tipoDeDocumento == "7") {//tupa
                //console.log("tupa");
                var objEnExpe = new Object();
                objEnExpe.ID_EXPE = objEnMovi.ID_EXPE;
                cargarDatosWebApi({
                    parametros: objEnExpe,
                    nombreObjeto: "objEnExpe",
                    url: "Expe/consultarExpTupa",
                    callBack: function (lstData) {
                        if (lstData.length > 0) {
                            if (lstData[0].enEstado.ID_ESTADO == 29) {
                                strMensajeEstado = "Finalizado";
                            } else if (lstData[0].enEstado.ID_ESTADO == 19) {
                                strMensajeEstado = "Anulado";
                            } else {
                                //strMensajeEstado = "En Proceso";
                                //funcion que tiene callback
                                cargarUbicacionExpe(objEnMovi, {
                                    callBack: function (lstUbicacion) {
                                        //console.log("objUbicacion");
                                        //console.log(lstUbicacion);
                                        //console.log(lstUbicacion.length);
                                        if (lstUbicacion.length > 0) {
                                            if (noEsVacio(lstUbicacion[0].enEstorg.DES_SUBOFI)) {
                                                $("#lblCabeceraEstado").text("");
                                                $("#lblCabeceraEstado").text("En proceso");
                                            } else {
                                                $("#lblCabeceraEstado").text("");
                                                $("#lblCabeceraEstado").text("Finalizado");
                                            }
                                        }
                                    }
                                });
                            }
                        }
                        //$("#lblCabeceraEstado").html(strMensajeEstado);
                    }
                });
            } else {//no tupa
                //console.log("no tupa");
                for (var i = 0; i < lstData.length; i++) {
                    //console.log(lstData[i].enEstado);
                    if (lstData[i].enEstado.ID_ESTADO == 9) {//anulado                
                        arrayTempAnulado.push(lstData[i].enEstado.ID_ESTADO);
                    }
                    if (lstData[i].enEstado.ID_ESTADO != 1 && lstData[i].enEstado.ID_ESTADO != 9) { //pendientes                    
                        arrayTempPendiente.push(lstData[i].enEstado.ID_ESTADO);
                    }
                }
                if (lstData.length == arrayTempAnulado.length) {
                    strMensajeEstado = "Anulado";
                } else if (arrayTempPendiente.length > 0) {
                    strMensajeEstado = "En proceso";
                } else {
                    strMensajeEstado = "Finalizado";
                }
                $("#lblCabeceraEstado").html(strMensajeEstado);
                cargarUbicacionExpe(objEnMovi);
            }
        }
    });
    //console.log("objExpe");
    //console.log(objExpe);
    if (objExpe.enTupa != undefined) {
        var objEnTupa = new Object();
        objEnTupa.ID_TUPA = objExpe.enTupa.ID_TUPA;
        objEnTupa.OPR = 1;
        cargarDatosWebApi({
            parametros: objEnTupa,
            nombreObjeto: "objEnTupa",
            url: "Tupa/traeListaTupa",
            callBack: function (lstData)
            {
                if (lstData.length > 0) {
                    $("#lblCabeceraTupa").text(lstData[0].COD_TUPA + " - " + lstData[0].DES_NOM);
                } else {
                    $("#lblCabeceraTupa").text("--");
                }
            }
        });
    } else {
        $("#lblCabeceraTupa").text("--");
    }
   
   cargaAnexosExpediente(objEnMovi.ID_EXPE);
   configurarFormSegunTipDoc(objExpe.enTipDoc.ID_TIP_DOC);
};

function cargarUbicacionExpe(objEnMovi, obj) {
    //console.log("cargarUbicacionExpe");
    var defaults = {
        callBack: function () { }
    };
    //objCallback = $.extend(function () { }, objCallback);
    var defaults = $.extend(defaults, obj);

    cargarDatosWebApi({
        parametros: objEnMovi,
        nombreObjeto: "objEnMovi",
        url: "Expe/traeListaUbicacionActual",
        callBack: function (lstData) {
            /*modificar*/
            //console.log("traeListaUbicacionActual");
            //console.log(lstData[0]);
            poneUbicacionActualRegExpe(lstData[0]);
            defaults.callBack(lstData);
        }
    });
}
function poneUbicacionActualRegExpe(objData) {
    var strHtml = new String();
    //    for (var i = 0; i < lstData.length; i++) {
    //        if (noEsVacio(lstData[i].enEstorg.DES_SUBOFI)) {
    //            strHtml = strHtml + '<tr><td>' + lstData[i].enEstorg.DES_SUBOFI + '</td></tr>';
    //        } else {
    //            strHtml = "";            
    //        }        
    //    };
    if (noEsVacio(objData)) {
        if (noEsVacio(objData.enEstorg.DES_SUBOFI)) {
            strHtml = strHtml + '<tr><td>' + objData.enEstorg.DES_SUBOFI + '</td></tr>';
        }
        else {
            strHtml = "";
        }
    }
    $("#lblCabeceraubicacion").html((strHtml == "" ? "--" : strHtml));
};
function configurarFormSoloLectura()
{
    $("#trRequisitosRegExpe input[type=checkbox]").attr("disabled", "disabled");
};
function configurarFormSegunTipDoc(intValor)
{
    if (strOprRegExpe == "R") {
        if (intValor == intTipDocTupaMaster) {
            $("#trRequisitosLecturaRegExpe").show();
            $("#trRequisitosLecturaRegExpe input").attr("disabled", "disabled");
        } else {
            $("#trRequisitosLecturaRegExpe").hide();
        };
    };
};
function cargaAnexosExpediente(strIdRegExpe)
{
    var objEnAnexo = new Object();
    if (noEsVacio(strIdRegExpe)) { objEnAnexo.ID_EXPE = strIdRegExpe; }

    cargarDatosWebApi({
        parametros: objEnAnexo,
        nombreObjeto: "objEnAnexo",
        url: "Expe/traeListaAnexos",
        callBack: function (lstData)
        {
            if (lstData.length > 0) {
                $("#divAnexo").show();
                cargaHiperVinculo(lstData, strIdRegExpe);
            }            
        }
    });
};
function cargaHiperVinculo(lstData, strIdRegExpe)
{
    var strSubsanacion = new String();
    var strInfComplementaria = new String();
    var strImgAttachment = "<img src='" + strRutaAplicacionMaster + "Resource/img/attachment.png' title='Expediente anexado'/>";

    $("#tdAnexosRegExpe").html("");
    if (lstData.length > 0) {
        var strHtml = new String();
        strHtml = "<table>"

        if (lstData[0].ID_EXPE != strIdRegExpe) {
            $("#lblLeyendaVentanilla").hide();
            $("#lblAnexoVentanilla").text("");
            strHtml = "<tr><td colspan='3' class='campoDatos'>Expediente Principal: <a href='#' onclick='strIdRegExpe=" + lstData[0].ID_EXPE + "; strOprRegExpe = \"R\";  cargarDatosRegExpe(" + lstData[0].ID_EXPE + "); configurarFormSoloLectura(); return false;'>" + lstData[0].ID_EXPE + "</a></td>";
        };
        for (var i = 0; i < lstData.length; i++) {
            strHtml += "<tr>";
            if (lstData[i].ID_EXPE_HIJO == strIdRegExpe) {
                $("#btnAnexarRegExpe").hide();
            }
            else {
                $("#lblLeyendaVentanilla").show();
                $("#lblAnexoVentanilla").text("Exp. Anexado(s)");
                strHtml += "<td>" + strImgAttachment + "</td><td>Expediente N° <a href='#' onclick='strIdRegExpe=" + lstData[i].ID_EXPE_HIJO + "; strOprRegExpe = \"R\";  cargarDatosRegExpe(" + lstData[i].ID_EXPE_HIJO + "); configurarFormSoloLectura(); return false;'>" + lstData[i].ID_EXPE_HIJO + "</a></td><td></td>";                
            };
            strHtml += "</tr>";
        };
        $("#hfTotalAnexosRegExpe").val(lstData.length);
        $("#tdAnexosRegExpe").html(strHtml + "</table>");
    } else {
        $("#tdAnexosRegExpe").html("Sin anexos");
    };
};