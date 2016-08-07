import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { LAWSUITS_PATH } from '../constants';
import { CLIENTS_PATH } from '../../clients';

const COISearchResult = ({ lawsuits }) => {

  const renderClients = (clients) => {
    return (
      <div>
        <strong>{`Klient${clients.length > 1 ? 'er' : ''}`}</strong>
        {clients.map(client =>
          <div key={client.id}>
            <Link to={`${CLIENTS_PATH}/${client.id}`}>{client.first_name} {client.last_name} {client.personal_number}</Link>
          </div>
        )}
      </div>
    )
  }

  const renderCounterparts = (counterparts) => {
    return (
      <div>
        <strong>{`Motpart${counterparts.length > 1 ? 'er' : ''}`}</strong>
        {counterparts.map(counterpart =>
          <div key={counterpart.id}>{counterpart.first_name} {counterpart.last_name} {counterpart.personal_number}</div>
        )}
      </div>
    )
  }

  const renderResultRow = (lawsuit) => {
    const { id, slug, type, clients, counterparts } = lawsuit;
    return (
      <div className="ui raised segment" key={id}>
        <h4 className="ui header"><Link to={`${LAWSUITS_PATH}/${lawsuit.id}`}>Ärende {slug}, {type}</Link></h4>
        {renderClients(clients)}
        {renderCounterparts(counterparts)}
      </div>
    );
  }


  return (
    <div className="COISearchResult">
      {lawsuits.map(lawsuit =>
        {return renderResultRow(lawsuit)}
      )}
    </div>
  )
}

export default COISearchResult;