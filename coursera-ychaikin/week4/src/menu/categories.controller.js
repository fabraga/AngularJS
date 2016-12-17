(function () {
  'use strict';

  angular.module('MenuApp')
  .controller('CategoriesController', CategoriesController);

  CategoriesController.$inject = ['allCategories'];
  function CategoriesController(allCategories) {
    var menu = this;

    // menu.$onInit = function () {
    //   console.log(allCategories);
    // }

    menu.categories = allCategories;
  }

})();
