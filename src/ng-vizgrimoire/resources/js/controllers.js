var vizgrimoireControllers = angular.module('vizgrimoireControllers', []);

vizgrimoireControllers.controller('navbarBrandController', ['$scope', function ($scope){
    $scope.project = {name: 'testing'};
}]);

vizgrimoireControllers.controller('daterangeDropdownController', ['$scope', function ($scope){
    
}]);

vizgrimoireControllers.controller('overviewController', ['$scope', function ($scope){
    $scope.datasources = [{name: 'scm'}, {name: 'its'}]
        
}]);

vizgrimoireControllers.controller('generalController', ['$scope', '$location', '$routeParams', function ($scope, $location, $routeParams){
    $scope.datasources = [{name: 'scm'}, {name: 'its'}];
    
    $scope.location = $location;
    
    $scope.route = $routeParams;
    
        
}]);

vizgrimoireControllers.controller('VGWidgetController', ['$scope', function ($scope){
    $scope.vgwidget = {title: 'SCM', help: 'Lorem ipsum ad his scripta blandit partiendo'};
}]);