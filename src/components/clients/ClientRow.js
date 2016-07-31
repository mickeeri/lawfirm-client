import React, { PropTypes } from 'react';

const ClientRow = ({ client }) => (
  <tr>
    <td><a href="#">{client.last_name}, {client.first_name}</a></td>
    <td>{client.personal_number}</td>
    <td>{client.user.full_name}</td>
  </tr>
);

ClientRow.propTypes = {
  client: PropTypes.shape({
    id: PropTypes.number.isRequired,
    first_name: PropTypes.string.isRequired,
    last_name: PropTypes.string.isRequired,
    personal_number: PropTypes.string.isRequired,
  }),
};

export default ClientRow;
