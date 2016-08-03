import React, { PropTypes } from 'react';

const StatusCheckbox = ({ onCheck, filter }) => {
  let checkbox;
  return (
    <div className="ui checkbox">
      <input
        type="checkbox"
        name="status-checkbox"
        onChange={() => {
          const status = checkbox.checked ? 'all' : 'only_active';
          onCheck({ filter: { query: filter.query, page: 1, status, userId: filter.userId } });
        }}
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
