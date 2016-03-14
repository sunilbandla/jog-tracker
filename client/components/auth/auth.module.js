'use strict';

angular.module('trackerApp.auth', [
  'trackerApp.constants',
  'trackerApp.util',
  'ngCookies',
  'ui.router'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
