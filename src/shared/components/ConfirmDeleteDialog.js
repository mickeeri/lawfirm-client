import reduxDialog from 'redux-dialog';
import Icon from 'react-fa';
import React, { PropTypes } from 'react';

const ConfirmDeleteDialog = ({ deleteFunc, label, errorMessage, close }) =>
  <div className="ConfirmDeleteDialog">
    <h3>Bekräfta borttagning</h3>
    <div className="ui divider" />
    <p>{`Är du säker på att du vill radera ${label}?`}</p>
    <div className="ui divider" />
    {errorMessage && <div className="error-message">
      <Icon name="exclamation-circle" />{errorMessage}
    </div>}
    <div className="button-group">
      <button
        className="ui primary button"
        onClick={close}
      >Avbryt</button>
      <button
        className="ui negative button"
        onClick={deleteFunc}
      >Ja, radera</button>
    </div>
  </div>;

ConfirmDeleteDialog.propTypes = {
  deleteFunc: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  errorMessage: PropTypes.string,
  close: PropTypes.func.isRequired,
};


export default reduxDialog({
  name: 'confirmDeleteDialog',
  className: 'modal confirm-delete-modal',
  overlayClassName: 'modal-overlay',
})(ConfirmDeleteDialog);
