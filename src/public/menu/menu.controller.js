(function () {
"use strict";

angular.module('public')
.controller('MenuController', MenuController);

MenuController.$inject = ['categs'];
function MenuController(categs) {
  var $ctrl = this;
  $ctrl.categs = categs;
}


})();
