'use strict';

var React = require('react');

// Toolbox Component
// Shows and handles actions for Meetings
var ToolboxComponent = React.createClass({

  render: function() {
    return (
      /* jshint ignore:start */
      <div className="large-10 large-offset-1 column text-right">
        <button className="button radius">Create new meeting</button>
      </div>
      /* jshint ignore:end */
    );
  },

  handleClick: function(e) {
    e.preventDefault();
  }

});

module.exports = ToolboxComponent;
