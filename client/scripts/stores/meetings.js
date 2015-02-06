'use strict';

var _ = require('lodash');
var Store = require('./default');
var Dispatcher = require('../dispatchers/default');
var meetingsConstants = require('../constants/meetings');
var meetingsDefaults = require('../constants/defaults').meetings;

var _meetings;

var MeetingStore = new Store({

  // Cache Methods Start
  getFromCache: function(meetingId) {
    var meetings = this.cacher.get(meetingsConstants.CACHE_KEY);
    if (meetingId) {
      return _.find(_meetings, function(meeting) {
                return meeting._id === meetingId;
              });
    }
    return this.cacher.get(meetingsConstants.CACHE_KEY);
  },

  putToCache: function(meetings) {
    return this.cacher.set(meetingsConstants.CACHE_KEY, meetings, meetingsConstants.CACHE_EXPIRATION);
  },

  inCache: function(meetingId) {
    return !!this.getFromCache(meetingId);
  },

  purgeCache: function() {
    return this.cacher.remove(meetingsConstants.CACHE_KEY);
  },
  // Cache Ends

  // Gets data associated with the Meetings
  get: function(meetingId) {
    var cachedMeetings = this.getFromCache();
    var meetings = cachedMeetings || _meetings || meetingsDefaults;
    if (meetingId) {
      var searchableList = _.union(cachedMeetings, _meetings);

      return _.find(searchableList, {
        '_id': meetingId
      });
    } else {
      return meetings;
    }
  }

});

MeetingStore.dispatcherToken = Dispatcher.register(function(payload) {

  var action = payload.action;

  if (action.actionType === meetingsConstants.SET_MEETINGS) {
    _meetings = action.meetings;
    MeetingStore.putToCache(_meetings);
    MeetingStore.emitChange();
  }

  if (action.actionType === meetingsConstants.ADD_MEETING) {
    if (!_meetings) {
      _meetings = [];
    }

    var storedMeeting = MeetingStore.getFromCache(action.meeting._id);

    if (storedMeeting) {
      _.merge(storedMeeting, action.meeting);
    } else {
      _meetings.push(action.meeting);
    }

    // It only makes sense to update the cache in case something exists
    if (MeetingStore.getFromCache()) {
      MeetingStore.putToCache(_meetings);
    }
    MeetingStore.emitChange();
  }

  if (action.actionType === meetingsConstants.RESET_MEETINGS) {
    MeetingStore.purgeCache();
    // No emit change required!?
  }

});

module.exports = MeetingStore;
