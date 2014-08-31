var droplifter = angular.module('droplifter', ['ngResource']);

/**
 * Factory: Drop
 *
 * CRUD operations for Drop objects
 *
 * Requirements:
 * - ngResource
 */
droplifter.factory('DropFactory', [
'$resource',
function ($resource) {
    return $resource('/api/drop/:id', {}, {
        query: { method: 'GET', isArray: true },
        update: { method: 'PUT' },
        delete: { method: 'DELETE' }
    });
}]);

/**
 * Factory: User
 *
 * CRUD operations for User objects
 *
 * Requirements:
 * - ngResource
 */
droplifter.factory('DropFactory', [
'$resource',
function ($resource) {
    return $resource('/drop/', {}, {
        query: { method: 'GET', isArray: true },
        update: { method: 'PUT' },
        save: { method: 'POST' },
        delete: { method: 'DELETE' }
    });
}]);

/**
 * Factory: LocationService
 *
 * Manage a user's service
 *
 * Requirements:
 * - ngResource
 */
droplifter.service('LocationService', [
function () {
    var _location = null;
    var setLocation = function (lat, lng) {
        if (typeof lat === "object") {
            _location = lat;
        }
        _location = {
            lat: lat,
            lng: lng
        };
    };
    var getLocation = function () {
        return _location;
    };
    return {
        setLocation: setLocation,
        getLocation: getLocation
    };
}]);

/**
 * Controller: DropCtrl
 *
 * CRUD operations for DropCtrl objects
 *
 * Requirements:
 * - ngResource
 */
droplifter.controller('DropCtrl', ['$scope', 'DropFactory', 'LocationService',
function ($scope, DropFactory, LocationService) {
    var _drops = [];
    // Public
    $scope.user_drop = "";
    /**
     * When the location changes, load new drops
     * @param {object} location Object with lat and lng
     */
    $scope.$watch(LocationService.getLocation, function (location) {
        if (!location) {
            return;
        }
        DropFactory.query({ location: [location.lat, location.lng].join(',') }, function (drops) {
            _drops = drops;
        });
    });
    /**
     * Return currently loaded drops
     * @return {array} User location relevant drops
     */
    $scope.drops = function () {
        return _drops;
    };
    /**
     * Handle a new user drop
     */
    $scope.submitDrop = function () {
        var drop = new DropFactory({
            // @TODO User is required here
            text: $scope.user_drop,
            location: LocationService.getLocation(),
            created_at: new Date()
        });
        drop.$save(function () {
            // @TODO this should refresh automatically, without this
            var location = LocationService.getLocation();
            DropFactory.query({ location: [location.lat, location.lng].join(',') }, function (drops) {
                _drops = drops;
            });
        });
    };
}]);

/**
 * Controller: MapCtrl
 *
 * CRUD operations for MapCtrl objects
 *
 * Requirements:
 * - ngResource
 */
droplifter.controller('MapCtrl', ['$scope', 'LocationService',
function ($scope, LocationService) {
    L.mapbox.accessToken = 'pk.eyJ1IjoiamltbXloaWxsaXMiLCJhIjoiNmZmcXBCSSJ9.41XdttwBXWuEhA_9p-WMdg';
    var map = L.mapbox.map('map', 'jimmyhillis.jcgp71mn').setView([-31.946555, 115.849436], 10);
    // Move on change
    LocationService.setLocation(-31.946555, 115.849436);
    $scope.$watch(LocationService.getLocation, function (location) {
        if (location) {
            map.panTo(location);
        }
    });
    // Update location on click
    map.on('click', function (e) {
        $scope.$apply(function () {
            LocationService.setLocation(e.latlng.lat, e.latlng.lng);
        });
    });
}]);
