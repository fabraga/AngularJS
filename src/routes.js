(function () {
  'use strict';

  angular.module('FABRAGA')
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
        templateUrl: 'src/home/templates/home.template.html'
      })

      // ShoppingList page
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

      // ShoppingList's Item Detail page
      .state('shoppingList.itemDetail', {
        // url: '/item-detail/{itemId}',
        templateUrl: 'src/shoppinglist/templates/item-detail.template.html',
        controller: 'ItemController as itemDetail',
        params: {
          itemId: null
        }
      })

      // ShoppingList page
      .state('registration', {
        url: '/registration',
        templateUrl: 'src/reg/templates/reg.template.html',
        controller: 'RegistrationController as reg',
        // resolve: {
        //   items: ['RegistrationService', function (RegistrationService) {
        //     return RegistrationService.getItems();
        //   }]
        // }
      });

  }


})();
