import { closeDialog } from 'redux-dialog';
import { connect } from 'react-redux';
import Icon from 'react-fa';
import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import LawsuitTypesDropdown from './LawsuitTypesDropdown';

const validate = values => {
  const errors = {};

  return errors;
};

const renderField = (field) =>
  // eslint-disable-next-line
  <div className={`field ${field.touched && field.error ? 'error' : ''} ${field.input.required ? 'required': ''}`}>
    <label htmlFor={field.name}>{field.input.placeholder}</label>
    <div className="ui input">
      <input {...field.input} />
    </div>
    {field.touched && field.error && <div className="error">{field.error}</div>}
  </div>;


let LawsuitForm = props => {
  const { handleSubmit, submitting, errorMessage, pristine, reset } = props;
  return (
    <form onSubmit={handleSubmit} className={`ui form ${errorMessage ? 'error' : ''}`} noValidate>
      <div className="field">
        <LawsuitTypesDropdown />
      </div>

      <Field
        name="client_id"
        type="text"
        component="input"
        placeholder="Klient id"
        hidden
      />

      <Field
        name="court"
        type="text"
        component={renderField}
        placeholder="Domstol"
      />

      <Field
        name="case_number"
        type="text"
        component={renderField}
        placeholder="Målnummer"
      />

      <div className="ui divider" />

      {errorMessage && <div className="error-message">
        <Icon name="exclamation-circle" />{errorMessage}
      </div>}

      <button
        onClick={(e) => {
          e.preventDefault();
          props.dispatch(closeDialog('lawsuitFormDialog'));
        }}
        className="ui button"
      ><Icon name="times" />Stäng</button>

      <button
        className="ui orange button" disabled={pristine || submitting}
        onClick={reset}
      >Återställ</button>

      <button
        type="submit"
        disabled={submitting}
        className="ui button primary"
      ><Icon name="check" />Skapa ärende</button>
    </form>
  );
};

LawsuitForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool,
  reset: PropTypes.func,
  submitting: PropTypes.bool,
  errorMessage: PropTypes.string,
  dispatch: PropTypes.func,
};

LawsuitForm = reduxForm({
  form: 'LawsuitForm',
  validate,
}, { closeDialog })(LawsuitForm);

const mapStateToProps = (state) => (
  { initialValues: {
    client_id: state.clients.client.id,
    court: state.lawsuits.lawsuit ? state.lawsuits.lawsuit.court : '',
    case_number: state.lawsuits.lawsuit ? state.lawsuits.lawsuit.case_number : '' } }
);

export default connect(mapStateToProps, null)(LawsuitForm);
