'use strict';

var React = require('react');
var DefaultLayout = require('../layouts/default.jsx');
var Bubbler = require('../modules/bubbler.jsx');
var meetingsStore = require('../../stores/meetings');
var meetingsActions = require('../../actions/meetings');

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
      meetingsActions.getMeeting(this.props.meetingId);
    }
  },
  render: function() {
    var meeting = this.state.meeting;
    if (meeting) {
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
  // Event handler for 'change' events coming from store mixins.
  _onChange: function() {
    this.setState(getState(this.props.meetingId));
  }
});

module.exports = ShowComponent;
