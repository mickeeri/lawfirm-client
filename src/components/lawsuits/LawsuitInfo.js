import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { PATHS } from '../../constants';
import moment from 'moment';

const LawsuitInfo = ({ lawsuit }) => {
  moment.locale('sv');
  console.log('Ärende', lawsuit);
  const pc = lawsuit.primary_client;
  return (
    <div className="ui segment">
      <h2 className="ui header">Ärende {lawsuit.slug}</h2>
      <div className="ui divider"></div>
      <h3 className="ui header">{lawsuit.type}</h3>
      <p>Huvudklient: <Link to={`${PATHS.client}/${pc.id}`}>{pc.name}</Link></p>
      <p>Skapat: {moment(lawsuit.created_at).format('L')}</p>
      <p>Målnummer: {lawsuit.case_number}</p>
      <p>Domstol: {lawsuit.court}</p>
      <h4 className="ui header">Anteckning</h4>
      <p>{lawsuit.note}</p>
      <div className="ui section divider"></div>
      <h3 className="ui header">Inställningar</h3>
      <button className="negative labeled icon ui button">
        <i className="remove user icon"></i>Radera
      </button>
      <button className="ui primary labeled icon button">
        <i className="edit icon"></i>Redigera
      </button>
      <div className="ui section divider"></div>
      <Link to={PATHS.lawsuits} className="ui small labeled icon button">
        <i className="left chevron icon"></i>Tillbaka till ärendelista
      </Link>
    </div>
  );
};

export default LawsuitInfo;
