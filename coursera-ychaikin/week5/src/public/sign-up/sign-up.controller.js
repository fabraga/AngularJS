(function () {
  'use strict';

  angular.module('public')
  .controller('SignUpController', SignUpController);

  SignUpController.$inject = ['items', 'UserService'];
  function SignUpController(items, UserService) {
    var $ctrl = this;

    $ctrl.completed = false;

    $ctrl.items = items.menu_items;

    $ctrl.user = {};
    $ctrl.user.firstName = "";
    $ctrl.user.lastName = "";
    $ctrl.user.email = "";
    $ctrl.user.phone = "";
    $ctrl.user.fave = "";

    $ctrl.$onInit = function () {
      $ctrl.user = UserService.getUser();
    }

    $ctrl.myFave = null;

    $ctrl.faveSearch = function () {
      if ( $ctrl.user.fave !== undefined ) {

        $ctrl.user.fave = $ctrl.user.fave.toUpperCase();

        if ($ctrl.user.fave.length > 1 && $ctrl.user.fave.length < 5) {
          var fave = UserService.getFaveItem($ctrl.user.fave);
          if ( fave !== undefined ) {
            $ctrl.myFave = fave;
            console.log($ctrl.myFave);
          } else {
            $ctrl.myFave= null;
          }
        }

      }
    }

    $ctrl.faveNotFound = function () {
      if ($ctrl.user.fave !== undefined && ($ctrl.user.fave.length < 2 || $ctrl.user.fave.length > 4)) {
        return false;
      }
      return ($ctrl.myFave === undefined || $ctrl.myFave === null);
    }

    $ctrl.submit = function () {
      if ( $ctrl.myFave !== null ) {
        $ctrl.completed = true;
        UserService.signed = true;
        UserService.saveUser($ctrl.user);
      }
    };

  }

})();
