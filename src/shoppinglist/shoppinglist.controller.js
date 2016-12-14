(function () {
  'use strict';

  angular.module('ShoppingList')
  .controller('ShoppingListController', ShoppingListController);

  ShoppingListController.$inject = ['ShoppingListService'];
  function ShoppingListController(ShoppingListService) {
    var list = this;
    // list.filter = "";

    list.items = ShoppingListService.getItems();
    var originalTitle = "Shopping List";

    list.title = originalTitle;
    list.total = " (" + list.items.length + " items)";

    list.detect = "cookie";
    list.warning = "DETECTED!";

    list.itemName = "";
    list.itemQtty = "";

    list.add = function () {
      var warn = ShoppingListService.addItem(list.itemName, list.itemQtty);

      if ( !warn ) {
        list.warning = list.itemName + " ("+list.itemQtty+") added.";
        list.total = " (" + list.items.length + " items)";
      } else {
        list.warning = warn;
      }
    };

    list.removeItem = function (itemIndex) {
      var remItem = ShoppingListService.removeItem(itemIndex);

      list.warning = remItem[0].name + " removed (" + remItem[0].qtty+")";
      list.total = " (" + list.items.length + " items)";
    };

  }

})();
