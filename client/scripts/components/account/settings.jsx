'use strict';

var React = require('react');
var DefaultLayout = require('../layouts/default.jsx');
var userStore = require('../../stores/user');
var userActions = require('../../actions/user');

var getState = function() {
  return {
    user: userStore.get()
  };
};

var SettingsComponent = React.createClass({
  mixins: [userStore.mixin],
  getInitialState: function() {
    return getState();
  },
  render: function() {
    var user = this.state.user;

    return (
      /* jshint ignore:start */
      <DefaultLayout>
        <div className="row">
          <div className="large-8 large-offset-2 small-12 columns">
            <fieldset>
              <legend>
                <h2>Profile Information</h2>
              </legend>
              <form id="profile-form" action="/user?_method=PUT" method="post" onSubmit={this.handleSettings}>
                <p>
                  <label htmlFor="email">Email:</label>
                  <input type="text" name="email" id="email" defaultValue={user.email} />
                </p>

                <p>
                  <label htmlFor="firstName">First Name:</label>
                  <input type="text" name="firstName" id="firstName" defaultValue={user.firstName} />
                </p>

                <p>
                  <label htmlFor="lastName">Last Name:</label>
                  <input type="text" name="lastName" id="lastName" defaultValue={user.lastName} />
                </p>
                <div className="row">
                  <div className="large-12 columns text-right">
                    <button className="button tiny radius" role="button" aria-label="update profile">
                      <i className="fa fa-pencil-square-o fa-lg"></i>
                      Update Profile
                    </button>
                  </div>
                </div>
              </form>
            </fieldset>
          </div>
        </div>

        <div className="row">
          <div className="large-8 large-offset-2 small-12 columns">
            <fieldset>
              <legend>
                <h2>Change Password</h2>
              </legend>
              <form id="password-form" action="/user/password?_method=PUT" method="post" onSubmit={this.handlePassword}>

                <p>
                  <label htmlFor="password">New Password:</label>
                  <input type="password" name="password" id="password" defaultValue='' />
                </p>

                <p>
                  <label htmlFor="confirmPassword">Confirm Password:</label>
                  <input type="password" name="confirmPassword" id="confirmPassword" defaultValue='' />
                </p>

                <div className="row">
                  <div className="large-12 columns text-right">
                    <button className="button tiny radius" role="button" aria-label="change password">
                      <i className="fa fa-user-secret fa-lg"></i>
                      Change Password
                    </button>
                  </div>
                </div>
              </form>
            </fieldset>
          </div>
        </div>

        <div className="row">
          <div className="large-8 large-offset-2 small-12 columns">
            <fieldset>
              <legend>
                <h2>Delete Account</h2>
              </legend>

              <div data-alert className="alert-box alert radius">
                You can delete your account, but keep in mind this action is irreversible.
              </div>

              <form id="delete-form" action="/user?_method=DELETE" method="post" onSubmit={this.handleDestroy}>
                <div className="row">
                  <div className="large-12 columns text-right">
                    <button className="button tiny radius" role="button" aria-label="delete my account">
                      <i className="fa fa-frown-o fa-lg"></i>
                      Delete my account
                    </button>
                  </div>
                </div>
              </form>
            </fieldset>
          </div>
        </div>
      </DefaultLayout>
      /* jshint ignore:end */
    );
  },
  handleSettings: function(e) {
    e.preventDefault();
    var form = e.currentTarget;
    userActions.updateSettings(form);
  },
  handlePassword: function(e) {
    e.preventDefault();
    var form = e.currentTarget;
    userActions.updatePassword(form);
  },
  handleDestroy: function(e) {
    e.preventDefault();
    var form = e.currentTarget;
    userActions.destroy(form);
  },
  // Event handler for 'change' events coming from store mixins.
  _onChange: function() {
    this.setState(getState());
  }
});

module.exports = SettingsComponent;
