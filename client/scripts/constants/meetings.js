'use strict';

var _ = require('lodash');
var keyMirror = require('keymirror');

var meetingsConstants = _.assign(
  keyMirror({

    // Global meeting types
    SET_MEETINGS: null,

    ADD_MEETING: null,

    RESET_MEETINGS: null

  }), {
  // Cache settings
  CACHE_KEY: 'meetings',
  CACHE_EXPIRATION: 1 // in minutes
});

module.exports = meetingsConstants;
