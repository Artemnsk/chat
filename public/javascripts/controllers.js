'use strict';

/* Controllers */

var chatControllers = angular.module('chatControllers', []);

chatControllers.controller('RootCtrl', ['$scope', 'userRemoteService', 'dataRemoteService',
    function($scope, userRemoteService, dataRemoteService) {
        $scope.user = userRemoteService.query();
        $scope.data = dataRemoteService.query();
    }]);

chatControllers.controller('ProfileCtrl', ['$scope',
    function($scope) {
        $scope.text = 'asd';
    }]);

chatControllers.controller('SignupCtrl', ['$scope',
    function($scope) {
        $scope.text = 'asd';
    }]);