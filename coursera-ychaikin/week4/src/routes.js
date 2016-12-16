(function () {
  'use strict';

  angular.module('MenuApp')
  .config(RoutesConfig);

  RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
  function RoutesConfig($stateProvider, $urlRouterProvider) {

    // Redirect to home page if no other URL matches
    $urlRouterProvider.otherwise('/');

    // Set up UI states
    $stateProvider

      // Home page
      .state('home', {
        url: '/',
        templateUrl: 'src/templates/home.template.html'
      })

      // Categories page
      .state('categories', {
        url: '/categories',
        templateUrl: 'src/templates/categories.template.html',
        controller: 'MenuController as menu',
        resolve: {
          categs: ['MenuDataService', function (MenuDataService) {
            return MenuDataService.getAllCategories();
          }]
        }
      });
      //
      // // Item Detail page
      // .state('categories.items', {
      //   // url: '/items/{itemId}',
      //   templateUrl: 'src/templates/items.template.html',
      //   controller: 'ItemController as item',
      //   params: {
      //     itemId: null
      //   }
      // });
  }


})();
