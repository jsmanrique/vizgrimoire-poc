// jshint devel:true
(function () {
'use strict';

// TODO: Do it with angular instead of jquery
$(document).ready(function(){

  $('.shareOnTW').click(function(){
    window.location.href = 'https://twitter.com/share?url='+encodeURIComponent(document.URL)+'&text='+document.title+'&via=bitergia&hashtags=metrics,development';
  });

  $('#shareUrl').click(function(){
    window.prompt('Copy to clipboard: CTRL+C / CMD+C, Enter', document.URL);
  });
});

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
