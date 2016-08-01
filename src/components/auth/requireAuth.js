import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { PATHS } from '../../constants';

export default (ComposedComponent) => {
  class Authentication extends Component {
    static contextTypes = {
      router: React.PropTypes.object,
    }

    componentWillMount() {
      // If not authenticated, redirect too root path.
      if (!this.props.authenticated) {
        this.context.router.push(PATHS.signIn);
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

  const mapStateToProps = (state) => (
    { authenticated: state.auth.authenticated }
  );

  return connect(mapStateToProps)(Authentication);
};
