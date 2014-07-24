angular.module('starter.controllers')
	.controller('AnimeReviewsController', function($scope, $state, $http, $stateParams) {

		console.log($stateParams)
		$http.get('http://192.168.1.160:8899/mal/{}/id/'.replace('{}', $stateParams.type) + $stateParams.id + '/reviews')
			.success(function(data) {
				$scope.reviews = data.reviews;


			});

	})