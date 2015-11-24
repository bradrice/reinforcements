'use strict';

angular.module('myApp.view', ['ui.router'])


.controller('View1Ctrl', ['$scope', '$stateParams', 'getLessonService', function($scope, $stateParams, getLessonService) {
    $scope.models = {};
    $scope.models.currScreen = 0;
    $scope.models.success = false;
    $scope.models.numScreens;
    $scope.id = $stateParams.id;
    $scope.data = getLessonService.getItem($scope.id);


   $scope.nextScreen = function(index){
       //console.log($scope.models.numScreens);
       $scope.models.currScreen = $scope.models.currScreen + 1;
       $("screen:eq(" + index + ")").fadeOut(400, function(){
           setTimeout(function(){
               $("screen:eq(" + $scope.models.currScreen + ")").fadeIn(800);
               if($scope.models.currScreen >= $scope.models.numScreens){
                   $(".congratulations").fadeIn();
               }
           }, 400);

       });
   }
}])
    .directive('screen', function(){
        return {
            restrict: 'E',
            templateUrl: 'view/screen.html',
            controller: function($scope){
                this.enableButton = function(){
                    if($scope.models.success){
                        $("screen:eq(" + $scope.index + ")").find("button").removeAttr('disabled');
                    }
                };

            },
            link: function(scope, elem, attrs){
                scope.index = attrs.index;
                scope.models.numScreens = scope.data.numscreens;
                if(scope.index != scope.models.currScreen){
                    $(elem).css('display', 'none');
                }
            }
        }
    })

    .directive('answer', function(){
    return {
        restrict: 'E',
        templateUrl: 'view/answer.html',
        require: '^screen',
        link: function(scope, elem, attrs, screenCtrl){
            $(elem).on('click', function(){
                if($.inArray(scope.item, scope.screen.answers) == scope.screen.correct){
                    scope.$apply(function() {
                        scope.models.success = true;
                    });
                    //scope.enableButton(scope.index);
                    $(elem).find("button").addClass("correct");
                    $(elem).find("button>span").removeClass("glyphicon-remove");
                    $(elem).find("button>span").addClass("glyphicon-ok").css("visibility", "visible");
                    screenCtrl.enableButton();
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
