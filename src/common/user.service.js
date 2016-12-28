(function () {
  "use strict";

  angular.module('common')
  .service('UserService', UserService);


  UserService.$inject = ['$http', 'ApiHomePath'];
  function UserService($http, ApiHomePath) {
    var service = this;

    service.user = {};

    service.user.login = {
      email: "",
      username: "",
      phone: "",
      password: ""
    };

    service.user.profile = {
      firstName: "",
      middleName: "",
      lastName: ""
    };

    service.$onInit = function () {
    };

    service.logged = false;

    service.isLogged = function () {
      return service.logged;
    };

    service.getUser = function () {
      return service.user;
    }

    service.saveUser = function (newUser) {
      service.user = newUser;
    };
  }

})();
