(function () {
  'use strict';

  angular.module('LunchCheckerApp', [])
  .controller('DishController', DishController);

  DishController.$inject = ['$scope'];
  function DishController ($scope) {
    $scope.dishes = "";
    $scope.total = 0;
    $scope.message = "";

    $scope.check = function() {
      if (calculateDishes($scope.dishes) > 2) {
        $scope.message = "Too much!";
      }
      else {
        $scope.message = "Enjoy!";
      }
      // $scope.message = (calculateDishes($scope.dishes) > 2 ? "Too much!" : "Bon appetit!");
    }

    function calculateDishes(string) {
      // var total = 0;
      var dishes = string.split(',');
      return dishes.length;

      // for (var i = 0 ; i < string.length ; i++) {
      //   total += string.charCodeAt(i);
      // }
      // return total;
    }
  });

})();
