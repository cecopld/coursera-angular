(function () {
'use strict';

angular.module('MenuApp')
       .config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/');

  $stateProvider.state('home', {
    url: '/',
    templateUrl: 'src/menuapp/templates/home.template.html'
  });

  $stateProvider.state('categoriesList', {
    url: '/categories',
    templateUrl: 'src/menuapp/templates/categories-view.template.html',
    controller: 'categoriesController as categoriesCtrl',
    resolve: {
      categories: ['MenuDataService', function (MenuDataService) {
        return MenuDataService.getAllCategories();
      }]
    }
  });

  $stateProvider.state('itemsList', {
    url: '/categories/{category}',
    templateUrl: 'src/menuapp/templates/items-view.template.html',
    controller: 'itemsController as itemsCtrl',
    resolve: {
      items: ['$stateParams','MenuDataService', function ($stateParams,MenuDataService) {
        return MenuDataService.getItemsForCategory($stateParams.category);
      }]
    }
  });

}

})();
