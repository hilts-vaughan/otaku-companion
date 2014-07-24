angular.module('starter.controllers')
	.filter('noBB', function() {

		return function(input) {

			for (i = 0; i < 1; i++) {
				input = input.replace(/\[(\w+)[^w]*?](.*?)\[\/\1]/g, '$2');
			}

			return input;
		};

	})