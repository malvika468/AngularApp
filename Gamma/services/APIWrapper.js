var app = angular.module('gammaApp');

// wrapper service to consume rest api

app.factory('ServerAPIWrapper', function ($http,$q) {

   
    return {
        SendToServer: function (methodtype,data,func,params="") {

            var myPromise = $q.defer();
            $http({
                method: methodtype,
                url: 'http://35.200.250.5:5000/' + func,
                data: data,
                params:params
            }).then(function successCallback(response) {
                console.log("Successfully POST-ed data");
                myPromise.resolve(response);
                }, function errorCallback(response) {
                myPromise.resolve(response);
                console.log("POST-ing of data failed");
                });
            return myPromise.promise;
        }
    }


});