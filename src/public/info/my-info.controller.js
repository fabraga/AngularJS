(function () {
  'use strict';

  angular.module('public')
  .controller('MyInfoController', MyInfoController);

  MyInfoController.$inject = ['UserService', 'ApiHomePath'];
  function MyInfoController(UserService, ApiHomePath) {
    var $ctrl = this;

    $ctrl.user = UserService.getUser();

    $ctrl.basePath = ApiHomePath;

    $ctrl.isLogged = function () {
      return UserService.isLogged();
    }

    $ctrl.$onInit = function () {
    }

  }

})();
