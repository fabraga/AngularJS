(function() {
"use strict";

angular.module('common', [])
.constant('commonPaths', {
  'HOME_PATH': 'src/public/home',
  'MIND_PATH': 'src/public/mind',
  'COURSERA_PATH': 'src/public/mind/coursera',
  'LOAD_PATH': 'src/common/loading',
  'LIST_PATH': 'src/public/list',
  'REST_PATH': 'src/public/rest'
})
.constant('ApiHomePath', 'https://fabraga.herokuapp.com')
.constant('ApiMenuPath', 'https://fabraga-menu.herokuapp.com')
.constant('ApiMenuChinaPath', 'https://fabraga-angular-menu.herokuapp.com')
.config(Config);

Config.$inject = ['$httpProvider'];
function Config($httpProvider) {
  $httpProvider.interceptors.push('loadingHttpInterceptor');
}

})();
