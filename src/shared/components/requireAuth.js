import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { USER_SIGNIN_PATH } from '../../users';

export default (ComposedComponent) => {
  class Authentication extends Component {
    static contextTypes = {
      router: React.PropTypes.object,
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
    authenticated: PropTypes.bool,
  };

  const mapStateToProps = (state) => {
    return (
      { authenticated: state.users.authenticated }
    );
  };

  return connect(mapStateToProps)(Authentication);
};
