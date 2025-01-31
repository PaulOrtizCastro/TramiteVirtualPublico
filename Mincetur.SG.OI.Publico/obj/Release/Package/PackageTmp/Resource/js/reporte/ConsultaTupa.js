$(window).on("resize", function ()
{
    var $grid = $("#tblConsTupaConcepPub"),
        newWidth = $grid.closest(".ui-jqgrid").parent().width();
    $grid.jqGrid("setGridWidth", newWidth, true);
    var $grid_serv = $("#tblConsTupaServExcPub"),
        newWidth = $grid_serv.closest(".ui-jqgrid").parent().width();
    $grid_serv.jqGrid("setGridWidth", newWidth, true);
    
});

$(document).ready(function ()
{
    $("input#tbConsUniOrgaPub[data-model=DES_UNIORG]").typeahead("destroy").typeahead({
        source: function (query, process)
        {
            var objEnEstorg = new Object();
            if (noEsVacio(query)) {
                var strRequest = $.trim(query);
                var strDesOficina = normalize(replaceAll(strRequest, " ", "%"));
                objEnEstorg.DES_SUBOFI = strDesOficina;

                cargarDatosWebApi({
                    parametros: objEnEstorg,
                    nombreObjeto: "objEnEstorg",
                    callBack: function (data)
                    {
                        if (noEsVacio(data.length)) {
                            process($.map(data, function (item)
                            {
                                return {
                                    name: item.DES_SUBOFI + " - " + item.ABR_SUBOFI,
                                    value: item.DES_SUBOFI,
                                    id: item.ID_SUBOFI + "|" + item.ID_SUB
                                }
                            }));
                        };
                    },
                    url: "Tupa/listarOficinas",
                    strRuta: strRutaAplicacionMaster
                });
            };
        },
        autoSelect: true,
        minLength: 3,
        items: 5,
        templates: {
            empty: '<div class="empty-message">Sin coincidencias</div>'
        }
    });
    $("#ibBuscarTupaConceptoPub").click(function ()
    {
        fnCargarListaTupaConcepto();
    })
    $("#ibLimpiarTupaConceptoPub").click(function () { })
    fnCargarListaTupaConcepto();
})


function fnCargarListaTupaConcepto()
{
    var objEnTupaConcep = Object();
    var objEnEstorg = new Object();
    var strOficinaPivot = new String();

    objEnTupaConcep.COD_TUPA = $("#divConsuTupaConcepPublico input[data-model='COD_TUPA']").val();
    objEnTupaConcep.DES_NOM = $("#divConsuTupaConcepPublico input[data-model='DES_NOM']").val();
    objEnTupaConcep.DES_TUPA_CONCEP = $("#divConsuTupaConcepPublico input[data-model='DES_CONCEPTO']").val();
    objEnTupaConcep.NUM_DIAS = "";
    
    if ($("#divConsuTupaConcepPublico input[data-key='hfIdDesUniOrgPub']").typeahead("getActive") != null) {
        strPivotOficina = $("#divConsuTupaConcepPublico input[data-key='hfIdDesUniOrgPub']").typeahead("getActive").id;
    } else {
        strPivotOficina = "";
    }
    
    objEnEstorg.ID_SUB = strPivotOficina.split("|")[1];
    objEnEstorg.ID_SUBOFI = strPivotOficina.split("|")[0];


    var strDesOficina = $("#divConsuTupaConcepPublico input[data-model='DES_UNIORG']").val();
    
    if (!noEsVacio(strDesOficina)) {
        objEnEstorg.ID_SUB = -1;
        objEnEstorg.ID_SUBOFI = "";
    }

    objEnTupaConcep.enEstorg = objEnEstorg;

    cargarDatosWebApi({
        parametros: objEnTupaConcep,
        nombreObjeto: "objEnTupaConcep",
        callBack: function (lstData)
        {
            cargarGrillaTupaConcepPub(lstData);

            if (lstData.length == 0) {
                BootstrapDialog.alert('No se encontraron datos para la consulta');
            }
        },
        url: "Tupa/ListarTupaConcep",
        strRuta: strRutaAplicacionMaster
    });
}

