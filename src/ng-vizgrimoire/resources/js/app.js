var VizGrimoire = angular.module('VizGrimoire', ['ngRoute', 'ui.bootstrap', 'snap', 'gridshore.c3js.chart', 'vizgrimoireControllers', 'vizgrimoireDirectives']);

VizGrimoire.config(['$routeProvider', function($routeProvider){
    $routeProvider.when(
        '/', {
            templateUrl: 'resources/templates/overview.html',
            controller: 'overviewController'
        }
    ).when(
        '/:datasource', {
            templateUrl: 'resources/templates/datasource-overview.html',
            controller: 'generalController'
        }
    ).when(
        '/:datasource/:categories', {
            templateUrl: 'resources/templates/datasource-overview.html',
            controller: 'generalController'
        }
    ).when(
        '/:datasource/:categories/:id', {
            templateUrl: 'resources/templates/datasource-overview.html',
            controller: 'generalController'
        }
    ).when(
        '/test',{
            templateUrl: 'resources/templates/vgwidget.html',
            controller: 'VGWidgetController'
        }
    ).otherwise({
        redirectTo: '/'
    });
}]);
