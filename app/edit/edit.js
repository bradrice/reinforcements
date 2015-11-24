'use strict';

angular.module('myApp.edit', ['ui.router'])


.controller('EditCtrl', ['$scope', '$stateParams', 'getLessonService', function($scope, $stateParams, getLessonService) {
    $scope.models = {};
    $scope.models.currScreen = 0;
    $scope.models.success = false;
    $scope.models.numScreens;
    $scope.id = $stateParams.id;
    $scope.data = getLessonService.getItem($scope.id);

    $scope.saveScreen = function(){
        getLessonService.updateItem($scope.id);
    }



}])

    .directive('editscreen', function(){
        return {
            restrict: 'E',
            templateUrl: 'edit/screen.html',
            controller: function($scope){

            }
            //link: function(scope, elem, attrs){
            //}
        }
    })

    .directive('editanswer', function(){
        return {
            restrict: 'E',
            templateUrl: 'edit/answer.html',
            require: '^editscreen',
            controller: function($scope){
                //console.log($scope.screen);


            },
            link: function(scope, elem, attrs, screenCtrl){
                $(elem).find("input[type=radio]").on('click', function(e) {
                    console.log(e.target.value + " & " + scope.screen.correct);
                    if(e.target.value=scope.screen.correct){
                        //alert("You are right");
                    }
                });
            }
        }
    });

