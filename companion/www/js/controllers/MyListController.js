angular.module('starter.controllers')
  .controller('MyListController', function($scope, $state, localStorageService, MalService) {

    $scope.init = function() {

      $scope.lib = localStorageService.get('lib');

      if (!$scope.lib) {
        MalService.syncList(function() {
          $scope.lib = localStorageService.get('lib');
          $scope.ready();
        });
      } else {
        console.log($scope.lib)
        $scope.ready();
      }
    }

    $scope.ready = function() {

    }

    $scope.showAnime = function(animeId) {

      $state.go("app.animedetails", {
        id: animeId,
        type: "anime"
      });
    };

    $scope.showManga = function(mangaId) {

      $state.go("app.animedetails", {
        id: mangaId,
        type: "manga"
      });
    };


    $scope.toggleGroup = function(group) {
      if ($scope.isGroupShown(group)) {
        $scope.shownGroup = null;
      } else {
        $scope.shownGroup = group;
      }
    };
    $scope.isGroupShown = function(group) {
      return $scope.shownGroup === group;
    };


    $scope.groups = [];

    $scope.groups[0] = {
      name: "Watching",
      status_code: "0"
    };

    $scope.groups[0] = {
      name: "Watching",
      status: "0"
    };

    // 1/watching, 2/completed, 3/onhold, 4/dropped, 6/plantowatch    

    $scope.groups[0] = {
      name: "In Progress",
      status: "1"
    };

    $scope.groups[1] = {
      name: "Completed",
      status: "2"
    };

    $scope.groups[2] = {
      name: "On Hold",
      status: "3"
    };

    $scope.groups[3] = {
      name: "Dropped",
      status: "4"
    };

    $scope.groups[4] = {
      name: "Planned",
      status: "6"
    };



    $scope.init();


  })