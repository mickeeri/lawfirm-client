import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { openDialog, closeDialog } from 'redux-dialog';
import * as actions from '../actions';
import ClientInfo from './ClientInfo';
import ClientForm from './ClientForm';
import LawsuitsList from '../../lawsuits/components/LawsuitsList';
import ClientDeleteButton from './ClientDeleteButton';
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

  render() {
    const { client, edit, toggleEdit, createClient, dispatch } = this.props;

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
                onSubmit={createClient}
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
  client: PropTypes.object,
  params: PropTypes.object.isRequired,
  fetchClients: PropTypes.func.isRequired,
  edit: PropTypes.bool.isRequired,
  toggleEdit: PropTypes.func,
  createClient: PropTypes.func,
  successMessage: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  successMessage: state.clients.successMessage,
  client: state.clients.client,
  edit: state.clients.edit,
});

export default connect(mapStateToProps, actions)(ClientShow);
