'use strict';

var app = require('../..');
import request from 'supertest';

var newActivities;

describe('Activities API:', function() {

  // TODO add authentication
  describe('GET /api/v1/activities', function() {
    var activitiess;

    beforeEach(function(done) {
      request(app)
        .get('/api/v1/activities')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          activitiess = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      activitiess.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/v1/activities', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/v1/activities')
        .send({
          name: 'New Activities',
          info: 'This is the brand new activities!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newActivities = res.body;
          done();
        });
    });

    it('should respond with the newly created activities', function() {
      newActivities.name.should.equal('New Activities');
      newActivities.info.should.equal('This is the brand new activities!!!');
    });

  });

  describe('GET /api/v1/activities/:id', function() {
    var activities;

    beforeEach(function(done) {
      request(app)
        .get('/api/v1/activities/' + newActivities._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          activities = res.body;
          done();
        });
    });

    afterEach(function() {
      activities = {};
    });

    it('should respond with the requested activities', function() {
      activities.name.should.equal('New Activities');
      activities.info.should.equal('This is the brand new activities!!!');
    });

  });

  describe('PUT /api/v1/activities/:id', function() {
    var updatedActivities;

    beforeEach(function(done) {
      request(app)
        .put('/api/v1/activities/' + newActivities._id)
        .send({
          name: 'Updated Activities',
          info: 'This is the updated activities!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedActivities = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedActivities = {};
    });

    it('should respond with the updated activities', function() {
      updatedActivities.name.should.equal('Updated Activities');
      updatedActivities.info.should.equal('This is the updated activities!!!');
    });

  });

  describe('DELETE /api/v1/activities/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/v1/activities/' + newActivities._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when activities does not exist', function(done) {
      request(app)
        .delete('/api/v1/activities/' + newActivities._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
