'use strict';

angular.module('myApp.edit', ['ui.router'])


.controller('EditCtrl', ['$scope', '$stateParams', 'getLessonService', function($scope, $stateParams, getCourseService) {
    $scope.models = {};
    $scope.models.currScreen = 0;
    $scope.models.success = false;
    $scope.models.numScreens;
    $scope.id = $stateParams.id;
    $scope.data = getCourseService.getItem($scope.id);
    //console.log($scope.id);
    $scope.saveScreen = function(id){
        //console.log($scope.data.screens[1].answers);
        for(var i = 0; i < $scope.data.screens.length-1; i++){
            for(var x = 0; x < $scope.data.screens[i].answers.length; x++){
                if($scope.data.screens[i].answers[x] == ""){
                    $scope.data.screens[i].answers.splice(x,1);
                }
            }

        }
        getCourseService.updateItem(id);
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
                    console.log(scope.$index);
                    scope.correct = scope.$index;
                });
                scope.addAnswer = function () {
                    //console.log(scope.item);
                    scope.$parent.screen.answers[scope.$index] = scope.item;
                    scope.$parent.screen.answers.push("");
                };
                scope.updateAnswer = function () {
                    //console.log(scope.item);
                    scope.$parent.screen.answers[scope.$index] = scope.item;
                };
                scope.removeAnswer = function () {
                    //console.log(scope.item);
                    scope.$parent.screen.answers.splice(scope.$index, 1);
                };
                scope.setCorrectAnswer = function(index) {
                    console.log(index);
                    scope.correct = index;
                }
            }
        }
    });

