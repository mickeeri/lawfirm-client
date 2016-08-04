import '../../styles/table.css';
import ClientsTable from './ClientsTable';
import Paginator from '../shared/Paginator';
import React, { Component, PropTypes } from 'react';
import SearchBar from '../shared/SearchBar';
import UsersDropdown from '../users/UsersDropdown';
import { connect } from 'react-redux';
import { fetchClients } from '../../actions/index';
import { USER_ID_LS_KEY } from '../../constants';

class ClientsIndex extends Component {
  componentWillMount() {
    this.props.fetchClients({ filter: this.props.filter });
  }

  render() {
    const { clients, meta, dispatch, filter } = this.props;
    const { page, userId, query } = filter;

    if (clients.length === 0) {
      return (
        <div className="ui segment index">
          return <div className="ui huge active centered inline loader"></div>
        </div>
      );
    }

    return (
      <div className="ui segment index">
        <h1 className="ui header">Klientregister</h1>
        <SearchBar
          onSearch={
            (newQuery) => dispatch(
              fetchClients({ filter: { query: newQuery, page, userId } })
            )
          }
        />
        <Paginator
          meta={meta}
          onPaginate={
            (newPage) => dispatch(
              fetchClients({ filter: { page: newPage, query: '', userId } })
            )
          }
        />
        <UsersDropdown
          selectedUser={parseInt(localStorage.getItem(USER_ID_LS_KEY), 10)}
          onDropdownChange={
            (newUserId) => dispatch(fetchClients({ filter: { query, page: 1, userId: newUserId } }))
          }
        />
        <ClientsTable clients={clients} />
      </div>
    );
  }
}

ClientsIndex.propTypes = {
  dispatch: PropTypes.func.isRequired,
  fetchClients: PropTypes.func.isRequired,
  meta: PropTypes.object.isRequired,
  clients: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    first_name: PropTypes.string.isRequired,
    last_name: PropTypes.string.isRequired,
    personal_number: PropTypes.string.isRequired,
  }).isRequired).isRequired,
  filter: PropTypes.shape({
    query: PropTypes.string.isRequired,
    page: PropTypes.number.isRequired,
    userId: PropTypes.number.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => (
  { clients: state.clients.all,
    meta: state.clients.meta,
    filter: state.clients.filter }
);

export default connect(mapStateToProps, { fetchClients })(ClientsIndex);
