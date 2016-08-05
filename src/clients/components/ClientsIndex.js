import { connect } from 'react-redux';
import { SearchBar, Paginator } from '../../shared';
import { UsersDropdown } from '../../users';
import * as actions from '../actions';
import ClientsTable from './ClientsTable';
import React, { Component, PropTypes } from 'react';

class ClientsIndex extends Component {
  componentWillMount() {
    this.props.fetchClients({ filter: this.props.filter });
  }

  render() {
    const { clients, meta, filter, fetchClients } = this.props;

    if (!clients) {
      return (
        <div className="ui segment index">
          return <div className="ui huge active centered inline loader"></div>
        </div>
      );
    }

    return (
      <div className=" ClientsIndex ui segment index">
        <h1 className="ui header">Klientregister</h1>
        <SearchBar
          onSearch={
            (query) => fetchClients({
              filter: {
                query,
                userId: filter.userId,
              },
            })
          }
        />
        <Paginator
          meta={meta}
          onPaginate={
            (page) => fetchClients({
              filter: {
                page,
                userId: filter.userId,
              },
            })
          }
        />
        <UsersDropdown
          onDropdownChange={
            (newUserId) => fetchClients({
              filter: {
                query: filter.query,
                userId: newUserId,
              },
            })
          }
        />
        <ClientsTable clients={clients} />
      </div>
    );
  }
}

ClientsIndex.propTypes = {
  fetchClients: PropTypes.func.isRequired,
  meta: PropTypes.object.isRequired,
  clients: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    first_name: PropTypes.string.isRequired,
    last_name: PropTypes.string.isRequired,
    personal_number: PropTypes.string.isRequired,
  }).isRequired).isRequired,
  filter: PropTypes.shape({
    query: PropTypes.string,
    page: PropTypes.number,
    userId: PropTypes.string,
  }).isRequired,
};

const mapStateToProps = (state) => {
return (
  { clients: state.clients.all,
    meta: state.clients.meta,
    filter: state.clients.filter }
);
}

export default connect(mapStateToProps, actions)(ClientsIndex);
