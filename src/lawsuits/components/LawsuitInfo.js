import { Link } from 'react-router';
import moment from 'moment';
import React, { PropTypes } from 'react';
import { CLIENTS_PATH } from '../../clients';


const LawsuitInfo = ({ lawsuit }) => {
  moment.locale('sv');

  const pc = lawsuit.primary_client;

  return (
    <div className="LawsuitInfo">
      <p><strong>Ärendetyp:</strong> {lawsuit.lawsuit_type.name}</p>
      <p><strong>Huvudklient:</strong> <Link to={`${CLIENTS_PATH}/${pc.id}`}>{pc.name}</Link></p>
      <p><strong>Skapat:</strong> {moment(lawsuit.created_at).format('L')}</p>
      <p><strong>Målnummer:</strong> {lawsuit.case_number}</p>
      <p><strong>Domstol:</strong> {lawsuit.court}</p>
    </div>
  );
};

LawsuitInfo.propTypes = {
  lawsuit: PropTypes.object,
};

export default LawsuitInfo;
