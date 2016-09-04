import React, { PropTypes } from 'react';

const CounterpartInfo = ({ counterpart }) =>
  <div className="CounterpartInfo">
    <h2>Motpart: {counterpart.first_name} {counterpart.last_name}</h2>
    <p><strong>Personnummer:</strong> {counterpart.personal_number}</p>
    <p><strong>Motpartsombud:</strong> {counterpart.representative}</p>
    <p><strong>Kontaktinfo: </strong></p>
    <p>{counterpart.info}</p>
  </div>;

CounterpartInfo.propTypes = {
  counterpart: PropTypes.object.isRequired,
};

export default CounterpartInfo;
