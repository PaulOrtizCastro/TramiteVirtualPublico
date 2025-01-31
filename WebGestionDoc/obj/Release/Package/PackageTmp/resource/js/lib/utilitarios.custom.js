/**
* Contiene las funciones generales o comunes para todos los sistemas
* @namespace
* @name generales
*/
/**
* Seleccionar o deselecciona las casillas de verificación de todos los checks que tengan el mismo nombre
* @param {string} ckTodos Identificador del control checkbox que cambia a los demás checkboxes
* @param {string} strNombre Nombre de los checkboxes que se seleccionarán
* @memberof generales
*/
function seleccionaTodosChecks(ckTodos, strNombre) {
    $("input[name=" + strNombre + "]").each(function () {
        checked = ($("#" + ckTodos).attr('checked') == 'checked') ? 'true' : false;
        $(this).attr("checked", checked);
    });
};
/**
* Seleccionar o deselecciona las casillas de verificación de todos los checks que tengan el mismo nombre
* @param {Object} ckTodos Objeto tupo checkbox que cambia a los demás checkboxes
* @param {string} strNombre Nombre de los checkboxes que se seleccionarán
* @memberof generales
*/
function seleccionaTodosChecksObj(ckTodos, strNombre) {
    $("input[name=" + strNombre + "]").not(ckTodos).each(function () {
        checked = (ckTodos.prop('checked') == true) ? true : false;
        $(this).prop("checked", checked);
    });
};
/**
* Deselecciona las casillas de verificación de todos los checks que tengan el mismo nombre
* @param {Object} obj Objeto tupo checkbox que cambia a los demás checkboxes
* @param {string} strNombre Nombre de los checkboxes que se seleccionarán
* @memberof generales
*/
function deseleccionaTodosChecks(obj, strNombre) {
    $("input[name=" + strNombre + "]").each(function () {
        $(this).prop("checked", false);
    });
    $(obj).attr('checked', 'checked');
};
/**
* Trae los valores de un grupo de checkboxes concatenados y separados por comas
* @param {string} strNombre Nombre de los checkboxes
* @return {string} Cadena de valores separados por comas
* @memberof generales
*/
function traeListaComasChequeados(strNombre) {
    var strIdRequis = "";
    $("input[name=" + strNombre + "]:checked").each(function () {
        strIdRequis += $(this).attr("value") + ",";
    });
    return strIdRequis.slice(0, strIdRequis.length - 1);
};
/**
* Configura los controles de tipo texto para sólo lectura
* @memberof generales
*/
function controlesSoloLectura() {
    $(":text").each(function () {
        if ($(this).hasClass("text_box_disabled")) {
            $(this).attr("readonly", true);
        }
        else {
            $(this).removeAttr("readonly");
        };
    });
};
/**
* Representa la fecha de tipo json en tipo cadena
* @param {date} dtFecha Fecha tipo JSON
* @param {boolean} Flag que indica si se muestra la hora o no
* @return {string} Fecha en formato dd/mm/yyyy hh:mm:ss
* @memberof generales
*/
function traeFechaJSON(dtFecha, muestraHora) {
    var currentTime = new Date(parseInt((dtFecha).substr(6)));
    var mes = currentTime.getMonth() + 1;
    var dia = currentTime.getDate();
    var anio = currentTime.getFullYear();
    var HH = currentTime.getHours();
    var mm = currentTime.getMinutes();
    var ss = currentTime.getSeconds();
    var Time = '';
    if (muestraHora) {
        Time = padLeft(HH, 2) + ':' + padLeft(mm, 2) + ':' + padLeft(ss, 2);
    };
    var strFecha = padLeft(currentTime.getDate(), 2) + "/" + padLeft(currentTime.getMonth() + 1, 2) + "/" + currentTime.getFullYear() + " " + Time;
    if (($.trim(strFecha) == '01/01/1901') || ($.trim(strFecha) == '01/01/1') || ($.trim(strFecha) == '01/01/') ||
    ($.trim(strFecha) == '1/1/1') || ($.trim(strFecha) == '1/1/') || ($.trim(strFecha) == '1/1/') || ($.trim(strFecha) == '01/01/1 00:00:00') || ($.trim(strFecha) == '31/12/0 19:00:00') || ($.trim(strFecha) == '31/12/0'))
        strFecha = "";
    return strFecha;
};
/**
* Representa la hora de tipo json en tipo cadena
* @param {date} dtFecha Fecha tipo JSON
* @return {string} Hora en formato hh:mm:ss
* @memberof generales
*/
function traeHoraJSON(dtFecha) {
    var currentTime = new Date(parseInt((dtFecha).substr(6)));
    var HH = currentTime.getHours();
    var mm = currentTime.getMinutes();
    var ss = currentTime.getSeconds();
    var Time = '';
    Time = padLeft(HH, 2) + ':' + padLeft(mm, 2) + ':' + padLeft(ss, 2);
    return Time;
};
/**
* Convierte la fecha ingresada de tipo fecha a string
* @param {date} currentTime Fecha ingresada
* @param {boolean} muestraHora Flag que indica si se muestra la hora o no
* @return {string} Fecha en formato dd/mm/yyyy hh:mm:ss
* @memberof generales
*/
function traeFechaFormato(currentTime, muestraHora) {
    var mes = currentTime.getMonth() + 1
    var dia = currentTime.getDate()
    var anio = currentTime.getFullYear()
    var HH = currentTime.getHours();
    var mm = currentTime.getMinutes();
    var ss = currentTime.getSeconds();
    var Time = '';
    if (muestraHora) {
        Time = HH + ':' + mm + ':' + ss;
    };
    return padLeft(currentTime.getDate(), 2) + "/" + padLeft(currentTime.getMonth() + 1, 2) + "/" + currentTime.getFullYear() + " " + Time;
};
/**
* Convierte la fecha ingresada al formato dd/mm/yyyy hh:mm:ss
* @param {string} strFecha Fecha ingresada
* @param {string} strHora Hora
* @return {string} Fecha en formato dd/mm/yyyy hh:mm:ss
* @memberof generales
*/
function traeFechaString(strFecha, strHora) {
    var dateArray = strFecha.split("/");
    var timeArray;
    var dtFecha;
    if (noEsVacio(strHora)) {
        timeArray = strHora.split(":");
        dtFecha = new Date(parseInt(dateArray[2], 10), parseInt(dateArray[1], 10) - 1, parseInt(dateArray[0], 10), timeArray[0], timeArray[1], timeArray[2], 0);
    }
    else {
        dtFecha = new Date(parseInt(dateArray[2], 10), parseInt(dateArray[1], 10) - 1, parseInt(dateArray[0], 10));
    };
    return dtFecha;
};
/**
* Configura los calendarios de jquery
* @param {string} idTexto Identificador del calendario
* @memberof generales
*/
function configuraCalendario(idTexto) {
    $("#" + idTexto).datepicker({ yearRange: "-100:+0", showOn: "button", changeMonth: true, changeYear: true, buttonImageOnly: true, buttonImage: strRutaImagenesMaster + "calendar.png" });
    $("#" + idTexto).datepicker($.datepicker.regional["es"]);
    $('img.ui-datepicker-trigger').css({ 'cursor': 'pointer', "vertical-align": 'middle' });
};
function validarCalendario(obj) {
    var defaults = {
        idTexto: "",
        onSelect: function (date) { }, 
        yearRange: "-100:+0",
        showOn: "button",
        changeMonth: true,
        changeYear: true,
        buttonImageOnly: true,
        img: "calendar.png",
        minDate: 0
    };
    var defaults = $.extend(defaults, obj);
    $("#" + defaults.idTexto).datepicker({ yearRange: defaults.yearRange, showOn: defaults.showOn, changeMonth: defaults.changeMonth, changeYear: defaults.changeYear, buttonImageOnly: defaults.buttonImageOnly, buttonImage: strRutaImagenesMaster + defaults.img, minDate: defaults.minDate, onSelect: defaults.onSelect });
    $("#" + defaults.idTexto).datepicker($.datepicker.regional["es"]);
    $('img.ui-datepicker-trigger').css({ 'cursor': 'pointer', "vertical-align": 'middle' });
};
/**
* Rellena con ceros a la izquierda
* @param {number} n Número al cual se añadirán los ceros
* @param {length} length Longitud total de la cadena final
* @return {string} Cadena con ceros agregados
* @memberof generales
*/
function padLeft(n, length) {
    var str = (n > 0 ? n : -n) + "";
    var zeros = "";
    for (var i = length - str.length; i > 0; i--)
        zeros += "0";
    zeros += str;
    return n >= 0 ? zeros : "-" + zeros;
};
/**
* Como un substring pero comenzando por la izquierda
* @param {string} str Palabra a truncar
* @param {number} n Número total de carácteres a truncar
* @return {string} Cadena truncada
* @memberof generales
*/
function fLeft(str, n) {
    if (n <= 0)
        return "";
    else if (n > String(str).length)
        return str;
    else
        return String(str).substring(0, n);
};
/**
* Como un substring pero comenzando por la derecha
* @param {string} str Palabra a truncar
* @param {number} n Número total de carácteres a truncar
* @return {string} Cadena truncada
* @memberof generales
*/
function fRight(str, n) {
    if (n <= 0)
        return "";
    else if (n > String(str).length)
        return str;
    else {
        var iLen = String(str).length;
        return String(str).substring(iLen, iLen - n);
    }
};
/**
* Carga datos vía ajax en un combo
* @deprecated
* @param {string} idCombo Identificador del combo
* @param {string} wsUrl Ruta del webservice
* @param {string} strCodigo Campo código de los datos (value)
* @param {string} strValor Campo texto de los datos (text)
* @param {string} strParametros Parámetros en json
* @param {string} strScriptCallback Script que se ejecutará después de traer los datos
* @param {boolean} boolAsync Flag que indica si la petición de datos será síncrona o asíncrona
* @param {boolean} boolValorInicial Flag que indica si el combo tendrá un valor por defecto
* @return {string} Html generado
* @memberof generales
*/
function cargarComboSimple(idCombo, wsUrl, strCodigo, strValor, strParametros, strScriptCallback, boolAsync, boolValorInicial) {
    var strHTML = new String();
    var result = $.ajax({
        dataType: "script",
        processData: false,
        type: "POST",
        url: wsUrl,
        cache: false,
        data: strParametros,
        async: boolAsync,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            var data = msg.d;
            var len = data.length;
            if (boolValorInicial != true) {
                strHTML = "<option value=''>--Seleccione--</option>"
            };
            for (var i = 0; i < len; i++) {
                strHTML = strHTML + "<option value='" + validaNulosJSON(data[i], strCodigo) + "'>" + validaNulosJSON(data[i], strValor) + "</option>"
            };
            if (idCombo != "") {
                $("#" + idCombo).html(strHTML);
                if (strScriptCallback.length > 0) {
                    eval(strScriptCallback);
                };
            };
        },
        error: function (result) {
            mensajeSistema(idCombo, "1", result.statusText, "", "");
        }
    });
    return strHTML;
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
     * @param {Object} objParametros Parametros.
     * @param {boolean} objParametros.valorInicial Si es verdadero no se muestra un valor inicial que dice --Seleccione--.
     * @param {array} objParametros.data Data json.
     * @param {string} objParametros.valor Campo de los datos que setea el atributo value del elemento option.
     * @param {string} objParametros.texto Campo de los datos que se muestra cada elemento del combo.
     * @param {string} objParametros.dataField Campo de los datos que se agregará al atributo datafield de cada option.
     * @param {string} objParametros.primerElemento Cambia el mensaje de --Seleccione-- por uno personalizado
     * @param {string} objParametros.titleField Campo de los datos que se agregará al atributo title de cada option.
     * @memberOf jQuery
     */
    jQuery.fn.cargarDatosCombo = function (objParametros) {
        var objDiv = $(this);
        var strHTML = new String();
        var strHtmlDataAdicional = new String();
        var strTitle = new String();
        var defaults = {
            valorInicial: false,
            data: [],
            valor: "",
            texto: "",
            dataField: "",
            dataPlazoA: "",
            dataPlazoB: "",
            primerElemento: "--Seleccione--",
            titleField: "",
            retornaHTML: false
        };
        defaults = $.extend(defaults, objParametros);
        var data = defaults.data;
        var len = data.length;
        //if (noEsVacio(defaults.dataField)) strHtmlDataAdicional = " data-field = ''";
        if (noEsVacio(defaults.dataField)||noEsVacio(defaults.dataPlazoA)||noEsVacio(defaults.dataPlazoB)) strHtmlDataAdicional = " data-field = '' data-plazo-a= '' data-plazo-b= '' ";
        if (defaults.valorInicial != true) strHTML = "<option " + strHtmlDataAdicional + " value=''>" + defaults.primerElemento + "</option>";
        for (var i = 0; i < len; i++) {
            if (noEsVacio(defaults.titleField)) strTitle = " title='" + validaNulosJSON(data[i], defaults.titleField) + "' "
            //if (noEsVacio(defaults.dataField)) strHtmlDataAdicional = " data-field = '" + validaNulosJSON(data[i], defaults.dataField) + "'";
            if (noEsVacio(defaults.dataField)||noEsVacio(defaults.dataPlazoA)||noEsVacio(defaults.dataPlazoB)) strHtmlDataAdicional = "data-field = '" + validaNulosJSON(data[i], defaults.dataField) + "' data-plazo-a = '" + validaNulosJSON(data[i], defaults.dataPlazoA) + "' data-plazo-b = '" + validaNulosJSON(data[i], defaults.dataPlazoB) + "'";
            strHTML = strHTML + "<option " + strHtmlDataAdicional + strTitle + " value='" + validaNulosJSON(data[i], defaults.valor) + "'>" + validaNulosJSON(data[i], defaults.texto) + "</option>";
        }; 
        if (defaults.retornaHTML) return strHTML; else objDiv.html(strHTML);
    };
})(jQuery);
/**
* Muestra un mensaje al pie de la página
* @param {string} divMensaje Identificador del div que contendrá el mensaje
* @param {string} strOpcion Opción del resultado (0: Correcto, 1: Error)
* @param {string} strMensaje Mensaje
* @param {string} divRegistro Identificador del div que contiene el formulario que genera el mensaje
* @param {string} strCallBack Script que se ejecuta después que se va el mensaje satisfactorio
* @memberof generales
*/
function mensajeSistema(divMensaje, strOpcion, strMensaje, divRegistro, strCallBack) {
    var strRutaImagenes = strRutaImagenesMaster;
    var strImagen = "";
    var strHtmlMensaje = "";
    var strClase = "correcto";
    if (strOpcion == "0") {
        strClase = "correcto";
        strImagen = "warning.png";
        strTimerMaster = setTimeout(function () {
            $('#' + divMensaje).removeClass(strClase);
            $('#' + divMensaje).html("");
            $('#' + divRegistro).removeClass(strClase);
            if (strCallBack) {
                if (strCallBack.length > 0) {
                    eval(strCallBack);
                };
            };
        }, 5000);
    }
    else if (strOpcion == "1") {
        strClase = "error_apli";
        strImagen = "warning.png";
    }
    else {
        strClase = "error_apli";
        strImagen = "warning.png";
    };
    $('#' + divMensaje).removeClass("correcto"); $('#' + divMensaje).removeClass("error_apli");
    strHtmlMensaje = "<img alt='Mensaje del Sistema' src='" + strRutaImagenes + strImagen + "'>" + strMensaje;
    $('#' + divMensaje).addClass(strClase);
    $('#' + divMensaje).html(strHtmlMensaje);
};
/**
* Carga datos vía ajax asíncronamente
* @deprecated Utilizar cargarDatos
* @param {Object} obj Objeto que contiene los parámetros como propiedades
* @param {string} strUrl Ruta del webservice
* @param {string} NombreObjecto Nombre de la entidad
* @param {string} strCallBack Script se que ejecuta después de traer los datos
* @param {string} strIdDivMensaje Identificador del mensaje
* @memberof generales
*/
function cargarDatosListaSimple(obj, strUrl, NombreObjecto, strCallBack, strIdDivMensaje) {
    var result = $.ajax({
        type: "POST",
        url: strRutaAplicacionMaster + "sistema/ws/" + strUrl,
        data: "{'" + NombreObjecto + "':" + JSON.stringify(obj) + "}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            lstData = msg.d;
            if (noEsVacio(strIdDivMensaje)) {
                var objPadre = $("#" + strIdDivMensaje).closest(".formularioModal");
                if (objPadre) objPadre = objPadre; else objPadre = $("#" + strIdDivMensaje).closest(".formularioContenido");
                if (lstData.length > 0) {
                    objPadre.find(".grid").show();
                    $("#" + strIdDivMensaje).html("");
                }
                else {
                    objPadre.find(".grid").hide();
                    mensajeSistema(strIdDivMensaje, "2", "No se encontraron datos para el criterio de busqueda seleccionado", "", "");
                };
            };
            eval(strCallBack);
        },
        error: function (result) {
            mensajeSistema(strIdDivMensaje, "1", result.statusText, "", strCallBack);
        }
    });
};
/**
* Objeto que contiene los parámetros para la carga de datos
* @memberof generales
* @class parametrosDatos
* @property {Object} parametros - Objeto con los parámetros
* @property {string} nombreObjeto - Nombre del objeto
* @property {boolean} cache - Flag que indica si se guardarán los datos en la cache
* @property {boolean} async - Flag que indica si la carga de datos se realiza de manera síncrona o asíncrona
* @property {Object} callBack - Función que se ejecuta después que se cargan satisfactoriamente
* @property {string} url - Url del webservice que devuelve los datos
* @property {string} divPadre - Identificador del div que contendrá los datos devueltos
* @property {string} divMensaje - Identificador del div que contendrá el mensaje
* @property {string} strRuta - Ruta del servidor y del sistema para que junto con el valor de url encuentren el webservice
* @name parametrosDatos
*/
/**
* Carga datos vía ajax optimizada
* @param {generales.parametrosDatos} objCargaDatos Objeto que contiene los parámetros como propiedades
* @memberof generales
*/
function cargarDatos(objCargaDatos) {
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
        //url: ((noEsVacio(defaults.strRuta)) ? defaults.strRuta : strRutaAplicacionMaster) + "sistema/ws/" + defaults.url,
        url: ((noEsVacio(defaults.strRuta)) ? defaults.strRuta : strRutaAplicacionMaster) + defaults.url,
        data: "{'" + defaults.nombreObjeto + "':" + strParametros + "}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: defaults.async,
        success: function (msg) {
//            lstData = (typeof msg.d == "string") ? eval(msg.d) : msg.d;
//            if (noEsVacio(defaults.divPadre)) {
//                var objPadre = $("#" + defaults.divPadre);
//                if (lstData.length > 0) {
//                    $("#" + defaults.divMensaje).html("");
//                    $("#" + defaults.divMensaje).removeClass();
//                }
//                else {
//                    mensajeSistema(defaults.divMensaje, "2", "No se encontraron datos para el criterio de b&uacute;squeda seleccionado", "", "");
//                };
//                cerrarDivEspera(defaults.divPadre);
//            };
            //            defaults.callBack(lstData);
            var lstData = msg;
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
function cargarDatosWebApi(objCargaDatos) {
    var defaults = {
        parametros: {},
        nombreObjeto: "",
        cache: false,
        async: true,
        callBack: function () { },
        url: "",
        divPadre: "",
        divMensaje: "",
        strRuta: "",
        global: false
    };
    defaults = $.extend(defaults, objCargaDatos);
    var strParametros = new String();
    if (noEsVacio(defaults.nombreObjeto)) strParametros = JSON.stringify(defaults.parametros); else strParametros = "";
    if (noEsVacio(defaults.divPadre)) abrirDivEspera(defaults.divPadre);
    var result = $.ajax({
        type: "POST",
        url: ((noEsVacio(defaults.strRuta)) ? defaults.strRuta : strRutaAplicacionMaster) + "api/" + defaults.url,
        //url: defaults.strRuta + "api/" + defaults.url,
        data: strParametros,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: defaults.async,
        global: defaults.global,
        success: function (msg) {
            //var lstData = (typeof msg == "string") ? eval(msg) : msg;
            var lstData = msg;
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
            //console.log(result);
            mensajeSistema(defaults.divMensaje, "1", result.statusText, "");
        }
    });
};
/**
* Carga datos vía ajax síncronamente
* @deprecated Utilizar cargarDatos
* @param {Object} obj Objeto que contiene los parámetros como propiedades
* @param {string} strUrl Ruta del webservice
* @param {string} NombreObjecto Nombre de la entidad
* @param {string} strCallBack Script se que ejecuta después de traer los datos
* @param {boolean} boolAsync Flag que indica si se cargarán los datos asíncronamente cuando es true
* @param {string} strIdDivMensaje Identificador del mensaje
* @param {string} strRutaCliente Ruta del servidor y de una aplicación externa
* @return {array} Datos en json
* @memberof generales
*/
function cargarDatosListaSimpleCache(obj, strUrl, NombreObjecto, strCallBack, boolAsync, strIdDivMensaje, strRutaCliente) {
    if (noEsVacio(strRutaCliente)) strRutaAplicacionMaster = strRutaCliente;
    var lstData;
    var result = $.ajax({
        type: "POST",
        url: strRutaAplicacionMaster + "sistema/ws/" + strUrl,
        async: boolAsync,
        data: "{'" + NombreObjecto + "':" + JSON.stringify(obj) + "}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        cache: false,
        success: function (msg) {
            lstData = msg.d;
            if (noEsVacio(strIdDivMensaje)) {
                var objPadre = $("#" + strIdDivMensaje).closest(".formularioModal");
                if (objPadre) objPadre = objPadre; else objPadre = $("#" + strIdDivMensaje).closest(".formularioContenido");
                if (lstData.length > 0) {
                    objPadre.find(".grid").show();
                    $("#" + strIdDivMensaje).html("");
                }
                else {
                    objPadre.find(".grid").hide();
                    mensajeSistema(strIdDivMensaje, "2", "No se encontraron datos para el criterio de b&uacute;squeda seleccionado", "", "");
                };
            };
            eval(strCallBack);
        },
        error: function (result) {
            mensajeSistema(strIdDivMensaje, "1", result.statusText, "", strCallBack);
        }
    });
    return lstData;
};
/**
* Actualiza los datos optimizada
* @param {generales.parametrosDatos} obj Objeto que contiene los parámetros como propiedades
* @memberof generales
*/
function actualizarDatos(obj) {
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
    var defaults = $.extend(defaults, obj);
    var result = $.ajax({
        cache: defaults.cache,
        type: "POST",
        url: ((noEsVacio(defaults.strRuta)) ? defaults.strRuta : strRutaAplicacionMaster) + "sistema/ws/" + defaults.url,
        data: "{'" + defaults.nombreObjeto + "':" + JSON.stringify(defaults.parametros) + "}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: defaults.async,
        success: function (msg) {
            var objResultadoDB = msg.d;
            var strMensaje = "";
            if (objResultadoDB.ID_TIPO == "0") {
                strMensaje = objResultadoDB.DES_ERROR;
                defaults.callBack(objResultadoDB);
            }
            else {
                strMensaje = objResultadoDB.DES_ERROR;
            };
            mensajeSistema(defaults.divMensaje, objResultadoDB.ID_TIPO, strMensaje, defaults.divPadre, "");
            cerrarDivEspera(defaults.divPadre);
        },
        error: function (result) {
            mensajeSistema(defaults.divMensaje, "1", result.statusText, defaults.divPadre, "");
        }
    });
};
function actualizarDatosWebApi(obj) {
    var defaults = {
        parametros: {},
        nombreObjeto: "",
        cache: false,
        async: true,
        callBack: function () { },
        url: "",
        divPadre: "",
        divMensaje: "",
        strRuta: "",
        global: true
    };
    var defaults = $.extend(defaults, obj);
    //console.log(defaults);
    //console.log(JSON.stringify(defaults.parametros));
    var result = $.ajax({
        cache: defaults.cache,
        type: "POST",
        url: ((noEsVacio(defaults.strRuta)) ? defaults.strRuta : strRutaAplicacionMaster) + "api/" + defaults.url,
        data: JSON.stringify(defaults.parametros),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: defaults.async,
        global: defaults.global,
        success: function (msg) {
            var objResultadoDB = msg;
            var strMensaje = "";
            if (objResultadoDB.ID_TIPO == "0") {
                strMensaje = objResultadoDB.DES_ERROR;
                defaults.callBack(objResultadoDB);
            }
            else {
                defaults.callBack(objResultadoDB);
                strMensaje = objResultadoDB.DES_ERROR;
            };
            //mensajeSistema(defaults.divMensaje, objResultadoDB.ID_TIPO, strMensaje, defaults.divPadre, "");
            //cerrarDivEspera(defaults.divPadre);
        },
        error: function (result) {
            bootbox.alert(result.responseJSON.ExceptionMessage);
            //mensajeSistema(defaults.divMensaje, "1", result.statusText, defaults.divPadre, "");
        }
    });
};
/**
* Actualiza los datos
* @deprecated Utilizar actualizarDatos
* @param {Object} obj Objeto que contiene los parámetros como propiedades
* @param {string} strUrl Ruta del webservice
* @param {string} NombreObjecto Nombre de la entidad
* @param {string} strIdDivMensaje Identificador del mensaje
* @param {string} strIdDivRegistro Identificador del div que contiene el formulario que actualiza los datos
* @param {string} strCallBack Script se que ejecuta después de actualizar los datos
* @param {string} strCallBackTime Script se que ejecuta después de actualizar los datos y después de mostrar el mensaje
* @param {string} strRutaCliente Ruta del servidor y aplicación
* @memberof generales
*/
function actualizarDatosSimple(obj, strUrl, strNombreObjeto, strIdDivMensaje, strIdDivRegistro, strCallBack, strCallBackTime, strRutaCliente) {
    //if (noEsVacio(strRutaCliente)) strRutaAplicacionMaster = strRutaCliente;
    //var divMensaje = $("#" + strIdDivMensaje);
    var result = $.ajax({
        type: "POST",
        url: strRutaAplicacionMaster + "sistema/ws/" + strUrl,
        contentType: "application/json; charset=utf-8",
        data: "{'" + strNombreObjeto + "':" + JSON.stringify(obj) + "}",
        dataType: "json",
        success: function (msg) {
            var objResultadoDB = msg.d;
            var strMensaje = "";
            //console.log(objResultadoDB);
            if (objResultadoDB.ID_TIPO == "0") {
                strMensaje = objResultadoDB.DES_ERROR;
                //console.log(objResultadoDB.DES_ERROR);
                if (strCallBack != "") {
                    //console.log(strCallBack);
                    eval(strCallBack);
                };
            }
            else {
                //console.log(objResultadoDB.ID_TIPO);
                strMensaje = objResultadoDB.DES_ERROR;
            };
            //mensajeSistema(strIdDivMensaje, objResultadoDB.ID_TIPO, strMensaje, strIdDivRegistro, strCallBackTime);
            //cerrarDivEspera(strIdDivRegistro);
        },
        error: function (result) {
            //mensajeSistema(strIdDivMensaje, "1", result.statusText, strIdDivRegistro, strCallBackTime);
        }
    });
    //if (noEsVacio(strRutaCliente)) strRutaAplicacionMaster = "";    
};
/**
* Limpia el valor de los controles
* @param {string} div Identificador del div que contiene los controles que se quieren limpiar
* @memberof generales
*/
function limpiarElementos(div, strType) { /*strType 1:Identificador de div; 2:Valor que se le pase*/
    var objDiv = (strType == "1" ? $("#" + div) : $(div));
    objDiv.find(':input').each(function () {
        switch (this.type.toLowerCase()) {
//            case 'select-one':
//                $(this).val('');
//                break;
            case 'text':
                $(this).val('');
                break;
            case 'hidden':
                $(this).val('');
                break;
            case 'textarea':
                $(this).empty();
                break;
            case 'checkbox':
                $(this).prop("checked", false);
                break;
//            case 'radio':
//                $(this).prop("checked", false);
//                break;
        };
    });
};
(function (jQuery) {
    /**
     * Levanta una ventana modal optimizada
     * @function
     * @param {Object} objParametros Parámetros.
     * @param {number} objParametros.width Ancho.
     * @param {string} objParametros.titulo Título de la ventana modal.
     * @param {number} objParametros.url Url que se cargará en la ventana modal.
     * @param {boolean} objParametros.limpiarAlCerrar Si el valor es true se borra el contenido dentro de la ventana modal.
     * @memberOf jQuery
     */
    jQuery.fn.cargarPopUpModal = function (objParametros) {
        var defaults = {
            width: "auto",
            titulo: "",
            url: "",
            limpiarAlCerrar: false,
            frente: false,
            eliminarArchivo: false
        };
        defaults = $.extend(defaults, objParametros);
        var objDiv = $(this);
        objDiv.addClass("formularioModal");
        objDiv.dialog({
            autoOpen: false,
            height: "auto",
            minHeight: "auto",
            width: defaults.width,
            modal: true,
            draggable: true,
            resizable: true,
            closeOnEscape: true,
            position: 'center',
            title: defaults.titulo,
            autoResize: true,
            close: function (event, ui) {
               // alert("close");
               $(this).removeClass("formularioModal");
               $(this).find(".contador").each(function () {
                    $(this).next('div').empty();
               });
                clearTimeout(strTimerMaster);
               if (defaults.eliminarArchivo) eliminarArchivoAlfresco();
                if (noEsVacio(defaults.url)) {
                   $(this).empty().dialog('destroy'); 
               };
            }
        });
//        objDiv.unbind('dialogclose');
//        objDiv.bind('dialogclose', function(event, ui) {
            //alert("dialogclose");
//            if (defaults.eliminarArchivo) eliminarArchivoAlfresco();
//            $(this).removeClass("formularioModal");
//            $(this).find(".contador").each(function () {
//                $(this).next('div').empty();
//            });
//            clearTimeout(strTimerMaster);
//            if (noEsVacio(defaults.url)) {
//                $(this).empty().dialog('destroy'); 
//            };
//        });
        if (noEsVacio(defaults.url)) {
            objDiv.load(defaults.url, function (response, status, xhr) {
                fnValidarSoloNumero(objDiv.attr("id"));
                controlesSoloLectura();
                $("fieldset").each(function () {
                    $(this).attr("title", $(this).find("legend").html());
                });
                objDiv.find(".contador").cuentaCaracteres();
                objDiv.find('.horas').cargarFormatoHora();
                objDiv.find('.min').cargarFormatoHora();
                objDiv.dialog("open");
            });
        } else {
            objDiv.dialog("open");
        };
    };
})(jQuery);
/**
* Levanta una ventana modal
* @deprecated Utilizar fn.CargarModal
* @param {string} strDiv Identificador del div que se convertirá en ventana modal
* @param {string} strUrl Ruta de la página que se incluirá en el modal
* @param {string} strTitulo Título de la ventana modal
* @param {string} strAncho Ancho de la ventana modal
* @param {string} strAlto Alto de la ventana modal
* @param {boolean} limpiarAlCerrar Si el valor es true se borra el contenido dentro de la ventana modal.
* @memberof generales
*/
function cargarPopUpModal(strDiv, strUrl, strTitulo, strAncho, strAlto, limpiarAlCerrar) {
    $("#" + strDiv).addClass("formularioModal");
    $("#" + strDiv).dialog({
        autoOpen: false,
        height: "auto",
        minHeight: "auto",
        width: strAncho,
        modal: true,
        draggable: true,
        resizable: false,
        closeOnEscape: true,
        position: 'center',
        title: strTitulo,
        autoResize: true,
        close: function (event, ui) {
            $("#" + strDiv).removeClass("formularioModal");
            $("#" + strDiv).find(".contador").each(function () {
                $(this).next('div').empty();
            });
            clearTimeout(strTimerMaster);
            if (noEsVacio(strUrl != "")) {
                $("#" + strDiv).empty();
            };
            if (limpiarAlCerrar) {
                $("#" + strDiv).empty();
            };
        }
    });
    if (noEsVacio(strUrl)) {
        $("#" + strDiv).load(strUrl, function (response, status, xhr) {
            $("#" + strDiv).dialog("open");
            fnValidarSoloNumero(strDiv);
            controlesSoloLectura();
            $("fieldset").each(function () {
                $(this).attr("title", $(this).find("legend").html());
            });
            $("#" + strDiv).find(".contador").cuentaCaracteres();
            $("#" + strDiv).find('.horas').cargarFormatoHora();
            $("#" + strDiv).find('.min').cargarFormatoHora();
            
        });
    } else {
        $("#" + strDiv).dialog("open");
    };
};
/**
* Levanta una ventana de confirmación
* @param {string} strMsg Mensaje que se mostrará en la ventana
* @return {boolean} Retorna verdadero si se acepta el mensaje de confirmación
* @memberof generales
*/
function cargaPopUpConfirm(strMsg) {
    return confirm(strMsg);
};
/**
* Levanta una ventana de alerta
* @param {string} strMsg Mensaje que se mostrará en la ventana
* @memberof generales
*/
//function cargaPopUpAlert(strMsg) {
//    alert(strMsg);
//};


function cargarVisorMemoDiv(strDiv, strUrl) {
    var objDiv = $("#" + strDiv);
    if (objDiv) {
        objDiv.empty();
        objDiv.html("<iframe src='" +strUrl + "' frameborder='0' width='99%' height='980px'></iframe>");   
    }
}
/**
* Carga el contenido de una página específica en un div seleccionado
* @param {string} strDiv Identificador del div contenedor
* @param {string} strUrl Ruta de la página a cargar
* @param {string} strTitulo Título del div contenedor
* @memberof generales
*/
function cargarContenidoEnDiv(strDiv, strUrl, strTitulo) {
    //console.log(strUrl);
    var objDiv = $("#" + strDiv);
    if (objDiv) {
        objDiv.empty();
        objDiv.load(strUrl, function () {
            //if (noEsVacio(strTitulo)) $("<label class='titulo'>" + strTitulo + "</label>").prependTo(objDiv);
            //console.log(objDiv.html());
            if (noEsVacio(strTitulo)) {
                $("<div class='row'><div class='col-lg-12'><h1 class='page-header'>&nbsp;" + strTitulo + "</h1></div></div>").prependTo(objDiv);
            }
            //console.log(objDiv.html());
            fnValidarSoloNumero(strDiv);
            controlesSoloLectura();
            objDiv.addClass("formularioContenido");
            //$("fieldset").each(function () {
            //    $(this).attr("title", $(this).find("legend").html());
            //});
        });
    }
};
/**
* Imprime un html ingresado o lo guarda en excel
* @param {string} strHtml Html que se deberá imprimir
* @param {string} strTipo Tipo de impresión (print: Impresión común, excel: Exportación a excel)
* @memberof generales
*/
function imprimir(strHtml, strTipo) {
    //console.log("1");
    strHtml = strHtml.replace(/\"/g, "'");  
    $("#frmPrincipalMaster").append("<input id=\"hfTipoArchivo\" name=\"hfTipoArchivo\" type=\"hidden\" value=\"" + strTipo + "\" />");
    if (strTipo == "print") {
        printElement(strHtml);
    } else {
        $("#frmPrincipalMaster").append("<input id=\"hfDataExportar\" name=\"hfDataExportar\" type=\"hidden\" value=\"" + strHtml + "\" />");
        $("#frmPrincipalMaster").submit();
        $("#hfDataExportar").remove();
    };
    $("#hfTipoArchivo").remove();
};
/**
* Visualiza vista previa de un html ingresado para impresion
* @param {string} strHtml Html que se deberá imprimir
* @param {string} strTitle Titulo de documento
* @memberof generales
*/
function fnWindowsOpen(strHtml, strTitle) {
    strHtml = strHtml.replace(/\"/g, "'");
    var divContents = strHtml;
    var printWindow = window.open('', '_blank', '', '');
    printWindow.document.write('<html><head><title>' + strTitle + '</title><meta http-equiv="Content-Type" content="text/html; charset=utf-8" />');
    printWindow.document.write('<style type="text/css">body { font-family: Verdana; font-size: 9px;	color: #000000;} table td{ padding: 3px; border: 1px solid #C0C0C0;	font-family: Verdana; font-size: 9px;} table caption{font-family: Verdana;font-weight: bold;padding-bottom: 10px;padding-top: 5px;}.titulo{	font-family: Verdana;font-size: 12px;font-weight: bold;}table{border-collapse: collapse;border: 1px solid #C0C0C0;width: 100%;}@media all {.page-break { display: none; }} @media print {.page-break { display: block; page-break-before: always; }}</style>');
    printWindow.document.write('</head><body >');
    printWindow.document.write(divContents);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
    printWindow.close();
}
/**
* Imprime un html ingresado o lo guarda en excel
* @param {string} strHtml Html que se deberá imprimir
* @param {string} strTipo Tipo de impresión (print: Impresión común, excel: Exportación a excel)
* @memberof generales
*/
function imprimirGrid(objGrid, strTipo) {
    strHtml = traeHtmlGridImprimir(objGrid);
    strHtml = strHtml.replace(/\'/g, '´');
    $("#frmPrincipalMaster").append("<input id='hfTipoArchivo' name='hfTipoArchivo' type='hidden' value='" + strTipo + "'>");
    
    /*$("#frmPrincipalMaster").append("<input id='hfDataExportar' name='hfDataExportar' type='hidden' value='" + strHtml + "'>");
    $("#frmPrincipalMaster").submit();
    $("#hfDataExportar").remove();*/
    
    if (strTipo == "print") {
        printElement(strHtml);
    } else {
        $("#frmPrincipalMaster").append("<input id='hfDataExportar' name='hfDataExportar' type='hidden' value='" + strHtml + "'>");
        $("#frmPrincipalMaster").submit();
        $("#hfDataExportar").remove();
    };

    $("#hfTipoArchivo").remove();
};
/**
* Imprime un html ingresado o lo guarda en excel
* @param {Object} objGrid Objeto grid
* @return {string} Retorna el grid en html simple
* @memberof generales
*/
function traeHtmlGridImprimir(objGrid) {
    var strHtmlCabecera = new String();
    var strHtml = new String();
    var strhtmlCeldas = new String();
    var strUsuario = new String();
    for (var j = 0; j < objGrid.arrColumnas.length; j++) {
        if (objGrid.arrColumnas[j].index) {
            strHtmlCabecera += "<td>" + objGrid.arrColumnas[j].headerName + "</td>";
        };
    };
    strHtmlCabecera = "<tr>" + strHtmlCabecera + "</tr>";
    for (var i = 0; i < objGrid.data.length; i++) {
        for (var j = 0; j < objGrid.arrColumnas.length; j++) {
            if (objGrid.arrColumnas[j].index) {
                if (objGrid.arrColumnas[j].formatter == 'date')
                    strhtmlCeldas += "<td>" + traeFechaJSON(validaNulosJSON(objGrid.data[i], objGrid.arrColumnas[j].name), true) + "</td>";
                else
                    strhtmlCeldas += "<td>" + validaNulosJSON(objGrid.data[i], objGrid.arrColumnas[j].name) + "</td>";
            };
        };
        strHtml += "<tr>" + strhtmlCeldas + "</tr>";
        strhtmlCeldas = "";
    };
    if (typeof strNombreUsuarioMaster != "undefined") strUsuario = strNombreUsuarioMaster; else strUsuario = "Externo";
    return "<table><caption>" + $("#" + objGrid.idGrid).attr("title") + "</caption>" + "<caption>" + "Usuario: " + strUsuario + "&nbsp; <br />Fecha:" + traeFechaFormato(new Date(), true) + "</caption>" + strHtmlCabecera + strHtml + "</table>";
};
/**
* Aparece y desaparece un elemento
* @param {Object} objTemp Objeto a parpadear
* @memberof generales
*/
function parpadear(objTemp) {
    if (objTemp.is(":visible")) objTemp.hide(); else objTemp.show();
    alert($(this));
    setTimeout("parpadear($(this))", 500);
};
/**
* Habilita o deshabilita los controles en un div
* @param {string} strIdDiv Identificador del div que contiene los controles
* @param {boolean} boolFlg Si es true se habilitan los controles
* @memberof generales
*/
function habilitarInputs(strIdDiv, boolFlg) {
    if (boolFlg)
        $("#" + strIdDiv + " :input").removeAttr('disabled');
    else
        $("#" + strIdDiv + " :input").attr('disabled', 'disabled');
};
/**
* Verifica el número de checks seleccionados
* @param {string} strNombre Nombre de los checks a evaluar
* @param {string} strIdDiv Identificador del div que contiene los checks
* @return {boolean} Si están todos los checks seleccionados devuelve true
* @memberof generales
*/
function contarChecks(strNombre, strIdDiv) {
    var intTotal = 0;
    var intTotalChequeados = 0;
    $("#" + strIdDiv + " input[name=" + strNombre + "]").each(function () {
        if (this.checked) {
            intTotalChequeados++;
        }
        intTotal++;
    });
    if (intTotalChequeados < intTotal) {
        return false;
    }
    else {
        return true;
    };
};
/**
* Setea como predeterminado al control que tenga como definido la clase default de css
* @param {string} strIdDiv Identificador del div
* @return {boolean} Returna true
* @memberof generales
*/
function setDefaultBotonDiv(strDiv) {
    $("#" + strDiv + " input").keypress(function (e) {
        if ((e.which && e.which == 13) || (e.keyCode && e.keyCode == 13)) {
            $('input[type=image] .default').click();
            return true;
        }
    });
};
/**
* Setea como predeterminado al control que tenga como definido la clase default de css
* @return {boolean} Returna true
* @memberof generales
*/
function setDefaultBoton() {
    $("form input").keypress(function (e) {
        if ((e.which == 13) || (e.keyCode == 13)) {
            $('input[type=image] .default').click();
            return true;
        }
    });
};
/**
* Llena un combo con las horas del día
* @param {string} idCombo Identificador del combo
* @memberof generales
*/
function llenarHoraCombo(idCombo) {
    var strHtml = "";
    var i = 1;
    for (i = 1; i <= 23; i++) {
        strHtml += "<option>" + padLeft(i, 2) + "</option>";
    };
    $("#" + idCombo).html(strHtml);
};
/**
* Llena un combo con 60 minutos
* @param {string} idCombo Identificador del combo
* @memberof generales
*/
function llenarMinCombo(idCombo) {
    var strHtml = "";
    var i = 1;
    for (i = 1; i <= 60; i++) {
        strHtml += "<option>" + padLeft(i, 2) + "</option>";
    };
    $("#" + idCombo).html(strHtml);
};
/**
* Muestra la animación de expera
* @param {string} strIdDiv Identificador del div contenedor
* @memberof generales
*/
function abrirDivEspera(strIdDiv) {
    var objDivContainer = $("#" + strIdDiv);
    var strHtml = "";
    strHtml += "<div class='divLoading'>";
    //strHtml += "<i name='imgEnEspera' class='fa fa-circle-o-notch fa-spin' style='font-size:20px;color:#A9A9A9;'></i>";
    strHtml += "<span class='spinnerIcon'></span>";
    strHtml += "<div>Espere por favor</div>";
    strHtml += "</div>";
    //    var strHtml = "<img name='imgEnEspera' src='" + strRutaImagenesMaster + "loader.gif" + "' style='text-align:center;'>";
    //var strHtml = "<i name='imgEnEspera' class='fa fa-circle-o-notch fa-spin' style='font-size:48px;color:#A9A9A9;'></i>"
    objDivContainer.html(strHtml);
    objDivContainer.show();
};
/**
* Elimina la animación de expera
* @param {string} strIdDiv Identificador del div contenedor
* @memberof generales
*/
function cerrarDivEspera(strIdDiv) {
    var objDivContainer = $("#" + strIdDiv);
    if (objDivContainer) {
        objDivContainer.find("div.divLoading").remove();
    };
    //objDivContainer.hide();
};
/**
* Trae el valor seleccionado de un RadioButtonList
* @param {string} strNombre Nomre del grupo de radiobuttons
* @memberof generales
*/
function traeValorRadioButtonList(strNombre) {
    return $("input[name=" + strNombre + "]:checked").val();
};
/**
* Crea el menú
* @function
* @param {string} strCodigo Código de la opción de menú
* @param {number} intNivel Nivel
* @param {array} lstData Lista Json de las opciones de menú
* @return {string} Html del menú generado
* @memberof generales
*/
function agregarElementoMenuMaster(strCodigo, intNivel, lstData) {
    var strElementoPivot = new String();
    var flgTieneHijos = false;
    var strPivot = new String();
    var strId = new String();
    var strImagen = new String();
    for (var i = 0; i < lstData.length; i++) {
        strPivot = lstData[i].ID_OPCION;
        if (lstData[i].NUM_NIVEL == intNivel) {
            if ((strCodigo == strPivot.substring(0, strPivot.length - 2)) || (intNivel == 1)) {
                strImagen = (lstData[i].DES_URLIMAGEN != "" ? "<i class='fa fa-" + lstData[i].DES_URLIMAGEN + "'></i>" : "");
//                strElementoPivot += "<li><a href='#' align:center' onclick='cargarContenidoEnDiv(\"divContenidoMaster\", \"" + strRutaAplicacionMaster + lstData[i].DES_URL + "\", \"" + lstData[i].DES_OPCION + "\"); return false;'>" + strImagen + lstData[i].DES_OPCION + "</a>";
                strElementoPivot += "<li><a href='#' align:center' onclick='cargarContenidoEnDiv(\"divContenidoMaster\", \"" + strRutaAplicacionMaster + lstData[i].DES_URL + "\"); return false;'>" + strImagen + " " + lstData[i].DES_OPCION + "</a>";
                strElementoPivot += agregarElementoMenuMaster(strPivot, intNivel + 1, lstData);
                strElementoPivot += "</li>";
                flgTieneHijos = true;
            };
        }
    };
    if (intNivel == 1) strId = " id = 'side-menu'"; else "";
    return ((flgTieneHijos) ? "<ul" + strId + " class='nav'>" + strElementoPivot + "</ul>" : strElementoPivot);
};


function cargarElementosMenuBootstrap(lstData) {
    var countSubReg = 0;
    var numSig = 0
    var ctdoHTML = "<ul id='side-menu' class='nav'>";
    var strOpr = 'E';
    var strImagen = "";
    var strUrlOpc = "";
    for (var i = 0; i < lstData.length; i++) {
        strImagen = (lstData[i].DES_URLIMAGEN != "" ? "<i class='fa fa-" + lstData[i].DES_URLIMAGEN + "'></i>" : "");
        strUrlOpc = (lstData[i].DES_URL != "" ? " onclick='cargarContenidoEnDiv(\"divContenidoMaster\", \"" + strRutaAplicacionMaster + lstData[i].DES_URL + "\"); return false;' " : "");
        if ((lstData.length - i == 1) || (lstData[i].ID_OPCION.length == lstData[i + 1].ID_OPCION.length) || ((lstData[i].ID_OPCION.length - lstData[i + 1].ID_OPCION.length == 1) || (lstData[i].ID_OPCION.length - lstData[i + 1].ID_OPCION.length == -1))) {
            ctdoHTML = ctdoHTML + "<li><a href='#' " + strUrlOpc + ">" + strImagen + " " + lstData[i].DES_OPCION + "</a></li>";
        }
        else {
            if (lstData[i].ID_OPCION.length < lstData[i + 1].ID_OPCION.length) {
                ctdoHTML = ctdoHTML + "<li><a href='#' " + strUrlOpc + ">" + strImagen + " " + lstData[i].DES_OPCION + " <span class='fa arrow'></span></a>";
                ctdoHTML = ctdoHTML + "<ul class='nav nav-second-level collapse'>";
            } else {
                ctdoHTML = ctdoHTML + "<li><a href='#' " + strUrlOpc + ">" + strImagen + " " + lstData[i].DES_OPCION + "</a></li>";
                ctdoHTML = ctdoHTML + "</ul></li>";
                if (lstData[i].ID_OPCION.length - lstData[i + 1].ID_OPCION.length > 2) {
                    countSubReg = ((lstData[i].ID_OPCION.length - lstData[i + 1].ID_OPCION.length) / 2) - 1;
                    for (var j = 0; j < countSubReg; j++) {
                        ctdoHTML = ctdoHTML + "</ul></li>";
                    };
                }
            }
        };
    };
    ctdoHTML = ctdoHTML + "</ul>";
    return ctdoHTML;
};
/**
* Llena un combo con los meses del año
* @param {Object} objParametros Objeto que contiene los parámetros
* @param {number} objParametros.idCombo Identificador del combo
* @param {date} objParametros.idFecIni Fecha inicial
* @param {date} objParametros.idFecFin Fecha final
* @param {string} objParametros.idDivFechas Identificador del div que contiene las fechas
* @memberof generales
*/
function comboMeses(objParametros) {
    var strHtml = new String();
    var objDefatults = { idCombo: "", idFecIni: "", idFecFin: "", idDivFechas: "" };
    objParametros = $.extend(objDefatults, objParametros);
    strHtml += "<option value=''>--Por fechas--</option>";
    strHtml += "<option value='01'>Enero</option>";
    strHtml += "<option value='02'>Febrero</option>";
    strHtml += "<option value='03'>Marzo</option>";
    strHtml += "<option value='04'>Abril</option>";
    strHtml += "<option value='05'>Mayo</option>";
    strHtml += "<option value='06'>Junio</option>";
    strHtml += "<option value='07'>Julio</option>";
    strHtml += "<option value='08'>Agosto</option>";
    strHtml += "<option value='09'>Setiembre</option>";
    strHtml += "<option value='10'>Octubre</option>";
    strHtml += "<option value='11'>Noviembre</option>";
    strHtml += "<option value='12'>Diciembre</option>";
    $("#" + objParametros.idCombo).html(strHtml);
    $("#" + objParametros.idCombo).change(function () {
        if (noEsVacio(objParametros.idDivFechas)) {
            objDivFechas = $("#" + objParametros.idDivFechas);
            if (noEsVacio($(this).val())) {
                var intAnio = new Date().getFullYear();
                var strMes = new String();
                var strDiaFin = new String();
                strMes = $("#" + objParametros.idCombo).val();
                var fecDiaFin = new Date(intAnio, parseInt(strMes) - 1, 0);
                strDiaFin = fecDiaFin.getDate();
                $("#" + objParametros.idFecIni).val("01/" + strMes + "/" + intAnio);
                $("#" + objParametros.idFecFin).val(strDiaFin + "/" + strMes + "/" + intAnio);
                objDivFechas.hide();
            } else {
                objDivFechas.show();
            };
        };
    });
};

function contadorCaracteres(strElem) {
    strElem.each(function () {
        elem = strElem;
        var temp = new String();
        temp = elem.attr('maxLength');
        if (typeof temp == 'undefined') { elem.attr('maxLength', '200'); }
        var contador = $('<div>Caracteres: ' + elem.val().length + '/' + elem.attr('maxLength') + ' </div>');
        elem.after(contador);
        elem.data("campocontador", contador);

        elem.keyup(function () {
            var elem = $(this);
            var cuenta = "";
            var campocontador = elem.data("campocontador");

            if (elem.val().length <= temp) {
                cuenta = elem.val().length;
                campocontador.text('Caracteres: ' + cuenta + '/' + elem.attr('maxLength'));
            }
            else {
                elem.val(elem.val().substring(0, temp));
            };
        });
        elem.keydown(function () {
            var elem = $(this);
            var cuenta = "";
            var campocontador = elem.data("campocontador");

            if (elem.val().length <= temp) {
                cuenta = elem.val().length;
                campocontador.text('Caracteres: ' + cuenta + '/' + elem.attr('maxLength'));
            }
            else {
                elem.val(elem.val().substring(0, temp));
            };
        });
    });
};

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

