var arrRolesMaster = [];
var arrMovi_consExpediente = [];

var arrMoviTemp_consExpediente = [];


var arrRolesMasterWebConfigVentanilla = [];
var lstDataConsExpeVentanilla = new Object();
var lstDataConsAsignaciones_consExpedientes = new Object();
var strOficinaPivot;
$(document).ready(function () {
    //roles de tramite
    if (noEsVacio(strCodRol)) {
        if (strCodRol.indexOf(",")) {
            arrRolesMaster = strCodRol.split(",");
        } else {
            arrRolesMaster.push(strCodRol);
        }
    }
    
    //console.log("idPersona_rptVentanilla");
    //console.log(idPersona_rptVentanilla);
    strOficinaPivot = strSubPivot.split("|");


    //console.log("strOficinaPivot");
    //console.log(strOficinaPivot);

    cargarDatosMovimientosRegExpeSimple();
    cargarAsignaciones_rptConsultaExpedientes();
});
function cargarDatosMovimientosRegExpeSimple()
{
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
                cargarGrillaRegExpe(lstData);
            }
        });
    };
};

function cargarAsignaciones_rptConsultaExpedientes() {
    var objEn = new Object();
    var objEnUsuario = new Object();
    var objEnEstorg = new Object();
    var objEnMovi = new Object();
    var objEnEstado = new Object();

    objEn.ID_EXPE = strExpediente;
    
    objEnUsuario.CodUsu = idPersona_rptVentanilla;
    objEn.enUsu = objEnUsuario;
    
    objEnEstorg.ID_SUB = strOficinaPivot[0];
    objEnEstorg.ID_SUBOFI = strOficinaPivot[1];
    objEn.enEstorg = objEnEstorg;

    //objEnMovi.ANIO = "2019";
    //objEn.enMovi = objEnMovi;

    //objEnEstado.ID_ESTADO = "10";
    //objEn.enEstado = objEnEstado;
    
    cargarDatosWebApi({
        parametros: objEn,
        nombreObjeto: "objEn",
        callBack: function (lstData) {
            lstDataConsAsignaciones_consExpedientes = lstData;
        },
        url: "Asignacion/traeListaAsigna"
    });
}
function cargarGrillaRegExpe(mydata)
{
    $("#tbGrilla_consExpeVirtual").jqGrid('clearGridData');
    $("#tbGrilla_consExpeVirtual").jqGrid('setGridParam', { data: mydata });
    $("#tbGrilla_consExpeVirtual").trigger('reloadGrid');
    
    $("#tbGrilla_consExpeVirtual").jqGrid({
        data: mydata,
        styleUI: 'Bootstrap',
        datatype: "local",
        colModel: [
            { name: '', align: "center", width: 30, sortable: false, formatter: formatterImg },
            { name: 'enEstorgRemite.ABR_SUBOFI', align: "center", width: 80, sortable: false },        
            { name: 'DES_SUB_TODO', align: "center", width: 220, sortable: false, formatter: formatterSub },
            { name: 'FEC_MOVI', align: "center", width: 180, sortable: false },
            { name: 'enTrata.DES_TRATA', align: "center", width: 120, sortable: false },
            { name: 'enTipDoc.DES_DOC', align: "center", width: 250, sortable: false, formatter: formatterDesDoc },
            { name: 'enEstado.DES_ESTADO', align: "center", width: 170, sortable: false }            
            ],
        rownumbers: true,
        viewrecords: true,
        shrinkToFit: false,
        autowidth: false,
        caption: "",
        rowNum: 10,
        autowidth: false,
        rowList: [10, 25, 50, 75, 100],
        pager: "#divPager_consExpeVirtual"
    });
    jqGridResponsive($("#divConsuHistoricoVentanilla").closest("div"));
    $("#tbGrilla_consExpeVirtual").jqGrid('setLabel', 'enEstorgRemite.ABR_SUBOFI', 'De', { 'text-align': 'center' }, { 'title': 'De' });
    $("#tbGrilla_consExpeVirtual").jqGrid('setLabel', 'DES_SUB_TODO', 'Para', { 'text-align': 'center' }, { 'title': 'Para' });
    $("#tbGrilla_consExpeVirtual").jqGrid('setLabel', 'FEC_MOVI', 'Fecha de Envío', { 'text-align': 'center' }, { 'title': 'Fecha de Envío' });
    $("#tbGrilla_consExpeVirtual").jqGrid('setLabel', 'enTrata.DES_TRATA', 'Tratamiento', { 'text-align': 'center' }, { 'title': 'Tratamiento' });
    $("#tbGrilla_consExpeVirtual").jqGrid('setLabel', 'enTipDoc.DES_DOC', 'Documento', { 'text-align': 'center' }, { 'title': 'Documento' });
    $("#tbGrilla_consExpeVirtual").jqGrid('setLabel', 'enEstado.DES_ESTADO', 'Estado', { 'text-align': 'center' }, { 'title': 'Estado' });  
};
function formatterImg(cellvalue, options, rowObject)
{
    var strHtml = new String();
    if (rowObject.FLG_ORIGINAL == 1) {
        strHtml = "<img id='imgCopia' title='Original' alt='Original' style='cursor: pointer;' src='../Resource/img/copyright.png'/>";
    } else {
        strHtml = "<img id='imgCopia' title='Copia' alt='Copia' style='cursor: pointer;' src='../Resource/img/copy.png'/>";
    }    
    return strHtml;
}
function formatterDesDoc(cellvalue, options, rowObject)
{
    var strHtmlDesDoc = new String();
    /*if (validarFiltrosConsExpe()) {
        if (rowObject.ID_MOVI <= strCodMovi) {
            //strHtmlDesDoc = "<a href='#' onclick='cargarRegDocConsultaDoc(" + rowObject.ID_EXPE + "," + rowObject.ID_MOVI + "," + rowObject.ANIO + "," + rowObject.enTipDoc.ID_DOC + ", \"divRegistroConsultaPublicoDocumentos\", \"\"); return false;'>" + rowObject.enTipDoc.DES_DOC + "</a><br>" + validaNulosJSON(rowObject, "DES_COMENT_INI");
        } else {
            strHtmlDesDoc = rowObject.enTipDoc.DES_DOC + "<br>" + validaNulosJSON(rowObject, "DES_COMENT_INI");
        }
    } else {
        if (strOficinaPivot[0] == rowObject.enEstorg.ID_SUB || strOficinaPivot[0] == rowObject.enEstorgRemite.ID_SUB || rowObject.ID_MOVI <= strCodMovi) {
            strHtmlDesDoc = "<a href='#' onclick='cargarRegDocConsultaDoc(" + rowObject.ID_EXPE + "," + rowObject.ID_MOVI + "," + rowObject.ANIO + "," + rowObject.enTipDoc.ID_DOC + ", \"divRegistroConsultaPublicoDocumentos\", \"\"); return false;'>" + rowObject.enTipDoc.DES_DOC + "</a><br>" + validaNulosJSON(rowObject, "DES_COMENT_INI");
        } else {
            strHtmlDesDoc = rowObject.enTipDoc.DES_DOC + "<br>" + validaNulosJSON(rowObject, "DES_COMENT_INI");
        }
    }*/

    /*if (arrRolesMaster.length > 0) {
        if (validarConsGeneral()) {
            strHtmlDesDoc = "<a href='#' onclick='cargarRegDocConsultaDoc(" + rowObject.ID_EXPE + "," + rowObject.ID_MOVI + "," + rowObject.ANIO + "," + rowObject.enTipDoc.ID_DOC + ", \"divRegistroConsultaPublicoDocumentos\", \"\"); return false;'>" + rowObject.enTipDoc.DES_DOC + "</a><br>" + validaNulosJSON(rowObject, "DES_COMENT_INI");
        } else {
            if (validarFiltrosConsExpe()) {
                if (fnBuscarMovimientoVentanilla(rowObject, lstDataConsExpeVentanilla)) {
                    strHtmlDesDoc = "<a href='#' onclick='cargarRegDocConsultaDoc(" + rowObject.ID_EXPE + "," + rowObject.ID_MOVI + "," + rowObject.ANIO + "," + rowObject.enTipDoc.ID_DOC + ", \"divRegistroConsultaPublicoDocumentos\", \"\"); return false;'>" + rowObject.enTipDoc.DES_DOC + "</a><br>" + validaNulosJSON(rowObject, "DES_COMENT_INI");
                } else {
                    strHtmlDesDoc = rowObject.enTipDoc.DES_DOC + "<br>" + validaNulosJSON(rowObject, "DES_COMENT_INI");
                }
            } else if (fnBuscarMovimientoVentanilla(rowObject, lstDataConsExpeVentanilla)) {
                strHtmlDesDoc = "<a href='#' onclick='cargarRegDocConsultaDoc(" + rowObject.ID_EXPE + "," + rowObject.ID_MOVI + "," + rowObject.ANIO + "," + rowObject.enTipDoc.ID_DOC + ", \"divRegistroConsultaPublicoDocumentos\", \"\"); return false;'>" + rowObject.enTipDoc.DES_DOC + "</a><br>" + validaNulosJSON(rowObject, "DES_COMENT_INI");
            } else {
                strHtmlDesDoc = rowObject.enTipDoc.DES_DOC + "<br>" + validaNulosJSON(rowObject, "DES_COMENT_INI");
            }
        }       
    } else {
        if (fnBuscarMovimientoAsignado(rowObject, lstDataConsExpeVentanilla)) {
            strHtmlDesDoc = "<a href='#' onclick='cargarRegDocConsultaDoc(" + rowObject.ID_EXPE + "," + rowObject.ID_MOVI + "," + rowObject.ANIO + "," + rowObject.enTipDoc.ID_DOC + ", \"divRegistroConsultaPublicoDocumentos\", \"\"); return false;'>" + rowObject.enTipDoc.DES_DOC + "</a><br>" + validaNulosJSON(rowObject, "DES_COMENT_INI");
        } else {
            strHtmlDesDoc = rowObject.enTipDoc.DES_DOC + "<br>" + validaNulosJSON(rowObject, "DES_COMENT_INI");
        }       
    }*/
   
    if (arrRolesMaster.length > 0) {
        if (validarConsGeneral()) {
            strHtmlDesDoc = "<a href='#' onclick='cargarRegDocConsultaDoc(" + rowObject.ID_EXPE + "," + rowObject.ID_MOVI + "," + rowObject.ANIO + "," + rowObject.enTipDoc.ID_DOC + ", \"divRegistroConsultaPublicoDocumentos\", \"\"); return false;'>" + rowObject.enTipDoc.DES_DOC + "</a><br>" + validaNulosJSON(rowObject, "DES_COMENT_INI");
        } else if (validarRolDirector()) {
            console.log("Rol director");
        } else if (validarRolSecretaria()) {
            console.log("Rol secretaria");
        }
    } else { 
    //si no tiene roles en tramite se setea el rol de consulta, si el funcionario tiene asignado el expediente se setea la logica de asignacion
        //console.log("logica de asignacion");
        //console.log(rowObject.ID_MOVI);
        //console.log(validarAsignaciones(rowObject, lstDataConsExpeVentanilla));

        if (validarAsignaciones(rowObject, lstDataConsExpeVentanilla, lstDataConsAsignaciones_consExpedientes)) {
            strHtmlDesDoc = "<a href='#' onclick='cargarRegDocConsultaDoc(" + rowObject.ID_EXPE + "," + rowObject.ID_MOVI + "," + rowObject.ANIO + "," + rowObject.enTipDoc.ID_DOC + ", \"divRegistroConsultaPublicoDocumentos\", \"\"); return false;'>" + rowObject.enTipDoc.DES_DOC + "</a><br>" + validaNulosJSON(rowObject, "DES_COMENT_INI");
        } else {
            strHtmlDesDoc = rowObject.enTipDoc.DES_DOC + "<br>" + validaNulosJSON(rowObject, "DES_COMENT_INI");
        };
    }  
   return strHtmlDesDoc;
};


