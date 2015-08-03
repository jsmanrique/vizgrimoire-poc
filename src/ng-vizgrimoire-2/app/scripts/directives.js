/* ========================================================================
 * directives.js v0.0.1
 * Directives
 * ========================================================================
 * Copyright 2015 Jose Manrique Lopez de la Fuente
 * Licensed under MIT (/LICENSE)
 * ======================================================================== */

(function () {
'use strict';

var vizgrimoireDirectives = angular.module('vizgrimoireDirectives', []);

vizgrimoireDirectives.directive('vgwidgetTimeseries', function () {
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

vizgrimoireDirectives.directive('vgwidgetDemography', function() {
  return {
    restrict: 'E',
    templateUrl: 'templates/demographyChartWidget.html',
    scope : {
      datasource: '@widgetDatasource'
    }
  };
});

vizgrimoireDirectives.directive('vgwidgetPunchcard', function() {
  return {
    restrict: 'E',
    templateUrl: 'templates/punchcardWidget.html',
    scope: {
      datasource: '@widgetDatasource',
      metrics: '@widgetMetrics'
    }
  };
});

vizgrimoireDirectives.directive('vgwidgetMembers', function() {
  return {
    restrict: 'E',
    templateUrl: 'templates/membersWidget.html',
    scope: {
      datasource: '@widgetDatasource',
      metrics: '@widgetMetrics'
    }
  };
});

vizgrimoireDirectives.directive('vgwidgetMeetings', function() {
  return {
    restrict: 'E',
    templateUrl: 'templates/topMeetingsWidget.html',
    scope: {
      datasource: '@widgetDatasource',
      metrics: '@widgetMetrics'
    }
  };
});


}());
