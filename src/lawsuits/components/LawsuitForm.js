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
  const { handleSubmit, submitting, errorMessage, pristine, reset, toggleEdit, edit } = props;
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

      {errorMessage &&
        <div className="alert-error">
          <p><Icon name="exclamation-circle" />{errorMessage}</p>
        </div>}

      <div className="button-group">
        {toggleEdit ?
          <button
            className="ui button"
            onClick={(e) => {
              e.preventDefault();
              toggleEdit();
            }}
          ><Icon name="times" />Avbryt</button> :
          <button
            onClick={(e) => {
              e.preventDefault();
              props.dispatch(closeDialog('lawsuitFormDialog'));
            }}
            className="ui button"
          ><Icon name="times" />Stäng</button>
        }

        <button
          className="ui orange button" disabled={pristine || submitting}
          onClick={reset}
        >Återställ</button>

        <button
          type="submit"
          disabled={submitting}
          className="ui button primary"
        ><Icon name="check" />{edit ? 'Spara ändringar' : 'Skapa ärende'}</button>
      </div>
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
  toggleEdit: PropTypes.func,
};

LawsuitForm = reduxForm({
  form: 'LawsuitForm',
  validate,
}, { closeDialog })(LawsuitForm);

const mapStateToProps = (state) => {
  const client = state.clients.client;
  const lawsuit = state.lawsuits.lawsuit;

  return ({
    initialValues: {
      id: lawsuit ? lawsuit.id : undefined,
      client_id: client ? client.id : lawsuit.primary_client.id,
      court: lawsuit ? lawsuit.court : '',
      case_number: lawsuit ? lawsuit.case_number : '',
      lawsuit_type_id: lawsuit ? lawsuit.lawsuit_type.id : '',
    },
    errorMessage: state.lawsuits.errorMessage,
    edit: state.lawsuits.edit,
  });
};

export default connect(mapStateToProps, null)(LawsuitForm);
