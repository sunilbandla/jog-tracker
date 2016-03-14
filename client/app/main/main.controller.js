'use strict';

(function() {

class MainController {

  constructor($http) {
    this.$http = $http;
  }
}

angular.module('trackerApp')
  .controller('MainController', MainController);

})();
