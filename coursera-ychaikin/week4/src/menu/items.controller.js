(function () {
  'use strict';

  angular.module('MenuApp')
  .controller('ItemsController', ItemsController);

  ItemsController.$inject = ['items'];
  function ItemsController(items) {
    var itemList = this;

    // itemList.$onInit = function () {
    //   console.log("Inside ItemsController.$onInit");
    // };

    itemList.items = items;
  }

})();
