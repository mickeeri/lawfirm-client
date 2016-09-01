import { connect } from 'react-redux';
import React, { Component } from 'react';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
import Alert from 'react-s-alert';

class AlertMessage extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.infoMessage) {
      Alert.info(nextProps.infoMessage, { timeout: 2000 });
    }

    if (nextProps.successMessage) {
      Alert.success(nextProps.successMessage, { timeout: 2000 });
    }

    if (nextProps.errorMessage) {
      Alert.error(nextProps.errorMessage, { timeout: 2000 });
    }

    if (nextProps.closeAllAlerts) {
      Alert.closeAll();
    }
  }

  render() {
    return (
      <Alert stack={{ limit: 1 }} />
    );
  }
}

const mapStateToProps = (state) => ({
  infoMessage: state.shared.infoMessage,
  successMessage: state.shared.successMessage,
  errorMessage: state.shared.errorMessage,
});

export default connect(mapStateToProps)(AlertMessage);
