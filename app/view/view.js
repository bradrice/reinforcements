'use strict';

angular.module('myApp.view', ['ui.router'])


.controller('View1Ctrl', ['$scope', function($scope) {
    //$scope.greeting = 'Hola!';
    //console.log($scope.greeting);
    //$scope.checkAnswer = function(item, correct){

    //}
}])

    .directive('answer', function(){
    return {
        restrict: 'E',
        templateUrl: 'view/screen.html',
        link: function(scope, elem){
            $(elem).on('click', function(){
                if(scope.item == scope.screen.correct){
                    console.log("correct");
                    $(elem).find("button").addClass("correct");
                    $(elem).find("button>span").removeClass("glyphicon-remove");
                    $(elem).find("button>span").addClass("glyphicon-ok").css("visibility", "visible");
                }
                    else {

                    $(elem).find("button").addClass("incorrect");
                    $(elem).find("span").css("visibility", "visible");
                    $(elem).attr("disable", "true");
                }
            })
        }
    }
});