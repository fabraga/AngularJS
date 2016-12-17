(function () {
  'use strict';

  angular.module('MenuApp')
  .controller('CategoriesController', CategoriesController);

  CategoriesController.$inject = ['categories'];
  function CategoriesController(categories) {
    var menu = this;

    menu.$onInit = function () {
      console.log("Categories: "+categories);
    }

    menu.items = categories;
  }

})();
