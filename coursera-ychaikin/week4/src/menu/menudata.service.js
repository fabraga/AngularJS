(function () {
  'use strict';

  angular.module('data')
  .service('MenuDataService', MenuDataService);

  MenuDataService.$inject = ['$http', '$q']
  function MenuDataService(http, $q) {
    var service = this;

    // Lists of categories and items
    var categs = [];
    var items = [];

    service.getAllCategories = function () {
      categs = [];

      var promise = $http({method: "GET", url: ("https://davids-restaurant.herokuapp.com/categories.json")});

      promise.then(function (response) {
        categs = response.data;
        console.log("Response: "+categs);

      }).catch(function (error) {
        console.log("Error while retrieving the data.");
      });
      return categs;
      // var deferred = $q.defer();
      // deferred.resolve(categs);
      //
      // return deferred.promise;
    };

    service.getItemsForCategory = function (categoryShortName) {
      items = [];

      var promise = $http({method: "GET", url: ("https://davids-restaurant.herokuapp.com/menu_items.json?category="+categoryShortName)});

      promise.then(function (response) {
        items = response.data.menu_items;
        console.log("Response: "+items);

      }).catch(function (error) {
        console.log("Error while retrieving the data.");
      });
      return items;
      // var deferred = $q.defer();
      // deferred.resolve(items);
      //
      // return deferred.promise;
    };

  }

})();
