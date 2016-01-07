/* ========================================================================
 * controllers.js v0.0.1
 * Controllers
 * ========================================================================
 * Copyright 2015 Jose Manrique Lopez de la Fuente
 * Licensed under MIT (/LICENSE)
 * ======================================================================== */

(function () {
'use strict';

var vizgrimoireControllers = angular.module('vizgrimoireControllers', []);

vizgrimoireControllers.controller('ProjectNameCtrl', ['$scope', '$http', function($scope, $http) {
  $http.get('data/scm-static.json').success(function(data){
    var repo = data.url.substring(19).split('/');

    $scope.projectName = {
      owner: repo[0],
      repository: repo[1].substring(0, repo[1].length-4)
    };

  });
}]);

vizgrimoireControllers.controller('SharingCtrl', ['$scope', function($scope) {

  $scope.shareOnTwitter = function() {
    window.location.href = 'https://twitter.com/share?url='+encodeURIComponent(document.URL)+'&text='+document.title+'&hashtags=dev,metrics&via=biterg_cauldron';
  };

  $scope.shareOnUrl = function() {
    window.prompt('Copy to clipboard: CTRL+C / CMD+C, Enter', document.URL);
  };
}]);

vizgrimoireControllers.controller('TimeseriesCtrl', ['$scope', '$http', function ($scope, $http){

  $scope.options = {
    chart: {
      type: 'lineWithFocusChart',
      height: 325,
      height2: 40,
      xAxis: {
        tickFormat: function(d){
            return d3.time.format('%e-%b-%Y')(new Date(d*1000));
        }
      },
      x2Axis: {
        tickFormat: function(d){
            return d3.time.format('%e-%b-%Y')(new Date(d*1000));
        }
      },
      yAxis: {
        tickFormat: function(d) {
          return d3.format(',.0f')(d);
        }
      },
      y2Axis: {
        tickFormat: function(d) {
          return d3.format(',.0f')(d);
        }
      },
      forceY: [0],
      useInteractiveGuideline: true
    }
  };

  $http.get('data/'+$scope.datasource+'.json').success(function(data){
    var metricsArray = $scope.metrics.split(',');

    var dataTemp = [];

    for (var i = 0; i < metricsArray.length; i++ ){
      var values = [];
      for (var j = 0; j < data.unixtime.length; j++) {
        values.push({x: data.unixtime[j], y: data[metricsArray[i]][j]});
      }
      dataTemp.push({key: metricsArray[i], values: values});
    }

    $scope.timeseriesData = dataTemp;

  });

}]);

vizgrimoireControllers.controller('MetricsTrendsCtrl', ['$scope', '$http', function ($scope, $http){
  $http.get('data/'+$scope.datasource+'.json').success(function(data){
    var metricsArray = $scope.metrics.split(',');

    var dataTemp = [];

    for (var i = 0; i < metricsArray.length; i++){
      dataTemp.push({
        name: metricsArray[i],
        total: data[metricsArray[i]],
        diff365: data['diff_net'+metricsArray[i]+'_365'],
        percentage365: data['percentage_'+metricsArray[i]+'_365'],
        trend365: function(x){if (x > 0){return 'up';}else if (x<0){return 'down';} else {return 'right';}}(data['diff_net'+metricsArray[i]+'_365']),
        color365: function(x){if (x > 0){return 'green';}else if (x<0){return 'red';} else {return 'black';}}(data['diff_net'+metricsArray[i]+'_365']),
        diff30: data['diff_net'+metricsArray[i]+'_30'],
        percentage30: data['percentage_'+metricsArray[i]+'_30'],
        trend30: function(x){if (x > 0){return 'up';}else if (x<0){return 'down';} else {return 'right';}}(data['diff_net'+metricsArray[i]+'_30']),
        color30: function(x){if (x > 0){return 'green';}else if (x<0){return 'red';} else {return 'black';}}(data['diff_net'+metricsArray[i]+'_30']),
        diff7: data['diff_net'+metricsArray[i]+'_7'],
        percentage7: data['percentage_'+metricsArray[i]+'_7'],
        trend7: function(x){if (x > 0){return 'up';}else if (x<0){return 'down';} else {return 'right';}}(data['diff_net'+metricsArray[i]+'_7']),
        color7: function(x){if (x > 0){return 'green';}else if (x<0){return 'red';} else {return 'black';}}(data['diff_net'+metricsArray[i]+'_7'])
        });
    }

    //console.log(dataTemp);

    $scope.metricsData = dataTemp;

  });
}]);

vizgrimoireControllers.controller('OnionWidgetCtrl', ['$scope', '$http', function($scope, $http){
  $http.get('data/'+$scope.datasource+'.json').success(function(data){
    var metricsArray = $scope.metrics.split(',');

    var dataTemp = [];

    for (var i = 0; i < metricsArray.length; i++){
      dataTemp.push({
        name: metricsArray[i],
        total: data[metricsArray[i]],
        core: data.core, //TODO: Fix when there is more than one core type
        regular: data.regular,
        casual: data.occasional
      });
    }

    $scope.onions = dataTemp;

  });
}]);

vizgrimoireControllers.controller('TopsWidgetCtrl', ['$scope', '$http', function($scope, $http){
  $http.get('data/'+$scope.datasource+'.json').success(function (data){
    var metricsArray = $scope.metrics.split(',');

    var contributorsName = metricsArray[0];

    var activityName = metricsArray[1];

    var dataTemp = {};

    var top = [];

    for (var i = 0; i < data[contributorsName+'.'][contributorsName].length; i++) {
      top.push({
        name: data[contributorsName+'.'][contributorsName][i],
        id: data[contributorsName+'.'].id[i],
        activity: data[contributorsName+'.'][activityName][i],
      });
    }

    var top365 = [];

    for (var i = 0; i < data[contributorsName+'.last year'][contributorsName].length; i++){
      top365.push({
        name: data[contributorsName+'.last year'][contributorsName][i],
        id: data[contributorsName+'.last year'].id[i],
        activity: data[contributorsName+'.last year'][activityName][i],
      });
    }

    var top30 = [];

    for (var i = 0; i < data[contributorsName+'.last month'][contributorsName].length; i++){
      top30.push({
        name: data[contributorsName+'.last month'][contributorsName][i],
        id: data[contributorsName+'.last month'].id[i],
        activity: data[contributorsName+'.last month'][activityName][i],
      });
    }

    dataTemp.top30 = top30;
    dataTemp.top365 = top365;
    dataTemp.top = top;
    dataTemp.activity = activityName;

    //console.log(dataTemp);

    $scope.tops = dataTemp;
  });
}]);

vizgrimoireControllers.controller('HorizMultiBarChartCtrl', ['$scope', '$http', function($scope, $http) {

  $scope.options = {
    chart: {
      type: 'multiBarHorizontalChart',
      showControls: false,
      x: function(d){return d.label;},
      y: function(d){return d.value;},
      margin: {left: 120},
      yAxis: {
        tickFormat: function(d){
            return d3.format(',.0f')(d);
        }
      }
    }
  };

  $http.get('data/'+$scope.datasource+'.json').success(function(data){

    var metricsArray = $scope.metrics.split(',');
    var tempData = [];

    for (var i = 0; i < metricsArray.length; i++) {
      var valuesTemp = [];
      for (var j = 0; j < data[metricsArray[i]+'_365'].length; j++){
        valuesTemp.push(
          {label: data.name[j], value: data[metricsArray[i]+'_365'][j]}
        );
      }
      tempData.push(
        {key: metricsArray[i], values: valuesTemp}
      );
    }

    if (tempData[0].values.length > 10) {
      $scope.options.chart.height = 800;
    } else {
      $scope.options.chart.height =420;
    }

    $scope.horizBarsChartData = tempData;

  });
}]);

vizgrimoireControllers.controller('StackedAreaWidgetCtrl', ['$scope', '$http', '$q', function($scope, $http, $q) {

  $scope.options = {
    chart: {
      type: 'stackedAreaChart',
      useInteractiveGuideline: true,
      x: function(d){return d[0];},
      y: function(d){return d[1];},
      /*useVoronoi: true,
      clipEdge: true,*/
      xAxis: {
        showMaxMin: false,
        tickFormat: function(d){
            return d3.time.format('%b-%Y')(new Date(d*1000));
        }
      },
      yAxis: {
        tickFormat: function(d){
          return d3.format(',.0f')(d);
        }
      },
      controlOptions: ['Stacked', 'Expanded'],
      interactiveLayer: {
        tooltip: {
          headerFormatter: function (d) { return d }
        }
      },
      legend: {
        vers: 'furious'
      }
    }
  };

  $http.get('data/'+$scope.datasource+'.json').success(function(data){
    var metric = $scope.metrics;

    var tempData = [];

    var keys = [];
    var jsonRequests = [];

    if (data.name.length > 10) {
      $scope.options.chart.height = 420;
      for (var i = 0; i < 10; i++) {
        keys.push(data.name[i]);
        jsonRequests.push($http.get('data/'+data.name[i]+'-scm-dom-evolutionary.json'));
      }
    } else {
      $scope.options.chart.height = 320;
      for (var i = 0; i < data.name.length; i++) {
        keys.push(data.name[i]);
        jsonRequests.push($http.get('data/'+data.name[i]+'-scm-dom-evolutionary.json'));
      }
    }

    $q.all(jsonRequests).then(function(results){

      for (var i = 0; i < results.length; i++) {
        var valuesTemp = [];
        for (var j = 0; j < results[i].data.unixtime.length; j++) {
          valuesTemp.push([results[i].data.unixtime[j], results[i].data[metric][j]]);
        }

        tempData.push({
          key: keys[i],
          values: valuesTemp
        });
      }

      $scope.stackedData = tempData;
    });

  });
}]);

vizgrimoireControllers.controller('DemographyChartCtrl',['$scope', '$http', '$q', function($scope, $http, $q){

  $scope.options = {
    chart: {
      type: 'multiBarHorizontalChart',
      height: 320,
      showControls: false,
      x: function(d){return d.label;},
      y: function(d){return d.value;},
    }
  };

  var birthsRequest = $http.get('data/'+$scope.datasource+'-demographics-birth.json');
  var agingRequest = $http.get('data/'+$scope.datasource+'-demographics-aging.json');

  $q.all([birthsRequest, agingRequest]).then(function(results){

    var births = results[0].data.persons.age;
    var aages = results[1].data.persons.age;

    var max_age = Math.max.apply(Math, births);

    var periods = Math.ceil(max_age / (30*6));

    var series = function(periods) {
      var series = [];

      for (var i = periods - 1; i >= 0; i--) {
        series.push({label: (i*6)/12+'y',value: 0});
      }

      return series;
    };

    var birthSeries = series(periods);

    for (var i = 0; i < births.length; i++) {
      var birthPeriod = Math.floor(births[i] / (30*6));
      var seriesIndex = birthSeries.length - birthPeriod - 1;
      birthSeries[seriesIndex].value = birthSeries[seriesIndex].value + 1;
    }

    var ageSeries = series(periods);

    for (var i = 0; i < aages.length; i++) {
      var agePeriod = Math.floor(aages[i] / (30*6));
      var seriesIndex = ageSeries.length - agePeriod - 1;
      ageSeries[seriesIndex].value = ageSeries[seriesIndex].value + 1;
    }

    //console.log('b :'+ birthSeries);
    //console.log('a :'+ageSeries);

    var dataTemp = [
      {
        key: 'Engaged',
        values: birthSeries
      },
      {
        key: 'Still active',
        values: ageSeries
      }
    ];

    $scope.demographicData = dataTemp;

  });

}]);

vizgrimoireControllers.controller('ContributorOverviewCtrl', ['$scope', '$http', '$q', '$routeParams', function($scope, $http, $q, $routeParams){

  $scope.uid = $routeParams.uid;

}]);

vizgrimoireControllers.controller('PunchcardCtrl',['$scope', '$http', function($scope, $http){
  $scope.options = {
    chart: {
      type: 'scatterChart',
      height: 325,
      showControls: false,
      showDistX: false,
      showDistY: false,
      forceX: [0,23],
      forceY: [1,7],
      xAxis: {
        showMaxMin: false,
        tickValues: d3.range(0,23,2),
        tickFormat: function(d){
          return d+':00';
        }
      },
      yAxis: {
        //showMaxMin: false,
        tickValues: d3.range(1,7),
        tickFormat: function(d) {
          var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
          return days[7-d];
        }
      },
      tooltipContent: function(key) {
        var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        if (key.point.size !== null) {
          return '<strong>'+key.point.size +'</strong> rsvp <br>on '+days[7-key.point.y]+' at '+key.point.x+':00';
        } else {
          return '<strong>0</strong> rsvp <br>on '+days[7-key.point.y]+' at '+key.point.x+':00';
        }
      },
      fisheye: 100
    }
  };

  $http.get('data/'+$scope.datasource+'.json').success(function(data){
    var dailyMeetingsObj = data['Austin Puppet User Group'];
    // d = [{key:pugName, values:[{x:hour,y:day,size:rsvps},..]}]

    var tempData = [];

    var tempValues = [];

    for (var i = 0; i < 24; i++){
      for (var j = 1; j < 8; j++) {
        if (dailyMeetingsObj[8-j][i]!==0) {
          tempValues.push(
            {
              x: i,
              y: j,
              size: dailyMeetingsObj[8-j][i]
            }
          );
        }
      }
    }

    tempData.push({
      key: 'Austin Puppet User Group',
      values: tempValues
    });

    $scope.punchcardData = tempData;

  });
}]);

vizgrimoireControllers.controller('MembersCtrl',['$scope', '$http', function($scope, $http){
  $http.get('data/'+$scope.datasource+'.json').success(function(data){

    var tempData = [];
    for (var i = 0; i < data['rsvps.']['name'].length; i++){
      tempData.push({
        name: data['rsvps.']['name'][i],
        events: data['rsvps.']['events'][i]
      });
    };

    $scope.tops = tempData;

  });
}]);

vizgrimoireControllers.controller('TopMeetingsCtrl',['$scope', '$http', function($scope, $http){
  $http.get('data/'+$scope.datasource+'.json').success(function(data){

    var tempData = [];
    for (var i = 0; i < data['events.']['name'].length; i++){
      tempData.push({
        name: data['events.']['name'][i],
        url: data['events.']['url'][i],
        rsvps: data['events.']['rsvps'][i]
      });
    };

    console.log(tempData);

    $scope.tops = tempData;

  });
}]);

}());
