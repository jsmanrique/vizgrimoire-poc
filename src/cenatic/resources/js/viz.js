/* ========================================================================
 * viz.js v0.0.1
 * Visualization library
 * ========================================================================
 * Copyright 2014 Jose Manrique Lopez de la Fuente
 * Licensed under MIT (../LICENSE)
 * ======================================================================== */

var Viz = (function () {

  var drawEvolChart = function (container, series) {
    // console.log(series.length);

    var row = $('<div/>').addClass('row');

    if (series.length > 1) {
      var chart_area = $('<div/>').addClass('col-md-10');
      var options_area = $('<div/>').addClass('col-md-2');

      row.append(chart_area);
      row.append(options_area);

      var chart_div = $('<div/>').addClass('chart');
      var y_axis_div = $('<div/>').addClass('y_axis');
      var slider_div = $('<div/>').addClass('slider');
      var legend_div = $('<div/>').addClass('legend');
      var form = "<form class='offset_form toggler'>"+
        "<input type='radio' name='offset' value='lines' checked>"+
        "<label class='lines'>values</label><br>"+
        "<input type='radio' name='offset' value='zero'>"+
        "<label class='stack'>stack</label><br>"+
        "<input type='radio' name='offset' value='expand'>"+
        "<label class='pct'>% dist.</label></form>";

      chart_area.append(y_axis_div);
      chart_area.append(chart_div);
      chart_area.append(slider_div);
      options_area.append(legend_div);
      options_area.append(form);
    } else {
      var chart_area = $('<div/>').addClass('col-md-12');

      row.append(chart_area);

      var chart_div = $('<div/>').addClass('chart');
      var y_axis_div = $('<div/>').addClass('y_axis');
      var slider_div = $('<div/>').addClass('slider');

      chart_area.append(y_axis_div);
      chart_area.append(chart_div);
      chart_area.append(slider_div);
    };

    container.html(row);

    var palette = new Rickshaw.Color.Palette({scheme: 'munin'});

    var tseries = [];

    for (i = 0; i < series.length; i++) {
      var s = {name: series[i].name, color: palette.color(), data: series[i].serie};
      tseries.push(s);
    };

    var graph = new Rickshaw.Graph ({
      element: container.find('.chart')[0],
      width: container.find('.chart').width()*0.9,
      height: container.find('.chart').width()*0.35,
      preserve: true,
      renderer: 'line',
      series: tseries
    });

    var axes = new Rickshaw.Graph.Axis.Time( { graph: graph } );

    var yAxis = new Rickshaw.Graph.Axis.Y({
        orientation: 'left',
        element: container.find('.y_axis')[0],
        graph: graph
    });

    var hoverDetail = new Rickshaw.Graph.HoverDetail( {
        graph: graph,
        xFormatter: function(x) {
           var d = new Date(x*1000);
           var months = ['Jan', 'Feb', 'Mar', 'Apr', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
           return(months[d.getMonth()] +' / '+d.getFullYear());
        },
        yFormatter: function(y) {
          if (graph.offset == 'expand') {
            return Math.floor(y*100)+'%'
          } else {
            return Math.floor(y)
          }
        }
    } );

    if (series.length > 1) {
      var legend = new Rickshaw.Graph.Legend({
          element: container.find('.legend')[0],
          graph: graph
      });

      var shelving = new Rickshaw.Graph.Behavior.Series.Toggle( {
        graph: graph,
        legend: legend
      } );

      var highlight = new Rickshaw.Graph.Behavior.Series.Highlight( {
        graph: graph,
        legend: legend
      } );

      var order = new Rickshaw.Graph.Behavior.Series.Order( {
        graph: graph,
        legend: legend
      } );

      var offsetForm = container.find('.offset_form')[0];

      offsetForm.addEventListener('change', function(e) {
              var offsetMode = e.target.value;
              // console.log(offsetMode);
              if (offsetMode == 'lines') {
                      graph.setRenderer('line');
                      graph.offset = 'zero';
              } else {
                      graph.setRenderer('stack');
                      graph.offset = offsetMode;
              }

              graph.render();

      }, false);
    }

    graph.render();

    var preview = new Rickshaw.Graph.RangeSlider.Preview({
      graph: graph,
      element: container.find('.slider')[0]
    });

    $(window).resize(function() {
      graph.configure({
        width: container.find('.chart').width()*0.9,
        height: container.find('.chart').width()*0.35
      });

      graph.render();

    });
  };

  var showTops = function (container, serie) {
    // console.log(container);
    var table = $('<table/>').addClass('table');
    for (var i = 0 ; i < serie.length ; i++){
      var tr = $('<tr/>');
      d ='<td>'+(i+1)+'.</td><td><a href="/contributors/'+serie[i].id+'.html">'+serie[i].name+'</a></td><td>'+serie[i].total+'</td>';
      tr.html(d);
      table.append(tr);
    }
    // console.log(table);
    container.html(table);
    // return table;
  };
  
  var showTrends = function (container, series) {
    console.log(series);
    
    var table = $('<table/>').addClass('table').addClass('table-condensed').addClass('table-stripped');
    var th = $('<tr/>');
    th.html('<th></th><th>Last 365d</th><th>Last 30d</th><th>Last 7d</th>');
    table.append(th);
    for (var i = 0 ; i < series.length ; i++){
      var tr = $('<tr/>');
      var data365d = series[i][1].delta+'<br/><span class="'+series[i][1].trend+'">'+series[i][1].pct+'% <span class="glyphicon glyphicon-circle-arrow-'+series[i][1].trend+'"></span></span>';
      var data30d = series[i][2].delta+'<br/><span class="'+series[i][2].trend+'">'+series[i][2].pct+'% <span class="glyphicon glyphicon-circle-arrow-'+series[i][2].trend+'"></span></span>';
      var data7d = series[i][3].delta+'<br/><span class="'+series[i][3].trend+'">'+series[i][3].pct+'% <span class="glyphicon glyphicon-circle-arrow-'+series[i][3].trend+'"></span></span>';
      d ='<td>'+series[i][0]+'</td><td>'+data365d+'</td><td>'+data30d+'</td><td>'+data7d+'</td>';
      tr.html(d);
      table.append(tr);
    }
    // console.log(table);
    container.html(table);
    // return table;
  };

  var drawTimezones = function (container, serie) {

    container.html(null);

    var getTotal = function(serie) {
      var total = 0;
      for (i = 0; i < serie.length; i++){
        total = total + serie[i].v
      }
      return total;
    }

    var getValue = function (serie, tz) {
      for (i = 0; i < serie.length; i++){
        if (serie[i].t == tz){
          return serie[i].v
        }
      }
    }

    var styleFunction = function(feature, resolution) {
      var offset = 0;
      var name = feature.get('name'); //e.g. GMT -08:30
      var match = name.match(/([\-+]\d{2}):(\d{2})$/);
      if (match) {
        var hours = parseInt(match[1], 10);
        var minutes = parseInt(match[2], 10);
        offset = 60 * hours + minutes;
      }

      var val = getValue(serie, hours);

      //console.log(hours);
      var opacity = (val/getTotal(serie));
      return [
        new ol.style.Style ({
          fill: new ol.style.Fill({
            //color: [0xff, 0xff, 0x33, opacity]
            color: [255, 69, 0, opacity]
          }),
          stroke: new ol.style.Stroke({
            color: '#fff'
          })
        })
      ];
    };

    var vector = new ol.layer.Vector({
      source: new ol.source.KML({
        extractStyles: false,
        projection: 'EPSG:3857',
        url: '../resources/data/timezones.kml'
      }),
      style: styleFunction
    });

    var raster = new ol.layer.Tile({
      source: new ol.source.Stamen({
        //layer: 'watercolor'
        layer: 'toner-lite'
      })
    });

    var map = new ol.Map({
      layers: [raster, vector],
      target: container[0],
      view: new ol.View({
        center: [0, 0],
        zoom: 1
      })
    });

  };

  var drawDemographic = function (container, series) {

    var row = $('<div/>').addClass('row');
    var chart_area = $('<div/>').addClass('col-md-10');
    var options_area = $('<div/>').addClass('col-md-2');

    row.append(chart_area);
    row.append(options_area);

    var chart_div = $('<div/>').addClass('chart');
    var y_axis_div = $('<div/>').addClass('y_axis');
    var x_axis_div = $('<div/>').addClass('x_axis');
    var legend_div = $('<div/>').addClass('legend');

    chart_area.append(y_axis_div);
    chart_area.append(chart_div);
    chart_area.append(x_axis_div);
    options_area.append(legend_div);

    container.html(row);

    var palette = new Rickshaw.Color.Palette({scheme: 'munin'});

    var graph = new Rickshaw.Graph ({
      element: container.find('.chart')[0],
      width: container.find('.chart').width()*0.9,
      height: container.find('.chart').width()*0.35,
      preserve: true,
      renderer: 'bar',
      series: [{
        name: "Attracted contributors",
        color: palette.color(),
        data: series[0]
      },
      {
        name: "Retained contributors",
        color: palette.color(),
        data: series[1]
      }]
    });

    var hoverDetail = new Rickshaw.Graph.HoverDetail( {
        graph: graph,
    } );

    //var axes = new Rickshaw.Graph.Axis.Time( { graph: graph } );
    var format = function(n) {
      var d = new Date();
      return d.getFullYear()-n
    }

    var x_ticks = new Rickshaw.Graph.Axis.X( {
      graph: graph,
      orientation: 'bottom',
      element: container.find('.x_axis')[0],
      //pixelsPerTick: 200,
      tickFormat: format
    });

    var yAxis = new Rickshaw.Graph.Axis.Y({
        orientation: 'left',
        element: container.find('.y_axis')[0],
        graph: graph
    });

    var legend = new Rickshaw.Graph.Legend({
        element: container.find('.legend')[0],
        graph: graph
    });

    var highlight = new Rickshaw.Graph.Behavior.Series.Highlight( {
      graph: graph,
      legend: legend
    } );

    graph.renderer.unstack = true;
    graph.render();
    
    $(window).resize(function() {
      graph.configure({
        width: container.find('.chart').width()*0.9,
        height: container.find('.chart').width()*0.35
      });

      graph.render();

    });
  };

  return {
    drawEvolChart: drawEvolChart,
    showTops : showTops,
    drawTimezones : drawTimezones,
    drawDemographic : drawDemographic,
    showTrends: showTrends
  }
})();
