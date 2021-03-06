import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import Icon from 'react-fa';
import { connect } from 'react-redux';
import * as messages from '../../shared/messages';


const validate = values => {
  const errors = {};

  // Name validation
  if (!values.first_name) {
    errors.first_name = messages.FIRST_NAME_REQ_MESSAGE;
  }
  if (!values.last_name) {
    errors.last_name = messages.LAST_NAME_REQ_MESSAGE;
  }

  if (!values.personal_number) {
    errors.personal_number = messages.PERSONAL_NUMBER_REQ_MESSAGE;
  }

  if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = messages.EMAIL_INVALID_MESSAGE;
  }

  return errors;
};

const renderField = (field) =>
  // eslint-disable-next-line
  <div className={`field ${field.touched && field.error ? 'error' : ''} ${field.input.required ? 'required' : ''}` }>
    <label htmlFor={field.name}>{field.input.placeholder}</label>
    <div className="ui input">
      <input {...field.input} />
    </div>
    {field.touched && field.error && <div className="error">{field.error}</div>}
  </div>;

let ClientForm = props => {
  const {
    handleSubmit,
    submitting,
    errorMessage,
    pristine,
    reset,
    edit,
    toggleEdit,
  } = props;
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
      {errorMessage &&
        <div className="alert-error">
          <p><Icon name="exclamation-circle" />{errorMessage}</p>
        </div>}
      <div className="button-group">
        {edit &&
          <button
            className="ui button"
            onClick={(e) => {
              e.preventDefault();
              toggleEdit();
            }}
          >Avbryt</button>}
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
  toggleEdit: PropTypes.func,
};

ClientForm = reduxForm({
  form: 'ClientForm',
  validate,
})(ClientForm);

const mapStateToProps = (state) => {
  const client = state.clients.client;

  return ({
    initialValues: {
      id: client ? client.id : undefined,
      first_name: client ? client.first_name : '',
      last_name: client ? client.last_name : '',
      personal_number: client ? client.personal_number : '',
      email: client ? client.email : '',
      mobile: client ? client.mobile : '',
      phone_number: client ? client.phone_number : '',
      co: client ? client.co : '',
      street: client ? client.street : '',
      post_code: client ? client.post_code : '',
      city: client ? client.city : '',
    },
    errorMessage: state.clients.errorMessage,
    edit: state.clients.edit,
  });
};

export default connect(mapStateToProps, null)(ClientForm);
