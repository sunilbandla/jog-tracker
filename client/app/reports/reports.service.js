'use strict';

(function() {

  function ReportsResource($resource) {
    return $resource('/api/v1/reports/');
  }

  angular.module('trackerApp')
    .factory('Reports', ReportsResource);

})();
