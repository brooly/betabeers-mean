'use strict';

angular.module('betabeersApp')

.directive('bbzgzBus', function () {
  return {
    templateUrl: 'views/partials/busstop.html',
    restrict: 'E',
    scope: {
      'busstop': '=ngModel',
      'verTodo': '&',
    },
    controller : function($scope) {
      $scope.verTodo = false;
    },
    link: function(scope) {
      scope.delete = function(busstop) {
        busstop.remove().then(function() {
          console.log('Parada borrada....');
          scope.$emit('refresh');
        }, function() {
          console.log('Error al borrar');
        });
      };
    }
  };
});