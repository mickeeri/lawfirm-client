import { connect } from 'react-redux';
import { Link } from 'react-router';
import React, { PropTypes } from 'react';
import ClientForm from './ClientForm';
import * as actions from '../actions';
import { CLIENTS_PATH } from '../constants';


const ClientNew = props =>
  <div className="ClientNew centered">
    <div className="segment new-client">
      <h1>Lägg till ny klient</h1>
      <ClientForm onSubmit={props.createClient} errorMessage={props.errorMessage} />
      <div className="ui divider" />
      <Link to={CLIENTS_PATH} className="ui small button">Tillbaka</Link>
    </div>
  </div>;


ClientNew.propTypes = {
  createClient: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
};

const mapStateToProps = (state) => (
  { errorMessage: state.users.error }
);

export default connect(mapStateToProps, actions)(ClientNew);
