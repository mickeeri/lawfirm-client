import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import { FIRST_NAME_REQ_MESSAGE,
         LAST_NAME_REQ_MESSAGE,
         EMAIL_INVALID_MESSAGE,
         PERSONAL_NUMBER_REQ_MESSAGE
       } from '../../shared';

const validate = values => {
  const errors = {};

  // Name validation
  if (!values.first_name) {
    errors.first_name = FIRST_NAME_REQ_MESSAGE;
  }
  if (!values.last_name) {
    errors.last_name = LAST_NAME_REQ_MESSAGE;
  }

  if (!values.personal_number) {
    errors.personal_number = PERSONAL_NUMBER_REQ_MESSAGE;
  }

  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = EMAIL_INVALID_MESSAGE;
  }

  return errors;
}

const renderField = (field) => {
  return (
    <div className={`field ${field.touched && field.error ? 'error' : ''} ${field.input.required ? 'required': ''}`}>
      <label>{field.input.placeholder}</label>
      <div className="ui input">
        <input {...field.input} />
      </div>
      {field.touched && field.error && <div className="error">{field.error}</div>}
    </div>
  );
};

const renderTextArea = (field) => {
  return (
    <div className={`field ${field.touched && field.error ? 'error' : ''} ${field.input.required ? 'required': ''}`}>
      <label>{field.input.placeholder}</label>
      <div className="ui input">
        <textarea {...field.input} />
      </div>
      {field.touched && field.error && <div className="error">{field.error}</div>}
    </div>
  )
}

const ClientForm = props => {
  const { handleSubmit, submitting, errorMessage, pristine, reset } = props;
  return (
    <form onSubmit={handleSubmit} className={`ui form ${errorMessage ? 'error' : ''}`} noValidate>
      <div className="two fields">
        <Field
          name="first_name"
          type="text"
          component={renderField}
          placeholder="Förnamn"
          required
        />
        <Field
          name="last_name"
          type="text"
          component={renderField}
          placeholder="Efternamn"
          required
        />
      </div>
      <Field
        name="personal_number"
        type="text"
        component={renderField}
        placeholder="Personnummer"
        required
      />
      <h4 className="ui dividing header">Kontakt</h4>
      <Field
        name="email"
        type="email"
        component={renderField}
        placeholder="E-post"
      />
      <div className="two fields">
        <Field
          name="mobile"
          type="phone"
          component={renderField}
          placeholder="Mobil"
        />
        <Field
          name="phone_number"
          type="phone"
          component={renderField}
          placeholder="Telefon"
        />
      </div>
      <h4 className="ui dividing header">Adress</h4>
      <Field
        name="co"
        type="text"
        component={renderField}
        placeholder="C/O"
      />
      <Field
        name="street"
        type="text"
        component={renderField}
        placeholder="Gatuadress"
      />
      <div className="fields">
        <div className="four wide field">
          <Field
            name="post_code"
            type="text"
            component={renderField}
            placeholder="Postnummer"
          />
        </div>
        <div className="twelve wide field">
          <Field
            name="city"
            type="text"
            component={renderField}
            placeholder="Ort"
          />
        </div>
      </div>
      <div className="ui section divider"></div>
      <Field
        name="note"
        type="textarea"
        component={renderTextArea}
        placeholder="Anteckning"
        rows={2}
      />
      <div className="ui divider"></div>
      {errorMessage && <div className="ui error message"><p>{errorMessage}</p></div>}
      <div>
        <button type="button" className="ui orange button" disabled={pristine || submitting} onClick={reset}>Återställ</button>
        <button type="submit" disabled={submitting} className="ui button primary">Lägg till klient</button>
      </div>
    </form>
  )
}

ClientForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool,
  reset: PropTypes.func,
  submitting: PropTypes.bool,
  errorMessage: PropTypes.string,
};

export default reduxForm({
  form: 'ClientForm',
  fields: [
    'email',
    'last_name',
    'first_name',
    'personal_number',
    'email',
    'mobile',
    'phone_number',
    'co',
    'street',
    'post_code',
    'city',
    'note',
  ],
  validate,
})(ClientForm);
