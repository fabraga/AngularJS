(function () {
  'use strict';

  angular.module('ShoppingList')
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
        templateUrl: 'src/shoppinglist/templates/home.template.html'
      })

      // Premade list page
      .state('shoppingList', {
        url: '/shopping-list',
        templateUrl: 'src/shoppinglist/templates/shoppinglist.template.html',
        controller: 'ShoppingListController as shoppingList',
        resolve: {
          items: ['ShoppingListService', function (ShoppingListService) {
            return ShoppingListService.getItems();
          }]
        }
      })

      // Item Detail page
      .state('shoppingList.itemDetail', {
        // url: '/item-detail/{itemId}',
        templateUrl: 'src/shoppinglist/templates/item-detail.template.html',
        controller: 'ItemController as itemDetail',
        params: {
          itemId: null
        }
      });
  }


})();
