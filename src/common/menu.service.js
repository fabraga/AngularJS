(function () {
"use strict";

angular.module('common')
.service('MenuService', MenuService);


MenuService.$inject = ['$http', 'ApiMenuChinaPath'];
function MenuService($http, ApiMenuChinaPath) {
  var service = this;

  var ApiPath = ApiMenuChinaPath;

  service.getCategories = function () {
    return $http.get(ApiPath + '/categories.json').then(function (response) {
      return response.data;
    });
  };

  service.getMenuItems = function (category) {
    var config = {};
    if (category) {
      config.params = {'category': category};
    }
    return $http.get(ApiPath + '/menu_items.json', config).then(function (response) {
      return response.data;
    });
  };

  service.getItems = function () {
    return $http.get(ApiPath + '/menu_items.json').then(function (response) {
      return response.data;
    });
  };

}

})();
