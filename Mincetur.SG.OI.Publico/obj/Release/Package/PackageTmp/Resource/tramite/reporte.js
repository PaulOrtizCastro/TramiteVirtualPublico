function fnPrintRegExpediente(strHtmlExpediente, strHtmlMovimiento, strTitle) {
    strHtmlExpediente = strHtmlExpediente.replace(/\"/g, "'");
    strHtmlMovimiento = strHtmlMovimiento.replace(/\"/g, "'");
    var divContents = strHtmlExpediente;
    var divContents2 = strHtmlMovimiento;
    var printWindow = window.open('', '_blank', '', '');
    printWindow.document.write('<html><head><title>' + strTitle + '</title><meta http-equiv="Content-Type" content="text/html; charset=utf-8" />');
    printWindow.document.write('<style type="text/css">body { font-family: Verdana; font-size: 9px;	color: #000000;} table td{ padding: 3px; border: 1px solid #C0C0C0;	font-family: Verdana; font-size: 9px;} table caption{font-family: Verdana;font-weight: bold;padding-bottom: 10px;padding-top: 5px;}.titulo{	font-family: Verdana;font-size: 12px;font-weight: bold;}table{border-collapse: collapse;border: 1px solid #C0C0C0;width: 100%;}@media all {.page-break { display: none; }} @media print {.page-break { display: block; page-break-before: always; }}</style>');
    printWindow.document.write('</head><body >');
    printWindow.document.write(divContents + '<hr>' + divContents2);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
    printWindow.close();
};

function reporteCargos(lstData, strIdDiv) {
    var strHtmlCabecera = new String();
    var strHtml = new String();
    var strhtmlCeldas = new String();
    var strHtmlTituloPagina = new String();
    var strHtmlPiePagina = new String();
    var j = 0;
    strHtmlTituloPagina = "<div style='height:30px; font-weight: bold; text-align: center; vertical-align: middle;'>Relación de Documentos Derivados" + "<br class='ayudasCursivas'>" + traerFechaJquery() + "</br></div>";
    strHtmlPiePagina = "<div class='page-break' style='height:5px;'></div>";
    strHtmlCabecera = "<tr><td style='width:15px'>N°</td><td style='width:30px'><b>Exp.</b></td><td><b>De</b></td><td><b>Para</b></td><td><b>Documento</b></td><td style='text-align:center'><b>Cliente(Razon social)</b></td><td style='text-align:center'><b>Firma/Sello</b></td></tr>";
    for (var i = 0; i < lstData.length; i++) {
        j += 1;
        strhtmlCeldas += "<tr>";
        strhtmlCeldas += "<td>" + j + "</td>";
        strhtmlCeldas += "<td title='" + lstData[i].ID_EXPE + "' name='divCodigoBarras' data-id='" + lstData[i].ID_MOVI + "'></td>";
        strhtmlCeldas += "<td>" + lstData[i].enEstorgRemite.ABR_SUBOFI + "</td>";
        strhtmlCeldas += "<td>" + lstData[i].enEstorg.ABR_SUBOFI + "</td>";
        strhtmlCeldas += "<td>" + lstData[i].enTipDoc.DES_DOC + "<br class='ayudasCursivas'>" + validaNulosJSON(lstData[i], "DES_COMENT_INI") + validaNulosJSON(lstData[i], "DES_COMENT") + "</br>" + validaNulosJSON(lstData[i], "DES_ASIGNA") + "</br></td>";

        if (lstData[i].enOrigen.ID_ORIGEN == 3) {
            strhtmlCeldas += "<td><b>" + lstData[i].DES_PERSONA + "</b><br>" + lstData[i].DES_ASUNTO + "</br></td>";
        } else {
            strhtmlCeldas += "<td><b>" + lstData[i].enEstorgRemite.ABR_SUBOFI + "</b><br>" + lstData[i].DES_ASUNTO + "</br></td>";
        };
        strhtmlCeldas += "<td style='width:180px'><div style='height:100px'></div></td>";
        strhtmlCeldas += "</tr>";
        if ((j % 8 == 0)) {
            strHtml += strHtmlTituloPagina + "<table>" + strHtmlCabecera + strhtmlCeldas + "</table>" + strHtmlPiePagina;
            strhtmlCeldas = "";
        };
        if (j == lstData.length)
            strHtml += strHtmlTituloPagina + "<table>" + strHtmlCabecera + strhtmlCeldas + "</table>";
    };
    $("#" + strIdDiv).append(strHtml);
    $("[name=divCodigoBarras]").each(function () {
        var intIdExpe = $(this).attr("title") + "," + $(this).attr("data-id");
        $(this).barcode(intIdExpe, "code128");
        $(this).append('<center>' + $(this).attr("title"));
    });
    //imprimir($("#" + strIdDiv).html(), "print");
    fnWindowsOpen($("#" + strIdDiv).html(), "Reporte de cargos");
    $("#" + strIdDiv).empty();
};


function reporteDocumentosDocSalida(lstData, strIdDiv) {
    var strHtmlCabecera = new String();
    var strHtmlTituloPagina = new String();
    var strHtml = new String();
    var strhtmlCeldas = new String();
    var strHtmlPiePagina = new String();
    var sumCopiasRegistradas = 0;
    var sumCopiasEnviadas = 0;
    var j = 0;

    strHtmlTituloPagina = "<div style='height:30px; font-weight: bold; text-align: center; vertical-align: middle;'>Relación de Documentos para Correspondencia" + "<br class='ayudasCursivas'>" + traerFechaJquery() + "</br></div>";
    strHtmlCabecera = "<tr><td>N°</td>" +
                      "<td>Expediente</td>" +
                      "<td>De</td>" +
                      "<td>Para</td>" +
                      /*"<td>Plazo Max. Hábiles</td>" +
                      "<td>Fechas</td>" +
                      "<td>Fec. Plazo</td>" +
                      "<td>Dias Empleados</td>" +
                      "<td>Dias Excedidos</td>" +*/
                      "<td>Documento</td>" +
                      "<td>Mensajeria</td>" +
                      "<td style='text-align:center;'>N° Copias<br>Enviadas</td>" +
                      "<td style='text-align:center;'>N° Copias<br>Registradas</td>" +
                      "<td style='text-align:center;'>Situación de</br>Notificación</td>" +
                      "<td>Observaciones</td></tr>";

    for (var i = 0; i < lstData.length; i++) {
        j += 1;
        strhtmlCeldas += "<tr>";
        strhtmlCeldas += "<td>" + j + "</td>";
        strhtmlCeldas += "<td>" + validaNulosJSON(lstData[i], "ID_EXPE") + "</td>";
        strhtmlCeldas += "<td>" + lstData[i].enEstorg.ABR_SUBOFI + "</td>";
        strhtmlCeldas += "<td>" + validaNulosJSON(lstData[i], "DES_PERSONA") + "<br> <span class='ayudasCursivas'>" + validaNulosJSON(lstData[i], "DES_DIRECCION") + "</td>";
        /*strhtmlCeldas += "<td><span calss='campoReasaltado'>Entrega: </span><br>Dias: " + validaNulosJSON(lstData[i], "PLAZO_A") + "<br><span class='campoResaltado'>Retorno: </span><br>Dias: " + validaNulosJSON(lstData[i], "PLAZO_A") + "<br><span class='campoResaltado'>Total:</span><br>Dias: " + validaNulosJSON(lstData[i], "NUM_PLAZO") + "</td>";
        strhtmlCeldas += "<td><span calss='campoReasaltado'>Salida MINCETUR: </span><br>" + validaNulosJSON(lstData[i], "FEC_ENTREGA") + "<br><span class='campoResaltado'>Entrega consignado: </span><br>" + validaNulosJSON(lstData[i], "FEC_RECEP") + "<br><span class='campoResaltado'>Retorno MINCETUR:</span><br>" + validaNulosJSON(lstData[i], "FEC_CARGO") + "</td>";
        strhtmlCeldas += "<td>" + validaNulosJSON(lstData[i], "FEC_PLAZO") + "</td>";  
        strhtmlCeldas += "<td><span calss='campoReasaltado'>Entrega: </span><br>Dias: " + validaNulosJSON(lstData[i], "PLAZO_C") + "<br><span class='campoResaltado'>Retorno: </span><br>Dias: " + validaNulosJSON(lstData[i], "PLAZO_D") + "<br><span class='campoResaltado'>Total:</span><br>Dias: " + validaNulosJSON(lstData[i], "NUM_PLAZO_TT") + "</td>";
        strhtmlCeldas += "<td><span calss='campoReasaltado'>Entrega: </span><br>Dias: " + ((lstData[i].PLAZO_E < 0) ? 0 : validaNulosJSON(lstData[i], "PLAZO_E")) + "<br><span class='campoResaltado'>Retorno: </span><br>Dias: " + ((lstData[i].PLAZO_F < 0) ? 0 : validaNulosJSON(lstData[i], "PLAZO_F")) + "<br></td>";*/
        strhtmlCeldas += "<td>" + lstData[i].enTipDoc.DES_DOC + "</td>";
        strhtmlCeldas += "<td>" + validaNulosJSON(lstData[i], "DES_TIP_NOTIFICA") + "-" + validaNulosJSON(lstData[i], "DES_MENSAJERO") + "</td>";
        strhtmlCeldas += "<td style='text-align:center;'>" + lstData[i].enTipDoc.NUM_COPIAS + "</td>";
        strhtmlCeldas += "<td style='text-align:center;'>" + lstData[i].enTipDoc.CANTIDAD + "</td>";
        strhtmlCeldas += "<td>" + validaNulosJSON(lstData[i], "DES_ESTADO_NOTIFICA") + "</td>";
        strhtmlCeldas += "<td>" + validaNulosJSON(lstData[i], "DES_OBS") + "</td>";
        strhtmlCeldas += "</tr>";
        sumCopiasRegistradas += Number(lstData[i].enTipDoc.CANTIDAD);
        sumCopiasEnviadas += Number(lstData[i].enTipDoc.NUM_COPIAS);
        strHtmlPiePagina = "<tr><td colspan='15' style='text-align:right;'>Total de Copias Registradas: " + sumCopiasRegistradas +
                        "</td></tr>";
       
        if ((j % 18 == 0)) {
            strHtml += strHtmlTituloPagina + "<table>" + strHtmlCabecera + strhtmlCeldas + strHtmlPiePagina + "</table>";
            strhtmlCeldas = "";
        };
        if (j == lstData.length)
            strHtml += strHtmlTituloPagina + "<table>" + strHtmlCabecera + strhtmlCeldas + strHtmlPiePagina + "</table>";
    };
    $("#" + strIdDiv).append(strHtml);
    fnWindowsOpen($("#" + strIdDiv).html(), "Reporte de Documentos para Correspondencia");
    //imprimir($("#" + strIdDiv).html(), "print");
    $("#" + strIdDiv).empty();
};

function reporteCargosDocSalida(lstData, strIdDiv) {
    var strHtmlCabecera = new String();
    var strHtml = new String();
    var strhtmlCeldas = new String();
    var strHtmlTituloPagina = new String();
    var strHtmlPiePagina = new String();
    var j = 0;
    strHtmlTituloPagina = "<div style='height:30px; font-weight: bold; text-align: center; vertical-align: middle;'>Relación de Cargos de Correspondencia" + "<br class='ayudasCursivas'>" + traerFechaJquery() + "</br></div>";
    strHtmlCabecera = "<tr><td style='width:15px;text-align:center'>N°</td>" +
                      "<td style='width:30px;text-align:center'><b>Exp.</b></td>" +
                      "<td style='text-align:center'><b>Oficina</b></td>" +
                      "<td><b>Documento</b></td>" +
                      "<td><b>Mensajería</b></td>" +
                      "<td style='text-align:center'><b>Firma/Sello</b></td></tr>";

    for (var i = 0; i < lstData.length; i++) {
        j += 1;
        strhtmlCeldas += "<tr>";
        strhtmlCeldas += "<td style='text-align:center'>" + j + "</td>";
        strhtmlCeldas += "<td style='text-align:center'>" + lstData[i].ID_EXPE + "</td>";
        strhtmlCeldas += "<td style='text-align:center'>" + lstData[i].enEstorg.ABR_SUBOFI + "</td>";
        strhtmlCeldas += "<td>" + lstData[i].enTipDoc.DES_DOC + "</td>";
        strhtmlCeldas += "<td>" + validaNulosJSON(lstData[i], "DES_TIP_NOTIFICA") + "-" + validaNulosJSON(lstData[i], "DES_MENSAJERO") + "</td>";
        strhtmlCeldas += "<td style='width:180px'><div style='height:96px'></div></td>";
        strhtmlCeldas += "</tr>";
        if ((j % 8 == 0)) {
            strHtml += strHtmlTituloPagina + "<table>" + strHtmlCabecera + strhtmlCeldas + "</table>";
            strhtmlCeldas = "";
        };
        if (j == lstData.length)
            strHtml += strHtmlTituloPagina + "<table>" + strHtmlCabecera + strhtmlCeldas + "</table>";
    };
    $("#" + strIdDiv).append(strHtml);
    //imprimir($("#" + strIdDiv).html(), "print");
    fnWindowsOpen($("#" + strIdDiv).html(), "Reporte de Cargos para Correspondencia");
    $("#" + strIdDiv).empty();
};
function reporteSeguimientoTupa(lstData) {
    var strHtmlCabecera = new String();
    var strHtml = new String();
    var strhtmlCeldas = new String();
    var strPiePagina = new String();
    strHtmlCabecera = "<tr><td style='font-weight:bold;text-align:center; vertical-align:middle; background-color: silver; border: solid 1px black; width:100px;'>N° de Expediente deProcedimiento Administrativo</td>" +
    "<td style='font-weight:bold;text-align:center; vertical-align:middle; background-color: silver; border: solid 1px black; width:250px;'>Nombre, denominación o Razón Social del Administrado (Persona Natural o Jurídica)</td>" +
    "<td style='font-weight:bold;text-align:center; vertical-align:middle; background-color: silver; border: solid 1px black; width:250px;'>Denominación del Procedimiento y Naturaleza del mismo (2)</td>" +
    "<td style='font-weight:bold;text-align:center; vertical-align:middle; background-color: silver; border: solid 1px black; width:100px;'>Fecha de Presentación de la solicitud o formato iniciando el procedimiento administrativo (Día.Mes.Año)</td>" +
    "<td style='font-weight:bold;text-align:center; vertical-align:middle; background-color: silver; border: solid 1px black; width:100px;'>Plazo establecido en el Tupa para la resolución de Primera Instancia (N° de Días)</td>" +
    "<td style='font-weight:bold;text-align:center; vertical-align:middle; background-color: silver; border: solid 1px black; width:100px;'>Resolución, Acto y/o Documento (con indicación de N° y fecha) que puso fin al procedimiento en primera instancia</td>" +
    "<td style='font-weight:bold;text-align:center; vertical-align:middle; background-color: silver; border: solid 1px black; width:150px;'>Fecha de aplicación del Silencio Negativo (3) o Positivo</td>" +
    "<td style='font-weight:bold;text-align:center; vertical-align:middle; background-color: silver; border: solid 1px black; width:150px;'>Denominación y fecha de Presentación de Recurso Impugnatorio (4)</td>" +
    "<td style='font-weight:bold;text-align:center; vertical-align:middle; background-color: silver; border: solid 1px black; width:150px;'>Fecha de elevación del expediente y Dependencia que conoce el procedimiento administrativo en 2da instancia (5)</td>" +
    "</tr>";
    strPiePagina = "<tr><td colspan='9' style='text-align:justify; border: solid 1px black;'>(1) Se elaborará un formato independiente para cada mes (Enero y Febrero 2008)" +
						"<br>(2) Además inidicar N° de procedimiento en el TUPA y considerar sólo procedimientos de Evaluación Previa indicando" +
						"la aplicación del silecio positivo o silencio negativo. No incluir procedimientos sujetos a aprobación automática." +
						"<br>(3) Se considerará la aplicación del silencio negativo, en caso el administrado hubiese hecho uso del mismo interponiendo un recurso impugnativo." +
                        "<br>(4) Recurso de Reconsideración o Apelación.- Aplicable a los procedimientos resueltos en el plazo legal en los que el " +
						"administrativo interpuso alguno de los recursos por estar en desacuerdo con la decisión, así como a los procedimientos " +
						"en los que el administrado optó por la aplicación del silencio negativo al no obtener repuesta en el plazo legal interponiendo " +
						"los recursos impugnativos. De no haberse interpuesto Recurso insertar la frase &quot;No aplicable&quot;" +
						"<br>(5)  Aplicable a todos los casos en los que se haya interpuesto Recurso de Apelación. De no haberse interpuesto Recurso insertar la frase &quot;No Aplicable&quot;" +
                        "</td></tr>";
    for (var i = 0; i < lstData.length; i++) {
        strhtmlCeldas += "<tr>";
        strhtmlCeldas += "<td style='text-align:center; border: solid 1px black'>" + lstData[i].ID_EXPE + "</td>";
        strhtmlCeldas += "<td style='border: solid 1px black'>" + validaNulosJSON(lstData[i], "DES_PERSONA") + "</td>";
        strhtmlCeldas += "<td style='border: solid 1px black'>" + lstData[i].enTupa.DES_NOM + "</td>";
        strhtmlCeldas += "<td style='text-align:center; border: solid 1px black;'>" + lstData[i].FEC_EXPE + "</td>";
        strhtmlCeldas += "<td style='text-align:center; border: solid 1px black;'>" + lstData[i].enTupa.EnSilencio.ABR_SILENCIO + " - " + lstData[i].enTupa.TIEMPO + "</td>";
        strhtmlCeldas += "<td style='text-align:center; border: solid 1px black;'>" + validaNulosJSON(lstData[i], "enTipDoc.DES_DOC") + "</td>";
        strhtmlCeldas += "<td style='text-align:center; border: solid 1px black;'>-</td>";
        strhtmlCeldas += "<td style='text-align:center; border: solid 1px black;'>-</td>";
        strhtmlCeldas += "<td style='text-align:center; border: solid 1px black;'>-</td>";
        strhtmlCeldas += "</tr>";
    };
    strHtml = "<table>" +
    "<tr><td colspan='9' style='font-weight:bold; text-align:center;'>CUADRO DE SEGUIMIENTO DE PROCEDIMIENTOS ADMINISTRATIVOS</td></tr>" +
    //"<tr><td colspan='9' style='text-align:center;'>Del " + fecIni + " al " + fecFin + "</td></tr>" + 
    strHtmlCabecera + strhtmlCeldas + strPiePagina + "</table>";
    //$("#divConsMovimientoExpe").html(strHtml);
    imprimir(strHtml, "excel");
};
function reporteEtiquetasCorrespondencia(lstData, strIdDiv) {
    var strHtmlCabecera = new String();
    var strHtml = new String();
    var strhtmlCeldas = new String();
    var strPiePagina = new String();
    
    for (var i = 0; i < lstData.length; i++) {
        strhtmlCeldas += "<tr>";
        strhtmlCeldas += "<td style='border-width: 0px'>N°. Expe: </td>";
        strhtmlCeldas += "<td style='border-width: 0px; text-align:center'>" + validaNulosJSON(lstData[i], "ID_EXPE") + "</td>";
        strhtmlCeldas += "</tr>";
        strhtmlCeldas += "<tr>";
        strhtmlCeldas += "<td style='border-width: 0px'>Oficina Remitente: </td>";
        strhtmlCeldas += "<td style='border-width: 0px; text-align:center'>" + validaNulosJSON(lstData[i].enEstorg, "ABR_SUBOFI") + "</td>";
        strhtmlCeldas += "</tr>";
        strhtmlCeldas += "<tr>";
        strhtmlCeldas += "<td style='border-width: 0px'>Destinatario: </td>";
        strhtmlCeldas += "<td style='border-width: 0px; text-align:center'>" + validaNulosJSON(lstData[i], "DES_PERSONA") + "</td>";
        strhtmlCeldas += "</tr>";
        strhtmlCeldas += "<tr>";
        strhtmlCeldas += "<td style='border-width: 0px'>Tipo de destino: </td>";
        strhtmlCeldas += "<td style='border-width: 0px; text-align:center'>" + validaNulosJSON(lstData[i], "DES_TIP_DESTINO") + "</td>";
        strhtmlCeldas += "</tr>";
        strhtmlCeldas += "<tr>";
        strhtmlCeldas += "<td style='border-width: 0px'>Documento enviado: </td>";
        strhtmlCeldas += "<td style='border-width: 0px; text-align:center'>" + validaNulosJSON(lstData[i].enTipDoc, "DES_DOC") + "</td>";
        strhtmlCeldas += "</tr>";
        strhtmlCeldas += "<tr>";
        strhtmlCeldas += "<td style='border-width: 0px'>Detalles: </td>";
        strhtmlCeldas += "<td style='border-width: 0px'><textarea  maxlength='500' rows='5' cols='80'></textarea></td>";
        strhtmlCeldas += "</tr>";
    };
    strHtml = "<table style='width:100%'><tr><td colspan='2' style='font-weight:bold; text-align:center;'>Registro de correspondendcia</td></tr>" + strhtmlCeldas + "</table>";
    $("#" + strIdDiv).append(strHtml);
    fnWindowsOpen($("#" + strIdDiv).html(), "");
    $("#" + strIdDiv).empty();
};

function reporteCongreso(lstData, strTipo, strTituloArchivo)
{
    var strHtmlCabecera = new String();
    var strHtml = new String();
    var strhtmlCeldas = new String();
    var strPiePagina = new String();
    //var lstTemp = lstData; //sortJsonByKeyandOrder(lstData, "DESPACHO", "str", "asc");
    var fecAhora = new Date();
    if (strTipo == "excel" || strTipo == "pdf") {
        var strHtmlTitulo = "<tr><td colspan='9' style='font-family: calibri; font-weight: bold; font-size: 10pt; text-align: center; height: 100px; vertical-align:middle;'>REPORTE AL " + traeFechaFormato(fecAhora, true) + "</td></tr>";
        strHtmlCabecera = "<tr style='font-family: calibri; font-size: 12pt'><td style='font-weight:bold;text-align:center; vertical-align:middle; background-color: #D6DCE4; border: solid 1px black; width:35px;'>N°.</td>" +
        "<td style='font-weight:bold;text-align:center; vertical-align:middle; background-color: #D6DCE4; border: solid 1px black; width:100px;'>Exp</td>" +
        "<td style='font-weight:bold;text-align:center; vertical-align:middle; background-color: #D6DCE4; border: solid 1px black; width:250px;'>Remite</td>" +
        "<td style='font-weight:bold;text-align:center; vertical-align:middle; background-color: #D6DCE4; border: solid 1px black; width:300px;'>Comision</td>" +
        "<td style='font-weight:bold;text-align:center; vertical-align:middle; background-color: #D6DCE4; border: solid 1px black; width:100px;'>Asunto</td>" +
        "<td style='font-weight:bold;text-align:center; vertical-align:middle; background-color: #D6DCE4; border: solid 1px black; width:120px;'>Fecha de Ingreso</td>" +
        "<td style='font-weight:bold;text-align:center; vertical-align:middle; background-color: #D6DCE4; border: solid 1px black; width:100px;'>Estado</td>" +
        "<td style='font-weight:bold;text-align:center; vertical-align:middle; background-color: #D6DCE4; border: solid 1px black; width:120px;'>Observaciones</td>" +
        "<td style='font-weight:bold;text-align:center; vertical-align:middle; background-color: #D6DCE4; border: solid 1px black; width:100px;'>Ubicación Actual</td>" +
        "<td style='font-weight:bold;text-align:center; vertical-align:middle; background-color: #D6DCE4; border: solid 1px black; width:100px;'>Ubicación Despacho</td>" +
        "<td style='font-weight:bold;text-align:center; vertical-align:middle; background-color: #D6DCE4; border: solid 1px black; width:100px;'>Fec. Venc.</td>" +
        "<td style='font-weight:bold;text-align:center; vertical-align:middle; background-color: #D6DCE4; border: solid 1px black; width:200px;'>Nº Proyecto de Ley</td>" +
        "<td style='font-weight:bold;text-align:center; vertical-align:middle; background-color: #D6DCE4; border: solid 1px black; width:200px;'>Descripción</td>" +
        "</tr>";

        for (var i = 0; i < lstData.length; i++) {
            strhtmlCeldas += "<tr style='font-family: calibri; font-size: 12pt; vertical-align:middle;'>";
            strhtmlCeldas += "<td style='text-align:center; border: solid 1px black'>" + (i + 1) + "</td>";
            strhtmlCeldas += "<td style='text-align:center; border: solid 1px black'>" + lstData[i].ID_EXPE + "</td>";
            strhtmlCeldas += "<td style='text-align:center; border: solid 1px black'>" + ((lstData[i].DES_PERSONA == "")? '--' : lstData[i].DES_PERSONA) + "</td>";
            strhtmlCeldas += "<td style='text-align:center; border: solid 1px black'>" + lstData[i].enCongreso.DES_TIP_COMISION + ":" + lstData[i].enCongreso.DES_COMISION + "</td>";
            strhtmlCeldas += "<td style='text-align:left; border: solid 1px black;'>" + ((lstData[i].DES_ASUNTO == null) ? '--' : lstData[i].DES_ASUNTO.toUpperCase()) + "</td>";
            strhtmlCeldas += "<td style='text-align:center; border: solid 1px black;'>" + (lstData[i].FEC_EXPE).slice(0, 10) + "</td>";
            strhtmlCeldas += "<td style='text-align:center; border: solid 1px black;'>" + lstData[i].enEstado.DES_ESTADO +"</td>";
            strhtmlCeldas += "<td style='text-align:center; border: solid 1px black;'>" + ((lstData[i].DES_OBS == "" || lstData[i].DES_OBS == "<BR>") ? '--' : +lstData[i].DES_OBS) + "</td>";
            strhtmlCeldas += "<td style='text-align:center; border: solid 1px black;'>" + ((lstData[i].enEstorg.ABR_SUBOFI == "") ? '--' : lstData[i].enEstorg.ABR_SUBOFI) + "</td>";
            strhtmlCeldas += "<td style='text-align:center; border: solid 1px black;'>" + ((lstData[i].DESPACHO == "" || lstData[i].DESPACHO == null) ? '--' : lstData[i].DESPACHO) + "</td>";
            strhtmlCeldas += "<td style='text-align:center; border: solid 1px black;'>" + ((lstData[i].FEC_PLAZO == "") ? '--' : lstData[i].FEC_PLAZO) + "</td>";
            strhtmlCeldas += "<td style='text-align:center; border: solid 1px black;'>" + ((lstData[i].enLeyCongreso.COD_LEY == "") ? '--' : lstData[i].enLeyCongreso.COD_LEY) + "</td>";
            strhtmlCeldas += "<td style='text-align:center; border: solid 1px black;'>" + ((lstData[i].enLeyCongreso.DES_LEY == "") ? '--' : lstData[i].enLeyCongreso.DES_LEY) + "</td>";
            strhtmlCeldas += "</tr>";            
        };

        strHtml = "<table style='border-collapse: collapse; width:100%'>" + strHtmlTitulo + strHtmlCabecera + strhtmlCeldas + "</table>";
        strHtml = strHtml.replace(/\"/g, "'");

        $("#frmPrincipalMaster").append("<input id=\"hfTipoArchivo\" name=\"hfTipoArchivo\" type=\"hidden\" value=\"" + strTipo + "\" />");
        $("#frmPrincipalMaster").append("<input id=\"hfDataExportar\" name=\"hfDataExportar\" type=\"hidden\" value=\"" + strHtml + "\" />");
        $("#frmPrincipalMaster").append("<input id=\"hfTituloArchivo\" name=\"hfTituloArchivo\" type=\"hidden\" value=\"" + strTituloArchivo + "\" />");
        $("#frmPrincipalMaster").submit();
        $("#hfTipoArchivo").remove();
        $("#hfDataExportar").remove();
        $("#hfTituloArchivo").remove();

    }
};



function fnExportarExpeDetalles(lstDataReporte, strTipo, strTituloArchivo)
{
    var i;
    var strHtmlTitulo = new String();
    var strHtmlCabecera = new String();
    var strhtmlCeldas = new String();
    var strHtmlPiePagina = new String();
    var date = new Date();
    var fechaActual = padLeft(date.getDate(), 2) + "/" + padLeft(date.getMonth() + 1, 2) + "/" + date.getFullYear();
    var horaActual = date.getHours() + ':' + date.getMinutes();

    if (strTipo == "excel" || strTipo == "pdf") {
        strHtmlTitulo = "<tr><td colspan='9' style='font-family: calibri; font-weight: bold; font-size: 10pt; text-align: center; height: 50px; vertical-align:middle;'>Reporte de " + strTituloArchivo + " al:  " + fechaActual + "</td></tr>";
        strHtmlCabecera = "<tr style='font-family: calibri; font-size: 14pt'><td style='font-weight:bold;text-align:center; vertical-align:middle; border: solid 1px black; width:70px;font-size: 10pt;'>N°. Exp.</td>" +
                    "<td style='font-weight:bold;text-align:center; vertical-align:middle; border: solid 1px black; width:40px;font-size: 10pt;'><b>Seq.</b></td>" +
                    "<td style='font-weight:bold;text-align:center; vertical-align:middle; border: solid 1px black; width:80px;font-size: 10pt;'><b>Fecha</b></td>" +
                    "<td style='font-weight:bold;text-align:center; vertical-align:middle; border: solid 1px black; width:80px;font-size: 10pt;'><b>Hora</b></td>" +
                    "<td style='font-weight:bold;text-align:center; vertical-align:middle; border: solid 1px black; width:80px;font-size: 10pt;'><b>Origen</b></td>" +
                    "<td style='font-weight:bold;text-align:center; vertical-align:middle; border: solid 1px black; width:100px;font-size: 10pt;'><b>Documento</b></td>" +
                    "<td style='font-weight:bold;text-align:center; vertical-align:middle; border: solid 1px black; width:500px;font-size: 10pt;'><b>Asunto</b></td>" +
                    "<td style='font-weight:bold;text-align:center; vertical-align:middle; border: solid 1px black; width:60px;font-size: 10pt;'><b>N°. Folios</b></td>" +
                    "<td style='font-weight:bold;text-align:center; vertical-align:middle; border: solid 1px black; width:100px;font-size: 10pt;'><b>Oficina</b></td>" +
                    "<td style='font-weight:bold;text-align:center; vertical-align:middle; border: solid 1px black; width:80px;font-size: 10pt;'><b>Usuario</b></td></tr>";

        for (var i = 0; i < lstDataReporte.length; i++) {

            var strPivotAsunto = (lstDataReporte[i].DES_ASUNTO == null ? "--" : lstDataReporte[i].DES_ASUNTO);
            //var strAsunto = strPivotAsunto.replace(/\"/g, "&#34;").replace(/\&/g, "&#38;").replace(/\n|\r/g, "<br/>").replace(/\'/g, "&#39;").replace(/\</g, "&#60;").replace(/\>/g, "&#62;").replace(/\*/g, "&#42;");
            var strAsunto = strPivotAsunto.replace(/\"/g, " ").replace(/\&/g, " ").replace(/\n|\r/g, "").replace(/\'/g, " ").replace(/\</g, " ").replace(/\>/g, " ").replace(/\*/g, " ");
            strhtmlCeldas += "<tr>";
            strhtmlCeldas += "<td style='text-align:center; border: solid 1px black;font-size: 8pt;'>" + lstDataReporte[i].ID_EXPE + "</td>";
            strhtmlCeldas += "<td style='text-align:center; border: solid 1px black;font-size: 8pt;'>" + lstDataReporte[i].ID_MOVI + "</td>";
            strhtmlCeldas += "<td style='text-align:center; border: solid 1px black;font-size: 8pt;'>" + lstDataReporte[i].FEC_INI + "</td>";
            strhtmlCeldas += "<td style='text-align:center; border: solid 1px black;font-size: 8pt;'>" + lstDataReporte[i].DES_HORAINI + "</td>";
            strhtmlCeldas += "<td style='text-align:center; border: solid 1px black;font-size: 8pt;'>" + lstDataReporte[i].enOrigen.DES_ORIGEN + "</td>";
            strhtmlCeldas += "<td style='text-align:center; border: solid 1px black;font-size: 8pt;'>" + lstDataReporte[i].enTipDoc.DES_DOC + "</td>";
            strhtmlCeldas += "<td style='text-align:center; border: solid 1px black;font-size: 8pt;'>" + strAsunto + "</td>";
            strhtmlCeldas += "<td style='text-align:center; border: solid 1px black;font-size: 8pt;'>" + lstDataReporte[i].enTipDoc.NUM_FOLIOS + "</td>";
            strhtmlCeldas += "<td style='text-align:center; border: solid 1px black;font-size: 8pt;'>" + lstDataReporte[i].enEstorg.ABR_SUBOFI + "</td>";
            strhtmlCeldas += "<td style='text-align:center; border: solid 1px black;font-size: 8pt;'>" + lstDataReporte[i].COD_LOG + "</td>";
            strhtmlCeldas += "</tr>";

        };
        strHtml = "<table style='border-collapse: collapse; width:100%'>" + strHtmlTitulo + strHtmlCabecera + strhtmlCeldas + "</table>";
        //strHtml = strHtml.replace(/\"/g, "'");

        $("#frmPrincipalMaster").append("<input id=\"hfTipoArchivo\" name=\"hfTipoArchivo\" type=\"hidden\" value=\"" + strTipo + "\" />");
        $("#frmPrincipalMaster").append("<input id=\"hfDataExportar\" name=\"hfDataExportar\" type=\"hidden\" value=\"" + strHtml + "\" />");
        $("#frmPrincipalMaster").append("<input id=\"hfTituloArchivo\" name=\"hfTituloArchivo\" type=\"hidden\" value=\"" + strTituloArchivo + "\" />");
        $("#frmPrincipalMaster").submit();
        $("#hfTipoArchivo").remove();
        $("#hfDataExportar").remove();
        $("#hfTituloArchivo").remove();
       
    };    
};


function fnExportarAsignaciones(lstDataReporte, strTipo, strTituloArchivo) {
    var i;
    var strHtmlTitulo = new String();
    var strHtmlCabecera = new String();
    var strhtmlCeldas = new String();
    var strHtmlPiePagina = new String();

    var date = new Date();
    var fechaActual = padLeft(date.getDate(), 2) + "/" + padLeft(date.getMonth() + 1, 2) + "/" + date.getFullYear();
    var horaActual = date.getHours() + ':' + date.getMinutes();

    if (strTipo == "excel" || strTipo == "pdf") {
        /*strHtmlTitulo = '<div style="height:33px; font-weight: bold; text-align: center; vertical-align: middle;">Reporte de asignaciones</div>';
        strHtmlCabecera = '<tr><td><b>Exp.</b></td>' +
                    '<td><b>Oficina</b></td>' +
                    '<td><b>Funcionario</b></td>' +
                    '<td><b>Tratamiento</b></td>' +
                    '<td><b>Documento asignado</b></td>' +
                    '<td><b>Fecha de asignación</b></td>' +
                    '<td><b>Documento respuesta</b></td>' +
                    '<td><b>Fecha respuesta</b></td>' +
                    '<td><b>Estado</b></td></tr>';

        for (var i = 0; i < lstDataReporte.length; i++) {
            var des_doc = ((lstDataReporte[i].enTipDoc_Asignado.DES_DOC != null) ? lstDataReporte[i].enTipDoc_Asignado.DES_DOC : "");
            var des_nota = ((lstDataReporte[i].DES_OBS_RESP != null) ? " <b>Notas:</b>" + lstDataReporte[i].DES_OBS_RESP : "");
            strhtmlCeldas += '<tr>';
            strhtmlCeldas += '<td>' + lstDataReporte[i].ID_EXPE + '</td>';
            strhtmlCeldas += '<td>' + lstDataReporte[i].enMovi.DES_PERSONA + '</td>';
            strhtmlCeldas += '<td>' + lstDataReporte[i].enUsu.Nombres + '</td>';
            strhtmlCeldas += '<td>' + lstDataReporte[i].enTrata.DES_TRATA + '</td>';
            strhtmlCeldas += '<td>' + lstDataReporte[i].enTipDocDerivado.DES_DOC + '</td>';
            strhtmlCeldas += '<td>' + lstDataReporte[i].FEC_INI + '</td>';
            strhtmlCeldas += '<td>' + des_doc + des_nota + '</td>';
            strhtmlCeldas += '<td>' + lstDataReporte[i].FEC_RESP + '</td>';
            strhtmlCeldas += '<td>' + lstDataReporte[i].enEstado.DES_ESTADO + '</td>';
            strhtmlCeldas += '</tr>';
            strHtml = strHtmlTitulo + '<table>' + strHtmlCabecera + strhtmlCeldas + '</table>';
        };
        if (i == lstDataReporte.length) {
            $("#frmPrincipalMaster").append("<input id='hfTipoArchivo' name='hfTipoArchivo' type='hidden' value='" + strTipo + "'>");
            $("#frmPrincipalMaster").append("<input id='hfTituloArchivo' name='hfTituloArchivo' type='hidden' value='" + strTituloArchivo + "'>");
            $("#frmPrincipalMaster").append("<input id='hfDataExportar' name='hfDataExportar' type='hidden' value='" + strHtml + "'>");
            $("#frmPrincipalMaster").submit();
            $("#hfDataExportar").remove();
            $("#hfTituloArchivo").remove();
            $("#hfTipoArchivo").remove();
        }*/

        strHtmlTitulo = "<tr><td colspan='9' style='font-family: calibri; font-weight: bold; font-size: 10pt; text-align: center; height: 50px; vertical-align:middle;'>Reporte de asignaciones al:  " + fechaActual  + "</td></tr>";

        strHtmlCabecera = "<tr style='font-family: calibri; font-size: 14pt'><td style='font-weight:bold;text-align:center; vertical-align:middle; border: solid 1px black; width:100px;font-size: 10pt;'>N°. Exp.</td>" +
                    "<td style='font-weight:bold;text-align:center; vertical-align:middle; border: solid 1px black; width:100px;font-size: 10pt;'><b>Oficina</b></td>" +
                    "<td style='font-weight:bold;text-align:center; vertical-align:middle; border: solid 1px black; width:100px;font-size: 10pt;'><b>Funcionario</b></td>" +
                    "<td style='font-weight:bold;text-align:center; vertical-align:middle; border: solid 1px black; width:100px;font-size: 10pt;'><b>Tratamiento</b></td>" +
                    "<td style='font-weight:bold;text-align:center; vertical-align:middle; border: solid 1px black; width:100px;font-size: 10pt;'><b>Documento asignado</b></td>" +
                    "<td style='font-weight:bold;text-align:center; vertical-align:middle; border: solid 1px black; width:100px;font-size: 10pt;'><b>Fecha de asignación</b></td>" +
                    "<td style='font-weight:bold;text-align:center; vertical-align:middle; border: solid 1px black; width:100px;font-size: 10pt;'><b>Documento respuesta</b></td>" +
                    "<td style='font-weight:bold;text-align:center; vertical-align:middle; border: solid 1px black; width:100px;font-size: 10pt;'><b>Fecha respuesta</b></td>" +
                    "<td style='font-weight:bold;text-align:center; vertical-align:middle; border: solid 1px black; width:100px;font-size: 10pt;'><b>Estado</b></td></tr>";

        for (var i = 0; i < lstDataReporte.length; i++) {
            var des_doc = ((lstDataReporte[i].enTipDoc_Asignado.DES_DOC != null) ? lstDataReporte[i].enTipDoc_Asignado.DES_DOC : "");
            var des_nota = ((lstDataReporte[i].DES_OBS_RESP != null) ? " <b>Notas:</b>" + lstDataReporte[i].DES_OBS_RESP : "");
            strhtmlCeldas += "<tr>";
            strhtmlCeldas += "<td style='text-align:center; border: solid 1px black;font-size: 8pt;'>" + lstDataReporte[i].ID_EXPE + "</td>";
            strhtmlCeldas += "<td style='text-align:center; border: solid 1px black;font-size: 8pt;'>" + (lstDataReporte[i].enMovi.DES_PERSONA == "" ? "-" : lstDataReporte[i].enMovi.DES_PERSONA) + "</td>";
            strhtmlCeldas += "<td style='text-align:center; border: solid 1px black;font-size: 8pt;'>" + lstDataReporte[i].enUsu.Nombres + "</td>";
            strhtmlCeldas += "<td style='text-align:center; border: solid 1px black;font-size: 8pt;'>" + lstDataReporte[i].enTrata.DES_TRATA + "</td>";
            strhtmlCeldas += "<td style='text-align:center; border: solid 1px black;font-size: 8pt;'>" + lstDataReporte[i].enTipDocDerivado.DES_DOC + "</td>";
            strhtmlCeldas += "<td style='text-align:center; border: solid 1px black;font-size: 8pt;'>" + lstDataReporte[i].FEC_INI + "</td>";
            strhtmlCeldas += "<td style='text-align:center; border: solid 1px black;font-size: 8pt;'>" + des_doc + des_nota + "</td>";
            strhtmlCeldas += "<td style='text-align:center; border: solid 1px black;font-size: 8pt;'>" + lstDataReporte[i].FEC_RESP + "</td>";
            strhtmlCeldas += "<td style='text-align:center; border: solid 1px black;font-size: 8pt;'>" + lstDataReporte[i].enEstado.DES_ESTADO + "</td>";
            strhtmlCeldas += "</tr>";

        };
        strHtml = "<table style='border-collapse: collapse; width:100%'>" + strHtmlTitulo + strHtmlCabecera + strhtmlCeldas + "</table>";
        strHtml = strHtml.replace(/\"/g, "'");
        $("#frmPrincipalMaster").append("<input id=\"hfTipoArchivo\" name=\"hfTipoArchivo\" type=\"hidden\" value=\"" + strTipo + "\" />");
        $("#frmPrincipalMaster").append("<input id=\"hfDataExportar\" name=\"hfDataExportar\" type=\"hidden\" value=\"" + strHtml + "\" />");
        $("#frmPrincipalMaster").append("<input id=\"hfTituloArchivo\" name=\"hfTituloArchivo\" type=\"hidden\" value=\"" + strTituloArchivo + "\" />");
        $("#frmPrincipalMaster").submit();
        $("#hfTipoArchivo").remove();
        $("#hfDataExportar").remove();
        $("#hfTituloArchivo").remove();


    } else if (strTipo == "print") {
        strHtmlTitulo = "<tr><td colspan='9' style='font-family: calibri; font-weight: bold; font-size: 10pt; text-align: center; height: 50px; vertical-align:middle;'>Reporte de asignaciones al:  " + fechaActual + "  " + horaActual + "</td></tr>";

        strHtmlCabecera = "<tr style='font-family: calibri; font-size: 14pt'><td style='font-weight:bold;text-align:center; vertical-align:middle; border: solid 1px black; width:100px;font-size: 10pt;'>N°. Exp.</td>" +
                    "<td style='font-weight:bold;text-align:center; vertical-align:middle; border: solid 1px black; width:100px;font-size: 10pt;'><b>Oficina</b></td>" +
                    "<td style='font-weight:bold;text-align:center; vertical-align:middle; border: solid 1px black; width:100px;font-size: 10pt;'><b>Funcionario</b></td>" +
                    "<td style='font-weight:bold;text-align:center; vertical-align:middle; border: solid 1px black; width:100px;font-size: 10pt;'><b>Tratamiento</b></td>" +
                    "<td style='font-weight:bold;text-align:center; vertical-align:middle; border: solid 1px black; width:100px;font-size: 10pt;'><b>Documento asignado</b></td>" +
                    "<td style='font-weight:bold;text-align:center; vertical-align:middle; border: solid 1px black; width:100px;font-size: 10pt;'><b>Fecha de asignación</b></td>" +
                    "<td style='font-weight:bold;text-align:center; vertical-align:middle; border: solid 1px black; width:100px;font-size: 10pt;'><b>Documento respuesta</b></td>" +
                    "<td style='font-weight:bold;text-align:center; vertical-align:middle; border: solid 1px black; width:100px;font-size: 10pt;'><b>Fecha respuesta</b></td>" +
                    "<td style='font-weight:bold;text-align:center; vertical-align:middle; border: solid 1px black; width:100px;font-size: 10pt;'><b>Estado</b></td></tr>";

        for (var i = 0; i < lstDataReporte.length; i++) {
            var des_doc = ((lstDataReporte[i].enTipDoc_Asignado.DES_DOC != null) ? lstDataReporte[i].enTipDoc_Asignado.DES_DOC : "");
            var des_nota = ((lstDataReporte[i].DES_OBS_RESP != null) ? " <b>Notas:</b>" + lstDataReporte[i].DES_OBS_RESP : "");
            strhtmlCeldas += "<tr>";
            strhtmlCeldas += "<td style='text-align:center; border: solid 1px black;font-size: 8pt;'>" + lstDataReporte[i].ID_EXPE + "</td>";
            strhtmlCeldas += "<td style='text-align:center; border: solid 1px black;font-size: 8pt;'>" + (lstDataReporte[i].enMovi.DES_PERSONA == "" ? "-" : lstDataReporte[i].enMovi.DES_PERSONA) + "</td>";
            strhtmlCeldas += "<td style='text-align:center; border: solid 1px black;font-size: 8pt;'>" + lstDataReporte[i].enUsu.Nombres + "</td>";
            strhtmlCeldas += "<td style='text-align:center; border: solid 1px black;font-size: 8pt;'>" + lstDataReporte[i].enTrata.DES_TRATA + "</td>";
            strhtmlCeldas += "<td style='text-align:center; border: solid 1px black;font-size: 8pt;'>" + lstDataReporte[i].enTipDocDerivado.DES_DOC + "</td>";
            strhtmlCeldas += "<td style='text-align:center; border: solid 1px black;font-size: 8pt;'>" + lstDataReporte[i].FEC_INI + "</td>";
            strhtmlCeldas += "<td style='text-align:center; border: solid 1px black;font-size: 8pt;'>" + des_doc + des_nota + "</td>";
            strhtmlCeldas += "<td style='text-align:center; border: solid 1px black;font-size: 8pt;'>" + lstDataReporte[i].FEC_RESP + "</td>";
            strhtmlCeldas += "<td style='text-align:center; border: solid 1px black;font-size: 8pt;'>" + lstDataReporte[i].enEstado.DES_ESTADO + "</td>";
            strhtmlCeldas += "</tr>";

        };
        strHtml = "<table style='border-collapse: collapse; width:100%'>" + strHtmlTitulo + strHtmlCabecera + strhtmlCeldas + "</table>";
        strHtml = strHtml.replace(/\"/g, "'");
        printElement(strHtml, "", strTituloArchivo);
    } 
};