import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { Icon } from 'react-fa';
import { SearchBar, Paginator } from '../../shared';
import { UsersDropdown } from '../../users';
import * as actions from '../actions';
import ClientsTable from './ClientsTable';
import { CLIENT_NEW_PATH } from '../constants';

class ClientsIndex extends Component {
  componentWillMount() {
    this.props.fetchClients({ filter: this.props.filter });
  }

  componentWillUnmount() {
    this.props.resetClients();
  }

  render() {
    const { clients, meta, filter, fetchClients } = this.props;

    if (!clients) {
      return (
        <div className="ui segment index">
          return <div className="ui huge active centered inline loader" />
        </div>
      );
    }

    return (
      <div className=" ClientsIndex segment index">
        <h1>Klientregister</h1>
        <div className="index-menu-row">
          <div className="index-menu-column">
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
          </div>
          <div className="index-menu-column">
            <SearchBar
              label="Sök på namn eller personnummer"
              onSearch={
                (query) => fetchClients({
                  filter: {
                    query,
                    userId: filter.userId,
                  },
                })
              }
            />
          </div>
        </div>
        <div className="index-menu-row">
          <div className="index-menu-column">
            <Link to={CLIENT_NEW_PATH} className="ui primary button">
              <Icon name="user-plus" />Lägg till klient
            </Link>
          </div>
          <div className="index-menu-column">
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
          </div>
        </div>
        <ClientsTable clients={clients} />
      </div>
    );
  }
}

ClientsIndex.propTypes = {
  fetchClients: PropTypes.func.isRequired,
  meta: PropTypes.object,
  clients: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    first_name: PropTypes.string.isRequired,
    last_name: PropTypes.string.isRequired,
    personal_number: PropTypes.string.isRequired,
  }).isRequired),
  filter: PropTypes.shape({
    query: PropTypes.string,
    page: PropTypes.number,
    userId: PropTypes.string,
  }).isRequired,
  resetClients: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => (
  { clients: state.clients.all,
    meta: state.clients.meta,
    filter: state.clients.filter }
);

export default connect(mapStateToProps, actions)(ClientsIndex);
