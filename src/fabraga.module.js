$(function () { // Same as document.addEventListener("DOMContentLoaded"...

  // Same as document.querySelector("#navbarToggle").addEventListener("blur",...
  $("#navbarToggle").blur(function (event) {
    var screenWidth = window.innerWidth;
    if (screenWidth < 768) {
      $("#collapsable-nav").collapse('hide');
    }
  });
});

(function () {
  'use strict';

  angular.module('FABRAGA', ['public'])
  .config(Config);

  Config.$inject = ['$urlRouterProvider'];
  function Config($urlRouterProvider) {

    // Redirects to public root
    $urlRouterProvider.otherwise('/');
  }

})();
