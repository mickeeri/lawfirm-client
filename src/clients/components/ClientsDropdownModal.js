import { connect } from 'react-redux';
import Icon from 'react-fa';
import React, { Component, PropTypes } from 'react';
import reduxDialog, { closeDialog } from 'redux-dialog';
import { addClientToLawsuit, fetchClients } from '../actions';
import { CLIENTS_DROPDOWN_MODAL_NAME } from '../constants';

class ClientsDropdown extends Component {
  componentWillMount() {
    this.props.dispatch(fetchClients({ filter: {} }));
  }

  render() {
    const { clients, lawsuitId, dispatch, errorMessage } = this.props;
    let selectedClientId;

    if (!clients) {
      return false;
    }

    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(addClientToLawsuit(
            { id: parseInt(selectedClientId, 10) },
            lawsuitId
          ));
        }}
      >
        <h2>Välj en klient att lägga till ärendet</h2>
        <select
          name="clients"
          ref={node => { selectedClientId = node; }}
          onChange={(e) => {
            selectedClientId = e.target.value;
          }}
          defaultValue="0"
        >
          <option value="0" disabled>Välj en klient</option>
          {clients.map(client =>
            <option key={client.id} value={client.id}>
              {client.last_name}, {client.first_name}
            </option>
          )}
        </select>
        {errorMessage &&
          <div className="alert-error">
            <p><Icon name="exclamation-circle" />{errorMessage}</p>
          </div>}
        <div className="button-group">
          <button
            className="ui button"
            onClick={(e) => {
              e.preventDefault();
              dispatch(closeDialog(CLIENTS_DROPDOWN_MODAL_NAME));
            }}
          >Avbryt</button>
          <button
            type="submit"
            className="ui primary button"
          >Spara</button>
        </div>
      </form>
    );
  }
}


ClientsDropdown.propTypes = {
  addClientToLawsuit: PropTypes.func,
  errorMessage: PropTypes.string,
  clients: PropTypes.array,
  fetchClients: PropTypes.func,
  lawsuitId: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const ClientsDropdownModal = reduxDialog({
  name: CLIENTS_DROPDOWN_MODAL_NAME,
  className: 'modal clients-dropdown-modal',
  overlayClassName: 'modal-overlay',
})(ClientsDropdown);


const mapStateToProps = (state) => ({
  errorMessage: state.clients.errorMessage,
  lawsuitId: state.lawsuits.lawsuit.id,
  clients: state.clients.all,
});

export default connect(mapStateToProps, null)(ClientsDropdownModal);
