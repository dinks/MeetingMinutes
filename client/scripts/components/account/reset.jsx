'use strict';

var React = require('react');
var DefaultLayout = require('../layouts/default.jsx');
var userActions = require('../../actions/user');

var ResetComponent = React.createClass({
  render: function() {
    return (
      /* jshint ignore:start */
      <DefaultLayout>
        <div className="row">
          <div className="large-8 large-offset-2 small-12 columns">
            <fieldset>
              <legend>
                <h2>Reset Password</h2>
              </legend>
              <form method="post" onSubmit={this.handleSubmit}>
                <p>
                  <label htmlFor="password">New Password</label>
                  <input type="password" name="password" defaultValue="" placeholder="New password" autofocus="autofocus" />
                </p>

                <p>
                  <label htmlFor="confirm">Confirm Password</label>
                  <input type="password" name="confirm" defaultValue="" placeholder="Confirm password" />
                </p>

                <button className="button tiny radius" role="button" aria-label="change password">
                  <i className="fa fa-plug fa-lg"></i>
                  Change Password
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
    userActions.reset(form);
  }
});

module.exports = ResetComponent;
