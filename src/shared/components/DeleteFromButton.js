import React, { PropTypes } from 'react';
import Icon from 'react-fa';
import { openDialog, closeDialog } from 'redux-dialog';
import { connect } from 'react-redux';
import { deleteClientFromLawsuit } from '../../clients/actions';
import { deleteCounterpartFromLawsuit } from '../../counterparts/actions';
import { CONFIRM_DELETE_MODAL_NAME } from '../constants';
import ConfirmDeleteDialog from './ConfirmDeleteDialog';

const DeleteFromButton = ({ dispatch, clientId, lawsuitId, counterpartId, label }) => {
  const handleOnClick = () => {
    dispatch(openDialog(CONFIRM_DELETE_MODAL_NAME));
  };

  const handleOnDelete = () => {
    if (clientId) {
      dispatch(deleteClientFromLawsuit(clientId, lawsuitId));
    } else if (counterpartId) {
      dispatch(deleteCounterpartFromLawsuit(counterpartId, lawsuitId));
    }
  };

  return (
    <span>
      <ConfirmDeleteDialog
        deleteFunc={() => handleOnDelete()}
        label={label}
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
  clientId: PropTypes.number,
  counterpartId: PropTypes.number,
  dispatch: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  lawsuitId: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  lawsuitId: state.lawsuits.lawsuit.id,
});

export default connect(mapStateToProps, null)(DeleteFromButton);
