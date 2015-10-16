(function(){
	'use strict';

	var app = angular.module('ticktock');	

	app.filter('clockView', function(){
		return function(input){
			if(input < 10){
				return '0'+input;
			}
			return input;
		};
	});
})();