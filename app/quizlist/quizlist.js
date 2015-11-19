'use strict';

angular.module('myApp.quizlist', ['ui.router'])


.controller('QuizListCtrl', [function() {
    var course = this;
    course.list = ['12', '13', '14'];
}]);