import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';
import '../../styles/form.css';

class Signin extends Component {
  handleFormSubmit({ email, password }) {
    this.props.signinUser({ email, password });
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Ooops!</strong> {this.props.errorMessage}
        </div>
      );
    }

    return false;
  }

  render() {
    const { handleSubmit, fields: { email, password } } = this.props;
    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))} noValidate>
        <fieldset className="form-group">
          <label htmlFor="email">Email:</label>
          <input name="email" type="email" className="form-control" {...email} />
          {email.touched && email.error && <div className="error">{email.error}</div>}
        </fieldset>

        <fieldset className="form-group">
          <label htmlFor="password">Password:</label>
          <input name="password" type="password" className="form-control" {...password} />
          {password.touched && password.error && <div className="error">{password.error}</div>}
        </fieldset>
        {this.renderAlert()}
        <button action="submit" className="btn btn-primary">Sign in</button>
      </form>
    );
  }
}

function validate(formProps) {
  const errors = {};

  if (!formProps.email) {
    errors.email = 'E-post måste anges';
  }

  if (!formProps.password) {
    errors.password = 'Lösenord måste anges';
  }

  return errors;
}

Signin.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  fields: PropTypes.object.isRequired,
  signinUser: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
};

const mapStateToProps = (state) => (
  { errorMessage: state.auth.error }
);

export default reduxForm({
  form: 'signin',
  fields: ['email', 'password'],
  validate,
}, mapStateToProps, actions)(Signin);
