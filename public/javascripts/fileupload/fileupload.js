'use strict'

var fileUpload = angular.module('fileUpload', []);

fileUpload.controller('fileUploadCtrl', ['$scope',
    function($scope){
        //alert('asd');
        $scope.text = 'asd';
    }]);

fileUpload.directive("fileUpload", function(){
   return {
       restrict : 'E',
       templateUrl : '/partials/upload-form.html',
       compile : function(elem, attrs){
           var file = null;

           if (window.File && window.FileReader && window.FileList) {
               
               $("#input-files").on("change", function(e){
                   var files = e.target.files || e.dataTransfer.files;

                   if (files) {
                       //send only the first one
                       file = files[0];
                   }
               });
           } else {
               //browser has no support for HTML5 File API
           }

           $('#button-upload').on('click', function(evt) {
               evt.preventDefault();
               //$('div.progress').show();
               var formData = new FormData();
               formData.append('myFile', file);

               var xhr = new XMLHttpRequest();

               xhr.open('post', '/upload/image', true);

               xhr.upload.addEventListener("progress", function(e) {
                   if (e.lengthComputable) {
                       var percentage = (e.loaded / e.total) * 100;
                       $('#progress').html(percentage + '%');
                   }
               });

               xhr.onreadystatechange = function(){
                   if (xhr.readyState == 4 && xhr.status == 200){
                        $('#progress').html('done');
                   }
               };

               xhr.onerror = function(e) {
                   $('#progress').html('An error occurred while submitting the form. Maybe your file is too big');
               };

               xhr.send(formData);

           });
       },
       link : function($scope, elem, attrs) {

       },
       scope : {
           name : "@name"
       }
   };
});