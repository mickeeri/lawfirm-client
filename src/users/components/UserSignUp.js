import React, { PropTypes } from 'react';
import UserForm from './UserForm';
import * as actions from '../actions';
import { connect } from 'react-redux';


const UserSignUp = props => {
  return (
    <div className="ui segment">
      <h1 className="ui header">Registrera dig som ny användare</h1>
      <UserForm onSubmit={props.createUser} errorMessage={props.errorMessage} />
    </div>
  );
};

UserSignUp.propTypes = {
  createUser: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
};

const mapStateToProps = (state) => (
  { errorMessage: state.users.error }
);

export default connect(mapStateToProps, actions)(UserSignUp);
