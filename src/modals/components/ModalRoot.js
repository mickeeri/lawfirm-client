import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import LawsuitDeleteModal from '../../lawsuits/components/LawsuitDeleteModal';

const MODAL_COMPONENTS = {
  DELETE_LAWSUIT: LawsuitDeleteModal,
};

const ModalRoot = ({ modalType, modalProps }) => {
  if (!modalType) {
    return null;
  }

  const SpecificModal = MODAL_COMPONENTS[modalType];
  return <SpecificModal {...modalProps} />;
};

ModalRoot.propTypes = {
  modalType: PropTypes.object.isRequired,
  modalProps: PropTypes.object.isRequired,
};

export default connect(
  state => state.modals
)(ModalRoot);
