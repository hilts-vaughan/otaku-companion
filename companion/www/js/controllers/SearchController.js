angular.module('starter.controllers')
  .controller('SearchCtrl', function($scope, $state, $http, localStorageService) {

    $scope.types = [{
      title: "Anime",
      value: "anime"
    }, {
      title: "Manga",
      value: "manga"
    }];

    $scope.currentType = $scope.types[0];
    $scope.currentQuery = "";

    $scope.showAnime = function(animeId) {

      $state.go("app.animedetails", {
        id: animeId,
        type: $scope.currentType.value
      });

    };


    $scope.updateText = function(option) {

      $scope.results = {};
      $scope.currentQuery = option;


      $scope.reload();


    };

    $scope.updateDropdown = function(option) {
      $scope.currentType = option;

      $scope.reload();
    };



    $scope.reload = function() {


      if ($scope.currentQuery.length < 4)
        return;


      // Set our headers as needed
      var username = localStorageService.get('username');
      var password = localStorageService.get('password');
      var b = btoa(username + ":" + password);
      $http.defaults.headers.common['Authorization'] = 'Basic ' + b;


      $http.get('http://192.168.1.160:8899/mal/search/' + $scope.currentType.value + '?q=' + $scope.currentQuery)
        .success(function(data) {
          if (data.anime)
            $scope.results = data.anime.entry;
          if (data.manga)
            $scope.results = data.manga.entry;

        });

    };



  })