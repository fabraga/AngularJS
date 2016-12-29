(function () {
  'use strict';

  angular.module('FABRAGA')
  .component('foot', {
    templateUrl: function (commonPaths) {
      return commonPaths.HOME_PATH + '/footer.html';
    },
    controller: FooterController
  });

  function FooterController() {
    var $ctrl = this;

    $ctrl.$onInit = function () {
    }
  }

})();
