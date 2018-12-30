var authApp = angular.module('gammaApp');
authApp.controller("loginController", function ($scope, $state, $http, $rootScope, ServerAPIWrapper) {

    // redirect to signup
    $scope.redirectToSignUp = function () {
        $state.go('signup');
    }
    $scope.email = "";
    $scope.password = "";

    // login function 
    $scope.login_func = function () {

        if ($scope.email.length === 0 || $scope.password.length === 0) {

        }
        else {
            var isAuthenticated = false;
            $scope.errorMessage = false;
            data = {
                "email_id": $scope.email,
                "password": $scope.password
            }
            ServerAPIWrapper.SendToServer('POST', data, 'login').then(function (response) {

                if (response.data.email_id) {
                    var isAuthenticated = true;
                    $rootScope.currentuser = response.data.email_id;
                    if (isAuthenticated == true) {
                        $state.go('workExp');
                    }
                }
                else {
                    alert('Error !! Wrong Password or Email ');
                }
            });
        }
    };
});