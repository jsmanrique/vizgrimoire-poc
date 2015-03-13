var app = angular.module('ngVizGrimoire', ['ngRoute', 'ui.bootstrap', 'snap', 'gridshore.c3js.chart', 'vizgrimoireControllers', 'vizgrimoireDirectives']);

app.config(['$routeProvider', function($routeProvider){
    $routeProvider.when(
        '/', {
            templateUrl: 'resources/templates/home.html',
            controller: 'generalController'
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
    ).otherwise({
        redirectTo: '/'
    });
}]);
