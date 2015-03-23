var vizgrimoireFactories = angular.module('vizgrimoireFactories', []);

vizgrimoireFactories.factory('getProjectConfig', ['$http'], function ($http) {
    var getDataRequest = $http.get('resources/data/config.json');
    
    var config = function () {
        return getDataRequest.success(function (data) {
            
        });
    }; 
    
    return {
        config: config
    }
});