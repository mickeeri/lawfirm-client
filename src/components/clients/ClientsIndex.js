import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchClients } from '../../actions/index';
import '../../styles/table.css';
import SearchBar from '../shared/SearchBar';
import Paginator from '../shared/Paginator';
import ClientsTable from './ClientsTable';

class ClientsIndex extends Component {
  componentWillMount() {
    this.props.fetchClients({ query: '', page: 1 });
  }

  render() {
    const { clients, meta, dispatch } = this.props;
    return (
      <div className="ui segment index">
        <h1 className="ui header">Klientregister</h1>
        <SearchBar
          onSearch={
            (query) => dispatch(fetchClients({ query, page: 1 }))
          }
        />
        <Paginator meta={meta} />
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
};

const mapStateToProps = (state) => (
  { clients: state.clients.all,
    meta: state.clients.meta }
);

export default connect(mapStateToProps, { fetchClients })(ClientsIndex);
