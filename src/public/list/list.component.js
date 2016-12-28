(function () {
  'use strict';

  angular.module('public')
  .component('listItems', {
    templateUrl: 'src/public/list/snippets/list-items.html',
    controller: ListComponentController,
    bindings: {
      items: '<',
      name: '@',
      total: '@',
      message: '@',
      onRemove: '&'
    }
  })

  ListComponentController.$inject = ['$rootScope', '$element', '$q', 'FitnessFilterService']
  function ListComponentController($rootScope, $element, $q, FitnessFilterService) {
    var $ctrl = this;

    // Remove item from index
    $ctrl.remove = function (myIndex) {
      $ctrl.message = $ctrl.onRemove({ index: myIndex });
    };

    var totalItems;

    $ctrl.$onInit = function () { // executed only once
      totalItems = 0;
    };

    $ctrl.$doCheck = function () {
      if ($ctrl.items.length !== totalItems) {
        totalItems = $ctrl.items.length;

        $rootScope.$broadcast('List:processing', {on: true});
        var promises = [];
        for (var i=0 ; i<$ctrl.items.length ; i++) {
          promises.push(FitnessFilterService.checkName($ctrl.items[i].name, $ctrl));
        }

        $q.all(promises).then(function (result) {
          var warnElem = $element.find('div.warning');
          warnElem.slideUp(600); // Remove warning
        })
        .catch(function (result) {
          var warnElem = $element.find('div.warning');
          warnElem.slideDown(700); // Show warning
        })
        .finally(function () {
          $rootScope.$broadcast('List:processing', {on: false});
        });
      }
    };
  }
})();
