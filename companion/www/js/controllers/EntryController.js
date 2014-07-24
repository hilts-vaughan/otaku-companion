/**
 * An angular controller designed to control the entry flow; making things a bit easier to work with.
 */
angular.module('starter.controllers')
  .controller('EntryController', function($scope, $state, $http, $stateParams, localStorageService, $location, $timeout, MalService) {

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

          // We should do a quick sync refresh first while we have the chance
          MalService.syncList(function() {

            // OK, we're good. Go to the airing page...
            $location.path("app/airing");

          });


        } else {
          $location.path('/login');
        }


      });



    }, 2000)



  })