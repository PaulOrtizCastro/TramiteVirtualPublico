/// <reference path="knockout-3.1.0.js" />
/// <reference path="knockout.mapping.js" />

function viewModelExpe() {
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
    this.ArrayOfModels = ko.observableArray();
    this.GetModelsByAjax = function (intIdSub, strIdSubOfi, strAnio) {
        var objEnExpe = new Object();
        var objEnPriori = new Object();
        var objEnEstorg = new Object();
        objEnEstorg.ID_SUB = intIdSub;
        objEnEstorg.ID_SUBOFI = strIdSubOfi;
        objEnExpe.ANIO = strAnio;
        objEnExpe.enEstorg = objEnEstorg
        objEnExpe.OPR = 2
        cargarDatosWebApi({ parametros: objEnExpe,
            nombreObjeto: "objEnExpe",
            divMensaje: "",
            url: "expe/traeRptPendientesExpediente",
            callBack: function (lstData) {
                if (lstData.length > 0) {
                    for (var i = 0; i <= lstData.length - 1; i++) {
                        self.ArrayOfModels.push(self.constructor(lstData[i]));
                    };
                };
            }
        });
    };
};