(function () {
  'use strict';

  angular.module('NarrowItDownApp', [])
  .controller('NarrowItDownController', NarrowItDownController)
  .service('MenuSearchService', MenuSearchService)
  .directive('foundItems', FoundItemsDirective);

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

    // menu.getMessage = function() {
    //   return (menu.found.length > 0 ? "" : "Nothing found.");
    // }
    menu.message = "";

    menu.narrowItDown = function () {
      if ( menu.searchTerm.trim() ) {
        // angular.element('#loader').css('display', 'block');
        menu.found = MenuSearchService.getMatchedMenuItems(menu.searchTerm);
        // angular.element('#loader').css('display', 'none');
        menu.message = "";
      } else {
        menu.found = [];
        menu.message = "Nothing found.";
      }
    };

    menu.removeItem = function (itemIndex) {
      var removedItem = MenuSearchService.removeItem(itemIndex);
      menu.message = (menu.found.length > 0 ? "" : "Nothing found.");
    };
  }

  MenuSearchService.$inject = ['$http']
  function MenuSearchService($http) {
    var service = this;
    var items = [];

    service.getMatchedMenuItems = function (searchTerm) {
      var matchedMenu = this;
      items = [];

      var promise = $http({method: "GET", url: ("https://davids-restaurant.herokuapp.com/menu_items.json")});

      promise.then(function (response) {
        // console.log(response.data.menu_items);
        for ( var i = 0 ; i < response.data.menu_items.length ; i++ ) {
          var itemName = response.data.menu_items[i].name.toLowerCase();
          var itemDesc = response.data.menu_items[i].description.toLowerCase();
          if ( itemName.includes(searchTerm.trim().toLowerCase()) || itemDesc.includes(serachTerm.trim().toLowerCase()) ) {
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
