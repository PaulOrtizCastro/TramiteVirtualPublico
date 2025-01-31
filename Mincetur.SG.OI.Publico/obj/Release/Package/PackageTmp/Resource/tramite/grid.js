/**
* Contiene las funciones necesarias para cargar una grilla
* @namespace
* @name grilla
*/
/**
* Clase columna de grilla
* @memberof grilla
* @class Clase que contiene los parámetros para la creación de la grilla
* @property {string} headerName Título del encabezado de columna
* @property {string} name Nombre del campo de datos que se llenará
* @property {string} [index] Nombre del campo de datos por el cual se ordenará
* @property {string} [style] Estilos de la columna ejm. width: 500px
* @property {string} [type] Tipo de datos
* @property {boolean} [custom=false] Si es verdadero, se debe generar el html del contenido de las celdas manualmente
* @name parametrosColumna
*/
/**
* Clase que contiene la configuración para la grilla
* @memberof grilla
* @class Clase que contiene los parámetros para la creación de la grilla
* @property {Object[]} data Los datos en JSON
* @property {string} idGrid Es el id del div donde estará el grid
* @property {grilla.parametrosColumna} arrColumnas Lista de cada columna del grid
* @property {function} [onRowDataBound] Función que se ejecuta cuando se pinta cada fila
* @property {function} [onClick] Función que se ejecuta cuando se se hace click en un fila
* @property {function} [onDblClick] Función que se ejecuta cuando se se hace doble click en un fila
* @property {function} [onComplete] Función que se ejecuta cuando la grilla ya está renderizada
* @property {string} [botonImprimir] Id del botón que mandará a imprimir
* @property {string} [botonExportarExcel] Id del botón que mandará a exportar a excel
* @property {string} [divMensaje] Id del div que mostrará el mensaje en caso lo hubiera
* @property {boolean} [enablePaginacion=true] Si es verdadero se habilita
* @name parametrosGrilla
*/
/**
* Carga la grilla en un div
* @memberof grilla
* @param {grilla.parametrosGrilla} objGrid Objeto de parámetros
* @param {string} [strKey] Campo a ordenar
* @param {string} [strOrder] Ascendente o descendente
*/
function cargarGrid(objGrid, strKey, strOrder) {
    var defaultsGrid = {
        idGrid: "",
        data: {},
        arrColumnas: {},
        onRowDataBound: function () { },
        onClick: function () { },
        onDblClick: function () { },
        onComplete: function () { },
        gridComplete: function () { },
        botonImprimir: "",
        botonExportarExcel: "",
        divMensaje: "",
        enablePaginacion: true,
        enableResumen: false,
        enableDelete: false,
        enableUpdate: false,
        onDelete: function () { },
        onUpdate: function () { }
    };
    var defaults = {
        pageSize: ((objGrid.enablePaginacion == false) ? Number.MAX_VALUE : (objGrid.rowNum) ? objGrid.rowNum : 15),
        currentPage: 0,
        maxPages: 0
    };
    var objColumn = new Object();
    var strHtmlCabecera = new String();
    var strHtml = new String();
    var strhtmlCeldas = new String();
    var flgFilaAlterna = false;
    var objGrid = $.extend(defaultsGrid, objGrid);
    var optionsPagina = $.extend(defaults, objGrid.optionsPagina);
    var intTotalRegistros = objGrid.data.length;
    var intRestoUltimaPag = intTotalRegistros % optionsPagina.pageSize;
    var intPivotIni = optionsPagina.currentPage * optionsPagina.pageSize;
    var intPivotFin = new Number();
    var strClass = new String();
    var strHtmlDobleClic = new String();
    var objDivGrid = $("#" + objGrid.idGrid);
    var i = 0;
    var k = 0;
    var strHtmlPagina = new String();
    var objFila = new Object();
    var objDataPivot = new Object();
    var strFunction = new String();
    optionsPagina.maxPages = Math.ceil(intTotalRegistros / optionsPagina.pageSize);
    if (objGrid.enableDelete) {
        strHtmlCabecera += "<td></td>";
    };
    if (objGrid.enableUpdate) {
        strHtmlCabecera += "<td></td>";
    };
    for (var j = 0; j < objGrid.arrColumnas.length; j++) {
        strHtmlCabecera += "<td " + ((strKey == objGrid.arrColumnas[j].name) ? "class='" + strOrder + "'" : "") + " style='" + objGrid.arrColumnas[j].style + "' data-field='" + objGrid.arrColumnas[j].name + "' data-type='" + objGrid.arrColumnas[j].type + "'>" + objGrid.arrColumnas[j].headerName + "</td>";
    };
    strHtmlCabecera = "<tr class='grid_header imagenBoton'>" + strHtmlCabecera + "</tr>";
    if ((optionsPagina.maxPages > 0) && (optionsPagina.currentPage <= optionsPagina.maxPages) && (optionsPagina.currentPage >= 0)) {
        if ((optionsPagina.currentPage == optionsPagina.maxPages - 1) && (intRestoUltimaPag > 0)) intPivotFin = intPivotIni + intRestoUltimaPag; else intPivotFin = intPivotIni + optionsPagina.pageSize;
        for (var i = intPivotIni; i < intPivotFin; i++) {
            k += 1;
            objDataPivot = objGrid.data[i];
            if (flgFilaAlterna) strClass = "grid_row"; else strClass = "grid_alternating";
            objFila.data = objDataPivot;
            objFila.className = strClass;
            objFila.id = k;
            objGrid.onRowDataBound(objFila, objGrid.arrColumnas);
            if (objGrid.enableDelete) {
                strhtmlCeldas += "<td class='eliminar' title='Haga clic aquí para eliminar registro'></td>";
            };
            if (objGrid.enableUpdate) {
                strhtmlCeldas += "<td class='modificar' title='Haga clic aquí para modificar registro'></td>";
            };
            for (var j = 0; j < objGrid.arrColumnas.length; j++) {
                if (objGrid.arrColumnas[j].custom) {
                    strhtmlCeldas += "<td data-field='" + objGrid.arrColumnas[j].name + "' style='" + objGrid.arrColumnas[j].style + "'>" + objGrid.arrColumnas[j].template + "</td>";
                } else {
                    if (objGrid.arrColumnas[j].formatter == 'date') {
                        var boolHora = true;
                        if (objGrid.arrColumnas[j].sinHora) boolHora = false; else boolHora = true;
                        strhtmlCeldas += "<td data-field='" + objGrid.arrColumnas[j].name + "' style='" + objGrid.arrColumnas[j].style + "'>" + traeFechaJSON(validaNulosJSON(objGrid.data[i], objGrid.arrColumnas[j].name), boolHora) + "</td>";
                    //} else if (objGrid.arrColumnas[j].type == "date" && objGrid.arrColumnas[j].sinHora && noEsVacio(validaNulosJSON(objGrid.data[i], objGrid.arrColumnas[j].name)) && validaNulosJSON(objGrid.data[i], objGrid.arrColumnas[j].name).length > 10) {                        
                    //    strhtmlCeldas += "<td data-field='" + objGrid.arrColumnas[j].name + "' style='" + objGrid.arrColumnas[j].style + "'>" + validaNulosJSON(objGrid.data[i], objGrid.arrColumnas[j].name).substr(0, 10) + "</td>";
                    } else {
                        strhtmlCeldas += "<td data-field='" + objGrid.arrColumnas[j].name + "' style='" + objGrid.arrColumnas[j].style + "'>" + validaNulosJSON(objGrid.data[i], objGrid.arrColumnas[j].name) + "</td>";
                    };
                };
            };
            strHtml += "<tr data-id='" + i + "' onmouseover='this.className=\"grid_resaltado\";' onmouseout='this.className=\"" + objFila.className + "\";' class='" + objFila.className + "' style='cursor:pointer'>" + strhtmlCeldas + "</tr>";
            flgFilaAlterna = !flgFilaAlterna;
            strhtmlCeldas = "";
        };
        if (objGrid.enableResumen) {
            var intPosCol = -1;
            var strValor = new String();
            var strEstiloPivot = new String;
            for (var i = intPivotIni; i < intPivotFin; i++) {
                for (var j = 0; j < objGrid.arrColumnas.length; j++) {
                    if (objGrid.arrColumnas[j].resumen == "sum") {
                        if (intPosCol == -1) intPosCol = j;
                            objGrid.arrColumnas[j].total = ((typeof objGrid.arrColumnas[j].total == "undefined") ? 0 : objGrid.arrColumnas[j].total) + validaNulosJSON(objGrid.data[i], objGrid.arrColumnas[j].name);
                    }
                    else
                        objGrid.arrColumnas[j].total = "";                
                };
            };
            if (objGrid.enableDelete) {
                strhtmlCeldas += "<td></td>";
            };
            if (objGrid.enableUpdate) {
                strhtmlCeldas += "<td></td>";
            };
            for (var j = 0; j < objGrid.arrColumnas.length; j++) {
                if (j == intPosCol - 1) {
                    strValor = "Total: ";
                    strEstiloPivot = "text-align: right;";
                } else {
                    strValor = objGrid.arrColumnas[j].total;
                    strEstiloPivot = objGrid.arrColumnas[j].style;
                };
                strhtmlCeldas += "<td style='" + strEstiloPivot + "'>" + strValor + "</td>";
            };
            strHtml += "<tr class='grid_footer'>" + strhtmlCeldas + "</tr>";
        };
        objDivGrid.html("<table style='width:100%' cellspacing='0'>" + strHtmlCabecera + strHtml + "</table>");
        if ((objGrid.enablePaginacion == true) && (optionsPagina.maxPages > 1)) {
            strHtmlPagina += "<td>Registros: " + intTotalRegistros + "<td/>";
            strHtmlPagina += "<td>P&aacute;gina " + (optionsPagina.currentPage + 1) + " de " + optionsPagina.maxPages + "<td/><td>";
            if (optionsPagina.currentPage > 0) strHtmlPagina += "<span class='inicio imagenBoton'></span>";
            if (optionsPagina.currentPage > 0) strHtmlPagina += "<span class='anterior imagenBoton'></span>";
            if (optionsPagina.currentPage < optionsPagina.maxPages - 1) strHtmlPagina += "<span class='siguiente imagenBoton'></span>";
            if (optionsPagina.currentPage < optionsPagina.maxPages - 1) strHtmlPagina += "<span class='fin imagenBoton'></span></td>";
            strHtmlPagina += "<td>Ir a p&aacute;gina <input type='text' class='paginaActual numerica' value='" + (optionsPagina.currentPage + 1) + "'/>";
            strHtmlPagina += "<span class='irPagina imagenBoton'></span></td>";
            objDivGrid.append("<table style='width:100%' cellpadding='3' cellspacing='0'><tr class='grid_pager'>" + strHtmlPagina + "</tr></table>");
            fnValidarSoloNumero(objGrid.idGrid);
            objGrid.optionsPagina = optionsPagina;
            configuraAccionesPagina(objGrid);
        };
        configuraSortEncabezado(objGrid);
        objDivGrid.find("tr").not(":first").not(".grid_pager").each(function () {
            var objTr = $(this);
            objTr.dblclick(function () {
                objGrid.onDblClick(objGrid.data[objTr.attr("data-id")]);
            });
            objTr.click(function () {
                objGrid.onClick(objGrid.data[objTr.attr("data-id")]);
            });
            objTr.find(".eliminar").click(function () {
            if (confirm("¿Está seguro que desea eliminar el registro?"))
                objGrid.onDelete(objGrid.data[objTr.attr("data-id")]);
            });
            objTr.find(".modificar").click(function () {
                objGrid.onUpdate(objGrid.data[objTr.attr("data-id")]);
            });
        });
        objDivGrid.show();
        objGrid.onComplete();
        if (noEsVacio(objGrid.botonImprimir)) {
            $("#" + objGrid.botonImprimir).unbind('click');
            $("#" + objGrid.botonImprimir).click(function () {
                imprimirGrid(objGrid, "print");
            })
        };
        if (noEsVacio(objGrid.botonExportarExcel)) {
            $("#" + objGrid.botonExportarExcel).unbind('click');
            $("#" + objGrid.botonExportarExcel).click(function () {
                imprimirGrid(objGrid, "excel");
            })
        };
        objGrid.gridComplete({ idGrid: objGrid.idGrid, data: objGrid.data, arrColumnas: objGrid.arrColumnas });
    } else {
        objDivGrid.hide();
    };
};
/**
* Configura el ordenamiento en la grilla
* @private
* @memberof grilla
* @param {grilla.parametrosGrilla} objGrid Objeto de parámetros
*/
function configuraSortEncabezado(objGrid) {
    var strClassActual = new String();
    var strClassNuevo = new String();
    var strOrderPivot = "asc";
    var lstDataPivot = new Object();
    var objTd = new Object();
    $("#" + objGrid.idGrid + " .grid_header").find("td").each(function () {
        if ($(this).attr("data-type") != 'none') {
            $(this).click(function () {
                objTd = $(this);
                strClassActual = objTd.attr("class");
                if (objTd.hasClass("asc")) {
                    strClassActual = "asc";
                    strClassNuevo = "desc";
                    strOrderPivot = "desc"
                }
                else {
                    strClassActual = "desc";
                    strClassNuevo = "asc";
                    strOrderPivot = "asc";
                };
                objTd.removeClass(strClassActual);
                objTd.addClass(strClassNuevo);
                objGrid.data = sortJsonByKeyandOrder(objGrid.data, objTd.attr("data-field"), objTd.attr("data-type"), strOrderPivot);
                cargarGrid(objGrid, objTd.attr("data-field"), strOrderPivot);
            });
        };
        $(this).mouseover(function () {
            $(this).addClass("grid_header_resaltado");
        });
        $(this).mouseout(function () {
            $(this).removeClass("grid_header_resaltado");
        });
    });
};
/**
* Configura la paginación de la grilla
* @private
* @memberof grilla
* @param {grilla.parametrosGrilla} objGrid Objeto de parámetros
*/
function configuraAccionesPagina(objGrid) {
    $("#" + objGrid.idGrid + " .siguiente").click(function () {
        objGrid.optionsPagina.currentPage = objGrid.optionsPagina.currentPage + 1;
        cargarGrid(objGrid);
    });
    $("#" + objGrid.idGrid + " .anterior").click(function () {
        objGrid.optionsPagina.currentPage = objGrid.optionsPagina.currentPage - 1;
        cargarGrid(objGrid);
    });
    $("#" + objGrid.idGrid + " .inicio").click(function () {
        objGrid.optionsPagina.currentPage = 0;
        cargarGrid(objGrid);
    });
    $("#" + objGrid.idGrid + " .fin").click(function () {
        objGrid.optionsPagina.currentPage = objGrid.optionsPagina.maxPages - 1;
        cargarGrid(objGrid);
    });
    $("#" + objGrid.idGrid + " .paginaActual").keypress(function (e) {
        if (e.which == 13) {
            $("#" + objGrid.idGrid + " .irPagina").click();
            return false;
        }
    });
    $("#" + objGrid.idGrid + " .irPagina").click(function () {
        var intPaginaPivot = $("#" + objGrid.idGrid + " .paginaActual").val() - 1;
        objGrid.optionsPagina.currentPage = intPaginaPivot;
        if ((intPaginaPivot >= 0) && (intPaginaPivot <= objGrid.optionsPagina.maxPages)) {
            cargarGrid(objGrid);
        }
        else {
            mensajeSistema(objGrid.divMensaje, "2", "N&uacute;mero de p&aacute;gina correcto", "", "");
        };
    });
};
/**
* Configura el ordenamiento
* @private
* @memberof grilla
* @param {Object[]} listTemp Lista de objetos JSON
* @param {string} key Campo a ordenar
* @param {string} desc --
* @param {string} way Ascendente o descendente
*/
function sortJsonByKeyandOrder(listTemp, key, desc, way) {
    return listTemp.sort(function (a, b) {
        var x = a[key];
        var y = b[key];
        if (desc == 'str') {
            if (way === 'asc') {
                return x.localeCompare(y);
            };
            if (way === 'desc') {
                return y.localeCompare(x);
            }
        } else {
            if (way === 'asc') { return ((x < y) ? -1 : ((x > y) ? 1 : 0)); };
            if (way === 'desc') { return ((x > y) ? -1 : ((x < y) ? 1 : 0)); };
        };
    });
};

