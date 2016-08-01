import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchClients } from '../../actions/index';
import ClientRow from './ClientRow';
import '../../styles/table.css';
import SearchBar from '../shared/SearchBar';
import _ from 'lodash';

class ClientsIndex extends Component {
  constructor(props) {
    super(props);
    this.handleOnSearch = this.handleOnSearch.bind(this);
  }

  componentWillMount() {
    this.props.fetchClients({ query: '', page: 1 });
  }

  handleOnSearch(query) {
    this.props.fetchClients({ query, page: 1 });
  }

  handleOnPageClick(page) {
    this.props.fetchClients({ query: '', page });
  }

  renderPaginations() {
    const paginationItems = [];
    const { total_pages, current_page } = this.props.meta;
    for (let i = 1; i <= total_pages; i++) {
      paginationItems.push(<a className={`item ${i === current_page ? 'active' : ''}`} key={i}>{i}</a>);
    }
    return paginationItems;
  }

  render() {
    const { clients, meta } = this.props;
    const handleOnSearch = _.debounce((query) => { this.handleOnSearch(query); }, 300);
    return (
      <div className="ui segment index">
        <h1 className="ui header">Klientregister</h1>
        <SearchBar onSearch={handleOnSearch} />
        <div className="ui pagination menu">
          <a
            onClick={() => this.handleOnPageClick(meta.previous_page)}
            className={`${meta.current_page === 1 ? 'disabled' : ''} icon item`}
          ><i className="left chevron icon"></i></a>
          {this.renderPaginations()}
          <a
            onClick={() => this.handleOnPageClick(meta.next_page)}
            className={`${meta.current_page === meta.total_pages ? 'disabled' : ''} icon item`}
          ><i className="right chevron icon"></i></a>
        </div>
        <table className="ui celled table">
          <thead>
            <tr>
              <th>Namn</th>
              <th>Personnummer</th>
              <th>Handläggare</th>
            </tr>
          </thead>
          <tbody>
            {clients.map(client =>
              <ClientRow key={client.id} client={client} />
            )}
          </tbody>
          <tfoot>
            <tr>
              <th colSpan="4">
                <button className="ui right floated small primary labeled icon button">
                  <i className="user icon"></i>Lägg till klient
                </button>
              </th>
            </tr>
          </tfoot>
        </table>
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
};

const mapStateToProps = (state) => (
  { clients: state.clients.all,
    meta: state.clients.meta }
);

export default connect(mapStateToProps, { fetchClients })(ClientsIndex);
