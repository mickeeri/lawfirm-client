import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { deleteCounterpartFromLawsuit } from '../actions';
import { hideModal } from '../../modals/actions';
import { DELETE_LAWSUIT } from '../actionTypes';
import { Button } from '../../shared';

const LawsuitDeleteModal = ({ dispatch, id, first_name, last_name, lawsuit }) =>
  <div className="modal confirm-delete-modal">
    <h3>Bekräfta borttagning</h3>
    <div className="ui divider" />
    <p>Är du säker på att du vill radera {first_name} {last_name} från {lawsuit.slug}?</p>
    <div className="ui divider" />
    <div className="button-group">
      <Button
        type="danger"
        onClick={() => {
          dispatch(deleteCounterpartFromLawsuit(id, lawsuit.id)).then(() => {
            dispatch(hideModal(DELETE_LAWSUIT));
          });
        }}
      >Ja</Button>
      <Button
        type="basic"
        onClick={() => {
          dispatch(hideModal(DELETE_LAWSUIT));
        }}
      >Nej</Button>
    </div>
  </div>;

LawsuitDeleteModal.propTypes = {
  dispatch: PropTypes.func.isRequired,
  lawsuit: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  lawsuit: state.lawsuits.lawsuit,
});

export default connect(mapStateToProps)(LawsuitDeleteModal);
