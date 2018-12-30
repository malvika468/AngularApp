var gammaApp = angular.module('gammaApp');

// routing file to load different states by default it will route to login

gammaApp.config(function ($stateProvider, $urlRouterProvider, $locationProvider){
	
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });

    $urlRouterProvider.otherwise('/login');

    $stateProvider.state('login', {
        url: '/login',
        templateUrl: 'htmlFragments/Login.html',
        controller: 'loginController',
        params: { 'redirectstate': null, 'redirectstateparams': null }
    });


    $stateProvider.state('signup', {
        url: '/signup',
        templateUrl: 'htmlFragments/SignUp.html',
        controller: 'signupController',
        params: { 'redirectstate': null, 'redirectstateparams': null }
    });


    $stateProvider.state('workExp', {
        url: '/workExp',
        templateUrl: 'htmlFragments/WorkExp.html',
        controller: 'workExpController',
        params: { 'redirectstate': null, 'redirectstateparams': null }
    });



});


