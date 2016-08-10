import React, { PropTypes } from 'react';

const StatusCheckbox = ({ onCheck, filter }) => {
  let checkbox;
  return (
    <div
      className="checkbox"
      onClick={() => {
        checkbox.checked = !checkbox.checked;
        const status = checkbox.checked ? 'all' : 'active';
        onCheck({ filter: { query: filter.query, page: 1, status, userId: filter.userId } });
      }}

    >
      <input
        type="checkbox"
        onClick={() => { checkbox.checked = !checkbox.checked; }}
        name="status-checkbox"
        ref={node => { checkbox = node; }}
      />
      <label htmlFor="status-checkbox">Visa arkiverade ärenden</label>
    </div>
  );
};

StatusCheckbox.propTypes = {
  onCheck: PropTypes.func.isRequired,
  filter: PropTypes.shape({
    query: PropTypes.string,
    page: PropTypes.number,
    status: PropTypes.string,
  }),
};

export default StatusCheckbox;
