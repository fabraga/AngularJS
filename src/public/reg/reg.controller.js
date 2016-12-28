(function () {
  'use strict';

  angular.module('public')
  .controller('RegController', RegController);

  RegController.$inject = ['UserService', '$scope', '$state'];
  function RegController(UserService, $scope, $state) {
    var reg = this;

    reg.user = {};

    reg.user.login = {
      email: "",
      username: "",
      phone: "",
      password: ""
    };

    reg.user.profile = {
      firstName: "",
      middleName: "",
      lastName: ""
    };

    reg.message = "";

    reg.$onInit = function () {
      reg.user = UserService.getUser();
    }

    reg.logUser = "";
    reg.logPass = "";

    reg.completed = false;

    reg.submit = function () {
      if ( reg.logPass !== reg.user.login.password ) {
        reg.message = "Passwords don't match";
        return false;
      }
      reg.completed = true;
      UserService.logged = true;
      UserService.saveUser(reg.user);
      $state.go('public.info');
      // $scope.changeState = function () {
      //   $state.go('public.info', {});
      // };
    };
    reg.login = function () {
      if ( reg.logUser.indexOf("@") !== -1 ) {
        if ( reg.logUser !== reg.user.login.email ) {
          reg.message = "Email not found.";
          return false;
        }
      } else if ( reg.logUser !== reg.user.login.username ) {
        reg.message = "Username not found.";
        return false;
      }
      if ( reg.logPass !== reg.user.login.password ) {
        reg.message = "Passwords don't match";
        return false;
      }
      reg.completed = true;
      UserService.logged = true;
      $state.go('public.info');
    };
  }

})();
