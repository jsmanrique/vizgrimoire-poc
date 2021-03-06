var vizgrimoireDirectives = angular.module('vizgrimoireDirectives', []);

vizgrimoireDirectives.directive('vgsidemenu', function () {
    return {
        restrict: 'E',
        templateUrl: 'resources/templates/vgsidemenu.html',
        scope: {},
        controller: function ($scope, $http) {
            $http.get('resources/data/config.json').success(function (config) {
                $scope.config = config;
            });
        }
    };
});

vizgrimoireDirectives.directive('vgwidget', function () {
    return {
        restrict: 'E',
        templateUrl: 'resources/templates/vgwidget.html',
        scope: {
            widget: '=widgetType',
            datasource: '@widgetDatasource'
        }
    };
});

vizgrimoireDirectives.directive('widgetBody', function ($http, $compile) {
    var getTemplate = function (widgetType) {
        var template = '';
        
        switch (widgetType) {
                case 'onion':
                    template = '/resources/templates/onion-widget.html';
                    break;
                case 'activityagg':
                    template = '/resources/templates/activityagg-widget.html';
                    break;
                case 'activityts':
                    template = '/resources/templates/activityts-widget.html';
                    break;
        }
        return template;
    }
    return {
        restrict: 'E',
        link: function (scope, element, attrs) {
            $http.get(getTemplate(attrs.type)).success(function (template) {
                element.html(template);
                
                var datasource = scope.datasource;
                switch (attrs.type) {
                        case 'activityts':
                            var dataUrl = 'resources/data/' + datasource + '-' + attrs.type + '-data.json';
                            $http.get(dataUrl).success (function (data) {
                                scope.data = data;
                                
                                $compile(element.contents())(scope);
                                
                            });
                        case 'onion':
                            var dataUrl = 'resources/data/' + datasource + '-' + attrs.type + '-data.json';
                            $http.get(dataUrl).success (function (data) {
                                scope.data = data;
                                
                                $compile(element.contents())(scope);
                                
                            });
                        case 'activityagg':
                            var dataUrl = 'resources/data/' + datasource + '-' + attrs.type + '-data.json';
                            $http.get(dataUrl).success (function (data) {
                                scope.data = data;
                                
                                $compile(element.contents())(scope);
                                
                            });
                }    
            });
        }
    };
});