var fnBuscarMovimientoAsignado = function (objData, lstData) {
    //console.log(strCodMovi);
    if (noEsVacio(strOficinaPivot[0]) && noEsVacio(strOficinaPivot[1])) {
        if (lstData.length > 0) {
            if (noEsVacio(objData)) {
                //console.log(objData.enEstado.ID_ESTADO);
                //console.log(objData.ID_MOVI);
                if (objData.enEstado.ID_ESTADO == 20 || objData.ID_MOVI <= strCodMovi) {
                    console.log("1");
                    return true;
                } else {
                    console.log("-->2");
                    //                    console.log("lstData");
                    //                    console.log(lstData);
                    //                    console.log("objData");
                    //                    console.log(objData);
                    for (var i = 0; i < lstData.length; i++) {
                        //console.log(lstData[i].ID_MOVI);
                        //console.log(lstData[i].enEstorg.ID_SUB + " --- " + strOficinaPivot[0]);
                        //console.log(lstData[i].enEstorg.ID_SUB == strOficinaPivot[0]);
                        //console.log(lstData[i].enEstorgRemite.ID_SUB + " --- " + strOficinaPivot[0]);


                        console.log("objData.ID_MOVI");
                        console.log(objData.ID_MOVI);

                        console.log("lstData[i].ID_MOVI");
                        console.log(lstData[i].ID_MOVI);

                        console.log("lstData[i].enEstorg.ID_SUB");
                        console.log(lstData[i].enEstorg.ID_SUB);

                        console.log("strOficinaPivot[0]");
                        console.log(strOficinaPivot[0]);

                        if (lstData[i].enEstorg.ID_SUB == strOficinaPivot[0] && objData.ID_MOVI <= lstData[i].ID_MOVI) {
                            return true;
                        }


                        /*if ((lstData[i].enEstorg.ID_SUB == strOficinaPivot[0] || lstData[i].enEstorgRemite.ID_SUB == strOficinaPivot[0]) && objData.ID_MOVI <= lstData[i].ID_MOVI && lstData[i].enEstado.ID_ESTADO != 9) {
                        return false;
                        } else {
                        return true;
                        }*/


                    }
                }
            }
        };
        return false;
    }
    return false;
};

