(function () {
  'use strict';

  angular.module('public')
  .controller('ListController', ListController);

  ListController.$inject = ['items', 'ListService'];
  function ListController(items, ListService) {
    var list = this;
    list.items = items;

    list.$onInit = function () {
      console.log("ListController.$onInit()");
      // ListService.getItems().then(function (result) {
      //   list.items = result;
      // });
    };

    var defaultName = "Shopping List";

    // List (default)'s  name and total items
    list.name = defaultName;
    list.total = " (" + list.items.length + " items)";

    list.message = "";

    // New item data
    var newItem = {
      name: "",
      qtty: ""
    };
    list.newItem = newItem;

    // Add new item
    list.addItem = function () {
      try {
        var warn = ListService.addItem(list.newItem.name, list.newItem.qtty);
      } catch (error) {
        var warn = error.message;
      }

      list.total = list.getTotal();
      list.message = warn;

    };

    // Remove item
    list.removeItem = function (itemIndex) {
      var remItem = ListService.removeItem(itemIndex);

      list.message = remItem[0].name + " (" + remItem[0].qtty+") " + "removed";
      list.total = list.getTotal();
    };

    list.getTotal = function () {
      return " (" + list.items.length + " items)";
    }

  }

})();
