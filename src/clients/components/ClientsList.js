import React, { PropTypes } from 'react';
import Icon from 'react-fa';
import { Link } from 'react-router';
import { CLIENTS_PATH } from '../constants';
import ClientFormModal from './ClientFormModal';
import ClientsDropdownModal from './ClientsDropdownModal';
import DeleteFromButton from '../../shared/components/DeleteFromButton';

const ClientsList = ({
  clients,
  openClientFormModal,
  openClientsDropdownModal,
  primaryClientId,
}) =>
  <div className="ClientsList">
    <h2>Klienter</h2>
    <ul className="show-sub-list">
      {clients.map(client =>
        <li key={client.id}>
          <Link to={`${CLIENTS_PATH}/${client.id}`}>
            {client.first_name} {client.last_name}, {client.personal_number}
          </Link>
          {primaryClientId === client.id && <span className="muted">, huvudklient</span> }
          {primaryClientId !== client.id && <DeleteFromButton clientId={client.id} label="klient från ärende" />}
        </li>
      )}
    </ul>

    <ClientFormModal />
    <button
      className="ui small primary button"
      onClick={openClientFormModal}
    >
      <Icon name="plus" />Lägg till ny klient
    </button>

    <ClientsDropdownModal />
    <button
      className="ui small primary button"
      onClick={openClientsDropdownModal}
    >
      <Icon name="plus" />Lägg till befintlig klient
    </button>
  </div>;

ClientsList.propTypes = {
  clients: PropTypes.array.isRequired,
  openClientFormModal: PropTypes.func.isRequired,
  openClientsDropdownModal: PropTypes.func.isRequired,
  primaryClientId: PropTypes.number.isRequired,
};

export default ClientsList;
