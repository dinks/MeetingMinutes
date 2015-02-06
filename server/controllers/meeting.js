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
  .select('title agenda segments state')
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
    res.status(201).json({
      meeting: meeting,
      success: [{
        msg: 'Meeting created successfully. Now add segments!'
      }]
    });
  });
};

/*
 * GET /meetings/:id
 * Get details of a meeting
 */
var getMeeting = function(req, res, next) {
  Meeting
    .findOne({
      creator: req.user._id,
      _id: req.params.id
    })
    .select('title agenda segments state')
    .exec(function(err, meeting) {
      if (err) {
        return next(err);
      }
      if (!meeting) {
        res.status(400).json({
          errors: [{
            msg: 'Cannot find the meeting!'
          }]
        })
      }
      res.status(200).json({
        meeting: meeting
      });
    });
};

/*
 * DELETE /meetings/:id
 * Delete the meeting
 */
var deleteMeeting = function(req, res, next) {
  Meeting
    .remove({
      creator: req.user._id,
      _id: req.params.id
    }, function(err) {
      if (err) {
        return next(err);
      }
      res.status(200).json({
        info: [{
          msg: 'The meeting has been deleted.'
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
  create: createMeeting,
  show: getMeeting,
  delete: deleteMeeting
}
