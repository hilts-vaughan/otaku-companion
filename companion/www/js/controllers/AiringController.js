angular.module('starter.controllers')
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
          console.log($scope.chartData)


        });


    };

    $scope.showAnime = function(animeId) {


      $state.go("app.animedetails", {
        id: animeId,
        type: "anime"
      });
    };

    $scope.update = function(option) {
      $scope.getSeason(option.value);
    };


    $scope.getSeason($scope.currentSeason.value);



  })