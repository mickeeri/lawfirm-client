import React, { PropTypes } from 'react';
import ClientRow from './ClientRow';

const ClientsTable = ({ clients }) => (
  <table className="ClientsTable ui celled table">
    <thead>
      <tr>
        <th>Namn</th>
        <th>Personnummer</th>
        <th>Handläggare</th>
      </tr>
    </thead>
    <tbody>
      {clients.map(client =>
        <ClientRow key={client.id} client={client} />
      )}
    </tbody>
    <tfoot />
  </table>
);

ClientsTable.propTypes = {
  clients: PropTypes.array.isRequired,
};

export default ClientsTable;
