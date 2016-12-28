(function () {
  'use strict';

  angular.module('Reg')
  .service('RegService', RegService);

  RegService.$inject = ['$q','$timeout']
  function RegService($q, $timeout) {
    var service = this;

    // List of Registration fields
    var items = [];

    items.push({
      name: "Org. Milk (ff) 1L Tesco",
      qtty: 1,
      desc: "1L Organic Full fat Irish milk Tesco" });
    items.push({
      name: "Org. 6 Eggs (md) Tesco",
      qtty: 2,
      desc: "Cartoon of 6 medium organic Irish eggs Tesco" });

    service.getItems = function () {
      var deferred = $q.defer();

      // Wait 200 milliseconds before returning
      $timeout(function () {
        // Deferred.reject(items);
        deferred.resolve(items);
      }, 200);

      return deferred.promise;
    };

  }

})();
