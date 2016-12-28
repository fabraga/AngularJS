(function () {
  'use strict';

  angular.module('FABRAGA')
  .constant('CourseraPath', 'https://fabraga.github.io/AngularJS/coursera-ychaikin')
  .component('coursera', {
    templateUrl: function (commonPaths) {
      return commonPaths.COURSERA_PATH + '/coursera.html';
    },
    bindings: {
      institution: '@',
      graduated: '@'
    },
    controller: CourseraController
  });

  CourseraController.$inject = ['CourseraPath']
  function CourseraController(CourseraPath) {
    var $ctrl = this;

    $ctrl.modules = [{
      name: 'Lunch Checker',
      path: CourseraPath+"/week1"
    },{
      name: 'Shopping List Check Off',
      path: CourseraPath+"/week2"
    },{
      name: 'Narrow It Down!',
      path: CourseraPath+"/week3"
    },{
      name: 'Menu Category Items',
      path: CourseraPath+"/week4"
    },{
      name: 'Sign Up & My Info',
      path: CourseraPath+"/week5"
    }];

    $ctrl.course = {};
    $ctrl.course.modules = $ctrl.modules;

    $ctrl.$onInit = function () {
      // for ( var i in $ctrl.course.modules) {
      //   console.log($ctrl.course.modules[i].path);
      // }
    }
  }

})();
