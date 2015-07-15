(function () {
'use strict';

var vizgrimoireControllers = angular.module('vizgrimoireControllers', []);

vizgrimoireControllers.controller('LinesChartCtrl', ['$scope', '$http', function ($scope, $http){

    $http.get('data/'+$scope.datasource+'.json').success(function(data){

        var metricsArray = $scope.metrics.split(',');

        var dataTemp = [];

        for (var i = 0; i < metricsArray.length; i++ ){
          var values = [];
          for (var j = 0; j < data.unixtime.length; j++) {
            values.push([data.unixtime[j], data[metricsArray[i]][j]]);
          }
          dataTemp.push({key: metricsArray[i], values: values});
        }

        $scope.linesChartData = dataTemp;

        $scope.xAxisTickFormatFunction = function(){
          return function(d){
            return d3.time.format('%e-%b-%Y')(new Date(d*1000));
          };
        };

        $scope.toolTipContentFunction = function(){
          return function(key, x, y, e, graph) {
            return '<p>' + key + '</p>' +
            '<p><small><strong>' +  y + '</strong> at ' + x + '</small></p>';
          };
        };
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
        diff30: data['diff_net'+metricsArray[i]+'_30'],
        percentage30: data['percentage_'+metricsArray[i]+'_30'],
        diff7: data['diff_net'+metricsArray[i]+'_7'],
        percentage7: data['percentage_'+metricsArray[i]+'_7'],
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
  $http.get('data/'+$scope.datasource+'.json').success(function(data){

    var metricsArray = $scope.metrics.split(',');
    var tempData = [];

    for (var i = 0; i < metricsArray.length; i++) {
      var valuesTemp = [];
      for (var j = 0; j < data[metricsArray[i]+'_365'].length; j++){
        valuesTemp.push(
          [data.name[j], data[metricsArray[i]+'_365'][j]]
        );
      }
      tempData.push(
        {key: metricsArray[i], values: valuesTemp}
      );
    }

    $scope.horizBarsChartData = tempData;

  });
}]);

vizgrimoireControllers.controller('StackedAreaWidgetCtrl', ['$scope', '$http', '$q', function($scope, $http, $q) {

  $http.get('data/'+$scope.datasource+'.json').success(function(data){
    var metric = $scope.metrics;

    var tempData = [];

    var keys = [];
    var jsonRequests = [];

    for (var i = 0; i < data.name.length; i++) {
      keys.push(data.name[i]);
      jsonRequests.push($http.get('data/'+data.name[i]+'-scm-dom-evolutionary.json'));
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

      $scope.stackedAreaChartData = tempData;
    });

    $scope.xAxisTickFormatFunction = function(){
      return function(d){
        return d3.time.format('%e-%b-%Y')(new Date(d*1000));
      };
    };

  });
}]);

}());
