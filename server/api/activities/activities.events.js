/**
 * Activities model events
 */

'use strict';

import {EventEmitter} from 'events';
var Activities = require('./activities.model');
var ActivitiesEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
ActivitiesEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Activities.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    ActivitiesEvents.emit(event + ':' + doc._id, doc);
    ActivitiesEvents.emit(event, doc);
  }
}

export default ActivitiesEvents;
