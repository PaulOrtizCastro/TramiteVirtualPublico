(function ($) {
    /**
    * Serializa los controles html a un objeto json según el atributo data-model
    * @memberof application
    */
    $.fn.toSerialize = function () {
        var obj = new Object();
        var traeValorInput = function (sender) {
            var pivot;
            var value = $.trim($(sender).val());
            var formatter = $(sender).data("formatter");
            if (noEsVacio(formatter)) {
                formatter = formatter.toLowerCase();
            }
            switch (formatter) {
                case "date":
                    if (value.indexOf("/") != -1 && traeFechaString(value, false)) {
                        pivot = traeFechaString(value, false);
                    }
                    break;
                case "int":
                    if ($.isNumeric(value)) {
                        pivot = parseInt(value);
                    }
                    break;
                case "decimal":
                    if ($.isNumeric(value)) {
                        pivot = parseFloat(value);
                    };
                    break;
                default:
                    pivot = value;
            }
            return pivot;
        }
        $(this).find(':input[data-model]').each(function () {
            //console.log(this);
            var type = this.type.toLowerCase();
            var rel = $(this).data("model");
            if (noEsVacio(rel)) {
                switch (type) {
                    case "radio":
                        if ($(this).is(':checked')) {
                            obj[rel] = traeValorInput(this);
                        }
                        break;
                    default:
                        if (noEsVacio($(this).val())) {
                            obj[rel] = traeValorInput(this);
                        };
                }
            };
        });
        //console.log(obj);
        return obj;
    };
})($);

(function ($) {
    $.fn.refrescarElementos = function () {
        var isChanged = false;
        var value = new String();
        $(this).find(':input').each(function () {
            value = $(this).data("value");
            if (noEsVacio(value)) {
                switch (this.type.toLowerCase()) {
                    case "text":
                        if (!noEsVacio($(this).val()) || $(this).val() != value) {
                            $(this).val(value);
                            isChanged = true;
                        }
                        break;
                    case "textarea":
                        if (!noEsVacio($(this).val()) || $(this).val() != value) {
                            $(this).val(value);
                            isChanged = true;
                        }
                        break;
                    case "hidden":
                        if (!noEsVacio($(this).val()) || $(this).val() != value) {
                            $(this).val(value);
                            isChanged = true;
                        }
                        break;
                    case "select-one":
                        if ((!noEsVacio($(this).val()) || $(this).val() != value) && $(this).findByValue(value)) {
                            $(this).val(value);
                            isChanged = true;
                        }
                        break;
                    case 'checkbox':
                        if ($(this).attr("value") == value && !$(this).is(":checked")) {
                            $(this).prop("checked", true);
                            isChanged = true;
                        } else if ($(this).attr("value") != value && $(this).is(":checked")) {
                            $(this).prop("checked", false);
                        };
                        break;
                    case "radio":
                        if ($(this).attr("value") == value && !$(this).is(":checked")) {
                            isChanged = true;
                            $(this).prop("checked", true);
                        };
                        break;
                }
            }
        });
        return isChanged;
    };
})($);

function replaceAll(value, oldValue, newValue) {
    //return value.replace(new RegExp(escapeRegExp(oldValue), 'g'), newValue);
    if (!noEsVacio(newValue)) newValue = new String();
    if (noEsVacio(value) && value.indexOf(oldValue) > -1) {
        value = value.split(oldValue).join(newValue);
    };
    return value;
}

var normalize = (function () {
    var from = "ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç",
        to = "AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuuNnCc",
        mapping = {};

    for (var i = 0, j = from.length; i < j; i++)
        mapping[from.charAt(i)] = to.charAt(i);

    return function (str) {
        var ret = [];
        for (var i = 0, j = str.length; i < j; i++) {
            var c = str.charAt(i);
            if (mapping.hasOwnProperty(str.charAt(i)))
                ret.push(mapping[c]);
            else
                ret.push(c);
        }
        return ret.join('').replace(/[^-A-Za-z0-9]+/g, '%').toUpperCase();
    }
})();

var substringMatcher = function (strs) {
    return function findMatches(q, cb) {
        var matches, substringRegex;

        // an array that will be populated with substring matches
        matches = [];

        // regex used to determine if a string contains the substring `q`
        substrRegex = new RegExp(q, 'i');

        // iterate through the pool of strings and for any string that
        // contains the substring `q`, add it to the `matches` array
        $.each(strs, function (i, str) {
            if (substrRegex.test(str)) {
                matches.push(str);
            }
        });
        cb(matches);
    };
};

