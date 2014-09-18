'use strict'

var app = angular.module('app', [
    'ngRoute',
    'chatControllers',
    'fileUpload'
]);

app.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/', {
                //templateUrl: 'partials/index.html'
                redirectTo: '/fileupload'
            }).
            when('/user/login', {
                templateUrl: 'partials/login.html',
                controller: "RootCtrl"
            }).
            when('/fileupload', {
                templateUrl: 'partials/fileupload.html',
                controller: "fileUploadCtrl"
            }).
            when('/user/signup', {
                templateUrl: 'partials/signup.html'
            }).
            otherwise({
                redirectTo: '/'
            });
    }]);