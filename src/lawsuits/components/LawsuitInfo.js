import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { CLIENTS_PATH } from '../../clients';
import moment from 'moment';
import { LAWSUITS_PATH } from '../constants';

const LawsuitInfo = ({ lawsuit }) => {
  moment.locale('sv');

  if (!lawsuit) {
    return <div className="ui big active centered inline loader"></div>;
  }

  const pc = lawsuit.primary_client;

  return (
    <div className="LawsuitInfo">
      <h2 className="ui header">Ärende {lawsuit.slug}</h2>

      <div className="ui divider"></div>

      <h3 className="ui header">{lawsuit.type}</h3>
      <p>Huvudklient: <Link to={`${CLIENTS_PATH}/${pc.id}`}>{pc.name}</Link></p>
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
      <Link to={LAWSUITS_PATH} className="ui small labeled icon button">
        <i className="left chevron icon"></i>Tillbaka till ärendelista
      </Link>
    </div>
  );
};

LawsuitInfo.propTypes = {
  lawsuit: PropTypes.object,
}

export default LawsuitInfo;