function validarFiltroBusqueda()
{    
    if (noEsVacio($("#divConsuTupaConcepPublico input[data-model='COD_TUPA']").val())) {
        return false;
    } 
    if (noEsVacio($("#divConsuTupaConcepPublico input[data-model='DES_NOM']").val())) {
        return false;
    } 
    if (noEsVacio($("#divConsuTupaConcepPublico input[data-model='DES_CONCEPTO']").val())) {
        return false;
    }
    if (noEsVacio($("#divConsuTupaConcepPublico input[data-model='DES_UNIORG']").val())) {
        return false;
    }         
}
function cargarGrillaTupaConcepPub(myData)
{
    var arrLstData = new Array();
    var arrLstDataServExclu = new Array();

    $.each(myData, function (index, value)
    {        
        if (value.ID_TUPA != 64 && value.ID_TUPA != 65) {
            arrLstData.push(value);
        }
        else {
            arrLstDataServExclu.push(value);
        }
    });
    
    $("#tblConsTupaConcepPub").jqGrid('clearGridData');
    $("#tblConsTupaConcepPub").jqGrid('setGridParam', { data: arrLstData });
    $("#tblConsTupaConcepPub").trigger('reloadGrid');

    $("#tblConsTupaConcepPub").jqGrid({
        data: arrLstData,
        styleUI: 'Bootstrap',
        datatype: "local",
        colModel: [
            { label: 'Código', name: "COD_TUPA", align: "center", width: 90, sortable: false },
            { label: 'Tupa', name: "DES_NOM", align: "left", width: 850, sortable: false, cellattr: function (rowId, tv, rawObject, cm, rdata) { return 'style="white-space: pre-line;"' } },
            { label: 'Concepto', name: "DES_TUPA_CONCEP", align: "center", width: 800, sortable: false, formatter: formatterDesConcepto, cellattr: function (rowId, tv, rawObject, cm, rdata) { return 'style="white-space: pre-line;"' } },
            { label: 'Unidad Orgánica', name: "enEstorg.DES_SUBOFI", align: "center", width: 350, sortable: false, formatter: formatterDesOficina },
            { label: 'Costo (S/)', name: "COSTO_TUPA", align: "center", width: 120, sortable: false, formatter: 'currency', formatoptions: { decimalSeparator: ",", thousandsSeparator: ",", decimalPlaces: 2, prefix: "S/. "} },
            { label: 'Plazo', name: "NUM_DIAS", align: "center", width: 120, sortable: false, formatter: formatterDesNumDias },
            { label: 'Detalles', name: "REQUI", align: "center", width: 100, sortable: false, formatter: formatterImgRequisitos },
            { label: '', name: 'FLG_EST', hidden: true }            
            ],
        rownumbers: false,
        viewrecords: true,
        iconSet: "fontAwesome",
        //caption: "Listado de tupas",
        autowidth: true,
        gridview: true,
        rowNum: 10,
        height: "auto",
        width: 'auto',
        rowList: [10, 25, 50, 75, 100],
        gridview: true,
        headertitles: true,
        pager: "#divPager_ConsTupaConcepPub",
        gridComplete: function () {
            var rows = $("#tblConsTupaConcepPub").getDataIDs();
            for (var i = 0; i < rows.length; i++) {
                var estadoTupa = $("#tblConsTupaConcepPub").getCell(rows[i], "FLG_EST");
                if (estadoTupa == 0) {
                    $("#tblConsTupaConcepPub").jqGrid('setRowData', rows[i], false, { color: 'red' });
                }
            }
        }
    });
    jqGridResponsive($(".divtblConsTupaConcepPub"));

    $("#tblConsTupaConcepPub").jqGrid('setLabel', 'COD_TUPA', 'Código', { 'text-align': 'center' }, { 'title': 'Código' });
    $("#tblConsTupaConcepPub").jqGrid('setLabel', 'DES_NOM', 'Tupa', { 'text-align': 'center' }, { 'title': 'Tupa' });
    $("#tblConsTupaConcepPub").jqGrid('setLabel', 'DES_TUPA_CONCEP', 'Concepto', { 'text-align': 'center' }, { 'title': 'Concepto' });
    $("#tblConsTupaConcepPub").jqGrid('setLabel', 'enEstorg.DES_SUBOFI', 'Unidad organica', { 'text-align': 'center' }, { 'title': 'Unidad organica' });
    $("#tblConsTupaConcepPub").jqGrid('setLabel', 'COSTO_TUPA', 'Costo en (S/)', { 'text-align': 'center' }, { 'title': 'Costo en (S/)' });
    $("#tblConsTupaConcepPub").jqGrid('setLabel', 'NUM_DIAS', 'Plazo', { 'text-align': 'center' }, { 'title': 'Plazo' });
    $("#tblConsTupaConcepPub").jqGrid('setLabel', 'REQUI', 'Detalles', { 'text-align': 'center' }, { 'title': 'Detalles' });
    
    var $grid = $("#tblConsTupaConcepPub"), newWidth = $grid.closest(".ui-jqgrid").parent().width();
    $grid.jqGrid("setGridWidth", newWidth, true);

    if (typeof validarFiltroBusqueda() === "undefined") {    
        $("#tblConsTupaServExcPub").jqGrid('clearGridData');
        $("#tblConsTupaServExcPub").jqGrid('setGridParam', { data: arrLstDataServExclu });
        $("#tblConsTupaServExcPub").trigger('reloadGrid');

        $("#tblConsTupaServExcPub").jqGrid({
            data: arrLstDataServExclu,
            styleUI: 'Bootstrap',
            datatype: "local",
            colModel: [
            { label: 'Código', name: "COD_TUPA", align: "center", width: 90, sortable: false },
            { label: 'Tupa', name: "DES_NOM", align: "left", width: 850, sortable: false, cellattr: function (rowId, tv, rawObject, cm, rdata) { return 'style="white-space: pre-line;"' } },
            { label: 'Concepto', name: "DES_TUPA_CONCEP", align: "center", width: 800, sortable: false, formatter: formatterDesConcepto, cellattr: function (rowId, tv, rawObject, cm, rdata) { return 'style="white-space: pre-line;"' } },
            { label: 'Unidad Orgánica', name: "enEstorg.DES_SUBOFI", align: "center", width: 350, sortable: false, formatter: formatterDesOficina },
            { label: 'Costo (S/)', name: "COSTO_TUPA", align: "center", width: 120, sortable: false, formatter: 'currency', formatoptions: { decimalSeparator: ",", thousandsSeparator: ",", decimalPlaces: 2, prefix: "S/. "} },
            { label: 'Plazo', name: "NUM_DIAS", align: "center", width: 120, sortable: false, formatter: formatterDesNumDias },
            { label: 'Detalles', name: "REQUI", align: "center", width: 100, sortable: false, formatter: formatterImgRequisitos },
            { label: '', name: 'FLG_EST', hidden: true }
            ],
            rownumbers: false,
            viewrecords: true,
            caption: "Servicios exclusivos",
            rowNum: 10,
            height: "auto",
            rowList: [10, 25, 50, 75, 100],
            gridview: true,
            headertitles: true,
            pager: "#divPager_ConsTupaServExcPub",
            gridComplete: function () {
                var rows = $("#tblConsTupaServExcPub").getDataIDs();
                for (var i = 0; i < rows.length; i++) {
                    var estadoTupa = $("#tblConsTupaServExcPub").getCell(rows[i], "FLG_EST");
                    if (estadoTupa == 0) {
                        $("#tblConsTupaServExcPub").jqGrid('setRowData', rows[i], false, { color: 'red' });
                    }
                }
            }
        });
        $("#tblConsTupaServExcPub").jqGrid('setLabel', 'COD_TUPA', 'Código', { 'text-align': 'center' }, { 'title': 'Código' });
        $("#tblConsTupaServExcPub").jqGrid('setLabel', 'DES_NOM', 'Tupa', { 'text-align': 'center' }, { 'title': 'Tupa' });
        $("#tblConsTupaServExcPub").jqGrid('setLabel', 'DES_TUPA_CONCEP', 'Concepto', { 'text-align': 'center' }, { 'title': 'Concepto' });
        $("#tblConsTupaServExcPub").jqGrid('setLabel', 'enEstorg.DES_SUBOFI', 'Unidad organica', { 'text-align': 'center' }, { 'title': 'Unidad organica' });
        $("#tblConsTupaServExcPub").jqGrid('setLabel', 'COSTO_TUPA', 'Costo en (S/)', { 'text-align': 'center' }, { 'title': 'Costo en (S/)' });
        $("#tblConsTupaServExcPub").jqGrid('setLabel', 'NUM_DIAS', 'Plazo', { 'text-align': 'center' }, { 'title': 'Plazo' });
        $("#tblConsTupaServExcPub").jqGrid('setLabel', 'REQUI', 'Detalles', { 'text-align': 'center' }, { 'title': 'Detalles' });

        var $grid = $("#tblConsTupaServExcPub"), newWidth = $grid.closest(".ui-jqgrid").parent().width();
        $grid.jqGrid("setGridWidth", newWidth, true);   
    }    
};
function formatterDesNumDias(cellvalue, options, rowObject)
{
    return rowObject.NUM_DIAS + (' Días Hábiles');
}
function formatterDesConcepto(cellvalue, options, rowObject)
{
    var strHtmlLink = new String();
    //strHtmlLink = "<b>Para iniciar su trámite.</b>&nbsp<span onClick='fnRedirectPage(" + JSON.stringify(rowObject) + ")' style='font-size:14px;color:red;cursor: pointer'>INGRESE AQUÍ</span>"    
    strHtmlLink = "<b>Para iniciar su trámite.</b>&nbsp<a style='font-size:14px;color:red;' target='_blank' href='http://ventanillavirtual.mincetur.gob.pe?idTupa=" + rowObject.ID_TUPA +"'>INGRESE AQUÍ";    
    return (rowObject.DES_TUPA_CONCEP == null ? "--" : rowObject.DES_TUPA_CONCEP + "</br>" +  strHtmlLink);
}
function formatterDesOficina(cellvalue, options, rowObject)
{
    var objEnEstorg = rowObject.enEstorg;
    var strDesOficina = objEnEstorg.DES_SUBOFI;
    return (strDesOficina == null ? "--" : strDesOficina);
}
function formatterImgRequisitos(cellvalue, options, rowObject)
{    
    var strHtml = new String();
    if (rowObject.FLG_EST != "0") {
        strHtml = "<a title='Consultar detalles' onClick='fnConsRequisitoPublic(" + JSON.stringify(rowObject) + ")'><i class='glyphicon glyphicon-list' style='font-size:18px;color:#840404;cursor: pointer'></i></a>&nbsp;"
    }
    return strHtml;
};

