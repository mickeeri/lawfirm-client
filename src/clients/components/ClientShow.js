import React, { Component, PropTypes } from 'react';
import * as actions from '../actions';
import { connect } from 'react-redux';
import ClientInfo from './ClientInfo';

class ClientShow extends Component {
  componentWillMount() {
    this.props.fetchClients( { filter: {}, id:  this.props.params.id });
  }

  render() {
    const { client } = this.props;


    return (
      <div className="ui stackable grid">
        <div className="two column row">
          <div className="column ui segment">
            {client ?
              <ClientInfo client={client} /> :
              <div className="ui big active centered inline loader"></div>
            }
          </div>
          <div className="column">
            <div className="ui segment">
              <h2 className="ui header">Ärenden</h2>
            </div>
            <div className="ui segment">
              <h2 className="ui header">Motparter</h2>
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
  fetchClient: PropTypes.func.isRequired,
  params: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => (
 { client: state.clients.client }
);

export default connect(mapStateToProps, actions)(ClientShow);
