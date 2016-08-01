import React, { PropTypes } from 'react';
import SignInForm from './SignInForm';
import * as actions from '../../actions';
import { connect } from 'react-redux';

const SigninPage = (props) => (
  <div className="ui grid centered left aligned">
    <div className="ui column raised segment fifteen wide mobile six wide computer column">
      <SignInForm onSubmit={props.signInUser} errorMessage={props.errorMessage} />
    </div>
  </div>
);

SigninPage.propTypes = {
  signInUser: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
};

const mapStateToProps = (state) => (
  { errorMessage: state.auth.error }
);

export default connect(mapStateToProps, actions)(SigninPage);
