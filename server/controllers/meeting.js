/**
 * Meeting Controller
 */

'use strict';

var path = require('path');
var settings = require('../config/env/default');
var Meeting = require('mongoose').model('meeting');
var auth = require('../auth');

/*
 * GET /meetings
 * List all the meetings
 */
var listAllMeetings = function(req, res, next) {
  Meeting
  .find({
    creator: req.user._id
  })
  .exec(function(err, meetings) {
    if (err) {
      return next(err);
    }
    res.status(200).json({
      meetings: meetings
    });
  });
};

var genericHandler = function(req, res) {
  // Render index.html to allow application to handle routing
  res.sendFile(path.join(settings.staticAssets, '/index.html'), { root: settings.root });
};

module.exports = {
  genericHandler: genericHandler,
  index: listAllMeetings
}
