(function () {
  'use strict';

  angular.module('data')
  .service('MenuDataService', MenuDataService);

  MenuDataService.$inject = ['$http']
  function MenuDataService($http) {
    var service = this;

    service.getAllCategories = function () {

      var promise = $http( {method: "GET", url: ("https://davids-restaurant.herokuapp.com/categories.json")} );

      promise.then(function (response) {
        return response.data;

      }).catch(function (error) {
        console.log(error);
      });

      return promise;
    };

    service.getItemsForCategory = function (categoryShortName) {

      console.log("Inside getItemsForCategory");

      var promise = $http({method: "GET", url: ("https://davids-restaurant.herokuapp.com/menu_items.json?category="+categoryShortName)});

      promise.then(function (response) {
        console.log(response.data);
        return response.data.menu_items;

      }).catch(function (error) {
        console.log(error);
      });

      return promise;
    };

  }

})();
