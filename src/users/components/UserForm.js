import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import * as messages from '../../shared/messages';
import ErrorAlertBox from '../../shared/components/ErrorAlertBox';

const validate = values => {
  const errors = {};

  // Firm validation
  if (!values.firm) {
    errors.first_name = messages.EMAIL_REQ_MESSAGE;
  }

  // Name validation
  if (!values.first_name) {
    errors.first_name = messages.FIRST_NAME_REQ_MESSAGE;
  }

  if (!values.last_name) {
    errors.last_name = messages.LAST_NAME_REQ_MESSAGE;
  }

  // Email validation
  if (!values.email) {
    errors.email = messages.EMAIL_REQ_MESSAGE;
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = messages.EMAIL_INVALID_MESSAGE;
  }

  // Password validation
  if (!values.password) {
    errors.password = messages.PASSWORD_REQ_MESSAGE;
  }

  if (!values.password_confirmation) {
    errors.password_confirmation = messages.PASSWORD_CONFIRMATION_REQ_MESSAGE;
  }

  if (values.password !== values.password_confirmation) {
    errors.password_confirmation = messages.PASSWORD_MISMATCH_MESSAGE;
  }

  return errors;
};

const renderField = field =>
  <div className={field.touched && field.error ? 'field error' : 'field'}>
    <label htmlFor={field.name}>{field.input.placeholder}</label>
    <div className="ui left icon input">
      <i className={field.input.icon} />
      <input {...field.input} />
    </div>
    {field.touched && field.error && <div className="error-helper">{field.error}</div>}
  </div>;


const UserForm = props => {
  const { handleSubmit, submitting, errorMessage, pristine, reset } = props;
  return (
    <form
      onSubmit={handleSubmit}
      className={`UserForm ui form ${errorMessage ? 'error' : ''}`}
      noValidate
    >
      <Field
        name="firm"
        icon="building icon"
        type="text"
        component={renderField}
        placeholder="Firma"
      />

      <div className="two-fields">
        <Field
          name="first_name"
          icon="user icon"
          type="text"
          component={renderField}
          placeholder="Förnamn"
        />
        <Field
          name="last_name"
          icon="user icon"
          type="text"
          component={renderField}
          placeholder="Efternamn"
        />
      </div>

      <div className="ui divider" />

      <Field
        name="email"
        icon="mail outline icon"
        type="email"
        component={renderField}
        placeholder="E-post"
      />
      <div className="two-fields">
        <Field
          name="password"
          icon="lock icon"
          type="password"
          component={renderField}
          placeholder="Lösenord"
        />
        <Field
          name="password_confirmation"
          icon="lock icon"
          type="password"
          component={renderField}
          placeholder="Bekräfta lösenord"
        />
      </div>

      <div className="ui divider" />

      <ErrorAlertBox errorMessage={errorMessage} />

      <div className="button-group">
        <button
          type="button"
          className="ui orange button"
          disabled={pristine || submitting} onClick={reset}
        >Återställ</button>

        <button
          type="submit"
          disabled={submitting}
          className="ui button primary"
        >Registrera</button>
      </div>
    </form>
  );
};

UserForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool,
  reset: PropTypes.func,
  submitting: PropTypes.bool,
  errorMessage: PropTypes.string,
};


export default reduxForm({
  form: 'UserForm',
  validate,
})(UserForm);
