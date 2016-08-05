import { CLIENTS_PATH } from '../../clients';
import { connect } from 'react-redux';
import { LAWSUITS_PATH } from '../../lawsuits';
import { Link } from 'react-router';
import { USER_SIGNIN_PATH, USER_SIGNOUT_PATH, USER_SIGNUP_PATH } from '../../users';
import React, { Component, PropTypes } from 'react';

class Header extends Component {
  renderLinks() {
    if (this.props.authenticated) {
      return [
        <li key={1}>
          <Link to={LAWSUITS_PATH}>Ärenden</Link>
        </li>,
        <li key={2}>
          <Link to={CLIENTS_PATH}>Klienter</Link>
        </li>,
        <li key={3}>
          <Link to="/">Jävskontroll</Link>
        </li>,
        <li key={4}>
          <Link to="/">Sammanställning</Link>
        </li>,
        <li key={5}>
          <Link to={USER_SIGNOUT_PATH}>Logga ut</Link>
        </li>,
      ];
    }

    return [
      <li key={1}>
        <Link to={USER_SIGNIN_PATH}>Logga in</Link>
      </li>,
      <li key={2}>
        <Link to={USER_SIGNUP_PATH}>Registera</Link>
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
