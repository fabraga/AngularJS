(function () {
  'use strict';

  angular.module('ShoppingList')
  .component('shoppingListItems', {
    templateUrl: 'src/shoppinglist/templates/items.template.html',
    // controller: ShoppingListComponentController,
    bindings: {
      items: '<',
      name: '@',
      total: '@',
      detect: '@',
      onRemove: '&'
    }
  })

  ShoppingListComponentController.$inject = ['$rootScope', '$element', '$q', 'FitnessFilterService']
  function ShoppingListComponentController($rootScope, $element, $q, FitnessFilterService) {
    var $ctrl = this;
    var totalItems;

    $ctrl.remove = function (myIndex) {
      $ctrl.onRemove({ index: myIndex });
    };

    $ctrl.$onInit = function () { // executed only once
      totalItems = 0;
    };

    $ctrl.$doCheck = function () {
      if ($ctrl.items.length !== totalItems) {
        totalItems = $ctrl.items.length;

        $rootScope.$broadcast('shoppinglist:processing', {on: true});
        var promises = [];
        for (var i=0 ; i<$ctrl.items.length ; i++) {
          promises.push(FitnessFilterService.checkName($ctrl.items[i].name));
        }

        $q.all(promises).then(function (result) {
          var warningElem = $element.find('div.error');
          warningElem.slideUp(800); // Remove warning
        })
        .catch(function (result) {
          var warningElem = $element.find('div.error');
          warningElem.slideDown(800); // Show warning
        })
        .finally(function () {
          $rootScope.$broadcast('shoppinglist:processing', {on: false});
        });
      }
    };
  }
})();
