import { connect } from 'react-redux';
import { Link } from 'react-router';
import { openDialog } from 'redux-dialog';
import Icon from 'react-fa';
import React, { Component, PropTypes } from 'react';

import { CLIENT_FORM_MODAL_NAME, CLIENTS_DROPDOWN_MODAL_NAME } from '../../clients';
import { LAWSUITS_PATH } from '../constants';
import * as actions from '../actions';
import ClientsList from '../../clients/components/ClientsList';
import CounterpartsList from '../../counterparts/components/CounterpartsList';
import LawsuitArchiveButton from './LawsuitArchiveButton';
import LawsuitDeleteButton from './LawsuitDeleteButton';
import LawsuitForm from './LawsuitForm';
import LawsuitInfo from './LawsuitInfo';

class LawsuitShow extends Component {
  componentWillMount() {
    this.props.fetchLawsuits({ filter: {}, id: this.props.params.id });
  }

  render() {
    const {
      lawsuit,
      toggleEdit,
      edit,
      createUpdateLawsuit,
      errorMessage,
      dispatch,
    } = this.props;

    if (!lawsuit) {
      return <div className="ui big active centered inline loader" />;
    }

    return (
      <div className="show-grid">
        <div className="column">
          <div className="segment">
            <div className="lawsuit-show-header">
              <h2>Ärende {lawsuit.slug}</h2>
              { lawsuit.closed &&
                <span className="archived"><Icon name="archive" />Arkiverat</span> }
            </div>

            <div className="ui divider" />

            <a onClick={toggleEdit}>Ändra</a>

            {/* Show form or info based on bool edit */}
            {edit ?
              <LawsuitForm
                onSubmit={createUpdateLawsuit}
                errorMessage={errorMessage}
                toggleEdit={toggleEdit}
                primaryClientId={lawsuit.primary_client.id}
              /> :
              <LawsuitInfo lawsuit={lawsuit} />
            }

            <div className="ui divider" />

            <a>Redigera anteckning</a>
            <h3>Anteckning</h3>
            <p>{lawsuit.note}</p>

            <div className="ui section divider" />

            <h3>Inställningar</h3>

            <div className="settings">
              <LawsuitDeleteButton />

              <LawsuitArchiveButton
                toggleClosed={() => {
                  createUpdateLawsuit({ id: lawsuit.id, closed: !lawsuit.closed });
                }}
                closed={lawsuit.closed}
              />
            </div>

            <div className="ui section divider" />

            <Link to={LAWSUITS_PATH}>
              <Icon name="chevron-left" />Tillbaka till ärendelista
            </Link>
          </div>
        </div>
        <div className="column">

          <div className="segment">
            <ClientsList
              openClientFormModal={() => { dispatch(openDialog(CLIENT_FORM_MODAL_NAME)); }}
              openClientsDropdownModal={
                () => { dispatch(openDialog(CLIENTS_DROPDOWN_MODAL_NAME)); }
              }
              clients={lawsuit.clients}
              primaryClientId={lawsuit.primary_client.id}
            />
          </div>

          <div className="segment">
            <CounterpartsList counterparts={lawsuit.counterparts} />
          </div>
        </div>
      </div>
    );
  }
}

LawsuitShow.propTypes = {
  lawsuit: PropTypes.object,
  fetchLawsuits: PropTypes.func.isRequired,
  params: PropTypes.object.isRequired,
  toggleEdit: PropTypes.func.isRequired,
  edit: PropTypes.bool.isRequired,
  createUpdateLawsuit: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  lawsuit: state.lawsuits.lawsuit,
  edit: state.lawsuits.edit,
});

export default connect(mapStateToProps, actions)(LawsuitShow);
