angular.module('starter.controllers')
	.filter('displayEpisodeCount', function() {
		return function(input) {
			if (input == -1)
				return "Unknown";
			else
				return input;
		};
	})