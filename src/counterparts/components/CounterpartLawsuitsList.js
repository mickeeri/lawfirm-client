import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { LAWSUITS_PATH } from '../../lawsuits/constants';

const CounterpartLawsuitsList = ({ lawsuits }) =>
  <div className="counterpart-lawsuit-list">
    <div>
      {lawsuits.map(lawsuit =>
        <div key={lawsuit.id}>
          <Link to={`${LAWSUITS_PATH}/${lawsuit.id}`}>{lawsuit.slug}</Link>
          <p>{lawsuit.type}</p>
          <div className="ui divider" />
        </div>
      )}
    </div>
  </div>;


CounterpartLawsuitsList.propTypes = {
  lawsuits: PropTypes.array.isRequired,
};

export default CounterpartLawsuitsList;
