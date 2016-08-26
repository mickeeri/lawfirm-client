import React, { PropTypes } from 'react';
import Icon from 'react-fa';
import { openDialog, closeDialog } from 'redux-dialog';
import { connect } from 'react-redux';
import { deleteClientFromLawsuit } from '../../clients/actions';
import { CONFIRM_DELETE_MODAL_NAME } from '../constants';
import ConfirmDeleteDialog from './ConfirmDeleteDialog';

const DeleteFromButton = ({ dispatch, clientId, lawsuitId, clientErrorMessage }) => {
  const handleOnClick = () => {
    dispatch(openDialog(CONFIRM_DELETE_MODAL_NAME));
  };

  return (
    <span>
      <ConfirmDeleteDialog
        deleteFunc={() => { dispatch(deleteClientFromLawsuit(clientId, lawsuitId)); }}
        label="klient från ärende"
        errorMessage={clientErrorMessage}
        close={() => { dispatch(closeDialog(CONFIRM_DELETE_MODAL_NAME)); }}
      />
      <Icon
        name="times"
        onClick={() => handleOnClick()}
      />
    </span>

  );
};

DeleteFromButton.propTypes = {
  dispatch: PropTypes.func.isRequired,
  clientId: PropTypes.number.isRequired,
  lawsuitId: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  lawsuitId: state.lawsuits.lawsuit.id,
  clientErrorMessage: state.clients.errorMessage,
});

export default connect(mapStateToProps, null)(DeleteFromButton);
