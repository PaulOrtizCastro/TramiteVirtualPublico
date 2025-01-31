/**
* Validaciones en javascript
* @namespace
* @name validaciones
*/
/**
* Verifica si el control ingresado no es nulo, de serlo retorna -1.
* @param {Object} objValor Identificador del control a validar.
* @return {integer} objPivot Retrona -1 si es null.
* @memberof validaciones
*/
function validaNulosNumeros(objValor) {
    var objPivot = -1;
    if (objValor) {
        if (noEsVacio(objValor)) objPivot = objValor;
    };
    return objPivot;
};
/**
* Verifica si el control ingresado no es nulo de serlo retorna "".
* @param {Object} objValor Identificador del objeto a validar.
* @return {Object} objValor Retrona "" si es null.
* @memberof validaciones
*/
function validaNulosString(objValor) {
    if (objValor == null)
        return "";
    else
        return objValor;
};
/**
* Verifica si el objeto entidad ingresada es nulo. Se puede filtrar por atributos del objeto entidad.
* @param {Object} objDato entidad identificador del objeto a validar.
* @param {string} strNombrePropiedad Tipo de atributos de la entidad a validar (opcional).
* @memberof validaciones
*/
function validaNulosJSON(objDato, strNombrePropiedad) {
    if (strNombrePropiedad.indexOf(".") > -1) {
        var strPivot = strNombrePropiedad.split(".");
        if (objDato[strPivot[0]][strPivot[1]] == null) return "--"; else return objDato[strPivot[0]][strPivot[1]];
    } else {
        if (objDato[strNombrePropiedad] == null) return "--"; else return objDato[strNombrePropiedad];
    };
};
/**
* Verifica si el control ingresado no es nulo o undefined, de serlo retorna true.
* @param {Object} objValor Identificador del objeto a validar.
* @return {Boolean} objValor Retrona true si es null.
* @memberof validaciones
*/
function noEsVacio(objValor) {
    var boolValor = false;
    if ((objValor) && (typeof objValor != "undefined")) {
        if ($.trim(objValor).length > 0) {
            boolValor = true;
        };
    };
    return boolValor;
};
/**
* Verifica controles de entrada a un formulario que incluyen span.
* @param {string} strIdDiv Nombre (DIV) del formulario. 
* @param {string} strIdDivMensaje Nombre (DIV) del mensaje a mostrar.  
* @return {Boolean} boolPivot Retrona false si alguno de los campos obligatorios no se a ingresado.
* @memberof validaciones
*/
function validaInputsFormulario(strIdDiv, strIdDivMensaje) {
    boolPivot = true;
    var divMensaje = $("#" + strIdDivMensaje);
    $("#" + strIdDiv + " :input").each(function () {
        var objPivot = $(this);
        if (objPivot.parent().hasClass("ui-spinner")) objPivot = objPivot.parent();
        if ((objPivot.next("span")) && ($(this).is(":visible")) && ($(this).is(':disabled') == false)) {
            if (objPivot.next("span").attr("class") == "campoObligatorio") {
                if (validaInputSegunTipo(this)) {
                    $(this).removeClass("errorControl");
                }
                else {
                    divMensaje.show();
                    mensajeSistema(strIdDivMensaje, "2", objPivot.next("span").attr("title"), "", "");
                    $(this).addClass("errorControl");
                    $(this).focus();
                    boolPivot = false;
                    return boolPivot;
                };
            };
        }

        if ($(this).next('div')) {
            if ($(this).next('span') && ($(this).is(":visible"))) {
                if ($(this).next('div').next('span').attr("class") == "campoObligatorio" && ($(this).hasClass("contador"))) {
                    if (validaInputSegunTipo(this)) {
                        $(this).removeClass("errorControl");
                    } else {
                        divMensaje.show();
                        mensajeSistema(strIdDivMensaje, "2", $(this).next("div").next("span").attr("title"), "", "");
                        $(this).addClass("errorControl");
                        $(this).focus();
                        boolPivot = false;
                        return boolPivot;
                    };
                };
            };
        };

        if ($(this).hasClass("compareValidator")) {

            var strValorRef = $("#" + $(this).attr("controlToCompare")).val();
            var strValorActual = $(this).val();

            switch ($(this).attr("compareType")) {
                case "date":
                    strValorRef = strValorRef.split("/");
                    strValorRef = parseInt($.trim(strValorRef[2]) + $.trim(strValorRef[1]) + $.trim(strValorRef[0]));
                    strValorActual = strValorActual.split("/");
                    strValorActual = parseInt($.trim(strValorActual[2]) + $.trim(strValorActual[1]) + $.trim(strValorActual[0]));

                    if ($(this).attr("compareFlag") == "1") {
                        if (strValorActual < strValorRef) boolPivot = false;
                    };
                    if ($(this).attr("compareFlag") == "2") {
                        if (strValorActual <= strValorRef) boolPivot = false;
                    };
                    if ($(this).attr("compareFlag") == "3") {
                        if (strValorActual == strValorRef) boolPivot = false;
                    };
                    if ($(this).attr("compareFlag") == "4") {
                        if (strValorActual != strValorRef) boolPivot = false;
                    };
                    if ($(this).attr("compareFlag") == "5") {
                        if (strValorActual >= strValorRef) boolPivot = false;
                    };
                    if ($(this).attr("compareFlag") == "6") {
                        if (strValorActual > strValorRef) boolPivot = false;
                    };
                    break;
                default:
                    boolPivot = true;
            };
            if (boolPivot == false) {
                divMensaje.show();
                mensajeSistema(strIdDivMensaje, "2", $(this).attr("compareMessage"), "", "");
                $(this).addClass("errorControl");
                $(this).focus();
            };
        };
    });
    return boolPivot;
};
/**
* Verifica controles obligatorios segun tipo.
* @param {Object} obj Nombre del control.
* @memberof validaciones
*/
function validaInputSegunTipo(obj) {
    switch (obj.type) {
        case 'select-one':
            return (noEsVacio($(obj).val()));
            break;
        case 'text':
            return (noEsVacio($(obj).val()));
            break;
        case 'textarea':
            return (noEsVacio($(obj).val()));
            break;
        case 'checkbox':
            return $(this).attr("checked");
            break;
    };
};
/**
* Reemplaza caracteres especiales.
* @param {string} strVariable Nombre del control.
* @return {string} strVariable Retrona "".
* @memberof validaciones
*/
function remplazarCaracteres(strVariable) {
    if (noEsVacio(strVariable)) {
        strVariable = strVariable.replace(/[\?\-\_\¿\*\&\'\%\$]/g, "");
        return strVariable;
    };
};
/**
* Verifica controles de entrada a un formulario.
* @param {string} strIdDiv Nombre (DIV) del formulario.
* @param {string} strIdDivMensaje Nombre (DIV) del mensaje a mostrar.  
* @param {string} strRadioName Nombre del control radio a validar.
* @return {Boolean} boolPivot Retrona false si alguno de los campos obligatorios no se a ingresado.
* @memberof validaciones
*/
function validaControlesFormulario(strIdDiv, strIdDivMensaje, strRadioName) {
    var boolPivot = true;
    var divMensaje = $("#" + strIdDivMensaje);
    $("#" + strIdDiv).find(':input').each(function () {
        switch (this.type) {
            case 'select-one':
                if ($.trim($(this).val()).length > 0) {
                    $(this).removeClass("errorControl");
                } else {
                    $(this).addClass("errorControl");
                    boolPivot = false;
                };
                break;
            case 'text':
                if ($.trim($(this).val()).length > 0) {
                    $(this).removeClass("errorControl");
                } else {
                    $(this).addClass("errorControl");
                    boolPivot = false;
                };
                break;
            case 'textarea':
                if ($.trim($(this).val()).length > 0) {
                    $(this).removeClass("errorControl");
                } else {
                    $(this).addClass("errorControl");
                    boolPivot = false;
                };
                break;
            case 'checkbox':
                if (($(this).attr(':checked'))) {
                    $(this).removeClass("errorControl");
                } else {
                    $(this).addClass("errorControl");
                    boolPivot = false;
                };
                break;
            case 'radio':
                var radioName = strRadioName
                if ($('input[name=' + radioName + ']:checked').val()) {
                    $(this).removeClass("errorControl");
                } else {
                    divMensaje.show();
                    mensajeSistema(strIdDivMensaje, "2", $(this).next("span").attr("title"), "", "");
                    $(this).addClass("errorControl");
                    boolPivot = false;
                };
                break;
        } return boolPivot;
    });

};
/**
* Verifica selección de checkbox, al menos uno debe se estar seleccionado.
* @param {string} strNombre Nombre del checkbox a validar.
* @param {Object} obj Nombre de objeto (div) en donde se ubica el control.
* @memberof validaciones
*/
function validaAlMenosUnCheck(strNombre, obj) {
    var intTotal = 0;
    var intTotalChequeados = 0;
    $("input[name=" + strNombre + "]").not(obj).each(function () {
        if (this.checked) {
            intTotalChequeados++;
        };
        intTotal++;
    });
    if (intTotalChequeados > 0) {
        return true;
    }
    else {
        return false;
    };
};
/**
*Función numeric: Permite sólo caracteres válidos (números) que se escribe en un cuadro de texto.
*Puede tomar los números negativos y un punto decimal, proporcionar una devolución de llamada que se ejecuta cuando el foco se pierde y el valor en el cuadro de texto no es un número válido.
*/
(function (jQuery) { 
    /**
     * Funcion que valida el ingreso de numeros enteros, decimales negativos o no negativos 
     * @function
     * @param {Object} e Parametros.
     * @param {Object} e.ctrlKey.
     * @param {Object} e.keyCode.
     * @param {Object} e.charCode.
     * @param {Object} e.which.
     * @memberOf jQuery
     */
$.fn.numeric = function (config, callback) {

        if (typeof config === 'boolean') {
            config = { decimal: config };

        }
        config = config || {};

        // if config.negative undefined, set to true (default is to allow negative numbers)
        if (typeof config.negative == "undefined") config.negative = true;
        // set decimal point
        var decimal = (config.decimal === false) ? "" : config.decimal || ".";
        // allow negatives
        var negative = (config.negative === true) ? true : false;
        // callback function
        var callback = typeof callback == "function" ? callback : function () { };
        // set data and methods
        return this.data("numeric.decimal", decimal).data("numeric.negative", negative).data("numeric.callback", callback).keypress($.fn.numeric.keypress).keyup($.fn.numeric.keyup).blur($.fn.numeric.blur);
    };

    $.fn.numeric.keypress =
    function (e) {

        // get decimal character and determine if negatives are allowed
        var decimal = $.data(this, "numeric.decimal");
        var negative = $.data(this, "numeric.negative");
        // get the key that was pressed
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        // allow enter/return key (only when in an input box)
        if (key == 13 && this.nodeName.toLowerCase() == "input") {
            return true;
        }
        else if (key == 13) {
            return false;
        }
        var allow = false;
        // allow Ctrl+A
        if ((e.ctrlKey && key == 97 /* firefox */) || (e.ctrlKey && key == 65) /* opera */) return true;
        // allow Ctrl+X (cut)
        if ((e.ctrlKey && key == 120 /* firefox */) || (e.ctrlKey && key == 88) /* opera */) return true;
        // allow Ctrl+C (copy)
        if ((e.ctrlKey && key == 99 /* firefox */) || (e.ctrlKey && key == 67) /* opera */) return true;
        // allow Ctrl+Z (undo)
        if ((e.ctrlKey && key == 122 /* firefox */) || (e.ctrlKey && key == 90) /* opera */) return true;
        // allow or deny Ctrl+V (paste), Shift+Ins
        if ((e.ctrlKey && key == 118 /* firefox */) || (e.ctrlKey && key == 86) /* opera */
	    || (e.shiftKey && key == 45)) return true;
        // if a number was not pressed
        if (key < 48 || key > 57) {
            /* '-' only allowed at start and if negative numbers allowed (put this in true for that) */
            if (this.value.indexOf("-") != 0 && negative && key == 45 && (this.value.length == 0 || ($.fn.getSelectionStart(this)) == 0)) return false;
            /* only one decimal separator allowed */
            if (decimal && key == decimal.charCodeAt(0) && this.value.indexOf(decimal) != -1) {
                allow = false;
            }
            // check for other keys that have special purposes
            if (
			    key != 8 /* backspace */ &&
			    key != 9 /* tab */ &&
			    key != 13 /* enter */ &&
			    key != 35 /* end */ &&
			    key != 36 /* home */ &&
			    key != 37 /* left */ &&
			    key != 39 /* right */ &&
			    key != 46 /* del */
		    ) {
                allow = false;
            }
            else {
                // for detecting special keys (listed above)
                // IE does not support 'charCode' and ignores them in keypress anyway
                if (typeof e.charCode != "undefined") {
                    // special keys have 'keyCode' and 'which' the same (e.g. backspace)
                    if (e.keyCode == e.which && e.which != 0) {
                        allow = true;
                        // . and delete share the same code, don't allow . (will be set to true later if it is the decimal point)
                        if (e.which == 46) allow = false;
                    }
                    // or keyCode != 0 and 'charCode'/'which' = 0
                    else if (e.keyCode != 0 && e.charCode == 0 && e.which == 0) {
                        allow = true;
                    }
                }
            }
            // if key pressed is the decimal and it is not already in the field
            if (decimal && key == decimal.charCodeAt(0)) {
                if (this.value.indexOf(decimal) == -1) {
                    allow = true;
                }
                else {
                    allow = false;
                }
            }
        }
        else {
            allow = true;
        }
        return allow;
    };

    $.fn.getSelectionStart = function (o) {
        if (o.createTextRange) {
            var r = document.selection.createRange().duplicate();
            r.moveEnd('character', o.value.length);
            if (r.text == '') return o.value.length;
            return o.value.lastIndexOf(r.text);
        } else return o.selectionStart;
    };
})(jQuery);
/**
* Verifica que el control solo contenga valores numericos o decimales mayores que 0
* @param {string} idDiv Nombre del control (DIV)  a validar
* @memberof validaciones
*/
function fnValidarSoloNumero(idDiv) {
    $("#" + idDiv + " .numerica").each(function () {
        $(this).numeric(false, function () { this.value = ""; this.focus(); });
    });

    $("#" + idDiv + " .decimal").each(function () {
        $(this).numeric({ negative: false }, function () { this.value = ""; this.focus(); });
    });
};
/**
* Remueve la clase errorControl
* @param {string} strIdDiv Nombre (DIV) del formulario 
* @param {string} strIdDivMensaje Nombre del control del mensaje  
* @memberof validaciones
*/
function fnRemoverCss(strIdDiv, strIdDivMensaje) {
    var requiredFields = $("#" + strIdDiv).find('.requiredField');
    var divMensaje = $("#" + strIdDivMensaje);
    $("#" + strIdDiv + " :input").each(function () {
        $("#" + strIdDiv + " :input").bind('keypress', function () {
            if (this.value.length >= 0) {
                $(this).removeClass('errorControl');
            } else {
                $(this).addClass('errorControl');
            };
        });
        $("#" + strIdDiv + " :input").change(function () {
            if (this.value.length >= 0) {
                $(this).removeClass('errorControl');
            } else {
                $(this).addClass('errorControl');
            };
        });

    });
    requiredFields.each(function (index) {
        $(this).removeClass("errorControl");
        divMensaje.hide();
    });
};
/**
* Remueve la clase numerica
* @param {string} strIdDiv Nombre (DIV) del formulario 
* @param {string} strIdDivMensaje Nombre (DIV) del mensaje a mostrar 
* @memberof validaciones
*/
function fnRemoverCssNumeric(strIdDiv, strIdDivMensaje) {
    var numerica = $("#" + strIdDiv).find('.numerica');
    var divMensaje = $("#" + strIdDivMensaje);
    $("#" + strIdDiv + " :input").each(function () {
        $("#" + strIdDiv + " :input").bind('keypress', function () {
            if (this.value.length >= 0) {
                $(this).removeClass('numerica');
            } else {
                $(this).addClass('numerica');
            };
        });
    });
    requiredFields.each(function (index) {
        $(this).removeClass("numerica");
        divMensaje.hide();
    });
};
/**
* Habilita submit 
* @param {string} strIdDiv Nombre (DIV) del formulario
* @memberof validaciones
*/
function fnHabilitarSubmit(strIdDiv) {
    $("#" + strIdDiv + " :input").each(function () {
        switch (this.type) {
            case 'image':
                $(this).removeAttr("disabled");
        }
    });
}
/**
* Previene submit 
* @param {string} strIdDiv Nombre (DIV) del formulario
* @memberof validaciones
*/
function fnPreventSubmit(strIdDiv) {
    $("#" + strIdDiv + " :input").each(function () {
        switch (this.type) {
            case 'image':
                $(this).attr("disabled", "disabled");
        }
    });
};
(function (jQuery) {
    /**
     * Cuenta caracteres ingresados a un texbox o textArea
     * @memberOf jQuery
     */
     jQuery.fn.cuentaCaracteres = function () {
        this.each(function () {
            elem = $(this);
            var temp = new String();
            var maxLength= new String();
            temp = elem.attr('maxLength');
            maxLength = elem.attr('maxLength');
            //if (typeof temp == 'undefined') { elem.attr('maxLength', '500'); }
            if (typeof temp == 'undefined') { elem.attr('maxLength', maxLength); }
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
})(jQuery);
/**
* Remueve clase errorControl
* @param {string} strIdDivMensaje Nombre (DIV) del formulario 
* @memberof validaciones
*/
function removeClase(strIdDivMensaje) {
    $("#" + strIdDivMensaje).removeClass('errorControl');
    $("#" + strIdDivMensaje).removeClass('correcto');
    $("#" + strIdDivMensaje).removeClass('verificar');
    $("#" + strIdDivMensaje).text('');
};

(function (jQuery) {
 /**
     * Valida solo el ingreso de letras
     * @function
     * @param {Object} options Parámetros.
     * @param {string} options.regex parametros a validar.
     * @memberOf jQuery
     */
    jQuery.fn.validarSoloLetras = function (options) {
        var defaults = {
            regex: "[a-zA-Z_ ]",
            //regex: ".*",
            live: false
        };
        var options = $.extend(defaults, options);
        var regex = new RegExp(options.regex);
        function filter_input_function(event) {
            var key = event.charCode ? event.charCode : event.keyCode ? event.keyCode : 0;
            if (key == 8 || key == 9 || key == 13 || key == 35 || key == 36 || key == 37 || key == 39 || key == 46) {

                if (event.charCode == 0 && event.keyCode == key) {
                    return true;
                }
            }
            var string = String.fromCharCode(key);
            if (regex.test(string)) {
                return true;
            } else if (typeof (options.feedback) == 'function') {
                options.feedback.call(this, string);
            }
            return false;
        }
        if (options.live) {
            $(this).live('keypress', filter_input_function);
        } else {
            return this.each(function () {
                var input = $(this);
                input.unbind('keypress').keypress(filter_input_function);
            });
        }
    };
})(jQuery);

(function (jQuery) {
       /**
         * Carga formato de horas en un spinner al controlador seleccionado
         * @function
         * @param {Object} objParametros Parámetros.
         * @param {number} objParametros.size Ancho.
         * @param {string} objParametros.max maximo numero del controlador.
         * @param {number} objParametros.min minimo numero del controlador.
         * @memberOf jQuery
         */
        jQuery.fn.cargarFormatoHora = function (objParametros) {
        var objDiv = $(this);
        var defaults = {
            size: "",
            max: "",
            min: "",
            setValue: function () { },
            getHours: function () { },
            getMinutes: function () { },
            getSeconds: function () { }
        };
        defaults = $.extend(defaults, objParametros);
        this.each(function () {
            var elem = $(this);
            if (elem.hasClass("horas")) {
                elem.attr('size', '1px');
                elem.spinner({
                    min: 0,
                    max: 23,
                    spin: function (event, ui) {
                        $(this).attr('hora', ui.value);
                    }
                });
            }
            else if (elem.hasClass("min")) {
                elem.attr('size', '1px');
                elem.spinner({
                    min: 0,
                    max: 59,
                    spin: function (event, ui) {
                        $(this).attr('min', ui.value);
                    }
                });
            }
        });
    };
})(jQuery);
/**
* Verifica si el e-mail ingresado es valido
* @param {Object} emailAddress Nombre (DIV) del formulario 
* @return {Boolean} emailAddress Retrona false si alguno de los campos obligatorios no se a ingresado
* @memberof validaciones
*/
function isValidEmailAddress(emailAddress) {
    //    var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
    var pattern = new RegExp(/[\w-\.]{3,}@([\w-]{2,}\.)*([\w-]{2,}\.)[\w-]{2,4}/);
    return pattern.test(emailAddress);
};
/**
* Verifica si el contenido del control es numero
* @param {Object} e Nombre del control
* @memberof validaciones
*/
function esNumero(e) {
    var keyCode = (window.event) ? window.event.keyCode : e.which ? e.charCode : 0;
    if ((keyCode > 57 || keyCode < 4) && keyCode != 46 && keyCode != 8 && keyCode != 43) {
        if (window.event)
            window.event.returnValue = false;       // IE
        else
            e.preventDefault();
    }
};
/**
* Verifica si el contenido del control es numero (NaN)
* @param {Object} e Nombre del control
* @memberof validaciones
*/
function fnValidateNumeric(value) {
    if (!isNaN(value)) {
        return true;
    } else {
        return false;
    };
};
/**
* Verifica el tipo de fecha ingresada con formato d/mm/yy
* @param {Object} e Nombre del control
* @return {Boolean} output
* @memberof validaciones
*/
function traerFechaJquery() {
    var d = new Date();
    var month = d.getMonth() + 1;
    var day = d.getDate();
    var output = (('' + day).length < 2 ? '0' : '') + day + '/' + (('' + month).length < 2 ? '0' : '') + month + '/' + d.getFullYear();
    return output
};

(function (jQuery) {
  /**
     * Verifica si el numero ingresado en el campo es solo numeros 
     * @function
     * @param {Object} cadena Parámetros.
     * @memberOf jQuery
     */
 jQuery.fn.validCampoSoloNumeros = function (cadena) {
        $(this).on({
            keypress: function (e) {
                var key = e.which,
    				keye = e.keyCode,
    				tecla = String.fromCharCode(key).toLowerCase(),
    				letras = cadena;
                if (letras.indexOf(tecla) == -1 && keye != 9 && (key == 37 || keye != 37) && (keye != 39 || key == 39) && keye != 8 && (keye != 46 || key == 46) || key == 161) {
                    e.preventDefault();
                }
            }
        });
    };
});

/**
* Verifica si los controles segun su tipo estan vacios
* @param {Object} strIdDiv Nombre (Div) del control
* @return {Boolean} boolPivot retorna true si los campos estan correctos
* @memberof validaciones
*/
function validaFiltrosNoVacios(strIdDiv) {
    var boolPivot = false;
    $("#" + strIdDiv).find(":input").each(function (index, element) {
        if (validaInputSegunTipo(element)) {
            boolPivot = true;
        };
    });
    return boolPivot;
};
/**
* Verifica si el tipo de RUC ingresado es el correcto
* @param {string} strNroDoc Nombre del control
* @param {string} lblMensaje Nombre del control (Label) del control
* @return {Boolean} bolResult retorna true si los campos estan correctos
* @memberof validaciones
*/
function fnValidaRuc(strNroDoc, lblMensaje) {
    var bolResult = new Boolean();
    var strMensaje = new String();

    if (strNroDoc.length <= 0) {
        strMensaje = "(*) Debe ingresar el RUC";
        bolResult = false;
    } else if (!$.isNumeric(strNroDoc)) {
        strMensaje = "(*) Debe ser númerico el RUC";
        bolResult = false;
    } else if (strNroDoc.length != 11) {
        strMensaje = "(*) Debe considerar 11 carácteres en el RUC";
        bolResult = false;
    } else if (strNroDoc.substring(0, 2) != 10 && strNroDoc.substring(0, 2) != 15 && strNroDoc.substring(0, 2) != 17 && strNroDoc.substring(0, 2) != 20) {
        strMensaje = "(*) Debe ingresar correctamente el RUC";
        bolResult = false;
    } else {
        bolResult = true;
    };
    if (bolResult) {
        return true;
    } else {
        if (lblMensaje) mensajeSistema(lblMensaje, 2, strMensaje);
        return false;
    };
};