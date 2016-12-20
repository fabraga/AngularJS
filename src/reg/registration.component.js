(function () {
  'use strict';

  angular.module('Resistration')
  .component('ResistrationItems', {
    templateUrl: 'src/reg/templates/register.template.html',
    bindings: {
      user: '<'
    }
  })

})();
