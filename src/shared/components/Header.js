import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { PATHS } from '../../constants';
import { USER_SIGNIN_PATH } from '../../users';

class Header extends Component {
  renderLinks() {
    if (this.props.authenticated) {
      return [
        <li key={1}>
          <Link to={PATHS.lawsuits}>Ärenden</Link>
        </li>,
        <li key={2}>
          <Link to={PATHS.clients}>Klienter</Link>
        </li>,
        <li key={3}>
          <Link to="/">Jävskontroll</Link>
        </li>,
        <li key={4}>
          <Link to="/">Sammanställning</Link>
        </li>,
        <li key={5}>
          <Link to={PATHS.signOut}>Logga ut</Link>
        </li>,
      ];
    }

    return [
      <li key={1}>
        <Link to={USER_SIGNIN_PATH}>Logga in</Link>
      </li>,
      <li key={2}>
        <Link to="sad">Registera</Link>
      </li>,
    ];
  }
  render() {
    return (
      <nav>
        <Link to="/">OrdoCliens</Link>
        <ul>
          {this.renderLinks()}
        </ul>
      </nav>
    );
  }
}

Header.propTypes = {
  authenticated: PropTypes.bool,
};

const mapStateToProps = (state) => {
  return { authenticated: state.users.authenticated };
};

export default connect(mapStateToProps)(Header);
