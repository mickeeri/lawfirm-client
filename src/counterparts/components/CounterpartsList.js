import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import { COUNTERPARTS_PATH } from '../constants';

const CounterpartsList = ({
  counterparts,
}) =>
  <div className="CounterpartsList">
    <h2>Motparter</h2>
    <ul className="show-sub-list">
      {counterparts.map(counterpart =>
        <li key={counterpart.id}>
          <Link to={`${COUNTERPARTS_PATH}/${counterpart.id}`}>
            {counterpart.first_name} {counterpart.last_name}, {counterpart.personal_number}
          </Link>
        </li>
      )}
    </ul>
  </div>;

CounterpartsList.propTypes = {
  counterparts: PropTypes.array.isRequired,
};

export default CounterpartsList;
