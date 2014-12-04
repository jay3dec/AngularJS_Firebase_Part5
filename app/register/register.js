'use strict';

angular.module('myApp.register', ['ngRoute','firebase'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/register', {
        templateUrl: 'register/register.html',
        controller: 'RegisterCtrl'
    });
}])

.controller('RegisterCtrl', ['$scope','$location','$firebaseSimpleLogin', function($scope,$location,$firebaseSimpleLogin) {

    var firebaseObj = new Firebase("https://blistering-heat-2473.firebaseio.com");
    var auth = $firebaseSimpleLogin(firebaseObj);


    $scope.signUp = function() {
        if (!$scope.regForm.$invalid) {
            var email = $scope.user.email;
            var password = $scope.user.password;
            if (email && password) {
                auth.$createUser(email, password)
                    .then(function(user) {
                        // do things if success
                        console.log(user);
			$location.path('/home');
                    }, function(error) {
                        // do things if failure
                        console.log(error);
			$scope.regError = true;
			$scope.regErrorMessage = error.message;
                    });
            }
        }
    };
}]);
