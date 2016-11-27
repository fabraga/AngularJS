(function () {
  'use strict';

  angular.module('myApp', [])

  .controller('myController', function ($scope) {
    $scope.name = "";
    $scope.total = 0;

    $scope.displayTotal = function() {
      $scope.total = calculateTotal($scope.name);
    }

    function calculateTotal(string) {
      var total = 0;
      for (var i = 0 ; i < string.length ; i++) {
        total += string.charCodeAt(i);
      }
      return total;
    }
  });

})();
