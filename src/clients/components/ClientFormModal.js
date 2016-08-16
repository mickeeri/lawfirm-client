import { connect } from 'react-redux';
import reduxDialog from 'redux-dialog';
import React, { PropTypes } from 'react';
import ClientForm from './ClientForm';
import * as actions from '../actions';

let ClientFormModal = ({ createUpdateClient, errorMessage }) =>
  <div className="ClientFormmodal">
    <h1>Lägg till klient till ärende</h1>
    <ClientForm
      onSubmit={createUpdateClient}
      errorMessage={errorMessage}
    />
  </div>;

ClientFormModal = reduxDialog({
  name: 'clientFormModal',
  className: 'modal client-form-modal',
  overlayClassName: 'modal-overlay',
})(ClientFormModal);

ClientFormModal.propTypes = {
  createUpdateClient: PropTypes.func,
  errorMessage: PropTypes.string,
};

const mapStateToProps = (state) => ({
  errorMessage: state.clients.errorMessage,
  lawsuitId: state.lawsuits.lawsuit.id,
});

export default connect(mapStateToProps, actions)(ClientFormModal);
