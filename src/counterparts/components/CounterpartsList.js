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
  <div className="card">
    <div className="card-header">
      <h3>Motparter</h3>
    </div>

    <div className="card-content">
      <ul className="card-list">
        {counterparts.map(counterpart =>
          <li key={counterpart.id}>
            <Link to={`${COUNTERPARTS_PATH}/${counterpart.id}`}>
              {counterpart.first_name} {counterpart.last_name}
            </Link>
            {openDropdownModal &&
              <DeleteFromButton counterpartId={counterpart.id} label="motpart från ärende" />
            }
            <p>{counterpart.personal_number}</p>
          </li>
        )}
      </ul>
      {openDropdownModal &&
        <div>
          <CounterpartFormModal />
          <button
            className="link-button add"
            onClick={openFormModal}
          >Lägg till ny motpart
          </button>
          <span className="vertical-divider" />
          <CounterpartsDropdownModal />
          <button
            className="link-button add"
            onClick={openDropdownModal}
          >Lägg till befintlig motpart</button>
        </div>
      }
    </div>
  </div>;

CounterpartsList.propTypes = {
  counterparts: PropTypes.array.isRequired,
  openDropdownModal: PropTypes.func,
  openFormModal: PropTypes.func,
};

export default CounterpartsList;
