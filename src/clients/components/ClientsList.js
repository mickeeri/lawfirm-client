import React, { Component, PropTypes } from 'react';
import Icon from 'react-fa';
import { connect } from 'react-redux';
import { openDialog } from 'redux-dialog';
import { Link } from 'react-router';
import { CLIENTS_PATH } from '../constants';
import { fetchClients, resetClients } from '../actions';
import ClientFormModal from './ClientFormModal';

class ClientsList extends Component {
  componentWillMount() {
    this.props.dispatch(fetchClients({ filter: { lawsuitId: this.props.lawsuitId } }));
  }

  componentWillUnmount() {
    this.props.dispatch(resetClients());
  }

  render() {
    const { clients, dispatch } = this.props;

    if (!clients) {
      return <div className="ui large active centered inline text loader" />;
    }

    return (
      <div className="ClientsList">
        <h2>Klienter</h2>
        <ul className="show-sub-list">
          {clients.map(client =>
            <li key={client.id}>
              <Link to={`${CLIENTS_PATH}/${client.id}`}>
                {client.first_name} {client.last_name}, {client.personal_number}
              </Link>
            </li>
          )}
        </ul>
        <ClientFormModal />
        <button
          className="ui primary button"
          onClick={() => dispatch(openDialog('clientFormModal'))}
        >
          <Icon name="plus" />Lägg till ny klient
        </button>
      </div>
    );
  }
}

ClientsList.propTypes = {
  clients: PropTypes.array,
  dispatch: PropTypes.func.isRequired,
  lawsuitId: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  clients: state.clients.all,
});

export default connect(mapStateToProps, null)(ClientsList);
