import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { PATHS } from '../../constants';

const LawsuitRow = ({ lawsuit }) => (
  <tr>
    <td>
      <Link to={`${PATHS.client}/${lawsuit.primary_client.id}`}>
        {lawsuit.primary_client.name}
      </Link>
    </td>
    <td>{lawsuit.primary_client.personal_number}</td>
    <td>{lawsuit.type}</td>
    <td><a href="#">{lawsuit.slug}</a></td>
    <td>{lawsuit.created_at}</td>
    <td className="center aligned">
      {lawsuit.closed ? <i className="large red remove icon"></i> :
        <i className="large green checkmark icon"></i>}
    </td>
  </tr>
);

LawsuitRow.propTypes = {
  lawsuit: PropTypes.shape({
    id: PropTypes.number.isRequired,
    closed: PropTypes.bool.isRequired,
    court: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,
    primary_client: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }),
  }),
};

export default LawsuitRow;
