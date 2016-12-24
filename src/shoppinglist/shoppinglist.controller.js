(function () {
  'use strict';

  angular.module('ShoppingList')
  .controller('ShoppingListController', ShoppingListController);

  ShoppingListController.$inject = ['items', 'ShoppingListService'];
  function ShoppingListController(items, ShoppingListService) {
    var list = this;
    list.items = items;

    // list.$onInit = function () {
    //   ShoppingListService.getItems().then(function (result) {
    //     list.items = result;
    //   });
    // };

    var defaultName = "Shopping List";

    // List (default)'s  name and total items
    list.name = defaultName;
    list.total = " (" + list.items.length + " items)";

    list.warning = "";

    // Add new item
    list.addItem = function (newItem) {
      try {
        var warn = ShoppingListService.addItem(newItem.name, newItem.qtty);
      } catch (error) {
        var warn = error.message;
      }

      list.total = list.getTotal();
      list.warning = warn;

    };

    // Remove item
    list.removeItem = function (itemIndex) {
      var remItem = ShoppingListService.removeItem(itemIndex);

      list.warning = remItem[0].name + " (" + remItem[0].qtty+") " + "removed";
      list.total = list.getTotal();
    };

    list.getTotal = function () {
      return " (" + list.items.length + " items)";
    }

  }

})();
