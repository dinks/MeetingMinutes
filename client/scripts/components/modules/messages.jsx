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
            <div key={index} data-alert tabindex="0" aria-live="assertive" role="dialogalert" className={options.msgClass}>
              {item.msg}
              <a href="#" className="close">&times;</a>
            </div>
            /* jshint ignore:end */
          );
        });
      }
    };

    var errors = getMessages({key: 'errors', msgClass: 'alert-box alert radius large-12 column'});

    var info = getMessages({key: 'info', msgClass: 'alert-box info radius large-12 column'});

    var success = getMessages({key: 'success', msgClass: 'alert-box success radius large-12 column'});

    return (
      /* jshint ignore:start */
      <div className="row">
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
