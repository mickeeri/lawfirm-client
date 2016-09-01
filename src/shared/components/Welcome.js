import React from 'react';
import { Link, browserHistory } from 'react-router';
import { USER_SIGNUP_PATH, USER_SIGNIN_PATH } from '../../users';
import { LAWSUITS_PATH } from '../../lawsuits';
import { AUTH_TOKEN_LS_KEY } from '../../shared';

const Welcome = () => {
  // Don't show this page if signed in.
  if (localStorage.getItem(AUTH_TOKEN_LS_KEY)) {
    browserHistory.push(LAWSUITS_PATH);
  }

  return (
    <div className="segment">
      <h1>Välkommen till OrdoCliens</h1>
      <p>
        Ordocliens är ett enkelt klient- och ärendehanteringssystem för juristfirmor.
      </p>
      <Link className="ui huge primary button" to={USER_SIGNUP_PATH}>Registera mig nu!</Link>
      <br />
      <p />
      <p>Redan medlem? <Link to={USER_SIGNIN_PATH}>Logga in</Link></p>
    </div>
  );
};

export default Welcome;
