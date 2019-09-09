import React from 'react';
import PropTypes from 'prop-types';
import { v4 } from 'uuid';
import { Redirect } from 'react-router-dom';

class NewTicketForm extends React.Component {
  constructor(props){
    super(props);
    this._names = null;
    this._location = null;
    this._issue = null;
    this.state = {
      redirectToHome: false
    };
    this.handleNewTicketFormSubmission = this.handleNewTicketFormSubmission.bind(this);
  }

  handleNewTicketFormSubmission(event) {
    event.preventDefault();
    this.props.onNewTicketCreation({names: this._names.value, location: this._location.value, issue: this._issue.value, id: v4()});
    this._names.value = '';
    this._location.value = '';
    this._issue.value = '';
    this.setState({redirectToHome: true});
  }

  render() {
    if (this.state.redirectToHome) {
      return <Redirect to='/' />;
    }
    return (
      <div>
        <form onSubmit={this.handleNewTicketFormSubmission}>
          <input
            type='text'
            id='names'
            placeholder='Pair Names'
            ref={(input) => {this._names = input;}}/>
          <input
            type='text'
            id='location'
            placeholder='Location'
            ref={(input) => {this._location = input;}}/>
          <textarea
            id='issue'
            placeholder='Describe your issue.'
            ref={(textarea) => {this._issue = textarea;}}/>
          <button type='submit'>Help!</button>
        </form>
      </div>
    );
  }
}

NewTicketForm.propTypes = {
  onNewTicketCreation: PropTypes.func
};

export default NewTicketForm;
