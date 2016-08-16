import { connect } from 'react-redux';
import reduxDialog from 'redux-dialog';
import React, { PropTypes } from 'react';
import LawsuitForm from './LawsuitForm';
import * as actions from '../actions';

let LawsuitFormDialog = ({ createUpdateLawsuit, errorMessage }) =>
  <div className="LawsuitFormDialog">
    <h1>Skapa ett nytt ärende</h1>
    <LawsuitForm
      onSubmit={createUpdateLawsuit}
      errorMessage={errorMessage}
    />
  </div>;

LawsuitFormDialog = reduxDialog({
  name: 'lawsuitFormDialog',
  className: 'modal lawsuit-form-modal',
  overlayClassName: 'modal-overlay',
})(LawsuitFormDialog);

LawsuitFormDialog.propTypes = {
  createUpdateLawsuit: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
};

const mapStateToProps = (state) => (
  { errorMessage: state.lawsuits.errorMessage }
);

export default connect(mapStateToProps, actions)(LawsuitFormDialog);
