import React, { PropTypes } from 'react';
import Icon from 'react-fa';
import { Button } from '../../shared';

const LawsuitArchiveButton = ({ toggleClosed, closed }) =>
  <Button
    type={closed ? 'success' : 'basic'}
    onClick={toggleClosed}
  >
    {closed ?
      <span><Icon name="check" />Öppna ärende</span> :
      <span><Icon name="archive" />Arkivera ärende</span> }
  </Button>;

LawsuitArchiveButton.propTypes = {
  closed: PropTypes.bool.isRequired,
  toggleClosed: PropTypes.func.isRequired,
};

export default LawsuitArchiveButton;
