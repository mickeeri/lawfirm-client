import { connect } from 'react-redux';
import { Link } from 'react-router';
import { openDialog } from 'redux-dialog';
import Icon from 'react-fa';
import React, { PropTypes } from 'react';

import { CLIENT_FORM_MODAL_NAME, CLIENTS_DROPDOWN_MODAL_NAME } from '../../clients';
import { COUNTERPARTS_DROPDOWN_MODAL_NAME, COUNTERPARTS_FORM_MODAL_NAME } from '../../counterparts';
import { LAWSUITS_PATH } from '../constants';
import * as actions from '../actions';
import ClientsList from '../../clients/components/ClientsList';
import CounterpartsList from '../../counterparts/components/CounterpartsList';
import LawsuitArchiveButton from './LawsuitArchiveButton';
import LawsuitForm from './LawsuitForm';
import LawsuitInfo from './LawsuitInfo';
import { Button } from '../../shared';
import { showModal } from '../../modals/actions';
import { DELETE_LAWSUIT } from '../actionTypes';

const LawsuitOverview = ({
  createUpdateLawsuit,
  edit,
  lawsuit,
  toggleEdit,
  dispatch,
}) =>
  <div>
    <div className="show-grid">
      <div className="column">
        <div className="card">
          <div className="card-header">
            <h3>Uppgifter</h3>
          </div>
          <div className="card-content">
            <Button type="small" onClick={toggleEdit}>Redigera uppgifter</Button>
            {/* Show form or info based on bool edit */}
            {edit ?
              <LawsuitForm
                onSubmit={createUpdateLawsuit}
                toggleEdit={toggleEdit}
                primaryClientId={lawsuit.primary_client.id}
              /> :
              <LawsuitInfo lawsuit={lawsuit} />
            }
            <div className="ui divider" />
            <Button type="small">Redigera anteckning</Button>
            <h3>Anteckning</h3>
            <p>{lawsuit.note}</p>
            <div className="ui section divider" />
            <h3>Inställningar</h3>
            <div className="settings">
              <Button
                type="danger"
                disabled={lawsuit.closed}
                onClick={() => {
                  showModal(DELETE_LAWSUIT, lawsuit);
                }}
              >Radera ärende</Button>
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
          openClientsDropdownModal={() => { dispatch(openDialog(CLIENTS_DROPDOWN_MODAL_NAME)); }}
          clients={lawsuit.clients}
          primaryClientId={lawsuit.primary_client.id}
          closed={lawsuit.closed}
        />
        <CounterpartsList
          counterparts={lawsuit.counterparts}
          openDropdownModal={() => { dispatch(openDialog(COUNTERPARTS_DROPDOWN_MODAL_NAME)); }}
          openFormModal={() => { dispatch(openDialog(COUNTERPARTS_FORM_MODAL_NAME)); }}
          closed={lawsuit.closed}
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
  </div>;

LawsuitOverview.propTypes = {
  lawsuit: PropTypes.object,
  toggleEdit: PropTypes.func.isRequired,
  edit: PropTypes.bool.isRequired,
  createUpdateLawsuit: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
  openDialog: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  lawsuit: state.lawsuits.lawsuit,
  edit: state.lawsuits.edit,
});

export default connect(mapStateToProps, actions)(LawsuitOverview);
