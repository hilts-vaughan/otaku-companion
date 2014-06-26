angular.module('starter.controllers', ['LocalStorageModule', 'infiniteScroll'])


.config(['localStorageServiceProvider',
  function(localStorageServiceProvider) {
    localStorageServiceProvider.setPrefix('otaku');
  }
])

.filter('noBB', function() {

  return function(input) {

    for (i = 0; i < 5; i++) {
      input = input.replace(/\[(\w+)[^w]*?](.*?)\[\/\1]/g, '$2');
    }

    return input;
  };

})

.filter('displayEpisodeCount', function() {
  return function(input) {
    console.log(input);
    if (input == -1)
      return "Unknown";
    else
      return input;
  };
})


.factory('FeedService', ['$http',
  function($http) {
    return {
      parseFeed: function(url) {
        return $http.jsonp('//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=50&callback=JSON_CALLBACK&q=' + encodeURIComponent(url));
      }
    }
  }
])



.controller('PlaylistCtrl', function($scope, $stateParams) {})

.controller('LoginController', function($scope, $state, localStorageService, $location) {

  $scope.user = {};
  $scope.username = "";
  $scope.password = "";

  $scope.signIn = function(user) {

    // Set some values here and then attempt to sign in again
    localStorageService.set('username', user.username);
    localStorageService.set('password', user.password);
    $location.path("/");
  }


})


.controller('MyListController', function($scope, $state) {

  $scope.doStuff = function() {

  }



})


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
      id: animeId
    });
  };



})


.controller('MangaController', function($scope, $state, $http) {

  $scope.rankIndex = 0;
  $scope.items = [];
  $scope.canLoad = true;

  $scope.pageRanked = function() {


    $http.get('http://192.168.1.160:8899/mal/chart/manga/' + $scope.rankIndex)
      .success(function(data) {


        var wait = data.length - 1;
        var back = 0;
        var i = 0;

        for (i = 0; i < wait; i++) {

          $http.get('http://192.168.1.160:8899/mal/manga/id/' + data[i].url)
            .success(function(anime) {

              $scope.items.push(anime);
              back++;

              if (back == wait) {

                $scope.items = _.sortBy($scope.items, function(o) {
                  return parseInt(o.malstats.rank);
                });
                

                $scope.$broadcast('scroll.infiniteScrollComplete');
              }

            });

        }



        // page limit by 30
        $scope.rankIndex += 30;

      });



  };


  $scope.pagePopular = function() {


    $http.get('http://192.168.1.160:8899/mal/chart/mangaPop/' + $scope.rankIndex)
      .success(function(data) {

        console.log($scope.rankIndex)
        var wait = data.length - 1;
        var back = 0;
        var i = 0;

        for (i = 0; i < wait; i++) {

          $http.get('http://192.168.1.160:8899/mal/manga/id/' + data[i].url)
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

    $state.go("app.mangadetails", {
      id: animeId
    });
  };



})



.controller('NewsController', function($scope, $state, FeedService) {

  $scope.loadButonText = "Load";
  $scope.loadFeed = function(e) {
    FeedService.parseFeed("http://myanimelist.net/rss.php?type=news").then(function(res) {
      $scope.feeds = res.data.responseData.feed.entries;
      console.log($scope.feeds)
    });
  }

  $scope.openNews = function(feed) {
    window.open("http://myanimelist.net" + feed.link, '_blank', 'location=yes');
  }

  $scope.loadFeed();


})



.controller('EntryController', function($scope, $state, $http, $stateParams, localStorageService, $location, $timeout) {

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
        // OK, we're good. Go to the airing page...
        $location.path("app/airing");
      } else {
        $location.path('/login');
      }


    });



  }, 2000)



})

.controller('AnimeReviewsController', function($scope, $state, $http, $stateParams) {

  console.log($stateParams)
  $http.get('http://192.168.1.160:8899/mal/{}/id/'.replace('{}', $stateParams.type) + $stateParams.id + '/reviews')
    .success(function(data) {
      $scope.reviews = data.reviews;


    });

})


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

    switch ($scope.currentType.value) {
      case "anime":
        $state.go("app.animedetails", {
          id: animeId
        });
        break;
      case "manga":

        $state.go("app.mangadetails", {
          id: animeId
        });
        break;
    }



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



.controller("MangaDetailsController", function($scope, $state, $http, $stateParams) {

  $scope.goToReview = function() {
    debugger
    $state.go("app.animereviews", {
      id: $scope.manga.mal_id,
      type: 'manga'
    });
  };

  $http.get('http://192.168.1.160:8899/mal/manga/id/' + $stateParams.id)
    .success(function(data) {
      $scope.manga = data;

    });



})


.controller("AnimeDetailsController", function($scope, $state, $http, $stateParams) {

  $scope.goToReview = function() {
    $state.go("app.animereviews", {
      id: $scope.anime.mal_id,
      type: 'anime'
    });
  };

  $http.get('http://192.168.1.160:8899/mal/anime/id/' + $stateParams.id)
    .success(function(data) {
      $scope.anime = data;



    });



})