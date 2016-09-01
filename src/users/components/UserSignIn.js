import { connect } from 'react-redux';
import React, { PropTypes } from 'react';
import SignInForm from './SignInForm';
import * as actions from '../actions';


const UserSignIn = ({ signInUser, errorMessage }) =>
  <div className="centered">
    <div className="segment user-sign-in">
      <SignInForm onSubmit={signInUser} errorMessage={errorMessage} />
    </div>
  </div>;

UserSignIn.propTypes = {
  signInUser: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
};

const mapStateToProps = (state) => ({
  errorMessage: state.users.errorMessage,
});

export default connect(mapStateToProps, actions)(UserSignIn);
