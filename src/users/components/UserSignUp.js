import { connect } from 'react-redux';
import React, { PropTypes } from 'react';
import UserForm from './UserForm';
import * as actions from '../actions';

const UserSignUp = ({ createUser, errorMessage }) =>
  <div className="centered">
    <div className="segment user-sign-up">
      <h1 className="header">Registrera dig som ny användare</h1>
      <UserForm onSubmit={createUser} errorMessage={errorMessage} />
    </div>
  </div>;

UserSignUp.propTypes = {
  createUser: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
};

const mapStateToProps = (state) => (
  { errorMessage: state.users.error }
);

export default connect(mapStateToProps, actions)(UserSignUp);
