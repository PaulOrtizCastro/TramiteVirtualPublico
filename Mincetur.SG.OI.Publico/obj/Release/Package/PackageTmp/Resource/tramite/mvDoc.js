/// <reference path="utilitarios.js" />
/// <reference path="jquery-1.9.0.min.js" />
/// <reference path="knockout-3.1.0.js" />

function mvDocViewModel() {
    this.cargar = function (intIdDoc, strIdDiv, callBack) {
        var objEnDoc = new Object();
        var objDiv = $("#" + strIdDiv);
        objEnDoc.ID_DOC = intIdDoc;
        cargarDatosWebApi({ parametros: objEnDoc,
            nombreObjeto: "objEnDoc",
            divMensaje: "divMensajeMVDoc",
            url: "doc/traeListaDoc",
            async: false,
            callBack: function (lstData) {
                var objEnDoc = lstData[0];
                objDiv.find("[data-id=DES_DOC]").html(objEnDoc.DES_DOC);
                objDiv.find("[data-id=DES_OBS]").text(objEnDoc.DES_OBS);
                objDiv.find("[data-id=ID_ANO_PROC]").text(objEnDoc.ID_ANO_PROC);
                objDiv.find("[data-id=ID_EXPE]").text(objEnDoc.ID_EXPE);
                objDiv.find("[data-id=DESC_USU]").text(objEnDoc.DESC_USU);
                objDiv.find("[data-id=DESC_OFI_ABR]").text(objEnDoc.DESC_OFI_ABR);
                objDiv.find("[data-id=DES_ESTADO]").html(objEnDoc.DES_ESTADO);
                callBack(objEnDoc);
            }
        });
    },
    this.cargarVisor = function () {
        cargarPDF(strRutaAplicacionMaster + "sistema/publico/verArchivo.aspx", "the-canvas");
    },
    this.generarPlantilla = function () {
        window.open(strRutaAplicacionMaster + "sistema/publico/verArchivo.aspx?intIdDoc=" + self.ID_DOC, "Plantilla");
    },
    this.modificar = function () {
        self.opcion("U");
    },
    this.cancelar = function () {
        self.opcion("R");
        $("#frmUploadContent").closest(".formularioModal").dialog("close");
    },
    this.AddDoc = function () {
        self.lstDoc.push(new mvDoc());
        self.opcion("I");
    },
    this.actualizarDoc = function (objEnDoc) {
        var strPivot = (self.lstDoc()[0].ID_OFICONC()).split("|");
        objEnDoc.ID_DOC = self.lstDoc()[0].ID_DOC();
        objEnDoc.DES_DOC = self.lstDoc()[0].DES_DOC();
        objEnDoc.DES_OBS = self.lstDoc()[0].DES_OBS();
        objEnDoc.FLG_EST = self.lstDoc()[0].FLG_EST();
        objEnDoc.ID_ANO_PROC = self.lstDoc()[0].ID_ANO_PROC();
        objEnDoc.ID_DOC = self.lstDoc()[0].ID_DOC();
        objEnDoc.ID_EXPE = self.lstDoc()[0].ID_EXPE();
        objEnDoc.ID_MOVI = self.lstDoc()[0].ID_MOVI();
        objEnDoc.ID_SUB = strPivot[1];
        objEnDoc.ID_SUBOFI = strPivot[0];
        objEnDoc.ID_ESTADO = self.lstDoc()[0].ID_ESTADO();
        objEnDoc.ID_TIP_DOC = self.lstDoc()[0].ID_TIP_DOC();
        objEnDoc.NUM_DOC = self.lstDoc()[0].NUM_DOC();
        objEnDoc.OPR = self.opcion();
        actualizarDatosWebApi({ parametros: objEnDoc, nombreObjeto: "objEnDoc", url: "doc/actualizar", divMensaje: "divMensajeMVDoc",
            callBack: function (objError) {
                self.opcion("R");
                self.cargar(objError.VALOR);
            }
        });
        return false;
    }
};

