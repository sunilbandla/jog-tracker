'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var activitiesCtrlStub = {
  index: 'activitiesCtrl.index',
  show: 'activitiesCtrl.show',
  create: 'activitiesCtrl.create',
  update: 'activitiesCtrl.update',
  destroy: 'activitiesCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
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
var activitiesIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './activities.controller': activitiesCtrlStub,
  '../../auth/auth.service': authServiceStub
});

describe('Activities API Router:', function() {

  it('should return an express router instance', function() {
    activitiesIndex.should.equal(routerStub);
  });

  describe('GET /api/v1/activities', function() {

    it('should route to activities.controller.index', function() {
      routerStub.get
        .withArgs('/', 'authService.isAuthenticated', 'activitiesCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/v1/activities/:id', function() {

    it('should route to activities.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'authService.isAuthenticated', 'activitiesCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/v1/activities', function() {

    it('should route to activities.controller.create', function() {
      routerStub.post
        .withArgs('/', 'authService.isAuthenticated', 'activitiesCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/v1/activities/:id', function() {

    it('should route to activities.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'authService.isAuthenticated', 'activitiesCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/v1/activities/:id', function() {

    it('should route to activities.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'authService.isAuthenticated', 'activitiesCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
