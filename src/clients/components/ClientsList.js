import React, { PropTypes } from 'react';
// import Icon from 'react-fa';
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
  <div className="card">
    <div className="card-header">
      <h3>Klienter</h3>
    </div>
    <div className="card-content">
      <ul className="card-list">
        {clients.map(client =>
          <li key={client.id}>
            <Link to={`${CLIENTS_PATH}/${client.id}`}>
              {client.first_name} {client.last_name}
            </Link>
            {primaryClientId === client.id &&
              <span className="muted">, huvudklient</span>
            }
            {primaryClientId !== client.id &&
              <DeleteFromButton clientId={client.id} label="klient från ärende" />
            }
            <p>{client.personal_number}</p>
          </li>
        )}
      </ul>
      <ClientFormModal />
      <button
        className="link-button add"
        onClick={openClientFormModal}
      >Lägg till ny klient
      </button>

      <span className="vertical-divider" />

      <ClientsDropdownModal />
      <button
        className="link-button add"
        onClick={openClientsDropdownModal}
      >Lägg till befintlig klient
      </button>
    </div>
  </div>;

ClientsList.propTypes = {
  clients: PropTypes.array.isRequired,
  openClientFormModal: PropTypes.func.isRequired,
  openClientsDropdownModal: PropTypes.func.isRequired,
  primaryClientId: PropTypes.number.isRequired,
};

export default ClientsList;
