import React, { PropTypes } from 'react';
import LawsuitRow from './LawsuitRow';

const LawsuitsTable = ({ lawsuits }) => (
  <table className="ui celled striped structured table">
    <thead>
      <tr>
        <th colSpan="2">Huvudklient</th>
        <th rowSpan="2">Uppdrag</th>
        <th rowSpan="2">Ärendenummer</th>
        <th rowSpan="2">Upplagt</th>
        <th rowSpan="2">Aktivt</th>
      </tr>
      <tr>
        <th>Namn</th>
        <th>Personnummer</th>
      </tr>
    </thead>
    <tbody>
      {lawsuits.map(lawsuit =>
        <LawsuitRow key={lawsuit.id} lawsuit={lawsuit} />
      )}
    </tbody>
    <tfoot>
      <tr>
        <th colSpan="6">

        </th>
      </tr>
    </tfoot>
  </table>
);

LawsuitsTable.propTypes = {
  lawsuits: PropTypes.array.isRequired,
};

export default LawsuitsTable;
