(function () {
  'use strict';

  angular.module('FABRAGA', [])
  .controller('MenuCategsController', MenuCategsController)
  .service('MenuCategsService', MenuCategsService)
  .constant('ApiBasePath', "http://davids-restaurant.herokuapp.com")
  .controller('CounterController', CounterController)
  .controller('filterController', FilterController)
  .filter('altercase', AlternateCaseFilter)
  .controller('BindingController', BindingController);

  //.filter('replacefield', ReplaceFilter);
  // Meny Categs (Categories) Controller

  MenuCategsController.$inject = ['MenuCategsService'];
  function MenuCategsController(MenuCategsService) {
    var menu = this;

    var promise = MenuCategsService.getMenuCategs();

    promise.then(function (response) {
      menu.categs = response.data;
    })
    .catch(function (error) {
      console.log("Something went terribly wrong.");
    });

    menu.logMenuItems = function (shortName) {
      var promise = MenuCategsService.getMenuForCateg(shortName);

      promise.then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      })
    };
  }

  MenuCategsService.$inject = ['$http', 'ApiBasePath']
  function MenuCategsService($http, ApiBasePath) {
    var service = this;

    service.getMenuCategs = function () {
      var response = $http({
        method: "GET",
        url: (ApiBasePath + "/categories.json")
      });
      return response;
    };

    service.getMenuForCateg = function (shortName) {
      var response = $http({
        method: "GET",
        url: (ApiBasePath + "/menu_items.json"),
        params: {
          category: shortName
        }
      });
      return response;
    };

  }

  CounterController.$inject = ['$scope', '$timeout'];
  function CounterController($scope, $timeout) {
    $scope.counter = 0;

    $scope.upCount = function () {
      $scope.counter++;
    };
    $scope.upDigest = function () {
      setTimeout(function () {
        $scope.counter++;
        $scope.$digest();
        console.log("with $digest (AngularJS wont see possible exceptions inside 'setTimeout')");
      }, 800)
    };
    $scope.upApply = function () {
      setTimeout(function () {
        $scope.$apply(function () {
          $scope.counter++;
          console.log("with $apply (AngularJS catches possible exceptions inside 'setTimeout')");
        });
      }, 800)
    };
    $scope.upTimeout = function () {
      $timeout(function () {
        $scope.counter++;
        console.log("$timeout is AngularJS native version for 'setTimeout'");
      }, 800);
    };
  }

  FilterController.$inject = ['$scope', '$filter', 'altercaseFilter'];
  function FilterController ($scope, $filter, altercaseFilter) {
    $scope.product = "Aubergine";
    $scope.price = .55;
    $scope.name = "Fabricio";

    $scope.showPrice = function() {
      return $filter('currency')($scope.price,'€');
    };
    $scope.capitalize = function() {
      $scope.product = $filter('uppercase')($scope.product);
    };
    $scope.lowercase = function() {
      $scope.product = $filter('lowercase')($scope.product);
    };
    $scope.altercase = function() {
      $scope.product = altercaseFilter($scope.product);
    };
    // $scope.replacefield = function() {
    //   $scope.product = replaceFilter($scope.product, $scope.name, $scope.product);
    // }
  }

  function AlternateCaseFilter() {
    return function (input) {
      input = input || "";
      var output = "";
      for(var i=0; i<input.length; i++) {
        if ( i%2 == 0) {
          output += input.substring(i, i + 1).toUpperCase();
        } else {
          output += input.substring(i, i + 1).toLowerCase();
        }
      }
      return output;
    };
  }

  // function ReplaceFilter() {
  //   return function (input, target, replacement) {
  //     input = input !! "";
  //     input = input.replace(target, replacement);
  //     return input;
  //   };
  // }

  // Binding Controller
  BindingController.$inject = ['$scope'];
  function BindingController($scope) {
    $scope.firstName = "";
    $scope.lastname = "";

    // Just return fullName string:
    $scope.getFullName = function () {
      return $scope.firstName + " " + $scope.lastname;
    };
    // Set fullName 1-time only:
    $scope.setFullName = function () {
      $scope.fullName = $scope.firstName + " " + "Braga";
    };
  }

})();
