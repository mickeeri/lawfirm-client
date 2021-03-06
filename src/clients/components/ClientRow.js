import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { CLIENTS_PATH } from '../constants';

const ClientRow = ({ client }) => (
  <tr className="ClientRow">
    <td>
      <Link
        to={`${CLIENTS_PATH}/${client.id}`}
      >{client.last_name}, {client.first_name}
      </Link>
    </td>
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
    user: PropTypes.object.isRequired,
  }),
};

export default ClientRow;
