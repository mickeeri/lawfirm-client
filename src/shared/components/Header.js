import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { CLIENTS_PATH } from '../../clients';
import { LAWSUITS_PATH, COI_SEARCH_PATH } from '../../lawsuits';
import { USER_SIGNIN_PATH, USER_SIGNOUT_PATH, USER_SIGNUP_PATH } from '../../users';

class Header extends Component {
  renderLinks() {
    if (this.props.authenticated) {
      return [
        <Link key="1" className="item" activeClassName="active" to={LAWSUITS_PATH}>
          Ärenden
        </Link>,
        <Link key="2" className="item" activeClassName="active" to={CLIENTS_PATH}>
          Klienter
        </Link>,
        <Link key="3" className="item" activeClassName="active" to={COI_SEARCH_PATH}>
          Jävskontroll
        </Link>,
        <Link key="4" className="item" activeClassName="active" to="/sammanstallning">
          Sammanställning
        </Link>,
        <div className="right menu" key="5">
          <Link className="item" activeClassName="active" to={USER_SIGNOUT_PATH}>Logga ut</Link>
        </div>,
      ];
    }

    return [
      <Link key="1" className="item" activeClassName="active" to={USER_SIGNIN_PATH}>
        Logga in
      </Link>,
      <Link key="2" className="item" activeClassName="active" to={USER_SIGNUP_PATH}>
        Skapa konto
      </Link>,
    ];
  }
  render() {
    return (
      <div className="ui stackable menu">
        <Link to="/" className="item">OrdoCliens</Link>
        {this.renderLinks()}
      </div>
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
