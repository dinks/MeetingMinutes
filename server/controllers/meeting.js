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

/*
 * POST /meetings
 * Create a meeting
 */
var createMeeting = function(req, res, next) {
  req.assert('title', 'Meeting Title is required.').notEmpty();
  req.assert('agenda', 'Meeting Agenda is required.').notEmpty();

  var errors = req.validationErrors();

  if (errors) {
    return res.status(400).json({
      errors: errors
    });
  }

  var meeting = new Meeting({
    title: req.body.title,
    agenda: req.body.agenda,
    creator: req.user._id
  });

  meeting.save(function(err) {
    if (err) {
      return next(err);
    }
    res.status(200).json({
      meeting: meeting,
      success: [{
        msg: 'Meeting created successfully. Now add segments!'
      }]
    });
  });
};

var genericHandler = function(req, res) {
  // Render index.html to allow application to handle routing
  res.sendFile(path.join(settings.staticAssets, '/index.html'), { root: settings.root });
};

module.exports = {
  genericHandler: genericHandler,
  index: listAllMeetings,
  create: createMeeting
}
