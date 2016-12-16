(function () {
  'use strict';

  angular.module('MenuApp')
  .controller('MenuController', MenuController);

  MenuController.$inject = ['categs'];
  function MenuController(categs) {
    var menu = this;

    menu.$onInit = function () {
      console.log("Inside MenuController!");
    };

    menu.categs = categs;
  }

})();
