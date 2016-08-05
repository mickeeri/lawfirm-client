import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { PATHS } from '../../constants';
import { generateLetterTemplate } from '../../utils/docxGenerator';


const ClientInfo = ({ client }) => {
  return (
    <div className="ui segment">
      <h2 className="ui header">{client.first_name} {client.last_name}</h2>
      <div className="ui divider"></div>
      <p>Personnummer: {client.personal_number}</p>
      <p>E-post:</p>
      <p>Mobil:</p>
      <p>Telefon:</p>

      <div className="ui section divider"></div>
      <h3 className="ui header">Adress</h3>
      <p>C/O</p>
      <p>Gatuadress</p>
      <p>Posadress</p>
      <p>Ort</p>
      <button onClick={() => generateLetterTemplate(client)} className="ui small labeled icon button">
        <i className="left file word outline icon" />Brevmall
      </button>

      <div className="ui section divider"></div>
      <h3 className="ui header">Anteckningar</h3>
      <p>Lorem ipusm...</p>

      <div className="ui section divider"></div>
      <h3 className="ui header">Inställningar</h3>
      <button className="negative labeled icon ui button">
        <i className="remove user icon"></i>Radera klient
      </button>
      <button className="ui primary labeled icon button">
        <i className="edit icon"></i>Redigera
      </button>

      <div className="ui section divider"></div>
      <Link to={PATHS.clients} className="ui small labeled icon button">
        <i className="left chevron icon"></i>Tillbaka till klientregister
      </Link>
    </div>
  );
};

ClientInfo.propTypes = {
  client: PropTypes.object.isRequired,
};

export default ClientInfo;
