(function () {
  'use strict';

  angular.module('FABRAGA')
  .component('header', {
    templateUrl: function (commonPaths) {
      return commonPaths.HOME_PATH + '/header.html';
    },
    controller: HeaderController
  });

  HeaderController.$inject = ['UserService', '$element'];
  function HeaderController(UserService, $element) {
    var $ctrl = this;

    $ctrl.user = UserService.user;

    $ctrl.$onInit = function () {
      $ctrl.user = UserService.user;
    }

    $ctrl.isLogged = function () {
      return UserService.isLogged();
    }

    $ctrl.menuClick = function () {
      $("#navbarToggle").click();
    }

  }

})();
