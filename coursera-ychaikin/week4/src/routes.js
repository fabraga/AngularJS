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
        controller: 'CategoriesController as menu',
        resolve: {
          categories: ['MenuDataService', function (MenuDataService) {
            return MenuDataService.getAllCategories();
          }]
        }
      })

      // Items page
      .state('items', {
        // url: '/items/{categId}',
        templateUrl: 'src/templates/items.template.html',
        controller: 'ItemsController as itemList',
        resolve: {
          items: ['MenuDataService', function (MenuDataService) {
            return MenuDataService.getItemsForCategory(categId);
          }]
        },
        params: {
          categId: null
        }
      });
  }


})();
