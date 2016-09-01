import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { LAWSUITS_PATH } from '../../lawsuits';

const beforeAuth = (ComposedComponent) => {
  class BeforeAuth extends Component {
    componentWillMount() {
      if (this.props.authenticated) {
        browserHistory.push(LAWSUITS_PATH);
      }
    }

    componentWillUpdate(nextProps) {
      if (nextProps.authenticated) {
        browserHistory.push(LAWSUITS_PATH);
      }
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }
  }

  BeforeAuth.propTypes = {
    authenticated: PropTypes.bool.isRequired,
  };

  const mapStateToProps = (state) => ({
    authenticated: state.users.authenticated,
  });

  return connect(mapStateToProps)(BeforeAuth);
};

export default beforeAuth;
