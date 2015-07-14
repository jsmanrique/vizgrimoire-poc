(function () {
'use strict';

var vizgrimoireDirectives = angular.module('vizgrimoireDirectives', []);

vizgrimoireDirectives.directive('vgwidgetLines', function () {
    return {
        restrict: 'E',
        templateUrl: 'templates/linesChartWidget.html',
        scope: {
            datasource: '@widgetDatasource',
            metrics: '@widgetMetrics'
        }
    };
});

vizgrimoireDirectives.directive('vgwidgetTrends', function() {
  return {
    restrict: 'E',
    templateUrl: 'templates/trendsWidget.html',
    scope : {
      datasource: '@widgetDatasource',
      metrics: '@widgetMetrics'
    }
  };
});

vizgrimoireDirectives.directive('vgwidgetOnion', function() {
  return {
    restrict: 'E',
    templateUrl: 'templates/onionWidget.html',
    scope : {
      datasource: '@widgetDatasource',
      metrics: '@widgetMetrics'
    }
  };
});

vizgrimoireDirectives.directive('vgwidgetTops', function() {
  return {
    restrict: 'E',
    templateUrl: 'templates/topsWidget.html',
    scope : {
      datasource: '@widgetDatasource',
      metrics: '@widgetMetrics'
    }
  };
});

vizgrimoireDirectives.directive('vgwdigetHorizbars', function() {
  return {
    restrict: 'E',
    templateUrl: 'templates/horizMultiBarChartWidget.html',
    scope : {
      datasource: '@widgetDatasource',
      metrics: '@widgetMetrics'
    }
  };
});

vizgrimoireDirectives.directive('vgwdigetStackedarea', function() {
  return {
    restrict: 'E',
    templateUrl: 'templates/stackedAreaChartWidget.html',
    scope : {
      datasource: '@widgetDatasource',
      metrics: '@widgetMetrics'
    }
  };
});

}());
