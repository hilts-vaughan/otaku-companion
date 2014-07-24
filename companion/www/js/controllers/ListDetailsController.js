angular.module('starter.controllers')
  .controller("ListDetailsController", function($scope, $state, $http, $stateParams, localStorageService, MalService, $ionicPopup) {

    $scope.statusLabels = [{
      title: "In Progress",
      value: 1
    }, {
      title: "Completed",
      value: 2
    }, {
      title: "On Hold",
      value: 3
    }, {
      title: "Dropped",
      value: 5
    }, {
      title: "Planned",
      value: 6
    }];



    lib = localStorageService.get('lib');
    type = $stateParams.type;

    entry = _.find(lib[type][type], function(value) {
      return value['mal_id'] == $stateParams.id;
    });


    $scope.update = function(option) {
      $scope.entry.status = option.value;
    }


    $scope.entry = entry;
    $scope.currentStatus = _.find($scope.statusLabels, function(value) {
      return value.value == $scope.entry.status;
    });

    console.log(entry);

    $scope.showAlert = function() {
      var alertPopup = $ionicPopup.alert({
        title: 'Complete',
        template: 'The list details have been saved succesfully.'
      });
      alertPopup.then(function(res) {

      });
    };


    $scope.saveDetails = function() {



      MalService.saveToList($stateParams.id, $stateParams.type, $scope.entry, function(reason) {
        // This will show you the history stuff.
        $scope.showAlert();


      });

    };


  })