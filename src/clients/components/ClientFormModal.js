import { connect } from 'react-redux';
import reduxDialog from 'redux-dialog';
import React, { PropTypes } from 'react';
import ClientForm from './ClientForm';
import * as actions from '../actions';

// Modal that let's user add client from lawuit show page.
let ClientFormModal = ({ addClientToLawsuit, errorMessage, lawsuitId }) =>
  <div className="ClientFormmodal">
    <h1>Lägg till klient till ärende</h1>
    <ClientForm
      onSubmit={(formValues) => {
        addClientToLawsuit(formValues, lawsuitId);
      }}
      errorMessage={errorMessage}
    />
  </div>;

ClientFormModal = reduxDialog({
  name: 'clientFormModal',
  className: 'modal client-form-modal',
  overlayClassName: 'modal-overlay',
})(ClientFormModal);

ClientFormModal.propTypes = {
  addClientToLawsuit: PropTypes.func,
  errorMessage: PropTypes.string,
  lawsuitId: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  errorMessage: state.clients.errorMessage,
  lawsuitId: state.lawsuits.lawsuit.id,
});

export default connect(mapStateToProps, actions)(ClientFormModal);
