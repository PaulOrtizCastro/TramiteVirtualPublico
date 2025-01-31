$(document).ready(function ()
{
    fnCargarTupaRequiPublico();
    fnCargarLeyendaTupaRequiPublico();
})
function fnCargarLeyendaTupaRequiPublico()
{
    var objEnTupaLeyenda = new Object();

    cargarDatosWebApi({
        parametros: objEnTupaLeyenda,
        nombreObjeto: "objEnTupaLeyenda",
        callBack: function (data)
        {
            var strHtml = new String();
            var strhtmlCeldas = new String();
            var j = 0;
            
            for (var i = 0; i < data.length; i++) {                
                if (data[i].DES_NIVEL == 0) {
                    $("#divLeyendaTupa").html(data[0].DES_LEYENDA);
                } else {
                    j += 1;
                    strhtmlCeldas += "<tr>";
                    strhtmlCeldas += "<td style='width:12px'>" + "(" + j + ")&nbsp" + "</td>";
                    strhtmlCeldas += "<td>" + data[i].DES_LEYENDA + "</td>";
                    strhtmlCeldas += "</tr>";                    
                }
            }
            $("#divCondicionesTupa").html("</br><table>" + strhtmlCeldas + "</table>");
        },
        url: "Tupa/listTupaLeyendaPublico",
        strRuta: strRutaAplicacionMaster
    });
}
function fnCargarTupaRequiPublico()
{
    var objEnTupa = new Object();
    objEnTupa.ID_TUPA = $("#idVisorTupa").val();
    objEnTupa.ID_TUPA_CONCEPTO = $("#idVisorTupaConcepto").val();
    
    cargarDatosWebApi({
        parametros: objEnTupa,
        nombreObjeto: "objEnTupa",
        callBack: function (data)
        {
            fnCargarGrillaTupaRequi(data);
            fnCargarResolucionRecursos();
        },
        url: "Tupa/ListarRequi",
        strRuta: strRutaAplicacionMaster
    });
}
function fnCargarGrillaTupaRequi(myData)
{
    var strHtml = new String();
    var strhtmlCeldas = new String();
    var strHtmlCabecera = new String();
    var j = 0
    if (myData.length > 0) {
        for (var i = 0; i < myData.length; i++) {
            j += 1;
            strhtmlCeldas += "<tr>";
            strhtmlCeldas += "<td style='text-align:center; width: 20%; padding: 8px;'>" + j + "</td>";
            strhtmlCeldas += "<td style='width: 80%; padding: 8px;'>" + myData[i].enRequi.DES_REQUI + "</td>";
            strhtmlCeldas += "</tr>";
        }        
        strHtmlCabecera = "<tr style='font-family: calibri; font-size: 14pt; border-bottom:double'><td style='font-weight:bold;text-align:center; vertical-align:middle;width:100px;font-size: 10pt;'>N°.</td><td style='font-weight:bold;text-align:center; vertical-align:middle;width:100px;font-size: 10pt;'>Descripción</td></tr>";
        strHtml = "<table id='tblVisorRequi' style='text-align:center;border-collapse: collapse;width: 100%;' >" + strHtmlCabecera + strhtmlCeldas + "</table>";
    } else {
        strHtml = "<div style='text-align:center;border-collapse: collapse;width: 100%;'>No se encontraron requisitos</div>";
    }
    $("#divConsTupaRequiPub").append(strHtml);
    /*$("#tblConsTupaRequiPub").jqGrid('clearGridData');
    $("#tblConsTupaRequiPub").jqGrid('setGridParam', { data: myData });
    $("#tblConsTupaRequiPub").trigger('reloadGrid');

    $("#tblConsTupaRequiPub").jqGrid({
        data: myData,
        styleUI: 'Bootstrap',
        datatype: "local",
        colNames: ["Requisitos"],
        colModel: [
            {
                name: 'enRequi.DES_REQUI', align: "left", resizable: false, formatter: formatterDesRequi
            }],
        rownumbers: true,
        autowidth: true,
        //emptyrecords: "No records to view",
        //shrinkToFit: false,
        loadtext: "Cargando...",
        gridComplete: function ()
        {
            $("table.ui-jqgrid-htable").hide();
        },
        loadComplete: function ()
        {
            var grid = $("#tblConsTupaRequiPub"),
            ids = grid.getDataIDs();

            for (var i = 0; i < ids.length; i++) {
                grid.setRowData(ids[i], false, { height: 20 + (i * 2) });
            }            
        }
    });
    jqGridResponsive($("#tblConsTupaRequiPub").closest("div.grid"));
    $(".ui-jqgrid").css("width", "100%");*/
};

function fnCargarResolucionRecursos()
{
    var objEnResRecurso = new Object();
    objEnResRecurso.ID_TUPA = $("#idVisorTupa").val();
    objEnResRecurso.COD_TUPA = $("#idVisorCodTupa").val();
    objEnResRecurso.ID_TUPA_CONCEPTO = $("#idVisorTupaConcepto").val();

    cargarDatosWebApi({
        parametros: objEnResRecurso,
        nombreObjeto: "objEnResRecurso",
        callBack: function (listData)
        {            
            fnCargarGrillaResolRecursos(listData);
        },
        url: "Tupa/listResolucionRecurso",
        strRuta: strRutaAplicacionMaster
    });
}
function fnCargarGrillaResolRecursos(myData)
{
    //console.log(myData);
    var strHtml = new String();
    var strhtmlCeldas = new String();
    var strHtmlCabecera = new String();    
    if (myData.length > 0) {
        for (var i = 0; i < myData.length; i++) {
            //strhtmlCeldas += "<tr>";
            //strhtmlCeldas += "<td style='width: 80%; padding: 8px;'>" + myData[i].DES_RESOLUCION + "</td>";
            //strhtmlCeldas += "</tr>";
            var numDesResol = myData[i].DES_RESOLUCION;

        }
        //strHtmlCabecera = "<tr style='font-family: calibri; font-size: 14pt; border-bottom:double'><td style='font-weight:bold;text-align:center; vertical-align:middle;width:100px;font-size: 10pt;'>N°.</td><td style='font-weight:bold;text-align:center; vertical-align:middle;width:100px;font-size: 10pt;'>Descripción</td></tr>";
        strHtml = "<table style='text-align:center;border-collapse: collapse;width: 100%;' >" + strhtmlCeldas + "</table>";
    } else {
        strHtml = "<div style='text-align:center;border-collapse: collapse;width: 100%;'>No se encontró información</div>";
    }
    $("#divConsTupaResolRecursos").append(strHtml);
    
}
/*function formatterDesRequi(cellvalue, options, rowObject)
{    
    var strHtml = "<div>" + rowObject.enRequi.DES_REQUI + "</div>";
    return strHtml;
}*/