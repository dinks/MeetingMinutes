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
        <div className="large-9 medium-8 small-12 columns">
          <h2>{meeting.title}</h2>
          <p>
            {meeting.agenda}
          </p>
        </div>
        <div className="large-3 medium-4 small-12 columns large-centered text-right">
          <form id="meeting-delete-form" action="/meetings" method="post" onSubmit={this.handleDestroy}>
            <ul className="button-group radius even-2">
              <li>
                <Link url={meetingUrl} className="button tiny success">View</Link>
              </li>
              <li>
                <input type="hidden" name="_method" value="DELETE" />
                <input type="hidden" name="_id" value={meeting._id} />
                <button className="button tiny secondary">Delete</button>
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
