var myApp = angular.module('myApp', ['ngRoute', 'myApp.services']);

myApp.config(['$routeProvider', function($routeProvider) {
	$routeProvider
	.when('/',
	{
		auth: false,
		templateUrl:'partials/live-tournament.html'
	})
	.when('/first',
	{		
		auth: true,
		templateUrl:'partials/main.html',
		//controller: 'ExclusiveCtrl'
	})
	.when('/Blog',
	{
		auth: false,
		templateUrl:'components/blog.html'
	})
	.when('/Card',
	{
		auth: false,
		templateUrl:'components/card.html'
	})
	.when('/lazer-demo',
	{
		auth: false,
		templateUrl:'partials/lazer-demo.html'
	})
	.when('/live-tournaments/',
	{
		auth: false,
		templateUrl:'partials/exclusive.html',
		// only use this if there is no <div ng-controller> in template
		//controller:'LiveTournamentCtrl'
	})
	.when('/player/:playerId',
	{
		auth: false,
		templateUrl:'partials/player.html',
		//controller:'PlayerCtrl'
	})
	.otherwise({
		redirectTo: '/'
	});
}]);

myApp.controller('MainCtrl', ['$scope', '$http', function ($scope, $http) {
	console.log('MainCtrl');
	//---------------------initialize heroes------------------------
	$scope.heroes;
	var configHero = {
		method : 'GET',
		url:'http://d2connect.com/app/data/heroes.json'
	}

	$http(configHero).
	success(function (data, status) {
		console.log('HeroAPI'+ data.result.heroes);
		$scope.heroes = data.result.heroes;
	}).
	error(function (data, status) {
		console.log(status);
	});	

	//---------------------initialize leagues------------------------
	$scope.leagues;
	var configLeagues = {
	method : 'GET',
	url:'http://d2connect.com/api/getleaguelisting.php'
	}
	$http(configLeagues).
	success(function (data, status) {
		console.log('LeagueListAPI'+ data.result.leagues);
		$scope.leagues = data.result.leagues;
	}).
	error(function (data, status) {
		console.log(status);
	});	

	//---------------------initialize item schema------------------------
	$scope.items;
	var configSchema = {
	method : 'GET',
	url:'http://d2connect.com/api/getschema.php'
	}
	$http(configSchema).
	success(function (data, status) {
		console.log('SchemaAPI'+ data.result.items);
		$scope.items = data.result.items;
	}).
	error(function (data, status) {
		console.log(status);
	});	
}]);

myApp.controller('HomeCtrl', ['$scope', function ($scope) {
	console.log('HomeCtrl');
}]);

myApp.controller('PlayerCtrl', ['$scope', '$http', '$routeParams', function ($scope, $http, $routeParams) {
	console.log('PlayerCtrl');
}]);

myApp.controller('ExclusiveCtrl', ['$scope', 'UserService', '$location' ,'$http', function ($scope, UserService, $location, $http) {
	console.log('ExclusiveCtrl');
}]);

myApp.controller('LiveTournamentCtrl', 
	['$scope', '$http', '$location', '$anchorScroll', 'LiveLeagueGameService', 'HeroService',
	function ($scope, $http, $location, $anchorScroll, LiveLeagueGameService, HeroService) {

	console.log('LiveTournamentCtrl');
	$scope.radiant = 0;
	$scope.dire = 1;

	var configTournament = {
		method : 'GET',
		url:'http://d2connect.com/api/getliveleaguesgames.php'
	}

	$http(configTournament).
	success(function (data, status) {
		console.log('TournamentAPI' + data.result.games);
		$scope.games = data.result.games;
	}).
	error(function (data, status) {
		console.log(status);
	});
	
	$scope.goTo = function(id) {
	    //  save old location
	    var old = $location.hash();

	   	// set the location.hash to the id of
	    // the element to scroll to.
	    $location.hash(id);
	    
	    // call $anchorScroll()
	    $anchorScroll();

	    // prevent browser from re-render the page
	    $location.hash(old);
	}
	
	$scope.findLeagueIndex = function (id){
		console.log("id:"+id);
		for(var i = 0; i < $scope.leagues.length; i++ ){
			console.log("ha:" + $scope.leagues[i].leagueid);
			if($scope.leagues[i].leagueid == id) {
				return $scope.leagues[id].itemdef;
			}
		}
	}
	
	$scope.getTowerStateColor = function(index, towerStates) {
		var bitarray = (towerStates).toString(2);
		if(bitarray[index] == 1){
			if(index == 0 || index == 1 || index == 11 || index == 12) {
				return 'label label-warning';
			} else {
				return 'label label-success';
			}
		} else {
			return 'label label-default';
		}
	}
}]);

