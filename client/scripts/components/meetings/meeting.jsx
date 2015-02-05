'use strict';

var React = require('react');

// Meeting Component
// Shows a meeting
var MeetingComponent = React.createClass({

  render: function() {
    var meeting = this.props.meeting;

    return (
      /* jshint ignore:start */
      <div>
        <h2>{meeting.title}</h2>
        <p>
          {meeting.agenda}
        </p>
      </div>
      /* jshint ignore:end */
    );
  }

});

module.exports = MeetingComponent;
