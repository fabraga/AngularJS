(function () {
  "use strict";

  angular.module('common')
  .constant('CourseraPath', 'https://fabraga.github.io/AngularJS/coursera-ychaikin')
  .service('StudyService', StudyService);


  // StudyService.$inject = ['$http', 'ApiPath'];
  // function StudyService($http, ApiPath) {
  StudyService.$inject = ['CourseraPath'];
  function StudyService(CourseraPath) {
    var study = this;

    study.masters = {};
    study.masters.title = "MSc in Computing & Information Systems";
    study.masters.institution = "Dublin Business School (DBS)";
    study.masters.graduated = "2015"
    study.masters.modules = [{
      name: 'Software Engineering'
    },{
      name: 'Advanced Databases'
    },{
      name: 'Web & Mobile Technologies'
    },{
      name: 'Personal and Professional Development'
    },{
      name: 'Research Methods I'
    },{
      name: 'Research Methods II'
    },{
      name: 'Computer Security Systems'
    },{
      name: 'Enterprise Information Systems'
    },{
      name: 'Data & Data Analytics'
    }];

    study.angular = {};
    study.angular.title = "Single Page Web Applications with AngularJS";
    study.angular.institution = "Johns Hopkins University";
    study.angular.graduated = "Dec/2016"
    study.angular.modules = [{
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

    study.courses = [];
    study.courses.push(study.angular);
    study.courses.push(study.masters);

    study.getCourses = function () {
      return study.courses;
    }
    study.getMasters = function () {
      return study.masters;
    }
    study.getAngular = function () {
      return study.angular;
    }

  }

})();
