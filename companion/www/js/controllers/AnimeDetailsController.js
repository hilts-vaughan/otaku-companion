angular.module('starter.controllers')
  .controller("AnimeDetailsController", function($scope, $state, $http, $stateParams, localStorageService, MalService) {

    $scope.goToReview = function() {
      $state.go("app.animereviews", {
        id: $scope.anime.mal_id,
        type: $stateParams.type
      });
    };

    $http.get('http://192.168.1.160:8899/mal/{}/id/'.replace('{}', $stateParams.type) + $stateParams.id)
      .success(function(data) {
        $scope.anime = data;
        console.log(data);
      });



    $scope.lookupInLibrary = function() {
      lib = localStorageService.get('lib');

      if (lib == null) {
        $scope.entry = null;
        return;
      }



      var type = $stateParams.type;
      var list = lib[type][type]

      var entry = _.find(list, function(value) {
        return value['mal_id'] == $stateParams.id;
      });

      console.log(entry);

      $scope.entry = entry;

    }


    $scope.addToList = function() {

      if ($scope.pending)
        return;

      $scope.pending = true;
      MalService.addToList($stateParams.id, $stateParams.type, function() {
        location.reload();
      })
    };

    $scope.remove = function() {

      $state.go("app.listdetails", {
        id: $scope.anime.mal_id,
        type: $stateParams.type
      });


    };


    $scope.lookupInLibrary();



  })