function mvDocRevViewModel(strIdDiv) {
    var self = this;
    self.opcion = "R";
    $("#" + strIdDiv).parent("div").find("[name=btnRefrescarRevision]").click(function () {
        self.refrescar();
        return false;
    });
    self.refrescar = function () {
        self.opcion = "R";
        self.cargar(self.ID_DOC);
    },
    self.cargar = function (intIdDoc, bolDownload) {
        var objEnDocRev = new Object();
        var value = new String();
        self.ID_DOC = intIdDoc;
        objEnDocRev.ID_DOC = intIdDoc;
        objEnDocRev.FLG_EST = 1;
        cargarDatosWebApi({ parametros: objEnDocRev,
            nombreObjeto: "objEnDocRev",
            divMensaje: "divMensajeMVDoc",
            url: "docRev/traeListaDocRev",
            callBack: function (lstData) {
                var intUltimo = lstData.length;
                cargarDataTables(strIdDiv, lstData,
                [
                    {
                        "title": "", "data": null, "render": function (data, type, full, meta) {
                            var strHtml = new String();
                            if (srtRolPrincipalMaster == "1")
                                strHtml = "<img src='resource/img/icon_delete_file.gif' alt='Anular' title='Anular revisión' class='imagenBoton' />";
                            return strHtml;
                        }, "className": "dt-body-center"
                    },
                    { "title": "Comentarios", "data": "DES_OBS" },
                    { "title": "Autor", "data": "DESC_USU" },
                    { "title": "Fecha", "data": "FEC_INI" },
                    { "title": "", "data": "ID_CONTENT", "render": function (data, type, full, meta) {
                        //var strHtml = "<img data-sel='" + (bolDownload ? "1" : "0") + "' onclick=\"if (" + bolDownload + ") cargarVisorDocumento('', '" + data + "', 'attachment')" + "; else alert('Por seguridad no se puede descargar el archivo adjunto'); return false;\" src='resource/img/Download.png' alt='Descargar' title='Descargar' class='imagenBoton' />";
                        var strHtml = "<img data-sel='" + (bolDownload ? "1" : "0") + "' src='resource/img/Download.png' alt='Descargar' title='Descargar' class='imagenBoton' />";
                        return strHtml;
                    }, "className": "dt-body-center"
                    }
                ], false, function (nRow, aData, iDataIndex) {

                    $(nRow).css("cursor", "pointer");

                    $('td:eq(0)', nRow).find("img").click(function () {
                        value = $('td:eq(4)', nRow).find('img').attr('data-sel');
                        if (value == "1") {
                            $("#" + strIdDiv + " tbody").find("tr").removeClass("grid_cell_resaltado_alt")
                            $(nRow).addClass("grid_cell_resaltado_alt");
                            cargarVisorDocumento("ifrVistaPreviaRegDoc", aData.ID_CONTENT, "inline");
                            self.eliminar(aData.ID_DOC, aData.ID_DOC_REV, aData.ID_CONTENT);
                        };
                        return false;
                    });

                    $('td:eq(4)', nRow).find('img').click(function () {
                        value = $(this).attr("data-sel");
                        if (value == "1") {
                            $("#" + strIdDiv + " tbody").find("tr").removeClass("grid_cell_resaltado_alt")
                            $(nRow).addClass("grid_cell_resaltado_alt");
                            cargarVisorDocumento("ifrVistaPreviaRegDoc", aData.ID_CONTENT, "inline");
                            cargarVisorDocumento("", aData.ID_CONTENT, "attachment");
                        } else {
                            $("#divPopUpConfirmDocumento").cargaPopUpAlert({ mensaje: "No tiene privilegios para descargar el ducumento" });
                        };
                        return false;
                    });

                    if (iDataIndex >= 0) {
                        $(nRow).click(function () {
                            value = $('td:eq(4)', nRow).find('img').attr('data-sel');
                            if (value == "1") {
                                $("#" + strIdDiv + " tbody").find("tr").removeClass("grid_cell_resaltado_alt")
                                $(nRow).addClass("grid_cell_resaltado_alt");
                                cargarVisorDocumento("ifrVistaPreviaRegDoc", aData.ID_CONTENT, "inline");
                            } else {
                                $("#divPopUpConfirmDocumento").cargaPopUpAlert({ mensaje: "No tiene privilegios para visualizar el ducumento" });
                            };
                            return false;
                        });
                    };
                });
                switch (intUltimo) {
                    case 0:
                        $("#ifrVistaPreviaRegDoc").attr("src", "");
                        break;
                    default:
                        if (bolDownload) cargarVisorDocumento("ifrVistaPreviaRegDoc", lstData[intUltimo - 1].ID_CONTENT, "inline");
                        $("#" + strIdDiv + " tr:last").addClass("grid_cell_resaltado_alt");
                };
            }
        });
    };
    self.modificar = function () {
        self.opcion("U");
    },
    self.eliminar = function (intIdDoc, intIdDocRev, intIdContent) {
        $("#divPopUpConfirmDocumento").cargaPopUpConfirm({ mensaje: "¿Está seguro(a) que desea eliminar el registro?",
            callBack: function (response) {
                if (response) {
                    self.opcion = "D";
                    var objEnDocRev = new Object();
                    objEnDocRev.ID_DOC = intIdDoc;
                    objEnDocRev.ID_DOC_REV = intIdDocRev;
                    objEnDocRev.OPR = "D";
                    self.actualizarDocRev(objEnDocRev);
                    var objEnContent = new Object();
                    objEnContent.ID_CONTENT = intIdContent;
                    actualizarDatosWebApi({ parametros: objEnContent, nombreObjeto: "objEnContent", url: "content/eliminarArchivoAlfresco", divMensaje: "divMensajeMVDoc",
                        callBack: function (objError) {
                            //alert(objError.DES_ERROR);
                        }
                    });
                };
            }
        });
        
        /*if (confirm("Está seguro(a) que desea eliminar el registro?")) {
            self.opcion = "D";
            var objEnDocRev = new Object();
            objEnDocRev.ID_DOC = intIdDoc;
            objEnDocRev.ID_DOC_REV = intIdDocRev;
            objEnDocRev.OPR = "D";
            self.actualizarDocRev(objEnDocRev);
            var objEnContent = new Object();
            objEnContent.ID_CONTENT = intIdContent;
            actualizarDatosWebApi({ parametros: objEnContent, nombreObjeto: "objEnContent", url: "content/eliminarArchivoAlfresco", divMensaje: "divMensajeMVDoc",
                callBack: function (objError) {
                    //alert(objError.DES_ERROR);
                }
            });
            //            oReq.open("DELETE", strServidorAlfresco + "alfresco/service/api/node/content/workspace/SpacesStore/" + intIdContent.replace(':/', '').split(";")[0] + "?includeChildren=false");
        };*/
    },
    self.cancelar = function () {
        self.opcion = "R";
        winSubidaArchivoRegDoc.close();
    },
    self.AddDocRev = function (strFuncion) {
        self.opcion = "I";
        if (noEsVacio(strFuncion)) window[strFuncion]();
    },
    self.actualizarDocRev = function (objEnDocRev) {
        objEnDocRev.OPR = self.opcion;
        actualizarDatosWebApi({ parametros: objEnDocRev, nombreObjeto: "objEnDocRev", url: "docRev/actualizar", divMensaje: "divMensajeMVDoc",
            callBack: function (objError) {
                self.opcion = "R";
                self.cargar(objEnDocRev.ID_DOC);
            }
        });
        return false;
    }
};

