angular.module('starter.controllers')
	.controller('LoginController', function($scope, $state, localStorageService, $location) {

		$scope.user = {};
		$scope.username = "";
		$scope.password = "";

		$scope.signIn = function(user) {

			// Set some values here and then attempt to sign in again
			localStorageService.set('username', user.username);
			localStorageService.set('password', user.password);
			$location.path("/");
		}


	})