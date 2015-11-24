'use strict';

angular.module('myApp.quizlist', ['ui.router', 'firebase'])


.controller('QuizListCtrl', ['$scope', '$firebaseArray', 'getCourseService', function($scope, $firebaseArray, getCourseService) {
    $scope.courselist = getCourseService.getItems();
}]);