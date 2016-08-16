import React, { PropTypes } from 'react';
import Icon from 'react-fa';

const LawsuitArchiveButton = ({ toggleClosed, closed }) =>
  <button
    className="ui button"
    onClick={toggleClosed}
  >
    {closed ?
      <span><Icon name="check" />Öppna ärende</span> :
      <span><Icon name="archive" />Arkivera ärende</span> }
  </button>;

LawsuitArchiveButton.propTypes = {
  closed: PropTypes.bool.isRequired,
  toggleClosed: PropTypes.func.isRequired,
};

export default LawsuitArchiveButton;
