// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('entry', {
      url: "/",      
      templateUrl: "templates/entry.html",
      controller: 'EntryController'
    })

    .state('login', {
      url: "/login",      
      templateUrl: "templates/login.html",
      controller: 'LoginController'
    })


    .state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "templates/menu.html"
    })

    .state('app.news', {
      url: "/news",
      views: {
        'menuContent' :{
          templateUrl: "templates/news.html",
          controller: "NewsController"
        }
      }
    })


    .state('app.airing', {
      url: "/airing",
      views: {
        'menuContent' :{
          templateUrl: "templates/airing.html",
          controller: "AiringController"
        }
      }
    })

    .state('app.animedetails', {
      url: "/anime/:id",
      views: {
        'menuContent' :{
          templateUrl: "templates/anime-details.html",
          controller: "AnimeDetailsController"
        }
      }
    })    


    .state('app.animereviews', {
      url: "/anime/reviews/:id",
      views: {
        'menuContent' :{
          templateUrl: "templates/anime-reviews.html",
          controller: "AnimeReviewsController"
        }
      }
    })    


    .state('app.browse', {
      url: "/browse",
      views: {
        'menuContent' :{
          templateUrl: "templates/browse.html"
        }
      }
    })
    .state('app.search', {
      url: "/search",
      views: {
        'menuContent' :{
          templateUrl: "templates/search.html",
          controller: 'SearchCtrl'
        }
      }
    })

    .state('app.my', {
      url: "/my",
      views: {
        'menuContent' :{
          templateUrl: "templates/my.html",
          controller: 'MyListController'
        }
      }
    });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/');
});

