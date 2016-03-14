'use strict';

angular.module('trackerApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('reports', {
        url: '/reports',
        templateUrl: 'app/reports/reports.html',
        controller: 'ReportsController',
        controllerAs: 'reports',
        authenticate: 'user'
      });
  });
