import React, { PropTypes } from 'react';
import SignInForm from './SignInForm';
import * as actions from '../actions';
import { connect } from 'react-redux';

const UserSignIn = props => {
  return (
    <div className="ui grid centered left aligned">
      <div className="ui fifteen wide mobile six wide computer column">
        <div className="ui raised segment">
          <SignInForm onSubmit={props.signInUser} errorMessage={props.errorMessage} />
        </div>
      </div>
    </div>
  );
};

UserSignIn.propTypes = {
  signInUser: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
};

const mapStateToProps = (state) => (
  { errorMessage: state.users.error }
);

export default connect(mapStateToProps, actions)(UserSignIn);
