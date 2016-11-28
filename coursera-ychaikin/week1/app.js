(function () {
  'use strict';

  angular.module('LunchCheck', [])
  .controller('LunchCheckController', LunchCheckController);

  LunchCheckController.$inject = ['$scope'];
  function LunchCheckController ($scope) {
    $scope.input = "";
    $scope.dishes = 0;
    $scope.message = "";

    $scope.check = function() {
      if ($scope.input.length < 1) {
        $scope.message = "Please, enter some dish.";
        return;
      }
      $scope.dishes = calculateDishes($scope.input);
      $scope.message = ($scope.dishes > 3 ? "Too much!" : "Enjoy!");
      $scope.message += " (" + $scope.dishes + " dishes)";
    }

    function calculateDishes(string) {
      var qtt = string.split(',');
      return qtt.length;
      // var dishCount = 0;
      // for (var i = 0 ; i < qtt.length ; i++) {
      //   if (!qtt[i].trim()) {
      //     dishCount++;
      //     console.log(dishCount);
      //   }
      // }
      // return dishCount;
    }
  }

})();
