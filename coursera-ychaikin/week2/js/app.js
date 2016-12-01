(function () {
  'use strict';

  angular.module('ShoppingListCheckOff', [])
  .controller('ToBuyController', ToBuyController)
  .controller('AlreadyBoughtController', AlreadyBoughtController)
  .service('ShoppingListCheckOffService', ShoppingListCheckOffService);
  // COMMENTING THOSE OUT SO TO LIMIT MYSELF TO THE REQUIREMENTS
  // .provider('ShoppingListCheckOffService', ShoppingListCheckOffServiceProvider)
  // .config(Config);
  //
  // Config.$inject = ['ShoppingListCheckOffServiceProvider'];
  // function Config(ShoppingListCheckOffServiceProvider) {
  //   ShoppingListCheckOffServiceProvider.defaults.maxItems = 5;
  // }

  // Shopping List Buy Controller
  ToBuyController.$inject = ['ShoppingListCheckOffService'];
  function ToBuyController(ShoppingListCheckOffService) {
    var list = this;

    list.items = ShoppingListCheckOffService.getToBuy();

    list.buyItem = function (name, qtty, itemIndex) {
      ShoppingListCheckOffService.buyItem(name, qtty, itemIndex);
    };
  }

  // Shopping List Bought Controller
  AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
  function AlreadyBoughtController(ShoppingListCheckOffService) {
    var list = this;

    list.items = ShoppingListCheckOffService.getBought();
  }

  function ShoppingListCheckOffService() {
    var service = this;

    // List of Items to Buy
    var itemsToBuy = [
      { name:"Apple", qtty:6 },
      { name:"Banana", qtty:4 },
      { name:"Watermelon", qtty:2 },
      { name:"Kiwi", qtty:5 },
      { name:"Lime", qtty:3 }
    ];

    // List of Bought Items
    var itemsBought = [];

    service.buyItem = function (itemName, itemQtty, itemIndex) {
      var item = {
        name: itemName,
        qtty: itemQtty
      };
      itemsBought.push(item);
      itemsToBuy.splice(itemIndex, 1);
    };

    service.getToBuy = function () {
      return itemsToBuy;
    };
    service.getBought = function () {
      return itemsBought;
    };
  }

  // I ORIGINALLY DID THE ASSIGNMENT USING FACTORY AND PROVIDER
  // BUT I'M COMMENTING THEM OUT DUE TO THE REQUIREMENTS

  // function ShoppingListCheckOffServiceFactory() {
  //   var factory = function(maxItems) {
  //     return new ShoppingListCheckOffService(maxItems);
  //   };
  //   return factory;
  // }
  //
  // function ShoppingListCheckOffServiceProvider() {
  //   var provider = this;
  //
  //   provider.defaults = {
  //     maxItems: 5
  //   };
  //
  //   provider.$get = function () {
  //     var shoppingList = new ShoppingListCheckOffService(provider.defaults.maxItems);
  //
  //     return shoppingList;
  //   };
  // }

})();