var fnBuscarMovimientoVentanilla = function (objData, lstData) {
    if (noEsVacio(strOficinaPivot[0]) && noEsVacio(strOficinaPivot[1])) {
        if (lstData.length > 0) {
            if (noEsVacio(objData)) {
                if ((objData.enEstorg.ID_SUB == strOficinaPivot[0] && objData.enEstorg.ID_SUBOFI == strOficinaPivot[1]) || (objData.enEstorgRemite.ID_SUB == strOficinaPivot[0] && objData.enEstorgRemite.ID_SUBOFI == strOficinaPivot[1])) {
                    return true;
                } else {
                    for (var i = 0; i < lstData.length; i++) {
                        if ((lstData[i].enEstorg.ID_SUB == strOficinaPivot[0] || lstData[i].enEstorgRemite.ID_SUB == strOficinaPivot[0]) && lstData[i].ID_MOVI != objData.ID_MOVI && objData.ID_MOVI < lstData[i].ID_MOVI && lstData[i].enEstado.ID_ESTADO != 9) {
                            return true;
                        }
                    }
                }
            }
        };
        return false;
    }
    return false;
};


function validarAsignaciones(objData, lstDataExpe, lstDataAsignacion) {
    var bool = new Boolean();

    //console.log("objData");
    //console.log(objData);
    //idPersona_rptVentanilla
    //objEnEstorg.ID_SUB = strOficinaPivot[0];
    //objEnEstorg.ID_SUBOFI = strOficinaPivot[1];
    //console.log("lstDataExpe");
    //console.log(lstDataExpe);
    //console.log("lstDataAsignacion");
    //console.log(lstDataAsignacion);

    if (lstDataAsignacion.length > 0) {
        var objEnEstorg = objData.enEstorg; ////Para
        var objEnEstorgRemite = objData.enEstorgRemite; //DE

        //console.log(lstDataAsignacion);

        for (var i = 0; i < lstDataAsignacion.length; i++) {
            var objEnEstorgAsignacion = lstDataAsignacion[i].enEstorg; //de
            var objEnEstorgRemiteAsignacion = lstDataAsignacion[i].enEstorgRemite; //para            
            var objEnEstadoAsignacion = lstDataAsignacion[i].enEstado;

            //console.log("De:" + objEnEstorgAsignacion.ID_SUB);
            //console.log("strOficinaPivot[0]:" + strOficinaPivot[0]);
            //console.log("Para:" + objEnEstorgRemiteAsignacion.ID_SUB);
            //if (objEnEstorg.ID_SUB != strOficinaPivot[0] &&  objEnEstorgAsignacion.ID_SUB == strOficinaPivot[0]) { //Para

            if (objEnEstorgAsignacion.ID_SUB == strOficinaPivot[0]) { //Para
                arrMovi_consExpediente.push(lstDataAsignacion[i].ID_MOVI);
            }
            /*console.log(objData);
            console.log(objData.ID_MOVI);

            console.log("lstDataAsignacion[i].ID_MOVI")
            console.log(lstDataAsignacion[i].ID_MOVI)*/

            /*if (lstDataAsignacion[i].ID_MOVI == objData.ID_MOVI) {
                arrMoviTemp_consExpediente.push(lstDataAsignacion);
            }*/

            var idMovi =  Math.max.apply(Math, arrMovi_consExpediente);
            //console.log(objData);
            //console.log(idMovi);
            //console.log(objData.ID_MOVI == lstDataAsignacion[i].ID_MOVI);
            //if (objEnEstorg.ID_SUB == strOficinaPivot[0] || objEnEstorgRemite.ID_SUB == strOficinaPivot[0] && (objEnEstadoAsignacion.ID_ESTADO == 10 || objEnEstadoAsignacion.ID_ESTADO == 12 || objEnEstadoAsignacion.ID_ESTADO == 13 || objEnEstadoAsignacion.ID_ESTADO == 21)) {
            //if ((objData.ID_MOVI < idMovi || objEnEstorg.ID_SUB == strOficinaPivot[0] || objEnEstorgRemite.ID_SUB == strOficinaPivot[0]) && (objEnEstadoAsignacion.ID_ESTADO == 10 || objEnEstadoAsignacion.ID_ESTADO == 12 || objEnEstadoAsignacion.ID_ESTADO == 13)) {
            //if (objData.ID_MOVI < idMovi || (objData.ID_MOVI == lstDataAsignacion[i].ID_MOVI) && objEnEstorg.ID_SUB == strOficinaPivot[0] || objEnEstorgRemite.ID_SUB == strOficinaPivot[0]) {
            if (objData.ID_MOVI <= idMovi) {
                return true;
            } 
            /*else {
                return false;
            }*/
        }
    }
    else {
        return false;
    }
    //console.log(bool);
    //return bool;
}


