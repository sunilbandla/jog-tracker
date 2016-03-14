/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/v1/activities              ->  index
 * POST    /api/v1/activities              ->  create
 * GET     /api/v1/activities/:id          ->  show
 * PUT     /api/v1/activities/:id          ->  update
 * DELETE  /api/v1/activities/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import * as auth from '../../auth/auth.service';
var Activities = require('./activities.model');

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

function responseWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function handleEntityNotFound(req, res) {
  return function(entity) {
    // jshint eqeqeq:false
    if (!entity) {
      res.status(404).end();
      return null;
    } else if (!auth.isAdmin(req) &&
      entity.userId != req.user._id) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates);
    return updated.saveAsync()
      .spread(updated => {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.removeAsync()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function addUserFilter(req, filter) {
  if (!auth.isAdmin(req)) {
    filter.userId = req.user._id;
  }
  return filter;
}

function getSearchFilter(req) {
  var from = req.query.from;
  var to = req.query.to;
  var filter = {},
    activityDate = {};
  if (from) {
    activityDate.$gte = new Date(from);
  }
  if (to) {
    activityDate.$lte = new Date(to);
  }
  if (Object.keys(activityDate).length > 0) {
    filter.activityDate = activityDate;
  }
  filter = addUserFilter(req, filter);
  return filter;
}

function buildActivity(req) {
  var activity = req.body;
  activity.userId = req.user._id;
  return activity;
}

// Gets a list of Activities
export function index(req, res) {
  Activities.findAsync(getSearchFilter(req))
    .then(responseWithResult(res))
    .catch(handleError(res));
}

// Gets a single Activities from the DB
export function show(req, res) {
  Activities.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(req, res))
    .then(responseWithResult(res))
    .catch(handleError(res));
}

// Creates a new Activities in the DB
export function create(req, res) {
  Activities.createAsync(buildActivity(req))
    .then(responseWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Activities in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Activities.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(req, res))
    .then(saveUpdates(req.body))
    .then(responseWithResult(res))
    .catch(handleError(res));
}

// Deletes a Activities from the DB
export function destroy(req, res) {
  Activities.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(req, res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
