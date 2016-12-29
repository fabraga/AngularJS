(function () {
"use strict";

angular.module('public')
.component('menuCategory', {
  templateUrl: 'src/public/menu/menu-category.html',
  bindings: {
    category: '<'
  }
});

})();
