angular.module('starter.controllers', ['LocalStorageModule'])


.config(['localStorageServiceProvider',
  function(localStorageServiceProvider) {
    localStorageServiceProvider.setPrefix('otaku');
  }
])


.filter('displayEpisodeCount', function() {
  return function(input) {
    console.log(input);
    if (input == -1)
      return "Unknown";
    else
      return input;
  };
})



.controller('AppCtrl', function($scope) {})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [{
    title: 'Reggae',
    id: 1
  }, {
    title: 'Chill',
    id: 2
  }, {
    title: 'Dubstep',
    id: 3
  }, {
    title: 'Indie',
    id: 4
  }, {
    title: 'Rap',
    id: 5
  }, {
    title: 'Cowbell',
    id: 6
  }];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {})

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


.controller('MyListController', function($scope, $state) {

  $scope.doStuff = function() {

  }



})


.controller('EntryController', function($scope, $state, $http, $stateParams, localStorageService, $location, $timeout) {

  // Set our headers as needed
  var username = localStorageService.get('username');
  var password = localStorageService.get('password');
  var b = btoa(username + ":" + password);
  $http.defaults.headers.common['Authorization'] = 'Basic ' + b;

  $timeout(function() {


    // We'll attempt to authenticate with the server; if OK we can proceed, otherwise go to login
    $http.get('http://192.168.1.160:8899/mal/user/').success(function(data) {
      console.log(data);
      if (data.user) {
        // OK, we're good. Go to the airing page...
        $location.path("app/airing");
      } else {
        $location.path('/login');
      }


    });



  }, 2000)



})

.controller('AnimeReviewsController', function($scope, $state, $http, $stateParams) {

  $http.get('http://192.168.1.160:8899/mal/anime/id/' + $stateParams.id + '/reviews')
    .success(function(data) {
      $scope.reviews = data.reviews;


    });

})


.controller('SearchCtrl', function($scope, $state, $http) {

  $scope.types = [{
    title: "Anime",
    value: "Anime"
  }, {
    title: "Manga",
    value: "Manga"
  }];

  $scope.currentType = $scope.types[0];
  $scope.currentQuery = "";

  $scope.updateText = function(option) {

  };

  $scope.updateDropdown = function(option) {

  };

})


.controller("AiringController", function($scope, $state, $http, $ionicViewService) {

  $ionicViewService.clearHistory();

  $scope.seasons = [{
    title: "Spring",
    value: 'spring'
  }, {
    title: "Summer",
    value: 'summer'
  }, {
    title: "Winter",
    value: 'winter'
  }, {
    title: "Fall",
    value: 'fall'
  }];

  $scope.currentSeason = $scope.seasons[0];

  $scope.getSeason = function(season) {

    $http.get('http://192.168.1.160:8899/anichart/' + season)
      .success(function(data) {
        $scope.chartData = data.info;
        $scope.season = data.season;



      });


  };

  $scope.showAnime = function(animeId) {

    $state.go("app.animedetails", {
      id: animeId
    });
  };

  $scope.update = function(option) {
    $scope.getSeason(option.value);
  };


  $scope.getSeason($scope.currentSeason.value);



})



.directive('ngAnime', function() {
  return {
    restrict: 'AEC',
    require: '^ngModel',
    templateUrl: 'templates/directives/anime-card.html'
  }
})

.controller("AnimeDetailsController", function($scope, $state, $http, $stateParams) {

  $scope.goToReview = function() {
    $state.go("app.animereviews", {
      id: $scope.anime.mal_id
    });
  };

  $http.get('http://192.168.1.160:8899/mal/anime/id/' + $stateParams.id)
    .success(function(data) {
      $scope.anime = data;



    });



})