function dataURLToBlob(dataURL) {
    var BASE64_MARKER = ';base64,';
    if (dataURL.indexOf(BASE64_MARKER) == -1) {
        var parts = dataURL.split(',');
        var contentType = parts[0].split(':')[1];
        var raw = parts[1];

        return new Blob([raw], { type: contentType });
    }
    else {
        var parts = dataURL.split(BASE64_MARKER);
        var contentType = parts[0].split(':')[1];
        var raw = window.atob(parts[1]);
        var rawLength = raw.length;

        var uInt8Array = new Uint8Array(rawLength);

        for (var i = 0; i < rawLength; ++i) {
            uInt8Array[i] = raw.charCodeAt(i);
        }

        return new Blob([uInt8Array], { type: contentType });
    }
}
$.fn.serializeObject = function () {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function () {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};

/*Carga una caja de texto con una lista de datos desplegable tipo autocomplete*/
function CargarTypeahead(data, strID, strNAME, strINPUTid, strHIDDENid, strOpc) {

    var data2 = [];
    if (strOpc == "1") {
        var arrName = strNAME.split("|");
    };

    for (var j = 0; j < data.length; j++) {
        if (strOpc == "1") {
            data2.push({ id: data[j][strID], name: data[j][arrName[0]] + " - " + data[j][arrName[1]] });
        } else {
            data2.push({ id: data[j][strID], name: data[j][strNAME] });
        }
    }

    $('#' + strINPUTid).typeahead("destroy");

    $('#' + strINPUTid).typeahead({
        source: data2,
        autoSelect: true,
        showHintOnFocus: true
    });

    $('#' + strINPUTid).change(function () {
        var current = $('#' + strINPUTid).typeahead("getActive");
        if (current) {

            if (current.name == $('#' + strINPUTid).val()) {
                $("#" + strHIDDENid).val(current.id);
            } else {
                $("#" + strHIDDENid).val("");
            }
        } else {
            $("#" + strHIDDENid).val("");
        }
    });

    $('#' + strINPUTid).keypress(function () {
        if ($(this).val().length > 2) {
            fnCargarAutocompletePersona($(this).val());
        }
    });
}

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
        constrainInput: defaults.constrainInput,
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

function removeDiacritics(str) {
    var defaultDiacriticsRemovalMap = [
    { 'base': 'A', 'letters': /[\u0041\u24B6\uFF21\u00C0\u00C1\u00C2\u1EA6\u1EA4\u1EAA\u1EA8\u00C3\u0100\u0102\u1EB0\u1EAE\u1EB4\u1EB2\u0226\u01E0\u00C4\u01DE\u1EA2\u00C5\u01FA\u01CD\u0200\u0202\u1EA0\u1EAC\u1EB6\u1E00\u0104\u023A\u2C6F]/g },
    { 'base': 'AA', 'letters': /[\uA732]/g },
    { 'base': 'AE', 'letters': /[\u00C6\u01FC\u01E2]/g },
    { 'base': 'AO', 'letters': /[\uA734]/g },
    { 'base': 'AU', 'letters': /[\uA736]/g },
    { 'base': 'AV', 'letters': /[\uA738\uA73A]/g },
    { 'base': 'AY', 'letters': /[\uA73C]/g },
    { 'base': 'B', 'letters': /[\u0042\u24B7\uFF22\u1E02\u1E04\u1E06\u0243\u0182\u0181]/g },
    { 'base': 'C', 'letters': /[\u0043\u24B8\uFF23\u0106\u0108\u010A\u010C\u00C7\u1E08\u0187\u023B\uA73E]/g },
    { 'base': 'D', 'letters': /[\u0044\u24B9\uFF24\u1E0A\u010E\u1E0C\u1E10\u1E12\u1E0E\u0110\u018B\u018A\u0189\uA779]/g },
    { 'base': 'DZ', 'letters': /[\u01F1\u01C4]/g },
    { 'base': 'Dz', 'letters': /[\u01F2\u01C5]/g },
    { 'base': 'E', 'letters': /[\u0045\u24BA\uFF25\u00C8\u00C9\u00CA\u1EC0\u1EBE\u1EC4\u1EC2\u1EBC\u0112\u1E14\u1E16\u0114\u0116\u00CB\u1EBA\u011A\u0204\u0206\u1EB8\u1EC6\u0228\u1E1C\u0118\u1E18\u1E1A\u0190\u018E]/g },
    { 'base': 'F', 'letters': /[\u0046\u24BB\uFF26\u1E1E\u0191\uA77B]/g },
    { 'base': 'G', 'letters': /[\u0047\u24BC\uFF27\u01F4\u011C\u1E20\u011E\u0120\u01E6\u0122\u01E4\u0193\uA7A0\uA77D\uA77E]/g },
    { 'base': 'H', 'letters': /[\u0048\u24BD\uFF28\u0124\u1E22\u1E26\u021E\u1E24\u1E28\u1E2A\u0126\u2C67\u2C75\uA78D]/g },
    { 'base': 'I', 'letters': /[\u0049\u24BE\uFF29\u00CC\u00CD\u00CE\u0128\u012A\u012C\u0130\u00CF\u1E2E\u1EC8\u01CF\u0208\u020A\u1ECA\u012E\u1E2C\u0197]/g },
    { 'base': 'J', 'letters': /[\u004A\u24BF\uFF2A\u0134\u0248]/g },
    { 'base': 'K', 'letters': /[\u004B\u24C0\uFF2B\u1E30\u01E8\u1E32\u0136\u1E34\u0198\u2C69\uA740\uA742\uA744\uA7A2]/g },
    { 'base': 'L', 'letters': /[\u004C\u24C1\uFF2C\u013F\u0139\u013D\u1E36\u1E38\u013B\u1E3C\u1E3A\u0141\u023D\u2C62\u2C60\uA748\uA746\uA780]/g },
    { 'base': 'LJ', 'letters': /[\u01C7]/g },
    { 'base': 'Lj', 'letters': /[\u01C8]/g },
    { 'base': 'M', 'letters': /[\u004D\u24C2\uFF2D\u1E3E\u1E40\u1E42\u2C6E\u019C]/g },
    { 'base': 'N', 'letters': /[\u004E\u24C3\uFF2E\u01F8\u0143\u00D1\u1E44\u0147\u1E46\u0145\u1E4A\u1E48\u0220\u019D\uA790\uA7A4]/g },
    { 'base': 'NJ', 'letters': /[\u01CA]/g },
    { 'base': 'Nj', 'letters': /[\u01CB]/g },
    { 'base': 'O', 'letters': /[\u004F\u24C4\uFF2F\u00D2\u00D3\u00D4\u1ED2\u1ED0\u1ED6\u1ED4\u00D5\u1E4C\u022C\u1E4E\u014C\u1E50\u1E52\u014E\u022E\u0230\u00D6\u022A\u1ECE\u0150\u01D1\u020C\u020E\u01A0\u1EDC\u1EDA\u1EE0\u1EDE\u1EE2\u1ECC\u1ED8\u01EA\u01EC\u00D8\u01FE\u0186\u019F\uA74A\uA74C]/g },
    { 'base': 'OI', 'letters': /[\u01A2]/g },
    { 'base': 'OO', 'letters': /[\uA74E]/g },
    { 'base': 'OU', 'letters': /[\u0222]/g },
    { 'base': 'P', 'letters': /[\u0050\u24C5\uFF30\u1E54\u1E56\u01A4\u2C63\uA750\uA752\uA754]/g },
    { 'base': 'Q', 'letters': /[\u0051\u24C6\uFF31\uA756\uA758\u024A]/g },
    { 'base': 'R', 'letters': /[\u0052\u24C7\uFF32\u0154\u1E58\u0158\u0210\u0212\u1E5A\u1E5C\u0156\u1E5E\u024C\u2C64\uA75A\uA7A6\uA782]/g },
    { 'base': 'S', 'letters': /[\u0053\u24C8\uFF33\u1E9E\u015A\u1E64\u015C\u1E60\u0160\u1E66\u1E62\u1E68\u0218\u015E\u2C7E\uA7A8\uA784]/g },
    { 'base': 'T', 'letters': /[\u0054\u24C9\uFF34\u1E6A\u0164\u1E6C\u021A\u0162\u1E70\u1E6E\u0166\u01AC\u01AE\u023E\uA786]/g },
    { 'base': 'TZ', 'letters': /[\uA728]/g },
    { 'base': 'U', 'letters': /[\u0055\u24CA\uFF35\u00D9\u00DA\u00DB\u0168\u1E78\u016A\u1E7A\u016C\u00DC\u01DB\u01D7\u01D5\u01D9\u1EE6\u016E\u0170\u01D3\u0214\u0216\u01AF\u1EEA\u1EE8\u1EEE\u1EEC\u1EF0\u1EE4\u1E72\u0172\u1E76\u1E74\u0244]/g },
    { 'base': 'V', 'letters': /[\u0056\u24CB\uFF36\u1E7C\u1E7E\u01B2\uA75E\u0245]/g },
    { 'base': 'VY', 'letters': /[\uA760]/g },
    { 'base': 'W', 'letters': /[\u0057\u24CC\uFF37\u1E80\u1E82\u0174\u1E86\u1E84\u1E88\u2C72]/g },
    { 'base': 'X', 'letters': /[\u0058\u24CD\uFF38\u1E8A\u1E8C]/g },
    { 'base': 'Y', 'letters': /[\u0059\u24CE\uFF39\u1EF2\u00DD\u0176\u1EF8\u0232\u1E8E\u0178\u1EF6\u1EF4\u01B3\u024E\u1EFE]/g },
    { 'base': 'Z', 'letters': /[\u005A\u24CF\uFF3A\u0179\u1E90\u017B\u017D\u1E92\u1E94\u01B5\u0224\u2C7F\u2C6B\uA762]/g },
    { 'base': 'a', 'letters': /[\u0061\u24D0\uFF41\u1E9A\u00E0\u00E1\u00E2\u1EA7\u1EA5\u1EAB\u1EA9\u00E3\u0101\u0103\u1EB1\u1EAF\u1EB5\u1EB3\u0227\u01E1\u00E4\u01DF\u1EA3\u00E5\u01FB\u01CE\u0201\u0203\u1EA1\u1EAD\u1EB7\u1E01\u0105\u2C65\u0250]/g },
    { 'base': 'aa', 'letters': /[\uA733]/g },
    { 'base': 'ae', 'letters': /[\u00E6\u01FD\u01E3]/g },
    { 'base': 'ao', 'letters': /[\uA735]/g },
    { 'base': 'au', 'letters': /[\uA737]/g },
    { 'base': 'av', 'letters': /[\uA739\uA73B]/g },
    { 'base': 'ay', 'letters': /[\uA73D]/g },
    { 'base': 'b', 'letters': /[\u0062\u24D1\uFF42\u1E03\u1E05\u1E07\u0180\u0183\u0253]/g },
    { 'base': 'c', 'letters': /[\u0063\u24D2\uFF43\u0107\u0109\u010B\u010D\u00E7\u1E09\u0188\u023C\uA73F\u2184]/g },
    { 'base': 'd', 'letters': /[\u0064\u24D3\uFF44\u1E0B\u010F\u1E0D\u1E11\u1E13\u1E0F\u0111\u018C\u0256\u0257\uA77A]/g },
    { 'base': 'dz', 'letters': /[\u01F3\u01C6]/g },
    { 'base': 'e', 'letters': /[\u0065\u24D4\uFF45\u00E8\u00E9\u00EA\u1EC1\u1EBF\u1EC5\u1EC3\u1EBD\u0113\u1E15\u1E17\u0115\u0117\u00EB\u1EBB\u011B\u0205\u0207\u1EB9\u1EC7\u0229\u1E1D\u0119\u1E19\u1E1B\u0247\u025B\u01DD]/g },
    { 'base': 'f', 'letters': /[\u0066\u24D5\uFF46\u1E1F\u0192\uA77C]/g },
    { 'base': 'g', 'letters': /[\u0067\u24D6\uFF47\u01F5\u011D\u1E21\u011F\u0121\u01E7\u0123\u01E5\u0260\uA7A1\u1D79\uA77F]/g },
    { 'base': 'h', 'letters': /[\u0068\u24D7\uFF48\u0125\u1E23\u1E27\u021F\u1E25\u1E29\u1E2B\u1E96\u0127\u2C68\u2C76\u0265]/g },
    { 'base': 'hv', 'letters': /[\u0195]/g },
    { 'base': 'i', 'letters': /[\u0069\u24D8\uFF49\u00EC\u00ED\u00EE\u0129\u012B\u012D\u00EF\u1E2F\u1EC9\u01D0\u0209\u020B\u1ECB\u012F\u1E2D\u0268\u0131]/g },
    { 'base': 'j', 'letters': /[\u006A\u24D9\uFF4A\u0135\u01F0\u0249]/g },
    { 'base': 'k', 'letters': /[\u006B\u24DA\uFF4B\u1E31\u01E9\u1E33\u0137\u1E35\u0199\u2C6A\uA741\uA743\uA745\uA7A3]/g },
    { 'base': 'l', 'letters': /[\u006C\u24DB\uFF4C\u0140\u013A\u013E\u1E37\u1E39\u013C\u1E3D\u1E3B\u017F\u0142\u019A\u026B\u2C61\uA749\uA781\uA747]/g },
    { 'base': 'lj', 'letters': /[\u01C9]/g },
    { 'base': 'm', 'letters': /[\u006D\u24DC\uFF4D\u1E3F\u1E41\u1E43\u0271\u026F]/g },
    { 'base': 'n', 'letters': /[\u006E\u24DD\uFF4E\u01F9\u0144\u00F1\u1E45\u0148\u1E47\u0146\u1E4B\u1E49\u019E\u0272\u0149\uA791\uA7A5]/g },
    { 'base': 'nj', 'letters': /[\u01CC]/g },
    { 'base': 'o', 'letters': /[\u006F\u24DE\uFF4F\u00F2\u00F3\u00F4\u1ED3\u1ED1\u1ED7\u1ED5\u00F5\u1E4D\u022D\u1E4F\u014D\u1E51\u1E53\u014F\u022F\u0231\u00F6\u022B\u1ECF\u0151\u01D2\u020D\u020F\u01A1\u1EDD\u1EDB\u1EE1\u1EDF\u1EE3\u1ECD\u1ED9\u01EB\u01ED\u00F8\u01FF\u0254\uA74B\uA74D\u0275]/g },
    { 'base': 'oi', 'letters': /[\u01A3]/g },
    { 'base': 'ou', 'letters': /[\u0223]/g },
    { 'base': 'oo', 'letters': /[\uA74F]/g },
    { 'base': 'p', 'letters': /[\u0070\u24DF\uFF50\u1E55\u1E57\u01A5\u1D7D\uA751\uA753\uA755]/g },
    { 'base': 'q', 'letters': /[\u0071\u24E0\uFF51\u024B\uA757\uA759]/g },
    { 'base': 'r', 'letters': /[\u0072\u24E1\uFF52\u0155\u1E59\u0159\u0211\u0213\u1E5B\u1E5D\u0157\u1E5F\u024D\u027D\uA75B\uA7A7\uA783]/g },
    { 'base': 's', 'letters': /[\u0073\u24E2\uFF53\u00DF\u015B\u1E65\u015D\u1E61\u0161\u1E67\u1E63\u1E69\u0219\u015F\u023F\uA7A9\uA785\u1E9B]/g },
    { 'base': 't', 'letters': /[\u0074\u24E3\uFF54\u1E6B\u1E97\u0165\u1E6D\u021B\u0163\u1E71\u1E6F\u0167\u01AD\u0288\u2C66\uA787]/g },
    { 'base': 'tz', 'letters': /[\uA729]/g },
    { 'base': 'u', 'letters': /[\u0075\u24E4\uFF55\u00F9\u00FA\u00FB\u0169\u1E79\u016B\u1E7B\u016D\u00FC\u01DC\u01D8\u01D6\u01DA\u1EE7\u016F\u0171\u01D4\u0215\u0217\u01B0\u1EEB\u1EE9\u1EEF\u1EED\u1EF1\u1EE5\u1E73\u0173\u1E77\u1E75\u0289]/g },
    { 'base': 'v', 'letters': /[\u0076\u24E5\uFF56\u1E7D\u1E7F\u028B\uA75F\u028C]/g },
    { 'base': 'vy', 'letters': /[\uA761]/g },
    { 'base': 'w', 'letters': /[\u0077\u24E6\uFF57\u1E81\u1E83\u0175\u1E87\u1E85\u1E98\u1E89\u2C73]/g },
    { 'base': 'x', 'letters': /[\u0078\u24E7\uFF58\u1E8B\u1E8D]/g },
    { 'base': 'y', 'letters': /[\u0079\u24E8\uFF59\u1EF3\u00FD\u0177\u1EF9\u0233\u1E8F\u00FF\u1EF7\u1E99\u1EF5\u01B4\u024F\u1EFF]/g },
    { 'base': 'z', 'letters': /[\u007A\u24E9\uFF5A\u017A\u1E91\u017C\u017E\u1E93\u1E95\u01B6\u0225\u0240\u2C6C\uA763]/g }
  ];

    for (var i = 0; i < defaultDiacriticsRemovalMap.length; i++) {
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



(function (jQuery) {
    jQuery.fn.verEnDiv = function (objParametros) {
        var defaults = {
            Dni: "",
            ApePat: "",
            ApeMat: "",
            Nombres: "",
            Direccion: "",
            EstadoCivil: "",
            Foto: "",
            Restriccion: "",
            Ubigeo: "",
            DesInpeAJudiciales: "",
            DesPjAPenales: "",
            InputHidden: ""
        };
        defaults = $.extend(defaults, objParametros);
        
        var strHtml = "<table border='0' style='background-color: white; width: 100%'><tbody>";
        strHtml +=  "<tr><th colspan='2' style='text-align: center'>Plataforma de Interoperabilidad del Estado</th></tr>";
        strHtml +=  "<tr style='height: 15px;'></tr>";
        strHtml +=  "<tr>";
        strHtml +=  "<td rowspan='6' style='text-align: center;padding-bottom: 2px;' >";
        strHtml +=  "<img src='" + defaults.Foto + "' style='width:160px; height: 224px; vertical-align: bottom' /></td>";
        strHtml +=  "<td>&nbsp;";
        strHtml +=  "<b>DNI: </b>" + defaults.Dni + "</td>";
        strHtml +=  "</tr>";   
        strHtml +=  "<tr>";
        strHtml +=  "<td>&nbsp;";
        strHtml +=  "<b>Apellido Paterno: </b>" + defaults.ApePat + "</td>";
        strHtml +=  "</tr>";  
        strHtml +=  "<tr>";
        strHtml +=  "<td>&nbsp;";
        strHtml +=  "<b>Apellido Materno: </b>" + defaults.ApeMat + "</td>";
        strHtml +=  "</tr>";   
        strHtml +=  "<tr>";
        strHtml +=  "<td>&nbsp;";
        strHtml +=  "<b>Nombres: </b>" + defaults.Nombres + "</td>";
        strHtml +=  "</tr>"; 
        strHtml +=  "<tr>";
        strHtml +=  "<td>&nbsp;";
        strHtml +=  "<b>Estado Civil: </b>" + defaults.EstadoCivil + "</td>";
        strHtml +=  "</tr>";   
        strHtml +=  "<tr>";
        strHtml +=  "<td>&nbsp;";
        strHtml +=  "<b>Dirección: </b>" + defaults.Direccion + "</td>";
        strHtml +=  "</tr>";      
        strHtml +=  "<tr style='height: 37px;'>";
        strHtml +=  "<td colspan='2'>&nbsp;";
        strHtml +=  "<b>Ubigeo: </b>" + defaults.Ubigeo.replace(/\ /g, "&nbsp;") + "</td>";
        strHtml +=  "</tr>";
        strHtml +=  "<tr style='height: 37px;'>";
        strHtml +=  "<td colspan='2'>&nbsp;";
        strHtml +=  "<b>Restricción: </b>" + defaults.Restriccion + "</td>";
        strHtml +=  "</tr>";    
        strHtml +=  "<tr style='height: 37px;'>";
        strHtml +=  "<td colspan='2'>&nbsp;";
        strHtml +=  "<b>Antecedentes Judiciales: </b>" + defaults.DesInpeAJudiciales + "</td>";
        strHtml +=  "</tr>";    
        strHtml +=  "<tr style='height: 37px;'>";
        strHtml +=  "<td colspan='2'>&nbsp;";
        strHtml +=  "<b>Antecedentes Penales: </b>" + defaults.DesPjAPenales + "</td>";
        strHtml +=  "</tr>";               
        strHtml +=  "</tbody>";
        strHtml +=  "</table>";  

        $("#" + defaults.InputHidden).val(strHtml);
        $(this).html(strHtml);
    };
})(jQuery);

$(document).ajaxStart(function () {
    $(".loading").show();
}).ajaxStop(function () {
    $(".loading").hide();
});

//Por ahora esta especificamente para los 4 servicios PIDE
function cargarGraficoConsumosServiciosPIDE(data, div) {
    var lstCat = ["Reniec", "Inpe", "PJ", "Migraciones"];
    var lstCatValue = new Array();
    var strJSON = null;
    for (var i = 0; i < data.length; i++) {
        lstCatValue = lstCatValue + "{\"name\":\"" + lstCat[i] + "\",\"y\":" + data[i].CANTIDAD + "},";
    };
    lstCatValue = lstCatValue.substr(0, lstCatValue.length-1);
    lstCatValue = "[" +  lstCatValue + "]";
    strJSON = JSON.parse(lstCatValue);

    var chart = null;
    chart = Highcharts.chart(div, {
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
    },
    title: {
        text: 'Accesos 2018'
    },
    subtitle: {
        text: 'Servicios PIDE'
    },
    tooltip: {
        format: '<b>{series.name}</b>: {point.y:.1f} Rs.',
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: false
            },
            showInLegend: true
        }
    },
    credits: {
        enabled: false
    },
    series: [{
       	name: 'N° de accesos',
        colorByPoint: true,
        data: strJSON
    }]
});
}