function mvDocAdj() {
    var self = this;
    self.ID_DOC = ko.observable(-1);
    self.ID_DOC_ADJ = ko.observable(-1);
    self.ID_DOC_REF = ko.observable(-1);
    self.ID_CONTENT = ko.observable(-1);
    self.ID_TIPO = ko.observable("");
    self.DES_OBS = ko.observable();
    self.DESC_USU = ko.observable(srtLogin);
    self.FLG_REF = ko.observable(0);
    self.FLG_EST = ko.observable(1);
    self.DES_EST = ko.observable("Activo");
    self.FEC_INI = ko.observable();
    self.flgSeleccionado = ko.observable(false);
};
function mvDocAdjViewModel() {
    var self = this;
    self.opcion = ko.observable("R");
    self.lstDocAdj = ko.observableArray();
    self.mvDocRev = new Object();
    self.cargar = function (intIdDoc) {
        var objEnDocAdj = new Object();
        objEnDocAdj.ID_DOC = intIdDoc;
        self.ID_DOC = intIdDoc;
        this.lstDocAdj([]);
        cargarDatosWebApi({ parametros: objEnDocAdj,
            nombreObjeto: "objEnDocAdj",
            divMensaje: "divMensajeMVDoc",
            url: "DocAdj/traeListaDocAdj",
            callBack: function (lstData) {
                if (lstData.length > 0) {
                    $.each(lstData, function (index) {
                        self.lstDocAdj.push(new mvDocAdj()
                    .ID_DOC(lstData[index].ID_DOC)
                    .ID_DOC_ADJ(lstData[index].ID_DOC_ADJ)
                    .ID_DOC_REF(lstData[index].ID_DOC_REF)
                    .ID_CONTENT(lstData[index].ID_CONTENT)
                    .ID_TIPO(lstData[index].ID_TIPO)
                    .DES_OBS(lstData[index].DES_OBS)
                    .DESC_USU(lstData[index].DESC_USU)
                    .FLG_REF(lstData[index].FLG_REF)
                    .FLG_EST(lstData[index].FLG_EST)
                    .DES_EST(lstData[index].DES_EST)
                    .FEC_INI(lstData[index].FEC_INI)
                    );
                    });
                };
            }
        });
    };
    self.cargarVisor = function (index) {
        var intIdContent = self.lstDocAdj()[index()].ID_CONTENT();
        var strIdTipo = self.lstDocAdj()[index()].ID_TIPO();
        cargarVisorDocumento("ifrVistaPreviaRegDoc", intIdContent, strIdTipo);
        for (var i = 0; i < self.lstDocAdj().length; i++) {
            self.lstDocAdj()[i].flgSeleccionado(false);
        };
        for (var i = 0; i < self.mvDocRev.lstDocRev().length; i++) {
            self.mvDocRev.lstDocRev()[i].flgSeleccionado(false);
        };
        self.lstDocAdj()[index()].flgSeleccionado(true);
    },
    self.modificar = function () {
        self.opcion("U");
    },
    self.eliminar = function (index) {
        if (confirm("Está seguro(a) que desea eliminar el registro?")) {
            self.opcion("D");
            self.actualizarDocAdj(index);
        };
    },
    self.cancelar = function () {
        self.opcion("R");
        winSubidaArchivoRegDocAdj.close();
    },
    self.AddDocAdj = function (strFuncion) {
        self.lstDocAdj.push(new mvDocAdj().ID_DOC(self.ID_DOC))
        self.opcion("I");
        if (noEsVacio(strFuncion)) window[strFuncion]();
    };
    self.actualizarDocAdj = function (index) {
        var objEnDocAdj = new Object();
        objEnDocAdj.ID_DOC = self.lstDocAdj()[index()].ID_DOC();
        objEnDocAdj.ID_DOC_ADJ = self.lstDocAdj()[index()].ID_DOC_ADJ();
        objEnDocAdj.ID_DOC_REF = self.lstDocAdj()[index()].ID_DOC_REF();
        objEnDocAdj.ID_CONTENT = self.lstDocAdj()[index()].ID_CONTENT();
        objEnDocAdj.DES_OBS = self.lstDocAdj()[index()].DES_OBS();
        objEnDocAdj.FLG_REF = self.lstDocAdj()[index()].FLG_REF();
        objEnDocAdj.FLG_EST = self.lstDocAdj()[index()].FLG_EST();
        objEnDocAdj.OPR = self.opcion();
        actualizarDatosWebApi({ parametros: objEnDocAdj, nombreObjeto: "objEnDocAdj", url: "DocAdj/actualizar", divMensaje: "divMensajeMVDoc",
            callBack: function (objError) {
                if (objEnDocAdj.OPR == "I") {
                    $("#frmUploadContent").submit(function (event) {
                        event.preventDefault();
                        var formData = new FormData(document.getElementById("frmUploadContent"));
                        formData.append("intIdDoc", objEnDocAdj.ID_DOC);
                        formData.append("intIdDocAdj", objError.VALOR);
                        $.ajax({
                            url: strRutaAplicacionMaster + "api/docAdj/uploadDocAdj",
                            type: 'POST',
                            data: formData,
                            async: false,
                            cache: false,
                            contentType: false,
                            processData: false,
                            success: function () {
                                self.opcion("R");
                                self.cargar(objEnDocAdj.ID_DOC);
                                $("#frmUploadContent").closest(".formularioModal").dialog("close");
                            },
                            error: function () {
                                alert("error in ajax form submission");
                            }
                        });
                        return false;
                    });
                    $("#frmUploadContent").submit();
                } else {
                    self.opcion("R");
                    self.cargar(objEnDocAdj.ID_DOC);
                };
            }
        });
        return false;
    }
};

