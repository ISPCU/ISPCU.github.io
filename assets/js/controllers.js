'use strict';

/* Controllers */

angular.module('ISPCU.controllers', [])
    .controller('VolunteerController' , ['$scope', '$http', function($scope, $http) {
    $scope.volunteerFunc = function(data) {
        var volunteerData = $scope.volunteerData = {};
//        @method: is the method you want to use to send/request the data... 'PUT','POST','GET'.. etc, etc
//        @url: the url your making the request to, so in this case you have 'volunteer' as the sailsjs model... and 'make' is the function in your controller that saves the users info to the server
//        @params: the parameters that you're passing to the volunteers/make function that your grabbing via 'req.params.paramName' eg: 're.params.email' and storing in the data via Volunteer.create().exec()
        $http({method: 'POST', url: 'http://localhost:8080/volunteer/make', data: data})
            .success(function(data){
                angular.copy(data.Volunteer, volunteerData);
                $scope.volunteer.name = "";
                $scope.volunteer.email = "";
                $scope.volunteer.skill = "";
                //todo displaying something to say it was a success
            })
            .error(function(){
                //todo displaying something to say something went wrong, and possibly why
            });
    }
  }])
    .controller('MemberController', [function() {

    }]);