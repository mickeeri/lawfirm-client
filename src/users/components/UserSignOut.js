import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class SignOut extends Component {
  componentWillMount() {
    this.props.signOutUser();
  }

  render() {
    return (
      <div className="ui segment">
        <h3>Du är nu utloggad</h3>
        <p>Kom tillbaka snart.</p>
      </div>
    )
  }
}

SignOut.propTypes = {
  signInUser: PropTypes.func.isRequired,
};

export default connect(null, actions)(SignOut);
