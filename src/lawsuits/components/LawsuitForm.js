import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import LawsuitTypesDropdown from './LawsuitTypesDropdown';
import { closeDialog } from 'redux-dialog';
import { connect } from 'react-redux';


const validate = values => {
  const errors = {};



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

// const renderTextArea = (field) => {
//   return (
//     <div className={`field ${field.touched && field.error ? 'error' : ''} ${field.input.required ? 'required': ''}`}>
//       <label>{field.input.placeholder}</label>
//       <div className="ui input">
//         <textarea {...field.input} />
//       </div>
//       {field.touched && field.error && <div className="error">{field.error}</div>}
//     </div>
//   );
// };

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
      <div className="fields">
        <div className="eleven wide field">
          <Field
            name="court"
            type="text"
            component={renderField}
            placeholder="Domstol"
          />
        </div>
        <div className="five wide field">
          <Field
            name="case_number"
            type="text"
            component={renderField}
            placeholder="Målnummer"
          />
        </div>
      </div>
      <div className="ui divider"></div>
      {errorMessage && <div className="ui error message"><p>{errorMessage}</p></div>}
      <div>
        <button
          onClick={(e) => {
            e.preventDefault();
            props.dispatch(closeDialog('lawsuitFormDialog'))
          }}
          className="ui button"
        ><i className="remove icon"></i>Stäng</button>
        <button className="ui orange button" disabled={pristine || submitting} onClick={reset}>Återställ</button>
        <button
          type="submit"
          disabled={submitting}
          className="ui button primary"
        ><i className="checkmark icon"></i>Skapa ärende</button>
      </div>
    </form>
  )
}

LawsuitForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool,
  reset: PropTypes.func,
  submitting: PropTypes.bool,
  errorMessage: PropTypes.string,
};

LawsuitForm = reduxForm({
  form: 'LawsuitForm',
  enableReinitialize: true,
  validate,
}, { closeDialog })(LawsuitForm);

const mapStateToProps = (state) => (
  { initialValues: {
      client_id: state.clients.client.id,
      court: state.lawsuits.lawsuit ? state.lawsuits.lawsuit.court : '',
      case_number: state.lawsuits.lawsuit ? state.lawsuits.lawsuit.case_number : '' } }
);

export default connect(mapStateToProps, null)(LawsuitForm);
