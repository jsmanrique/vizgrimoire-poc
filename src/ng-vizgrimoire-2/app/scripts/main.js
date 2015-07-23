// jshint devel:true
(function () {
'use strict';

var app = angular.module('ngVizGrimoire', ['ngRoute', 'ui.bootstrap', 'nvd3ChartDirectives', 'vizgrimoireControllers', 'vizgrimoireDirectives']);

app.config(['$routeProvider', function($routeProvider){
  $routeProvider.when(
    '/',{
      templateUrl: 'templates/index.html',
    }
  ).when(
    '/scm', {
      templateUrl: 'templates/scmOverview.html'
    }
  ).when(
    '/its', {
      templateUrl: 'templates/itsOverview.html'
    }
  ).when(
    '/scr', {
      templateUrl: 'templates/scrOverview.html'
    }
  ).otherwise({
    redirectTo: '/'
  });
}]);

}());
