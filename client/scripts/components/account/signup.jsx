'use strict';

var React = require('react');
var DefaultLayout = require('../layouts/default.jsx');
var userActions = require('../../actions/user');

var SignupComponent = React.createClass({
  render: function() {
    return (
      /* jshint ignore:start */
      <DefaultLayout>
        <div className="row">
          <div className="large-8 large-offset-2 small-12 columns">
            <fieldset>
              <legend>
                <h2>Sign up</h2>
              </legend>
              <form id="signup-form" method="post" action="/user" onSubmit={this.handleSubmit}>
                <p>
                  <label htmlFor="email">Email:</label>
                  <input type="text" name="email" id="email" placeholder="Email" />
                </p>

                <p>
                  <label htmlFor="password">Password:</label>
                  <input type="password" name="password" id="password" placeholder="Password" />
                </p>

                <p>
                  <label htmlFor="confirmPassword">Confirm Password:</label>
                  <input type="password" name="confirmPassword" id="confirmPassword" placeholder="Confirm Password" />
                </p>

                <button role="button" aria-label="Signup" className="button tiny radius">
                  <i className="fa fa-user-plus"></i>
                  Signup
                </button>
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
    userActions.signup(form);
  }
});

module.exports = SignupComponent;
