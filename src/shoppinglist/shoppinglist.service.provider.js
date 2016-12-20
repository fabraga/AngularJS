(function () {
  'use strict';

  angular.module('ShoppingList')
  .provider('ShoppingListService', ShoppingListServiceProvider);

  ShoppingListService.$inject = ['$q','$timeout']
  function ShoppingListService($q, $timeout) {
    var service = this;

    // List of Shopping Items
    var items = [];

    items.push({
      name: "Org. Milk (ff) 1L Tesco",
      qtty: 1,
      desc: "1L Organic Full fat Irish milk Tesco" });
    items.push({
      name: "Org. 6 Eggs (md) Tesco",
      qtty: 2,
      desc: "Cartoon of 6 medium organic Irish eggs Tesco" });
    items.push({
      name: "Cookies (250gr) Tesco",
      qtty: 4,
      desc: "Package of cookies 250gr Tesco" });
    items.push({
      name: "Banana (loose) Tesco",
      qtty: 6,
      desc: "Loose banana (unit) Tesco" });
    items.push({
      name: "Volvic 1.5L (unit)",
      qtty: 2,
      desc: "Volvic water 1.5L (unit)" });
    items.push({
      name: "Pellegrino 1L",
      qtty: 1,
      desc: "Pellegrino water 1L" });

    service.getItems = function () {
      var deferred = $q.defer();

      // Wait 200 milliseconds before returning
      $timeout(function () {
        // Deferred.reject(items);
        deferred.resolve(items);
      }, 200);

      return deferred.promise;
    };

    service.addItem = function (itemName, itemQtty) {
      if ( !itemName || !itemQtty ) {
        return "Provide name and quantity.";
      }

      if (( maxItems === undefined) || ( maxItems !== undefined ) && ( items.length < maxItems )) {
        var item = {
          name: itemName,
          qtty: itemQtty
        };
        items.push(item);
      } else {
        return ("Max items (" + maxItems +") reached.");
      }
    };

    service.removeItem = function (itemIndex) {
      return items.splice(itemIndex, 1);
    };
  }

  function ShoppingListServiceProvider() {
    var provider = this;

    provider.defaults = {
      maxItems: 5
    };

    provider.$get = function () {
      var sls = new ShoppingListService(provider.defaults.maxItems);

      return sls;
    };
  }

})();
