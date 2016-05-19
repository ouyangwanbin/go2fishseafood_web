var go2fishApp = angular.module('go2fishApp', ['ngRoute']);

go2fishApp.config(function( $routeProvider,$locationProvider ) {
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

    $locationProvider.html5Mode( true );
});
