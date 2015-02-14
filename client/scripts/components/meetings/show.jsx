'use strict';

var React = require('react');
var DefaultLayout = require('../layouts/default.jsx');
var Bubbler = require('../modules/bubbler.jsx');
var Link = require('../modules/link.jsx');
var meetingsStore = require('../../stores/meetings');
var meetingActions = require('../../actions/meetings');

var getState = function(meetingId) {
  return {
    meeting: meetingsStore.get(meetingId)
  };
};

// Show a Meeting Component
// Shows a meeting
var ShowComponent = React.createClass({
  mixins: [meetingsStore.mixin],
  getInitialState: function() {
    return getState(this.props.meetingId);
  },
  componentDidMount: function() {
    if (!meetingsStore.inCache(this.props.meetingId)) {
      meetingActions.getMeeting(this.props.meetingId);
    }
  },
  render: function() {
    var meeting = this.state.meeting;

    if (meeting) {
      var meetingUrl = '/api/meetings/' + meeting._id + '?_method=DELETE';
      var segmentUrl = "";

      var stateButton;
      switch (meeting.state) {
        case 'waiting':
          stateButton = <button className="button tiny success radius" role="button" aria-label="start meeting" onClick={this.handleStartMeeting}>
                    <i className="fa fa-play fa-lg"></i>
                    Start Meeting
                  </button>;
          break;

        case 'started':
          stateButton = <button className="button tiny alert radius" role="button" aria-label="end meeting" onClick={this.handleEndMeeting}>
                    <i className="fa fa-stop fa-lg"></i>
                    End Meeting
                  </button>;
          break;

        case 'ended':
          stateButton = <button className="button tiny disabled radius" role="button" aria-label="ended meeting">
                    <i className="fa fa-check-thumbs-up fa-lg"></i>
                    Meeting Ended
                  </button>;
          break;
      }

      return (
        /* jshint ignore:start */
        <DefaultLayout>
          <div className="row">
            <div className="large-12 columns">
              <div className="row">
                <div className="large-6 medium-6 small-12 columns">
                  <h2>{meeting.title}</h2>
                </div>
                <div className="large-6 medium-6 small-12 columns text-right">
                  {stateButton}
                </div>
              </div>
            </div>
            <div className="large-12 columns">
              <p className="subheader">
                {meeting.agenda}
              </p>
              <hr />
            </div>
            <div className="large-12 columns text-right">
              <form id="meeting-form" action={meetingUrl} method="post" onSubmit={this.handleDestroyAction}>
                <ul className="button-group even-5 radius">
                  <li>
                    <button className="button tiny success" role="button" aria-label="create segment" onClick={this.handleCreateSegment}>
                      <i className="fa fa-tasks fa-lg"></i>
                      Create Segment
                    </button>
                  </li>
                  <li>
                    <button className="button tiny success" role="button" aria-label="save meeting" onClick={this.handleSaveMeeting}>
                      <i className="fa fa-pencil-square-o fa-lg"></i>
                      Save Meeting
                    </button>
                  </li>
                  <li>
                    <button className="button tiny secondary" role="button" aria-label="delete meeting">
                      <i className="fa fa-trash-o fa-lg"></i>
                      Delete Meeting
                    </button>
                  </li>
                </ul>
              </form>
            </div>
          </div>
        </DefaultLayout>
        /* jshint ignore:end */
      );
    } else {
      return (
        /* jshint ignore:start */
        <DefaultLayout>
          <div className="row">
            <div className="large-12 columns text-center">
              <Bubbler />
            </div>
          </div>
        </DefaultLayout>
        /* jshint ignore:end */
      );
    }
  },
  handleDestroyAction: function(e) {
    e.preventDefault();
    var form = e.currentTarget;
    meetingActions.deleteMeeting(form);
  },
  handleCreateSegment: function(e) {
    e.preventDefault();
  },
  handleStartMeeting: function() {
    // handle start meetind
  },
  handleEndMeeting: function() {
    // handle end meeting
  },
  // Event handler for 'change' events coming from store mixins.
  _onChange: function() {
    this.setState(getState(this.props.meetingId));
  }
});

module.exports = ShowComponent;
