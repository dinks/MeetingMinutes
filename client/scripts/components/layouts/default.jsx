'use strict';

var React = require('react');
var Navbar = require('../modules/navbar.jsx');
var Messages = require('../modules/messages.jsx');
var Footer = require('../modules/footer.jsx');
var pageStore = require('../../stores/page');
var userStore = require('../../stores/user');
var meetingsStore = require('../../stores/meetings');

var getState = function() {
  return {
    title: pageStore.get().title,
    user: userStore.get()
  };
};

var DefaultComponent = React.createClass({
  mixins: [pageStore.mixin, userStore.mixin, meetingsStore.mixin],
  componentDidMount: function() {
    pageStore.emitChange();
    userStore.emitChange();
    meetingsStore.emitChange();

    this.startFoundationEventHandling();
  },
  getInitialState: function() {
    return getState();
  },
  render: function() {
    return (
      /* jshint ignore:start */
      <div>
        <Navbar user={this.state.user} />
        <div className="default">
          <div className="main-container">
            <div className="messages">
              <Messages messages={this.state.messages} />
            </div>
            <div className="content">
              {this.props.children}
            </div>
          </div>
        </div>
        <Footer />
      </div>
      /* jshint ignore:end */
    );
  },
  // Event handler for 'change' events coming from store mixins.
  _onChange: function() {
    this.setState(getState());
  },
  startFoundationEventHandling: function() {
    $(document).foundation();
  }
});

module.exports = DefaultComponent;
