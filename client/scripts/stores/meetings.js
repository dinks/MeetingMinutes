'use strict';

var Store = require('./default');
var Dispatcher = require('../dispatchers/default');
var meetingsConstants = require('../constants/meetings');
var meetingsDefaults = require('../constants/defaults').meetings;

var _meetings;

var MeetingStore = new Store({

  // Gets meetings from Cache
  getFromCache: function() {
    return lscache.get(meetingsConstants.CACHE_KEY);
  },

  putToCache: function(meetings) {
    return lscache.set(meetingsConstants.CACHE_KEY, meetings, meetingsConstants.CACHE_EXPIRATION);
  },

  inCache: function() {
    return lscache.get(meetingsConstants.CACHE_KEY) !== null;
  },

  // Gets data associated with the Meetings
  get: function() {
    return this.getFromCache() || _meetings || meetingsDefaults;
  }

});

MeetingStore.dispatcherToken = Dispatcher.register(function(payload) {

  var action = payload.action;

  if (action.actionType === meetingsConstants.SET_MEETINGS) {
    _meetings = action.meetings;

    MeetingStore.emitChange();
  }

  if (action.actionType === meetingsConstants.SET_CACHE) {
    MeetingStore.putToCache(action.meetings);
  }

});

module.exports = MeetingStore;
