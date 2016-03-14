'use strict';

describe('Controller: ActivitiesController', function () {

  // load the controller's module
  beforeEach(module('trackerApp'));

  var ActivitiesController, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ActivitiesController = $controller('ActivitiesController', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
