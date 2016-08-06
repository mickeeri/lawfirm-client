import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import { EMAIL_REQ_MESSAGE, PASSWORD_REQ_MESSAGE, EMAIL_INVALID_MESSAGE } from '../../shared';

const validate = values => {
  const errors = {};

  if (!values.email) {
    errors.email = EMAIL_REQ_MESSAGE;
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = EMAIL_INVALID_MESSAGE;
  }

  if (!values.password) {
    errors.password = PASSWORD_REQ_MESSAGE;
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
  const { handleSubmit, submitting, errorMessage } = props;
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
  submitting: PropTypes.bool,
  errorMessage: PropTypes.string,
};

export default reduxForm({
  form: 'signInForm',
  validate,
})(SignInForm);
