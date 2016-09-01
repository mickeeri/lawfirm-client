import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { COUNTERPARTS_PATH } from '../constants';
import CounterpartsDropdownModal from './CounterpartsDropdownModal';
import CounterpartFormModal from './CounterpartFormModal';
import DeleteFromButton from '../../shared/components/DeleteFromButton';

const CounterpartsList = ({
  counterparts,
  openDropdownModal,
  openFormModal,
}) =>
  <div className="CounterpartsList">
    <h2>Motparter</h2>
    <ul className="show-sub-list">
      {counterparts.map(counterpart =>
        <li key={counterpart.id}>
          <Link to={`${COUNTERPARTS_PATH}/${counterpart.id}`}>
            {counterpart.first_name} {counterpart.last_name}, {counterpart.personal_number}
          </Link>
          {openDropdownModal &&
            <DeleteFromButton counterpartId={counterpart.id} label="motpart från ärende" />
          }
        </li>
      )}
    </ul>
    {openDropdownModal &&
      <div>
        <CounterpartFormModal />
        <button
          className="ui small primary button"
          onClick={openFormModal}
        >Lägg till ny motpart
        </button>
        <CounterpartsDropdownModal />
        <button
          className="ui small primary button"
          onClick={openDropdownModal}
        >Lägg till befintlig motpart</button>
      </div>
    }
  </div>;

CounterpartsList.propTypes = {
  counterparts: PropTypes.array.isRequired,
  openDropdownModal: PropTypes.func,
  openFormModal: PropTypes.func,
};

export default CounterpartsList;
