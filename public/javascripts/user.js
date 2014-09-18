'use strict';

var userControllers = angular.module('userControllers', ['ngResource']);

userControllers.factory('userRemoteService', ['$resource',
    function($resource){
        return $resource('angular/variables/user', {}, {
            query: {method:'GET'/*, isArray:true*/}
        });
    }]);

userControllers.factory('dataRemoteService', ['$resource',
    function($resource){
        return $resource('angular/variables/data', {}, {
            query: {method:'GET'/*, isArray:true*/}
        });
    }]);