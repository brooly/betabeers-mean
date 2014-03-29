'use strict';

angular.module('betabeersApp')

.config(function ($routeProvider) {
  $routeProvider
    .when('/map', {
      templateUrl: 'views/partials/busmap.html',
      controller: 'BusMapCtrl'
    });
})

.controller('BusMapCtrl', function ($scope, busFactory) {
  $scope.busMarkers = [];
  $scope.linea = '';

  $scope.mapOptions = {
    center: new google.maps.LatLng(41.663695,-0.868018),
    zoom: 17,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  $scope.$watch('linea', function(newVal, oldVal) {
    if (newVal!==oldVal) {
      var options = {'linea': newVal};
      busFactory.all(options).then(function(data) {
        clearMarkers();
        if (data && data.length>0) {
          for (var i=0; i<data.length; i++) {
            $scope.busMarkers.push(createMarker(data[i]));
          }
        }
      }, function(err) {
        console.log('ERRROR::::::', err);
      });
    }
  });
  
  $scope.loadBusStops = function() {
    busFactory.all().then(function(data) {
      if (data && data.length>0) {
        for (var i=0; i<data.length; i++) {
          $scope.busMarkers.push(createMarker(data[i]));
        }
      }
    }, function(err) {
      console.log('ERRROR::::::', err);
    });
  };

  function clearMarkers() {
    for (var i=0; i < $scope.busMarkers.length; i++) {
      $scope.busMarkers[i].setMap(null);
    }
    $scope.busMarkers = [];
  }

  function createMarker(busstop) {
    var poiOptions = {};
    poiOptions.position = new google.maps.LatLng(busstop.lat, busstop.lon);
    poiOptions.title = busstop.name;
    poiOptions.map = $scope.myMap;

    var result = new google.maps.Marker(poiOptions);
    return result;
  }

  $scope.openMarkerInfo = function(marker) {
    $scope.currentMarker = marker;
    $scope.currentMarkerLat = marker.getPosition().lat();
    $scope.currentMarkerLng = marker.getPosition().lng();
    $scope.currentTitle = marker.title;
    $scope.myInfoWindow.open($scope.myMap, marker);
  };

});