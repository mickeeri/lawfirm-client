import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import ClientInfo from './ClientInfo';
import { LawsuitsList } from '../../lawsuits';

class ClientShow extends Component {
  componentWillMount() {
    this.props.fetchClients({ filter: {}, id: this.props.params.id });
  }

  render() {
    const { client } = this.props;

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
              <ClientInfo client={client} />
            </div>
          </div>
          <div className="column">
            <div className="ui segment">
              <LawsuitsList clientId={client.id} />
            </div>
            <div className="ui segment">
              <h2 className="ui header">Motparter</h2>
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
              <button className="ui primary labeled icon button">
                <i className="edit icon" />Redigera
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
};

const mapStateToProps = (state) => (
 { client: state.clients.client }
);

export default connect(mapStateToProps, actions)(ClientShow);
