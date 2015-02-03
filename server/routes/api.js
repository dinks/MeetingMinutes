/**
 * Api Routes
 */

'use strict';

var auth = require('../auth');
var meetingRoutes = require('./api/meeting');

var routes = function(app, express) {
  app.all('/api/*', auth.isAuthenticated);
  app.use('/api', meetingRoutes(express()));
};

module.exports = routes;
