var vizgrimoireDirectives = angular.module('vizgrimoireDirectives', []);

vizgrimoireDirectives.directive('vgsidemenu', function(){
    return {
        restrict: 'E',
        templateUrl: 'resources/templates/vgsidemenu.html',
        scope: {},
        controller: function($scope, $http, $location, $routeParams) {
            $http.get('resources/data/config.json').success(function(data){
                $scope.config = data;
            });
        }
    };
});

vizgrimoireDirectives.directive('vgwidget', function(){
    return {
        restrict: 'E',
        templateUrl: 'resources/templates/vgwidget.html',
        scope: {},
        controller: function($scope, $location, $routeParams) {
            $scope.vgwidget = {title: $location.$$path, help: 'Lorem ipsum ad his scripta blandit partiendo'};
            
        }
    };
});