import React, { PropTypes } from 'react';
import { Icon } from 'react-fa';
import { connect } from 'react-redux';
import { openDialog } from 'redux-dialog';
import LawsuitFormDialog from './LawsuitFormDialog';

// List of lawsuits in Client show.
const LawsuitsList = ({ dispatch }) =>
  <div>
    <h2>Ärenden</h2>
    <LawsuitFormDialog />
    <button
      className="ui primary button"
      onClick={() => dispatch(openDialog('lawsuitFormDialog'))}
    >
      <Icon name="plus" />Lägg till ärende
    </button>
  </div>;


LawsuitsList.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(LawsuitsList);
