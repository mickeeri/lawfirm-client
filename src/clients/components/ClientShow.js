import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Icon from 'react-fa';
import Alert from 'react-s-alert';

import { CLIENTS_PATH } from '../constants';
import * as actions from '../actions';
import ClientDeleteButton from './ClientDeleteButton';
import ClientForm from './ClientForm';
import ClientInfo from './ClientInfo';
import ClientCounterpartsList from './ClientCounterpartsList';
import LawsuitsList from '../../lawsuits/components/LawsuitsList';

class ClientShow extends Component {
  componentWillMount() {
    this.props.fetchClients({ filter: {}, id: this.props.params.id });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.successMessage) {
      Alert.success(nextProps.successMessage);
    }
  }

  componentWillUnmount() {
    this.props.resetClients();
  }

  render() {
    const { client, edit, toggleEdit, createUpdateClient } = this.props;

    if (!client) {
      return (
        <div className="ui large active centered inline text loader">Hämtar klient...</div>
      );
    }

    return (
      <div className="show-grid">
        <div className="column">
          <div className="segment">
            <a onClick={toggleEdit}>Ändra</a>
            {edit ?
              <ClientForm
                onSubmit={createUpdateClient}
                toggleEdit={toggleEdit}
              /> :
              <ClientInfo client={client} />
            }

            <div className="ui section divider" />

            <Link to={CLIENTS_PATH}>
              <Icon name="chevron-left" />Tillbaka till klientregister
            </Link>
          </div>
        </div>
        <div className="column">
          <div className="segment">
            <LawsuitsList clientId={client.id} />
          </div>
          <div className="segment">
            <ClientCounterpartsList counterparts={client.counterparts} />
          </div>
          <div className="segment">
            <h3 >Anteckningar</h3>
            <p>{ client ? client.note : ''}</p>
          </div>
          <div className="segment">
            <ClientDeleteButton />
          </div>
        </div>
      </div>
    );
  }
}

ClientShow.propTypes = {
  client: PropTypes.object,
  params: PropTypes.object.isRequired,
  fetchClients: PropTypes.func.isRequired,
  edit: PropTypes.bool.isRequired,
  toggleEdit: PropTypes.func,
  createUpdateClient: PropTypes.func,
  successMessage: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
  resetClients: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  successMessage: state.clients.successMessage,
  client: state.clients.client,
  edit: state.clients.edit,
});

export default connect(mapStateToProps, actions)(ClientShow);
