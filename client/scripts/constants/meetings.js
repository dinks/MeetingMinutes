'use strict';

var _ = require('lodash');
var keyMirror = require('keymirror');

var meetingsConstants = _.assign(
  keyMirror({

    // Global meeting types
    SET_MEETINGS: null,
    SET_CACHE: null,

  }), {
  // Cache settings
  CACHE_KEY: 'meetings',
  CACHE_EXPIRATION: 5 // in minutes
});

module.exports = meetingsConstants;
