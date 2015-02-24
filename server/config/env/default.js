/**
 * Default Configuration for all environments
 */
'use strict';

var path = require('path');
var _ = require('lodash');
var env = process.env.NODE_ENV || 'development';
var envConfig = require('./' + env);

// All configurations will extend these options
var defaults = {
  server: {
    // Port to run server on
    port: process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 9010,
    // Host/URL to run server on
    host: process.env.MYHOSTNAME || '127.0.0.1',
    // Log level
    logLevel: 'dev',
    // Paths to ignore when redirecting back
    // to original location after logging in
    loginIgnorePaths: [
      'auth',
      'login',
      'logout',
      'signup',
      'favicon',
      'images',
      'scripts',
      'styles',
      'bower_components'
    ]
  },
  database: {
    // URL to connect to database
    url: process.env.DBURL || 'mongodb://mm_user:mm_user@localhost:27017/meeting_minutes_db',
    // Mongoose database options
    options: {
      server: {
        socketOptions: {
          // Keep connection alive while server is running
          keepAlive: 1
        }
      },
      // Attempt to reconnect if connection is lost
      auto_reconnect: true
    }
  },
  root: path.normalize(__dirname + '/../../..'),
  staticAssets: 'client',
  security: {
    // Arrays of URLs to whitelist from security policies
    whitelists: {
      csrfWhitelist: [],
      cspWhitelist: [],
      xframeWhitelist: [],
      p3pWhitelist: [],
      hstsWhitelist: [],
      xssProtectionWhitelist: []
    },
    // Lusca security configuration
    config: {
      csrf: true,
      csp: false,
      xframe: 'SAMEORIGIN',
      p3p: false,
      hsts: false,
      xssProtection: true
    }
  }
};

// Export the config object based on the NODE_ENV
module.exports = _.merge(defaults, envConfig);
