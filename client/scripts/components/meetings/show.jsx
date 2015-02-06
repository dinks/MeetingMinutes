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

      return (
        /* jshint ignore:start */
        <DefaultLayout>
          <div className="row">
            <div className="large-12 columns">
              <h2>{meeting.title}</h2>
              <p className="subheader">
                {meeting.agenda}
              </p>
            </div>
            <div className="large-12 columns text-right">
              <form id="meeting-form" action={meetingUrl} method="post" onSubmit={this.handleDestroyAction}>
                <ul className="button-group radius">
                  <li>
                    <button value="create-segment" className="button tiny success" role="button" aria-label="create segment" onClick={this.handleCreateSegment}>
                      <i className="fa fa-tasks fa-lg"></i>
                      Create Segment
                    </button>
                  </li>
                  <li>
                    <button value="delete-meeting" className="button tiny secondary" role="button" aria-label="delete meeting">
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
  // Event handler for 'change' events coming from store mixins.
  _onChange: function() {
    this.setState(getState(this.props.meetingId));
  }
});

module.exports = ShowComponent;
