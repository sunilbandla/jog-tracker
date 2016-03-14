'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var ActivitiesSchema = new mongoose.Schema({
  activityDate: {
    type: Date,
    default: Date.now
  },
  distance: {
    type: Number,
    min: 0.1,
    required: true
  },
  duration: {
    type: Number,
    min: 0.1,
    required: true
  },
  userId: {
    type: String,
    required: true
  }
}, {
  versionKey: 'version'
});

export default mongoose.model('Activities', ActivitiesSchema);
