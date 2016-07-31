import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchClients } from '../../actions/index';
import ClientRow from './ClientRow';
// import '../styles/table.css';

class ClientsIndex extends Component {
  componentWillMount() {
    this.props.fetchClients();
  }

  render() {
    const { clients } = this.props;
    return (
      <div className="index-wrapper">
        <h1 className="index-header">Klientregister</h1>
        <table>
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
        </table>
      </div>
    );
  }
}

ClientsIndex.propTypes = {
  fetchClients: PropTypes.func.isRequired,
  clients: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    first_name: PropTypes.string.isRequired,
    last_name: PropTypes.string.isRequired,
    personal_number: PropTypes.string.isRequired,
  }).isRequired).isRequired,
};

const mapStateToProps = (state) => (
  { clients: state.clients.all }
);

export default connect(mapStateToProps, { fetchClients })(ClientsIndex);
