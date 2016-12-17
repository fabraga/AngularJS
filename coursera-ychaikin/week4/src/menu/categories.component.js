(function () {
  'use strict';

  angular.module('MenuApp')
  .component('categoryItems', {
    templateUrl: 'src/templates/category.items.template.html',
    // controller: CategoriesComponentController,
    bindings: {
      categories: '<'
    }
  })

  // CategoriesComponentController.$inject = ['$rootScope', '$element', '$q']
  // function CategoriesComponentController($rootScope, $element, $q) {
  //   var $ctrl = this;
  //   var totalItems;
  //
  //   $ctrl.remove = function (myIndex) {
  //     $ctrl.onRemove({ index: myIndex });
  //   };
  //
  //   $ctrl.$onInit = function () { // executed only once
  //     console.log("Inside CategoriesComponentController!");
  //     console.log($rootScope);
  //     console.log($element);
  //
  //     totalItems = 0;
  //   };
  // }

})();
