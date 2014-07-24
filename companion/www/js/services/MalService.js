angular.module('starter.controllers')
  .factory('MalService', ['$http', 'localStorageService',
    function($http, localStorageService) {

      funcs = {


        addToList: function(id, type, callback) {

          var lib = localStorageService.get('lib');
          var username = localStorageService.get('username');
          var password = localStorageService.get('password');
          var b = btoa(username + ":" + password);
          $http.defaults.headers.common['Authorization'] = 'Basic ' + b;

          $http.get('http://192.168.1.160:8899/mal/list/add/' + type + '/' + username + '/' + id)
            .success(function(data) {

              $http.get('http://192.168.1.160:8899/mal/{}/id/'.replace('{}', type) + id)
                .success(function(data) {

                  var entry = {};
                  var template = maltemplate[type];
                  entry = _.extend(entry, template);


                  entry.title = data.name;
                  entry.poster = data.poster;
                  entry["my_status"] = "6";
                  entry['mal_id'] = id;

                  lib[type][type].push(entry);
                  localStorageService.set('lib', lib);
                  console.log(entry);
                  console.log(lib);



                  callback()

                });



            });
        },


        /**
         * Persists an entry to the local database and sends the changeset to the remote (MAL)
         * @param  {[type]}   id       The ID of the content to send up
         * @param  {[type]}   type     The type of content to be sent up
         * @param  {[type]}   newEntry    The actual entry to update
         * @param  {Function} callback This callback is invoke once the request has been completed (succesfully or not)
         * @return {[type]}            [description]
         */
        saveToList: function(id, type, newEntry, callback) {

          // Gets the lib
          lib = localStorageService.get('lib');
          list = lib[type][type];

          var entry = _.find(list, function(value) {
            return value['mal_id'] == id;
          });

          if (entry) {
            // extend and update
            _.extend(entry, newEntry);

            // Send the update notice
            var username = localStorageService.get('username');
            var password = localStorageService.get('password');
            var b = btoa(username + ":" + password);
            $http.defaults.headers.common['Authorization'] = 'Basic ' + b;


            $http.post('http://192.168.1.160:8899/mal/list/update/' + type + '/' + username + '/' + id, entry)
              .success(function(entry) {

                callback();

              });

          } else {
            callback("Failure");
          }

          localStorageService.set('lib', lib);

        },

        /**
         * removes an item from the list
         * @param  {[type]}   id       [description]
         * @param  {[type]}   type     [description]
         * @param  {Function} callback [description]
         * @return {[type]}            [description]
         */
        removeFromList: function(id, type, callback) {



          var lib = localStorageService.get('lib');
          var username = localStorageService.get('username');
          var password = localStorageService.get('password');
          var b = btoa(username + ":" + password);
          $http.defaults.headers.common['Authorization'] = 'Basic ' + b;

          $http.get('http://192.168.1.160:8899/mal/list/delete/' + type + '/' + username + '/' + id)
            .success(function(data) {



              newAnime = lib[type][type];

              newAnime = _.filter(newAnime, function(element) {
                return element['series_' + type + 'db_id'] != id;
              });

              lib[type][type] = newAnime;

              localStorageService.set('lib', lib);

              callback()



            });



        },

        /**
         * Syncs the MAL list
         * @param  {[type]} url [description]
         * @return {[type]}     [description]
         */
        syncList: function(callback) {

          var username = localStorageService.get('username');
          var password = localStorageService.get('password');
          var b = btoa(username + ":" + password);
          $http.defaults.headers.common['Authorization'] = 'Basic ' + b;

          $http.get('http://192.168.1.160:8899/mal/list/fetch/anime/' + username)
            .success(function(animeList) {

              animeList = animeList.myanimelist;

              $.each(animeList.anime, function(i, value) {

                $.each(value, function(index, value) {
                  animeList.anime[i][index] = value[0];
                });

                value['title'] = value['series_title'];
                value['poster'] = value['series_image'];

                value['episode'] = parseInt(value['my_watched_episodes']);
                value['score'] = parseInt(value['my_score']);
                value['status'] = parseInt(value['my_status']);
                value['mal_id'] = parseInt(value['series_animedb_id']);


              });


              $.each(animeList.myinfo, function(i, value) {

                $.each(value, function(index, value) {
                  animeList.myinfo[i][index] = value[0];
                });

              });



              $http.get('http://192.168.1.160:8899/mal/list/fetch/manga/' + username)
                .success(function(mangaList) {


                  mangaList = mangaList.myanimelist;

                  $.each(mangaList.manga, function(i, value) {

                    $.each(value, function(index, value) {
                      mangaList.manga[i][index] = value[0];
                    });

                    value['title'] = value['series_title'];
                    value['poster'] = value['series_image'];

                    value['episode'] = parseInt(value['my_read_chapters']);
                    value['score'] = parseInt(value['my_score']);
                    value['status'] = parseInt(value['my_status']);
                    value['mal_id'] = parseInt(value['series_mangadb_id']);

                  });



                  $.each(mangaList.myinfo, function(i, value) {

                    $.each(value, function(index, value) {
                      mangaList.myinfo[i][index] = value[0];
                    });

                  });

                  // We have our anime and manga list; now we just create two lists and shove them together
                  var lib = {};
                  lib.anime = animeList;
                  lib.manga = mangaList;

                  console.log(lib);
                  localStorageService.set('lib', lib);

                  callback();


                });


            });


        }



      }

      return funcs;
    }

  ])