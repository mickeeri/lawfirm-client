import React, { PropTypes } from 'react';
import Icon from 'react-fa';
import { generateLetterTemplate } from '../../shared';


const ClientInfo = ({ client }) =>
  <div className="ClientInfo">
    <h2>{client.first_name} {client.last_name}</h2>

    <div className="ui divider" />

    <h4>Handläggare</h4>
    <div>{client.user.full_name}</div>

    <h4>Personnummer</h4>
    <div>{client.personal_number}</div>

    <h4>E-post</h4>
    <div>{client.email}</div>

    <h4>Mobil</h4>
    <div>{client.mobile}</div>

    <h4>Telefon</h4>
    <div>{client.phone_number}</div>

    <div className="ui divider" />

    <h4>Adress</h4>

    {client.co ?
      <div>{`C/O ${client.co}` }</div>
    : ''}

    <div>
      {client.street}
    </div>

    <div>
      {client.post_code} {client.city}
    </div>

    <a onClick={() => generateLetterTemplate(client)}>
      <Icon name="envelope" />Brevmall
    </a>
  </div>;


ClientInfo.propTypes = {
  client: PropTypes.object.isRequired,
};

export default ClientInfo;
