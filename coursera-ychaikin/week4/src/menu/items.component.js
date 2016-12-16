(function () {
  'use strict';

  angular.module('MenuApp')
  .component('itemsList', {
    templateUrl: 'src/shoppinglist/templates/itemslist.template.html',
    bindings: {
      categs: '<'
    }
  })

})();
