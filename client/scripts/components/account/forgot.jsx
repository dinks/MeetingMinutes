'use strict';

var React = require('react');
var DefaultLayout = require('../layouts/default.jsx');
var userActions = require('../../actions/user');

var ForgotComponent = React.createClass({
  render: function() {
    return (
      /* jshint ignore:start */
      <DefaultLayout>
        <div className="row">
          <div className="large-8 large-offset-2 small-12 columns">
            <fieldset>
              <legend>
                <h2>Forgot Password</h2>
              </legend>
              <form method="post" action="/forgot" onSubmit={this.handleSubmit}>
                <p>Enter your email address below and we will send you password reset instructions.</p>

                <p>
                  <label htmlFor="email">Email:</label>
                  <input type="email" name="email" id="email" placeholder="Enter your email" autofocus="autofocus" />
                </p>

                <button>Reset Password</button>
              </form>
            </fieldset>
          </div>
        </div>
      </DefaultLayout>
      /* jshint ignore:end */
    );
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var form = e.currentTarget;
    userActions.forgot(form);
  }
});

module.exports = ForgotComponent;
