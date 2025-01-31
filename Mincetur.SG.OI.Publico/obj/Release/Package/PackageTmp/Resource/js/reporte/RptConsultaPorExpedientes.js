$(document).ready(function () {
    if ($("#hfCodForm").val() == "CE") {
        $("#btnBuscarTupa").click(function () {
            configuracionInicialConsExpe($("#tbConsuExpeVentanilla").val());
        });
    }

    if ($("#hfCodForm").val() == "CE") {
        $("#tbConsuExpeVentanilla").keypress(function (e) {
            if (e.which == 13) {
                $("#btnBuscarTupa").click();
            }
        });
        $("#CaptchaInputText").keypress(function (e) {
            if (e.which == 13) {
                $("#btnBuscarTupa").click();
            }
        });
    }
});

function configuracionInicialConsExpe(strIdConsExpe)
{
    strOprRegExpe = "R";
    //$("#lblCabeceraFeChaVisto").text($("#hfidFecVisto").val()) //25/11/2021
    cargarDatosConsExpe(strIdConsExpe);
};
function cargarDatosConsExpe(intIdExpe)
{        
    var objEnExpe = new Object();
    objEnExpe.TICKET = $("#tbConsuExpeVentanilla").val();
    objEnExpe.DATO = "CE";

    if (objEnExpe.TICKET == "") {
        BootstrapDialog.alert({
            title: 'Alerta de sistema',
            message: 'Ingrese expediente',
            //type: BootstrapDialog.TYPE_WARNING, 
            type: BootstrapDialog.TYPE_DANGER, 
            closable: true,
            draggable: true,
            buttonLabel: 'Aceptar'
        });
        return;
    };
    if (!$.isNumeric(objEnExpe.TICKET)) {
        BootstrapDialog.alert({
            title: 'Alerta de sistema',
            message: 'Formato de expediente inválido, solo se admite números',
            type: BootstrapDialog.TYPE_DANGER,
            closable: true,
            draggable: true,
            buttonLabel: 'Aceptar'
        });
        return;
    };

    if ($("#CaptchaInputText").val() == "") {
        BootstrapDialog.alert({
            title: 'Alerta de sistema',
            message: 'Ingrese captcha',
            type: BootstrapDialog.TYPE_WARNING,
            closable: true,
            draggable: true,
            buttonLabel: 'Aceptar'
        });
        return;
    }
    
    $.ajax({
        url: strRutaAplicacionMaster + 'Publico/Ventanilla/Captcha',
        type: 'POST',
        data: $("#FrmModalConsPorExpe").serialize(),   //datatype: 'JSON',
        async: true,
        success: function (response)
        {
            var Result = response;
            if (Result == "") {
                $("#tbConsuExpeVentanilla").val("");
                cargarContenidoEnDiv("Modal_ConsultaPorExpe", strRutaAplicacionMaster + "Publico/Ventanilla/consultaPublicaVentanilla?" + $.param(objEnExpe));
            } else {
                BootstrapDialog.alert({
                    title: 'Alerta de sistema',
                    message: 'Código captcha incorrecto',
                    type: BootstrapDialog.TYPE_WARNING,
                    closable: true,
                    draggable: true,
                    buttonLabel: 'Aceptar'
                });
                $("#divCaptcha").load(strRutaAplicacionMaster + "Publico/Ventanilla/callCaptcha");  
            }                     
        },
        fail: function (data)
        {
            
        },
        error: function failCallBk(XMLHttpRequest, textStatus, errorThrowb)
        {
            alert("An error occurred while processing your request. Please try again. -" + XMLHttpRequest + "-" + textStatus + "-" + errorThrowb);
        }
    });
};


