'use strict';

var React = require('react');
var Link = require('../modules/link.jsx');

// Toolbox Component
// Shows and handles actions for Meetings
var ToolboxComponent = React.createClass({

  render: function() {
    return (
      /* jshint ignore:start */
      <div className="large-10 large-offset-1 column text-right">
        <Link url="/meetings/new" className="button radius">Create new meeting</Link>
      </div>
      /* jshint ignore:end */
    );
  },

  handleClick: function(e) {
    e.preventDefault();
  }

});

module.exports = ToolboxComponent;
