var myApp = angular.module('myApp.services', []);

myApp.service('UserService',function() {
	var user = 
	{ 
		id: 76561198060671283, //FuzzDoto
		loggedIn: false 
	};
	return user;
});

myApp.service('LiveLeagueGameService', ['$http', function ($http) {
  var liveGames;

  var config = {
    method : 'GET',
    url:'http://d2connect.com/api/getliveleaguesgames.php'
  }

  this.getLiveGames = function() {
    console.log('LiveGames.get()');
    if(angular.isDefined(liveGames)) {
    } else {
      $http(config).
      success(function (data, status) {
        console.log(data.result.games);
        liveGames = data.result.games;
      }).
      error(function (data, status) {
        console.log(status);
      });
    }
    return liveGames;
  };
}]);


myApp.service('HeroService', ['$http', function ($http) {
	var heroes;

	var config = {
        method : 'GET',
        url:'http://d2connect.com/app/data/heroes.json'
  	};

	this.getHeroes = function() {
    console.log('Hero.get()');
    if(angular.isDefined(heroes)) {
    } else {          
      $http(config).
      success( function (data, status) {
        //console.log(data.result.heroes);
        heroes = data.result.heroes;
      }).
      error(function (data,status) {
        console.log(status);
      });
    }
    return heroes;
   };
}]);
