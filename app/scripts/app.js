'use strict';

angular.module('betabeersApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'restangular',
  'bbzgz.services',
  'ui.map'
])
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'partials/main',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
      
    $locationProvider.html5Mode(true);
  })

  .config(function(RestangularProvider) {
    //TODO Parametrizar con servidor
    RestangularProvider.setBaseUrl('http://localhost:9000/api');
    // Mongo id
    RestangularProvider.setRestangularFields({
      id: '_id'
    });
  });
