'use strict';

var _ = require('lodash');
var React = require('react');
var DefaultLayout = require('../layouts/default.jsx');
var Meeting = require('./meeting.jsx');
var MeetingToolbox = require('./toolbox.jsx');
var Bubbler = require('../modules/bubbler.jsx');
var meetingsStore = require('../../stores/meetings');
var meetingsActions = require('../../actions/meetings');

var getState = function() {
  return {
    meetings: meetingsStore.get()
  };
};

var IndexComponent = React.createClass({
  mixins: [meetingsStore.mixin],
  getInitialState: function() {
    return getState();
  },
  componentDidMount: function() {
    meetingsActions.getMeetings();
  },
  render: function() {
    var meetings = this.state.meetings;

    if (meetings === null) {
      return (
        /* jshint ignore:start */
        <DefaultLayout>
          <div className="row">
            <div className="large-10 large-offset-1 column text-center">
              <Bubbler />
            </div>
          </div>
        </DefaultLayout>
        /* jshint ignore:end */
      );
    } else {
      if (meetings.length === 0) {
        return (
          /* jshint ignore:start */
          <DefaultLayout>
            <div className="row">
              <div className="large-10 large-offset-1 column text-center">
                <h2>Start by creating a meeting!</h2>
              </div>
              <MeetingToolbox />
            </div>
          </DefaultLayout>
          /* jshint ignore:end */
        );
      } else {
        return (
           /* jshint ignore:start */
          <DefaultLayout>
            <div className="row">
              <MeetingToolbox />
              <div className="large-10 large-offset-1 column text-center">
                {_.map(meetings, function(meeting) { '<Meeting meeting=meeting />'})}
              </div>
              <MeetingToolbox />
            </div>
          </DefaultLayout>
          /* jshint ignore:end */
        );
      }
    }
  },
  // Event handler for 'change' events coming from store mixins.
  _onChange: function() {
    this.setState(getState());
  }
});

module.exports = IndexComponent;
