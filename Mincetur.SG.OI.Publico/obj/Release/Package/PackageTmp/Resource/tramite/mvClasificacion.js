/// <reference path="utilitarios.js" />
/// <reference path="jquery-1.9.0.min.js" />
/// <reference path="knockout-3.1.0.js" />

function mvClasificacion() {
    var self = this;
    self.ID_CLASIF = ko.observable(-1);
    self.DES_CLASIF = ko.observable().extend({ required: true });
    self.ABR_CLASIF = ko.observable().extend({ required: true });
    self.CANTIDAD = ko.observable();
    self.FLG_EST = ko.observable(1);
    self.DES_EST = ko.observable("");
};
function mvClasificacionViewModel() {
    var self = this;
    self.opcion = ko.observable("R");
    self.lstClasificacion = ko.observableArray();
    self.editingItem = ko.observable();
    self.isItemEditing = function (index) {
        return index == self.editingItem();
    };
    self.cargar = function () {
        var objEnClasif = new Object();
        this.lstClasificacion([]);
        cargarDatosWebApi({ parametros: objEnClasif,
            nombreObjeto: "objEnClasif",
            url: "clasif/traeListaClasif",
            callBack: function (lstData) {
                $.each(lstData, function (index) {
                    self.lstClasificacion.push(new mvClasificacion()
                        .ID_CLASIF(lstData[index].ID_CLASIF)
                        .DES_CLASIF(lstData[index].DES_CLASIF)
                        .ABR_CLASIF(lstData[index].ABR_CLASIF)
                        .CANTIDAD(lstData[index].CANTIDAD)
                        .FLG_EST(lstData[index].FLG_EST)
                        .DES_EST(lstData[index].DES_EST)
                        );
                });
            }
        });
    },
    self.modificar = function (index) {
        self.opcion("U");
        self.editingItem(index);
    },
    self.cancelar = function () {
        self.opcion("R");
        self.editingItem(null);
    },
    self.add = function () {
        var objMvClasificacion = new mvClasificacion();
        self.lstClasificacion.push(objMvClasificacion);
        self.opcion("I");
        self.editingItem(objMvClasificacion);
    },
    self.eliminar = function (index) {
        if (confirm("¿Está seguro que desea eliminar el registro seleccionado?")) {
            var objEnClasif = new Object();
            objEnClasif.ID_CLASIF = index.ID_CLASIF();
            objEnClasif.OPR = "D";
            //if (ko.validatedObservable(index).isValid()) {
            actualizarDatosWebApi({ parametros: objEnClasif, nombreObjeto: "objEnClasif", url: "clasif/actualizar",
                callBack: function (objError) {
                    self.opcion("R");
                    self.cargar();
                }
            });
        };
        return false;
    },
    self.actualizar = function (index) {
        var objEnClasif = new Object();
        objEnClasif.ID_CLASIF = index.ID_CLASIF();
        objEnClasif.DES_CLASIF = index.DES_CLASIF();
        objEnClasif.ABR_CLASIF = index.ABR_CLASIF();
        objEnClasif.CANTIDAD = index.CANTIDAD();
        objEnClasif.FLG_EST = index.FLG_EST();
        objEnClasif.OPR = self.opcion();
        //if (ko.validatedObservable(index).isValid()) {
        actualizarDatosWebApi({ parametros: objEnClasif, nombreObjeto: "objEnClasif", url: "clasif/actualizar",
            callBack: function (objError) {
                self.opcion("R");
                self.cargar();
            }
        });
        //};
        return false;
    }
};

