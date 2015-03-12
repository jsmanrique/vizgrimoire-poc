var vizgrimoireDirectives = angular.module('vizgrimoireDirectives', []);

vizgrimoireDirectives.directive('vgsidemenu', function () {
    return {
        restrict: 'E',
        templateUrl: 'resources/templates/vgsidemenu.html',
        scope: {},
        controller: function ($scope, $http, $location, $routeParams) {
            $http.get('resources/data/config.json').success(function (data) {
                $scope.config = data;
            });
        }
    };
});

vizgrimoireDirectives.directive('vgwidget', function () {
    return {
        restrict: 'E',
        templateUrl: 'resources/templates/vgwidget.html',
        scope: {
            widget: '=type'
        },
        controller: function ($scope, $location, $routeParams) {
            //var chartId = "chart" + Math.floor((Math.random() * 1000) + 1);
            //$scope.widget = {title: 'Contributors', help: 'Contributors distribution'};
            $scope.onion = {title: 'Contributors', help: 'Contributors distribution'};
            $scope.activityagg = {title: 'Activity', help: 'Aggregated activity'};
            $scope.activityts = {title: 'Activity', help: 'Activity over the time'};
            //$scope.vgwidget = {title: $location.$$path, id: chartId, help: 'Lorem ipsum ad his scripta blandit partiendo'};
        }
    };
});