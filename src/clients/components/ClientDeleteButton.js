import React, { PropTypes } from 'react';
import Icon from 'react-fa';
import reduxDialog, { openDialog, closeDialog } from 'redux-dialog';
import { connect } from 'react-redux';
import ConfirmDeleteDialog from '../../shared/components/ConfirmDeleteDialog';
import { deleteClient } from '../actions';
import { DELETE_CLIENT_MODAL_NAME } from '../constants';

let DeleteClientModal = ({ handleDelete, close }) =>
  <div>
    <ConfirmDeleteDialog
      label="klient"
      deleteFunc={handleDelete}
      close={close}
    />
  </div>;

DeleteClientModal.propTypes = {
  handleDelete: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,
};

DeleteClientModal = reduxDialog({
  name: DELETE_CLIENT_MODAL_NAME,
  className: 'modal confirm-delete-modal',
  overlayClassName: 'modal-overlay',
})(DeleteClientModal);

const ClientDeleteButton = ({ dispatch, clientId }) =>
  <div className="ClientDeleteButton">
    <h3 >Inställningar</h3>
    <DeleteClientModal
      handleDelete={() => { dispatch(deleteClient(clientId)); }}
      close={() => { dispatch(closeDialog(DELETE_CLIENT_MODAL_NAME)); }}
    />
    <button
      className="negative ui button"
      onClick={() => dispatch(openDialog(DELETE_CLIENT_MODAL_NAME))}
    >
      <Icon name="user-times" />Radera
    </button>
  </div>;

ClientDeleteButton.propTypes = {
  dispatch: PropTypes.func.isRequired,
  clientId: PropTypes.number.isRequired,
  errorMessage: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  clientId: state.clients.client.id,
  errorMessage: state.clients.errorMessage,
});

export default connect(mapStateToProps)(ClientDeleteButton);
