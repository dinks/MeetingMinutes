'use strict';

var React = require('react');
var DefaultLayout = require('../layouts/default.jsx');

var IndexComponent = React.createClass({
  render: function() {
    return (
      /* jshint ignore:start */
      <DefaultLayout>
        <div className="row">
          <div className="large-10 large-offset-1 column text-center">
            All Meetings!
          </div>
        </div>
      </DefaultLayout>
      /* jshint ignore:end */
    );
  }
});

module.exports = IndexComponent;
