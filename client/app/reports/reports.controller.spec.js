'use strict';

describe('Controller: ReportsController', function () {

  // load the controller's module
  beforeEach(module('trackerApp'));

  var ReportsController, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ReportsController = $controller('ReportsController', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