function fnConsRequisitoPublic(rowObject)
{
    //console.log(rowObject);
    /*var objEnTupaConcep = {
        ID_TUPA: rowObject.ID_TUPA,
        ID_TUPA_CONCEPTO: rowObject.ID_TUPA_CONCEPTO,
        COD_TUPA: rowObject.COD_TUPA
        /*DES_BASE_LEGAL: rowObject.DES_BASE_LEGAL,
        DES_TUPA_CONCEP: rowObject.DES_TUPA_CONCEP, 
        FEC_FIN_VIG:rowObject.FEC_FIN_VIG*/  
    //};
    //console.log(objEnTupaConcep);
    /*var dialog = new BootstrapDialog({
        title: 'Detalle',
        message: function (dialogRef)
        {
            var $message = $("<div id='divVisorRequisitos'></div>");
            $.ajax({
                url: strRutaAplicacionMaster + "Publico/Tupa/visorRequisitos",
                type: 'POST',
                data: objEnTupaConcep,
                context: {
                    theDialogWeAreUsing: dialogRef
                },
                success: function (content)
                {
                    this.theDialogWeAreUsing.setMessage(content);
                }
            });
            return $message;
        }
    });
    dialog.open();*/
    
    BootstrapDialog.show({
        type: BootstrapDialog.TYPE_DEFAULT,
        title: '<i class = "glyphicon glyphicon-list"> </i> Detalles',        
        closable: true,
        draggable: true,
        size: BootstrapDialog.SIZE_WIDE,
        //message: $("<div id='divVisorRequisitos'></div>").load(strRutaAplicacionMaster + "Publico/Tupa/visorRequisitos?objEnTupaConcep=" + JSON.stringify(objEnTupaConcep))
        message: $("<div id='divVisorRequisitos' style='height:auto'></div>").load(strRutaAplicacionMaster + "Publico/Tupa/visorRequisitos?ID_TUPA=" + rowObject.ID_TUPA + "&ID_TUPA_CONCEPTO=" + rowObject.ID_TUPA_CONCEPTO + "&COD_TUPA=" + rowObject.COD_TUPA)
    });

    /*BootstrapDialog.alert({
        title: 'Alerta de sistema',
        message: '',
        type: BootstrapDialog.TYPE_PRIMARY,
        closable: true,
        draggable: true,
        buttonLabel: 'Cerrar',
        callback: function (result)
        {
            
        }
    });*/
} 