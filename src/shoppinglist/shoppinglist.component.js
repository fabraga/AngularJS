(function () {
  'use strict';

  angular.module('ShoppingList')
  .component('shoppingListItems', {
    templateUrl: 'src/shoppinglist/templates/items.template.html',
    controller: ShoppingListComponentController,
    bindings: {
      items: '<',
      name: '@',
      total: '@',
      warning: '@',
      onRemove: '&',
      onAdd: '&'
    }
  })

  ShoppingListComponentController.$inject = ['$rootScope', '$element', '$q', 'FitnessFilterService']
  function ShoppingListComponentController($rootScope, $element, $q, FitnessFilterService) {
    var $ctrl = this;

    // Remove item from index
    $ctrl.remove = function (myIndex) {
      $ctrl.warning = $ctrl.onRemove({ index: myIndex });
    };

    // New item data
    var newItem = {};
    newItem.name = "";
    newItem.qtty = "";
    $ctrl.newItem = newItem;
    // Add new item passing key/value by reference
    $ctrl.add = function () {
      $ctrl.warning = $ctrl.onAdd({ newItem: $ctrl.newItem });
    }

    var totalItems;

    $ctrl.$onInit = function () { // executed only once
      totalItems = 0;
    };

    $ctrl.$doCheck = function () {
      if ($ctrl.items.length !== totalItems) {
        totalItems = $ctrl.items.length;

        $rootScope.$broadcast('shoppinglist:processing', {on: true});
        var promises = [];
        for (var i=0 ; i<$ctrl.items.length ; i++) {
          promises.push(FitnessFilterService.checkName($ctrl.items[i].name, $ctrl));
        }

        $q.all(promises).then(function (result) {
          var warningElem = $element.find('div.warning');
          warningElem.slideUp(600); // Remove warning
        })
        .catch(function (result) {
          var warningElem = $element.find('div.warning');
          warningElem.slideDown(700); // Show warning
        })
        .finally(function () {
          $rootScope.$broadcast('shoppinglist:processing', {on: false});
        });
      }
    };
  }
})();
