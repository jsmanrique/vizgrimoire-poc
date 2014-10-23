/* ========================================================================
 * script.js v0.0.1
 * Main JS
 * ========================================================================
 * Copyright 2014 Jose Manrique Lopez de la Fuente
 * Licensed under MIT (../LICENSE)
 * ======================================================================== */


$(document).ready(function(){

  Data.init();

  var gwidgets = $('.grimoire-widget');

  $.each(gwidgets, function(){
    var dt = $(this).attr('data-type');
    var ds = $(this).attr('data-source');
    switch (dt) {
      case 'chart':
        // console.log(ds);
        var series = Data.getSeries(ds);
        Viz.drawEvolChart($(this),series);
        break;
      case 'tops':
        // console.log(ds);
        var tops = Data.getTops(ds);
        Viz.showTops($(this), tops);
        break;
      case 'timezones':
        var serie = Data.getTzData(ds);
        Viz.drawTimezones($(this), serie);
        break;
      case 'demographic':
        var series = Data.getDemog(ds);
        Viz.drawDemographic($(this), series);
        break;
      case 'trend':
        var series = Data.getTrends(ds);
        Viz.showTrends($(this), series);
    }
  });

});
