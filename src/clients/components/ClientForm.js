import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import {
  FIRST_NAME_REQ_MESSAGE,
  LAST_NAME_REQ_MESSAGE,
  EMAIL_INVALID_MESSAGE,
  PERSONAL_NUMBER_REQ_MESSAGE,
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

  if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = EMAIL_INVALID_MESSAGE;
  }

  return errors;
};

const renderField = (field) =>
  <div className={`field ${field.touched && field.error ? 'error' : ''} ${field.input.required ? 'required': ''}` }>
    <label htmlFor={field.name}>{field.input.placeholder}</label>
    <div className="ui input">
      <input {...field.input} />
    </div>
    {field.touched && field.error && <div className="error">{field.error}</div>}
  </div>;

let ClientForm = props => {
  const { handleSubmit, submitting, errorMessage, pristine, reset, edit, toggleEdit } = props;
  return (
    <form
      onSubmit={handleSubmit}
      className={`ClientForm ui form ${errorMessage ? 'error' : ''}`}
      noValidate
    >
      <div className="two-fields">
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
      <h4 className="dividing-header">Kontakt</h4>
      <Field
        name="email"
        type="email"
        component={renderField}
        placeholder="E-post"
      />
      <div className="two-fields">
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
      <h4 className="dividing-header">Adress</h4>
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
      <div className="address-fields">
        <Field
          name="post_code"
          type="text"
          component={renderField}
          placeholder="Postnummer"
        />
        <Field
          name="city"
          type="text"
          component={renderField}
          placeholder="Ort"
        />
      </div>
      <div className="divider" />
      {errorMessage && <div className="ui error message"><p>{errorMessage}</p></div>}
      <div className="button-group">
        {edit && <button className="ui button" onClick={(e) => {
          e.preventDefault();
          toggleEdit();
        }}>Avbryt</button>}
        <button
          type="button"
          className="ui orange button" disabled={pristine || submitting}
          onClick={reset}
        >Återställ formulär</button>
        <button
          type="submit"
          disabled={submitting}
          className="ui button primary"
        >{ edit ? 'Spara ändringar' : 'Lägg till klient' }</button>
      </div>
    </form>
  );
};

ClientForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool,
  reset: PropTypes.func,
  submitting: PropTypes.bool,
  errorMessage: PropTypes.string,
  edit: PropTypes.bool.isRequired,
  toggleEdit: PropTypes.func.isRequired,
};

ClientForm = reduxForm({
  form: 'ClientForm',
  validate,
})(ClientForm);

const mapStateToProps = (state) => (
  { initialValues: state.clients.client,
    edit: state.clients.edit }
);

export default connect(mapStateToProps, null)(ClientForm);
