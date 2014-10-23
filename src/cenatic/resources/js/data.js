/* ========================================================================
 * data.js v0.0.1
 * Data management library
 * ========================================================================
 * Copyright 2014 Jose Manrique Lopez de la Fuente
 * Licensed under MIT (../LICENSE)
 * ======================================================================== */

var Data = (function () {

  var init = function () {
    var data = $.getJSON('../resources/data/metrics.json');

    data.done(function(m) {

      $.each(m.metrics, function (key, value){
        localStorage.setItem(value.sname, JSON.stringify(value.value));
      });
    });
  }

  var dataFormatter = function(metric, dates) {

    var serie = [];

    for (i = 0; i < dates.length; i++) {

      serie.push({x: parseInt(dates[i]) , y: metric.data[i]});
    }

    metric.serie = serie;
  };

  var getSeries = function (metricsNames) {

    var series = [];
    var dates = JSON.parse(localStorage['dates']);
    // console.log(dates);

    var metrics = metricsNames.split('|');
    //console.log(metrics);

    for (var i = 0; i < metrics.length; i++) {
      var metricValue = JSON.parse(localStorage[metrics[i]]);
      //console.log(metric);
      dataFormatter (metricValue, dates.data);
      series.push(metricValue);
    };

    return series;
  };

  var getTops = function(source) {
    //console.log(source);
    var tops_series = JSON.parse(localStorage[source]);
    return tops_series.data;
  };
  
  var getTrends = function (source) {
      var series = [];
      
      var metricNames = source.split('|');
      //console.log(metrics);
      
      for (var i = 0; i < metricNames.length; i++) {
          var metricValue = JSON.parse(localStorage[metricNames[i]]);
          var serie = [];
          serie.push(metricValue.name);
          serie.push(metricValue.data.year);
          serie.push(metricValue.data.month);
          serie.push(metricValue.data.week);
          series.push(serie);
      }
//      console.log(series);
      return series;
  };

  var getTzData = function(metric){
    //console.log(metric);
    //console.log(localStorage[metric]);
    var metricData = JSON.parse(localStorage[metric]);
    var serie = [];
    var tz =  [-12, -11, -10, -9, -8, -7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
//    var tz =  [-11, -10, -9, -8, -7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

    for (i = 0; i < tz.length; i++){
      serie.push({t: tz[i], v: metricData.data[i]});
    }
    //console.log(serie);
    return serie;
  };

  var getDemog = function(metric) {
    var metricData = JSON.parse(localStorage[metric]);
    console.log(metricData);

    var births = [];
    var alive = [];

    for (j = 0; j < Math.ceil(metricData.birth[0]/365); j++) {
      births[j]=0;
      for (i = 0; i < metricData.birth.length; i++){
        if ((metricData.birth[i] > j*365) && (metricData.birth[i] < (j+1)*365 )) {
          births[j]=births[j]+1;
        };
      }
    }

    for (j = 0; j < Math.ceil(metricData.birth[0]/365); j++) {
      alive[j]=0;
      for (i = 0; i < metricData.id_alive.length; i++){
        if ((metricData.birth[metricData.id_alive[i]] > j*365) && (metricData.birth[metricData.id_alive[i]] < (j+1)*365 )) {
          alive[j]=alive[j]+1;
        };
      }
    }

    var series = [];

    for (i=0; i < births.length; i++) {
      births[i] = {x: i, y: births[i]};
      alive[i] = {x: i, y: alive[i]};
    }

    series.push(births);
    series.push(alive);

    //console.log(series);

    return series;

  };

  return {
    init : init,
    getSeries: getSeries,
    getTops: getTops,
    getTzData: getTzData,
    getDemog: getDemog,
    getTrends: getTrends
  }

})();
