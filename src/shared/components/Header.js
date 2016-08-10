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
        <li key="1">
          <Link className="item" activeClassName="active" to={LAWSUITS_PATH}>
            Ärenden
          </Link>
        </li>,
        <li key="2">
          <Link className="item" activeClassName="active" to={CLIENTS_PATH}>
            Klienter
          </Link>
        </li>,
        <li key="3">
          <Link className="item" activeClassName="active" to={COI_SEARCH_PATH}>
            Jävskontroll
          </Link>
        </li>,
        <li key="4">
          <Link className="item" activeClassName="active" to="/sammanstallning">
            Sammanställning
          </Link>
        </li>,
      ];
    }

    return [
      <li key="1">
        <Link className="item" activeClassName="active" to={USER_SIGNIN_PATH}>
          Logga in
        </Link>
      </li>,
      <li key="2">
        <Link className="item" activeClassName="active" to={USER_SIGNUP_PATH}>
          Skapa konto
        </Link>
      </li>,
    ];
  }
  render() {
    return (
      <nav>
        <ul className="menu start">
          <li className="brand"><Link to="/" className="item">OrdoCliens</Link></li>
          {this.renderLinks()}
        </ul>
        <ul className="menu end">
          {this.props.authenticated &&
            <li className="left">
              <Link className="item" activeClassName="active" to={USER_SIGNOUT_PATH}>Logga ut</Link>
            </li>
          }
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
