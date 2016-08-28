import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { openDialog, closeDialog } from 'redux-dialog';
import { Link } from 'react-router';
import Icon from 'react-fa';

import { CLIENTS_PATH } from '../constants';
import * as actions from '../actions';
import ClientDeleteButton from './ClientDeleteButton';
import ClientForm from './ClientForm';
import ClientInfo from './ClientInfo';
import CounterpartsList from '../../counterparts/components/CounterpartsList';
import LawsuitsList from '../../lawsuits/components/LawsuitsList';
import SuccessMessage from '../../shared/components/SuccessMessage';

class ClientShow extends Component {
  componentWillMount() {
    this.props.fetchClients({ filter: {}, id: this.props.params.id });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.successMessage !== '') {
      this.props.dispatch(openDialog('successMessage'));
    }
  }

  componentWillUnmount() {
    this.props.resetClients();
  }

  render() {
    const { client, edit, toggleEdit, createUpdateClient, dispatch } = this.props;

    if (!client) {
      return (
        <div className="ui large active centered inline text loader">Hämtar klient...</div>
      );
    }

    return (
      <div className="show-grid">
        <SuccessMessage
          message={this.props.successMessage}
          close={() => { dispatch(closeDialog('successMessage')); }}
        />
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
            <CounterpartsList counterparts={client.counterparts} />
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
