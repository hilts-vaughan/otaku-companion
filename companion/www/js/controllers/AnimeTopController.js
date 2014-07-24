angular.module('starter.controllers')
  .controller('AnimeController', function($scope, $state, $http) {

    $scope.rankIndex = 0;
    $scope.items = [];
    $scope.canLoad = true;

    $scope.pageRanked = function() {


      $http.get('http://192.168.1.160:8899/mal/chart/anime/' + $scope.rankIndex)
        .success(function(data) {


          var wait = data.length - 1;
          var back = 0;
          var i = 0;

          for (i = 0; i < wait; i++) {

            $http.get('http://192.168.1.160:8899/mal/anime/id/' + data[i].url)
              .success(function(anime) {

                $scope.items.push(anime);
                back++;

                if (back == wait) {

                  $scope.items = _.sortBy($scope.items, function(o) {
                    return parseInt(o.malstats.rank);
                  });

                  console.log($scope.items);

                  $scope.$broadcast('scroll.infiniteScrollComplete');
                }

              });

          }



          // page limit by 30
          $scope.rankIndex += 30;

        });



    };


    $scope.pagePopular = function() {


      $http.get('http://192.168.1.160:8899/mal/chart/animePop/' + $scope.rankIndex)
        .success(function(data) {

          console.log($scope.rankIndex)
          var wait = data.length - 1;
          var back = 0;
          var i = 0;

          for (i = 0; i < wait; i++) {

            $http.get('http://192.168.1.160:8899/mal/anime/id/' + data[i].url)
              .success(function(anime) {

                $scope.items.push(anime);
                back++;

                if (back == wait) {
                  $scope.$broadcast('scroll.infiniteScrollComplete');

                  $scope.items = _.sortBy($scope.items, 'malstats.rank');

                }

              });

          }



          // page limit by 30
          $scope.rankIndex += 30;

        });



    };

    $scope.selectPopular = function() {
      $scope.items = [];
      $scope.rankIndex = 0;
    };


    $scope.showAnime = function(animeId) {

      $state.go("app.animedetails", {
        id: animeId,
        type: "anime"
      });
    };



  })