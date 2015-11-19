'use strict';

// Declare app level module which depends on views, and components
var myApp = angular.module('myApp', [
    'ui.router',
    'myApp.login',
    'myApp.view',
    'myApp.quizlist',
    'myApp.edit'
]
);

myApp.service("getCourseService", function GetCourse($http){
    var getCourseService = {
        async: function() {
            // $http returns a promise, which has a then function, which also returns a promise
            var promise = $http.get('data/courses.json').then(function (response) {
                // The then function here is an opportunity to modify the response
                //console.log(response);
                // The return value gets picked up by the then in the controller.
                return response.data[0];
            });
            // Return the promise to the controller
            return promise;
        }
    };
    return getCourseService;
});

myApp.config(function($stateProvider, $urlRouterProvider) {
    //
    // For any unmatched url, redirect to /state1
    $urlRouterProvider.otherwise("/quizlist");
    //
    // Now set up the states
    $stateProvider
        .state('login', {
            url: "/login",
            templateUrl: "login/login.tmpl.html",
            controller: 'LoginCtrl'
        })
        .state('view', {
            url: "/view",
            templateUrl: "view/view.html",
            controller: 'View1Ctrl'
        })
        .state('view.id', {
            url: "/:id",
            templateUrl: "view/item.html",
            controller: function($scope, $stateParams, getCourseService) {
                $scope.id = $stateParams.id;
                getCourseService.async().then(function(d) {
                    $scope.data = d;
                    //console.log($scope.data);
                });
            }
        })
        .state('quizlist', {
            url: "/quizlist",
            templateUrl: "quizlist/quizlist.html",
            controller: 'QuizListCtrl',
            controllerAs: 'course'
        })
        .state('edit', {
            url: "/edit",
            templateUrl: "edit/edit.html",
            controller: 'EditCtrl',
            controllerAs: 'course'
        })
        .state('edit.id', {
            url: "/:id",
            templateUrl: "edit/item.html",
            controller: function($scope, $stateParams) {
                $scope.id = $stateParams.id;
            }
        });
})
    .constant('AUTH_EVENTS', {
        loginSuccess: 'auth-login-success',
        loginFailed: 'auth-login-failed',
        logoutSuccess: 'auth-logout-success',
        sessionTimeout: 'auth-session-timeout',
        notAuthenticated: 'auth-not-authenticated',
        notAuthorized: 'auth-not-authorized'
    })
    .constant('USER_ROLES', {
        all: '*',
        admin: 'admin',
        editor: 'editor',
        guest: 'guest'
    })
    .factory('AuthService', function ($http, Session) {
        var authService = {};

        authService.login = function (credentials) {
            return $http
                .post('/login', credentials)
                .then(function (res) {
                    Session.create(res.data.id, res.data.user.id,
                        res.data.user.role);
                    return res.data.user;
                });
        };

        authService.isAuthenticated = function () {
            return !!Session.userId;
        };

        authService.isAuthorized = function (authorizedRoles) {
            if (!angular.isArray(authorizedRoles)) {
                authorizedRoles = [authorizedRoles];
            }
            return (authService.isAuthenticated() &&
            authorizedRoles.indexOf(Session.userRole) !== -1);
        };

        return authService;
    })
    .service('Session', function () {
        this.create = function (sessionId, userId, userRole) {
            this.id = sessionId;
            this.userId = userId;
            this.userRole = userRole;
        };
        this.destroy = function () {
            this.id = null;
            this.userId = null;
            this.userRole = null;
        };
    })
    .controller('ApplicationController', function ($scope,
                                                   USER_ROLES,
                                                   AuthService) {
        $scope.currentUser = null;
        $scope.userRoles = USER_ROLES;
        $scope.isAuthorized = AuthService.isAuthorized;

        $scope.setCurrentUser = function (user) {
            $scope.currentUser = user;
        };
    });