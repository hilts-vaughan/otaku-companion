angular.module('starter.controllers')
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