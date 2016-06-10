var go2fishApp = angular.module('go2fishApp', ['ngRoute']);

go2fishApp.config(function($routeProvider, $locationProvider) {
    $routeProvider
    // route for the home page
        .when('/', {
            templateUrl: '../pages/home/home.html',
            controller: 'mainController'
        })
        // route for the login page
        .when('/login', {
            templateUrl: '../pages/login/login.html',
            controller: 'loginController'
        })
        // route for the logout
        .when('/logout', {
            template:"",
            controller: 'logoutController'
        })
    $locationProvider.html5Mode(true);
}).run(function($rootScope) {
    if (!$rootScope.user) {
        $rootScope.user = null;
    }
});



go2fishApp.controller('logoutController', ['$scope', '$rootScope', '$http', '$location', function($scope, $rootScope, $http, $location) {
    //if user already logout , go to home page directly.
    if ($rootScope.user === null) {
        $location.path('/');
    }
    $http.get('/logout').then(function(res) {
        $rootScope.user = null;
        $location.path('/');
    }, function(res) {
        console.log(res);
    })
}]);
