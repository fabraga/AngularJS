(function () {
  'use strict';

  angular.module('ShoppingList')
  .controller('ShoppingListController', ShoppingListController);

  // ShoppingListController.$inject = ['ShoppingListService'];
  // function ShoppingListController(ShoppingListService) {
  ShoppingListController.$inject = ['items'];
  function ShoppingListController(items) {
    var shoppingList = this;

    shoppingList.items = items;

    // shoppingList.filter = "";

    // shoppingList.$onInit = function () {
    //   ShoppingListService.getItems().then(function (result) {
    //     shoppingList.items = result;
    //   });
    // };

    var originalName = "Shopping List";

    shoppingList.name = originalName;
    shoppingList.total = " (" + shoppingList.items.length + " items)";

    shoppingList.detect = "cookie";
    shoppingList.warning = "DETECTED!";

    shoppingList.itemName = "";
    shoppingList.itemQtty = "";

    shoppingList.add = function () {
      var warn = ShoppingListService.addItem(shoppingList.itemName, shoppingList.itemQtty);

      if ( !warn ) {
        shoppingList.warning = shoppingList.itemName + " ("+shoppingList.itemQtty+") added.";
        shoppingList.total = " (" + shoppingList.items.length + " items)";
      } else {
        shoppingList.warning = warn;
      }
    };

    shoppingList.removeItem = function (itemIndex) {
      var remItem = ShoppingListService.removeItem(itemIndex);

      shoppingList.warning = remItem[0].name + " removed (" + remItem[0].qtty+")";
      shoppingList.total = " (" + shoppingList.items.length + " items)";
    };

  }

})();
