maltemplate = {};

/**
 * A hacky template for MAL manga
 */
maltemplate.manga = {
  "chapter": 0,
  "volume": 0,
  "status": 6,
  "score": 0,
  "downloaded_chapters": 0,
  "times_reread": 0,
  "reread_value": 0,
  date_start: "",
  date_finish: "",
  priority: 0,
  enable_discussion: 0,
  enable_rereading: 0,
  comments: "",
  "scan_group": "",
  "tags": "otakucompanion",
  retail_volumes: 0
};

maltemplate.anime = {
  episode: 0,
  status: 6,
  score: 0,
  downloaded_episodes: 0,
  storage_type: 0,
  storage_value: 0,
  times_rewatched: 0,
  rewatch_value: 0,
  date_start: "",
  date_finish: "",
  priority: 0,
  enable_discussion: 0,
  enable_rereading: 0,
  comments: "",
  fansub_group: "",
  "tags": "otakucompanion"
};


angular.module('starter.controllers', ['LocalStorageModule', 'infiniteScroll'])


.config(['localStorageServiceProvider',
  function(localStorageServiceProvider) {
    localStorageServiceProvider.setPrefix('otaku');
  }
])


.filter('statusFormatter', function() {
  return function(input) {


    switch (input) {
      case 1:
        return "In Progress"
      case 2:
        return "Finished";
        break;
      case 0:
        return "Unknown";
        break;
    }

    return "???? Report as bug"

  };
})


.directive('ngAnime', function() {
  return {
    restrict: 'AEC',
    require: '^ngModel',
    templateUrl: 'templates/directives/anime-card.html'
  }
})






