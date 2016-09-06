import React, { PropTypes } from 'react';
import { Icon } from 'react-fa';
import { Link } from 'react-router';
import { CLIENTS_PATH } from '../constants';
import ClientFormModal from './ClientFormModal';
import ClientsDropdownModal from './ClientsDropdownModal';
import { Button } from '../../shared';

const ClientsList = ({
  clients,
  openClientFormModal,
  openClientsDropdownModal,
  primaryClientId,
  closed,
}) =>
  <div className="clients-list">
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
                <Icon name="times" />
              }
              <p>{client.personal_number}</p>
            </li>
          )}
        </ul>
        <ClientFormModal />
        <Button
          type="small success"
          onClick={openClientFormModal}
          disabled={closed}
        >Lägg till ny klient
        </Button>
        <ClientsDropdownModal />
        <Button
          type="small success"
          onClick={openClientsDropdownModal}
          disabled={closed}
        >Lägg till befintlig klient
        </Button>
      </div>
    </div>
  </div>;

ClientsList.propTypes = {
  clients: PropTypes.array.isRequired,
  openClientFormModal: PropTypes.func.isRequired,
  openClientsDropdownModal: PropTypes.func.isRequired,
  primaryClientId: PropTypes.number.isRequired,
};

export default ClientsList;
