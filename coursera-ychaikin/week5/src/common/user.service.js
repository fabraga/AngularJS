(function () {
  "use strict";

  angular.module('common')
  .service('UserService', UserService);


  UserService.$inject = ['$http', 'ApiPath'];
  function UserService($http, ApiPath) {
    var service = this;

    service.user = {};

    service.$onInit = function () {
      service.user.firstName = "";
      service.user.lastName = "";
      service.user.email = "";
      service.user.phone = "";
      service.user.fave = "";
    }

    service.signed = false;

    service.isSigned = function () {
      return service.signed;
    }

    service.getFaveItem = function () {
      return $http.get(ApiPath + '/menu_items/' + service.user.fave + '.json').then(function (response) {
        return response.data;
      })
      .catch( function (error) {
        console.log("Fave item not found:");
        console.log(error);
      });
    };

    service.getUser = function () {
      console.log(service.user);
      return service.user;
    }

    service.saveUser = function (newUser) {
      console.log("UserService newUser:"+newUser);
      console.log(newUser);

      service.user = newUser;

      console.log("User favorite saved: ");
      console.log(service.user.fave);
    };
  }

})();
