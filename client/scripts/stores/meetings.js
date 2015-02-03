'use strict';

var Store = require('./default');
var Dispatcher = require('../dispatchers/default');
var meetingsConstants = require('../constants/meetings');
var meetingsDefaults = require('../constants/defaults').meetings;

var _meetings;

var MeetingStore = new Store({

  // Gets data associated with the Meetings
  get: function() {
    return _meetings || meetingsDefaults;
  }

});

MeetingStore.dispatcherToken = Dispatcher.register(function(payload) {

  var action = payload.action;

  if (action.actionType === meetingsConstants.SET_MEETINGS) {
    _meetings = action.meetings;

    MeetingStore.emitChange();
  }

});

module.exports = MeetingStore;
