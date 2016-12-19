(function () {
  'use strict';

  angular.module('ShoppingList')
  .factory('ShoppingListFactory', ShoppingListFactory);


  function ShoppingListFactory() {
    var factory = function(maxItems) {
      return new ShoppingListService(maxItems);
    };
    return factory;
  }


  // If not specified, maxItems assumed unlimited
  function ShoppingListService(maxItems) {
    var service = this;

    // List of Shopping Items
    var items = [
      { name: "Fresh Milk", qtty: 1 },
      { name: "Organic Milk", qtty: 1 },
      { name: "Donuts", qtty: 4 },
      { name: "Cookies", qtty: 2 },
      { name: "Banana", qtty: 6 },
      { name: "Volvic Water", qtty: 2 },
      { name: "Pellegrino 1L", qtty: 1 }
    ];

    service.addItem = function (itemName, itemQtty) {
      if ( !itemName || !itemQtty ) {
        return "Provide name and quantity.";
      }
      if ( (maxItems === undefined) ||
           (maxItems !== undefined) && (items.length < maxItems)) {
        var item = {
          name: itemName,
          qtty: itemQtty
        };
        items.push(item);
      } else {
        return "Max items (" + maxItems +") reached.";
      }
    };

    service.removeItem = function (itemIndex) {
      return items.splice(itemIndex, 1);
    }

    service.getItems = function () {
      return items;
    };
  }

})();
