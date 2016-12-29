(function () {
"use strict";

angular.module('public')
.component('menuItem', {
  templateUrl: 'src/public/menu/menu-item.html',
  bindings: {
    menuItem: '<'
  },
  controller: MenuItemController
});


MenuItemController.$inject = ['ApiMenuChinaPath'];
function MenuItemController(ApiMenuChinaPath) {
  var $ctrl = this;
  $ctrl.basePath = ApiMenuChinaPath;

  $ctrl.$onInit = function () {
    console.log("triggered.");
  }
}

})();
