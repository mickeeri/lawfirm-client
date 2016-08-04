import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import { createUser } from '../../actions';
import '../../styles/form.css';
import { MESSAGES } from '../../constants';

const validate = values => {
  const errors = {};

  // Firm validation
  if (!values.firm) {
    errors.first_name = MESSAGES.firmRequired;
  }

  // Name validation
  if (!values.first_name) {
    errors.first_name = MESSAGES.firstNameRequired;
  }

  if (!values.last_name) {
    errors.last_name = MESSAGES.lastNameRequired;
  }

  // Email validation
  if (!values.email) {
    errors.email = MESSAGES.emailRequired;
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = MESSAGES.emailInvalid;
  }

  // Password validation
  if (!values.password) {
    errors.password = MESSAGES.passwordRequired;
  }

  if (!values.password_confirmation) {
    errors.password_confirmation = MESSAGES.passwordConfirmationRequired;
  }

  if (values.password !== values.password_confirmation) {
    errors.password_confirmation = MESSAGES.passwordConfirmationMismatch;
  }

  return errors;
};

const renderField = field => {
  return (
    <div className={field.touched && field.error ? 'field error' : 'field'}>
      <label>{field.input.placeholder}</label>
      <div className="ui left icon input">
        <i className={field.input.icon}></i>
        <input {...field.input} />
      </div>
      {field.touched && field.error && <div className="error">{field.error}</div>}
    </div>
  );
};

const UserForm = props => {
  const { handleSubmit, submitting, errorMessage, pristine, reset } = props;
  return (
    <form onSubmit={handleSubmit} className={`ui form ${errorMessage ? 'error' : ''}`}>
      <Field
        name="firm"
        icon="user icon"
        type="text"
        component={renderField}
        placeholder="Firma"
      />
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
      <Field
        name="email"
        icon="user icon"
        type="email"
        component={renderField}
        placeholder="E-post"
      />
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
      {errorMessage && <div className="ui error message"><p>{errorMessage}</p></div>}
      <div>
        <button type="button" className="ui orange button" disabled={pristine || submitting} onClick={reset}>Återställ</button>
        <button type="submit" disabled={submitting} className="ui button primary">Registrera</button>
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
  form: 'PostsNew',
  fields: ['email', 'last_name', 'first_name', 'password', 'password_confirmation'],
  validate,
}, null, { createUser })(UserForm);