function traeDesDoc(strIdDoc){
    var strDesDoc = "";
    switch (strIdDoc) {
        case "1":
            strDesDoc = "Doc. Nacional de Identidad";
            break;
        case "2":
            strDesDoc = "Carnet de Extranjeria";
            break;
        default:
            strDesDoc = "N° ";
    }
    return strDesDoc;
}

function valruc(valor){
	if ( valor.length == 11 ){
		suma = 0
		x = 6
		for (i=0; i<valor.length-1;i++){
			if ( i == 4 ) x = 8
			digito = valor.charAt(i) - '0';
			x--
			if ( i==0 ) suma += (digito*x)
			else suma += (digito*x)
		}
		resto = suma % 11;
		resto = 11 - resto;
		if ( resto >= 10) resto = resto - 10;
		if ( resto == valor.charAt( valor.length-1 ) - '0' ){
			return true
		}
    }
	return false
} 

function bytesToSize(bytes,decimals) {
   if(bytes == 0) return '0 Bytes';
   var k = 1024,
       dm = decimals <= 0 ? 0 : decimals || 2,
       sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
       i = Math.floor(Math.log(bytes) / Math.log(k));
   return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

function jqGridResponsive(jqgrid) {
    jqgrid.find('.ui-jqgrid').addClass('clear-margin span12').css('width', '');
    jqgrid.find('.ui-jqgrid-view').addClass('clear-margin span12').css('width', '');
    jqgrid.find('.ui-jqgrid-view > div').eq(1).addClass('clear-margin span12').css('width', '').css('min-height', '0');
    jqgrid.find('.ui-jqgrid-view > div').eq(2).addClass('clear-margin span12').css('width', '').css('min-height', '0');
    jqgrid.find('.ui-jqgrid-sdiv').addClass('clear-margin span12').css('width', '');
    jqgrid.find('.ui-jqgrid-pager').addClass('clear-margin span12').css('width', '');
}

function setLoading() {
    var path_img = strRutaAplicacionMaster + "resource/img/ajax-loader.gif";
    $.blockUI({ 
        message: '<h4>Espere... <img src=' + path_img + ' /></h4>',
        baseZ: 9999999
    });
};

function setUnloading() {
    $.unblockUI();
};

$(document).ajaxStart(function () {
    setLoading();
}).ajaxStop(function () {
    setUnloading();
});

function obtenerIndexArray(lst, obj, valor) {
    var intIndex = -1;
    for (var i = 0; i < lst.length; i++) {
        if (lst[i][valor] == obj[valor]) {
            //console.log(lst.index);
            //intIndex = lst.index;
            intIndex = i;
            /*console.log("break");*/
            break;
        }
        /*console.log(i);*/
    }
    return intIndex;
};

function fnValidarAdjunto(file) {
    var arrExt = (lstExtPermitidasAdjuntosBorradorDig != null) ? lstExtPermitidasAdjuntosBorradorDig.split(',') : null;
    TamMaxPorArchivo = (MaxSizeByFileBorradorDocDig == null ? 0 : MaxSizeByFileBorradorDocDig);

    if (file != null) {
        name = file.name;
        size = file.size;
        type = file.type;
        ext = file.name.substr(file.name.lastIndexOf('.') + 1).toLowerCase();

        var validaExt = 0;
        if (arrExt.length > 0){
            for (var i = 0; i < arrExt.length; i++) {
                if (ext.toUpperCase() == arrExt[i].toUpperCase()) {
                    validaExt = 1;
                }
            };
        };

        //Valida tamaño total
        if ((ActualSizeFilesBorradorDocDig + size) > MaxSizeAllFilesBorradorDocDig) {
            $("input:file[data-id='fileArchivo']").val("");
            bootbox.alert({
                message: "El tamaño máximo de los anexos no debe superar los " + bytesToSize(MaxSizeAllFilesBorradorDocDig),
                size: 'small'
            });
            return false;
        }
        //Valida extensión del archivo
        else if (validaExt == 0) {
            $("input:file[data-id='fileArchivo']").val("");
            bootbox.alert({
                message: "El formato del archivo que se intenta adjuntar no está permitido",
                size: 'small'
            });
            return false;
        } else if (size > TamMaxPorArchivo && TamMaxPorArchivo != 0) {
            $("input:file[data-id='fileArchivo']").val("");
            bootbox.alert({
                message: "El tamaño del archivo no debe superar los " + bytesToSize(TamMaxPorArchivo),
                size: 'small'
            });
            return false;
        } else {
            return true;
        }
    };
};

function fnEsWord(file) {
    var boolValida = false;
    if (file != null) {
        var extension = file.name.substr(file.name.lastIndexOf('.') + 1).toLowerCase();

        if (extension.toUpperCase() == "DOCX" || extension.toUpperCase() == "DOC" || extension.toUpperCase() == "DOTX") {
            boolValida = true;
        }
    }

    return boolValida;
}

function fnReemplazaCaracterHTML(cadHtml){
    var strResult = "";
    if(cadHtml != ""){
        var parser = new DOMParser;
        var dom = parser.parseFromString(cadHtml,'text/html');
        strResult = dom.body.textContent;
    }
    return strResult; 
}

function notificacionSistema(objParametros) {
    var defaults = {
        intOpcion: null,
        titulo: "Mensaje",
        strClaseStack: "stack-bottomright",
        stack: stack_bottomright,
        strMensaje: "",
        strClase: "glyphicon glyphicon-info-sign",
        callback: function () { }
    };
    defaults = $.extend(defaults, objParametros);
//    var stack_bottomright = {
//        "addpos2": 0,
//        "animation": true,
//        "dir1": "up",
//        "dir2": "left",
//        "firstpos1": 25,
//        "firstpos2": 25,
//        "nextpos1": 25,
//        "nextpos2": 25
//    };  
    //if (defaults.stack.length == 0) defaults.stack = stack_bottomright;
    //defaults.stack = stack_bottomright;
    var opts = {
        title: defaults.titulo,
        text: defaults.strMensaje,
        addclass: defaults.strClaseStack,
        stack: defaults.stack,
        icon: defaults.strClase,
        styling: 'bootstrap3',
        desktop: {
            desktop: true
        },
        buttons: {
            sticker: false,
            closer: true
        },
        //confirm: {
        //  confirm: true
        //},    
        history: {
          history: false
        }
    };
    switch (defaults.intOpcion) {
        case 0:
            opts.title = "Éxito";
            opts.icon = "glyphicon glyphicon-ok-sign",
            opts.type = "success";
            break;
        case 1:
            opts.title = "Advertencia";
            opts.icon = "glyphicon glyphicon-exclamation-sign",
            opts.type = "notice";
            break;
        case 2:
            opts.title = "Error";
            opts.icon = "glyphicon glyphicon-warning-sign",
            opts.type = "error";
            break;
        default:
            opts.title = defaults.titulo;
            opts.type = "info";
            break;
    };    
    new PNotify(opts).get().on('pnotify.confirm', function () {
        defaults.callback(true);
    }).on('pnotify.cancel', function () {
        defaults.callback(false);
    });
};

//Stacks para el PNOTIFY
var stack_topleft = {
        "addpos2": 0,
        "animation": true,
        "dir1": "down",
        "dir2": "left",
        "firstpos1": 36,
        "firstpos2": 25,
        "nextpos1": 36,
        "nextpos2": 25
    };

var stack_bottomright = {
        "addpos2": 0,
        "animation": true,
        "dir1": "up",
        "dir2": "left",
        "firstpos1": 25,
        "firstpos2": 25,
        "nextpos1": 25,
        "nextpos2": 25
    }; 


(function ($) {
    $.fn.cargaPopOverConfirm = function (objParametros) {
        var defaults = {
            //width: "auto",
            titulo: "Alerta de confirmación",
            mensaje: "",
            //fontSize: "11px",
            posicion: "top",
            opcion: "2", //1:Error 2:Advertencia  0:Pregunta
            //modal: true,
            //resizable: false,
            strIdDiv: "",
            valorInicial: false,
            callBack: function () { },
            strCallback: ""
        };
        
        defaults = $.extend(defaults, objParametros);
        var objDiv = $(this);
        var strNameDiv = objDiv.attr("id");
        //objDiv.attr("title", defaults.titulo);
        if (noEsVacio(strNameDiv)) {
            strNameDiv = "#" + strNameDiv;
        } else {
            strNameDiv = ".buttonOpConfirm,.btnAnularBorrador";
        };
       // strNameDiv = JSON.stringify(objDiv);
        var strIconMensaje = "";
        switch(defaults.opcion){
            case '1':
                strIconMensaje = "<i class='fa fa-times fa-3x'></i>";
                break;
            case '2':
                strIconMensaje = "<i class='fa fa-exclamation-circle fa-2x' style='color:#337ab7'></i>";
                break;
            case '0':
                strIconMensaje = "<i class='fa fa-exclamation-triangle fa-2x' style='color:#337ab7'></i>";
                break;
            default:
                strIconMensaje = "<i class='fa fa-question-circle fa-2x'></i>";
                break;
        }
        var strHtmlConfirm = "";
        strHtmlConfirm += "<div class='row'>";
        strHtmlConfirm += "<div class='col-sm-1'>";
        strHtmlConfirm += strIconMensaje;
        strHtmlConfirm += "</div>";
        strHtmlConfirm += "<div class='col-sm-10'>";
        strHtmlConfirm += defaults.mensaje;
        strHtmlConfirm += "</div>";
        strHtmlConfirm += "</div>";
//        strHtmlConfirm += "<div class='row'>";
//        strHtmlConfirm += "<div class='col-sm-6' style='padding-right:5px;'>";
////        strHtmlConfirm += "<button class='btn btn-primary popover-cancel' style='float:right;' onclick='$(\"" + strNameDiv + "\").popover(\"hide\");'><i class='fa fa-check'></i> Aceptar</button>";
//        strHtmlConfirm += "<button class='btn btn-primary popover-cancel' style='float:right;'><i class='fa fa-check'></i> Aceptar</button>";
//        strHtmlConfirm += "</div>";
//        strHtmlConfirm += "<div class='col-sm-6' style='padding-left:5px;'>";
////        strHtmlConfirm += "<button class='btn btn-default popover-submit' style='float:left;' onclick='$(\"" + strNameDiv + "\").popover(\"hide\");'><i class='fa fa-times'></i> Cancelar</button>";
//        strHtmlConfirm += "<button class='btn btn-default popover-submit' style='float:left;'><i class='fa fa-times'></i> Cancelar</button>";
//        strHtmlConfirm += "</div>";
//        strHtmlConfirm += "</div>";
        //if(noEsVacio(defaults.mensaje))
        var strTitulo = objDiv.attr("title");
        var strCloseEvntPopOver = "$('" + strNameDiv + "').popover('hide')";
        //var strCloseEvntPopOver = strNameDiv.replace(/\"/g,"'") + ".popover('hide')";
        //console.log(objDiv.data("callback").replace(/\"/g,"'"));
        objDiv.attr("title", defaults.titulo).popover({
            html: true, 
            //title: defaults.titulo,
            container: defaults.strIdDiv,
            placement: defaults.posicion,
	        content: function() {
                  return strHtmlConfirm;
                },
            template: '<div class="popover"><div class="arrow"></div>' +
                      '<h3 class="popover-title">' + defaults.titulo + '</h3>'+
                      '<div class="popover-content"></div>'+
                      '<div class="popover-footer">'+
                      '<div class="form-group row">' +
                      '<div class="col-sm-6" style="padding-right:5px;">'+
//                      '<button type="button" class="btn btn-primary popover-submit" style="float:right;" onclick="' + objDiv.data("callback") + ';' + strCloseEvntPopOver + ';"><i class="icon-ok icon-white"></i> Aceptar</button>&nbsp;' +
                      '<button type="button" class="btn btn-primary popover-submit" style="float:right;" onclick="' + objDiv.data("callback").replace(/\"/g,"'") + ';' + strCloseEvntPopOver + ';"><i class="icon-ok icon-white"></i> Aceptar</button>&nbsp;' +
                      '</div>'+
                      '<div class="col-sm-6" style="padding-left:5px;">'+
                      '<button type="button" class="btn btn-default popover-cancel" style="float:left;" onclick="' + strCloseEvntPopOver + ';"><i class="icon-remove"></i> Cancelar</button></div>' +
                      '</div>' +
                      '</div>' +
                      '</div>'
        }).attr("title", strTitulo);
//        console.log(defaults.strIdDiv);
        $(defaults.strIdDiv).on('hidden.bs.popover', function (e) {
            $(e.target).data("bs.popover").inState.click = false;
        });
//        if (noEsVacio(defaults.strOpcion)) {
//            var iconMsg = new String();
//            defaults.mensaje = "<span>" + defaults.mensaje + "</span>";
//            if (defaults.strOpcion == "1") {
//                iconMsg = "<p><span class='ui-icon ui-icon-alert' style='float: left; margin-right: .3em'></span>" + defaults.mensaje + "</p>";
//                defaults.mensaje = "<div class='ui-state-error ui-corner-all' style='padding: 0 .7em'>" + iconMsg + "</div>";
//            } else if (defaults.strOpcion == "2") {
//                iconMsg = "<p><span class='ui-icon ui-icon-info' style='float: left; margin-right: .3em'></span>" + defaults.mensaje + "</p>";
//                defaults.mensaje = "<div class='ui-corner-all' style='padding: 0 .7em'>" + iconMsg + "</div>"; /*ui-state-highlight*/
//            };
//            defaults.mensaje = "<div class='ui-widget'>" + defaults.mensaje + "<div>";
//        };
//        objDiv.empty().removeAttr("class").html(defaults.mensaje).addClass("formularioModal");
//        objDiv.dialog({
//            autoOpen: true,
//            modal: defaults.modal,
//            height: "auto",
//            minHeight: "auto",
//            width: defaults.width,
//            draggable: defaults.draggable,
//            resizable: defaults.resizable,
//            closeOnEscape: true,
//            title: defaults.titulo,
//            autoResize: true,
//            open: function (event, ui) {
//                var objDivTitle = $(this).closest(".ui-dialog");
//                if (!noEsVacio(defaults.titulo)) {
//                    objDivTitle.find(".ui-dialog-titlebar").hide();
//                };
//                objDivTitle.find(".ui-dialog-titlebar-close").remove();
//                $("button", objDivTitle).css({
//                    fontSize: defaults.fontSize
//                });
//            },
//            buttons: {
//                "Aceptar": function () {
//                    //defaults.valorInicial = !defaults.valorInicial;
//                    defaults.valorInicial = true;
//                    $(this).empty().dialog("close");
//                },
//                "Cancelar": function () {
//                    $(this).empty().dialog("close");
//                }
//            },
//            close: function (event, ui) {
//                defaults.callBack(defaults.valorInicial);
//                $(this).empty().dialog("destroy");
//            }
//        });
        //objDiv.dialog("open");
    };
})(jQuery);

//function closePopOver(){
//    
//}


//(function ($) {
//    $.fn.configuraPopOverConfirm = function (objParametros) {
//        var defaults = {
//            //width: "auto",
//            titulo: "Alerta de confirmación",
//            mensaje: "",
//            //fontSize: "11px",
//            posicion: "right",
//            opcion: "2", //1:Error 2:Advertencia  0:Pregunta
//            //modal: true,
//            //resizable: false,
//            strIdDiv: "#divContenidoMaster",
//            valorInicial: false,
//            callBack: function () { }
//        };
//        defaults = $.extend(defaults, objParametros);
//        console.log(defaults);
//        var objDiv = $(this);
//        objDiv.click(function (e) {
//            console.log(e);
//        });
//    };
//})(jQuery);

function jsonEscape(str)  {
    return str.replace(/\n/g, "\\\\n").replace(/\r/g, "\\\\r").replace(/\t/g, "\\\\t");
}

function toTitleCase(str) {
    if(noEsVacio(str)){
        return str.replace(
            /\w\S*/g,
            function(txt) {
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            }
        );
    } else {
        return "";
    }
}

function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

function cargaPopUpAlert(objParametros) {
    var defaults = {
        size: "small",
        titulo: "Alerta de notificaci\u00F3n",
        //estilo: false,
        fontSize: "12px",
        mensaje: "",
        //modal: true,
        strOpcion: "", //0:Éxito; 1:Error; 2:Advertencia;
        //resizable: false,
        closeButton: false,
        draggable: true,
        backdrop: false,
        callBack: function () { }
    };

    defaults = $.extend(defaults, objParametros);
    var strIcoTitle = "";
    var strCuerpo = "";
    var strClassTitle = "";
    if (noEsVacio(defaults.strOpcion)) {
        if (defaults.strOpcion == "0") {
            strClassTitle = "bg-success";
            strIcoTitle = "fa fa-check-circle";
        } else if (defaults.strOpcion == "1") {
            strClassTitle = "bg-danger";
            strIcoTitle = "fa fa-times";
        } else if (defaults.strOpcion == "2") {
            strClassTitle = "bg-warning";
            strIcoTitle = "fa fa-exclamation-triangle";
        }
    } else {
        strClassTitle = "bg-info";
        strIcoTitle = "fa fa-exclamation-circle";
    }

    defaults.titulo = "<i class='" + strIcoTitle + "'></i>&nbsp;" + defaults.titulo;
    defaults.mensaje = "<span style='font-size:" + defaults.fontSize + ";text-align:justify;'>" + defaults.mensaje + "</span>";
    var dialog = bootbox.dialog({
        title: defaults.titulo,
        message: defaults.mensaje,
        size: defaults.size,
        backdrop: defaults.backdrop,
        closeButton: defaults.closeButton,
        buttons: {
            ok: {
                label: "Aceptar",
                className: '',
                callback: function(){
                    defaults.callBack();
                }
            }
        }
    });

    dialog.init(function () {
        dialog.find(".modal-header").addClass(strClassTitle);
        if (defaults.draggable) {
            dialog.find(".modal-dialog").draggable({
                handle: ".modal-header"
            });
        }
    });       
};

function searchValueInArray(nameKey, prop, myArray){
    for (var i=0; i < myArray.length; i++) {
        if (myArray[i][prop].toString() == nameKey.toString()) {
            return true;
        }
    }
    return false;
}

// Restricts input for the given textbox to the given inputFilter.
function setInputFilter(textbox, inputFilter) {
  ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"].forEach(function(event) {
    textbox.on(event, function() {
      if (inputFilter(this.value)) {
        this.oldValue = this.value;
        this.oldSelectionStart = this.selectionStart;
        this.oldSelectionEnd = this.selectionEnd;
      } else if (this.hasOwnProperty("oldValue")) {
        this.value = this.oldValue;
        this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
      }
    });
  });
}

function fnAbrirIcoLoadingButton(strIdButton){
    $("#" + strIdButton + " span[data-name='iconLoadingButton']").show();
    $("#" + strIdButton + " span[data-name='textButton']").hide();
}

function fnCerrarIcoLoadingButton(strIdButton){
    $("#" + strIdButton + " span[data-name='iconLoadingButton']").hide();
    $("#" + strIdButton + " span[data-name='textButton']").show();
}
function fn_CerrarDocumento() {
    $("#seccionModal").html('');
    $('#contenedor').modal('hide');
}