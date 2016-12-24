(function() {
"use strict";

angular.module('common', [])
.constant('ApiPath', 'https://fabraga-angular-menu.herokuapp.com')
.config(config);

config.$inject = ['$httpProvider'];
function config($httpProvider) {
  $httpProvider.interceptors.push('loadingHttpInterceptor');
}

})();
