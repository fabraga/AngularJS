(function () {
  'use strict';

  angular.module('myApp', [])
  .controller('CounterController', CounterController)
  .controller('filterController', FilterController)
  .filter('altercase', AlternateCaseFilter)
  .controller('BindingController', BindingController)
  .controller('ShoppingListController', ShoppingListController)
  .provider('ShoppingListService', ShoppingListServiceProvider)
  .config(Config);

  Config.$inject = ['ShoppingListServiceProvider'];
  function Config(ShoppingListServiceProvider) {
    ShoppingListServiceProvider.defaults.maxItems = 5;
  }

  // .factory('ShoppingListFactory', ShoppingListFactory);
  // .service('ShoppingListService', ShoppingListService);
  //.filter('replacefield', ReplaceFilter);

  CounterController.$inject = ['$scope', '$timeout'];
  function CounterController($scope, $timeout) {
    $scope.counter = 0;

    $scope.upCount = function () {
      $scope.counter++;
    };
    $scope.upDigest = function () {
      setTimeout(function () {
        $scope.counter++;
        $scope.$digest();
        console.log("with $digest (AngularJS wont see possible exceptions inside 'setTimeout')");
      }, 800)
    };
    $scope.upApply = function () {
      setTimeout(function () {
        $scope.$apply(function () {
          $scope.counter++;
          console.log("with $apply (AngularJS catches possible exceptions inside 'setTimeout')");
        });
      }, 800)
    };
    $scope.upTimeout = function () {
      $timeout(function () {
        $scope.counter++;
        console.log("$timeout is AngularJS native version for 'setTimeout'");
      }, 800);
    };
  }

  FilterController.$inject = ['$scope', '$filter', 'altercaseFilter'];
  function FilterController ($scope, $filter, altercaseFilter) {
    $scope.product = "Aubergine";
    $scope.price = .55;
    $scope.name = "Fabricio";

    $scope.showPrice = function() {
      return $filter('currency')($scope.price,'€');
    };
    $scope.capitalize = function() {
      $scope.product = $filter('uppercase')($scope.product);
    };
    $scope.lowercase = function() {
      $scope.product = $filter('lowercase')($scope.product);
    };
    $scope.altercase = function() {
      $scope.product = altercaseFilter($scope.product);
    };
    // $scope.replacefield = function() {
    //   $scope.product = replaceFilter($scope.product, $scope.name, $scope.product);
    // }
  }

  function AlternateCaseFilter() {
    return function (input) {
      input = input || "";
      var output = "";
      for(var i=0; i<input.length; i++) {
        if ( i%2 == 0) {
          output += input.substring(i, i + 1).toUpperCase();
        } else {
          output += input.substring(i, i + 1).toLowerCase();
        }
      }
      return output;
    };
  }

  // function ReplaceFilter() {
  //   return function (input, target, replacement) {
  //     input = input !! "";
  //     input = input.replace(target, replacement);
  //     return input;
  //   };
  // }

  BindingController.$inject = ['$scope'];
  function BindingController($scope) {
    $scope.firstName = "";
    $scope.lastname = "";

    // Just return fullName string:
    $scope.getFullName = function () {
      return $scope.firstName + " " + $scope.lastname;
    };
    // Set fullName 1-time only:
    $scope.setFullName = function () {
      $scope.fullName = $scope.firstName + " " + "Braga";
    };
  }

  // Shopping List Controller
  ShoppingListController.$inject = ['ShoppingListService'];
  function ShoppingListController(ShoppingListService) {
    var list = this;
    // var maxItems = 5;

    // Using factory to create new shopping list service
    // var shoppingList = ShoppingListFactory(maxItems);

    // list.filter = "";

    list.items = ShoppingListService.getItems();

    list.itemName = "";
    list.itemQtty = "";

    list.add = function () {
      try {
        ShoppingListService.addItem(list.itemName, list.itemQtty);
      } catch (error) {
        list.errorMessage = error.message;
      }
    };

    list.removeItem = function (itemIndex) {
      ShoppingListService.removeItem(itemIndex);
    };

  }

  function ShoppingListService(maxItems) {
    var service = this;

    // List of Shopping Items
    var items = [
      { name: "Fresh Milk", qtty: 1 },
      { name: "Organic Milk", qtty: 1 },
      { name: "Donuts", qtty: 4 },
      { name: "Cookies", qtty: 2 },
      { name: "Banana", qtty: 6 },
      { name: "Volvic Water", qtty: 2 },
      { name: "Pellegrino 1L", qtty: 1 }
    ];

    service.addItem = function (itemName, itemQtty) {
      if ( (maxItems === undefined) ||
           (maxItems !== undefined) && (items.length < maxItems)) {
        var item = {
          name: itemName,
          qtty: itemQtty
        };
        items.push(item);
      } else {
        throw new Error("Max items (" + maxItems +") reached.");
      }
      // if ( !itemName || !itemQtty ) {
      //   console.log("Item's name and quantity must be provided.");
      //   return;
      // }
    };

    service.removeItem = function (itemIndex) {
      items.splice(itemIndex, 1);
    }

    service.getItems = function () {
      return items;
    };
  }

  function ShoppingListFactory() {
    var factory = function(maxItems) {
      return new ShoppingListService(maxItems);
    };
    return factory;
  }

  function ShoppingListServiceProvider() {
    var provider = this;

    provider.defaults = {
      maxItems: 10
    };

    provider.$get = function () {
      var shoppingList = new ShoppingListService(provider.defaults.maxItems);

      return shoppingList;
    };
  }

})();
