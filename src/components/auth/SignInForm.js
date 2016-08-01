import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import { MESSAGES } from '../../constants';
import '../../styles/form.css';

const validate = values => {
  const errors = {};

  if (!values.email) {
    errors.email = MESSAGES.emailRequired;
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = MESSAGES.emailInvalid;
  }

  if (!values.password) {
    errors.password = MESSAGES.passwordRequired;
  }

  return errors;
};

const renderField = field => (
  <div className={field.touched && field.error ? 'field error' : 'field'}>
    <label>{field.input.placeholder}</label>
    <div className="ui left icon input">
      <i className={field.input.icon}></i>
      <input {...field.input} />
    </div>
    {field.touched && field.error && <div className="error">{field.error}</div>}
  </div>
);

const SignInForm = (props) => {
  const { handleSubmit, pristine, reset, submitting, errorMessage } = props;
  return (
    <form onSubmit={handleSubmit} className={`ui form ${errorMessage ? 'error' : ''}`}>
      <Field name="email" icon="user icon" type="email" component={renderField} placeholder="E-post" />
      <Field name="password" icon="lock icon" type="password" component={renderField} placeholder="Lösenord" />
      {errorMessage && <div className="ui error message"><p>{errorMessage}</p></div>}
      <div>
        <button type="submit" disabled={submitting} className="ui button primary">Logga in</button>
      </div>
    </form>
  );
};

SignInForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool,
  reset: PropTypes.func,
  submitting: PropTypes.bool,
  errorMessage: PropTypes.string,
};

export default reduxForm({
  form: 'signInForm',
  validate,
})(SignInForm);
