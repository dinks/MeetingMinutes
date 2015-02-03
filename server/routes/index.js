/**
 * User Routes
 */

'use strict';

var indexController = require('../controllers/index');
var path = require('path');
var fs = require('fs');

var routes = function(app, express) {

  // Dynamically load all routes
  fs.readdirSync(__dirname).forEach(function(file) {
    // Dont load this index.js file
    if (!/index/.test(file)) {
      var route = path.join(__dirname, file);
      if (path.extname(route) === '.js') {
        require(route)(app, express);
      }
    }
  });

  // Home
  app.get('/', indexController.index);

};

module.exports = routes;
