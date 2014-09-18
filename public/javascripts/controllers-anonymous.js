'use strict';

/* Controllers */

var chatControllers = angular.module('chatControllers', []);

chatControllers.controller('RootCtrl', ['$scope', '$q', '$interval', 'uploadService',
    function($scope, $q, $interval, uploadService) {
        $scope.progress = -10;
        var promise = uploadService.getProgress($scope.progress);
        promise.then(function(progress) {
                $scope.progress = progress;
            },
            function(errorPayload) {
                $scope.progress = 'asd';
            },
            function(upload) {
                $scope.progress = upload;
                //$scope.$apply();
            }
        );
        //$interval(function(){ $scope.progress = Math.random();}, 200);

    }]);

chatControllers.factory('uploadService', ['$q', '$interval',
    function($q, $interval){
        return {
            getProgress: function(i) {
                var deferred = $q.defer();
                //var i = 0;
                $interval(function(){
                    deferred.notify(++i);
                    if(i === 100){
                        deferred.resolve(i);
                    }
                }, 200);

                return deferred.promise;
            }
        }
    }]);

chatControllers.directive("withProgressBar",
    function(){
        return {
            restrict: 'A',
            compile : function(elem, attrs){
                elem.prepend("<div class='progress-bar-wrapper'>{{" + attrs.progress + "}}</div>");
            },
            link : function($scope, elem, attrs) {
                $scope.$watch(attrs.progress, function(value){
                    elem.find(".progress-bar-wrapper").html(value);
                });
            },
            scope : {
                'progress' : "=progress"
            }
        };
    });