'use strict';

/* Controllers */

angular.module('ISPCU.controllers', [])
    .controller('VolunteerController' , ['$scope', '$http', function($scope, $http) {
    $scope.volunteerFunc = function(data) {
        var volunteerData = $scope.volunteerData = {};
//        @method: is the method you want to use to send/request the data... 'PUT','POST','GET'.. etc, etc
//        @url: the url your making the request to, so in this case you have 'volunteer' as the sailsjs model... and 'make' is the function in your controller that saves the users info to the server
//        @params: the parameters that you're passing to the volunteers/make function that your grabbing via 'req.params.paramName' eg: 're.params.email' and storing in the data via Volunteer.create().exec()
        $http({method: 'POST', url: 'http://localhost:8080/volunteer', data: data})
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
    .controller('MemberController' , ['$scope', '$http', function($scope, $http) {
        $scope.memberFunc = function(data) {
            var memberData = $scope.memberData = {};
//          @method: is the method you want to use to send/request the data... 'PUT','POST','GET'.. etc, etc
//          @url: the url your making the request to, so in this case you have 'volunteer' as the sailsjs model... and 'make' is the function in your controller that saves the users info to the server
//          @params: the parameters that you're passing to the volunteers/make function that your grabbing via 'req.params.paramName' eg: 're.params.email' and storing in the data via Volunteer.create().exec()
            $http({method: 'POST', url: 'http://localhost:8080/member', data: data})
                .success(function(data){
                    angular.copy(data.Member, memberData);
                    $scope.member.firstname = "";
                    $scope.member.lastname = "";
                    $scope.member.email = "";
                    $scope.member.ISP = "";
                    $scope.member.address = "";
                    $scope.member.phoneNumber = "";
                    $scope.member.city = "";
                    $scope.member.want = "";
                    //todo displaying something to say it was a success
                })
                .error(function(){
                    //todo displaying something to say something went wrong, and possibly why
                });
        }
    }]);
