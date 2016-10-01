import { SHOW_MODAL, HIDE_MODAL } from './actionTypes';

export const hideModal = () => ({
  type: HIDE_MODAL,
});

export const showModal = (modalType, modalProps) => {
  debugger
  return {
    type: SHOW_MODAL,
    modalType,
    modalProps,
  }
}
