'use strict';

angular.module('trackerApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('activities', {
        url: '/activities',
        templateUrl: 'app/activities/activities.html',
        controller: 'ActivitiesController',
        controllerAs: 'activities',
        authenticate: 'user'
      });
  });
