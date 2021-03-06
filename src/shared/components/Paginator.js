import React, { PropTypes } from 'react';
import Icon from 'react-fa';

const Paginator = ({ meta, onPaginate }) => {
  const renderPaginations = () => {
    const paginationItems = [];
    const { total_pages, current_page } = meta;
    for (let i = 1; i <= total_pages; i++) {
      paginationItems.push(
        <a
          className={`item ${i === current_page ? 'active' : ''}`}
          key={i}
          onClick={() => {
            onPaginate(i);
          }}
        >{i}</a>
      );
    }
    return paginationItems;
  };

  return (
    <div className="pagination-menu">
      <a
        className={`${meta.current_page === 1 ? 'disabled' : ''} icon item`}
        onClick={() => {
          if (meta.previous_page) {
            onPaginate(meta.previous_page);
          }
        }}
      ><Icon name="chevron-left" /></a>
      {renderPaginations(meta)}
      <a
        className={`${meta.current_page === meta.total_pages ? 'disabled' : ''} icon item`}
        onClick={() => {
          if (meta.next_page) {
            onPaginate(meta.next_page);
          }
        }}
      ><Icon name="chevron-right" /></a>
    </div>
  );
};

Paginator.propTypes = {
  meta: PropTypes.shape({
    total_pages: PropTypes.number,
    current_page: PropTypes.number,
    previous_page: PropTypes.number,
    next_page: PropTypes.number,
    total_entries: PropTypes.number,
  }).isRequired,
  onPaginate: PropTypes.func.isRequired,
};

export default Paginator;
