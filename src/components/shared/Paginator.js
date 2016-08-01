import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchClients } from '../../actions/index';

const Paginator = ({ meta, dispatch }) => {
  const renderPaginations = () => {
    const paginationItems = [];
    const { total_pages, current_page } = meta;
    for (let i = 1; i <= total_pages; i++) {
      paginationItems.push(
        <a
          className={`item ${i === current_page ? 'active' : ''}`}
          key={i}
          onClick={() => {
            dispatch(fetchClients({ query: '', page: i }));
          }}
        >{i}</a>
      );
    }
    return paginationItems;
  };

  return (
    <div className="ui pagination menu">
      <a
        href="#"
        className={`${meta.current_page === 1 ? 'disabled' : ''} icon item`}
        onClick={() => {
          if (meta.previous_page) {
            dispatch(fetchClients({ query: '', page: meta.previous_page }));
          }
        }}
      ><i className="left chevron icon"></i></a>
      {renderPaginations(meta)}
      <a
        href="#"
        className={`${meta.current_page === meta.total_pages ? 'disabled' : ''} icon item`}
        onClick={() => {
          if (meta.next_page) {
            dispatch(fetchClients({ query: '', page: meta.next_page }));
          }
        }}
      ><i className="right chevron icon"></i></a>
    </div>
  );
};

Paginator.propTypes = {
  dispatch: PropTypes.func.isRequired,
  meta: PropTypes.shape({
    total_pages: PropTypes.number,
    current_page: PropTypes.number,
    previous_page: PropTypes.number,
    next_page: PropTypes.number,
    total_entries: PropTypes.number,
  }).isRequired,
};

export default connect()(Paginator);

