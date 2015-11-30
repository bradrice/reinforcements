'use strict';

angular.module('myApp.add', ['ui.router'])


.controller('AddCtrl', ['$scope', '$stateParams', '$state', 'getCourseService', function($scope, $stateParams, $state, getCourseService) {
    $scope.models = {};
    $scope.models.currScreen = 0;
    $scope.models.success = false;
    $scope.models.numScreens = 1;
    $scope.id = $stateParams.id;
    $scope.newItem = {
        lessontitle: "",
        type: "",
        numscreens: "",
        screens: [
            {
                question: "",
                answers: ["",],
                correct: ""
            }
        ]
    };

    $scope.saveLesson = function () {
        getCourseService.addItem(angular.copy($scope.newItem));
        $state.go('quizlist');
    };

}])
    .directive('addscreen', function(){
        return {
            restrict: 'E',
            templateUrl: 'add/screen.html',
            controller: function($scope){
            },
            link: function(scope, elem, attrs){
                scope.addScreen = function() {
                    console.log(scope.$parent.newItem.screens.length);
                    scope.$parent.newItem.numscreens = scope.$parent.newItem.screens.length;
                    scope.$parent.newItem.screens.push({
                        question: "",
                        answers: [""]   ,
                        correct: ""
                    });
                }

            }
        }
    })

    .directive('addanswer', function(){
    return {
        restrict: 'E',
        templateUrl: 'add/answer.html',
        link: function (scope, elem, attrs) {
           //console.log(scope);
            scope.addAnswer = function () {
                    scope.$parent.screen.answers[scope.$index] = scope.answer;
                    scope.$parent.screen.answers.push("");
            };
            scope.setCorrect = function() {

            }
        }
    }

});
