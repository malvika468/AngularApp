var signupApp = angular.module('gammaApp');

signupApp.controller("signupController", function ($scope, $http, $state, ServerAPIWrapper) {

    $scope.email = "";
    $scope.name = "";
    $scope.password = "";

    // redirect to login
    $scope.redirectToLogin = function () {
        $state.go('login');
    }
    // register function
    $scope.register_func = function () {

        if ($scope.name.length === 0 || $scope.email.length === 0 || $scope.password.length === 0) {

        }
        else
        {
            params = { "email_id": $scope.email }
            data = {}
            // verify if user already exists
            ServerAPIWrapper.SendToServer('GET',data,'user',params).then(function (response) {

               if (response.status === 200 ||  response.data.name === $scope.name) {
                   alert('User already exists ! Please Sign In');
                }
                else
                {
                    data = {
                        "name": $scope.name,
                        "email_id": $scope.email,
                        "password": $scope.password
                    }
                    ServerAPIWrapper.SendToServer('POST', data, 'sign_up').then(function (response) {

                        if (response.status === 200) {
                            alert('Registration Successful ! Sign In Now !');
                        }
                        else {
                            alert('Error in Registration');
                        }
                    });
                }
            });
        }
    };
});