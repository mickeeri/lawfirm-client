import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { USER_SIGNIN_PATH } from '../../users';

const requireAuth = (ComposedComponent) => {
  class Authentication extends Component {
    static contextTypes = {
      router: PropTypes.object,
    }

    componentWillMount() {
      // If not authenticated, redirect too root path.
      if (!this.props.authenticated) {
        this.context.router.push(USER_SIGNIN_PATH);
      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.authenticated) {
        this.context.router.push('/');
      }
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }
  }

  Authentication.propTypes = {
    authenticated: PropTypes.bool.isRequired,
  };

  const mapStateToProps = (state) => ({
    authenticated: state.users.authenticated,
  });

  return connect(mapStateToProps)(Authentication);
};

export default requireAuth;
