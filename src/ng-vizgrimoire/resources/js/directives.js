var vizgrimoireDirectives = angular.module('vizgrimoireDirectives', []);

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