'use strict';

angular.module('betabeersApp')

.config(function ($routeProvider) {
  $routeProvider
    .when('/busstop', {
      templateUrl: 'views/partials/busstops.html',
      controller: 'BusStopCtrl'
    })
    .when('/busstop/new', {
      templateUrl: 'views/partials/busstopNew.html',
      controller: 'BusStopNewCtrl'
    });
})

.controller('BusStopCtrl', function ($scope, $location, busFactory) {
  $scope.busstops = [];

  
  function loadBusStops() {
    busFactory.all().then(function(data) {
      $scope.busstops = data;
    }, function(err) {
      console.log('ERRROR::::::', err);
    });
  }

  $scope.busqueda = '';
  $scope.limite = 5;

  $scope.verMas = function () {
    $scope.limite += 5;
  };

  $scope.verMenos = function () {
    $scope.limite -= ($scope.limite > 5) ? 5 : 0;
  };

  $scope.nuevaParada = function() {
    $location.path('/busstop/new');
  };

  $scope.$on('refresh', function () {
    loadBusStops();
  });

  loadBusStops();

})

.controller('BusStopNewCtrl', function ($scope, $location, busFactory) {
  $scope.busstop = {};
  $scope.busstop.typeStop = 'Bus';

  $scope.doNuevaParada = function() {
    busFactory.createBusStop($scope.busstop).then(function() {
      $location.path('/busstop');
    }, function(err) {
      console.log('ERRROR:::::::', err);
    });
  };

  $scope.cancel = function() {
    $location.path('/busstop');
  };

});