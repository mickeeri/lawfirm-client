import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { generateLetterTemplate } from '../../shared';
import { CLIENTS_PATH } from '../constants';


const ClientInfo = ({ client }) => {
  return (
    <div className="ClientInfo">
      <h2 className="ui header">{client.first_name} {client.last_name}</h2>
      <div className="ui divider" />

      <div className="ui list">
        <div className="item">
          <div className="header">Handläggare</div>
          <div>{client.user.full_name}</div>
        </div>

        <div className="item">
          <div className="header">Personnummer</div>
          <div>{client.personal_number}</div>
        </div>

        <div className="item">
          <div className="header">E-post</div>
          <div>{client.email}</div>
        </div>

        <div className="item">
          <div className="header">Mobil</div>
          <div>{client.mobile}</div>
        </div>

        <div className="item">
          <div className="header">Telefon</div>
          <div>{client.phone_number}</div>
        </div>
      </div>

      <div className="ui section divider" />
      <h3 className="ui header">Adress</h3>

      <div className="ui list">
        {client.co ?
          <div className="item">{`C/O ${client.co}` }</div>
        : ''}

        <div className="item">
          {client.street}
        </div>

        <div className="item">
          {client.post_code} {client.city}
        </div>
      </div>

      <button
        onClick={() => generateLetterTemplate(client)}
        className="ui small labeled icon button"
      >
        <i className="left file word outline icon" />Brevmall
      </button>

      <div className="ui section divider" />
      <Link to={CLIENTS_PATH} className="ui small labeled icon button">
        <i className="left chevron icon" />Tillbaka till klientregister
      </Link>
    </div>
  );
};

ClientInfo.propTypes = {
  client: PropTypes.object.isRequired,
};

export default ClientInfo;
