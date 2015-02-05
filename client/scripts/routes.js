'use strict';

var React = require('react');
var routeActions = require('./actions/routes');
var messagesActions = require('./actions/messages');
var userStore = require('./stores/user');
var IndexPage = React.createFactory(require('./components/index.jsx'));
var LoginPage = React.createFactory(require('./components/account/login.jsx'));
var SignupPage = React.createFactory(require('./components/account/signup.jsx'));
var ResetPage = React.createFactory(require('./components/account/reset.jsx'));
var ForgotPage = React.createFactory(require('./components/account/forgot.jsx'));
var SettingsPage = React.createFactory(require('./components/account/settings.jsx'));

// Meetings
var MeetingsIndexPage = React.createFactory(require('./components/meetings/index.jsx'));
var MeetingsNewPage = React.createFactory(require('./components/meetings/new.jsx'));
var MeetingsShowPage = React.createFactory(require('./components/meetings/show.jsx'));

var render = function(Page, options) {
  React.render(new Page(options), document.getElementById('app-wrapper'));
};

var index = function() {
  render(IndexPage);
};

var login = function() {
  // If user is logged in, redirect to settings page
  if (userStore.get().loggedIn) {
    return routeActions.setRoute('/settings');
  }

  render(LoginPage);
};

var signup = function() {
  // If user is logged in, redirect to settings page
  if (userStore.get().loggedIn) {
    return routeActions.setRoute('/settings');
  }

  render(SignupPage);
};

var reset = function() {
  // If user is logged in, redirect to settings page
  if (userStore.get().loggedIn) {
    return routeActions.setRoute('/settings');
  }

  render(ResetPage);
};

var forgot = function() {
  // If user is logged in, redirect to settings page
  if (userStore.get().loggedIn) {
    return routeActions.setRoute('/settings');
  }
  // If reset token is invalid or has expired, display error message
  if (window.location.search === '?error=invalid') {
    messagesActions.setMessages({
      errors: [{
        msg: 'Reset is invalid or has expired.'
      }]
    });
  }

  render(ForgotPage);
};

var settings = function() {
  // If user is not logged in, redirect to login page
  if (!userStore.get().loggedIn) {
    return routeActions.setRoute('/login');
  }

  render(SettingsPage);
};


var meetings = function(action) {
  return function (meetingId) {
    // If user is not logged in, redirect to login page
    if (!userStore.get().loggedIn) {
      return routeActions.setRoute('/login');
    }
    switch (action) {
      case 'index':
        render(MeetingsIndexPage);
        break;
      case 'new':
        render(MeetingsNewPage);
        break;
      case 'show':
        render(MeetingsShowPage, {
          meetingId: meetingId
        });
        break;
    }
  };
};

var routes = {
  '/login': login,
  '/forgot': forgot,
  '/reset/:token': reset,
  '/signup': signup,
  '/settings': settings,
  '/meetings': meetings('index'),
  '/meetings/new': meetings('new'),
  '/meetings/:id': meetings('show'),
  '/': index
};

module.exports = routes;
