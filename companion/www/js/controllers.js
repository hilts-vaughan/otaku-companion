angular.module('starter.controllers', [])



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


.controller("AiringController", function($scope, $state, $http) {



  $scope.getSeason = function(season) {

    $http.get('http://192.168.1.160:8899/anichart/' + season)
      .success(function(data) {
        $scope.chartData = data.info;
        $scope.season = data.season;


        $scope.chartData.forEach(function(entry) {
          $http.get('http://192.168.1.160:8899/mal/anime/id/' + entry['mal_id'])
            .success(function(d) {
              $.extend(entry, d);
            });
        });



      });


  };

  $scope.showAnime = function(animeId) {

    $state.go("app.animedetails", {
      id: animeId
    });
  };


  $scope.getSeason('summer');



})



.directive('ngAnime', function() {
  return {
    restrict: 'AEC',
    require: '^ngModel',
    templateUrl: 'templates/directives/anime-card.html'
  }
})

.controller("AnimeDetailsController", function($scope, $state, $http, $stateParams) {


  $http.get('http://192.168.1.160:8899/mal/anime/id/' + $stateParams.id)
    .success(function(data) {
      $scope.anime = data;



    });



})