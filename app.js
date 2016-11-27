(function () {
  'use strict';

  angular.module('myApp', [])
  .controller('myController', myController);

  myController.$inject = ['$scope'];
  function myController ($scope) {
    $scope.dishes = "";
    $scope.message = "";

    $scope.check = function() {
      $scope.total = calculateTotal($scope.dishes);
      if ($scope.total > 3) {
        $scope.message = "Too much!";
      }
      else {
        $scope.message = "Enjoy!";
      }
    }

    function calculateTotal(string) {
      var dishCount = 0;
      if (string.length > 0) {
        dishCount++;
      }
      for (var i = 0 ; i < string.length ; i++) {
        if (string.charAt(i) === ",") {
          dishCount ++;
        }
      }
      return dishCount;
    }
  }

})();
