import React, { PropTypes } from 'react';
import ClientRow from './ClientRow';

const ClientsTable = ({ clients }) => (
  <table className="ui celled table">
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
    <tfoot>
      <tr>
        <th colSpan="4">
          <button className="ui right floated small primary labeled icon button">
            <i className="user icon"></i>Lägg till klient
          </button>
        </th>
      </tr>
    </tfoot>
  </table>
);

ClientsTable.propTypes = {
  clients: PropTypes.array.isRequired,
};

export default ClientsTable;
