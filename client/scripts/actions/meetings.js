'use strict';

var Dispatcher = require('../dispatchers/default');
var meetingsConstants = require('../constants/meetings');
var meetingsDefaults = require('../constants/defaults').meetings;
var routeActions = require('./routes');
var messagesActions = require('./messages');

var assign = require('object-assign');
var request = require('superagent');
var cookie = require('cookie');
var serialize = require('form-serialize');

module.exports = {

  setMeetings: function(meetings) {
    Dispatcher.handleViewAction({
      actionType: meetingsConstants.SET_MEETINGS,
      meetings: assign([], meetingsDefaults, meetings)
    });

    Dispatcher.handleViewAction({
      actionType: meetingsConstants.SET_CACHE,
      meetings: meetings
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

  createMeeting: function(form, callback) {
    var cb = callback || function() {};
    cb.options = {
      successUrl: '/meetings',
      errorUrl: '/meetings/new'
    };
    this.postForm(form, cb);
  },

  getToken: function() {
    var cookies = cookie.parse(document.cookie);

    return cookies.token;
  },

  postForm: function(form, callback) {
    var self = this;
    var postData = serialize(form);
    var postUrl = form.getAttribute('action') || window.location.pathname;
    var token = self.getToken();
    var options = callback.options || {};

    request
      .post(postUrl)
      .type('form')
      .set({
        'authorization': 'Bearer ' + token,
        'X-Requested-With': 'XMLHttpRequest'
      })
      .send(postData)
      .end(function(res) {
        if (res.ok) {
          var meetingData;
          // If auth token needs to be stored
          if (options.setToken) {
            // Store token in cookie that expires in a week
            self.setToken(res.body.token, 7);
          }
          // If user needs to be updated
          if (options.updateUser) {
            meetingData = res.body.meeting;

            self.setUser(meetingData);
          }
          if (callback && callback.success) {
            callback.success(res);
          }
          if (options.successUrl) {
            routeActions.setRoute(options.successUrl);
          }
        }
        else {
          if (callback && callback.error) {
            callback.error(res);
          }
          if (options.errorUrl) {
            routeActions.setRoute(options.errorUrl);
          }
        }

        // Show global messages
        messagesActions.setMessages(res.body);
        if (callback && callback.complete) {
          callback.complete(res);
        }
      });
  }
};
