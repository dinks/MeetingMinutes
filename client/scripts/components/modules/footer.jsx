'use strict';

var React = require('react');
var Link = require('./link.jsx');

// Footer Component
// Shows the footer
var FooterComponent = React.createClass({

  render: function() {
    return (
      /* jshint ignore:start */
      <footer>
        <div className="row">
          <div className="large-12 columns">
            <hr />
            <div className="row">
              <div className="large-6 medium-6 small-6 columns">
                <p>
                  <i className="fa fa-copyright"></i>
                  Copyright <a href="http://github.com/dinks" target="_blank">dinks</a>.</p>
              </div>
              <div className="large-6 medium-6 small-6 columns">
                <ul className="inline-list right">
                  <li><Link url="/" role="button" aria-label="Go to home">Home</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
      /* jshint ignore:end */
    );
  }

});

module.exports = FooterComponent;
