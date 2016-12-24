(function () {
  'use strict';

  angular.module('Registration')
  .controller('RegistrationController', RegistrationController);

  // RegistrationController.$inject = ['items'];
  function RegistrationController() {
    var reg = this;

    reg.user ={
      username: "",
      email: "",
      phone: ""
    };

    reg.submit = function () {
      reg.completed = true;
    };

    reg.$onInit = function () {
    };
  }

})();
