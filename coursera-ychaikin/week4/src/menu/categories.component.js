(function () {
  'use strict';

  angular.module('MenuApp')
  .component('categoryList', {
    templateUrl: 'src/shoppinglist/templates/categorylist.template.html',
    bindings: {
      categs: '<'
    }
  })

})();
