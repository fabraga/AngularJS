(function () {
  'use strict';

  angular.module('LunchCheck', [])
  .controller('LunchCheckController', LunchCheckController);

  LunchCheckController.$inject = ['$scope'];
  function LunchCheckController ($scope) {
    $scope.input = "";

    $scope.checkDishes = function() {
      if ($scope.input.length < 1) {
        $scope.message = "Please, enter some dish.";
        $scope.status = "has-error";
        return;
      }
      var status = "";
      var msg = "";
      var dishes = calculateDishes($scope.input);

      if (dishes > 3) {
        status = "has-error";
        msg = "too much!";
      } else {
        status = "has-success";
        msg = "good. Enjoy!";
      }
      $scope.message = dishes + " dishes is "+msg;
      $scope.status = status;
    }

    function calculateDishes(string) {
      var qtt = string.split(',');
      var empties = 0;
      for(var item in qtt) {
        if(!qtt[item].trim()) {
          empties++;
        }
      }
      return qtt.length - empties;
    }
  }

})();
