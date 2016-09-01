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
    <div className="input">
      <input {...field.input} />
    </div>
    {field.touched && field.error && <div className="error">{field.error}</div>}
  </div>;

const renderTextarea = (field) =>
  // eslint-disable-next-line
  <div className={`field ${field.touched && field.error ? 'error' : ''} ${field.input.required ? 'required' : ''}`}>
    <label htmlFor={field.name}>{field.input.placeholder}</label>
    <div className="input">
      <textarea cols="30" rows="10" {...field.input} />
    </div>
    {field.touched && field.error && <div className="error">{field.error}</div>}
  </div>;

let CounterpartForm = props => {
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
      className={`CounterpartForm ui form ${errorMessage ? 'error' : ''}`}
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
      <Field
        name="representative"
        type="text"
        component={renderField}
        placeholder="Motpartsombud"
      />
      <Field
        name="info"
        type="textarea"
        component={renderTextarea}
        placeholder="Kontaktinfo"
      />
      <div className="divider" />
      {/* {errorMessage &&
        <div className="alert-error">
          <p><Icon name="exclamation-circle" />{errorMessage}</p>
        </div>} */}
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
        >{ edit ? 'Spara ändringar' : 'Lägg till motpart' }</button>
      </div>
    </form>
  );
};

CounterpartForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool,
  reset: PropTypes.func,
  submitting: PropTypes.bool,
  errorMessage: PropTypes.string,
  edit: PropTypes.bool.isRequired,
  toggleEdit: PropTypes.func,
};

CounterpartForm = reduxForm({
  form: 'CounterpartForm',
  validate,
})(CounterpartForm);

const mapStateToProps = (state) => {
  const counterpart = state.counterparts.counterpart;

  return ({
    initialValues: {
      id: counterpart ? counterpart.id : undefined,
      first_name: counterpart ? counterpart.first_name : '',
      last_name: counterpart ? counterpart.last_name : '',
      representative: counterpart ? counterpart.representative : '',
      info: counterpart ? counterpart.info : '',
    },
    errorMessage: state.counterparts.errorMessage,
    edit: state.counterparts.edit,
  });
};

export default connect(mapStateToProps, null)(CounterpartForm);
