var vizgrimoireControllers = angular.module('vizgrimoireControllers', []);

vizgrimoireControllers.controller('navbarBrandController', ['$scope', '$http', function ($scope, $http){
    
    $http.get('resources/data/config.json').success(function(data){
        $scope.config = data;
    });
    
}]);

vizgrimoireControllers.controller('daterangeDropdownController', ['$scope', function ($scope){
    
}]);

vizgrimoireControllers.controller('overviewController', ['$scope', function ($scope){
    
}]);

vizgrimoireControllers.controller('generalController', ['$scope', '$http', '$location', '$routeParams', function ($scope, $http, $location, $routeParams) {
    
    $http.get('resources/data/config.json').success(function(data){
        $scope.config = data;
    });
    
    $scope.location = $location;
    
    var levels = $scope.location.$$path.split('/');
    
    var paths = [];
    
    for (i=1; i<levels.length; i++) {
        path_item = {};
        path_item.name = levels[i];
        path_item.path = levels[i-1]+"/"+levels[i];
        paths.push(path_item);
    };
    
    $scope.paths = paths;
    
    $scope.route = $routeParams;
        
}]);

vizgrimoireControllers.controller('vgwidgetController', ['$scope', function ($scope){
    $scope.onion = {title: 'Contributors', help: 'Contributors distribution', type: 'onion'};
    $scope.activityagg = {title: 'Activity', help: 'Aggregated activity', type: 'activityagg'};
    $scope.activityts = {title: 'Activity', help: 'Activity over the time', type: 'activityts'};
}]);
