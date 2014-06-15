angular.module('starter.controllers', [])

.filter('displayEpisodeCount', function() {
  return function(input) {
    console.log(input);
    if(input == -1)
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

.controller('LoginController', function($scope, $state) {

  $scope.signIn = function() {
    // Do some cool stuff here
    $state.go("app.browse");
  }


})


.controller('MyListController', function($scope, $state) {

  $scope.doStuff = function() {

  }



})



.controller('AnimeReviewsController', function($scope, $state, $http, $stateParams) {

  $http.get('http://192.168.1.160:8899/mal/anime/id/' + $stateParams.id + '/reviews')
    .success(function(data) {
      $scope.reviews = data.reviews;


    });

})



.controller("AiringController", function($scope, $state, $http) {


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