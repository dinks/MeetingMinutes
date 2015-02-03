'use strict';

var React = require('react');

// Bubbler Component
// Shows a loading indicator

var BubblerComponent = React.createClass({

  render: function() {
    return (
      /* jshint ignore:start */
      <div className="bubbler">
        <span id="bubbler_1">
        </span>
        <span id="bubbler_2">
        </span>
        <span id="bubbler_3">
        </span>
      </div>
      /* jshint ignore:end */
    );
  }

});

module.exports = BubblerComponent;
