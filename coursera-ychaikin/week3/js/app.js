(function () {
  'use strict';

  angular.module('NarrowItDownApp', [])
  .controller('NarrowItDownController', NarrowItDownController)
  .service('MenuSearchService', MenuSearchService)
  .directive('foundItems', FoundItemsDirective)
  .constant('BasePath', "davids-restaurant.herokuapp.com");

  function FoundItemsDirective() {
    var ddo = {
      restrict: 'E',
      templateUrl: 'foundItems.html',
      transclude: true,
      scope: {
        found: '<',
        onRemove: '&'
      }
    };
    return ddo;
  }

  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController(MenuSearchService) {
    var menu = this;

    menu.searchTerm = "";
    menu.found = [];

    menu.getMessage = function() {
      return (menu.found.length > 0 ? "" : "Nothing found.");
    }

    menu.narrowItDown = function () {
      if ( menu.searchTerm.trim() ) {
        menu.found = MenuSearchService.getMatchedMenuItems(menu.searchTerm);
      } else {
        menu.found = [];
        menu.getMessage();
      }
    };

    menu.removeItem = function (itemIndex) {
    // menu.onRemove = function (itemIndex) {
      var removedItem = MenuSearchService.removeItem(itemIndex);
    };
  }

  MenuSearchService.$inject = ['$http', 'BasePath']
  function MenuSearchService($http, BasePath) {
    var service = this;
    var items = [];

    service.getMatchedMenuItems = function (searchTerm) {
      var matchedMenu = this;
      items = [];

      searchTerm = searchTerm.trim().toLowerCase();

      var promise = $http({method: "GET", url: (BasePath+"/menu_items.json")});

      promise.then(function (response) {
        for ( var i = 0 ; i < response.data.menu_items.length ; i++ ) {
          if ( ( response.data.menu_items[i].description.toLowerCase().indexOf(searchTerm) !== -1 ) || ( response.data.menu_items[i].name.toLowerCase().indexOf(searchTerm) !== -1 ) ) {
            items.push( response.data.menu_items[i] );
          }
        }
      }).catch(function (error) {
        console.log("Error while retrieving the data.");
      });
      return items;
    };

    service.removeItem = function (itemIndex) {
      return items.splice(itemIndex, 1);
    };
  }

})();
