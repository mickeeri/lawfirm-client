import { connect } from 'react-redux';
import React, { PropTypes } from 'react';
import SignInForm from './SignInForm';
import * as actions from '../actions';


const UserSignIn = props =>
  <div className="centered">
    <div className="segment user-sign-in">
      <SignInForm onSubmit={props.signInUser} errorMessage={props.errorMessage} />
    </div>
  </div>;


UserSignIn.propTypes = {
  signInUser: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
};

const mapStateToProps = (state) => (
  { errorMessage: state.users.error }
);

export default connect(mapStateToProps, actions)(UserSignIn);
