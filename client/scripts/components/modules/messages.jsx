/**
*   Messages Component Description
*/

'use strict';

var React = require('react');
var messagesStore = require('../../stores/messages');

var getState = function() {
  return {
    messages: messagesStore.get()
  };
};

var MessagesComponent = React.createClass({
  mixins: [messagesStore.mixin],
  getInitialState: function() {
    return getState();
  },
  render: function() {
    var messages = this.state.messages;

    var getMessages = function(options) {
      if (messages && messages[options.key]) {
        return messages[options.key].map(function(item, index) {
          return (
            /* jshint ignore:start */
            <div key={index} data-alert tab-index="0" aria-live="assertive" role="dialogalert" className={options.msgClass}>
              {item.msg}
              <a href="#" className="close">&times;</a>
            </div>
            /* jshint ignore:end */
          );
        });
      }
    };

    var errors = getMessages({
      key: 'errors',
      msgClass: 'alert-box alert large-12 medium-12 columns'
    });

    var info = getMessages({
      key: 'info',
      msgClass: 'alert-box info large-12 medium-12 columns'
    });

    var success = getMessages({
      key: 'success',
      msgClass: 'alert-box success large-12 medium-12 columns'
    });

    return (
      /* jshint ignore:start */
      <div className="messages">
        {errors}
        {info}
        {success}
      </div>
      /* jshint ignore:end */
    );
  },
  // Event handler for 'change' events coming from store mixins.
  _onChange: function() {
    this.setState(getState());
  }
});

module.exports = MessagesComponent;
