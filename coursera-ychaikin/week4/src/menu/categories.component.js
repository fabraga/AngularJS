(function () {
  'use strict';

  angular.module('MenuApp')
  .component('categories', {
    templateUrl: 'src/templates/categorylist.template.html',
    // controller: CategoriesComponentController,
    bindings: {
      categs: '<'
    }
  })

  CategoriesComponentController.$inject = ['$rootScope', '$element', '$q']
  function CategoriesComponentController($rootScope, $element, $q) {
    var $ctrl = this;
    var totalItems;

    $ctrl.remove = function (myIndex) {
      $ctrl.onRemove({ index: myIndex });
    };

    $ctrl.$onInit = function () { // executed only once
      console.log("Inside CategoriesComponentController!");

      totalItems = 0;
    };
  }

})();
