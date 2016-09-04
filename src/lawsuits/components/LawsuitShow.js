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
import { COUNTERPARTS_DROPDOWN_MODAL_NAME, COUNTERPARTS_FORM_MODAL_NAME } from '../../counterparts';

class LawsuitShow extends Component {
  componentWillMount() {
    this.props.fetchLawsuits({ filter: {}, id: this.props.params.id });
  }

  componentWillUnmount() {
    this.props.resetLawsuits();
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
      <div>
        <h2>Ärende {lawsuit.slug}</h2>
        <div className="tabbed-area">
          <ul className="tabs group">
            <li><a href="#" className="active">Översikt</a></li>
            <li><a href="#">Arbete</a></li>
            <li><a href="#">Utlägg</a></li>
          </ul>

          <div className="tabbed segment">
            <div className="show-grid">
              <div className="column">
                <div className="card">
                  <div className="lawsuit-show-header card-header">
                    <h3>Uppgifter</h3>
                    { lawsuit.closed &&
                      <span className="archived"><Icon name="archive" />Arkiverat</span> }
                  </div>
                  <div className="card-content">
                    <a className="edit-link" onClick={toggleEdit}>Ändra</a>

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
              </div>
              <div className="column">
                <ClientsList
                  openClientFormModal={() => { dispatch(openDialog(CLIENT_FORM_MODAL_NAME)); }}
                  openClientsDropdownModal={
                    () => { dispatch(openDialog(CLIENTS_DROPDOWN_MODAL_NAME)); }
                  }
                  clients={lawsuit.clients}
                  primaryClientId={lawsuit.primary_client.id}
                />

                <CounterpartsList
                  counterparts={lawsuit.counterparts}
                  openDropdownModal={
                    () => { dispatch(openDialog(COUNTERPARTS_DROPDOWN_MODAL_NAME)); }
                  }
                  openFormModal={
                    () => { dispatch(openDialog(COUNTERPARTS_FORM_MODAL_NAME)); }
                  }
                />

                <table className="ui celled table">
                  <thead>
                    <tr>
                      <th>Datum</th>
                      <th>Notering</th>
                      <th>Arbetat tid</th>
                      <th>Kategori</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>2016-07-11</td>
                      <td>Nasdlkjasdjsadlasjdasld</td>
                      <td>2,5 h</td>
                      <td>Tidssppillan (låg)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
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
  resetLawsuits: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  lawsuit: state.lawsuits.lawsuit,
  edit: state.lawsuits.edit,
});

export default connect(mapStateToProps, actions)(LawsuitShow);
