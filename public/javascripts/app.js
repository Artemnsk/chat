'use strict'

var app = angular.module('app', [
    'ngRoute',
    'chatControllers',
    'userControllers'
]);

app.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/user/chat', {
                templateUrl: 'partials/chat.html',
                controller: 'ChatCtrl'
            }).
            when('/user/profile', {
                templateUrl: 'partials/profile.html',
                controller: 'ProfileCtrl'
            }).
            otherwise({
                redirectTo: '/user/profile'
            });
    }]);