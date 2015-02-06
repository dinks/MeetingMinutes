/* global NProgress: true */
'use strict';

var React = require('react');
var Link = require('../modules/link.jsx');
var meetingActions = require('../../actions/meetings');

// Meeting Component
// Shows a meeting
var MeetingComponent = React.createClass({
  componentDidMount: function() {
    this.addProgress();
  },
  render: function() {
    var meeting = this.props.meeting;

    var meetingUrl = "/meetings/" + meeting._id,
        deleteMeetingUrl = '/api' + meetingUrl + '?_method=DELETE';

    return (
      /* jshint ignore:start */
      <div className="row meeting">
        <div className="large-12 medium-12 small-12 columns">
          <div className="row">
            <div className="large-6 medium-6 small-12 columns">
              <h2>{meeting.title}</h2>
            </div>
            <div className="large-6 medium-6 small-12 columns">
              <div className="progress">
                <span className={'meter state ' + meeting.state}>
                  {meeting.state}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="large-12 medium-12 small-12 columns">
          <p className="subheader">
            {meeting.agenda}
          </p>
        </div>
        <div className="large-12 medium-12 small-12 columns text-right">
          <form id="meeting-form" action={deleteMeetingUrl} method="post" onSubmit={this.handleDestroy}>
            <ul className="button-group radius">
              <li>
                <Link url={meetingUrl} className="button tiny success" role="button" aria-label="view meeting">
                  <i className="fa fa-eye fa-lg"></i>
                  View
                </Link>
              </li>
              <li>
                <button className="button tiny secondary" role="button" aria-label="delete meeting">
                  <i className="fa fa-trash-o fa-lg"></i>
                  Delete
                </button>
              </li>
            </ul>
          </form>
        </div>
      </div>
      /* jshint ignore:end */
    );
  },
  // Handle Destroy
  handleDestroy: function(e) {
    e.preventDefault();
    var form = e.currentTarget;
    meetingActions.deleteMeeting(form);
  },
  addProgress: function() {

  }
});

module.exports = MeetingComponent;
