'use strict';

var React = require('react');
var Link = require('./link.jsx');
var userStore = require('../../stores/user');
var userActions = require('../../actions/user');

var getState = function() {
  return {
    user: userStore.get()
  };
};

var NavbarComponent = React.createClass({
  mixins: [userStore.mixin],
  getInitialState: function() {
    return getState();
  },
  render: function() {
    var user = this.props.user;
    var navLinks = user.loggedIn ? (
      /* jshint ignore:start */
      <ul className="right">
        <li className="name salutation">
          Hello {user.firstName ? user.firstName : user.email}
        </li>
        <li>
          <Link url="/meetings" role="button" aria-label="show meetings">Meetings</Link>
        </li>
        <li>
          <Link url="/settings" role="button" aria-label="show settings">My Account</Link>
        </li>
        <li>
          <Link url="/logout" onClick={this.handleLogout} role="button" aria-label="log me out">Logout</Link>
        </li>
      </ul>
      /* jshint ignore:end */
    ) : (
      /* jshint ignore:start */
      <ul className="right">
        <li>
          <Link url="/login" role="button" aria-label="log in">Login</Link>
        </li>
        <li>
          <Link url="/signup" role="button" aria-label="create an account">Create Account</Link>
        </li>
      </ul>
      /* jshint ignore:end */
    );

    return (
      /* jshint ignore:start */
      <nav className="top-bar" data-topbar role="navigation">
        <ul className="title-area">
          <li className="name">
            <h1>
              <Link url="/" role="button" aria-label="go to home">Meeting Minutes</Link>
            </h1>
          </li>
          <li className="toggle-topbar menu-icon"><a><span></span></a></li>
        </ul>
        <section className="top-bar-section">
          {navLinks}
        </section>
      </nav>
      /* jshint ignore:end */
    );
  },
  handleLogout: function(e) {
    e.preventDefault();
    userActions.logout();
  },
  // Event handler for 'change' events coming from store mixins.
  _onChange: function() {
    this.setState(getState());
  }
});

module.exports = NavbarComponent;
