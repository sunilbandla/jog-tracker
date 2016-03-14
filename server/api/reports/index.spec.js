'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var reportsCtrlStub = {
  index: 'reportsCtrl.index'
};

var routerStub = {
  get: sinon.spy()
};

var authServiceStub = {
  isAuthenticated() {
    return 'authService.isAuthenticated';
  },
  hasRole(role) {
    return 'authService.hasRole.' + role;
  }
};

// require the index with our stubbed out modules
var reportsIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './reports.controller': reportsCtrlStub,
  '../../auth/auth.service': authServiceStub
});

describe('Reports API Router:', function() {

  it('should return an express router instance', function() {
    reportsIndex.should.equal(routerStub);
  });

  describe('GET /api/v1/reports', function() {

    it('should route to reports.controller.index', function() {
      routerStub.get
        .withArgs('/', 'authService.isAuthenticated', 'reportsCtrl.index')
        .should.have.been.calledOnce;
    });

  });

});
