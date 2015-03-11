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

vizgrimoireControllers.controller('generalController', ['$scope', '$location', '$routeParams', function ($scope, $location, $routeParams){
    
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

vizgrimoireControllers.controller('VGWidgetController', ['$scope', function ($scope){
    $scope.vgwidget = {title: 'SCM', help: 'Lorem ipsum ad his scripta blandit partiendo'};
}]);