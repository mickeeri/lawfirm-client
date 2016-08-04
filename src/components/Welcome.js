import React from 'react';
import { Link } from 'react-router';
import '../styles/welcome.css';
import { PATHS } from '../constants';


// TODO: redirect to lawsuits if logged in.
const Welcome = () => (
  <div className="ui center aligned segment">
    <div className="ui text container">
      <h1>Välkommen till OrdoCliens</h1>
      <p>
        OrdoCliens är ett enkelt klient- och ärendehanteringsssystem för mindre juristfirmor.
        Testa i 30 dagar utan kostnad.
      </p>
      <Link className="ui huge primary button" to={PATHS.userSignUp}>Registera mig nu!</Link>
    </div>
  </div>
);

export default Welcome;
