(function () {
  'use strict';

  angular.module('public')
  .config(RoutesConfig);

  RoutesConfig.$inject = ['$stateProvider'];
  function RoutesConfig($stateProvider) {

    // Set up UI states (Routes)
    $stateProvider

      .state('public', {
        absract: true,
        templateUrl: 'src/public/public.html'
      })
      // Home page
      .state('public.home', {
        url: '/',
        templateUrl: 'src/public/home/home.html',
        controller: 'HomeController as home'
      })
      // Register page
      .state('public.reg', {
        absract: true,
        templateUrl: 'src/public/reg/reg.html',
        controller: 'RegController',
        controllerAs: 'reg'
        // resolve: {
        //   items: ['RegService', function (RegService) {
        //     return RegService.getItems();
        //   }]
        // }
      })
      // Login page
      .state('public.reg.login', {
        url: '/login',
        templateUrl: 'src/public/reg/login.html'
      })
      // Signup page
      .state('public.reg.signup', {
        url: '/signup',
        templateUrl: 'src/public/reg/signup.html'
      })

      .state('public.info', {
        url: '/info',
        templateUrl: 'src/public/info/my-info.html',
        controller: 'MyInfoController',
        controllerAs: 'myinfo'
      })
      // List page
      .state('public.list', {
        url: '/list',
        templateUrl: 'src/public/list/snippets/list.html',
        controller: 'ListController as list',
        resolve: {
          items: ['ListService', function (ListService) {
            return ListService.getItems();
          }]
        }
      })
      // Courses page
      .state('public.mind', {
        url: '/courses',
        templateUrl: 'src/public/mind/education.html',
        controller: 'StudyController as study',
        resolve: {
          courses: ['StudyService', function (StudyService) {
            return StudyService.getCourses();
          }]
        }
      })

      // ShoppingList's Item Detail page
      .state('public.list.itemDetail', {
        // url: '/item-detail/{itemId}',
        templateUrl: 'src/public/list/snippets/item-detail.html',
        controller: 'ItemController as itemDetail',
        params: {
          itemId: null
        }
      });

  }


})();
