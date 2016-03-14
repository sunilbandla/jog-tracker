/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/v1/reports              ->  index
 */

'use strict';

import _ from 'lodash';
import * as auth from '../../auth/auth.service';
var Activities = require('../activities/activities.model');

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

function addUserFilter(req, filter) {
  if (!auth.isAdmin(req)) {
    filter.userId = req.user._id;
  }
  return filter;
}

function responseWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      var result = entity;
      if (entity && entity.length > 0) {
        var temp = entity.reduce(function (prev, current) {
          prev.duration += current.duration;
          prev.distance += current.distance;
          return prev;
        }, {
          distance: 0,
          duration: 0
        });
        result = {
          totalDistance: temp.distance,
          averageSpeed: temp.distance / (temp.duration || 1)
        };
      }
      res.status(statusCode).json(result);
    }
  };
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

// Gets a list of Activities
export function index(req, res) {
  Activities.findAsync(getSearchFilter(req))
    .then(responseWithResult(res))
    .catch(handleError(res));
}
