(function () {
  'use strict';

  angular.module('public')
  .controller('StudyController', StudyController);

  StudyController.$inject = ['courses'];
  function StudyController(courses) {
  // StudyController.$inject = ['StudyService'];
  // function StudyController(StudyService) {
    var study = this;

    // study.courses = StudyService.getCourses();
    study.courses = courses;

    study.$onInit = function () {
    }


  }

})();
