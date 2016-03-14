'use strict';

var app = require('../..');
import request from 'supertest';

describe('Reports API:', function() {

  describe('GET /api/v1/reports', function() {
    var reportss;

    beforeEach(function(done) {
      request(app)
        .get('/api/v1/reports')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          reportss = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      reportss.should.be.instanceOf(Array);
    });

  });

});
