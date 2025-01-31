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
        url: ((noEsVacio(defaults.strRuta)) ? defaults.strRuta : strRutaAplicacionMaster) + "sistema/ws/" + defaults.url,
        data: "{'" + defaults.nombreObjeto + "':" + strParametros + "}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: defaults.async,
        success: function (msg) {
            lstData = (typeof msg.d == "string") ? eval(msg.d) : msg.d;
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
        strRuta: ""
    };
    defaults = $.extend(defaults, objCargaDatos);
    var strParametros = new String();
    if (noEsVacio(defaults.nombreObjeto)) strParametros = JSON.stringify(defaults.parametros); else strParametros = "";
    if (noEsVacio(defaults.divPadre)) abrirDivEspera(defaults.divPadre);
    //console.log(strRutaAplicacionMaster);
    var result = $.ajax({
        type: "POST",
        url: ((noEsVacio(defaults.strRuta)) ? defaults.strRuta : strRutaAplicacionMaster) + "api/" + defaults.url,
        //url: defaults.strRuta + "api/" + defaults.url,
        data: strParametros,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: defaults.async,
        success: function (msg) {
            var lstData = (typeof msg == "string") ? eval(msg) : msg;
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
        strRuta: ""
    };
    var defaults = $.extend(defaults, obj);
    var result = $.ajax({
        cache: defaults.cache,
        type: "POST",
        url: ((noEsVacio(defaults.strRuta)) ? defaults.strRuta : strRutaAplicacionMaster) + "api/" + defaults.url,
        data: JSON.stringify(defaults.parametros),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: defaults.async,
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
            mensajeSistema(defaults.divMensaje, objResultadoDB.ID_TIPO, strMensaje, defaults.divPadre, "");
            cerrarDivEspera(defaults.divPadre);
        },
        error: function (result) {
            mensajeSistema(defaults.divMensaje, "1", result.statusText, defaults.divPadre, "");
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
    if (noEsVacio(strRutaCliente)) strRutaAplicacionMaster = strRutaCliente;
    var divMensaje = $("#" + strIdDivMensaje);
    var result = $.ajax({
        type: "POST",
        url: strRutaAplicacionMaster + "sistema/ws/" + strUrl,
        contentType: "application/json; charset=utf-8",
        data: "{'" + strNombreObjeto + "':" + JSON.stringify(obj) + "}",
        dataType: "json",
        success: function (msg) {
            var objResultadoDB = msg.d;
            var strMensaje = "";
            if (objResultadoDB.ID_TIPO == "0") {
                strMensaje = objResultadoDB.DES_ERROR;
                if (strCallBack != "") {
                    eval(strCallBack);
                };
            }
            else {
                strMensaje = objResultadoDB.DES_ERROR;
            };
            mensajeSistema(strIdDivMensaje, objResultadoDB.ID_TIPO, strMensaje, strIdDivRegistro, strCallBackTime);
            cerrarDivEspera(strIdDivRegistro);
        },
        error: function (result) {
            mensajeSistema(strIdDivMensaje, "1", result.statusText, strIdDivRegistro, strCallBackTime);
        }
    });
    if (noEsVacio(strRutaCliente)) strRutaAplicacionMaster = "";    
};
/**
* Limpia el valor de los controles
* @param {string} div Identificador del div que contiene los controles que se quieren limpiar
* @memberof generales
*/
function limpiarElementos(div) {
    $("#" + div).find(':input').each(function () {
        switch (this.type.toLowerCase()) {
            case 'select-one':
                $(this).val('');
                break;
            case 'text':
                $(this).val('');
                break;
            case 'hidden':
                $(this).val('');
                break;
            case 'textarea':
                $(this).val('');
                break;
            case 'checkbox':
                $(this).prop("checked", false);
                break;
            case 'radio':
                $(this).prop("checked", false);
                break;
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
        console.log(objDiv);
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
function cargaPopUpAlert(strMsg) {
    alert(strMsg);
};


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
    var objDiv = $("#" + strDiv);
    if (objDiv) {
        objDiv.empty();
        objDiv.load(strUrl, function () {
            if (noEsVacio(strTitulo)) $("<label class='titulo'>" + strTitulo + "</label>").prependTo(objDiv);
            fnValidarSoloNumero(strDiv);
            controlesSoloLectura();
            objDiv.addClass("formularioContenido");
            $("fieldset").each(function () {
                $(this).attr("title", $(this).find("legend").html());
            });
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
    var strHtml = "<img name='imgEnEspera' src='" + strRutaImagenesMaster + "loader.gif" + "' style='text-align:center;'>";
    objDivContainer.prepend(strHtml);
};
/**
* Elimina la animación de expera
* @param {string} strIdDiv Identificador del div contenedor
* @memberof generales
*/
function cerrarDivEspera(strIdDiv) {
    var objDivContainer = $("#" + strIdDiv);
    if (objDivContainer) {
        objDivContainer.find("[name='imgEnEspera']").remove();
    };
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
    for (var i = 0; i < lstData.length; i++) {
        strPivot = lstData[i].ID_OPCION;
        if (lstData[i].NUM_NIVEL == intNivel) {
            if ((strCodigo == strPivot.substring(0, strPivot.length - 2)) || (intNivel == 1)) {
                strElementoPivot += "<li class='level1' align='right'><a href='#' style='width:200px;color:#FFFFFF; align:center' onclick='cargarContenidoEnDiv(\"divContenidoMaster\", \"" + strRutaAplicacionMaster + lstData[i].DES_URL + "\", \"" + lstData[i].DES_OPCION + "\"); return false;'>" + lstData[i].DES_OPCION + "</a>";
                strElementoPivot += agregarElementoMenuMaster(strPivot, intNivel + 1, lstData);
                strElementoPivot += "</li>";
                flgTieneHijos = true;
            };
        }
    };
    if (intNivel == 1) strId = " id = 'menuMaster'"; else "";
    return ((flgTieneHijos) ? "<ul" + strId + ">" + strElementoPivot + "</ul>" : strElementoPivot);
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

(function ($) {
    $.widget("custom.combobox", {
        _create: function () {
            this.wrapper = $("<span>")
          .addClass("custom-combobox")
          .insertAfter(this.element);

            this.element.hide();
            this._createAutocomplete();
            this._createShowAllButton();
        },

        _createAutocomplete: function () {
            var selected = this.element.children(":selected"),
          value = selected.val() ? selected.text() : "";

            this.input = $("<input>")
          .appendTo(this.wrapper)
          .val(value)
          .attr("title", "")
          .addClass("custom-combobox-input ui-widget ui-widget-content ui-state-default ui-corner-left")
          .autocomplete({
              delay: 0,
              minLength: 0,
              source: $.proxy(this, "_source")
          })
          .tooltip({
              tooltipClass: "ui-state-highlight"
          });

            this._on(this.input, {
                autocompleteselect: function (event, ui) {
                    ui.item.option.selected = true;
                    this._trigger("select", event, {
                        item: ui.item.option
                    });
                },

                autocompletechange: "_removeIfInvalid"
            });
        },

        _createShowAllButton: function () {
            var input = this.input,
          wasOpen = false;

            $("<a>")
          .attr("tabIndex", -1)
          .attr("title", "Ver todos")
          .tooltip()
          .appendTo(this.wrapper)
          .button({
              icons: {
                  primary: "ui-icon-triangle-1-s"
              },
              text: false
          })
          .removeClass("ui-corner-all")
          .addClass("custom-combobox-toggle ui-corner-right")
          .mousedown(function () {
              wasOpen = input.autocomplete("widget").is(":visible");
          })
          .click(function () {
              input.focus();

              // Close if already visible
              if (wasOpen) {
                  return;
              }

              // Pass empty string as value to search for, displaying all results
              input.autocomplete("search", "");
          });
        },

        _source: function (request, response) {
            var matcher = new RegExp($.ui.autocomplete.escapeRegex(request.term), "i");
            response(this.element.children("option").map(function () {
                var text = $(this).text();
                if (this.value && (!request.term || matcher.test(text)))
                    return {
                        label: text,
                        value: text,
                        option: this
                    };
            }));
        },

        _removeIfInvalid: function (event, ui) {

            // Selected an item, nothing to do
            if (ui.item) {
                return;
            }

            // Search for a match (case-insensitive)
            var value = this.input.val(),
          valueLowerCase = value.toLowerCase(),
          valid = false;
            this.element.children("option").each(function () {
                if ($(this).text().toLowerCase() === valueLowerCase) {
                    this.selected = valid = true;
                    return false;
                }
            });

            // Found a match, nothing to do
            if (valid) {
                return;
            }

            // Remove invalid value
            this.input
          .val("")
          .attr("title", value + " no se encuentra")
          .tooltip("open");
            this.element.val("");
            this._delay(function () {
                this.input.tooltip("close").attr("title", "");
            }, 2500);
            //this.input.autocomplete("instance").term = "";
        },

        _destroy: function () {
            this.wrapper.remove();
            this.element.show();
        }
    });
})(jQuery);

(function (jQuery) {
    jQuery.fn.mensajeSistema = function (objParametros) {
        var defaults = {
            intOpcion: 2,
            strMensaje: "",
            divRegistro: null,
            strCallBack: null,
            objBoton: null
        };
        defaults = $.extend(defaults, objParametros);
        var $lblMensaje = $(this);
        $lblMensaje.attr("class", null);
        $lblMensaje.text(defaults.strMensaje);
        switch (defaults.intOpcion) {
            case 0:
                if (defaults.objBoton) {
                    defaults.objBoton.addClass("ui-state-disabled");
                    defaults.objBoton.attr("disabled", true);
                };
                $lblMensaje.addClass("correcto");
                strTimerMaster = setTimeout(function () {
                    $lblMensaje.attr("class", null);
                    $lblMensaje.text("");
                    if (defaults.objBoton) {
                        defaults.objBoton.attr("disabled", false);
                        defaults.objBoton.removeClass("ui-state-disabled");
                    };
                    if (defaults.divRegistro) $('#' + defaults.divRegistro).dialog("close");
                    if (defaults.strCallBack) {
                        if (defaults.strCallBack.length > 0) {
                            eval(defaults.strCallBack);
                        };
                    };
                }, 2000);
                break;
            case 1:
                $lblMensaje.addClass("error_apli");
                break;
            default:
                $lblMensaje.addClass("verificar");
                break;
        };
    };
})(jQuery);

/*jQuery(document).ajaxStart(function() {
    $("#divDialogAjaxStart").show();
})

jQuery(document).ajaxStop(function() {
    $("#divDialogAjaxStart").hide();
});*/

function getOnlyDate(dString) {
    var onlyFecha = new String();
    if (noEsVacio(dString)) {
        var strFechaPivot = dString.split("/");
        var strAnioPivot = strFechaPivot[2].split(" ");
        var dd = strFechaPivot[0];
        var mm = strFechaPivot[1];
        var yy = strAnioPivot[0];
        onlyFecha = dd + "/" + mm + "/" + yy;
        return onlyFecha;
    } else {
        onlyFecha = "";
    }
    return onlyFecha;
};
function fnCalcularFecha(f1, f2) {
    var dias = Number();
    var aFecha1 = f1.split('/');
    var aFecha2 = f2.split('/');
    var fFecha1 = Date.UTC(aFecha1[2], aFecha1[1] - 1, aFecha1[0]);
    var fFecha2 = Date.UTC(aFecha2[2], aFecha2[1] - 1, aFecha2[0]);
    var dif = fFecha2 - fFecha1;
    var dias = Math.floor(dif / (1000 * 60 * 60 * 24));
    return dias;
};

/*function fnSumarDiasFecha(f1, tiempo) {
    var dias = Number();
    var aFecha1 = f1.split('/');
    var fFecha1 = Date.UTC(aFecha1[2], aFecha1[1] - 1, aFecha1[0]);
    var sum = fFecha1 + tiempo;
    console.log(sum);

}*/
function fnSumarDiasFecha(theDate, days) {
    return new Date(theDate.getTime() + days * 24 * 60 * 60 * 1000);
}

function configuraCalendarioDiasHabiles(objDate) {
    var defaults = {
        idTexto: "",
        yearRange: "-100:+0",
        maxDate: "",
        showOn: "button",
        changeMonth: true,
        changeYear: true,
        buttonImageOnly: true,
        buttonImage: strRutaImagenesMaster + "calendar.png",
        constrainInput: true,
        beforeShowDay: "",
        onSelect: function () { }

    };
    var defaults = $.extend(defaults, objDate);
    
    $("#" + defaults.idTexto).datepicker({
        yearRange: defaults.yearRange,
        maxDate: defaults.maxDate,
        showOn: defaults.showOn, 
        changeMonth: defaults.changeMonth, 
        changeYear: defaults.changeYear, 
        buttonImageOnly: defaults.buttonImageOnly, 
        buttonImage: defaults.buttonImage,
        constrainInput :defaults.constrainInput,
        beforeShowDay: defaults.beforeShowDay, 
        onSelect: defaults.onSelect
    
     });
    $("#" + defaults.idTexto).datepicker($.datepicker.regional["es"]);
    $('img.ui-datepicker-trigger').css({ 'cursor': 'pointer', "vertical-align": 'middle' });
};

(function ($) {
    var re = /([^&=]+)=?([^&]*)/g;
    var decodeRE = /\+/g;  // Regex for replacing addition symbol with a space
    var decode = function (str) { return decodeURIComponent(str.replace(decodeRE, " ")); };
    $.parseParams = function (query) {
        var params = {}, e;
        while (e = re.exec(query)) {
            var k = decode(e[1]), v = decode(e[2]);
            if (k.substring(k.length - 2) === '[]') {
                k = k.substring(0, k.length - 2);
                (params[k] || (params[k] = [])).push(v);
            }
            else params[k] = v;
        }
        return params;
    };
})(jQuery);

function removeDiacritics (str) {
  var defaultDiacriticsRemovalMap = [
    {'base':'A', 'letters':/[\u0041\u24B6\uFF21\u00C0\u00C1\u00C2\u1EA6\u1EA4\u1EAA\u1EA8\u00C3\u0100\u0102\u1EB0\u1EAE\u1EB4\u1EB2\u0226\u01E0\u00C4\u01DE\u1EA2\u00C5\u01FA\u01CD\u0200\u0202\u1EA0\u1EAC\u1EB6\u1E00\u0104\u023A\u2C6F]/g},
    {'base':'AA','letters':/[\uA732]/g},
    {'base':'AE','letters':/[\u00C6\u01FC\u01E2]/g},
    {'base':'AO','letters':/[\uA734]/g},
    {'base':'AU','letters':/[\uA736]/g},
    {'base':'AV','letters':/[\uA738\uA73A]/g},
    {'base':'AY','letters':/[\uA73C]/g},
    {'base':'B', 'letters':/[\u0042\u24B7\uFF22\u1E02\u1E04\u1E06\u0243\u0182\u0181]/g},
    {'base':'C', 'letters':/[\u0043\u24B8\uFF23\u0106\u0108\u010A\u010C\u00C7\u1E08\u0187\u023B\uA73E]/g},
    {'base':'D', 'letters':/[\u0044\u24B9\uFF24\u1E0A\u010E\u1E0C\u1E10\u1E12\u1E0E\u0110\u018B\u018A\u0189\uA779]/g},
    {'base':'DZ','letters':/[\u01F1\u01C4]/g},
    {'base':'Dz','letters':/[\u01F2\u01C5]/g},
    {'base':'E', 'letters':/[\u0045\u24BA\uFF25\u00C8\u00C9\u00CA\u1EC0\u1EBE\u1EC4\u1EC2\u1EBC\u0112\u1E14\u1E16\u0114\u0116\u00CB\u1EBA\u011A\u0204\u0206\u1EB8\u1EC6\u0228\u1E1C\u0118\u1E18\u1E1A\u0190\u018E]/g},
    {'base':'F', 'letters':/[\u0046\u24BB\uFF26\u1E1E\u0191\uA77B]/g},
    {'base':'G', 'letters':/[\u0047\u24BC\uFF27\u01F4\u011C\u1E20\u011E\u0120\u01E6\u0122\u01E4\u0193\uA7A0\uA77D\uA77E]/g},
    {'base':'H', 'letters':/[\u0048\u24BD\uFF28\u0124\u1E22\u1E26\u021E\u1E24\u1E28\u1E2A\u0126\u2C67\u2C75\uA78D]/g},
    {'base':'I', 'letters':/[\u0049\u24BE\uFF29\u00CC\u00CD\u00CE\u0128\u012A\u012C\u0130\u00CF\u1E2E\u1EC8\u01CF\u0208\u020A\u1ECA\u012E\u1E2C\u0197]/g},
    {'base':'J', 'letters':/[\u004A\u24BF\uFF2A\u0134\u0248]/g},
    {'base':'K', 'letters':/[\u004B\u24C0\uFF2B\u1E30\u01E8\u1E32\u0136\u1E34\u0198\u2C69\uA740\uA742\uA744\uA7A2]/g},
    {'base':'L', 'letters':/[\u004C\u24C1\uFF2C\u013F\u0139\u013D\u1E36\u1E38\u013B\u1E3C\u1E3A\u0141\u023D\u2C62\u2C60\uA748\uA746\uA780]/g},
    {'base':'LJ','letters':/[\u01C7]/g},
    {'base':'Lj','letters':/[\u01C8]/g},
    {'base':'M', 'letters':/[\u004D\u24C2\uFF2D\u1E3E\u1E40\u1E42\u2C6E\u019C]/g},
    {'base':'N', 'letters':/[\u004E\u24C3\uFF2E\u01F8\u0143\u00D1\u1E44\u0147\u1E46\u0145\u1E4A\u1E48\u0220\u019D\uA790\uA7A4]/g},
    {'base':'NJ','letters':/[\u01CA]/g},
    {'base':'Nj','letters':/[\u01CB]/g},
    {'base':'O', 'letters':/[\u004F\u24C4\uFF2F\u00D2\u00D3\u00D4\u1ED2\u1ED0\u1ED6\u1ED4\u00D5\u1E4C\u022C\u1E4E\u014C\u1E50\u1E52\u014E\u022E\u0230\u00D6\u022A\u1ECE\u0150\u01D1\u020C\u020E\u01A0\u1EDC\u1EDA\u1EE0\u1EDE\u1EE2\u1ECC\u1ED8\u01EA\u01EC\u00D8\u01FE\u0186\u019F\uA74A\uA74C]/g},
    {'base':'OI','letters':/[\u01A2]/g},
    {'base':'OO','letters':/[\uA74E]/g},
    {'base':'OU','letters':/[\u0222]/g},
    {'base':'P', 'letters':/[\u0050\u24C5\uFF30\u1E54\u1E56\u01A4\u2C63\uA750\uA752\uA754]/g},
    {'base':'Q', 'letters':/[\u0051\u24C6\uFF31\uA756\uA758\u024A]/g},
    {'base':'R', 'letters':/[\u0052\u24C7\uFF32\u0154\u1E58\u0158\u0210\u0212\u1E5A\u1E5C\u0156\u1E5E\u024C\u2C64\uA75A\uA7A6\uA782]/g},
    {'base':'S', 'letters':/[\u0053\u24C8\uFF33\u1E9E\u015A\u1E64\u015C\u1E60\u0160\u1E66\u1E62\u1E68\u0218\u015E\u2C7E\uA7A8\uA784]/g},
    {'base':'T', 'letters':/[\u0054\u24C9\uFF34\u1E6A\u0164\u1E6C\u021A\u0162\u1E70\u1E6E\u0166\u01AC\u01AE\u023E\uA786]/g},
    {'base':'TZ','letters':/[\uA728]/g},
    {'base':'U', 'letters':/[\u0055\u24CA\uFF35\u00D9\u00DA\u00DB\u0168\u1E78\u016A\u1E7A\u016C\u00DC\u01DB\u01D7\u01D5\u01D9\u1EE6\u016E\u0170\u01D3\u0214\u0216\u01AF\u1EEA\u1EE8\u1EEE\u1EEC\u1EF0\u1EE4\u1E72\u0172\u1E76\u1E74\u0244]/g},
    {'base':'V', 'letters':/[\u0056\u24CB\uFF36\u1E7C\u1E7E\u01B2\uA75E\u0245]/g},
    {'base':'VY','letters':/[\uA760]/g},
    {'base':'W', 'letters':/[\u0057\u24CC\uFF37\u1E80\u1E82\u0174\u1E86\u1E84\u1E88\u2C72]/g},
    {'base':'X', 'letters':/[\u0058\u24CD\uFF38\u1E8A\u1E8C]/g},
    {'base':'Y', 'letters':/[\u0059\u24CE\uFF39\u1EF2\u00DD\u0176\u1EF8\u0232\u1E8E\u0178\u1EF6\u1EF4\u01B3\u024E\u1EFE]/g},
    {'base':'Z', 'letters':/[\u005A\u24CF\uFF3A\u0179\u1E90\u017B\u017D\u1E92\u1E94\u01B5\u0224\u2C7F\u2C6B\uA762]/g},
    {'base':'a', 'letters':/[\u0061\u24D0\uFF41\u1E9A\u00E0\u00E1\u00E2\u1EA7\u1EA5\u1EAB\u1EA9\u00E3\u0101\u0103\u1EB1\u1EAF\u1EB5\u1EB3\u0227\u01E1\u00E4\u01DF\u1EA3\u00E5\u01FB\u01CE\u0201\u0203\u1EA1\u1EAD\u1EB7\u1E01\u0105\u2C65\u0250]/g},
    {'base':'aa','letters':/[\uA733]/g},
    {'base':'ae','letters':/[\u00E6\u01FD\u01E3]/g},
    {'base':'ao','letters':/[\uA735]/g},
    {'base':'au','letters':/[\uA737]/g},
    {'base':'av','letters':/[\uA739\uA73B]/g},
    {'base':'ay','letters':/[\uA73D]/g},
    {'base':'b', 'letters':/[\u0062\u24D1\uFF42\u1E03\u1E05\u1E07\u0180\u0183\u0253]/g},
    {'base':'c', 'letters':/[\u0063\u24D2\uFF43\u0107\u0109\u010B\u010D\u00E7\u1E09\u0188\u023C\uA73F\u2184]/g},
    {'base':'d', 'letters':/[\u0064\u24D3\uFF44\u1E0B\u010F\u1E0D\u1E11\u1E13\u1E0F\u0111\u018C\u0256\u0257\uA77A]/g},
    {'base':'dz','letters':/[\u01F3\u01C6]/g},
    {'base':'e', 'letters':/[\u0065\u24D4\uFF45\u00E8\u00E9\u00EA\u1EC1\u1EBF\u1EC5\u1EC3\u1EBD\u0113\u1E15\u1E17\u0115\u0117\u00EB\u1EBB\u011B\u0205\u0207\u1EB9\u1EC7\u0229\u1E1D\u0119\u1E19\u1E1B\u0247\u025B\u01DD]/g},
    {'base':'f', 'letters':/[\u0066\u24D5\uFF46\u1E1F\u0192\uA77C]/g},
    {'base':'g', 'letters':/[\u0067\u24D6\uFF47\u01F5\u011D\u1E21\u011F\u0121\u01E7\u0123\u01E5\u0260\uA7A1\u1D79\uA77F]/g},
    {'base':'h', 'letters':/[\u0068\u24D7\uFF48\u0125\u1E23\u1E27\u021F\u1E25\u1E29\u1E2B\u1E96\u0127\u2C68\u2C76\u0265]/g},
    {'base':'hv','letters':/[\u0195]/g},
    {'base':'i', 'letters':/[\u0069\u24D8\uFF49\u00EC\u00ED\u00EE\u0129\u012B\u012D\u00EF\u1E2F\u1EC9\u01D0\u0209\u020B\u1ECB\u012F\u1E2D\u0268\u0131]/g},
    {'base':'j', 'letters':/[\u006A\u24D9\uFF4A\u0135\u01F0\u0249]/g},
    {'base':'k', 'letters':/[\u006B\u24DA\uFF4B\u1E31\u01E9\u1E33\u0137\u1E35\u0199\u2C6A\uA741\uA743\uA745\uA7A3]/g},
    {'base':'l', 'letters':/[\u006C\u24DB\uFF4C\u0140\u013A\u013E\u1E37\u1E39\u013C\u1E3D\u1E3B\u017F\u0142\u019A\u026B\u2C61\uA749\uA781\uA747]/g},
    {'base':'lj','letters':/[\u01C9]/g},
    {'base':'m', 'letters':/[\u006D\u24DC\uFF4D\u1E3F\u1E41\u1E43\u0271\u026F]/g},
    {'base':'n', 'letters':/[\u006E\u24DD\uFF4E\u01F9\u0144\u00F1\u1E45\u0148\u1E47\u0146\u1E4B\u1E49\u019E\u0272\u0149\uA791\uA7A5]/g},
    {'base':'nj','letters':/[\u01CC]/g},
    {'base':'o', 'letters':/[\u006F\u24DE\uFF4F\u00F2\u00F3\u00F4\u1ED3\u1ED1\u1ED7\u1ED5\u00F5\u1E4D\u022D\u1E4F\u014D\u1E51\u1E53\u014F\u022F\u0231\u00F6\u022B\u1ECF\u0151\u01D2\u020D\u020F\u01A1\u1EDD\u1EDB\u1EE1\u1EDF\u1EE3\u1ECD\u1ED9\u01EB\u01ED\u00F8\u01FF\u0254\uA74B\uA74D\u0275]/g},
    {'base':'oi','letters':/[\u01A3]/g},
    {'base':'ou','letters':/[\u0223]/g},
    {'base':'oo','letters':/[\uA74F]/g},
    {'base':'p','letters':/[\u0070\u24DF\uFF50\u1E55\u1E57\u01A5\u1D7D\uA751\uA753\uA755]/g},
    {'base':'q','letters':/[\u0071\u24E0\uFF51\u024B\uA757\uA759]/g},
    {'base':'r','letters':/[\u0072\u24E1\uFF52\u0155\u1E59\u0159\u0211\u0213\u1E5B\u1E5D\u0157\u1E5F\u024D\u027D\uA75B\uA7A7\uA783]/g},
    {'base':'s','letters':/[\u0073\u24E2\uFF53\u00DF\u015B\u1E65\u015D\u1E61\u0161\u1E67\u1E63\u1E69\u0219\u015F\u023F\uA7A9\uA785\u1E9B]/g},
    {'base':'t','letters':/[\u0074\u24E3\uFF54\u1E6B\u1E97\u0165\u1E6D\u021B\u0163\u1E71\u1E6F\u0167\u01AD\u0288\u2C66\uA787]/g},
    {'base':'tz','letters':/[\uA729]/g},
    {'base':'u','letters':/[\u0075\u24E4\uFF55\u00F9\u00FA\u00FB\u0169\u1E79\u016B\u1E7B\u016D\u00FC\u01DC\u01D8\u01D6\u01DA\u1EE7\u016F\u0171\u01D4\u0215\u0217\u01B0\u1EEB\u1EE9\u1EEF\u1EED\u1EF1\u1EE5\u1E73\u0173\u1E77\u1E75\u0289]/g},
    {'base':'v','letters':/[\u0076\u24E5\uFF56\u1E7D\u1E7F\u028B\uA75F\u028C]/g},
    {'base':'vy','letters':/[\uA761]/g},
    {'base':'w','letters':/[\u0077\u24E6\uFF57\u1E81\u1E83\u0175\u1E87\u1E85\u1E98\u1E89\u2C73]/g},
    {'base':'x','letters':/[\u0078\u24E7\uFF58\u1E8B\u1E8D]/g},
    {'base':'y','letters':/[\u0079\u24E8\uFF59\u1EF3\u00FD\u0177\u1EF9\u0233\u1E8F\u00FF\u1EF7\u1E99\u1EF5\u01B4\u024F\u1EFF]/g},
    {'base':'z','letters':/[\u007A\u24E9\uFF5A\u017A\u1E91\u017C\u017E\u1E93\u1E95\u01B6\u0225\u0240\u2C6C\uA763]/g}
  ];

  for(var i=0; i<defaultDiacriticsRemovalMap.length; i++) {
    str = str.replace(defaultDiacriticsRemovalMap[i].letters, defaultDiacriticsRemovalMap[i].base);
  }

  return str;

}

function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
};
function fechaActual() {
    var date = new Date();
    var fechaActual = padLeft(date.getDate(), 2) + "/" + padLeft(date.getMonth() + 1, 2) + "/" + date.getFullYear();
    return fechaActual;
}
function toJSDate(dateTime, time) {
    if (noEsVacio(dateTime)) {
        var dateTime = dateTime.replace(/\//g, '-').split(" ");
        var date = dateTime[0].split("-");
        if (time) {
            var time = dateTime[1].split(":");
            return new Date(date[2], (date[1] - 1), date[0], time[0], time[1], 0, 0);
        } else {
            return new Date(date[2], (date[1] - 1), date[0]);
        }
    } else {
        return dateTime;
    }  
}
function futureDateTime(dateTime) {
    var now = new Date();
    var future = false;
    if (dateTime > now) {
        future = true;
    }
    return future;
}


