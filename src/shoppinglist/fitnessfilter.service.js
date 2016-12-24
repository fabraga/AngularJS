(function () {
  'use strict';

  angular.module('ShoppingList')
  .service('FitnessFilterService', FitnessFilterService);


  FitnessFilterService.$inject = ['$q', '$timeout']
  function FitnessFilterService($q, $timeout) {
    var service = this;

    service.checkName = function (name, $ctrl) {

      var detect = "cookie";

      var deferred = $q.defer();

      var result = {
        message: ""
      };

      $timeout(function () {
        // Check for cookies
        if (name.toLowerCase().indexOf(detect) === -1) {
          deferred.resolve(result)
        } else {
          $ctrl.warning = "Stay away from "+detect+"!";
          deferred.reject(result);
        }
      }, 700);

      return deferred.promise;
    };

    service.checkQuantity = function (quantity) {
      var deferred = $q.defer();
      var result = {
        message: ""
      };

      $timeout(function () {
        // Check for too many boxes
        if (quantity < 6) {
          deferred.resolve(result);
        }
        else {
          result.message = "That's too much!";
          deferred.reject(result);
        }
      }, 300);

      return deferred.promise;
    };
  }

})();
