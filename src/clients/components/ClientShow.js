import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import ClientInfo from './ClientInfo';
import ClientForm from './ClientForm';
import { LawsuitsList } from '../../lawsuits';

class ClientShow extends Component {
  componentWillMount() {
    this.props.fetchClients({ filter: {}, id: this.props.params.id });
  }

  render() {
    const { client, edit, toggleEdit, createClient, errorMessage } = this.props;

    if (!client) {
      return (
        <div className="ui large active centered inline text loader">Hämtar klient...</div>
      );
    }

    return (
      <div className="ui stackable grid">
        <div className="two column row">
          <div className="column">
            <div className="ui segment">
              <button className="ui tiny right floated basic button" onClick={toggleEdit}>
                <i className="edit icon" />
                Ändra
              </button>
              {edit ?
                <ClientForm
                  onSubmit={createClient}
                  errorMessage={errorMessage}
                  toggleEdit={toggleEdit} /> :
                <ClientInfo client={client} />
              }
            </div>
          </div>
          <div className="column">
            <div className="ui segment">
              <LawsuitsList clientId={client.id} />
            </div>
            <div className="ui segment">
              <h3 className="ui header">Anteckningar</h3>
              <p>{client ? client.note : ''}</p>
            </div>
            <div className="ui segment">
              <h3 className="ui header">Inställningar</h3>
              <button className="negative labeled icon ui button">
                <i className="remove user icon" />Radera
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ClientShow.propTypes = {
  client: PropTypes.shape({
    first_name: PropTypes.string.isRequired,
    last_name: PropTypes.string.isRequired,
    personal_number: PropTypes.string.isRequired,
    id: PropTypes.number,
  }),
  params: PropTypes.object.isRequired,
  fetchClients: PropTypes.func.isRequired,
  edit: PropTypes.bool.isRequired,
  toggleEdit: PropTypes.func,
  createClient: PropTypes.func,
};

const mapStateToProps = (state) => (
 { client: state.clients.client,
   edit: state.clients.edit }
);

export default connect(mapStateToProps, actions)(ClientShow);
