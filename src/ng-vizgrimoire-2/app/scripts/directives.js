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
        templateUrl: 'templates/widgets/linesChartWidget.html',
        scope: {
            datasource: '@widgetDatasource',
            metrics: '@widgetMetrics'
        }
    };
});

vizgrimoireDirectives.directive('vgwidgetTrends', function() {
  return {
    restrict: 'E',
    templateUrl: 'templates/widgets/trendsWidget.html',
    scope : {
      datasource: '@widgetDatasource',
      metrics: '@widgetMetrics'
    }
  };
});

vizgrimoireDirectives.directive('vgwidgetOnion', function() {
  return {
    restrict: 'E',
    templateUrl: 'templates/widgets/onionWidget.html',
    scope : {
      datasource: '@widgetDatasource',
      metrics: '@widgetMetrics'
    }
  };
});

vizgrimoireDirectives.directive('vgwidgetTops', function() {
  return {
    restrict: 'E',
    templateUrl: 'templates/widgets/topsWidget.html',
    scope : {
      datasource: '@widgetDatasource',
      metrics: '@widgetMetrics'
    }
  };
});

vizgrimoireDirectives.directive('vgwdigetHorizbars', function() {
  return {
    restrict: 'E',
    templateUrl: 'templates/widgets/horizMultiBarChartWidget.html',
    scope : {
      datasource: '@widgetDatasource',
      metrics: '@widgetMetrics'
    }
  };
});

vizgrimoireDirectives.directive('vgwdigetStackedarea', function() {
  return {
    restrict: 'E',
    templateUrl: 'templates/widgets/stackedAreaChartWidget.html',
    scope : {
      datasource: '@widgetDatasource',
      metrics: '@widgetMetrics'
    }
  };
});

vizgrimoireDirectives.directive('vgwidgetDemography', function() {
  return {
    restrict: 'E',
    templateUrl: 'templates/widgets/demographyChartWidget.html',
    scope : {
      datasource: '@widgetDatasource'
    }
  };
});

vizgrimoireDirectives.directive('vgwidgetPunchcard', function() {
  return {
    restrict: 'E',
    templateUrl: 'templates/widgets/punchcardWidget.html',
    scope: {
      datasource: '@widgetDatasource',
      metrics: '@widgetMetrics'
    }
  };
});

vizgrimoireDirectives.directive('vgwidgetMembers', function() {
  return {
    restrict: 'E',
    templateUrl: 'templates/widgets/membersWidget.html',
    scope: {
      datasource: '@widgetDatasource',
      metrics: '@widgetMetrics'
    }
  };
});

vizgrimoireDirectives.directive('vgwidgetMeetings', function() {
  return {
    restrict: 'E',
    templateUrl: 'templates/widgets/topMeetingsWidget.html',
    scope: {
      datasource: '@widgetDatasource',
      metrics: '@widgetMetrics'
    }
  };
});


vizgrimoireDirectives.directive('vgwidgetChart', ['$routeParams', function($routeParams) {
  return {
    restrict: 'E',
    templateUrl: function (elem, attr) {
      switch ($routeParams.widget) {
        case 'timeseries':
          return 'templates/widgets/linesChartWidget.html';
          break;
        case 'trends':
          return 'templates/widgets/trendsWidget.html';
          break;
        case 'onion':
          return 'templates/widgets/onionWidget.html';
          break;
        case 'tops':
          return 'templates/widgets/topsWidget.html';
          break;
        case 'horizbars':
          return 'templates/widgets/horizMultiBarChartWidget.html';
          break;
        case 'stackedarea':
          return 'templates/widgets/stackedAreaChartWidget.html';
          break;
        case 'demography':
          return 'templates/widgets/demographyChartWidget.html';
          break;
        default:

      }
    },
    scope: {
      datasource: '@widgetDatasource',
      metrics: '@widgetMetrics'
    }
  };
}]);

}());
