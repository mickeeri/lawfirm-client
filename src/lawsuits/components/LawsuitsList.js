import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { openDialog } from 'redux-dialog';
import LawsuitFormDialog from './LawsuitFormDialog';

// List of lawsuits in Client show.
export const LawsuitsList = ({ clientId, dispatch }) => {
  return (
    <div>
      <h2 className="ui header">Ärenden</h2>
      <LawsuitFormDialog />
      <button
        className="primary labeled icon ui button"
        onClick={() => dispatch(openDialog('lawsuitFormDialog'))}
      >
        <i className="law icon"></i>
        Lägg till ärende
      </button>
    </div>
  );
}

export default connect()(LawsuitsList);
