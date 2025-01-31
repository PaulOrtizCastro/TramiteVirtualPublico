/// <reference path="knockout-3.1.0.js" />
/// <reference path="knockout.mapping.js" />

function viewModelAsigna() {
    var self = this;
    this.constructor = function (objData) {
        var objObservable = ko.mapping.fromJS(objData);
        var strSrc = new String();
        objObservable.linkExpediente = ko.computed(function () {
            return "sistema/registro/regExpediente.aspx"
        });
        objObservable.srcSemaforo = ko.computed(function () {
            switch (objObservable.SEMAFORO()) {
                case 3:
                    strSrc = "verde.gif";
                    break;
                case 2:
                    strSrc = "amarillo.gif";
                    break;
                case 1:
                    strSrc = "rojo.gif";
                    break;
            };
            return "resource/img/" + strSrc
        });
        return objObservable;
    };
    this.arrListaPendientes = ko.observableArray();
    this.traeListaPendientes = function (intIdSub, strIdSubOfi, strAnio) {
        var objEnAsigna = new Object();
        var objEnPriori = new Object();
        var objEnEstorg = new Object();
        objEnEstorg.ID_SUB = intIdSub;
        objEnEstorg.ID_SUBOFI = strIdSubOfi;
        objEnAsigna.ANIO = strAnio;
        objEnAsigna.enEstorg = objEnEstorg
        objEnAsigna.OPR = 2
        cargarDatosWebApi({ parametros: objEnAsigna,
            nombreObjeto: "objEnAsigna",
            divMensaje: "",
            url: "asigna/traeRptPendientesAsignaciones",
            callBack: function (lstData) {
                if (lstData.length > 0) {
                    for (var i = 0; i <= lstData.length - 1; i++) {
                        self.arrListaPendientes.push(self.constructor(lstData[i]));
                    };
                };
            }
        });
    };
};