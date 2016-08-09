import reduxDialog from 'redux-dialog';
import React, { PropTypes } from 'react';
import LawsuitForm from './LawsuitForm';
import { connect } from 'react-redux';
import * as actions from '../actions';

let LawsuitFormDialog = ({ createLawsuit, errorMessage }) => {
  return (
    <div className="LawsuitFormDialog">
      <h1>Skapa ett nytt ärende</h1>
      <LawsuitForm
        onSubmit={createLawsuit}
        errorMessage={errorMessage}
      />
    </div>
  )
}

LawsuitFormDialog = reduxDialog({
  name: 'lawsuitFormDialog',
  style: { content: {
    maxWidth: '600px',
    height: '350px',
    margin: '0 auto',
    overflow: 'hidden',
  }}
})(LawsuitFormDialog);

LawsuitFormDialog.propTypes = {
  createLawsuit: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
};

const mapStateToProps = (state) => (
  { errorMessage: state.lawsuits.errorMessage }
);

export default connect(mapStateToProps, actions)(LawsuitFormDialog);
