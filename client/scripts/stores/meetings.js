'use strict';

var Store = require('./default');
var Dispatcher = require('../dispatchers/default');
var meetingsConstants = require('../constants/meetings');
var meetingsDefaults = require('../constants/defaults').meetings;

var _meetings;

var MeetingStore = new Store({

  // Cache Methods Start
  getFromCache: function() {
    return this.cacher.get(meetingsConstants.CACHE_KEY);
  },

  putToCache: function(meetings) {
    return this.cacher.set(meetingsConstants.CACHE_KEY, meetings, meetingsConstants.CACHE_EXPIRATION);
  },

  inCache: function() {
    return this.cacher.get(meetingsConstants.CACHE_KEY) !== null;
  },

  purgeCache: function() {
    return this.cacher.remove(meetingsConstants.CACHE_KEY);
  },
  // Cache Ends

  // Gets data associated with the Meetings
  get: function() {
    return this.getFromCache() || _meetings || meetingsDefaults;
  }

});

MeetingStore.dispatcherToken = Dispatcher.register(function(payload) {

  var action = payload.action;

  if (action.actionType === meetingsConstants.SET_MEETINGS) {
    _meetings = action.meetings;
    MeetingStore.putToCache(action.meetings);
    MeetingStore.emitChange();
  }

});

module.exports = MeetingStore;
