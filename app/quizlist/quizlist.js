'use strict';

angular.module('myApp.quizlist', ['ui.router', 'firebase'])


.controller('QuizListCtrl', ['$scope', '$state', 'getCourseService', function($scope, $state, getCourseService) {
    $scope.courselist = getCourseService.getItems();

    $scope.removeItem = function(id){
        $('#removeModal').modal({ backdrop: 'static', keyboard: false })
        .one('click', '#delete', function() {
            console.log("removing item: " + id);
            getCourseService.removeItem(id);
            $("#removeModal").hide();
        });

    }

    $scope.createNewLesson = function() {
        $state.go('add');
    }
}]);