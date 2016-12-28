(function () {
  'use strict';

  angular.module('Reg')
  .component('regServices', {
    templateUrl: 'src/public/reg/services/reg.services.html',
    bindings: {
      user: '<'
    }
  })

})();
