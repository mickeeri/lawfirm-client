import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { COUNTERPARTS_PATH } from '../constants';
import CounterpartsDropdownModal from './CounterpartsDropdownModal';

const CounterpartsList = ({
  counterparts,
  openDropdownModal,
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
    {openDropdownModal &&
      <div>
        <CounterpartsDropdownModal />
        <button
          className="ui small primary button"
          onClick={openDropdownModal}
        >Lägg till befintlig motpart</button>
      </div>}
  </div>;

CounterpartsList.propTypes = {
  counterparts: PropTypes.array.isRequired,
  openDropdownModal: PropTypes.func.isRequired,
};

export default CounterpartsList;
