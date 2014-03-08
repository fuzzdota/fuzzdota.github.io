var myApp = angular.module('myApp', ['ngResource']);

myApp.controller('LeagueCtrl', ['$scope', '$http', function($scope, $http) {
  $scope.titlez = "mah title?";
  $http.get('http://d2connect.com/api/getplayersummaries.php').success(function(data) {
      $scope.resultzz = data.response;
      $scope.profilePic = data.response.players[0].avatar;
  });
}]);	

myApp.controller('LeagueCtrlz', ['$scope', '$http', function($scope, $http) {
  $scope.titlez = "mah title?";
  $http.get('http://d2connect.com/api/getsupportedapilist.php').success(function(data) {
      $scope.resultzz = data;
  });
}]);	

myApp.controller('LeagueCtrlzz', ['$scope', '$http', function($scope, $http) {
  $scope.titlez = "mah title?";
  $http.get('http://d2connect.com/api/getrecentlyplayedgames.php').success(function(data) {
      $scope.resultzz = data;
  });
}]);	

myApp.controller('HeroCtrl', ['$scope', '$http', 'HeroesService', function($scope, $http, HeroesService) {
  $scope.titlez = "mah title?";
  HeroesService.get().then(function(result) {
    $scope.resultzz = result;
  });


  $scope.dostuff = function() {
    HeroesService.getHeroId(108).then(function(result){
      $scope.resultz = result;
    });
  }
}]);


myApp.controller('TestAPICtrl', ['$scope', '$http', function($scope, $http) {
  $scope.titlez = "mah title?";
  $http.get('http://d2connect.com/api/getschema.php').success(function(data) {
      $scope.resultzz = data;
  });
}]);  



myApp.service('HeroesService', ['$http', '$q', function($http, $q) {
  var herolist; 

  this.get = function() {
    var deferred = $q.defer();
    if(angular.isDefined(herolist)) {
      deferred.resolve(herolist);    
    } else {          
      console.log("herolist not defined! get()");
      var config = {
        method : 'GET',
        url:'http://d2connect.com/app/data/heroes.json'
      };
      $http(config).
      success( function(data, status) {
        herolist = data.result.heroes;
        deferred.resolve(herolist);
      }).
      error(function(data,status) {
        console.log(status);
      });
    }
    return deferred.promise;
  };

  this.getHeroId = function(id) {
    var deferred = $q.defer();
    if(angular.isDefined(herolist)) {
      deferred.resolve(herolist[id-1]);    
    } else {    
      console.log("herolist not defined! getId()");
      var config = {
        method : 'GET',
        url:'http://d2connect.com/app/data/heroes.json'
      };
      $http(config).
      success( function(data, status) {
        herolist = data.result.heroes;
        deferred.resolve(herolist.f);
      }).
      error(function(data,status) {
        console.log(status);
      });     
    }
    return deferred.promise; 
  };
}]);
