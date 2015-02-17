'use strict';

var React = require('react');

// New Segment Component
// Used to create a new segment
var NewSegmentComponent = React.createClass({

  render: function() {
    return (
      /* jshint ignore:start */
      <div className="large-12 columns">
        <div className="row">
          <fieldset>
            <legend>
              <h2>Create a Segment</h2>
            </legend>
          </fieldset>
        </div>
      </div>
      /* jshint ignore:end */
    );
  }

});

module.exports = NewSegmentComponent;