function cargarDataTables(strIdDiv, lstData, lstColumnas, boolPaginado, onRowDataBound) {
    var objDiv = $("#" + strIdDiv);
    var objTable = objDiv.find("table").filter(".display");
    objTable.remove();
    objDiv.empty();
    objTable = document.createElement("table");
    objTable.setAttribute("style", "width:100%");
    objDiv.prepend($(objTable));
    var table = $(objTable).DataTable({
        "destroy": true,
        "autoWidth": false,
        "dom": '<"top">rt<"bottom"' + ((boolPaginado) ? "ip" : "") + '><"clear">',
        "data": lstData,
        "pageLength": 50,
        "paging": boolPaginado,
        "ordering": true,
        "language": {
            "lengthMenu": "Muestra _MENU_ registros por página",
            "zeroRecords": "No se encuentran datos",
            "info": "Página _PAGE_ de _PAGES_",
            "infoEmpty": "No se encuentran datos",
            "infoFiltered": "(Con filtro de _MAX_ total de registros)",
            "search": "Buscar:",
            "searchPlaceholder": "Buscar",
            "paginate": {
                "first": "Inicio",
                "last": "Fin",
                "previous": "Anterior",
                "next": "Siguiente"
            }
        },
        "fnCreatedRow": onRowDataBound,
        "columns": lstColumnas
    });
    return table;
};