function mvDocFirma() {
    var self = this;
    self.ID_DOC = ko.observable(-1);
    self.ID_DOC_FIRMA = ko.observable(-1);
    self.ID_DOC_REV = ko.observable(-1);
    self.DES_OBS = ko.observable("");
    self.ID_TIPO = ko.observable("");
    self.DESC_USU = ko.observable(srtLogin);
    self.FLG_EST = ko.observable(1);
    self.DES_EST = ko.observable("Creado");
    self.FEC_INI = ko.observable();
    self.flgSeleccionado = ko.observable(false);
};
function mvDocFirmaViewModel() {
    var self = this;
    self.opcion = ko.observable("R");
    self.lstDocFirma = ko.observableArray();
    self.refrescar = function () {
        self.opcion("R");
        self.cargar(self.ID_DOC);
    },
    self.cargar = function (intIdDoc) {
        var objEnDocFirma = new Object();
        self.ID_DOC = intIdDoc;
        objEnDocFirma.ID_DOC = intIdDoc;
        objEnDocFirma.FLG_EST = 1;
        this.lstDocFirma([]);
        cargarDatosWebApi({ parametros: objEnDocFirma,
            nombreObjeto: "objEnDocFirma",
            divMensaje: "divMensajeMVDoc",
            url: "DocFirma/traeListaDocFirma",
            callBack: function (lstData) {
                var intUltimo = lstData.length;
                if (intUltimo > 0) {
                    $.each(lstData, function (index) {
                        self.lstDocFirma.push(new mvDocFirma()
                        .ID_DOC(lstData[index].ID_DOC)
                        .ID_DOC_FIRMA(lstData[index].ID_DOC_REV)
                        .ID_DOC_REV(lstData[index].ID_DOC_REV)
                        .DES_OBS(lstData[index].DES_OBS)
                        .DESC_USU(lstData[index].DESC_USU)
                        .FLG_EST(lstData[index].FLG_EST)
                        .DES_EST(lstData[index].DES_EST)
                        .FEC_INI(lstData[index].FEC_INI)
                        );
                    });
                };
            }
        });
    };
    self.modificar = function () {
        self.opcion("U");
    },
    self.eliminar = function (index) {
        if (confirm("Está seguro(a) que desea eliminar el registro?")) {
            self.opcion("D");
            self.actualizarDocFirma(index);
        };
    },
    self.cancelar = function () {
        self.opcion("R");
    },
    self.AddDocFirma = function (strFuncion) {
        self.lstDocFirma.push(new mvDocFirma().ID_DOC(self.ID_DOC));
        self.opcion("I");
    },
    self.actualizarDocFirma = function (index) {
        var objEnDocFirma = new Object();
        objEnDocFirma.ID_DOC = self.lstDocFirma()[index()].ID_DOC();
        objEnDocFirma.ID_DOC_FIRMA = self.lstDocFirma()[index()].ID_DOC_FIRMA();
        objEnDocFirma.ID_DOC_REV = self.lstDocFirma()[index()].ID_DOC_REV();
        objEnDocFirma.DES_OBS = self.lstDocFirma()[index()].DES_OBS();
        objEnDocFirma.FLG_EST = self.lstDocFirma()[index()].FLG_EST();
        objEnDocFirma.OPR = self.opcion();
        actualizarDatosWebApi({ parametros: objEnDocFirma, nombreObjeto: "objEnDocFirma", url: "DocFirma/actualizar", divMensaje: "divMensajeMVDoc",
            callBack: function (objError) {

            }
        });
        return false;
    }
};