'use strict';

var mongoose = require('mongoose');
var _ = require('lodash');
var S = require('string');

var meetingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  agenda: {
    type: String,
    required: true
  },
  segments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Segment'
  }],
  state: {
    type: String,
    required: true,
    default: 'waiting'
  }
});

/**
 * Validation for the State
 * should only be one of waiting, started or ended
 */
meetingSchema.path('state').validate(function(value) {
  return /^(waiting|started|ended)$/i.test(value)
}, 'Invalid State');

/**
 * Instance methods for states
 * isWaiting, isStarted and isEnded returns boolean according to the state
 */
_(['waiting', 'started', 'ended']).forEach(function(meth) {
  var capitalizedMeth = S(meth).capitalize().s;

  meetingSchema.methods['is' + capitalizedMeth] = function() {
    return this.state.capitalize().s === capitalizedMeth;
  };
});

module.exports = meetingSchema;
