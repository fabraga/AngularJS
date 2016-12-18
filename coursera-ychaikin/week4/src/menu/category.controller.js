(function () {
  'use strict';

  angular.module('MenuApp')
  .controller('CategoryController', CategoryController);

  CategoryController.$inject = ['items'];
  function CategoryController(items) {
    var category = this;

    category.$onInit = function () {
      console.log("Inside CategoryController");
      console.log(items);
    }

    category.items = items;
  }

})();
