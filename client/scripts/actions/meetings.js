'use strict';

var Dispatcher = require('../dispatchers/default');
var meetingsConstants = require('../constants/meetings');
var meetingsDefaults = require('../constants/defaults').meetings;
var assign = require('object-assign');
var request = require('superagent');
var cookie = require('cookie');

module.exports = {

  setMeetings: function(meetings) {
    Dispatcher.handleViewAction({
      actionType: meetingsConstants.SET_MEETINGS,
      meetings: assign([], meetingsDefaults, meetings)
    });
  },

  getMeetings: function(callback) {
    var self = this;
    var token = self.getToken();
    request
      .get('/api/meetings')
      .type('json')
      .set({
        'authorization': 'Bearer ' + token,
      })
      .end(function(res) {
        if (res.ok) {
          if (res.body && res.body.meetings) {
            self.setMeetings(res.body.meetings);
          }
          if (callback && callback.success) {
            callback.success(res);
          }
        }
        else {
          if (callback && callback.error) {
            callback.error(res);
          }
        }

        if (callback && callback.complete) {
          callback.complete(res);
        }
      });
  },

  getToken: function() {
    var cookies = cookie.parse(document.cookie);

    return cookies.token;
  }

};
