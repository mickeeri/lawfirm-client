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
          <Link key="1" className="item" activeClassName="active"  to={LAWSUITS_PATH}>Ärenden</Link>
        ,
          <Link key="2" className="item" activeClassName="active"  to={CLIENTS_PATH}>Klienter</Link>
        ,
          <Link key="3" className="item" activeClassName="active" to="/jav">Jävskontroll</Link>
        ,
          <Link key="4" className="item" activeClassName="active" to="/sammanstallning">Sammanställning</Link>
        ,
          <div className="right menu">
            <Link key="5" className="item" activeClassName="active" to={USER_SIGNOUT_PATH}>Logga ut</Link>
          </div>
        ,
      ];
    }

    return [
        <Link key="1" className="item" activeClassName="active" to={USER_SIGNIN_PATH}>Logga in</Link>
      ,
        <Link key="2" className="item" activeClassName="active" to={USER_SIGNUP_PATH}>Skapa konto</Link>
      ,
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
