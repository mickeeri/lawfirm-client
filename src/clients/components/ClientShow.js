import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import ClientInfo from './ClientInfo';
import ClientForm from './ClientForm';
import LawsuitsList from '../../lawsuits/components/LawsuitsList';
import ClientDeleteButton from './ClientDeleteButton';

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
      <div className="show-grid">
        <div className="column">
          <div className="segment">
            <a onClick={toggleEdit}>
              <i className="edit icon" />
              Ändra
            </a>
            {edit ?
              <ClientForm
                onSubmit={createClient}
                errorMessage={errorMessage}
                toggleEdit={toggleEdit}
              /> :
              <ClientInfo client={client} />
            }
          </div>
        </div>
        <div className="column">
          <div className="segment">
            <LawsuitsList />
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
  errorMessage: PropTypes.string,
};

const mapStateToProps = (state) => (
 { client: state.clients.client,
   edit: state.clients.edit }
);

export default connect(mapStateToProps, actions)(ClientShow);
