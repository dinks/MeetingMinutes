'use strict';

var React = require('react');
var DefaultLayout = require('../layouts/default.jsx');
var Link = require('../modules/link.jsx');

var meetingsActions = require('../../actions/meetings');

// New Meeting
// Shows a meeting
var NewComponent = React.createClass({

  render: function() {
    return (
      /* jshint ignore:start */
      <DefaultLayout>
        <div className="row">
          <div className="large-8 large-offset-2 small-12 columns">
            <fieldset>
              <legend>
                <h2>Create a Meeting</h2>
              </legend>
              <form method="post" action="/api/meetings" onSubmit={this.handleSubmit}>
                <p>
                  <label htmlFor="title">Title: <small>required</small></label>
                  <input type="text" required name="title" id="title" placeholder="Title of the Meeting" autofocus="autofocus" />
                </p>

                <p>
                  <label htmlFor="agenda">Agenda: <small>required</small></label>
                  <textarea name="agenda" required id="agenda" placeholder="Agenda of the Meeting" autofocus="autofocus"></textarea>
                </p>

                <div className="row">
                  <div className="large-12 columns text-right">
                    <ul className="button-group radius">
                      <li>
                        <button className="button tiny" role="button" aria-label="create meeting">
                          <i className="fa fa-plus fa-lg"></i>
                          Create
                        </button>
                      </li>
                      <li>
                        <Link url="/meetings" className="button tiny secondary" role="button" aria-label="cancel creation of meeting">
                          <i className="fa fa-times fa-lg"></i>
                          Cancel
                        </Link>
                      </li>
                    </ul>
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

  handleSubmit: function(e) {
    e.preventDefault();
    var form = e.currentTarget;
    meetingsActions.createMeeting(form);
  }

});

module.exports = NewComponent;
