(function () {
  'use strict';

  angular.module('MenuApp')
  .controller('ItemsController', ItemsController);

  ItemsController.$inject = ['categoryItems'];
  function ItemsController(categoryItems) {
    var category = this;

    menu.$onInit = function () {
      console.log("inside ItemsController");
      console.log(categoryItems);
    }

    category.items = categoryItems;
  }

})();
