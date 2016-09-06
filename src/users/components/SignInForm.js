import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import Icon from 'react-fa';
import * as messages from '../../shared/messages';
import ErrorAlertBox from '../../shared/components/ErrorAlertBox';
import { Button } from '../../shared';

const validate = values => {
  const errors = {};

  if (!values.email) {
    errors.email = messages.EMAIL_REQ_MESSAGE;
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = messages.EMAIL_INVALID_MESSAGE;
  }

  if (!values.password) {
    errors.password = messages.PASSWORD_REQ_MESSAGE;
  }

  return errors;
};

const renderField = field => (
  <div className={field.touched && field.error ? 'field error' : 'field'}>
    <label htmlFor={field.name}>{field.input.placeholder}</label>
    <div className="icon-input">
      <Icon name={field.input.icon} />
      <input {...field.input} />
    </div>
    {field.touched && field.error && <div className="error-helper">{field.error}</div>}
  </div>
);

const SignInForm = (props) => {
  const { handleSubmit, submitting, errorMessage } = props;
  return (
    <form onSubmit={handleSubmit} className={`ui form ${errorMessage ? 'error' : ''}`}>
      <Field
        name="email"
        icon="user"
        type="email"
        component={renderField}
        placeholder="E-post"
      />
      <Field
        name="password"
        icon="lock"
        type="password"
        component={renderField}
        placeholder="Lösenord"
      />
      <ErrorAlertBox errorMessage={errorMessage} />
      <div>
        <Button type="floating success">Logga in</Button>
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