function validarOfiPrincipal(objData) {
    var bool = new Boolean();
    var objEstorg = objData.enEstorg;
    var objEstorgRemite = objData.enEstorgRemite;

    var idSubOfi = strOficinaPivot[1];

    var strCodSub = idSubOfi.substring(0, idSubOfi.indexOf("0000"));

    //if (objEstorg.ID_SUBOFI.match("^" + strCodSub) || objEstorgRemite.ID_SUBOFI.match("^" + strCodSub) || objData.ID_MOVI < strIdRegMovi) {
    if (objEstorg.ID_SUBOFI.match("^" + strCodSub) || objEstorgRemite.ID_SUBOFI.match("^" + strCodSub)) {
        bool = true;
    } else {
        bool = false;
    };
    return bool;
}


function cargarRegDocConsultaDoc(intIdExpe, intIdMovi, intIdAnoProc, intIdDoc, strIdDiv, strFunction)
{    
    BootstrapDialog.show({
        title: 'Registro de Proyectos',
        type: BootstrapDialog.TYPE_PRIMARY,
        closable: true,
        draggable: true,
        cssClass: 'login-dialog',
        size: BootstrapDialog.SIZE_WIDE,
        message: $("<div id='divVisor' style='height: 50%;'></div>").load(strRutaAplicacionMaster + "Publico/Ventanilla/regDocumento?intIdExpe=" + intIdExpe + "&intIdMovi=" + intIdMovi + "&intIdDoc=" + intIdDoc + "&intIdAnoProc=" + intIdAnoProc + "&strIdDiv=" + strIdDiv)
    });
};
function formatterSub(cellvalue, options, rowObject)
{
    cellvalue = rowObject.enEstorg.ABR_SUBOFI + " - " + cellvalue;
    return cellvalue;
};
function poneUbicacionActualRegExpeSimple(lstData)
{
    var strHtml = new String();
    for (var i = 0; i < lstData.length; i++) {
        strHtml = strHtml + '<tr><td>' + lstData[i].enEstorg.DES_SUBOFI + '</td></tr>';
    };
    $("#tblUbicacionActualRegExpeSimple").html(strHtml);
};
function cargaAnexosExpedienteSimple()
{
    var objEnAnexo = new Object();
    if (noEsVacio(strExpediente)) { objEnAnexo.ID_EXPE = strExpediente; }

    cargarDatosWebApi({
        parametros: objEnAnexo,
        nombreObjeto: "objEnAnexo",
        url: "Expe/traeListaAnexos",
        callBack: function (lstData)
        {
            cargaHiperVinculoSimple(lstData);
        }
    });
};
function cargaHiperVinculoSimple(lstData)
{
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

function validarConsGeneral() {
    var bool = new Boolean();
    bool = validarControlesRoles({ strRoles: $("#hfIdConsDocu").val() }); //roles de web config
    return bool;
}

function validarRolDirector() {
    var bool = new Boolean();
    bool = validarControlesRoles({ strRoles: $("#hfIdRolDirector").val() }); //roles de web config
    return bool;
}

function validarRolSecretaria() {
    var bool = new Boolean();
    bool = validarControlesRoles({ strRoles: $("#hfIdRolSecretaria").val() }); //roles de web config
    return bool;
}

function validarFiltrosConsExpe() {
    var bool = new Boolean();
    var strCodigoWebConfig = $("#hfIdConsDocu").val();

    if (strCodigoWebConfig.indexOf(",")) {
        arrRolesMasterWebConfigVentanilla = strCodigoWebConfig.split(",");
    } else {
        arrRolesMasterWebConfigVentanilla.push(strCodigoWebConfig);
    }
       
    for (var i = 0; i < arrRolesMaster.length; i++) {
        var idrol = arrRolesMaster[i];
        bool = checkValue(idrol, arrRolesMasterWebConfigVentanilla)
        if (bool) break;
        break;
    }    
    return bool;
}

function checkValue(value, arr) {
    var bool = new Object();
    bool = false;

    for (var i = 0; i < arr.length; i++) {
        var name = arr[i];
        if (name == value) {
            bool = true;
            break;
        }
    }
    return bool;
}
