/*
 * Meeting routes
 * All routes are handled in the front end
 */

 'use strict';

var meetingController = require('../controllers/meeting');
var auth = require('../auth');

var routes = function(app) {

  // Show Meetings
  app.get('/meetings', meetingController.genericHandler);

  // New Meeting
  app.get('/meetings/new', meetingController.genericHandler);

};

module.exports = routes;
