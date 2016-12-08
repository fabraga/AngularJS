(function () {
  'use strict';

  angular.module('FABRAGA', [])
  .controller('ShoppingListController', ShoppingListController)
  .provider('ShoppingListService', ShoppingListServiceProvider)
  // .controller('ShoppingListDirectiveController', ShoppingListDirectiveController)
  .directive('shoppingList', ShoppingListDirective)
  .config(Config);
  // .factory('ShoppingListFactory', ShoppingListFactory);
  // .service('ShoppingListService', ShoppingListService);

  Config.$inject = ['ShoppingListServiceProvider'];
  function Config(ShoppingListServiceProvider) {
    ShoppingListServiceProvider.defaults.maxItems = 10;
  }

  // Shopping List directive's Factory Function
  function ShoppingListDirective() {
    var ddo = {
      restrict: 'E',
      templateUrl: 'shoppingList.html',
      scope: {
        items: '<',
        title: '@',
        total: '@',
        detect: '@',
        onRemove: '&'
      },
      // controller: 'ShoppingListDirectiveController as list',
      controller: ShoppingListDirectiveController,
      controllerAs: 'list',
      bindToController: true,
      link: ShoppingListDirectiveLink,
      transclude: true
    };
    return ddo;
  }

  function ShoppingListDirectiveLink(scope, element, attrs, controller) {
    console.log("Link scope is: ", scope);
    console.log("Controller instance is: ", controller);
    console.log("Element is: ", element);

    console.log("Detect = "+controller.detect);

    scope.$watch('list.detectionInList("'+controller.detect+'")', function (newV, oldV) {
      console.log("Old value: ", oldV);
      console.log("New value: ", newV);

      if (newV === true) {
        displayDetectionWarning();
      } else {
        removeDetectionWarning();
      }

    });

    function displayDetectionWarning() {
      // Using AngularJS jqLite
      // var warningElem = element.find("div");
      // console.log(warningElem);
      // warningElem.css('display', 'block');

      // If jQuery included before AngularJS
      var warningElem = element.find("div.error");
      warningElem.slideDown(500);
    }

    function removeDetectionWarning() {
      // Using AngularJS jqLite
      // var warningElem = element.find("div");
      // warningElem.css('display', 'none');

      // If jQuery included before AngularJS
      var warningElem = element.find("div.error");
      warningElem.slideUp(500);
    }
  }

  function ShoppingListDirectiveController() {
    var list = this;

    list.detectionInList = function(detection) {
      for (var i = 0 ; i < list.items.length ; i++) {
        var name = list.items[i].name;
        if (name.toLowerCase().indexOf(detection) !== -1) {
          return true;
        }
      }
      return false;
    };
  }

  // Shopping List Controller
  ShoppingListController.$inject = ['ShoppingListService'];
  function ShoppingListController(ShoppingListService) {
    var list = this;
    // list.filter = "";

    list.items = ShoppingListService.getItems();
    var originalTitle = "Shopping List";

    list.title = originalTitle;
    list.total = " (" + list.items.length + " items)";

    list.detect = "cookie";
    list.warning = "DETECTED!";

    list.itemName = "";
    list.itemQtty = "";

    list.add = function () {
      var warn = ShoppingListService.addItem(list.itemName, list.itemQtty);

      if ( !warn ) {
        list.warning = list.itemName + " ("+list.itemQtty+") added.";
        list.total = " (" + list.items.length + " items)";
      } else {
        list.warning = warn;
      }
    };

    list.removeItem = function (itemIndex) {
      var remItem = ShoppingListService.removeItem(itemIndex);

      list.warning = remItem[0].name + " removed (" + remItem[0].qtty+")";
      list.total = " (" + list.items.length + " items)";
    };

  }

  // If not specified, maxItems assumed unlimited
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
      if ( !itemName || !itemQtty ) {
        return "Provide name and quantity.";
      }
      if ( (maxItems === undefined) ||
           (maxItems !== undefined) && (items.length < maxItems)) {
        var item = {
          name: itemName,
          qtty: itemQtty
        };
        items.push(item);
      } else {
        return "Max items (" + maxItems +") reached.";
      }
    };

    service.removeItem = function (itemIndex) {
      return items.splice(itemIndex, 1);
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
