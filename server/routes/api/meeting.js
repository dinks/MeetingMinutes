/**
 * Meeting API Routes
 */

'use strict';

var meetingController = require('../../controllers/meeting');

var routes = function(app) {
  app.get('/meetings', meetingController.index);

  return app;
};

module.exports = routes;

