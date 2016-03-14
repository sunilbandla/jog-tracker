'use strict';

(function() {

  function ActivitiesResource($resource) {
    return $resource('/api/v1/activities/:id', {
      id: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }

  angular.module('trackerApp')
    .factory('Activities', ActivitiesResource);

})();
