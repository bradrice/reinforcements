/**
 * Created by brice on 11/17/2015.
 */
'use strict';

angular.module('myApp.login', ['ui.router'])


    .controller('LoginCtrl', [function($scope, $rootScope, AUTH_EVENTS, AuthService)
        {
            $scope.credentials = {
                username: '',
                password: ''
            };
            $scope.login = function (credentials) {
                AuthService.login(credentials).then(function (user) {
                    $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
                    $scope.setCurrentUser(user);
                }, function () {
                    $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
                });
            };
        }]);