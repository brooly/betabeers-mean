'use strict';

/* Services */

// service module
var bbzgzServices = angular.module('bbzgz.services', ['restangular']);

bbzgzServices.factory('busFactory',
	function($filter, Restangular) {

		var _busFactory = Restangular.all('busstop');

		var busFactory = {};

		busFactory.all = function(options) {
			return _busFactory.getList(options);
		};

		busFactory.createBusStop = function(busstop) {
			return _busFactory.post(busstop);
		};

		return busFactory;
	});