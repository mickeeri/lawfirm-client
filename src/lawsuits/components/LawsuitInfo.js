import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import Icon from 'react-fa';
import moment from 'moment';
import { CLIENTS_PATH } from '../../clients';
import { LAWSUITS_PATH } from '../constants';
import LawsuitDeleteButton from './LawsuitDeleteButton';

const LawsuitInfo = ({ lawsuit }) => {
  moment.locale('sv');

  if (!lawsuit) {
    return <div className="ui big active centered inline loader" />;
  }

  const pc = lawsuit.primary_client;

  return (
    <div className="LawsuitInfo">
      <h2>Ärende {lawsuit.slug}</h2>

      <div className="ui divider" />

      <p><strong>Ärendetyp:</strong> {lawsuit.type}</p>
      <p><strong>Huvudklient:</strong> <Link to={`${CLIENTS_PATH}/${pc.id}`}>{pc.name}</Link></p>
      <p><strong>Skapat:</strong> {moment(lawsuit.created_at).format('L')}</p>
      <p><strong>Målnummer:</strong> {lawsuit.case_number}</p>
      <p><strong>Domstol:</strong> {lawsuit.court}</p>

      <div className="ui divider" />

      <a>Redigera anteckning</a>
      <h3>Anteckning</h3>
      <p>{lawsuit.note}</p>

      <div className="ui section divider" />

      <h3>Inställningar</h3>
      <LawsuitDeleteButton />
      <div className="ui section divider" />

      <Link to={LAWSUITS_PATH}>
        <Icon name="chevron-left" />Tillbaka till ärendelista
      </Link>
    </div>
  );
};

LawsuitInfo.propTypes = {
  lawsuit: PropTypes.object,
};

export default LawsuitInfo;
