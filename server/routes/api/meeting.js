/**
 * Meeting API Routes
 */

'use strict';

var meetingController = require('../../controllers/meeting');

var routes = function(app) {
  // Get meetings
  app.get('/meetings', meetingController.index);

  // Create a meeting
  app.post('/meetings', meetingController.create);

  // Get a meeting
  app.get('/meetings/:id', meetingController.show);

  return app;
};

module.exports = routes;

