(function () {
  'use strict';

  angular.module('ShoppingList')
  .controller('ItemController', ItemController);

  ItemController.$inject = ['$stateParams','items']
  function ItemController($stateParams, items) {
    var itemDetail = this;
    var item = items[$stateParams.itemId];
    itemDetail.name = item.name;
    itemDetail.qtty = item.qtty;
    itemDetail.desc = item.desc;
  }

})();
