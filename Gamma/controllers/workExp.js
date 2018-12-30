var workexpApp = angular.module('gammaApp');

workexpApp.controller("workExpController", function ($scope, $http, $state, $rootScope, uiGridConstants, $timeout, ServerAPIWrapper) {

       $scope.workExpList = []
       params = { "email_id": $rootScope.currentuser }
       data = {}
      // get current username
       ServerAPIWrapper.SendToServer('GET', data, 'user', params).then(function (response) {

           if (response.data.name) {
               $scope.currentname = response.data.name;
               console.log($scope.currentname);
           }
        });
      // get current user work history
        ServerAPIWrapper.SendToServer('GET', data, 'user_job_history', params).then(function (response) {
            if (response.data.past_jobs) {
                $scope.workExpList = response.data.past_jobs;
                $scope.gridOptions.data = $scope.workExpList;
                console.log("response of work exp", $scope.workExpList);
            }
        });
     
      //ui grid to display data  
    $scope.gridOptions = {
        data: $scope.workExpList ,
        enableGridMenu: false,
        columnDefs: [
            { name: 'company_name', enableHiding: false },
            { name: 'description', enableHiding: false },
            { name: 'location', enableHiding: false },
            { name: 'start_date', enableHiding: false },
            { name: 'title', enableHiding: false }
        ]
    };
    // add new work history form
    $scope.openForm = function () {
        document.getElementById("myForm").style.display = "block";
    }
    $scope.closeForm= function () {
        document.getElementById("myForm").style.display = "none";
    }
    
    $scope.AddDetail = function () {

        if ($scope.company.length === 0 || $scope.title.length === 0 || $scope.date.length === 0 || $scope.location.length === 0 ||
            $scope.description.length === 0 || $scope.email.length === 0) {
        }
        else
        {
            document.getElementById("myForm").style.display = "none";
            data = {
                "company_name": $scope.company,
                "title": $scope.title,
                "start_date": $scope.date,
                "location": $scope.location,
                "description": $scope.description,
                "email_id": $scope.email
            }
            ServerAPIWrapper.SendToServer('POST', data, 'user_job_history').then(function (response) {
                if (response.status === 200) {
                    console.log("work exp added success");
                }  
            });

            // refresh the state
            $timeout(function () {
                $state.go($state.current, {}, { reload: true });
            }, 200);
        }
    }

});