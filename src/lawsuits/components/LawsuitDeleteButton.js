import React, { PropTypes } from 'react';
import Icon from 'react-fa';
import { connect } from 'react-redux';
import { openDialog, closeDialog } from 'redux-dialog';
import ConfirmDeleteDialog from '../../shared/components/ConfirmDeleteDialog';
import { deleteLawsuit } from '../actions';
import { CONFIRM_DELETE_MODAL_NAME } from '../../shared';

const LawsuitDeleteButton = ({ dispatch, lawsuitId, errorMessage }) =>
  <div className="LawsuitDeleteButton">
    <ConfirmDeleteDialog
      label="ärende"
      errorMessage={errorMessage}
      deleteFunc={() => { dispatch(deleteLawsuit(lawsuitId)); }}
      close={() => { dispatch(closeDialog(CONFIRM_DELETE_MODAL_NAME)); }}
    />
    <button
      className="negative ui button"
      onClick={() => dispatch(openDialog(CONFIRM_DELETE_MODAL_NAME))}
    >
      <Icon name="times" />Radera ärende
    </button>
  </div>;

LawsuitDeleteButton.propTypes = {
  dispatch: PropTypes.func.isRequired,
  lawsuitId: PropTypes.number.isRequired,
  errorMessage: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  lawsuitId: state.lawsuits.lawsuit.id,
  errorMessage: state.lawsuits.errorMessage,
});

export default connect(mapStateToProps, null)(LawsuitDeleteButton);
