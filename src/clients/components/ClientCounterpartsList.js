import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { COUNTERPARTS_PATH } from '../../counterparts/constants';

const ClientCounterpartsList = ({ counterparts }) =>
  <div className="client-counterparts-list">
    <h2>Motparter</h2>
    <ul className="show-list">
      {counterparts.map(counterpart =>
        <li key={counterpart.id}>
          <Link to={`${COUNTERPARTS_PATH}/${counterpart.id}`}>
            <strong>{counterpart.first_name} {counterpart.last_name}</strong>
          </Link>
          <p>{counterpart.personal_number}</p>
        </li>
      )}
    </ul>
  </div>;

ClientCounterpartsList.propTypes = {
  counterparts: PropTypes.shape({
    first_name: PropTypes.string.isRequired,
    last_name: PropTypes.string.isRequired,
    personal_number: PropTypes.string.isRequired,
  }).isRequired,
};

export default ClientCounterpartsList;
