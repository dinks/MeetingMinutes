'use strict';

var React = require('react');

// Meeting Component
// Shows a meeting
var MeetingComponent = React.createClass({

  render: function() {
    var meeting = this.props.meeting;

    return (
      /* jshint ignore:start */
      <div className="row">
        <div className="large-9 medium-8 small-12 columns">
          <h2>{meeting.title}</h2>
          <p>
            {meeting.agenda}
          </p>
        </div>
        <div className="large-3 medium-4 small-12 columns large-centered text-right">
          <ul className="button-group radius">
            <li><a href="#" className="button tiny success">View Details</a></li>
            <li><a href="#" className="button tiny secondary">Delete</a></li>
          </ul>
        </div>
      </div>
      /* jshint ignore:end */
    );
  }

});

module.exports = MeetingComponent;
