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

    $ctrl.categIsValid = function () {
      if ( $ctrl.user.fave !== undefined ) {
        $ctrl.user.fave = $ctrl.user.fave.toUpperCase();
        if ( $ctrl.user.fave.length > 0 ) {
          return true;
        } else {
          return false;
        }
      }
    }

    $ctrl.faveIsValid = function () {
      if ( $ctrl.categIsValid() ) {
        var fave = $ctrl.user.fave;
        if (fave.length > 1 && fave.length < 5) {
          return true;
        }
      }
      return false;
    }

    $ctrl.faveSearch = function () {
      if ( $ctrl.faveIsValid() ) {
          var fave = UserService.getFaveItem($ctrl.user.fave);
          if ( fave !== undefined ) {
            $ctrl.myFave = fave;
          } else {
            $ctrl.myFave= null;
          }
      }
    }

    $ctrl.faveNotFound = function () {
      var fave = $ctrl.user.fave;
      if (fave === undefined) {
        return false;
      }
      if (fave.length < 2 || fave.length > 4) {
        return false;
      }
      return ($ctrl.myFave !== undefined && $ctrl.myFave.$$state !== null && $ctrl.myFave.$$state.value === undefined);
    }

    $ctrl.submit = function () {
      var ok = $ctrl.myFave;
      if ( ok !== null && ok.$$state.value !== undefined ) {
        $ctrl.completed = true;
        UserService.signed = true;
        UserService.saveUser($ctrl.user);
      }
    }

    $ctrl.setFave = function(fave) {
      $ctrl.myFave = fave;
    }

    $ctrl.getFaves = function () {
      if ($ctrl.categIsValid()) {
        $ctrl.faves = UserService.getFaveItems();
      } else {
        return null;
      }
    }

  }

})();
