(function () {
"use strict";

angular.module('public')
.component('signUpItems', {
  templateUrl: 'src/public/sign-up/sign-up-items.html',
  bindings: {
    item: '<',
    setFave: '&'
  },
  controller: SignItemController
});

SignItemController.$inject = ['ApiPath'];
function SignItemController(ApiPath) {
  var $ctrl = this;
  $ctrl.basePath = ApiPath;

  $ctrl.fave = function (myItem) {
    $ctrl.setFave({ fave: myItem });
  }
}


})();
