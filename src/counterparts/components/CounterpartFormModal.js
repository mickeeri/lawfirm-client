import { connect } from 'react-redux';
import reduxDialog from 'redux-dialog';
import React, { PropTypes } from 'react';
import CounterpartForm from './CounterpartForm';
import * as actions from '../actions';
import { COUNTERPARTS_FORM_MODAL_NAME } from '../constants';

// Modal that let's user add counterpart from lawuit show page.
let CounterpartFormModal = ({ addCounterpartToLawsuit, errorMessage, lawsuitId }) =>
  <div className="CounterpartFormmodal">
    <h1>Lägg till motpart till ärende</h1>
    <CounterpartForm
      onSubmit={(formValues) => {
        addCounterpartToLawsuit(formValues, lawsuitId);
      }}
      errorMessage={errorMessage}
    />
  </div>;

CounterpartFormModal = reduxDialog({
  name: COUNTERPARTS_FORM_MODAL_NAME,
  className: 'modal counterpart-form-modal',
  overlayClassName: 'modal-overlay',
})(CounterpartFormModal);

CounterpartFormModal.propTypes = {
  addCounterpartToLawsuit: PropTypes.func,
  errorMessage: PropTypes.string,
  lawsuitId: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  errorMessage: state.counterparts.errorMessage,
  lawsuitId: state.lawsuits.lawsuit.id,
});

export default connect(mapStateToProps, actions)(CounterpartFormModal);
