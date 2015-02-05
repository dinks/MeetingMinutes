'use strict';

var React = require('react');
var Link = require('../modules/link.jsx');

// Meeting Component
// Shows a meeting
var MeetingComponent = React.createClass({

  render: function() {
    var meeting = this.props.meeting;

    var meetingUrl = "/meetings/" + meeting._id;

    return (
      /* jshint ignore:start */
      <div className="row">
        <div className="large-6 medium-6 small-12 columns">
          <h2>{meeting.title}</h2>
          <p className="subheader">
            {meeting.agenda}
          </p>
        </div>
        <div className="large-6 medium-6 small-12 columns text-right">
          <form id="meeting-form" action={meetingUrl} method="post" onSubmit={this.handleDestroy}>
            <ul className="button-group radius even-2">
              <li>
                <Link url={meetingUrl} className="button tiny success" role="button" aria-label="view meeting">
                  <i className="fa fa-eye fa-lg"></i>
                  View
                </Link>
              </li>
              <li>
                <input type="hidden" name="_method" value="DELETE" />
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

  handleDestroy: function(e) {
    e.preventDefault();
  }

});

module.exports = MeetingComponent;
