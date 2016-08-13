import React, { PropTypes } from 'react';
import Icon from 'react-fa';
import { connect } from 'react-redux';
import { openDialog, closeDialog } from 'redux-dialog';
import ConfirmDeleteDialog from '../../shared/components/ConfirmDeleteDialog';
import { CONFIRM_DELETE_MODAL_NAME } from '../../shared';
import { deleteClient } from '../actions';

const ClientDeleteButton = ({ dispatch, clientId, errorMessage }) =>
  <div className="ClientDeleteButton">
    <h3 >Inställningar</h3>
    <ConfirmDeleteDialog
      label="klient"
      errorMessage={errorMessage}
      deleteFunc={() => { dispatch(deleteClient(clientId)); }}
      close={() => { dispatch(closeDialog(CONFIRM_DELETE_MODAL_NAME)); }}
    />
    <button
      className="negative ui button"
      onClick={() => dispatch(openDialog(CONFIRM_DELETE_MODAL_NAME))}
    >
      <Icon name="user-times" />Radera
    </button>
  </div>;

ClientDeleteButton.propTypes = {
  dispatch: PropTypes.func.isRequired,
  clientId: PropTypes.number.isRequired,
  errorMessage: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => (
  { clientId: state.clients.client.id,
    errorMessage: state.clients.errorMessage }
);

export default connect(mapStateToProps, null)(ClientDeleteButton);
