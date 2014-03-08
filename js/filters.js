var myApp = angular.module('myApp.filters', []);

myApp.filter('getById', function() {
	return function(input, id) {
		for( var i =0; i < input.length; i++ ) {
			if(input[i].id == id){
				return input[i];
			}
		}
		return null;
	} 
});
