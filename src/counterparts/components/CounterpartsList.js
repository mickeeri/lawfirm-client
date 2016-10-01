import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { COUNTERPARTS_PATH } from '../constants';
import CounterpartsDropdownModal from './CounterpartsDropdownModal';
import CounterpartFormModal from './CounterpartFormModal';
import { Button } from '../../shared';

const CounterpartsList = ({
  counterparts,
  openDropdownModal,
  openFormModal,
  closed,
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
            <p>{counterpart.personal_number}</p>
          </li>
        )}
      </ul>
      {openDropdownModal &&
        <div>
          <CounterpartFormModal />
          <Button
            type="small success"
            onClick={openFormModal}
            disabled={closed}
          >
          Lägg till ny motpart</Button>
          <CounterpartsDropdownModal />
          <Button
            type="small success"
            onClick={openDropdownModal}
            disabled={closed}
          >Lägg till befintlig motpart</Button>
        </div>
      }
    </div>
  </div>;

CounterpartsList.propTypes = {
  closed: PropTypes.bool.isRequired,
  counterparts: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
  openDropdownModal: PropTypes.func,
  openFormModal: PropTypes.func,
};

export default connect()(CounterpartsList);
