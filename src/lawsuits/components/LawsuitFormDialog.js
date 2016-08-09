import { connect } from 'react-redux';
import reduxDialog from 'redux-dialog';
import React, { PropTypes } from 'react';
import LawsuitForm from './LawsuitForm';
import * as actions from '../actions';

let LawsuitFormDialog = ({ createLawsuit, errorMessage }) =>
  <div className="ui sixteen wide mobile six wide computer column">
    <div className="ui padded raised segment">
      <h1>Skapa ett nytt ärende</h1>
      <LawsuitForm
        onSubmit={createLawsuit}
        errorMessage={errorMessage}
      />
    </div>
  </div>;

LawsuitFormDialog = reduxDialog({
  name: 'lawsuitFormDialog',
  className: 'ui padded grid centered left aligned',
})(LawsuitFormDialog);

LawsuitFormDialog.propTypes = {
  createLawsuit: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
};

const mapStateToProps = (state) => (
  { errorMessage: state.lawsuits.errorMessage }
);

export default connect(mapStateToProps, actions)(LawsuitFormDialog);
