(function () {
'use strict';

var vizgrimoireServices = angular.module('vizgrimoireServices', []);

vizgrimoireServices.factory('jsonService',['$http', '$q', '$log', function ($http, $q, $log){
  return {
    getVGjson : function (jsonUrl){
      var deferred = $q.defer();
      $http.get('/api/v1/movies/' + movie)
        .success(function(data){
          deferred.resolve(data);
        }).error(function(msg, code) {
          deferred.reject(msg);
          $log.error(msg, code);
       });

       return deferred.promise;
    }
  };
}]);

}());
