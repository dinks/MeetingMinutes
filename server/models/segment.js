'use strict';

var mongoose = require('mongoose');
var _ = require('lodash');
var S = require('string');

var segmentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  allocatedTime: {
    type: Number,
    required: true
  },
  takenTime: Number,
  state: {
    type: String,
    required: true,
    default: 'waiting'
  }
});

/**
 * Validation for the State
 * should only be one of waiting, started, paused or ended
 */
segmentSchema.path('state').validate(function(value) {
  return /^(waiting|started|paused|ended)$/i.test(value)
}, 'Invalid State');

/**
 * Instance methods for states
 * isWaiting, isStarted, isPaused and isEnded returns boolean according to the state
 */
_(['waiting', 'started', 'paused', 'ended']).forEach(function(meth) {
  var capitalizedMeth = S(meth).capitalize().s;

  segmentSchema.methods['is' + capitalizedMeth] = function() {
    return this.state.capitalize().s === capitalizedMeth;
  };
});

module.exports = segmentSchema;
