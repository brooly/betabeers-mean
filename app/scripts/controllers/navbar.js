'use strict';

angular.module('betabeersApp')
  .controller('NavbarCtrl', function ($scope, $location) {
    $scope.menu = [{
      'title': 'Home',
      'link': '/'
    }, {
      'title': 'Paradas de Bus',
      'link': '/busstop'
    }, {
      'title': 'Mapa de paradas',
      'link': '/map'
    }];
    
    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });
