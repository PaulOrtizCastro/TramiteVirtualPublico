function verifyCookie() {
    if (checkCookie(".UsuarioIntranetBorradorElect")) {
        setTimeout(function () {
            verifyCookie();
        }, 1000);
    }
};

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
};

function checkCookie(username) {
    var user = getCookie(username);
    if (user == "" || user == null) {
        if (typeof strRutaAplicacionMaster !== 'undefined') {
            try {
                bootbox.dialog({
                    message: "La sesión ha expirado.",
                    size: 'small',
                    closeButton: false,
                    buttons: {
                        ok: {
                            label: "Aceptar",
                            className: 'btn-primary',
                            callback: function () {
                                //var strRutaEjecutar = "";
                                var strRutaEjecutar = $('#divContenidoMaster', window.parent.document).find("iframe").attr("src");
                                //console.log(strRutaEjecutar);
                                if (typeof strRutaEjecutar !== "undefined") {
//                                    strRutaEjecutar = strRutaEjecutar;
                                } else {
                                    strRutaEjecutar = strRutaAplicacionMaster + "Index/LogoutSuccess";
                                }
                                //console.log(strRutaEjecutar);
                                location.assign(strRutaEjecutar);
                                //var ifframe = parent.document.getElementById("divContenidoMaster");

                                //console.log(parent.document.getElementById(window.name));
                                //location.assign(strRutaAplicacionMaster + "Index/LogoutSuccess");
                            }
                        }
                    }
                });
            } catch (ex) {
                //console.log("Error: " + ex.toString());
            };
        } 
        return false;
    };
    return true;
};
verifyCookie();