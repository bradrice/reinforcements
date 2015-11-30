'use strict';

// Declare app level module which depends on views, and components
var myApp = angular.module('myApp', [
    'ui.router',
    'myApp.login',
    'myApp.view',
    'myApp.quizlist',
    'myApp.edit',
    "firebase",
    'myApp.add',
    'ui.sortable'
]
);

myApp.constant('FIREBASE_URI', 'https://tureinforcements.firebaseio.com/');

myApp.factory("getCourseService", ['$firebaseArray', 'FIREBASE_URI',  function GetCourse($firebaseArray, FIREBASE_URI){
    var ref = new Firebase(FIREBASE_URI);
    var items = $firebaseArray(ref);

    var getItems = function (id) {
            return items;
    };

    var addItem = function (item) {
        items.$add(item);
    };

    var updateItem = function (id) {
        items.$save(id);
    };

    var removeItem = function (id) {
        items.$remove(id);
    };

    var getItem = function(id) {
        return items.$getRecord(id);
    }

    return {
        getItems: getItems,
        addItem: addItem,
        updateItem: updateItem,
        removeItem: removeItem,
        getItem: getItem
    }
}]);

myApp.factory("getLessonService", ['$firebaseObject', 'FIREBASE_URI',  function GetLesson($firebaseObject, FIREBASE_URI){

    var ref, item;

    var getItem = function (id) {
        ref = new Firebase(FIREBASE_URI + id);
        item = $firebaseObject(ref);
        return item;
    };

    var addItem = function (item) {
        item.$add(item);
    };

    var updateItem = function (id) {
        item.$save(id);
    };

    var removeItem = function (id) {
        item.$remove(id);
    };

    return {
        getItem: getItem,
        addItem: addItem,
        updateItem: updateItem,
        removeItem: removeItem
    }
}]);






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
            controller: "View1Ctrl"
        })
        .state('quizlist', {
            url: "/quizlist",
            templateUrl: "quizlist/quizlist.html",
            controller: 'QuizListCtrl'
        })
        .state('edit', {
            url: "/edit",
            templateUrl: "edit/edit.html",
            controller: 'EditCtrl'
        })
        .state('edit.id', {
            url: "/:id",
            templateUrl: "edit/item.html",
            controller: "EditCtrl"
        })
        .state('add', {
            url: "/add",
            templateUrl: "add/add.html",
            controller: 'AddCtrl'
        })
        .state('add.id', {
            url: "/:id",
            templateUrl: "add/item.html",
            controller: "AddCtrl"
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

function tuscreen(fbname){
    this.firebase = new Firebase("https://"+ fbname +"firebaseio.com/");
}